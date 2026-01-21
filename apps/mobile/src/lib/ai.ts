import { parseQuickText } from "@/lib/voice";
import type { MealType, ActivityType } from "@calai/shared/types";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type ChatAction =
  | { kind: "food"; data: { name: string; calories: number; mealType: MealType } }
  | { kind: "water"; data: { amountMl: number } }
  | { kind: "activity"; data: { activityType: ActivityType; durationMin: number; estimatedCalories: number } };

export function generateAssistantReply(text: string) {
  const parsed = parseQuickText(text);
  if (!parsed) {
    return {
      message: "Yardımcı olmak için buradayım. Örnek: '2 bardak su içtim' veya '30 dk yürüyüş yaptım'.",
    };
  }

  if (parsed.kind === "water") {
    return {
      message: `Harika! ${parsed.data.amountMl} ml su kaydı ekleyebilirim.`,
      action: parsed,
    };
  }

  if (parsed.kind === "activity") {
    return {
      message: `Not aldım: ${parsed.data.durationMin} dk ${parsed.data.activityType}. Kaydı ekleyebilirim.`,
      action: parsed,
    };
  }

  return {
    message: `Tamam! ${parsed.data.calories} kcal "${parsed.data.name}" (${parsed.data.mealType}) ekleyebilirim.`,
    action: parsed,
  };
}
