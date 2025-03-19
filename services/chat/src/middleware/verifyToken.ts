import { Socket } from "socket.io";
import { NextFunction } from "express";
import axios from "axios";
import config from "../config/configSetup";

export const verifyToken = async (socket: Socket, next: (err?: Error) => void) => {
    const token = socket.handshake.auth.token;

    try {
        const result = await axios.post(`${config.AUTH_BASE_URL}/api/auth/verify-token`, { token })

        socket.user = result.data.data;

        next();
    } catch (error) {
        return next(new Error('Authentication error'));
    }
}