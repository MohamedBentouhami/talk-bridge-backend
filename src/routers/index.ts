import { Router } from "express";
import authRouter from "./auth.router";
import userRouter from "./user.router";
import messageRouter from "./message.router";
import friendshipRouter from "./friendship.router";
import toolRouter from "./tool.router";
import voiceroomRouter from "./voiceroom.router";

const mainRouter = Router();

mainRouter.use("/auth", authRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/messages", messageRouter);
mainRouter.use("/friends", friendshipRouter);
mainRouter.use("/tools", toolRouter);
mainRouter.use("/voicerooms", voiceroomRouter);

export default mainRouter;