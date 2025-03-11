import { Request, Response } from "express"
import { Cooperation } from "../models/Cooperation";
import { Profile } from "../models/Profile";
import { User } from "../models/User";
import { errorResponse, successResponse } from "../utils/utility";
import { Professional } from "../models/Professional";
// import { PublishMessage } from "../events/handler";
import { randomUUID } from "crypto";
import axios from "axios";
import config from '../config/configSetup'


export const getCooperates = async (req: Request, res: Response) => {
    let { metadata, search } = req.query;

    let hasmetadata = metadata === 'true' ? true : false;

    let assoc = hasmetadata ? [
        {
            model: Profile,
            attributes: ['id', 'fullName', 'avatar', 'verified', 'notified', 'lga', 'state', 'address']
        },
        {
            model: User,
            attributes: ['id', 'email', 'phone'],
        }
    ] : []


    let searchids: number[] = [];

    try {
        if (search) {
            let result = await axios.get(`http://${config.INTERNAL_HOST}:${config.JOBS_PORT}/jobs/services/search_profs?search=${search}`)

            searchids = result.data.data.map((item: any) => item.id)

        }

        const whereCondition = searchids.length > 0 ? { professionId: searchids } : {};

        const cooperates = await Cooperation.findAll({
            where: whereCondition,
            include: assoc
        });


        return successResponse(res, 'sucess', cooperates)

    } catch (error) {
        return errorResponse(res, 'error', error);
    }
}

export const getProfessionals = async (req: Request, res: Response) => {
    let { search } = req.query;

    //Send a message to jobs to return professionals
    let searchids: number[] = [];

    try {
        if (search) {
            let result = await axios.get(`http://${config.INTERNAL_HOST}:${config.JOBS_PORT}/jobs/services/search_profs?search=${search}`)

            searchids = result.data.data.map((item: any) => item.id)
        }


        const whereCondition = searchids.length > 0 ? { professionId: searchids } : {};

        let professionals = await Professional.findAll({
            where: whereCondition,
            attributes: ['id', 'chargeFrom', 'avaialable', 'professionId'],
            include: [
                {
                    model: User,
                    attributes: ['id', 'email', 'phone'],
                    include: [{
                        model: Profile,
                        attributes: ['id', 'fullName', 'avatar', 'verified', 'notified', 'lga', 'state', 'address']
                    }]
                }
            ]
        })


        let result = await axios.post(`http://${config.INTERNAL_HOST}:${config.JOBS_PORT}/jobs/services/get_profs`,
            { profIds: professionals.map(prof => prof.professionId), }
        )

        const profList = result.data.data


        professionals.forEach((prof) => {
            const profession = profList.find((p: any) => p.id === prof.professionId);
            prof.setDataValue('profession', profession || null);
        });


        return successResponse(res, 'success', professionals)
    } catch (err) {
        return errorResponse(res, 'error', err);
    }
}