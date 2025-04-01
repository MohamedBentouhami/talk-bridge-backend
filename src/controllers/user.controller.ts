import { Request, Response } from "express";
import { getUsersByLanguage } from "../services/user.service";
import { Languages } from "../@types/languages.enum";

const userController = {
    getUsers: async (req: Request, res: Response) => {        
        const lg = req.params.lg;
        if (!Object.values(Languages).includes(lg as Languages)) {
            res.status(400).json({ error: "Invalid parameter !" })
        }
        const users = await getUsersByLanguage(lg as Languages);
        res.json(users);

    }
}

export default userController;