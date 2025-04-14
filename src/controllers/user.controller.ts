import { Request, Response } from "express";
import { Languages } from "../@types/languages.enum";
import { getPotentialPartners, getUser, updateData } from "../services/user.service";

const userController = {
    getPotentialPartners: async (req: Request, res: Response) => {
        const users = await getPotentialPartners(req.userId!);
        res.json(users);
    },
    getUser: async (req: Request, res: Response) => {
        const userId = req.userId
        const user = await getUser(userId!);
        res.json(user);
    },
    updateUser: async (req: Request, res: Response) => {
        const userId = req.userId

        const {
            first_name,
            last_name,
            native_language,
            learning_language,
            bio
        } = req.body;

        if (!first_name || !last_name || !native_language || !learning_language) {
            res.status(400).json({ error: "Missing required fields." });
            return
        }

        if (native_language.toLowerCase() === learning_language.toLowerCase()) {
            res.status(400).json({
                error: "Native language and target language cannot be the same."
            });
            return;
        }

        const updateFields: any = {
            first_name,
            last_name,
            native_language,
            learning_language,
            bio
        };

        if (req.file && req.file.filename) {
            updateFields.profile_pict = req.file.filename;
            console.log("here")
        }

        await updateData(updateFields, userId!);

        res.status(200).json({ message: "Profile updated successfully." });
        return;
    }

}

export default userController;