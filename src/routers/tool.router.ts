import { Router } from "express";
import toolController from "../controllers/tool.controller";

const toolRouter = Router();

toolRouter.post('/translate', toolController.getTranslation);
toolRouter.post('/correction', toolController.getCorrection)
toolRouter.post('/rephrase', toolController.rephraseText)

export default toolRouter;