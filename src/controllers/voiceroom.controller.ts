import { Request, Response } from "express";
import { closeVoiceroom, createVoiceroom, getAllVoiceroom, joinVoiceroom } from "../services/voiceroom.service";
import { getSocketId, io } from "../socket";

const voiceroomController = {
    getAllVoiceroom: async (req: Request, res: Response) => {
        const voicerooms = await getAllVoiceroom();
        for(let vr of voicerooms){
            console.log(vr)
        }
        res.json(voicerooms);
    },

    addVoiceroom: async (req: Request, res: Response) => {
        const userId = req.userId!;
        const { title, lg } = req.body;
        const newVoiceroom = await createVoiceroom({ hostId: userId, language: lg, title: title })
        io.emit("new_voiceroom", { newVoiceroom })
        res.json(newVoiceroom);

    },
    closeVoiceroom: async (req: Request, res: Response) => {
        const userId = req.userId;
        const { voiceroomId } = req.body;
        await closeVoiceroom(voiceroomId);
    },
    joinVoiceroom: async (req: Request, res: Response) => {
        const userId = req.userId;
        const { voiceroomId } = req.body;
        const participant = await joinVoiceroom(voiceroomId, userId!);
        io.emit("join_voiceroom", { voiceroomId, participant });
        res.json("Join a vr successfully! ");
    }

}

export default voiceroomController;