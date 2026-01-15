
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const apiKey = process.env.GOOGLE_AI_API_KEY;

if (!apiKey) {
    console.error("API Key not found in .env.local");
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
    try {
        // For listing models, we rely on the generic client behavior or just try a standard one.
        // The SDK wraps the API, so we can check model availability by instantiation.
        // However, the node SDK doesn't expose a direct 'listModels' method on the main client class easily in older versions,
        // but let's try a direct fetch to the API endpoint to be 100% sure what the raw API sees.

        console.log("Testing API Key with 'gemini-1.5-flash'...");
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("Merhaba, çalışıyor musun?");
        console.log("Success! 'gemini-1.5-flash' is working.");
        console.log("Response:", result.response.text());
    } catch (error) {
        console.error("Error with 'gemini-1.5-flash':", error.message);

        console.log("\nTrying 'gemini-pro'...");
        try {
            const model2 = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result2 = await model2.generateContent("Merhaba?");
            console.log("Success! 'gemini-pro' is working.");
            console.log("Response:", result2.response.text());
        } catch (err2) {
            console.error("Error with 'gemini-pro':", err2.message);
        }
    }
}

listModels();
