import OpenAI from 'openai';

const client = new OpenAI({
    baseURL: process.env.BASE_URL,
    apiKey: process.env.OPEN_AI_KEY
});

export async function rephraseText(text: string, lg: string) {


    const response = await client.chat.completions.create({
        messages: [
            { role: "system", content: "You are a rephrasing assistant. Only return the rephrased version of the given text. Do not include any explanation or extra words." },
            { role: "user", content: `Rephrase this ${text} in a correct ${lg}` }
        ],
        model: "gpt-4o",
        temperature: 1,
        max_tokens: 4096,
        top_p: 1
    });

    return response.choices[0].message.content;
}
export async function correctionText(text: string, lg: string) {
    const response = await client.chat.completions.create({
        messages: [
            {
                role: "system",
                content: "You are a text correction assistant. Only return the corrected version of the given text, followed by a brief explanation. The correction and explanation must be in the target language."
            },
            {
                role: "user",
                content: `Correct the following text in ${lg}: "${text}"`
            }
        ],
        model: "gpt-4o",
        temperature: 1,
        max_tokens: 4096,
        top_p: 1
    });

    return response.choices[0].message.content;
}