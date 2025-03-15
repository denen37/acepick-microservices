import { Request, Response } from "express"
import { Profession } from "../models/Profession"
import { successResponse, errorResponse } from "../utils/utility"
import { Sector } from "../models/Sector"
import { PublishMessage } from "../events/handler"
import { randomUUID } from "crypto";
import { Job } from "../models/Job"



export const getProfessions = async (req: Request, res: Response) => {
    let { sectorid } = req.query

    let professions: any[] = []

    let whereCondition = sectorid ? { sectorId: sectorid } : {}

    try {
        professions = await Profession.findAll({ where: whereCondition })
    } catch (error) {
        return errorResponse(res, "error", error)
    }

    return successResponse(res, "success", professions)
}



export const getProfessionById = async (req: Request, res: Response) => {
    let { id } = req.params

    try {
        let professions = await Profession.findOne({ where: { id } })

        return successResponse(res, "success", professions)
    } catch (error) {
        return errorResponse(res, "error", error)
    }
}


export const getSectors = async (req: Request, res: Response) => {
    let { metadata } = req.query

    try {
        let sectors = await Sector.findAll()

        return successResponse(res, "success", sectors)
    } catch (error) {
        return errorResponse(res, "error", error)
    }
}

export const getSectorsById = async (req: Request, res: Response) => {
    let { id } = req.params

    try {
        let sector = await Sector.findOne({ where: { id: id } })

        return successResponse(res, "success", sector)
    } catch (error) {
        return errorResponse(res, "error", error)
    }
}

// export const getProfessionalById = async (req: Request, res: Response) => {
//     let { id } = req.params

//     let professional: any = {}

//     try {
//         professional = await Professional.findOne({ where: { id: id } })
//     } catch (error) {

//     }
// }

export const testApi = async (req: Request, res: Response) => {
    return successResponse(res, "success", "Your Api is working!")
}

// export const get_professions = async (req: Request, res: Response) => {
//     const profs = await Profession.findAll({
//         where: {
//             id: msg
//         },

//         attributes: ['id', 'title', 'image']
//     })

//     return profs.map(prof => prof.dataValues)
// }


export const getJobs = async (req: Request, res: Response) => {
    let { id } = req.user;
    let { status } = req.query;

    let whereCondition: { ownerId: string, [key: string]: any; } = { ownerId: id }

    if (status) {
        whereCondition = { ...whereCondition, status }
    }

    try {
        const jobs = await Job.findAll({
            where: whereCondition
        })

        return successResponse(res, "success", jobs)
    } catch (error) {
        return errorResponse(res, "error", error)
    }
}


// export const createJob = async (req: Request, res: Response) => {
//     let {
//         description,
//         title,
//         mode,
//         state,
//         lga,
//         fullAddress,
//         long,
//         total,
//         workmannShip,
//         isMaterial,
//         gettingMaterial,
//         lan,
//         durationUnit,
//         durationValue,
//         userId,
//         materials,
//     } = req.body;
//     let { id } = req.user;

//     const job = await Job?.create({
//         description,
//         title,
//         mode,
//         state,
//         lga,
//         fullAddress,
//         long,
//         total,
//         workmannShip,
//         isMaterial,
//         gettingMaterial,
//         lan,
//         durationUnit,
//         durationValue,
//         ownerId: id,
//         userId: userId,
//     });

//     const jobOwner = await Professional.findOne({
//         where: { userId: job.ownerId },
//     });

//     // await jobOwner?.update({ totalJobPending: (Number(jobOwner.totalJobPending) + 1) })

//     const jobUser = await Profile.findOne({ where: { userId: job.userId } });
//     // await jobUser?.update({ totalPendingHire: (Number(jobUser.totalPendingHire) + 1) })
//     const wallet = await Wallet.findOne({ where: { userId: jobUser?.userId, type: WalletType.CLIENT } })
//     await sendExpoNotification(jobUser!.fcmToken, `${jobOwner?.profile?.fullName} sent you an invoice`);
//     await Transactions.create({
//         title: "Invoice Sent",
//         description: `${jobOwner?.profile?.fullName} sent you an invoice`,
//         type: TransactionType.NOTIFICATION, amount: 0,
//         creditType: CreditType.NONE,
//         status: "SUCCESSFUL", userId: job.userId, walletId: wallet?.id
//     });
//     const redis = new Redis();
//     const cachedUserSocket: any = await redis.getData(`notification - ${job.userId} `)
//     const socketUser = socketio.sockets.sockets.get(cachedUserSocket);
//     if (socketUser) {
//         const notificationsUser = await Transactions.findAll({
//             order: [
//                 ['id', 'DESC']
//             ],
//             where: { userId: job.ownerId, read: false },
//             include: [
//                 {
//                     model: Job, include: [{
//                         model: Material
//                     },
//                     {
//                         model: Users,
//                         as: "client",
//                         attributes: ["id"],
//                         include: [
//                             {
//                                 model: Profile,
//                                 attributes: ["fullName", "avatar", "verified", "lga", "state", "address"
//                                 ],
//                             }
//                         ]
//                     },
//                     {
//                         model: Users,
//                         as: "owner",
//                         attributes: ["id"],
//                         include: [{
//                             model: Professional,
//                             include: [
//                                 {
//                                     model: Profile,
//                                     attributes: ["fullName", "avatar", "verified", "lga", "state", "address"
//                                     ],
//                                     include: [
//                                         {
//                                             model: ProfessionalSector,
//                                             include: [
//                                                 { model: Sector },
//                                                 { model: Profession },
//                                             ],

//                                         }
//                                     ]
//                                 }
//                             ]

//                         }]
//                     },
//                     { model: Dispute }]
//                 }
//             ],
//             limit: 1

//         });
//         socketUser.emit("notification", notificationsUser)

//         const walletUser = await Wallet.findOne({ where: { userId: job!.userId, type: WalletType.CLIENT } })


//         socketUser.emit("wallet", walletUser)
//     }

//     if (materials) {
//         let newMaterial: any = [];
//         for (let value of materials) {
//             newMaterial.push({ ...value, jobId: job.id });
//         }
//         const material = await Material.bulkCreate(newMaterial);
//         return successResponse(res, "Successful", { ...job.dataValues, material });
//     } else {
//         return successResponse(res, "Successful", {
//             ...job.dataValues,
//             material: [],
//         });
//     }
// };
