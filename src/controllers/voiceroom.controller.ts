import { Request, Response } from "express";
import { getAllVoiceroom } from "../services/voiceroom.service";

const voiceroomController = {
    getAllVoiceroom: async (req: Request, res: Response) => {
        const voicerooms = await getAllVoiceroom();
        res.json(voicerooms);
    },

    addVoiceroom: async (req: Request, res: Response) => {
        const { userId } = req.body;
        const { title, lg } = req.body;
        
    },
    closeVoiceroom: async (req: Request, res: Response) => {

    }


}

export default voiceroomController;