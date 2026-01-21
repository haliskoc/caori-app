import type { Entry, DailySummary, Goals } from "@calai/shared/types";
import { getDayKey, getLastNDays } from "@calai/shared/utils";
import { t } from "@/lib/i18n";

export type ReportTotals = {
  caloriesIn: number;
  caloriesOut: number;
  netCalories: number;
  waterMl: number;
  activityMin: number;
  mealCount: number;
  proteinG: number;
  carbsG: number;
  fatG: number;
};

export type ReportAverages = {
  caloriesIn: number;
  caloriesOut: number;
  waterMl: number;
  activityMin: number;
  mealCount: number;
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
  activityGoalMin: number;
  mealGoalCount: number;
  weightGoalKg: number;
  proteinGoalG: number;
  carbsGoalG: number;
  fatGoalG: number;
};

export type ReportInsightTone = "positive" | "warning" | "neutral";

export type ReportInsight = {
  id: string;
  title: string;
  message: string;
  tone: ReportInsightTone;
};

export type WeeklyDeviation = {
  weekStart: string;
  weekEnd: string;
  days: number;
  totals: ReportTotals;
  deltas: {
    caloriesIn: number;
    waterMl: number;
    activityMin: number;
    mealCount: number;
  };
  adherenceScore: number;
};

export type EffectiveDay = {
  date: string;
  score: number;
  caloriesIn: number;
  caloriesOut: number;
  waterMl: number;
  activityMin: number;
  mealCount: number;
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
  weekly: WeeklyDeviation[];
  adherenceScore: number;
  effectiveDays: EffectiveDay[];
  goals?: ReportGoals;
  comment: string;
  insights: ReportInsight[];
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
  const activityGoalMin = input.goals?.activityGoalMin ?? 30;
  const mealGoalCount = input.goals?.mealGoalCount ?? 3;
  const proteinGoalG = input.goals?.proteinGoalG ?? 0;
  const carbsGoalG = input.goals?.carbsGoalG ?? 0;
  const fatGoalG = input.goals?.fatGoalG ?? 0;

  if (input.averages.caloriesIn > calorieGoal + 200) {
    lines.push(
      t(
        "Ortalama kalori alımın hedefinin üstünde. Porsiyonları biraz küçültmek fayda sağlar."
      )
    );
  } else if (input.averages.caloriesIn < calorieGoal - 300) {
    lines.push(
      t(
        "Ortalama kalori alımın hedefinin altında. Dengeli ve yeterli öğün planlamaya odaklan."
      )
    );
  } else {
    lines.push(t("Kalori alımın hedefle uyumlu, ritmi koruyorsun."));
  }

  if (input.averages.caloriesOut < 80) {
    lines.push(t("Aktivite düşük görünüyor; kısa yürüyüşler bile dengeyi güçlendirir."));
  } else {
    lines.push(
      t("Aktivite tarafı iyi; hareketliliği sürdürmek hedefe yaklaşmanı hızlandırır.")
    );
  }

  if (input.averages.activityMin < activityGoalMin * 0.7) {
    lines.push(t("Hareket süren hedefinin altında. Günlük 10-15 dakika ekleme etkili olur."));
  }

  if (input.averages.waterMl < waterGoalMl * 0.7) {
    lines.push(
      t("Su alımın hedefin altında. Gün içinde 1-2 bardak ekleyerek dengeleyebilirsin.")
    );
  } else {
    lines.push(t("Su takibin iyi, bu tempo toparlanmayı destekler."));
  }

  if (input.averages.mealCount < mealGoalCount - 1) {
    lines.push(
      t("Öğün düzeni dağınık görünüyor. Ana öğünleri sabitlemek dengeyi artırır.")
    );
  }

  if (input.macroCoverage < 0.4) {
    lines.push(
      t("Makro bilgisi eksik kayıtlar var. Ürün seçimiyle daha net takip yapabilirsin.")
    );
  }

  if (proteinGoalG > 0 && input.averages.proteinG < proteinGoalG * 0.8) {
    lines.push(t("Protein hedefinin altında kalmışsın. Günlük protein dağılımını güçlendir."));
  }
  if (carbsGoalG > 0 && input.averages.carbsG < carbsGoalG * 0.8) {
    lines.push(t("Karbonhidrat hedefi düşük görünüyor. Enerji dengesi için artırabilirsin."));
  }
  if (fatGoalG > 0 && input.averages.fatG < fatGoalG * 0.8) {
    lines.push(t("Yağ hedefi düşük. Sağlıklı yağ kaynaklarını eklemeyi dene."));
  }

  if (input.activeDays < Math.max(3, Math.round(input.rangeDays * 0.4))) {
    lines.push(t("Takip günlerini artırırsan gelişim eğrisi daha net görünür."));
  }

  lines.push(t("Küçük adımlar büyük değişimi başlatır. Devam et!"));
  return lines.join(" ");
}

function buildInsights(input: {
  averages: ReportAverages;
  activeDays: number;
  rangeDays: number;
  macroCoverage: number;
  goals?: ReportGoals;
}) {
  const insights: ReportInsight[] = [];
  const calorieGoal = input.goals?.calorieGoal ?? 2200;
  const waterGoalMl = input.goals?.waterGoalMl ?? 2500;
  const activityGoalMin = input.goals?.activityGoalMin ?? 30;
  const mealGoalCount = input.goals?.mealGoalCount ?? 3;
  const proteinGoalG = input.goals?.proteinGoalG ?? 0;
  const carbsGoalG = input.goals?.carbsGoalG ?? 0;
  const fatGoalG = input.goals?.fatGoalG ?? 0;

  if (input.averages.caloriesIn > calorieGoal + 200) {
    insights.push({
      id: "calorie-high",
      title: t("Kalori Fazlası"),
      message: t("Ortalama kalori alımın hedefin üzerinde. Porsiyonları dengede tut."),
      tone: "warning",
    });
  } else if (input.averages.caloriesIn < calorieGoal - 300) {
    insights.push({
      id: "calorie-low",
      title: t("Kalori Eksik"),
      message: t("Kalori alımın hedefin altında. Dengeli öğünlerle destekle."),
      tone: "neutral",
    });
  } else {
    insights.push({
      id: "calorie-good",
      title: t("Kalori Dengeli"),
      message: t("Kalori alımın hedefle uyumlu."),
      tone: "positive",
    });
  }

  if (input.averages.waterMl < waterGoalMl * 0.7) {
    insights.push({
      id: "water-low",
      title: t("Su Hedefi"),
      message: t("Su tüketimini artırmak enerji seviyeni destekler."),
      tone: "warning",
    });
  } else {
    insights.push({
      id: "water-good",
      title: t("Su Takibi"),
      message: t("Su tüketimin iyi gidiyor."),
      tone: "positive",
    });
  }

  if (input.averages.activityMin < activityGoalMin * 0.7) {
    insights.push({
      id: "activity-low",
      title: t("Aktivite"),
      message: t("Günlük aktivite süresini artırmayı dene."),
      tone: "neutral",
    });
  }

  if (input.averages.mealCount < mealGoalCount - 1) {
    insights.push({
      id: "meal-low",
      title: t("Öğün Düzeni"),
      message: t("Öğün sayısını düzenli tutmak dengeyi artırır."),
      tone: "neutral",
    });
  }

  if (proteinGoalG > 0 && input.averages.proteinG < proteinGoalG * 0.8) {
    insights.push({
      id: "protein-low",
      title: t("Protein"),
      message: t("Protein hedefinin altındasın. Kaynak çeşitliliğini artır."),
      tone: "warning",
    });
  }
  if (carbsGoalG > 0 && input.averages.carbsG < carbsGoalG * 0.8) {
    insights.push({
      id: "carbs-low",
      title: t("Karbonhidrat"),
      message: t("Karbonhidrat hedefin düşük. Enerji dengesini gözden geçir."),
      tone: "neutral",
    });
  }
  if (fatGoalG > 0 && input.averages.fatG < fatGoalG * 0.8) {
    insights.push({
      id: "fat-low",
      title: t("Yağ"),
      message: t("Sağlıklı yağ kaynaklarıyla hedefi yakalayabilirsin."),
      tone: "neutral",
    });
  }

  if (input.activeDays < Math.max(3, Math.round(input.rangeDays * 0.4))) {
    insights.push({
      id: "consistency",
      title: t("Tutarlılık"),
      message: t("Takip günlerini artırırsan ilerlemen daha net görünür."),
      tone: "warning",
    });
  }

  if (input.macroCoverage < 0.4) {
    insights.push({
      id: "macro-missing",
      title: t("Makro Bilgisi"),
      message: t("Makro değerlerini doldurdukça raporun doğruluğu artar."),
      tone: "neutral",
    });
  }

  return insights;
}

function buildTotals(entries: Entry[]) {
  const totals: ReportTotals = {
    caloriesIn: 0,
    caloriesOut: 0,
    netCalories: 0,
    waterMl: 0,
    activityMin: 0,
    mealCount: 0,
    proteinG: 0,
    carbsG: 0,
    fatG: 0,
  };

  const mealSet = new Set<string>();

  entries.forEach((entry) => {
    if (entry.type === "food") {
      totals.caloriesIn += entry.calories;
      totals.proteinG += entry.proteinG ?? 0;
      totals.carbsG += entry.carbsG ?? 0;
      totals.fatG += entry.fatG ?? 0;
      mealSet.add(entry.mealType);
    }
    if (entry.type === "drink") {
      totals.caloriesIn += entry.calories;
      totals.proteinG += entry.proteinG ?? 0;
      totals.carbsG += entry.carbsG ?? 0;
      totals.fatG += entry.fatG ?? 0;
    }
    if (entry.type === "water") {
      totals.waterMl += entry.amountMl;
    }
    if (entry.type === "activity") {
      totals.caloriesOut += entry.estimatedCalories;
      totals.activityMin += entry.durationMin;
    }
  });

  totals.netCalories = totals.caloriesIn - totals.caloriesOut;
  totals.mealCount = mealSet.size;

  return totals;
}

function buildDaily(entries: Entry[], rangeDays: number) {
  const dayKeys = getLastNDays(rangeDays);
  return dayKeys.map((date) => {
    const dailyEntries = entries.filter((entry) => getDayKey(entry.timestamp) === date);
    const mealSet = new Set<string>();
    const caloriesIn = dailyEntries.reduce((sum, entry) => {
      if (entry.type === "food") {
        mealSet.add(entry.mealType);
        return sum + entry.calories;
      }
      if (entry.type === "drink") {
        return sum + entry.calories;
      }
      return sum;
    }, 0);
    const caloriesOut = dailyEntries.reduce((sum, entry) => {
      if (entry.type === "activity") {
        return sum + entry.estimatedCalories;
      }
      return sum;
    }, 0);
    const activityMin = dailyEntries.reduce((sum, entry) => {
      if (entry.type === "activity") {
        return sum + entry.durationMin;
      }
      return sum;
    }, 0);
    const waterMl = dailyEntries.reduce((sum, entry) => {
      if (entry.type === "water") {
        return sum + entry.amountMl;
      }
      return sum;
    }, 0);
    const proteinG = dailyEntries.reduce((sum, entry) => {
      if (entry.type === "food" || entry.type === "drink") {
        return sum + (entry.proteinG ?? 0);
      }
      return sum;
    }, 0);
    const carbsG = dailyEntries.reduce((sum, entry) => {
      if (entry.type === "food" || entry.type === "drink") {
        return sum + (entry.carbsG ?? 0);
      }
      return sum;
    }, 0);
    const fatG = dailyEntries.reduce((sum, entry) => {
      if (entry.type === "food" || entry.type === "drink") {
        return sum + (entry.fatG ?? 0);
      }
      return sum;
    }, 0);
    const sleepEntry = dailyEntries.find((entry) => entry.type === "sleep");
    const sleepHours = sleepEntry && sleepEntry.type === "sleep"
      ? sleepEntry.durationMin / 60
      : 0;
    const sleepQuality = sleepEntry && sleepEntry.type === "sleep"
      ? sleepEntry.quality
      : null;
    return {
      date,
      caloriesIn,
      caloriesOut,
      waterMl,
      activityMin,
      mealCount: mealSet.size,
      proteinG,
      carbsG,
      fatG,
      sleepHours,
      sleepQuality,
    } as DailySummary;
  });
}

function buildTopFoods(entries: Entry[], limit = 5): ReportTopFood[] {
  const map = new Map<string, { calories: number; count: number }>();
  entries.forEach((entry) => {
    if (entry.type !== "food") return;
    const name = entry.name || t("Belirtilmedi");
    const current = map.get(name) ?? { calories: 0, count: 0 };
    map.set(name, {
      calories: current.calories + entry.calories,
      count: current.count + 1,
    });
  });

  return Array.from(map.entries())
    .map(([name, data]) => ({ name, calories: data.calories, count: data.count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

function buildTopActivities(entries: Entry[], limit = 5): ReportTopActivity[] {
  const map = new Map<string, { calories: number; durationMin: number }>();
  entries.forEach((entry) => {
    if (entry.type !== "activity") return;
    const name = entry.activityType || t("Aktivite");
    const current = map.get(name) ?? { calories: 0, durationMin: 0 };
    map.set(name, {
      calories: current.calories + entry.estimatedCalories,
      durationMin: current.durationMin + entry.durationMin,
    });
  });

  return Array.from(map.entries())
    .map(([activityType, data]) => ({ activityType, calories: data.calories, durationMin: data.durationMin }))
    .sort((a, b) => b.durationMin - a.durationMin)
    .slice(0, limit);
}

function buildWeeklyDeviations(daily: DailySummary[], goals?: ReportGoals) {
  const grouped: WeeklyDeviation[] = [];
  const weeks = Math.ceil(daily.length / 7);

  for (let i = 0; i < weeks; i += 1) {
    const slice = daily.slice(i * 7, i * 7 + 7);
    if (!slice.length) continue;
    const totals = buildTotalsFromDaily(slice);
    const adherenceScore = calculateAdherenceScore(totals, goals);
    grouped.push({
      weekStart: slice[0].date,
      weekEnd: slice[slice.length - 1].date,
      days: slice.length,
      totals,
      deltas: {
        caloriesIn: totals.caloriesIn - (goals?.calorieGoal ?? 0) * slice.length,
        waterMl: totals.waterMl - (goals?.waterGoalMl ?? 0) * slice.length,
        activityMin: totals.activityMin - (goals?.activityGoalMin ?? 0) * slice.length,
        mealCount: totals.mealCount - (goals?.mealGoalCount ?? 0) * slice.length,
      },
      adherenceScore,
    });
  }

  return grouped;
}

function buildTotalsFromDaily(daily: DailySummary[]): ReportTotals {
  return daily.reduce(
    (acc, day) => {
      acc.caloriesIn += day.caloriesIn;
      acc.caloriesOut += day.caloriesOut;
      acc.waterMl += day.waterMl;
      acc.activityMin += day.activityMin;
      acc.mealCount += day.mealCount;
      acc.proteinG += day.proteinG;
      acc.carbsG += day.carbsG;
      acc.fatG += day.fatG;
      acc.netCalories = acc.caloriesIn - acc.caloriesOut;
      return acc;
    },
    {
      caloriesIn: 0,
      caloriesOut: 0,
      netCalories: 0,
      waterMl: 0,
      activityMin: 0,
      mealCount: 0,
      proteinG: 0,
      carbsG: 0,
      fatG: 0,
    }
  );
}

function calculateAdherenceScore(totals: ReportTotals, goals?: ReportGoals) {
  if (!goals) return 0;
  const calorieScore = 1 - Math.min(1, Math.abs(totals.caloriesIn - goals.calorieGoal) / goals.calorieGoal);
  const waterScore = Math.min(1, totals.waterMl / (goals.waterGoalMl || 1));
  const activityScore = Math.min(1, totals.activityMin / (goals.activityGoalMin || 1));
  const mealScore = Math.min(1, totals.mealCount / (goals.mealGoalCount || 1));
  return Math.round(((calorieScore + waterScore + activityScore + mealScore) / 4) * 100);
}

function buildEffectiveDays(daily: DailySummary[], goals?: ReportGoals): EffectiveDay[] {
  if (!goals) {
    return daily.map((day) => ({
      date: day.date,
      score: 0,
      caloriesIn: day.caloriesIn,
      caloriesOut: day.caloriesOut,
      waterMl: day.waterMl,
      activityMin: day.activityMin,
      mealCount: day.mealCount,
    }));
  }

  return daily.map((day) => {
    const caloriesScore = 1 - Math.min(1, Math.abs(day.caloriesIn - goals.calorieGoal) / goals.calorieGoal);
    const waterScore = Math.min(1, day.waterMl / goals.waterGoalMl);
    const activityScore = Math.min(1, day.activityMin / goals.activityGoalMin);
    const mealScore = Math.min(1, day.mealCount / goals.mealGoalCount);
    const score = Math.round(((caloriesScore + waterScore + activityScore + mealScore) / 4) * 100);

    return {
      date: day.date,
      score,
      caloriesIn: day.caloriesIn,
      caloriesOut: day.caloriesOut,
      waterMl: day.waterMl,
      activityMin: day.activityMin,
      mealCount: day.mealCount,
    };
  });
}

export function buildReport(entries: Entry[], rangeDays: number, goals?: Goals): ReportData {
  const range = Math.max(7, rangeDays);
  const endDate = getDayKey(new Date());
  const startDate = getDayKey(new Date(Date.now() - (range - 1) * 24 * 60 * 60 * 1000));
  const filtered = entries.filter((entry) => {
    const key = getDayKey(entry.timestamp);
    return key >= startDate && key <= endDate;
  });

  const daily = buildDaily(filtered, range);
  const totals = buildTotals(filtered);
  const averages: ReportAverages = {
    caloriesIn: Math.round(totals.caloriesIn / range),
    caloriesOut: Math.round(totals.caloriesOut / range),
    waterMl: Math.round(totals.waterMl / range),
    activityMin: Math.round(totals.activityMin / range),
    mealCount: Math.round(totals.mealCount / range),
    proteinG: Math.round(totals.proteinG / range),
    carbsG: Math.round(totals.carbsG / range),
    fatG: Math.round(totals.fatG / range),
  };

  const activeDays = daily.filter((day) => day.caloriesIn > 0 || day.activityMin > 0 || day.waterMl > 0).length;
  const macroCoverage = filtered.filter((entry) => entry.type === "food" || entry.type === "drink")
    .reduce((acc, entry) => {
      if (entry.type === "food" || entry.type === "drink") {
        return acc + (entry.proteinG || entry.carbsG || entry.fatG ? 1 : 0);
      }
      return acc;
    }, 0) / Math.max(1, filtered.filter((entry) => entry.type === "food" || entry.type === "drink").length);

  const reportGoals = goals
    ? {
        calorieGoal: goals.calorieGoal,
        waterGoalMl: goals.waterGoalMl,
        activityGoalMin: goals.activityGoalMin,
        mealGoalCount: goals.mealGoalCount,
        weightGoalKg: goals.weightGoalKg,
        proteinGoalG: goals.proteinGoalG,
        carbsGoalG: goals.carbsGoalG,
        fatGoalG: goals.fatGoalG,
      }
    : undefined;

  const weekly = buildWeeklyDeviations(daily, reportGoals);
  const effectiveDays = buildEffectiveDays(daily, reportGoals);
  const adherenceScore = calculateAdherenceScore(totals, reportGoals);

  return {
    rangeDays: range,
    startDate,
    endDate,
    entryCount: filtered.length,
    activeDays,
    daily,
    totals,
    averages,
    topFoods: buildTopFoods(filtered),
    topActivities: buildTopActivities(filtered),
    weekly,
    adherenceScore,
    effectiveDays,
    goals: reportGoals,
    comment: buildMotivation({
      averages,
      activeDays,
      rangeDays: range,
      macroCoverage: Number.isFinite(macroCoverage) ? macroCoverage : 0,
      goals: reportGoals,
    }),
    insights: buildInsights({
      averages,
      activeDays,
      rangeDays: range,
      macroCoverage: Number.isFinite(macroCoverage) ? macroCoverage : 0,
      goals: reportGoals,
    }),
  };
}
