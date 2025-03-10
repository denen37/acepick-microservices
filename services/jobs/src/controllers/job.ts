import { Request, Response } from "express"
import { Profession } from "../models/Profession"
import { successResponse, errorResponse } from "../utils/utility"
import { Sector } from "../models/Sector"
import { PublishMessage } from "../events/handler"
import { randomUUID } from "crypto";



export const getProfessions = async (req: Request, res: Response) => {
    let { sector_id } = req.params

    let professions: any[] = []

    try {
        professions = await Profession.findAll({ where: { sectorId: sector_id } })
    } catch (error) {
        return errorResponse(res, "error", error)
    }

    return successResponse(res, "success", professions)
}


export const getSectors = async (req: Request, res: Response) => {
    let { metadata } = req.query

    let sectors: Sector[] = []
    let jobs: number;
    let professionals: number

    try {
        sectors = await Sector.findAll()

        // if (metadata) {
        //     for (let i = 0; i < sectors.length; i++) {
        //         jobs = await Job.count({ where: { sectorId: sectors[i].id } })

        //         // professionals = await Professional.count({ where: { sectorId: sectors[i].id } })

        //         await PublishMessage("get_professionals", {sectorId: sectors[i].id})

        //         sectors[i].dataValues.jobs = jobs

        //         sectors[i].dataValues.professionals = professionals
        //     }
        // }
    } catch (error) {
        return errorResponse(res, "error", error)
    }

    return successResponse(res, "success", sectors)
}

// export const getProfessionalById = async (req: Request, res: Response) => {
//     let { id } = req.params

//     let professional: any = {}

//     try {
//         professional = await Professional.findOne({ where: { id: id } })
//     } catch (error) {

//     }
// }

export const TestEvent = async (req: Request, res: Response) => {
    // await PublishMessage('test2', { id: "123", title: "Web Development", description: "Build a website" },
    //     { replyTo: "test_reply", correlationId: randomUUID() },
    //     (msg) => {
    //         console.log(msg.content.toString())
    //     })
    return successResponse(res, "success", "message sent")
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
