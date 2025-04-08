import { Router } from "express";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import messageController from "../controllers/message.controller";
import { friendCheckingExistence } from "../middlewares/friends-checking.middleware";

const messageRouter = Router();

messageRouter.get("/:friend_id", authenticationMiddleware(), messageController.getMessages);
messageRouter.post("/add", authenticationMiddleware(), friendCheckingExistence(), messageController.sendMessage);

export default messageRouter;