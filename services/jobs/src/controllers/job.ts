import { Request, Response } from "express"
import { Profession } from "../models/Profession"
import { successResponse, errorResponse } from "../utils/utility"
import { Sector } from "../models/Sector"
import { PublishMessage } from "../events/handler"
import { randomUUID } from "crypto";



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
