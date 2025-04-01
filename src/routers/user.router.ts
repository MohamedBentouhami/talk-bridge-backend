import { Router } from "express";
import userController from "../controllers/user.controller";
import { authenticationMiddleware } from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.get("/:lg", authenticationMiddleware(), userController.getUsers);

export default userRouter;
