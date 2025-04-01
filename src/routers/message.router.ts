import { Router } from "express";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import messageController from "../controllers/message.controller";

const messageRouter = Router();

messageRouter.get("/messages/:friend_id", authenticationMiddleware(), messageController.getMessages)

export default messageRouter;