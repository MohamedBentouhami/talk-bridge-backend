import { Router } from "express";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import friendController from "../controllers/friend.controller";

const friendRouter = Router();

friendRouter.get("/", authenticationMiddleware(), friendController.getAllFriends)

export default friendRouter;