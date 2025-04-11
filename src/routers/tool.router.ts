import { Router } from "express";
import toolController from "../controllers/tool.controller";

const toolRouter = Router();

toolRouter.post('/translate', toolController.getTranslation);

export default toolRouter;