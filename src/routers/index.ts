import { Router } from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";

const mainRouter = Router();

mainRouter.use("/auth", authRouter)
mainRouter.use("/users", userRouter)

export default mainRouter;