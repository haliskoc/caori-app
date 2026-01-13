
import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { getDb } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { groq, AI_MODELS } from "@/lib/ai";
import { ensureUser } from "@/lib/db";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";

export async function POST(req: NextRequest) {
    let session;
    try {
        session = await auth0.getSession(req);
    } catch (e) {
        console.error("Auth0 Session Error:", e);
    }

    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { message, history, locale } = await req.json();
        const safeLocale = locale === "en" ? "en" : "tr";
        const rawMessage = typeof message === "string" ? message.trim() : "";
        const MAX_MESSAGE_CHARS = 800;
        const MAX_HISTORY_MESSAGES = 10;
        const MAX_HISTORY_CHARS = 600;

        if (!rawMessage) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }
        if (rawMessage.length > MAX_MESSAGE_CHARS) {
            return NextResponse.json({ error: "Message is too long" }, { status: 400 });
        }

        await ensureUser(session.user);
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

        // Yeni Plan Limitleri (Free & Pro: 0, AI Plus: 25)
        const LIMITS = {
            free: 0,
            pro: 0,
            ai_plus: 25,
        };

        if (usageCount >= LIMITS[plan]) {
            return NextResponse.json(
                {
                    error: plan === "ai_plus"
                        ? "Günlük 25 mesaj limitine ulaştınız. Yarın tekrar bekleriz!"
                        : "AI Koçu sadece AI PLUS paketine özeldir.",
                    limitReached: true,
                    plan,
                },
                { status: 403 }
            );
        }

        if (!groq) {
            return NextResponse.json({
                reply: "AI servisi şu an yapılandırılmadı (GROQ_API_KEY eksik). Lütfen yönetici ile iletişime geçin.",
            });
        }

        const systemInstruction = `
# ROL VE KİMLİK
Sen **Calmet Sağlık ve Beslenme Takibi** uygulamasının resmi "Yapayı Zeka Sağlık Koçu"sun. Kullanıcılara sağlıklı bir yaşam tarzı benimsemeleri, beslenme alışkanlıklarını iyileştirmeleri ve fitness hedeflerine ulaşmaları konusunda rehberlik edersen.

# KİŞİLİK VE TON
- **Motive Edici:** Kullanıcıyı harekete geçiren, pozitif bir dil kullan.
- **Profesyonel ve Enerjik:** Uzman ama cana yakın bir mentor gibi davran.
- **Odaklanmış:** Sadece sağlık, beslenme, spor ve motivasyon konularında konuş.

# ÖNEMLİ KISITLAMALAR VE GÜVENLİK
- **Tıbbi Teşhis:** Asla kesin tıbbi teşhis koyma. Belirti bildiren kullanıcıları mutlaka bir doktora yönlendir.
- **Tehlikeli Tavsiyeler:** Şok diyetler, aşırı egzersizler veya bilimsel olmayan takviyeler önerme.
- **Saygı:** Kullanıcı verilerine ve mahremiyetine saygılı ol.

# FORMATLAMA KURALLARI
- **Markdown Kullanımı:** Yanıtlarını DAİMA yapılandırılmış Markdown formatında ver.
- **Başlıklar:** Önemli noktaları **kalın** yaz.
- **Listeler:** Madde işaretlerini (bullet points) kullanarak okunabilirliği artır.
- **Kısalık:** Bilgi dolu ama öz olsun. Boş laf kalabalığından kaçın.

# DİL DESTEĞİ
- Kullanıcının sistem dili: **${safeLocale === 'tr' ? 'Türkçe' : 'English'}**. 
- Sen de yanıtlarını **DAİMA ${safeLocale === 'tr' ? 'Türkçe' : 'English'}** dilinde ver.
        `.trim();

        type HistoryMessage = { role?: string; content?: string };
        const normalizedHistory: ChatCompletionMessageParam[] = Array.isArray(history)
            ? history
                .map((item) => {
                    const msg = item as HistoryMessage;
                    const content = typeof msg?.content === "string" ? msg.content.trim() : "";
                    if (!content) {
                        return null;
                    }
                    const role =
                        msg?.role === "list" || msg?.role === "model" || msg?.role === "assistant"
                            ? "assistant"
                            : "user";
                    return {
                        role,
                        content: content.slice(0, MAX_HISTORY_CHARS),
                    } as ChatCompletionMessageParam;
                })
                .filter(
                    (item): item is ChatCompletionMessageParam => Boolean(item)
                )
                .slice(-MAX_HISTORY_MESSAGES)
            : [];

        // Convert history to Groq format (user/assistant)
        const messages: ChatCompletionMessageParam[] = [
            { role: "system", content: systemInstruction },
            ...normalizedHistory,
            { role: "user", content: rawMessage },
        ];

        const chatCompletion = await groq.chat.completions.create({
            messages,
            model: AI_MODELS.LLAMA3_8B, // llama-3.1-8b-instant
            temperature: 0.7,
            max_tokens: 1024,
        });

        const text = chatCompletion.choices[0]?.message?.content || "Cevap üretilemedi.";

        // Increment Usage
        await db
            .update(users)
            .set({
                usageCount: usageCount + 1,
                lastReset: new Date(),
            })
            .where(eq(users.id, session.user.sub));

        return NextResponse.json({ reply: text });
    } catch (error: unknown) {
        console.error("Chat API Critical Error:", error);
        if (error instanceof Error && error.stack) {
            console.error(error.stack);
        }
        const message = error instanceof Error ? error.message : "Bir hata oluştu. Lütfen tekrar deneyin.";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
