
import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { getDb } from "@/lib/db";
import { users, profiles, goals, entries } from "@/lib/schema";
import { eq, and, gte } from "drizzle-orm";
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

        if (lastReset < today) {
            usageCount = 0;
        }

        const LIMITS = { free: 0, pro: 0, ai_plus: 25 };

        if (usageCount >= LIMITS[plan]) {
            return NextResponse.json(
                {
                    error: plan === "ai_plus"
                        ? "Günlük 25 mesaj limitine ulaştınız."
                        : "AI Koçu sadece AI PLUS paketine özeldir.",
                    limitReached: true,
                    plan,
                },
                { status: 403 }
            );
        }

        if (!groq) {
            return NextResponse.json({
                reply: "AI servisi şu an yapılandırılmadı. Lütfen yönetici ile iletişime geçin.",
            });
        }

        // ========== FETCH USER DATA FOR PERSONALIZATION ==========
        let userProfile = null;
        let userGoals = null;
        let todayEntries: any[] = [];

        try {
            const profileResult = await db.select().from(profiles).where(eq(profiles.userId, session.user.sub));
            userProfile = profileResult[0] || null;
        } catch (e) {
            console.log("No profile found for user, using defaults");
        }

        try {
            const goalsResult = await db.select().from(goals).where(eq(goals.userId, session.user.sub));
            userGoals = goalsResult[0] || null;
        } catch (e) {
            console.log("No goals found for user, using defaults");
        }

        // Get today's entries for daily summary
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        try {
            todayEntries = await db
                .select()
                .from(entries)
                .where(and(eq(entries.userId, session.user.sub), gte(entries.timestamp, todayStart)));
        } catch (e) {
            console.log("No entries found for today");
        }

        // Calculate daily summary
        const dailySummary = {
            caloriesIn: 0,
            caloriesOut: 0,
            waterMl: 0,
            proteinG: 0,
            carbsG: 0,
            fatG: 0,
            activityMin: 0,
        };

        for (const entry of todayEntries) {
            if (entry.type === "food") {
                dailySummary.caloriesIn += entry.calories || 0;
                dailySummary.proteinG += entry.proteinG || 0;
                dailySummary.carbsG += entry.carbsG || 0;
                dailySummary.fatG += entry.fatG || 0;
            } else if (entry.type === "water") {
                dailySummary.waterMl += entry.amountMl || 0;
            } else if (entry.type === "activity") {
                dailySummary.caloriesOut += entry.estimatedCalories || 0;
                dailySummary.activityMin += entry.durationMin || 0;
            }
        }

        // Build personalized context
        const userName = userProfile?.fullName || userRecord.name || "Kullanıcı";
        const userWeight = userProfile?.weightKg || 0;
        const userHeight = userProfile?.heightCm || 0;
        const userAge = userProfile?.age || 0;
        const mainGoal = userProfile?.mainGoal || "genel sağlık";

        const calorieGoal = userGoals?.calorieGoal || 2200;
        const proteinGoal = userGoals?.proteinGoalG || 0;
        const carbsGoal = userGoals?.carbsGoalG || 0;
        const fatGoal = userGoals?.fatGoalG || 0;
        const waterGoal = userGoals?.waterGoalMl || 2500;
        const activityGoal = userGoals?.activityGoalMin || 30;

        const remainingCalories = Math.max(0, calorieGoal - dailySummary.caloriesIn + dailySummary.caloriesOut);
        const remainingProtein = Math.max(0, (proteinGoal || 0) - dailySummary.proteinG);
        const remainingCarbs = Math.max(0, (carbsGoal || 0) - dailySummary.carbsG);
        const remainingFat = Math.max(0, (fatGoal || 0) - dailySummary.fatG);
        const remainingWater = Math.max(0, waterGoal - dailySummary.waterMl);

        const languageNames: Record<string, string> = {
            tr: "Türkçe", en: "English", es: "Español", fr: "Français", ru: "Русский", pt: "Português",
        };
        const activeLanguage = languageNames[safeLocale] || "Türkçe";

        // ========== BUILD DYNAMIC SYSTEM INSTRUCTION ==========
        const getSystemInstruction = (lang: string) => {
            const userContextTR = `
# KULLANICI PROFİLİ (KİŞİSELLEŞTİRİLMİŞ TAVSİYELER İÇİN KULLAN)
- **İsim:** ${userName}
- **Yaş:** ${userAge || "Belirtilmemiş"} | **Boy:** ${userHeight ? userHeight + " cm" : "Belirtilmemiş"} | **Kilo:** ${userWeight ? userWeight + " kg" : "Belirtilmemiş"}
- **Ana Hedef:** ${mainGoal}

# BUGÜNKÜ DURUM (GERÇEK VERİLER)
- **Alınan Kalori:** ${dailySummary.caloriesIn} kcal / Hedef: ${calorieGoal} kcal → **Kalan: ${remainingCalories} kcal**
- **Yakılan Kalori:** ${dailySummary.caloriesOut} kcal (${dailySummary.activityMin} dk aktivite)
- **Makrolar:** Protein: ${dailySummary.proteinG}g | Karb: ${dailySummary.carbsG}g | Yağ: ${dailySummary.fatG}g
- **Su:** ${dailySummary.waterMl} ml / Hedef: ${waterGoal} ml → **Kalan: ${remainingWater} ml**
${proteinGoal > 0 ? `- **Kalan Makro Hedefleri:** Protein: ${remainingProtein}g | Karb: ${remainingCarbs}g | Yağ: ${remainingFat}g` : ""}
`;

            const userContextEN = `
# USER PROFILE (USE FOR PERSONALIZED ADVICE)
- **Name:** ${userName}
- **Age:** ${userAge || "Not specified"} | **Height:** ${userHeight ? userHeight + " cm" : "Not specified"} | **Weight:** ${userWeight ? userWeight + " kg" : "Not specified"}
- **Main Goal:** ${mainGoal}

# TODAY'S STATUS (REAL DATA)
- **Calories In:** ${dailySummary.caloriesIn} kcal / Goal: ${calorieGoal} kcal → **Remaining: ${remainingCalories} kcal**
- **Calories Burned:** ${dailySummary.caloriesOut} kcal (${dailySummary.activityMin} min activity)
- **Macros:** Protein: ${dailySummary.proteinG}g | Carbs: ${dailySummary.carbsG}g | Fat: ${dailySummary.fatG}g
- **Water:** ${dailySummary.waterMl} ml / Goal: ${waterGoal} ml → **Remaining: ${remainingWater} ml**
${proteinGoal > 0 ? `- **Remaining Macro Goals:** Protein: ${remainingProtein}g | Carbs: ${remainingCarbs}g | Fat: ${remainingFat}g` : ""}
`;

            const prompts: Record<string, string> = {
                tr: `
# ROL VE KİMLİK
Sen **Calmet** uygulamasının "Yapay Zeka Sağlık Koçu"sun. Kullanıcıyı adıyla hitap et ve kişiselleştirilmiş tavsiyeler ver.

${userContextTR}

# KONU SINIRLAMASI
Sadece: Beslenme, diyet, kalori, egzersiz, kilo kontrolü ve sağlıklı yaşam.

# MUTFAK UZMANLIĞI
Türk mutfağı, dünya mutfağı ve tatlılar konusunda kalori/makro uzmanısın.

# AKILLI ÖĞÜ PLANLAMA
Kullanıcı "ne yemeliyim", "akşam yemeği öner" derse, KALAN makro hedeflerine göre öneri yap.

# HAFTALIK RAPOR
Kullanıcı "haftalık rapor", "özet", "weekly report" derse, bugünkü verileri kullanarak motive edici bir özet ver.

# KAYIT FORMATLARI (JSON)
1. **YEMEK:** Kullanıcı "yedim, içtim, ekle" derse:
\`\`\`json
{ "action": "log_food", "data": { "name": "Besin", "calories": 100, "mealType": "snack", "amountG": 100, "proteinG": 5, "carbsG": 20, "fatG": 2 } }
\`\`\`

2. **SU:** "su içtim, bardak su" derse:
\`\`\`json
{ "action": "log_water", "data": { "amountMl": 200 } }
\`\`\`

3. **AKTİVİTE:** Kullanıcı "yürüdüm, koştum, spor yaptım, egzersiz" derse:
\`\`\`json
{ "action": "log_activity", "data": { "activityType": "walking", "durationMin": 30, "estimatedCalories": 150 } }
\`\`\`
activityType: walking, running, gym, cycling, swimming, yoga, hiit, pilates, stairs
`,
                en: `
# ROLE AND IDENTITY
You are the "AI Health Coach" of **Calmet** app. Address the user by name and give personalized advice.

${userContextEN}

# TOPIC LIMITATION
Only: Nutrition, diet, calories, exercise, weight control, healthy living.

# CULINARY EXPERTISE
Expert in Turkish cuisine, global cuisine, and desserts with calorie/macro knowledge.

# SMART MEAL PLANNING
If user asks "what should I eat", suggest based on REMAINING macro goals.

# WEEKLY REPORT
If user says "weekly report", "summary", give a motivating summary using today's data.

# LOGGING FORMATS (JSON)
1. **FOOD:** When user says "ate, drank, add, log":
\`\`\`json
{ "action": "log_food", "data": { "name": "Food", "calories": 100, "mealType": "snack", "amountG": 100, "proteinG": 5, "carbsG": 20, "fatG": 2 } }
\`\`\`

2. **WATER:** "drank water, glass of water":
\`\`\`json
{ "action": "log_water", "data": { "amountMl": 200 } }
\`\`\`

3. **ACTIVITY:** When user says "walked, ran, exercised, worked out":
\`\`\`json
{ "action": "log_activity", "data": { "activityType": "walking", "durationMin": 30, "estimatedCalories": 150 } }
\`\`\`
activityType: walking, running, gym, cycling, swimming, yoga, hiit, pilates, stairs
`,
                ru: `
# РОЛЬ
Вы AI-коуч приложения **Calmet**. Обращайтесь к пользователю по имени.

${userContextEN}

# ТЕМЫ
Только: питание, калории, упражнения, здоровый образ жизни.

# JSON ФОРМАТЫ
ЕДАНЬЕ: { "action": "log_food", "data": { "name": "...", "calories": 100, ... } }
ВОДА: { "action": "log_water", "data": { "amountMl": 200 } }
АКТИВНОСТЬ: { "action": "log_activity", "data": { "activityType": "walking", "durationMin": 30, "estimatedCalories": 150 } }
`
            };

            const basePrompt = prompts[lang] || prompts['en'];
            return `
${basePrompt}
# PERSONALITY: Motivational, professional, concise. Use the user's name.
# LANGUAGE: ALWAYS respond in ${activeLanguage}.
# ACCURACY: Estimate values realistically. NEVER use 0 for calories/macros.
            `.trim();
        };

        const systemInstruction = getSystemInstruction(safeLocale);

        type HistoryMessage = { role?: string; content?: string };
        const normalizedHistory: ChatCompletionMessageParam[] = Array.isArray(history)
            ? history
                .map((item) => {
                    const msg = item as HistoryMessage;
                    const content = typeof msg?.content === "string" ? msg.content.trim() : "";
                    if (!content) return null;
                    const role = msg?.role === "list" || msg?.role === "model" || msg?.role === "assistant" ? "assistant" : "user";
                    return { role, content: content.slice(0, MAX_HISTORY_CHARS) } as ChatCompletionMessageParam;
                })
                .filter((item): item is ChatCompletionMessageParam => Boolean(item))
                .slice(-MAX_HISTORY_MESSAGES)
            : [];

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

        await db
            .update(users)
            .set({ usageCount: usageCount + 1, lastReset: new Date() })
            .where(eq(users.id, session.user.sub));

        return NextResponse.json({ reply: text });
    } catch (error: unknown) {
        console.error("Chat API Critical Error:", error);
        const message = error instanceof Error ? error.message : "Bir hata oluştu.";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
