import { Request, Response } from "express"
import { Cooperation } from "../models/Cooperation";
import { Profile } from "../models/Profile";
import { User } from "../models/User";
import { errorResponse, successResponse } from "../utils/utility";
import { Professional } from "../models/Professional";

export const getCooperates = async (req: Request, res: Response) => {
    let { metadata } = req.query;

    try {
        let assoc = metadata ? [
            { model: Profile, },
            { model: User }
        ] : []

        //TODO - associate with rating

        let cooperates = Cooperation.findAll({
            include: assoc
        })

        return successResponse(res, "success", cooperates)
    } catch (error) {
        return errorResponse(res, "error", error)
    }

}

export const getProfessionals = async (req: Request, res: Response) => {
    let { search } = req.query;

    //Send a message to jobs to return professionals

    try {
        let professionals = Professional.findAll({

            attributes: ['id', 'chargeFrom', 'avaialable', 'professionId'],
            include: [
                {
                    model: Profile,
                    attributes: ['id', 'fullName', 'avatar', 'verified', 'notified', 'lga', 'state', 'address']
                },
                {
                    model: User,
                    attributes: ['id', 'email', 'phone']
                }
            ]
        })

        return successResponse(res, 'success', professionals)
    } catch (err) {
        return errorResponse(res, 'error', err);
    }
}