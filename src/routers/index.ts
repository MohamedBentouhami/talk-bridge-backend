import { Router } from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import messageRouter from "./message.router";
import friendRouter from "./friend.router";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/messages", messageRouter);
mainRouter.use("/friends", friendRouter);

export default mainRouter;