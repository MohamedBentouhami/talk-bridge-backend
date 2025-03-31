import { Router } from "express";
import authRouter from "./auth.router";

const mainRouter = Router();

mainRouter.use("/auth", authRouter)

export default mainRouter;