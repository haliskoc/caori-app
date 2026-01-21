import type { ActivityType, MealType } from "@calai/shared/types";

const NUMBER_WORDS: Record<string, number> = {
  bir: 1,
  iki: 2,
  uc: 3,
  dort: 4,
  bes: 5,
  alti: 6,
  yedi: 7,
  sekiz: 8,
  dokuz: 9,
  on: 10,
  yarim: 0.5,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,
};

const WATER_KEYWORDS = ["su", "water"];

const MEAL_KEYWORDS: Array<{ type: MealType; keywords: string[] }> = [
  { type: "breakfast", keywords: ["kahvalti", "sabah", "breakfast"] },
  { type: "lunch", keywords: ["ogle", "oglen", "lunch"] },
  { type: "dinner", keywords: ["aksam", "dinner"] },
  { type: "snack", keywords: ["atistir", "ara", "snack", "gece"] },
];

const ACTIVITY_KEYWORDS: Array<{ type: ActivityType; keywords: string[] }> = [
  { type: "walking", keywords: ["yurudum", "yuruyus", "yurume", "walk", "walking"] },
  { type: "running", keywords: ["kostum", "kosu", "run", "running"] },
  { type: "gym", keywords: ["spor", "antrenman", "gym", "workout"] },
  { type: "cycling", keywords: ["bisiklet", "cycle", "cycling"] },
  { type: "swimming", keywords: ["yuzdum", "yuzme", "swim", "swimming"] },
  { type: "yoga", keywords: ["yoga"] },
  { type: "hiit", keywords: ["hiit"] },
  { type: "pilates", keywords: ["pilates"] },
  { type: "stairs", keywords: ["merdiven", "stairs"] },
];

const TURKISH_CHAR_MAP: Record<string, string> = {
  ç: "c",
  Ç: "c",
  ğ: "g",
  Ğ: "g",
  ı: "i",
  İ: "i",
  ö: "o",
  Ö: "o",
  ş: "s",
  Ş: "s",
  ü: "u",
  Ü: "u",
};

function stripDiacritics(value: string) {
  return value.replace(/[çğıöşüÇĞİÖŞÜ]/g, (char) => TURKISH_CHAR_MAP[char] ?? char);
}

function normalizeText(value: string) {
  return stripDiacritics(value.toLowerCase());
}

function parseNumber(tokens: string[]) {
  for (const token of tokens) {
    if (!token) continue;
    if (/^\d/.test(token)) {
      const parsed = Number.parseFloat(token.replace(",", "."));
      if (Number.isFinite(parsed)) {
        return parsed;
      }
    }
    if (NUMBER_WORDS[token] !== undefined) {
      return NUMBER_WORDS[token];
    }
  }
  return null;
}

function guessMealType(tokens: string[]): MealType {
  for (const { type, keywords } of MEAL_KEYWORDS) {
    if (keywords.some((keyword) => tokens.some((token) => token.includes(keyword)))) {
      return type;
    }
  }
  return "snack";
}

function guessActivity(tokens: string[]): ActivityType {
  for (const { type, keywords } of ACTIVITY_KEYWORDS) {
    if (keywords.some((keyword) => tokens.some((token) => token.includes(keyword)))) {
      return type;
    }
  }
  return "walking";
}

export type ParsedIntent =
  | { kind: "water"; data: { amountMl: number } }
  | { kind: "food"; data: { name: string; calories: number; mealType: MealType } }
  | { kind: "activity"; data: { activityType: ActivityType; durationMin: number; estimatedCalories: number } };

export function parseQuickText(text: string): ParsedIntent | null {
  const normalized = normalizeText(text);
  const tokens = normalized.split(/\s+/).filter(Boolean);
  const number = parseNumber(tokens) ?? 1;

  if (WATER_KEYWORDS.some((keyword) => tokens.includes(keyword))) {
    const amountMl = number < 10 ? number * 250 : number;
    return { kind: "water", data: { amountMl: Math.round(amountMl) } };
  }

  const activityDetected = ACTIVITY_KEYWORDS.some(({ keywords }) =>
    keywords.some((keyword) => tokens.some((token) => token.includes(keyword)))
  );
  if (activityDetected) {
    const activityType = guessActivity(tokens);
    const durationMin = number < 15 ? 30 : Math.round(number);
    const estimatedCalories = Math.round(durationMin * 5);
    return { kind: "activity", data: { activityType, durationMin, estimatedCalories } };
  }

  const calories = number < 20 ? Math.round(number * 100) : Math.round(number);
  const mealType = guessMealType(tokens);
  const name = tokens.filter((token) => !Number.isFinite(Number(token))).join(" ") || "Hızlı Kayıt";

  return { kind: "food", data: { name, calories, mealType } };
}
