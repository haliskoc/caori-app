import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth/auth0";
import { getDb } from "@/lib/database/db";
import { users, profiles, goals, entries } from "@/lib/database/schema";
import { eq, and, gte } from "drizzle-orm";
import { groq, AI_MODELS } from "@/lib/ai/ai";
import { ensureUser } from "@/lib/database/db";
import { braveSearch, formatSearchResultsForAI, isBraveSearchConfigured } from "@/lib/integrations/brave-search";
import type { ChatCompletionMessageParam } from "groq-sdk/resources/chat/completions";

type ChatCommandAction =
    | "none"
    | "log_food"
    | "log_water"
    | "log_drink"
    | "log_activity"
    | "analyze_day"
    | "suggest_meal"
    | "nutrition_info"
    | "request_web_search"
    | "set_reminder";

type ChatCommand = {
    action: ChatCommandAction;
    data?: unknown;
    isEstimate?: boolean;
    missing?: string[];
};

type ChatApiResponse = {
    reply: string;
    command?: ChatCommand;
};

const allowedChatActions = new Set<ChatCommandAction>([
    "none",
    "log_food",
    "log_water",
    "log_drink",
    "log_activity",
    "analyze_day",
    "suggest_meal",
    "nutrition_info",
    "request_web_search",
    "set_reminder",
]);

function extractFirstJsonObject(text: string) {
    const start = text.indexOf("{");
    if (start === -1) {
        return null;
    }
    let depth = 0;
    let inString = false;
    let escaped = false;
    for (let i = start; i < text.length; i += 1) {
        const char = text[i];
        if (inString) {
            if (escaped) {
                escaped = false;
            } else if (char === "\\") {
                escaped = true;
            } else if (char === '"') {
                inString = false;
            }
            continue;
        }
        if (char === '"') {
            inString = true;
            continue;
        }
        if (char === "{") {
            depth += 1;
        } else if (char === "}") {
            depth -= 1;
            if (depth === 0) {
                return text.slice(start, i + 1);
            }
        }
    }
    return null;
}

function toLooseNumber(value: unknown) {
    if (typeof value === "number" && Number.isFinite(value)) {
        return value;
    }
    if (typeof value === "string") {
        const match = value.match(/-?\d+(?:\.\d+)?/);
        if (match) {
            const parsed = Number(match[0]);
            if (Number.isFinite(parsed)) {
                return parsed;
            }
        }
    }
    return null;
}

function normalizeCommand(raw: unknown): ChatCommand | undefined {
    if (!raw || typeof raw !== "object") {
        return undefined;
    }
    const action = (raw as { action?: unknown }).action;
    if (typeof action !== "string") {
        return undefined;
    }
    if (!allowedChatActions.has(action as ChatCommandAction)) {
        return undefined;
    }
    const base: ChatCommand = {
        action: action as ChatCommandAction,
    };

    const data = (raw as { data?: unknown }).data;
    if (data !== undefined) {
        base.data = data;
    }
    const isEstimate = (raw as { isEstimate?: unknown }).isEstimate;
    if (typeof isEstimate === "boolean") {
        base.isEstimate = isEstimate;
    }
    const missing = (raw as { missing?: unknown }).missing;
    if (Array.isArray(missing) && missing.every((item) => typeof item === "string")) {
        base.missing = missing;
    }

    if (base.action === "log_drink" && base.data && typeof base.data === "object") {
        const d = base.data as Record<string, unknown>;
        const name = typeof d.name === "string" ? d.name.trim() : "";
        const amountMl = toLooseNumber(d.amountMl);
        const calories = toLooseNumber(d.calories);
        base.data = {
            name: name || "Belirtilmedi",
            amountMl: Math.max(0, Math.round(amountMl ?? 0)),
            calories: Math.max(0, Math.round(calories ?? 0)),
            proteinG: toLooseNumber(d.proteinG) ?? undefined,
            carbsG: toLooseNumber(d.carbsG) ?? undefined,
            fatG: toLooseNumber(d.fatG) ?? undefined,
        };
    }

    if (base.action === "log_water" && base.data && typeof base.data === "object") {
        const d = base.data as Record<string, unknown>;
        const amountMl = toLooseNumber(d.amountMl);
        base.data = { amountMl: Math.max(0, Math.round(amountMl ?? 0)) };
    }

    if (base.action === "log_food" && base.data && typeof base.data === "object") {
        const d = base.data as Record<string, unknown>;
        const calories = toLooseNumber(d.calories);
        const amountG = toLooseNumber(d.amountG);
        base.data = {
            ...d,
            name: typeof d.name === "string" ? d.name.trim() : "Belirtilmedi",
            calories: Math.max(0, Math.round(calories ?? 0)),
            amountG: amountG === null ? undefined : Math.max(0, Math.round(amountG)),
        };
    }

    if (base.action === "log_activity" && base.data && typeof base.data === "object") {
        const d = base.data as Record<string, unknown>;
        const durationMin = toLooseNumber(d.durationMin);
        const estimatedCalories = toLooseNumber(d.estimatedCalories);
        base.data = {
            ...d,
            durationMin: Math.max(0, Math.round(durationMin ?? 0)),
            estimatedCalories: Math.max(0, Math.round(estimatedCalories ?? 0)),
        };
    }

    return base;
}

function parseAiEnvelope(text: string): ChatApiResponse {
    const trimmed = text.trim();

    let parsed: unknown = null;
    try {
        parsed = JSON.parse(trimmed);
    } catch {
        const candidate = extractFirstJsonObject(trimmed);
        if (candidate) {
            try {
                parsed = JSON.parse(candidate);
            } catch {
                parsed = null;
            }
        }
    }

    if (!parsed || typeof parsed !== "object") {
        return { reply: trimmed };
    }

    const reply = (parsed as { reply?: unknown }).reply;
    const replyText = typeof reply === "string" && reply.trim() ? reply.trim() : trimmed;
    const command = normalizeCommand((parsed as { command?: unknown }).command);
    if (command && command.action !== "none") {
        return { reply: replyText, command };
    }
    return { reply: replyText };
}

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
        const { message, history, locale, executeSearch, searchQuery } = await req.json();
        const supportedLocales = ["tr", "en", "es", "fr", "ru", "pt"];
        const safeLocale = supportedLocales.includes(locale) ? locale : "tr";
        const rawMessage = typeof message === "string" ? message.trim() : "";
        const MAX_MESSAGE_CHARS = 800;
        const MAX_HISTORY_MESSAGES = 10;
        const MAX_HISTORY_CHARS = 600;
        const WEB_SEARCH_DAILY_LIMIT = 2; // Max 2 web searches per day for AI Plus

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
        let webSearchCount = userRecord.webSearchCount || 0;
        const lastReset = userRecord.lastReset ? new Date(userRecord.lastReset) : new Date(0);

        // Reset daily counters if new day
        if (lastReset < today) {
            usageCount = 0;
            webSearchCount = 0;
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
        // Fix: Use correct type instead of any[]
        let todayEntries: (typeof entries.$inferSelect)[] = [];

        try {
            const profileResult = await db.select().from(profiles).where(eq(profiles.userId, session.user.sub));
            userProfile = profileResult[0] || null;
        } catch {
            console.log("No profile found for user, using defaults");
        }

        try {
            const goalsResult = await db.select().from(goals).where(eq(goals.userId, session.user.sub));
            userGoals = goalsResult[0] || null;
        } catch {
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
        } catch {
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
            if (entry.type === "food" || entry.type === "drink") {
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
- **Aktivite Hedefi:** ${activityGoal} dk

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
- **Activity Goal:** ${activityGoal} min

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

# MUTFAK UZMANLIĞI - TÜRK YEMEK VERİTABANI
Türk mutfağı, dünya mutfağı ve tatlılar konusunda kalori/makro uzmanısın.

## STANDART PORSİYONLAR (Bu değerleri kullan!)
| Yemek | Porsiyon | Gram | Kalori | Protein | Karb | Yağ |
|-------|----------|------|--------|---------|------|-----|
| Kuru Fasulye | 1 tabak | 300g | 330 | 21 | 54 | 3 |
| Pilav | 1 porsiyon | 150g | 195 | 4 | 42 | 1 |
| Mercimek Çorbası | 1 kase | 250ml | 140 | 9 | 20 | 3 |
| Kıymalı Pide | 1 adet | 250g | 550 | 25 | 55 | 24 |
| Lahmacun | 1 adet | 120g | 270 | 12 | 32 | 10 |
| Döner (tavuk) | 1 porsiyon | 150g | 250 | 30 | 5 | 12 |
| Döner (et) | 1 porsiyon | 150g | 320 | 28 | 3 | 22 |
| İskender | 1 porsiyon | 350g | 650 | 35 | 45 | 38 |
| Menemen | 1 porsiyon | 200g | 220 | 12 | 8 | 16 |
| Simit | 1 adet | 120g | 340 | 10 | 62 | 5 |
| Poğaça | 1 adet | 80g | 280 | 6 | 30 | 15 |
| Börek (peynirli) | 1 dilim | 100g | 290 | 9 | 25 | 17 |
| Mantı | 1 porsiyon | 250g | 450 | 18 | 52 | 18 |
| Köfte | 4 adet | 120g | 290 | 22 | 8 | 19 |
| Adana Kebap | 1 porsiyon | 150g | 350 | 28 | 2 | 25 |
| Tavuk Şiş | 1 porsiyon | 150g | 220 | 32 | 2 | 9 |
| Izgara Balık | 1 porsiyon | 200g | 240 | 40 | 0 | 8 |
| Zeytinyağlı Dolma | 3 adet | 150g | 180 | 3 | 28 | 7 |
| İmam Bayıldı | 1 porsiyon | 200g | 190 | 3 | 18 | 12 |
| Cacık | 1 kase | 150g | 70 | 4 | 6 | 3 |
| Ayran | 1 bardak | 200ml | 75 | 4 | 6 | 4 |
| Türk Kahvesi | 1 fincan | 50ml | 5 | 0 | 1 | 0 |
| Çay | 1 bardak | 150ml | 2 | 0 | 0 | 0 |
| Baklava | 1 dilim | 60g | 280 | 4 | 32 | 16 |
| Künefe | 1 porsiyon | 150g | 450 | 8 | 48 | 26 |
| Sütlaç | 1 kase | 150g | 180 | 5 | 30 | 4 |
| Pizza | 1 dilim | 100g | 270 | 11 | 33 | 10 |
| Hamburger | 1 adet | 200g | 450 | 22 | 35 | 25 |
| Makarna | 1 tabak | 250g | 350 | 12 | 65 | 5 |
| Tavuk Göğsü | 1 porsiyon | 150g | 165 | 31 | 0 | 4 |
| Yumurta | 1 adet | 50g | 75 | 6 | 1 | 5 |
| Ekmek | 1 dilim | 35g | 90 | 3 | 17 | 1 |

# ⚠️ KRİTİK: AKSIYON TESPİT KURALLARI

## ✅ YEMEK KAYDI (log_food) - Kullanıcı YEDİĞİNİ söylerse:
Tetikleyiciler: "yedim", "yemek yedim", "kahvaltı yaptım", "öğle yemeği", "ekle", "kaydet"
\`\`\`json
{ "action": "log_food", "data": { "name": "Yemek Adı", "calories": 330, "mealType": "lunch", "amountG": 300, "proteinG": 21, "carbsG": 54, "fatG": 3 } }
\`\`\`

## ✅ SU KAYDI (log_water):
Tetikleyiciler: "su içtim", "bardak su", "şişe su"
\`\`\`json
{ "action": "log_water", "data": { "amountMl": 200 } }
\`\`\`

## ✅ İÇECEK KAYDI (log_drink):
Tetikleyiciler: kola, ayran, süt, kahve, çay, meyve suyu, enerji içeceği, vb.
- Kullanıcı miktar yazmadıysa: varsayılan makul bir ml seç ve command.isEstimate=true yap.
\`\`\`json
{ "action": "log_drink", "data": { "name": "Kola", "amountMl": 330, "calories": 140, "carbsG": 35 } }
\`\`\`

## ✅ AKTİVİTE KAYDI (log_activity):
Tetikleyiciler: "yürüdüm", "koştum", "spor yaptım", "egzersiz", "antrenman"
\`\`\`json
{ "action": "log_activity", "data": { "activityType": "walking", "durationMin": 30, "estimatedCalories": 150 } }
\`\`\`
activityType: walking, running, gym, cycling, swimming, yoga, hiit, pilates, stairs

## ✅ GÜNLÜK ANALİZ (analyze_day) - Kullanıcı bugünü sorgularsa:
Tetikleyiciler: "bugün nasılım", "günümü analiz et", "durumum ne", "ne kadar yedim"
\`\`\`json
{ "action": "analyze_day", "data": { "analysisType": "nutrition" } }
\`\`\`
Bu aksiyon tetiklendiğinde, yukarıdaki BUGÜNKÜ DURUM verilerini kullanarak detaylı analiz yap.

## ✅ YEMEK ÖNERİSİ (suggest_meal) - Kullanıcı öneri isterse:
Tetikleyiciler: "ne yemeliyim", "öneri ver", "akşam yemeği", "atıştırmalık öner"
\`\`\`json
{ "action": "suggest_meal", "data": { "mealType": "dinner", "targetCalories": 500, "suggestions": ["Izgara Tavuk + Salata", "Mercimek Çorbası + Ekmek"] } }
\`\`\`
KALAN kalori ve makrolara göre 2-3 öneri sun.

## ✅ HATIRLATICI KUR (set_reminder):
Tetikleyiciler: "hatırlat", "alarm kur", "beni uyar"
\`\`\`json
{ "action": "set_reminder", "data": { "type": "water", "intervalMin": 60, "message": "Su içme zamanı!" } }
\`\`\`
type: water, meal, exercise

## ✅ BESİN BİLGİSİ (nutrition_info) - Sadece bilgi isterse:
Tetikleyiciler: "kaç kalori", "besin değeri", "sağlıklı mı", "protein içeriği"
\`\`\`json
{ "action": "nutrition_info", "data": { "food": "Kuru Fasulye", "per100g": { "calories": 110, "protein": 7, "carbs": 18, "fat": 1 }, "typicalServing": "300g (1 tabak)" } }
\`\`\`
Bu durumda KAYIT YAPMA, sadece bilgi ver.

## ❌ KAYIT YAPMA (normal sohbet):
- Genel sorular, selamlaşma, teşekkür
- Tarif sorma
- Diyet planı hakkında genel sorular

# ÖĞÜN TESPİTİ (Saate göre)
- 06:00-10:00 → breakfast
- 11:00-14:00 → lunch  
- 18:00-21:00 → dinner
- Diğer → snack
`,
                en: `
# ROLE AND IDENTITY
You are the "AI Health Coach" of **Calmet** app. Address the user by name and give personalized advice.

${userContextEN}

# TOPIC LIMITATION
Only: Nutrition, diet, calories, exercise, weight control, healthy living.

# CULINARY EXPERTISE - FOOD DATABASE
Expert in global cuisine with calorie/macro knowledge.

## STANDARD PORTIONS (Use these values!)
| Food | Serving | Grams | Calories | Protein | Carbs | Fat |
|------|---------|-------|----------|---------|-------|-----|
| Rice | 1 serving | 150g | 195 | 4 | 42 | 1 |
| Pasta | 1 plate | 250g | 350 | 12 | 65 | 5 |
| Pizza | 1 slice | 100g | 270 | 11 | 33 | 10 |
| Burger | 1 piece | 200g | 450 | 22 | 35 | 25 |
| Chicken Breast | 1 serving | 150g | 165 | 31 | 0 | 4 |
| Grilled Fish | 1 serving | 200g | 240 | 40 | 0 | 8 |
| Egg | 1 piece | 50g | 75 | 6 | 1 | 5 |
| Bread | 1 slice | 35g | 90 | 3 | 17 | 1 |
| Salad | 1 bowl | 200g | 80 | 3 | 10 | 4 |
| Soup | 1 bowl | 250ml | 120 | 6 | 15 | 4 |

# ⚠️ CRITICAL: ACTION DETECTION RULES

## ✅ FOOD LOG (log_food) - When user says they ATE:
Triggers: "ate", "had", "eaten", "breakfast", "lunch", "dinner", "add", "log"
\`\`\`json
{ "action": "log_food", "data": { "name": "Food Name", "calories": 330, "mealType": "lunch", "amountG": 300, "proteinG": 21, "carbsG": 54, "fatG": 3 } }
\`\`\`

## ✅ WATER LOG (log_water):
Triggers: "drank water", "glass of water", "bottle of water"
\`\`\`json
{ "action": "log_water", "data": { "amountMl": 200 } }
\`\`\`

## ✅ ACTIVITY LOG (log_activity):
Triggers: "walked", "ran", "exercised", "worked out", "gym"
\`\`\`json
{ "action": "log_activity", "data": { "activityType": "walking", "durationMin": 30, "estimatedCalories": 150 } }
\`\`\`
activityType: walking, running, gym, cycling, swimming, yoga, hiit, pilates, stairs

## ✅ DAILY ANALYSIS (analyze_day):
Triggers: "how am I doing", "analyze my day", "my status", "daily summary"
\`\`\`json
{ "action": "analyze_day", "data": { "analysisType": "nutrition" } }
\`\`\`

## ✅ MEAL SUGGESTION (suggest_meal):
Triggers: "what should I eat", "suggest", "recommend", "meal ideas"
\`\`\`json
{ "action": "suggest_meal", "data": { "mealType": "dinner", "targetCalories": 500, "suggestions": ["Grilled Chicken + Salad", "Soup + Bread"] } }
\`\`\`

## ✅ SET REMINDER (set_reminder):
Triggers: "remind me", "set alarm", "notify me"
\`\`\`json
{ "action": "set_reminder", "data": { "type": "water", "intervalMin": 60, "message": "Time to drink water!" } }
\`\`\`

## ✅ NUTRITION INFO (nutrition_info) - Info only:
Triggers: "how many calories", "nutrition", "is it healthy", "protein content"
\`\`\`json
{ "action": "nutrition_info", "data": { "food": "Rice", "per100g": { "calories": 130, "protein": 3, "carbs": 28, "fat": 1 }, "typicalServing": "150g" } }
\`\`\`

## ❌ NO ACTION (normal chat):
- General questions, greetings, thanks
- Recipe requests
- General diet plan questions

# MEAL DETECTION (By time)
- 06:00-10:00 → breakfast
- 11:00-14:00 → lunch
- 18:00-21:00 → dinner
- Other → snack
`,
                ru: `
# РОЛЬ
Вы AI-коуч приложения **Calmet**. Обращайтесь к пользователю по имени.

${userContextEN}

# ТЕМЫ
Только: питание, калории, упражнения, здоровый образ жизни.

# ДЕЙСТВИЯ
✅ log_food: "я съел [еда]" → { "action": "log_food", "data": { "name": "...", "calories": 300, "mealType": "lunch", "amountG": 300, "proteinG": 15, "carbsG": 40, "fatG": 8 } }
✅ log_water: "выпил воду" → { "action": "log_water", "data": { "amountMl": 200 } }
✅ log_activity: "пробежал" → { "action": "log_activity", "data": { "activityType": "running", "durationMin": 30, "estimatedCalories": 300 } }
✅ analyze_day: "как мой день" → { "action": "analyze_day", "data": { "analysisType": "nutrition" } }
✅ suggest_meal: "что поесть" → { "action": "suggest_meal", "data": { "mealType": "dinner", "suggestions": [...] } }
✅ nutrition_info: "калории в [еда]" → { "action": "nutrition_info", "data": { "food": "...", "per100g": {...} } }
❌ НЕ СОЗДАВАТЬ: общие вопросы, благодарности
`
            };

            const basePrompt = prompts[lang] || prompts['en'];
            return `
${basePrompt}
 # PERSONALITY: Motivational, professional, concise. Use the user's name.
 # LANGUAGE: ALWAYS respond in ${activeLanguage}.
 # ACCURACY: Estimate values realistically. If user didn't specify, use NORMAL defaults.

 # DRINK RULES (IMPORTANT)
 - "su içtim" (or equivalent) => log_water
 - Other beverages (kola, ayran, süt, kahve, çay, meyve suyu, enerji içeceği...) => log_drink
 - If user didn't specify amount for drink, choose a realistic default and set command.isEstimate=true

 # OUTPUT (STRICT JSON ONLY)
 Return ONLY one valid JSON object and nothing else (no markdown, no code fences, no extra text):
 {
   "reply": "...",
   "command": { "action": "none" | "log_food" | "log_water" | "log_drink" | "log_activity" | "analyze_day" | "suggest_meal" | "nutrition_info" | "request_web_search" | "set_reminder", "data": { ... }, "isEstimate": true }
 }
 If there is no action, set command.action="none".
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

        // Removed unused 'messages' variable that was here

        let text = "";
        const canDoWebSearch = isBraveSearchConfigured() && plan === "ai_plus" && webSearchCount < WEB_SEARCH_DAILY_LIMIT;

        // ========== HANDLE CONFIRMED WEB SEARCH ==========
        if (executeSearch && searchQuery && canDoWebSearch) {
            // User confirmed web search - execute it
            const searchResults = await braveSearch(searchQuery, 5);
            const formattedResults = formatSearchResultsForAI(searchResults);

            const searchMessages: ChatCompletionMessageParam[] = [
                { role: "system", content: systemInstruction },
                ...normalizedHistory,
                { role: "user", content: `Kullanıcı şunu araştırmamı istedi: "${searchQuery}"\n\nArama Sonuçları:\n${formattedResults}\n\nBu sonuçları kullanarak kapsamlı ve faydalı bir yanıt ver. Kaynaklara atıfta bulun.` },
            ];

            const searchCompletion = await groq.chat.completions.create({
                messages: searchMessages,
                model: AI_MODELS.LLAMA3_70B,
                temperature: 0.7,
                max_tokens: 1024,
            });

            text = searchCompletion.choices[0]?.message?.content || "Arama sonuçları işlenemedi.";

            // Increment web search count
            webSearchCount += 1;
            await db
                .update(users)
                .set({
                    usageCount: usageCount + 1,
                    webSearchCount: webSearchCount,
                    lastReset: new Date()
                })
                .where(eq(users.id, session.user.sub));

        return NextResponse.json(parseAiEnvelope(text));
        }

        // ========== NORMAL AI RESPONSE (with search permission request) ==========
        // Add instruction for AI to request search permission instead of auto-searching
        const searchInstruction = canDoWebSearch ? `

# WEB ARAMASINA İZİN İSTE
Eğer kullanıcının sorusu güncel bilgi gerektiriyorsa (trendler, haberler, son araştırmalar vb.), web araması yapmadan önce izin iste.
Bunu JSON çıktındaki command ile yap:
- command.action = "request_web_search"
- command.data = { "query": "arama sorgusu", "reason": "Neden arama gerektiğini kısa açıkla" }
Otomatik arama YAPMA.
Kalan web arama hakkı: ${WEB_SEARCH_DAILY_LIMIT - webSearchCount}/gün
` : "";

        const messagesWithSearchInstruction: ChatCompletionMessageParam[] = [
            { role: "system", content: systemInstruction + searchInstruction },
            ...normalizedHistory,
            { role: "user", content: rawMessage },
        ];

        const chatCompletion = await groq.chat.completions.create({
            messages: messagesWithSearchInstruction,
            model: AI_MODELS.LLAMA3_70B,
            temperature: 0.7,
            max_tokens: 1024,
        });

        text = chatCompletion.choices[0]?.message?.content || "Cevap üretilemedi.";

        await db
            .update(users)
            .set({ usageCount: usageCount + 1, lastReset: new Date() })
            .where(eq(users.id, session.user.sub));

            return NextResponse.json(parseAiEnvelope(text));
    } catch (error: unknown) {
        console.error("Chat API Critical Error:", error);
        const message = error instanceof Error ? error.message : "Bir hata oluştu.";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
