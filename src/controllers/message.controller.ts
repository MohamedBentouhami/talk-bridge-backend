import { Request, Response } from "express";
import { doesUserExist, getMessages } from "../services/user.service";

const messageController = {
    getMessages: async (req: Request, res: Response) => {
        const friendId = req.body.friend_id;
        if (!await doesUserExist(friendId)) {
            res.status(404).json({ "error": "user does not exist!" });
            return;
        }
        const userId = req.userId;
        const messages = await getMessages(userId!, friendId);
        res.json(messages);
    }
}

export default messageController;