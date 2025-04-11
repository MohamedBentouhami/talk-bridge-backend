import { Router } from "express";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import messageController from "../controllers/message.controller";
import { friendCheckingExistence } from "../middlewares/friends-checking.middleware";

const messageRouter = Router();

messageRouter.get("/:friend_id", authenticationMiddleware(), messageController.getMessages);
messageRouter.post("/add", authenticationMiddleware(), friendCheckingExistence(), messageController.sendMessage);
messageRouter.patch("/add-correction", authenticationMiddleware(), messageController.addCorrection)

export default messageRouter;