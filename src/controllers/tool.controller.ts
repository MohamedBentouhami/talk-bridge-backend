import { Request, Response } from "express";
import { correctionText, rephraseText } from "../services/tool.service";

const toolController = {
    getTranslation: async (req: Request, res: Response) => {
        const { content, langpair } = req.body;
        const { URL_TRANSLATION_API } = process.env;

        console.log(`${URL_TRANSLATION_API}?q=${content}&langpair=${langpair}`)
        try {
            const response = await fetch(`${URL_TRANSLATION_API}?q=${content}&langpair=${langpair}`)
            if (!response.ok) {
                throw new Error("Error fetching")
            }
            const data = await response.json();
            console.log(data.responseData.translatedText)
            res.json(data.responseData.translatedText);
        } catch (error) {
            res.status(500).send('Error fetching translation');
        }

    },
    getCorrection: async (req: Request, res: Response) => {
        const { text, lg } = req.body;
        const answer = await correctionText(text, lg);
        res.json(answer);
    },
    rephraseText: async (req: Request, res: Response) => {
        const { text, lg } = req.body;
        const answer = await rephraseText(text, lg);
        console.log(answer)
        res.json(answer);
    }

}

export default toolController;