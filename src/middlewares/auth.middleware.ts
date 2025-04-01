import { NextFunction, Request, Response } from "express";
import { decodeJWT } from "../helpers/jwt.helper";

export function authenticationMiddleware() {
    return async function (req: Request, res: Response, next: NextFunction) {
        const token = req.headers['authorization'];
        if (!token) {
            res.status(401).json({ "message": "Unauthorize operation" })
            return;
        }
        try {
            const decoded = await decodeJWT(token);
            req.userId = decoded;
            next();
        } catch (err) {
            res.status(401).json({ "error": "Unauthorize operation" })
        }

    }
}