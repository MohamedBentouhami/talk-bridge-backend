import { Router } from "express";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import friendshipController from "../controllers/friendship.controller";
import { friendCheckingExistence } from "../middlewares/friends-checking.middleware";

const friendshipRouter = Router();

friendshipRouter.get("/", authenticationMiddleware(), friendshipController.getAllFriends);
friendshipRouter.get("/new-requesters", authenticationMiddleware(), friendshipController.getNewRequesters);
friendshipRouter.post("/add", authenticationMiddleware(), friendCheckingExistence(), friendshipController.addFriend)
friendshipRouter.patch("/accept", authenticationMiddleware(), friendCheckingExistence(), friendshipController.acceptFriendRequest)
friendshipRouter.delete("/refuse", authenticationMiddleware(), friendCheckingExistence(), friendshipController.refusedFriendRequest)

export default friendshipRouter;