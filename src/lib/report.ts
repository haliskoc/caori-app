import { Entry, DailySummary } from "./types";
import { getDayKey, getLastNDays } from "./utils";
import { t } from "./i18n";

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

  const push = (id: string, title: string, message: string, tone: ReportInsightTone) => {
    insights.push({ id, title, message, tone });
  };

  if (calorieGoal > 0) {
    const diff = Math.round(input.averages.caloriesIn - calorieGoal);
    if (diff > 200) {
      push(
        "calories-high",
        t("Kalori Ortalaması Yüksek"),
        t("Günlük ortalama {avg} kcal ile hedefinin {delta} kcal üzerindesin.", {
          avg: Math.round(input.averages.caloriesIn),
          delta: diff,
        }),
        "warning"
      );
    } else if (diff < -300) {
      push(
        "calories-low",
        t("Kalori Ortalaması Düşük"),
        t("Günlük ortalama {avg} kcal ile hedefinin {delta} kcal altındasın.", {
          avg: Math.round(input.averages.caloriesIn),
          delta: Math.abs(diff),
        }),
        "warning"
      );
    } else {
      push(
        "calories-on",
        t("Kalori Dengesi İyi"),
        t("Günlük ortalama {avg} kcal ile hedefe yakınsın.", {
          avg: Math.round(input.averages.caloriesIn),
        }),
        "positive"
      );
    }
  }

  if (waterGoalMl > 0) {
    const ratio = input.averages.waterMl / waterGoalMl;
    if (ratio < 0.7) {
      push(
        "water-low",
        t("Su Tüketimi Düşük"),
        t("Günlük ortalama {avg} ml ile hedefinin yaklaşık %{pct} altındasın.", {
          avg: Math.round(input.averages.waterMl),
          pct: Math.round((1 - ratio) * 100),
        }),
        "warning"
      );
    } else if (ratio >= 1) {
      push(
        "water-strong",
        t("Su Takibi Güçlü"),
        t("Günlük ortalama {avg} ml ile hedefi karşılıyorsun.", {
          avg: Math.round(input.averages.waterMl),
        }),
        "positive"
      );
    } else {
      push(
        "water-near",
        t("Suya Yaklaştın"),
        t("Günlük ortalama {avg} ml ile hedefe yaklaşmışsın.", {
          avg: Math.round(input.averages.waterMl),
        }),
        "neutral"
      );
    }
  }

  if (activityGoalMin > 0) {
    const ratio = input.averages.activityMin / activityGoalMin;
    if (ratio < 0.6) {
      push(
        "activity-low",
        t("Aktivite Süresi Düşük"),
        t("Günlük {avg} dk ile hedefinin gerisindesin. 10 dk eklemek fark yaratır.", {
          avg: Math.round(input.averages.activityMin),
        }),
        "warning"
      );
    } else if (ratio >= 1) {
      push(
        "activity-strong",
        t("Aktivite Hedefi Güçlü"),
        t("Günlük {avg} dk ile hedefi karşılıyorsun.", {
          avg: Math.round(input.averages.activityMin),
        }),
        "positive"
      );
    } else {
      push(
        "activity-near",
        t("Aktiviteye Yaklaştın"),
        t("Günlük {avg} dk ile hedefe oldukça yakınsın.", {
          avg: Math.round(input.averages.activityMin),
        }),
        "neutral"
      );
    }
  }

  if (mealGoalCount > 0) {
    const diff = Math.round(input.averages.mealCount - mealGoalCount);
    if (diff < -1) {
      push(
        "meals-low",
        t("Öğün Ritmi Düşük"),
        t("Günlük ortalama {avg} öğün ile hedefinin altındasın.", {
          avg: Math.round(input.averages.mealCount),
        }),
        "warning"
      );
    } else if (diff >= 0) {
      push(
        "meals-on",
        t("Öğün Ritmi Dengeli"),
        t("Günlük ortalama {avg} öğün ile planını koruyorsun.", {
          avg: Math.round(input.averages.mealCount),
        }),
        "positive"
      );
    }
  }

  if (input.macroCoverage < 0.4) {
    push(
      "macro-coverage",
      t("Makro Verisi Eksik"),
      t("Makro bilgisi eklenen öğünlerin oranı düşük. Ürün seçimiyle netleştir."),
      "warning"
    );
  }

  if (proteinGoalG > 0 && input.averages.proteinG < proteinGoalG * 0.8) {
    push(
      "protein-low",
      t("Protein Hedefi Düşük"),
      t("Günlük ortalama {avg} g protein ile hedefe yaklaş.", {
        avg: Math.round(input.averages.proteinG),
      }),
      "warning"
    );
  }

  if (carbsGoalG > 0 && input.averages.carbsG < carbsGoalG * 0.8) {
    push(
      "carb-low",
      t("Karbonhidrat Düşük"),
      t("Günlük ortalama {avg} g karbonhidrat ile enerji dengesini artırabilirsin.", {
        avg: Math.round(input.averages.carbsG),
      }),
      "neutral"
    );
  }

  if (fatGoalG > 0 && input.averages.fatG < fatGoalG * 0.8) {
    push(
      "fat-low",
      t("Yağ Hedefi Düşük"),
      t("Günlük ortalama {avg} g yağ ile sağlıklı yağları artırmayı dene.", {
        avg: Math.round(input.averages.fatG),
      }),
      "neutral"
    );
  }

  const activeRatio = input.rangeDays ? input.activeDays / input.rangeDays : 0;
  if (activeRatio < 0.45) {
    push(
      "consistency-low",
      t("Takip Sürekliliği Zayıf"),
      t("Son {range} günde {active} gün kayıt var. Düzeni artırmak analizleri güçlendirir.", {
        range: input.rangeDays,
        active: input.activeDays,
      }),
      "warning"
    );
  } else if (activeRatio >= 0.75) {
    push(
      "consistency-strong",
      t("Takip Sürekliliği Güçlü"),
      t("Son {range} günün {active} gününde kayıt var. Ritmi koruyorsun.", {
        range: input.rangeDays,
        active: input.activeDays,
      }),
      "positive"
    );
  }

  return insights.slice(0, 6);
}

type ReportEntry = Entry & { timestamp: string | Date };

export function buildReportData(
  entries: ReportEntry[],
  rangeDays: number,
  goals?: ReportGoals
): ReportData {
  const safeDays = Math.max(1, Math.min(90, Math.round(rangeDays || 30)));
  const dayKeys = getLastNDays(safeDays);
  const dayMap = new Map<string, DailySummary>();
  const mealSets = new Map<string, Set<string>>();
  for (const key of dayKeys) {
    dayMap.set(key, {
      date: key,
      caloriesIn: 0,
      caloriesOut: 0,
      waterMl: 0,
      activityMin: 0,
      mealCount: 0,
      proteinG: 0,
      carbsG: 0,
      fatG: 0,
    });
    mealSets.set(key, new Set());
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
      mealSets.get(key)?.add(entry.mealType);
    }
    if (entry.type === "activity") {
      bucket.caloriesOut += entry.estimatedCalories;
      bucket.activityMin += entry.durationMin;
    }
    if (entry.type === "water") {
      bucket.waterMl += entry.amountMl;
    }
  }

  for (const key of dayKeys) {
    const bucket = dayMap.get(key);
    if (!bucket) continue;
    bucket.mealCount = mealSets.get(key)?.size ?? 0;
  }

  const daily = dayKeys.map((key) => dayMap.get(key)!);
  const totals = daily.reduce<ReportTotals>(
    (acc, day) => {
      acc.caloriesIn += day.caloriesIn;
      acc.caloriesOut += day.caloriesOut;
      acc.waterMl += day.waterMl;
      acc.activityMin += day.activityMin;
      acc.mealCount += day.mealCount;
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
      activityMin: 0,
      mealCount: 0,
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
    activityMin: Math.round(totals.activityMin / safeDays),
    mealCount: Math.round(totals.mealCount / safeDays),
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
      const key = entry.name || t("Belirtilmedi");
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
  const safeGoals: ReportGoals = {
    calorieGoal: goals?.calorieGoal ?? 2200,
    waterGoalMl: goals?.waterGoalMl ?? 2500,
    activityGoalMin: goals?.activityGoalMin ?? 30,
    mealGoalCount: goals?.mealGoalCount ?? 3,
    weightGoalKg: goals?.weightGoalKg ?? 0,
    proteinGoalG: goals?.proteinGoalG ?? 0,
    carbsGoalG: goals?.carbsGoalG ?? 0,
    fatGoalG: goals?.fatGoalG ?? 0,
  };

  const getDayScore = (day: DailySummary) => {
    const scores: number[] = [];
    if (safeGoals.calorieGoal > 0) {
      const diff = Math.abs(day.caloriesIn - safeGoals.calorieGoal);
      const score = 1 - Math.min(diff / safeGoals.calorieGoal, 1);
      scores.push(score);
    }
    if (safeGoals.waterGoalMl > 0) {
      scores.push(Math.min(day.waterMl / safeGoals.waterGoalMl, 1));
    }
    if (safeGoals.activityGoalMin > 0) {
      scores.push(Math.min(day.activityMin / safeGoals.activityGoalMin, 1));
    }
    if (safeGoals.mealGoalCount > 0) {
      scores.push(Math.min(day.mealCount / safeGoals.mealGoalCount, 1));
    }
    if (scores.length === 0) {
      return 0;
    }
    return scores.reduce((sum, value) => sum + value, 0) / scores.length;
  };

  const scoredDays = daily.map((day) => ({
    day,
    score: getDayScore(day),
  }));

  const adherenceScore = scoredDays.length
    ? Math.round(
        (scoredDays.reduce((sum, item) => sum + item.score, 0) / scoredDays.length) * 100
      )
    : 0;

  const effectiveDays = scoredDays
    .filter(
      (item) =>
        item.day.caloriesIn + item.day.caloriesOut + item.day.waterMl + item.day.activityMin >
        0
    )
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((item) => ({
      date: item.day.date,
      score: Math.round(item.score * 100),
      caloriesIn: item.day.caloriesIn,
      caloriesOut: item.day.caloriesOut,
      waterMl: item.day.waterMl,
      activityMin: item.day.activityMin,
      mealCount: item.day.mealCount,
    }));

  const weekly: WeeklyDeviation[] = [];
  for (let i = 0; i < daily.length; i += 7) {
    const chunk = daily.slice(i, i + 7);
    const chunkTotals = chunk.reduce<ReportTotals>(
      (acc, day) => {
        acc.caloriesIn += day.caloriesIn;
        acc.caloriesOut += day.caloriesOut;
        acc.waterMl += day.waterMl;
        acc.activityMin += day.activityMin;
        acc.mealCount += day.mealCount;
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
        activityMin: 0,
        mealCount: 0,
        proteinG: 0,
        carbsG: 0,
        fatG: 0,
      }
    );
    chunkTotals.netCalories = chunkTotals.caloriesIn - chunkTotals.caloriesOut;
    const days = chunk.length;
    const deltaCalories =
      safeGoals.calorieGoal > 0 ? chunkTotals.caloriesIn - safeGoals.calorieGoal * days : 0;
    const deltaWater =
      safeGoals.waterGoalMl > 0 ? chunkTotals.waterMl - safeGoals.waterGoalMl * days : 0;
    const deltaActivity =
      safeGoals.activityGoalMin > 0
        ? chunkTotals.activityMin - safeGoals.activityGoalMin * days
        : 0;
    const deltaMeals =
      safeGoals.mealGoalCount > 0
        ? chunkTotals.mealCount - safeGoals.mealGoalCount * days
        : 0;
    const weekScore = chunk.length
      ? Math.round(
          (chunk.reduce((sum, day) => sum + getDayScore(day), 0) / chunk.length) * 100
        )
      : 0;
    weekly.push({
      weekStart: chunk[0]?.date ?? "",
      weekEnd: chunk[chunk.length - 1]?.date ?? "",
      days,
      totals: chunkTotals,
      deltas: {
        caloriesIn: Math.round(deltaCalories),
        waterMl: Math.round(deltaWater),
        activityMin: Math.round(deltaActivity),
        mealCount: Math.round(deltaMeals),
      },
      adherenceScore: weekScore,
    });
  }

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
    weekly,
    adherenceScore,
    effectiveDays,
    goals: safeGoals,
    comment: buildMotivation({
      averages,
      activeDays,
      rangeDays: safeDays,
      macroCoverage,
      goals: safeGoals,
    }),
    insights: buildInsights({
      averages,
      activeDays,
      rangeDays: safeDays,
      macroCoverage,
      goals: safeGoals,
    }),
  };
}
