import { Router } from "express";
import { authenticationMiddleware } from "../middlewares/auth.middleware";
import upload from "../middlewares/multer.middleware";
import userController from "../controllers/user.controller";

const userRouter = Router();

userRouter.get("/", authenticationMiddleware(), userController.getUser)
userRouter.get("/partners", authenticationMiddleware(), userController.getPotentialPartners);
userRouter.patch("/update", authenticationMiddleware(), upload.single('profile_pict'), userController.updateUser)
// TODO VAlidator


export default userRouter;
