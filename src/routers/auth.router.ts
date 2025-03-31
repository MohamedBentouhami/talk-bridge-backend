import { Router } from "express";
import authController from "../controllers/auth.controller";
import { userCreationValidator } from "../middlewares/user-creation.middleware";
import { userCreationValidation } from "../validators/user.validator";

const authRouter = Router();

authRouter.post("/signup", userCreationValidator(userCreationValidation), authController.signup )
authRouter.post("/login", authController.login)

export default authRouter;