import { Router } from "express";
import voiceroomController from "../controllers/voiceroom.controller";
import { authenticationMiddleware } from "../middlewares/auth.middleware";

const voiceroomRouter = Router();

voiceroomRouter.get("/", voiceroomController.getAllVoiceroom);
voiceroomRouter.post("/add", authenticationMiddleware(), voiceroomController.addVoiceroom);
voiceroomRouter.patch("/close", voiceroomController.closeVoiceroom);


export default voiceroomRouter;