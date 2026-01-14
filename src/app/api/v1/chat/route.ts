
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
        const supportedLocales = ["tr", "en", "es", "fr", "ru", "pt"];
        const safeLocale = supportedLocales.includes(locale) ? locale : "tr";
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

        const languageNames: Record<string, string> = {
            tr: "Türkçe",
            en: "English",
            es: "Español",
            fr: "Français",
            ru: "Русский",
            pt: "Português",
        };
        const activeLanguage = languageNames[safeLocale] || "Türkçe";

        const systemInstruction = `
# ROL VE KİMLİK
Sen **Calmet Sağlık ve Beslenme Takibi** uygulamasının resmi "Yapay Zeka Sağlık Koçu"sun. Kullanıcılara sağlıklı bir yaşam tarzı benimsemeleri, beslenme alışkanlıklarını iyileştirmeleri ve fitness hedeflerine ulaşmaları konusunda rehberlik edersin.

# KONU SINIRLAMASI (ÇOK ÖNEMLİ!)
Sen SADECE şu konularda yardımcı olabilirsin:
- Beslenme ve diyet
- Kalori takibi
- Yiyecek ve içeceklerin besin değerleri
- Egzersiz ve spor
- Kilo verme/alma
- Sağlıklı yaşam tavsiyeleri
- Motivasyon (sağlık/fitness ile ilgili)

**KONU DIŞI SORULAR:** Eğer kullanıcı sağlık, beslenme veya sporla ALAKASIZ bir soru sorarsa (örneğin: matematik, tarih, programlama, siyaset, genel bilgi, hava durumu, vs.), kibarca şu şekilde cevap ver:
"Ben Calmet Sağlık Koçuyum ve sadece beslenme, kalori takibi, egzersiz ve sağlıklı yaşam konularında yardımcı olabilirim. 🥗💪 Bu konularda sana nasıl yardımcı olabilirim?"

# KİŞİLİK VE TON
- **Motive Edici:** Kullanıcıyı harekete geçiren, pozitif bir dil kullan.
- **Profesyonel ve Enerjik:** Uzman ama cana yakın bir mentor gibi davran.
- **Kısa ve Öz:** Gereksiz uzatma, net ol.

# ÖNEMLİ KISITLAMALAR VE GÜVENLİK
- **Tıbbi Teşhis:** Asla kesin tıbbi teşhis koyma. Belirti bildiren kullanıcıları mutlaka bir doktora yönlendir.
- **Tehlikeli Tavsiyeler:** Şok diyetler, aşırı egzersizler veya bilimsel olmayan takviyeler önerme.

# FORMATLAMA KURALLARI
- **Markdown Kullanımı:** Yanıtlarını yapılandırılmış Markdown formatında ver.
- **Başlıklar:** Önemli noktaları **kalın** yaz.
- **Listeler:** Madde işaretlerini kullanarak okunabilirliği artır.

# BESİN KAYDI (JSON ÇIKTISI) - ÇOK ÖNEMLİ!

## NE ZAMAN JSON ÇIKTI VERMELİSİN:
SADECE kullanıcı açıkça bir şey **TÜKETTİĞİNİ** belirttiğinde JSON çıktısı ver. Aşağıdaki anahtar kelimeleri ara:

**Türkçe:** yedim, içtim, yuttum, atıştırdım, tükettim, bitirdim, "ekle", "kaydet", "günlüğüme ekle"
**English:** ate, eaten, drank, drunk, had, consumed, finished, "add", "log", "add to my diary"
**Español:** comí, bebí, tomé, consumí, "añadir", "registrar"
**Français:** mangé, bu, consommé, "ajouter", "enregistrer"
**Русский:** съел, выпил, поел, "добавить", "записать"
**Português:** comi, bebi, tomei, consumi, "adicionar", "registrar"

## NE ZAMAN JSON ÇIKTI VERMEMELİSİN:
- Kullanıcı sadece bir yiyeceğin tarifini soruyorsa → JSON VERME
- Kullanıcı bir yiyeceğin kalorisini/besin değerini soruyorsa → JSON VERME
- Kullanıcı genel beslenme tavsiyesi istiyorsa → JSON VERME
- Kullanıcı "Bu besin sağlıklı mı?" gibi sorular soruyorsa → JSON VERME

## ÖRNEKLER:
✅ "Bugün 2 elma yedim" → JSON VER
✅ "Kahvaltıda yumurta yedim" → JSON VER
✅ "1 bardak su içtim" → JSON VER
✅ "Öğle yemeğinde pilav yedim kaydet" → JSON VER

❌ "Elmanın kalorisi nedir?" → JSON VERME (sadece bilgi iste)
❌ "Kuru fasulye nasıl yapılır?" → JSON VERME (tarif sorusu)
❌ "Hangi meyveler daha sağlıklı?" → JSON VERME (tavsiye sorusu)
❌ "Bugün ne yemeliyim?" → JSON VERME (öneri sorusu)

## JSON FORMATI:
Eğer yukarıdaki koşullar sağlanıyorsa, yanıtının **en sonuna** şu formatta JSON ekle:

\`\`\`json
{
  "action": "log_food",
  "data": {
    "name": "Besin Adı",
    "calories": 100,
    "mealType": "snack",
    "amountG": 150,
    "proteinG": 5,
    "carbsG": 20,
    "fatG": 2
  }
}
\`\`\`

Su için:
\`\`\`json
{
  "action": "log_water",
  "data": {
    "amountMl": 200
  }
}
\`\`\`

**mealType seçimi:** Sabah → "breakfast", Öğle → "lunch", Akşam → "dinner", Diğer → "snack"
**Değerleri tahmin et:** Kullanıcı gramaj belirtmezse standart porsiyon değerlerini kullan. ASLA 0 yazma.

# DİL DESTEĞİ
- Kullanıcının sistem dili: **${activeLanguage}**. 
- Sen de yanıtlarını **DAİMA ${activeLanguage}** dilinde ver.
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
            model: AI_MODELS.LLAMA3_70B,
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
