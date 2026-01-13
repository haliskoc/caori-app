
import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { getDb } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { genAI } from "@/lib/ai";

export async function POST(req: Request) {
    const session = await auth0.getSession();
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { message, history } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const db = getDb();
        const [userRecord] = await db
            .select()
            .from(users)
            .where(eq(users.id, session.user.sub));

        if (!userRecord) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const plan = (userRecord.plan as "free" | "pro" | "ai_plus") || "free";
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let usageCount = userRecord.usageCount || 0;
        const lastReset = userRecord.lastReset ? new Date(userRecord.lastReset) : new Date(0);

        // Reset daily limit if new day
        if (lastReset < today) {
            usageCount = 0;
        }

        // Define Limits
        const LIMITS = {
            free: 5,
            pro: 20,
            ai_plus: 999999,
        };

        if (usageCount >= LIMITS[plan]) {
            return NextResponse.json(
                {
                    error: "Günlük mesaj limitine ulaştınız.",
                    limitReached: true,
                    plan,
                },
                { status: 403 }
            );
        }

        if (!genAI) {
            // Fallback response if no API key is set
            return NextResponse.json({
                reply: "AI servisi şu an yapılandırılmadı (API Key eksik). Lütfen yönetici ile iletişime geçin.",
            });
        }

        // Initialize Chat
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const systemInstruction = `
Rol: Sen Calmet uygulamasının "Health Coach" adındaki yapay zeka asistanısın. 
Görevin: Kullanıcıların beslenme, diyet, spor ve sağlıklı yaşam sorularını yanıtlamak.
Ton: Motive edici, profesyonel, arkadaş canlısı ve enerjik.
Kısıtlamalar:
- Asla kesin tıbbi teşhis koyma.
- Yasal olmayan tavsiyeler verme.
- Cevaplarını kısa ve okunabilir tut (madde işaretleri kullan).
- Türkçe cevap ver.
    `.trim();

        const chatHistory = history?.map((msg: any) => ({
            role: msg.role === "user" ? "user" : "model",
            parts: [{ text: msg.content }],
        })) || [];

        // Add system instruction as the first message part of the context implicitly or via prompt engineering
        // Gemini API supports system instructions in newer models but keeping it simple here:
        // We send a chat session.

        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: systemInstruction }]
                },
                {
                    role: "model",
                    parts: [{ text: "Anlaşıldı. Calmet Sağlık Koçu olarak nasıl yardımcı olabilirim?" }]
                },
                ...chatHistory
            ],
            generationConfig: {
                maxOutputTokens: 800,
            },
        });

        const result = await chat.sendMessage(message);
        const response = await result.response;
        const text = response.text();

        // Increment Usage
        await db
            .update(users)
            .set({
                usageCount: usageCount + 1,
                lastReset: new Date(),
            })
            .where(eq(users.id, session.user.sub));

        return NextResponse.json({ reply: text });
    } catch (error: any) {
        console.error("Chat API Error:", error);
        return NextResponse.json(
            { error: "Bir hata oluştu. Lütfen tekrar deneyin." },
            { status: 500 }
        );
    }
}
