import { NextFunction, Request, Response } from "express";
import { ZodType } from "zod";
import type { UserCreationData } from "../@types/user";

export function userCreationValidator(userCreationValidation: ZodType) {
    return function (req: Request & {user?: UserCreationData }, res: Response, next: NextFunction) {
        const { data, success, error } = userCreationValidation.safeParse(req.body);
        if (!success) {
            res.status(422).json({ error: error?.flatten().fieldErrors })
            return;
        }
        req.user = data;
        next();
    }
}