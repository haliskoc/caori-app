
import Groq from "groq-sdk";

const apiKey = process.env.GROQ_API_KEY?.trim();

export const groq = apiKey ? new Groq({ apiKey }) : null;

export const AI_MODELS = {
    LLAMA3_8B: "llama-3.1-8b-instant",
    LLAMA3_70B: "llama-3.3-70b-versatile",
    MIXTRAL_8X7B: "mixtral-8x7b-32768",
};
