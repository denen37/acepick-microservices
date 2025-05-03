import { Profession } from "../models/Profession"
import { Request, Response } from "express"
import { successResponse, errorResponse } from "../utils/utility"
import { Sector } from "../models/Sector"

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
        let professions = await Profession.findOne({
            where: { id },
            include: [
                {
                    model: Sector,
                }
            ]
        })

        return successResponse(res, "success", professions)
    } catch (error) {
        return errorResponse(res, "error", error)
    }
}

export const createProfession = async (req: Request, res: Response) => {
    let { name, title, sectorId } = req.body;

    if (!name || !title || !sectorId) {
        return errorResponse(res, "error", "Please provide all required fields")
    }

    try {
        const sector = await Sector.findOne({ where: { id: sectorId } })

        if (!sector) {
            return errorResponse(res, "error", "Sector not found")
        }

        let profession = await Profession.create({ name, title, sectorId })

        return successResponse(res, "success", profession)
    } catch (error) {
        return errorResponse(res, "error", error)
    }
}

export const updateProfession = async (req: Request, res: Response) => {
    let { id } = req.params;

    try {
        let prof = await Profession.update(req.body, { where: { id: id } });

        return successResponse(res, "success", prof)
    } catch (error) {
        return errorResponse(res, "error", error)
    }
}

export const deleteProfession = async (req: Request, res: Response) => {
    let { id } = req.params;

    try {
        let prof = await Profession.destroy({ where: { id: id } });

        return successResponse(res, "success", 'Profession deleted')
    } catch (error) {
        return errorResponse(res, "error", error)
    }
}
