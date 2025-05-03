import { Request, Response } from 'express'
import { Sector } from '../models/Sector'
import { errorResponse, successResponse } from '../utils/utility'

export const createSector = async (req: Request, res: Response) => {
    const { title, image } = req.body

    if (!title || !image) {
        return errorResponse(res, 'error', 'Please provide all fields')
    }

    try {
        const sector = await Sector.create({ title, image })

        return successResponse(res, 'success', sector)
    } catch (error) {
        return errorResponse(res, 'error', error);
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

export const updateSector = async (req: Request, res: Response) => {
    let { id } = req.params

    try {
        let sector = await Sector.update(req.body, { where: { id: id } })

        return successResponse(res, "success", sector)
    } catch (error) {
        return errorResponse(res, "error", error)
    }

}

export const deleteSector = async (req: Request, res: Response) => {
    let { id } = req.params

    try {
        let sector = await Sector.destroy({ where: { id: id } })

        return successResponse(res, "success", sector)
    } catch (error) {
        return errorResponse(res, "error", error)
    }
}