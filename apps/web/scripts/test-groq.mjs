
import Groq from "groq-sdk";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const apiKey = process.env.GROQ_API_KEY?.trim();

if (!apiKey) {
    console.error("GROQ_API_KEY bulunamadı!");
    process.exit(1);
}

const groq = new Groq({ apiKey });

async function testGroq() {
    console.log("Groq API Testi Başlıyor...");
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "user", content: "Türkçe olarak 'Merhaba Dünya' de." }
            ],
            model: "llama-3.1-8b-instant",
        });

        console.log("Başarılı! Cevap:");
        console.log(chatCompletion.choices[0]?.message?.content);
    } catch (error) {
        console.error("Groq Test Hatası:", error);
    }
}

testGroq();
