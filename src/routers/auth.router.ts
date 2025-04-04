import { Router } from "express";
import authController from "../controllers/auth.controller";
import { userCreationValidator } from "../middlewares/user-creation.middleware";
import { userCreationValidation } from "../validators/user.validator";
import upload from "../config/multerConfig";

const authRouter = Router();

authRouter.post("/signup", userCreationValidator(userCreationValidation), upload.single('profilePic'), authController.signup )
authRouter.post("/login", authController.login)
authRouter.post("/logout", authController.logout)

export default authRouter;