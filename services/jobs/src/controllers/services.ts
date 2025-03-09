import { Request, Response } from "express"
import { Profession } from "../models/Profession"
import { successResponse, errorResponse } from "../utils/utility"
import { Job } from "../models/Job"
import { Op } from "sequelize";


export const getProfIds = async (req: Request, res: Response) => {
    let { search } = req.query

    try {
        const profIds = await Profession.findAll({
            where: {
                title: {
                    [Op.like]: `%${search}%`
                }
            },
            attributes: ['id']
        })

        console.log(profIds);


        return successResponse(res, 'success', profIds)
    } catch (error) {
        return errorResponse(res, 'error', error)
    }
}

export const getProfByIdList = async (req: Request, res: Response) => {
    let { profIds } = req.body;


    try {
        const profs = await Profession.findAll({
            where: {
                id: profIds
            },

            attributes: ['id', 'title', 'image']
        })


        return successResponse(res, 'success', profs)
    } catch (error) {
        return errorResponse(res, 'failed', error)
    }
}