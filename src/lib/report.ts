import { Entry, DailySummary } from "./types";
import { getDayKey, getLastNDays } from "./utils";

export type ReportTotals = {
  caloriesIn: number;
  caloriesOut: number;
  netCalories: number;
  waterMl: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
};

export type ReportAverages = {
  caloriesIn: number;
  caloriesOut: number;
  waterMl: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
};

export type ReportTopFood = {
  name: string;
  calories: number;
  count: number;
};

export type ReportTopActivity = {
  activityType: string;
  calories: number;
  durationMin: number;
};

export type ReportGoals = {
  calorieGoal: number;
  waterGoalMl: number;
};

export type ReportData = {
  rangeDays: number;
  startDate: string;
  endDate: string;
  entryCount: number;
  activeDays: number;
  daily: DailySummary[];
  totals: ReportTotals;
  averages: ReportAverages;
  topFoods: ReportTopFood[];
  topActivities: ReportTopActivity[];
  goals?: ReportGoals;
  comment: string;
};

function buildMotivation(input: {
  averages: ReportAverages;
  activeDays: number;
  rangeDays: number;
  macroCoverage: number;
  goals?: ReportGoals;
}) {
  const lines: string[] = [];
  const calorieGoal = input.goals?.calorieGoal ?? 2200;
  const waterGoalMl = input.goals?.waterGoalMl ?? 2500;

  if (input.averages.caloriesIn > calorieGoal + 200) {
    lines.push(
      "Ortalama kalori alımın hedefinin üstünde. Porsiyonları biraz küçültmek fayda sağlar."
    );
  } else if (input.averages.caloriesIn < calorieGoal - 300) {
    lines.push(
      "Ortalama kalori alımın hedefinin altında. Dengeli ve yeterli öğün planlamaya odaklan."
    );
  } else {
    lines.push("Kalori alımın hedefle uyumlu, ritmi koruyorsun.");
  }

  if (input.averages.caloriesOut < 80) {
    lines.push("Aktivite düşük görünüyor; kısa yürüyüşler bile dengeyi güçlendirir.");
  } else {
    lines.push("Aktivite tarafı iyi; hareketliliği sürdürmek hedefe yaklaşmanı hızlandırır.");
  }

  if (input.averages.waterMl < waterGoalMl * 0.7) {
    lines.push("Su alımın hedefin altında. Gün içinde 1-2 bardak ekleyerek dengeleyebilirsin.");
  } else {
    lines.push("Su takibin iyi, bu tempo toparlanmayı destekler.");
  }

  if (input.macroCoverage < 0.4) {
    lines.push("Makro bilgisi eksik kayıtlar var. Ürün seçimiyle daha net takip yapabilirsin.");
  }

  if (input.activeDays < Math.max(3, Math.round(input.rangeDays * 0.4))) {
    lines.push("Takip günlerini artırırsan gelişim eğrisi daha net görünür.");
  }

  lines.push("Küçük adımlar büyük değişimi başlatır. Devam et!");
  return lines.join(" ");
}

type ReportEntry = Omit<Entry, "timestamp"> & { timestamp: string | Date };

export function buildReportData(
  entries: ReportEntry[],
  rangeDays: number,
  goals?: ReportGoals
): ReportData {
  const safeDays = Math.max(1, Math.min(90, Math.round(rangeDays || 30)));
  const dayKeys = getLastNDays(safeDays);
  const dayMap = new Map<string, DailySummary>();
  for (const key of dayKeys) {
    dayMap.set(key, {
      date: key,
      caloriesIn: 0,
      caloriesOut: 0,
      waterMl: 0,
      proteinG: 0,
      carbsG: 0,
      fatG: 0,
    });
  }

  for (const entry of entries) {
    const key = getDayKey(entry.timestamp);
    const bucket = dayMap.get(key);
    if (!bucket) {
      continue;
    }
    if (entry.type === "food") {
      bucket.caloriesIn += entry.calories;
      bucket.proteinG += entry.proteinG ?? 0;
      bucket.carbsG += entry.carbsG ?? 0;
      bucket.fatG += entry.fatG ?? 0;
    }
    if (entry.type === "activity") {
      bucket.caloriesOut += entry.estimatedCalories;
    }
    if (entry.type === "water") {
      bucket.waterMl += entry.amountMl;
    }
  }

  const daily = dayKeys.map((key) => dayMap.get(key)!);
  const totals = daily.reduce<ReportTotals>(
    (acc, day) => {
      acc.caloriesIn += day.caloriesIn;
      acc.caloriesOut += day.caloriesOut;
      acc.waterMl += day.waterMl;
      acc.proteinG += day.proteinG;
      acc.carbsG += day.carbsG;
      acc.fatG += day.fatG;
      return acc;
    },
    {
      caloriesIn: 0,
      caloriesOut: 0,
      netCalories: 0,
      waterMl: 0,
      proteinG: 0,
      carbsG: 0,
      fatG: 0,
    }
  );
  totals.netCalories = totals.caloriesIn - totals.caloriesOut;

  const averages: ReportAverages = {
    caloriesIn: Math.round(totals.caloriesIn / safeDays),
    caloriesOut: Math.round(totals.caloriesOut / safeDays),
    waterMl: Math.round(totals.waterMl / safeDays),
    proteinG: Math.round(totals.proteinG / safeDays),
    carbsG: Math.round(totals.carbsG / safeDays),
    fatG: Math.round(totals.fatG / safeDays),
  };

  const foodMap = new Map<string, ReportTopFood>();
  const activityMap = new Map<string, ReportTopActivity>();
  let foodCount = 0;
  let macroCount = 0;

  for (const entry of entries) {
    if (entry.type === "food") {
      foodCount += 1;
      if ((entry.proteinG ?? 0) > 0 || (entry.carbsG ?? 0) > 0 || (entry.fatG ?? 0) > 0) {
        macroCount += 1;
      }
      const key = entry.name || "Belirtilmedi";
      const existing = foodMap.get(key) ?? { name: key, calories: 0, count: 0 };
      existing.calories += entry.calories;
      existing.count += 1;
      foodMap.set(key, existing);
    }
    if (entry.type === "activity") {
      const key = entry.activityType;
      const existing = activityMap.get(key) ?? {
        activityType: key,
        calories: 0,
        durationMin: 0,
      };
      existing.calories += entry.estimatedCalories;
      existing.durationMin += entry.durationMin;
      activityMap.set(key, existing);
    }
  }

  const topFoods = Array.from(foodMap.values())
    .sort((a, b) => b.calories - a.calories)
    .slice(0, 5);

  const topActivities = Array.from(activityMap.values())
    .sort((a, b) => b.calories - a.calories)
    .slice(0, 5);

  const activeDays = daily.filter(
    (day) => day.caloriesIn + day.caloriesOut + day.waterMl > 0
  ).length;

  const macroCoverage = foodCount === 0 ? 0 : macroCount / foodCount;

  return {
    rangeDays: safeDays,
    startDate: dayKeys[0],
    endDate: dayKeys[dayKeys.length - 1],
    entryCount: entries.length,
    activeDays,
    daily,
    totals,
    averages,
    topFoods,
    topActivities,
    goals,
    comment: buildMotivation({
      averages,
      activeDays,
      rangeDays: safeDays,
      macroCoverage,
      goals,
    }),
  };
}
