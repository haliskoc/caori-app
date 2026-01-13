
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GOOGLE_AI_API_KEY;

export const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export const AI_MODELS = {
    GEMINI_PRO: "gemini-pro",
};
