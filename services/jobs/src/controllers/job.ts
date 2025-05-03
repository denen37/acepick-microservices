import { Request, Response } from "express"
import { successResponse, errorResponse, handleResponse } from "../utils/utility"
import { Sector } from "../models/Sector"
import { PublishMessage } from "../events/handler"
import { randomUUID } from "crypto";
import { Job, JobStatus, PayStatus } from "../models/Job"
import { Material } from "../models/Material";
import axios from "axios";
import config from '../config/configSetup';
import { sendEmail } from "../services/gmail";
import { jobResponseEmail, jobCreatedEmail, jobDisputeEmail } from "../messages/email";
import { UserRole } from "../models/Enum";
import { Dispute } from "../models/Dispute";


export const testApi = async (req: Request, res: Response) => {
    return successResponse(res, "success", "Your Api is working!")
}


export const getJobs = async (req: Request, res: Response) => {
    let { id, role } = req.user;
    let { status } = req.query;

    let whereCondition: { [key: string]: any; }

    if (role = UserRole.CLIENT) {
        whereCondition = { clientId: id }
    } else {
        whereCondition = { profId: id }
    }

    if (status) {
        whereCondition = { ...whereCondition, status }
    }

    try {
        const jobs = await Job.findAll({
            where: whereCondition,
        })

        return successResponse(res, "success", jobs)
    } catch (error) {
        return errorResponse(res, "error", error)
    }
}

export const getJobById = async (req: Request, res: Response) => {
    let { id } = req.params;

    try {
        const jobs = await Job.findOne({
            where: { id },
            include: [Material]
        })

        return successResponse(res, "success", jobs)
    } catch (error: any) {
        return errorResponse(res, 'error', error.message);
    }
}


export const createJobOrder = async (req: Request, res: Response) => {
    const { id } = req.user;

    const { title, description, address, profId } = req.body;

    //validate
    if (!title || !description || !address || !profId) {
        return errorResponse(res, "Please fill all fields");
    }

    const profResponse = await axios.get(`${config.AUTH_BASE_URL}/api/users/${profId}`, {
        headers: {
            Authorization: req.headers.authorization,
        },
    });

    const prof = profResponse.data.data;


    if (!prof) {
        return handleResponse(res, 404, false, 'User not found');
    }

    if (prof.role !== UserRole.PROFFESSIONAL) {
        return handleResponse(res, 401, false, 'User is not a professional')
    };

    const clientResponse = await axios.get(`${config.AUTH_BASE_URL}/api/users/${id}`, {
        headers: {
            Authorization: req.headers.authorization,
        },
    })

    const client = clientResponse.data.data;

    const job = await Job.create({
        title,
        description,
        fullAddress: address,
        profId,
        clientId: id,
    })

    const jobResponse = { ...job.dataValues }

    job.setDataValue('client', client);
    job.setDataValue('prof', prof);


    const updateUserProfile = await axios.post(`${config.AUTH_BASE_URL}/api/profiles/update-metrics/${profId}`,
        {
            payload: [{ field: 'pending', action: 'increment' }]
        },
        {
            headers: {
                Authorization: req.headers.authorization,
            }
        }
    )

    const updateOwnerProfile = await axios.post(`${config.AUTH_BASE_URL}/api/profiles/update-metrics/${id}`,
        {
            payload: [{ field: 'pending', action: 'increment' }]
        },
        {
            headers: {
                Authorization: req.headers.authorization,
            }
        }
    )


    //send an email to the prof
    const msgStat = await sendEmail(
        job.dataValues.prof.email,
        jobCreatedEmail(job.dataValues).subject,
        jobCreatedEmail(job.dataValues).text,
        job.dataValues.prof.profile.fullName
    )

    //send notification to the prof

    return successResponse(res, "Successful", { jobResponse, emailSendId: msgStat.messageId });
}

export const respondToJob = async (req: Request, res: Response) => {
    const { jobId } = req.params;

    const { accepted } = req.body;

    try {
        const job = await Job.findByPk(jobId);

        if (!job) {
            return handleResponse(res, 404, false, 'Job not found')
        }

        await job.update({
            accepted,
        })

        job.save();

        const profResponse = await axios.get(`${config.AUTH_BASE_URL}/api/users/${job.profId}`, {
            headers: {
                Authorization: req.headers.authorization,
            },
        });

        const prof = profResponse.data.data;


        const clientResponse = await axios.get(`${config.AUTH_BASE_URL}/api/users/${job.clientId}`, {
            headers: {
                Authorization: req.headers.authorization,
            },
        })

        const client = clientResponse.data.data;

        job.setDataValue('client', client);
        job.setDataValue('prof', prof);

        // console.log('prof email', job.dataValues.prof.email);
        // console.log('prof name', job.dataValues.prof.profile.fullName);

        //send an email to the prof
        const msgStat = await sendEmail(
            job.dataValues.client.email,
            jobResponseEmail(job.dataValues).subject,
            jobResponseEmail(job.dataValues).text,
            job.dataValues.client.profile.fullName
        )

        return successResponse(res, 'success', { message: 'Job respsonse updated', emailSendId: msgStat.messageId })
    } catch (error) {
        return errorResponse(res, 'error', error)
    }
}


export const generateInvoice = async (req: Request, res: Response) => {
    const { jobId, durationUnit, durationValue, workmanship, materials }:
        { jobId: number, durationUnit: string, durationValue: number, workmanship: number, materials: Material[] } = req.body;

    try {
        const job = await Job.findByPk(jobId);

        if (!job) {
            return handleResponse(res, 404, false, 'Job not found');
        }

        await job.update({
            durationUnit,
            durationValue,
            workmanship,
        })


        if (materials) {
            const newMat = materials.map((mat) => {
                return {
                    ...mat,
                    subTotal: mat.price * mat.quantity,
                    jobId,
                }
            })

            job.isMaterial = true;

            job.materials = materials.reduce((acc, mat) => acc + mat.price * mat.quantity, 0);


            const mats = await Material.bulkCreate(Object.assign(newMat));

            await job.save();

            return successResponse(res, 'success', { message: 'Invoice generated' })
        }

        await job.save();

        return successResponse(res, 'success', { message: 'Job updated' })
    } catch (err: any) {
        return errorResponse(res, 'error', err.message)
    }
}


export const payforJob = async (req: Request, res: Response) => {
    const { id } = req.user;
    const { jobId } = req.params;

    const { amount, paidFor, pin } = req.body;

    try {
        if (!amount || !paidFor) {
            return handleResponse(res, 400, false, 'Amount and paidFor is required');
        }

        const job = await Job.findByPk(jobId);
        if (!job) {
            return handleResponse(res, 404, false, 'Job not found');
        }

        if (job.payStatus === PayStatus.PAID) {
            return handleResponse(res, 400, false, 'Job has already been paid for')
        }

        let response;
        try {
            response = await axios.post(`${config.PAYMENT_BASE_URL}/pay-api/debit-wallet`, {
                amount,
                pin,
                reason: 'job payment',
                jobId
            }, {
                headers: {
                    Authorization: req.headers.authorization,
                }
            });
        } catch (error: any) {
            // axios error - get meaningful message from backend
            const errData = error.response?.data || {};
            const errMessage = errData.message || error.message || 'Payment failed';
            return handleResponse(res, 400, false, errMessage, errData.data);
        }


        if (response.data.status) {
            const requiredAmt = Number(job.workmanship) + Number(job.materials)
            const previousPayStatus = job.payStatus;

            if (amount === requiredAmt)
                job.payStatus = PayStatus.PAID;
            else if (amount < requiredAmt)
                job.payStatus = PayStatus.PARTIALLY_PAID;

            job.paidFor = paidFor;

            job.paymentRef = response.data.data.reference;

            job.status = JobStatus.ONGOING;

            await job.save();

            if (job.payStatus === PayStatus.PAID) {
                await axios.post(`${config.AUTH_BASE_URL}/api/profiles/update-metrics/${job.profId}`,
                    {
                        payload: [
                            { field: 'ongoing', action: 'increment' },
                            { field: 'pending', action: 'decrement' },
                        ]
                    },
                    {
                        headers: {
                            Authorization: req.headers.authorization,
                        }
                    }
                );

                await axios.post(`${config.AUTH_BASE_URL}/api/profiles/update-metrics/${job.clientId}`,
                    {
                        payload: [
                            { field: 'ongoing', action: 'increment' },
                            { field: 'pending', action: 'decrement' },
                        ]
                    },
                    {
                        headers: {
                            Authorization: req.headers.authorization,
                        }
                    }
                );
            }

            return successResponse(res, 'success', { message: 'Job payment successful' });
        }

        return handleResponse(res, 400, false, 'Payment failed', response.data.data);
    } catch (error: any) {
        return errorResponse(res, 'error', { message: error.message, error });
    }
};

export const completeJob = async (req: Request, res: Response) => {
    const { jobId } = req.params;

    try {
        const job = await Job.findByPk(jobId)

        if (!job) {
            return handleResponse(res, 404, false, 'Job does not exist');
        }

        job.status = JobStatus.COMPLETED

        await job.save()

        const updateUserProfile = await axios.post(`${config.AUTH_BASE_URL}/api/profiles/update-metrics/${job.profId}`,
            {
                payload: [
                    { field: 'ongoing', action: 'decrement' },
                    { field: 'completed', action: 'increment' },
                ]
            },
            {
                headers: {
                    Authorization: req.headers.authorization,
                }
            }
        )

        const updateOwnerProfile = await axios.post(`${config.AUTH_BASE_URL}/api/profiles/update-metrics/${job.clientId}`,
            {
                payload: [
                    { field: 'ongoing', action: 'decrement' },
                    { field: 'completed', action: 'increment' },
                ]
            },
            {
                headers: {
                    Authorization: req.headers.authorization,
                }
            }
        )

        return successResponse(res, 'success', 'Job completed sucessfully')
    } catch (error: any) {
        return errorResponse(res, 'error', error.message)
    }
}


export const approveJob = async (req: Request, res: Response) => {
    const { jobId } = req.params;

    try {
        const job = await Job.findByPk(jobId)

        if (!job) {
            return handleResponse(res, 404, false, 'Job does not exist');
        }

        if (job.status !== JobStatus.COMPLETED) {
            return handleResponse(res, 404, false, `You cannot approve a/an ${job.status} job`)
        }

        job.status = JobStatus.APPROVED;

        await job.save()

        const updateProfProfile = await axios.post(`${config.AUTH_BASE_URL}/api/profiles/update-metrics/${job.profId}`,
            {
                payload: [
                    { field: 'completed', action: 'decrement' },
                    { field: 'approved', action: 'increment' },
                ]
            },
            {
                headers: {
                    Authorization: req.headers.authorization,
                }
            }
        )

        const updateClientProfile = await axios.post(`${config.AUTH_BASE_URL}/api/profiles/update-metrics/${job.clientId}`,
            {
                payload: [
                    { field: 'completed', action: 'decrement' },
                    { field: 'approved', action: 'increment' },
                ]
            },
            {
                headers: {
                    Authorization: req.headers.authorization,
                }
            }
        )

        //credit job client

        const walletResponse = await axios.post(`${config.PAYMENT_BASE_URL}/pay-api/credit-wallet`,
            {
                amount: job.workmanship,
                userId: job.profId,
            },
            {
                headers: {
                    Authorization: req.headers.authorization
                }
            }
        )

        return successResponse(res, 'success', 'Job approved sucessfully')
    } catch (error: any) {
        return errorResponse(res, 'error', error.message)
    }
}

export const disputeJob = async (req: Request, res: Response) => {
    const jobId = req.params.jobId;

    const { reason, description } = req.body;

    try {
        const job = await Job.findByPk(jobId);

        if (!job) {
            return handleResponse(res, 404, false, 'Job does not exist');
        }

        if (job.status !== JobStatus.COMPLETED) {
            return handleResponse(res, 404, false, `You cannot dispute a/an ${job.status} job`)
        }

        job.status = JobStatus.DISPUTED;

        await job.save()


        const profResponse = await axios.get(`${config.AUTH_BASE_URL}/api/users/${job.profId}`, {
            headers: {
                Authorization: req.headers.authorization,
            },
        });

        const prof = profResponse.data.data;

        job.setDataValue('prof', prof);


        const updateUserProfile = await axios.post(`${config.AUTH_BASE_URL}/api/profiles/update-metrics/${job.profId}`,
            {
                payload: [
                    { field: 'completed', action: 'decrement' },
                    { field: 'disputed', action: 'increment' },
                ]
            },
            {
                headers: {
                    Authorization: req.headers.authorization,
                }
            }
        )

        const updateOwnerProfile = await axios.post(`${config.AUTH_BASE_URL}/api/profiles/update-metrics/${job.clientId}`,
            {
                payload: [
                    { field: 'completed', action: 'decrement' },
                    { field: 'disputed', action: 'increment' },
                ]
            },
            {
                headers: {
                    Authorization: req.headers.authorization,
                }
            }
        )

        const dispute = await Dispute.create({
            reason,
            description,
            jobId: jobId,
            reporterId: job.profId,
            partnerId: job.clientId,
        })


        const msgStat = await sendEmail(
            job.dataValues.prof.email,
            jobDisputeEmail(job.dataValues, dispute).subject,
            jobDisputeEmail(job.dataValues, dispute).text,
            job.dataValues.prof.profile.fullName
        )

        return successResponse(res, 'success', { dispute, emailSendId: msgStat.messageId })
    } catch (error: any) {
        return errorResponse(res, 'error', error.message)
    }
}