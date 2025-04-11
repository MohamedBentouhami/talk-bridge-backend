import { Request, Response } from "express";

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
            res.json(data.responseData.translatedText);
        } catch (error) {
            res.status(500).send('Error fetching translation');
        }

    },

}

export default toolController;