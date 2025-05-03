import { NextFunction, Response, Request } from "express";
import config from "../config/configSetup"
import { errorResponse, handleResponse, removeEnd } from "../utils/modules";
import { verify } from "jsonwebtoken";
import axios from "axios"



const isAuthorized = async (req: Request, res: Response, next: NextFunction) => {
    let route: any = req.originalUrl.split('?').shift()
    route = removeEnd(route, '/');
    let publicRoutes: string[] = config.PUBLIC_ROUTES!;

    let isPublicRoute = publicRoutes.includes(route)

    if (isPublicRoute) return next();

    let token: any = req.headers.authorization;

    if (!token) return handleResponse(res, 401, false, `Access Denied / Unauthorized request`);

    try {
        let result = await axios.post(`${config.AUTH_BASE_URL}/api/auth/verify-token`, { token })

        let verified = result.data.data

        if (!verified) return errorResponse(res, 'error', "Invalid token")

        if (verified.admin)
            req.admin = verified
        else
            req.user = verified

        next();
    } catch (error) {
        return errorResponse(res, 'error', "Could not verify token")
    }

};

export default isAuthorized;