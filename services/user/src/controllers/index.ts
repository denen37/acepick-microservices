import { Request, Response } from 'express';
import { successResponse } from "../utils/utility";

export const apiIndex = async (req: Request, res: Response) => {
    successResponse(res, "API Working!");
}