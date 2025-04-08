import { Request, Response } from "express";
import { doesUserExist } from "../services/user.service";
import { getMessages, sendMessage } from "../services/message.service";

const messageController = {
    getMessages: async (req: Request, res: Response) => {
        const friendId = req.params.friend_id;
        if (!await doesUserExist(friendId)) {
            res.status(404).json({ "error": "user does not exist!" });
            return;
        }
        const userId = req.userId;
        const messages = await getMessages(userId!, friendId);
        res.json(messages);
    },
    sendMessage: async (req: Request, res: Response) => {
        const friendId = req.body;
        const userId = req.body;
        const contentMsg = req.body.message;
        await sendMessage(userId, friendId, contentMsg);
        res.status(201).json("Message created successfully");
    }
}

export default messageController;