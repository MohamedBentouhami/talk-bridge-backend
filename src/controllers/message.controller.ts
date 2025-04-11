import { Request, Response } from "express";
import { doesUserExist } from "../services/user.service";
import { correctionMsg, getMessages, sendMessage } from "../services/message.service";
import { getSocketId, io } from "../socket";

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
        const friendId = req.body.friend_id;
        const userId = req.userId!;
        const contentMsg = req.body.message;
        const newMessage = await sendMessage(userId, friendId, contentMsg);
        const socketId = getSocketId(friendId);
        if (socketId) {
            console.log("Notification");
            io.to(socketId).emit("new_message", { newMessage })
        } else {
            console.log("User not connected")
        }
        res.status(201).json(newMessage);
    },
    addCorrection: async (req: Request, res: Response) => {
        const correctionProvided = req.body.correction_provided;
        const messageId = req.body.message_id;

        const updatedMsg = await correctionMsg(messageId, correctionProvided);
        const socketId = getSocketId(updatedMsg.senderId);
        if (socketId) {
            console.log("Notification");
            io.to(socketId).emit("add_correction", { updatedMsg })
        } else {
            console.log("User not connected")
        }

        res.json(updatedMsg)

    }
}

export default messageController;