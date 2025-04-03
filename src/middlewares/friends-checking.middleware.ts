import { NextFunction, Request, Response } from "express";
import { doesUserExist } from "../services/user.service";

export function friendCheckingExistence() {
    return async function (req: Request, res: Response, next: NextFunction) {
        const userId = req.userId;
        const friendId = req.body.friend_id;
        const friendExist = await doesUserExist(friendId);
        if (!friendExist) {
            res.json({ "error": "friend does't exist" })
            return
        }
        req.userId = userId;
        next();
    }
}