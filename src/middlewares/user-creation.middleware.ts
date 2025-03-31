import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import type { UserCreationData } from "../@types/user";
import { getUserByEmail } from "../services/user.service";

export function userCreationValidator(userCreationValidation: ZodType) {
    return async function (req: Request & { user?: UserCreationData }, res: Response, next: NextFunction) {
        const { data, success, error } = userCreationValidation.safeParse(req.body);
        if (!success) {
            res.status(422).json({ error: error?.flatten().fieldErrors })
            return;
        }
        const existedUser = await getUserByEmail(data.email)
        if (existedUser) {
            res.status(409).json({ error: "User already exists!" })
            return;
        }
        req.user = data;
        next();
    }
}