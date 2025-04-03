import { Router } from "express";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import friendshipController from "../controllers/friendship.controller";
import { friendCheckingExistence } from "../middlewares/friends-checking.middleware";

const friendshipRouter = Router();

friendshipRouter.get("/", authenticationMiddleware(), friendshipController.getAllFriends)
friendshipRouter.post("/add", authenticationMiddleware(), friendCheckingExistence(), friendshipController.addFriend)
friendshipRouter.patch("/update", authenticationMiddleware(), friendCheckingExistence(),friendshipController.friendRequestTreatment)

export default friendshipRouter;