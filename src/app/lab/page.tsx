"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Card } from "@/components/ui/card";
import { useTracker } from "@/components/providers/tracker-provider";
import { integrationProviders } from "@/lib/integrations/integrations";
import { loadProfile, type ProfileInfo } from "@/lib/features/profile";
import { buildReportData } from "@/lib/features/report";
import { createId, getDayKey } from "@/lib/core/utils";
import { t } from "@/lib/core/i18n";

type CheckIn = {
  id: string;
  date: string;
  sleepHours: number;
  stress: number;
  mood: number;
  energy: number;
  note?: string;
};

type MealTemplate = {
  name: string;
  calories: number;
  ingredients: string[];
};

type MealSet = {
  id: string;
  name: string;
  calories: number;
  proteinG?: number;
  carbsG?: number;
  fatG?: number;
  recipeUrl?: string;
};

type CoachPlan = {
  id: string;
  createdAt: string;
  summary: string;
  actions: string[];
};

const CHECKIN_KEY = "calai.checkins.v1";
const MEALSET_KEY = "calai.mealsets.v1";
const COACH_KEY = "calai.coach.v1";

const mealTemplates: Record<"breakfast" | "lunch" | "dinner" | "snack", MealTemplate[]> = {
  breakfast: [
    { name: "Yulaf + Yoğurt + Meyve", calories: 420, ingredients: ["Yulaf", "Yoğurt", "Meyve"] },
    { name: "Yumurta + Avokado + Tam buğday", calories: 450, ingredients: ["Yumurta", "Avokado", "Tam buğday"] },
    { name: "Smoothie (Muz, Badem, Süt)", calories: 380, ingredients: ["Muz", "Badem", "Süt"] },
  ],
  lunch: [
    { name: "Tavuk + Bulgur + Salata", calories: 520, ingredients: ["Tavuk", "Bulgur", "Salata"] },
    { name: "Ton balığı + Yeşillik + Zeytin", calories: 480, ingredients: ["Ton balığı", "Yeşillik", "Zeytin"] },
    { name: "Sebze bowl + Baklagil", calories: 510, ingredients: ["Sebze", "Baklagil", "Tahıl"] },
  ],
  dinner: [
    { name: "Somon + Sebze + Kinoa", calories: 540, ingredients: ["Somon", "Sebze", "Kinoa"] },
    { name: "Hindi + Izgara sebze", calories: 500, ingredients: ["Hindi", "Sebze"] },
    { name: "Mercimek + Salata", calories: 470, ingredients: ["Mercimek", "Salata"] },
  ],
  snack: [
    { name: "Yoğurt + Kuruyemiş", calories: 220, ingredients: ["Yoğurt", "Kuruyemiş"] },
    { name: "Meyve + Fıstık ezmesi", calories: 240, ingredients: ["Meyve", "Fıstık ezmesi"] },
    { name: "Protein bar", calories: 200, ingredients: ["Protein bar"] },
  ],
};

function loadStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function saveStorage<T>(key: string, value: T) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(key, JSON.stringify(value));
}

function computeCorrelation(xs: number[], ys: number[]) {
  if (xs.length < 3 || xs.length !== ys.length) {
    return null;
  }
  const mean = (values: number[]) =>
    values.reduce((sum, value) => sum + value, 0) / values.length;
  const meanX = mean(xs);
  const meanY = mean(ys);
  let numerator = 0;
  let sumX = 0;
  let sumY = 0;
  for (let i = 0; i < xs.length; i += 1) {
    const dx = xs[i] - meanX;
    const dy = ys[i] - meanY;
    numerator += dx * dy;
    sumX += dx * dx;
    sumY += dy * dy;
  }
  const denominator = Math.sqrt(sumX * sumY);
  if (!Number.isFinite(denominator) || denominator === 0) {
    return null;
  }
  const value = numerator / denominator;
  return Math.max(-1, Math.min(1, Number(value.toFixed(2))));
}

function buildCoachPlan(latestCheckIn: CheckIn | null) {
  if (!latestCheckIn) {
    return {
      summary: t("Henüz check-in yok. Bir check-in ile plan üretelim."),
      actions: [
        t("Günlük 10 dakikalık yürüyüş ekle"),
        t("Su hedefini gün içinde 2 parçaya böl"),
        t("Öğün aralarını 3-4 saat tut"),
      ],
    };
  }
  const actions: string[] = [];
  if (latestCheckIn.sleepHours < 6) {
    actions.push(t("Uyku süresini +30 dk artırmayı dene."));
  }
  if (latestCheckIn.stress >= 4) {
    actions.push(t("Nefes egzersizi için 5 dakika ayır."));
  }
  if (latestCheckIn.energy <= 2) {
    actions.push(t("Antrenmanı kısa ama düzenli tut (15-20 dk)."));
  }
  if (actions.length === 0) {
    actions.push(t("Bu hafta ritmi koru, hedeflere sadık kal."));
  }
  return {
    summary: t("Bu haftanın odak planı hazır."),
    actions,
  };
}

export default function LabPage() {
  const { user } = useUser();
  const { entries, goals, updateGoals, updateReminder, reminder, addFood } = useTracker();
  const [profile, setProfile] = useState<ProfileInfo>(() => loadProfile());
  const [checkIns, setCheckIns] = useState<CheckIn[]>(() => loadStorage(CHECKIN_KEY, []));
  const [mealSets, setMealSets] = useState<MealSet[]>(() => loadStorage(MEALSET_KEY, []));
  const [coachPlan, setCoachPlan] = useState<CoachPlan | null>(() => loadStorage(COACH_KEY, null));
  const [sleepHours, setSleepHours] = useState("7");
  const [stressLevel, setStressLevel] = useState(3);
  const [moodLevel, setMoodLevel] = useState(3);
  const [energyLevel, setEnergyLevel] = useState(3);
  const [checkInNote, setCheckInNote] = useState("");
  const [mealSetName, setMealSetName] = useState("");
  const [mealSetCalories, setMealSetCalories] = useState("");
  const [mealSetProtein, setMealSetProtein] = useState("");
  const [mealSetCarbs, setMealSetCarbs] = useState("");
  const [mealSetFat, setMealSetFat] = useState("");
  const [mealSetRecipeUrl, setMealSetRecipeUrl] = useState("");

  useEffect(() => {
    saveStorage(CHECKIN_KEY, checkIns);
  }, [checkIns]);

  useEffect(() => {
    saveStorage(MEALSET_KEY, mealSets);
  }, [mealSets]);

  useEffect(() => {
    saveStorage(COACH_KEY, coachPlan);
  }, [coachPlan]);

  useEffect(() => {
    if (!user?.sub) {
      return;
    }
    let active = true;
    const loadRemote = async () => {
      try {
        const res = await fetch("/api/v1/profile", { credentials: "include" });
        if (!res.ok) {
          return;
        }
        const data = (await res.json()) as ProfileInfo;
        if (active) {
          setProfile(data);
        }
      } catch {
        // ignore
      }
    };
    void loadRemote();
    return () => {
      active = false;
    };
  }, [user]);

  const goalMultiplier =
    profile.mainGoal === "fat_burn"
      ? -300
      : profile.mainGoal === "muscle_gain"
        ? 250
        : profile.mainGoal === "conditioning"
          ? 150
          : 0;
  const activityFactor =
    profile.sportLevel === "beginner"
      ? 1.2
      : profile.sportLevel === "sometimes"
        ? 1.35
        : profile.sportLevel === "regular"
          ? 1.55
          : profile.sportLevel === "advanced"
            ? 1.7
            : 1.3;
  const smartGoals = useMemo(() => {
    const weightKg = Number(profile.weightKg);
    const heightCm = Number(profile.heightCm);
    const age = Number(profile.age);
    if (!Number.isFinite(weightKg) || weightKg <= 0) {
      return null;
    }
    const bmr =
      Number.isFinite(heightCm) && heightCm > 0 && Number.isFinite(age) && age > 0
        ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
        : weightKg * 24;
    const tdee = Math.round(bmr * activityFactor);
    const recommendedCalories = Math.max(1200, Math.round(tdee + goalMultiplier));
    const proteinG = Math.round((recommendedCalories * 0.3) / 4);
    const carbsG = Math.round((recommendedCalories * 0.4) / 4);
    const fatG = Math.round((recommendedCalories * 0.3) / 9);
    return { tdee, recommendedCalories, proteinG, carbsG, fatG };
  }, [activityFactor, goalMultiplier, profile.age, profile.heightCm, profile.weightKg]);

  const weekDays = useMemo(
    () => [t("Pzt"), t("Sal"), t("Çar"), t("Per"), t("Cum"), t("Cmt"), t("Paz")],
    []
  );

  const weeklyPlan = useMemo(() => {
    const mealsPerDay = Math.max(3, goals.mealGoalCount || 3);
    return weekDays.map((day, index) => {
      const breakfast = mealTemplates.breakfast[index % mealTemplates.breakfast.length];
      const lunch = mealTemplates.lunch[index % mealTemplates.lunch.length];
      const dinner = mealTemplates.dinner[index % mealTemplates.dinner.length];
      const snack = mealTemplates.snack[index % mealTemplates.snack.length];
      const meals = mealsPerDay > 3 ? [breakfast, lunch, dinner, snack] : [breakfast, lunch, dinner];
      return { day, meals };
    });
  }, [goals.mealGoalCount, weekDays]);

  const shoppingList = useMemo(() => {
    const tally = new Map<string, number>();
    weeklyPlan.forEach((day) => {
      day.meals.forEach((meal) => {
        meal.ingredients.forEach((ingredient) => {
          tally.set(ingredient, (tally.get(ingredient) ?? 0) + 1);
        });
      });
    });
    return Array.from(tally.entries()).map(([item, count]) => ({ item, count }));
  }, [weeklyPlan]);

  const labReport = useMemo(() => buildReportData(entries, 14, goals), [entries, goals]);
  const latestWeek =
    labReport.weekly.length > 0 ? labReport.weekly[labReport.weekly.length - 1] : null;
  const previousWeek =
    labReport.weekly.length > 1 ? labReport.weekly[labReport.weekly.length - 2] : null;
  const weeklyScoreDelta =
    latestWeek && previousWeek ? latestWeek.adherenceScore - previousWeek.adherenceScore : null;

  const deviationWarnings = useMemo(() => {
    if (!latestWeek || !labReport.goals) {
      return [];
    }
    const days = latestWeek.days || 7;
    const warnings: Array<{
      label: string;
      delta: number;
      unit: string;
      percent: number;
    }> = [];
    const pushWarning = (
      label: string,
      delta: number,
      target: number,
      unit: string,
      threshold: number
    ) => {
      if (!Number.isFinite(target) || target <= 0) {
        return;
      }
      const percent = (delta / target) * 100;
      if (Math.abs(percent) >= threshold) {
        warnings.push({ label, delta, unit, percent });
      }
    };
    pushWarning(
      t("Kalori"),
      latestWeek.deltas.caloriesIn,
      labReport.goals.calorieGoal * days,
      "kcal",
      15
    );
    pushWarning(
      t("Su"),
      latestWeek.deltas.waterMl,
      labReport.goals.waterGoalMl * days,
      "ml",
      20
    );
    pushWarning(
      t("Aktivite"),
      latestWeek.deltas.activityMin,
      labReport.goals.activityGoalMin * days,
      t("dk"),
      20
    );
    pushWarning(
      t("Öğün"),
      latestWeek.deltas.mealCount,
      labReport.goals.mealGoalCount * days,
      t("öğün"),
      20
    );
    return warnings;
  }, [labReport, latestWeek]);

  const dailyTotals = useMemo(() => {
    const buckets = new Map<
      string,
      { caloriesIn: number; activityMin: number; mealCount: number }
    >();
    entries.forEach((entry) => {
      const dayKey = getDayKey(entry.timestamp);
      const bucket = buckets.get(dayKey) ?? { caloriesIn: 0, activityMin: 0, mealCount: 0 };
      if (entry.type === "food") {
        bucket.caloriesIn += entry.calories;
        bucket.mealCount += 1;
      } else if (entry.type === "activity") {
        bucket.activityMin += entry.durationMin;
      }
      buckets.set(dayKey, bucket);
    });
    return buckets;
  }, [entries]);

  const correlationMetrics = useMemo(() => {
    const recentPairs = checkIns
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 14)
      .map((item) => {
        const totals = dailyTotals.get(item.date);
        if (!totals) {
          return null;
        }
        return { checkIn: item, totals };
      })
      .filter(Boolean) as Array<{ checkIn: CheckIn; totals: { caloriesIn: number; activityMin: number; mealCount: number } }>;

    const build = (label: string, xs: number[], ys: number[]) => ({
      label,
      value: computeCorrelation(xs, ys),
    });

    return [
      build(
        t("Uyku ↔ Kalori"),
        recentPairs.map((item) => item.checkIn.sleepHours),
        recentPairs.map((item) => item.totals.caloriesIn)
      ),
      build(
        t("Stres ↔ Aktivite"),
        recentPairs.map((item) => item.checkIn.stress),
        recentPairs.map((item) => item.totals.activityMin)
      ),
      build(
        t("Mood ↔ Öğün"),
        recentPairs.map((item) => item.checkIn.mood),
        recentPairs.map((item) => item.totals.mealCount)
      ),
    ];
  }, [checkIns, dailyTotals]);

  const latestCheckIn = checkIns
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date))[0] ?? null;

  const suggestedReminder = useMemo(() => {
    const mealTimes = entries
      .filter((entry) => entry.type === "food")
      .map((entry) => new Date(entry.timestamp))
      .filter((date) => !Number.isNaN(date.getTime()));
    if (mealTimes.length === 0) {
      return "20:00";
    }
    const avg = Math.round(
      mealTimes.reduce((sum, date) => sum + date.getHours(), 0) / mealTimes.length
    );
    const hour = Math.min(22, Math.max(8, avg + 3));
    return `${String(hour).padStart(2, "0")}:00`;
  }, [entries]);

  const currentStreak = useMemo(() => {
    const daySet = new Set(entries.map((entry) => getDayKey(entry.timestamp)));
    let streak = 0;
    let cursor = new Date();
    while (daySet.has(getDayKey(cursor))) {
      streak += 1;
      cursor = new Date(cursor.getTime() - 86400000);
    }
    return streak;
  }, [entries]);

  const recentCheckIns = useMemo(() => {
    return checkIns
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))
      .slice(0, 7);
  }, [checkIns]);

  return (
    <div className="space-y-6">
      <Card className="flex flex-col gap-2">
        <p className="text-sm font-semibold">{t("Akıllı Modüller")}</p>
        <p className="text-xs text-muted">
          {t("Planlama, hedef, check-in ve koçluk araçlarını buradan yönetebilirsin.")}
        </p>
      </Card>

      <details open className="rounded-3xl border border-emerald-100 bg-white p-4">
        <summary className="cursor-pointer text-sm font-semibold text-ink">
          {t("1) Akıllı Hedefleme")}
        </summary>
        <div className="mt-3 space-y-3 text-xs text-muted">
          {smartGoals ? (
            <>
              <p>
                {t("TDEE: {value} kcal • Önerilen hedef: {target} kcal", {
                  value: smartGoals.tdee,
                  target: smartGoals.recommendedCalories,
                })}
              </p>
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-3 py-2 text-center text-[11px] font-semibold text-emerald-700">
                  {t("Protein {value}g", { value: smartGoals.proteinG })}
                </div>
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-3 py-2 text-center text-[11px] font-semibold text-emerald-700">
                  {t("Karbonhidrat {value}g", { value: smartGoals.carbsG })}
                </div>
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-3 py-2 text-center text-[11px] font-semibold text-emerald-700">
                  {t("Yağ {value}g", { value: smartGoals.fatG })}
                </div>
              </div>
              <button
                onClick={() =>
                  updateGoals({
                    calorieGoal: smartGoals.recommendedCalories,
                    proteinGoalG: smartGoals.proteinG,
                    carbsGoalG: smartGoals.carbsG,
                    fatGoalG: smartGoals.fatG,
                  })
                }
                className="rounded-xl bg-emerald-600 px-4 py-2 text-[11px] font-semibold text-white hover:bg-emerald-700"
              >
                {t("Hedeflere Uygula")}
              </button>
            </>
          ) : (
            <p>{t("TDEE hesaplamak için kilo/boy/yaş gir.")}</p>
          )}
        </div>
      </details>

      <details className="rounded-3xl border border-emerald-100 bg-white p-4">
        <summary className="cursor-pointer text-sm font-semibold text-ink">
          {t("2) Kişisel Beslenme Planı")}
        </summary>
        <div className="mt-3 space-y-3 text-xs text-muted">
          <div className="grid gap-3 sm:grid-cols-2">
            {weeklyPlan.map((day) => (
              <div key={day.day} className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-3">
                <p className="text-[11px] font-semibold text-emerald-700">{day.day}</p>
                <ul className="mt-2 space-y-1 text-[11px] text-emerald-900">
                  {day.meals.map((meal) => (
                    <li key={meal.name} className="flex items-center justify-between gap-2">
                      <span>{meal.name}</span>
                      <span className="text-[10px] text-emerald-700">{meal.calories} kcal</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-white p-3">
            <p className="text-[11px] font-semibold text-emerald-700">{t("Alışveriş Listesi")}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-[11px] text-muted">
              {shoppingList.map((item) => (
                <span key={item.item} className="rounded-full border border-emerald-100 px-2 py-1">
                  {item.item} x{item.count}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-white p-3">
            <p className="text-[11px] font-semibold text-emerald-700">{t("Tarif Önerileri")}</p>
            <ul className="mt-2 space-y-1 text-[11px] text-muted">
              <li>{t("Fırın sebze + yoğurt sos")}</li>
              <li>{t("Kinoalı yeşil salata")}</li>
              <li>{t("Ton balıklı sandviç")}</li>
            </ul>
          </div>
        </div>
      </details>

      <details className="rounded-3xl border border-emerald-100 bg-white p-4">
        <summary className="cursor-pointer text-sm font-semibold text-ink">
          {t("3) Gelişmiş Raporlar")}
        </summary>
        <div className="mt-3 space-y-3 text-xs text-muted">
          {labReport.entryCount === 0 ? (
            <p>{t("Rapor verisi için önce kayıt oluşturmalısın.")}</p>
          ) : (
            <>
              <div className="grid gap-2 sm:grid-cols-3">
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-3 py-2 text-center text-[11px] font-semibold text-emerald-700">
                  {t("Uyum skoru %{value}", { value: labReport.adherenceScore })}
                </div>
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-3 py-2 text-center text-[11px] font-semibold text-emerald-700">
                  {latestWeek ? t("Haftalık skor %{value}", { value: latestWeek.adherenceScore }) : t("Haftalık skor -")}
                </div>
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-3 py-2 text-center text-[11px] font-semibold text-emerald-700">
                  {t("Aktif gün {value}", {
                    value: `${labReport.activeDays}/${labReport.rangeDays}`,
                  })}
                </div>
              </div>
              {weeklyScoreDelta !== null && (
                <p className="text-[11px] text-emerald-700">
                  {t("Önceki haftaya göre {value} puan", {
                    value: weeklyScoreDelta > 0 ? `+${weeklyScoreDelta}` : `${weeklyScoreDelta}`,
                  })}
                </p>
              )}
              {latestWeek && (
                <div className="rounded-2xl border border-emerald-100 bg-white p-3">
                  <p className="text-[11px] font-semibold text-emerald-700">
                    {t("Haftalık sapma özeti")}
                  </p>
                  <div className="mt-2 grid gap-2 sm:grid-cols-2 text-[11px] text-muted">
                    <span>
                      {t("Kalori {value} kcal", {
                        value: latestWeek.deltas.caloriesIn > 0 ? `+${latestWeek.deltas.caloriesIn}` : latestWeek.deltas.caloriesIn,
                      })}
                    </span>
                    <span>
                      {t("Su {value} ml", {
                        value: latestWeek.deltas.waterMl > 0 ? `+${latestWeek.deltas.waterMl}` : latestWeek.deltas.waterMl,
                      })}
                    </span>
                    <span>
                      {t("Aktivite {value} dk", {
                        value:
                          latestWeek.deltas.activityMin > 0
                            ? `+${latestWeek.deltas.activityMin}`
                            : latestWeek.deltas.activityMin,
                      })}
                    </span>
                    <span>
                      {t("Öğün {value}", {
                        value:
                          latestWeek.deltas.mealCount > 0
                            ? `+${latestWeek.deltas.mealCount}`
                            : latestWeek.deltas.mealCount,
                      })}
                    </span>
                  </div>
                </div>
              )}
              {deviationWarnings.length > 0 ? (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50/50 p-3 text-[11px] text-emerald-800">
                  <p className="font-semibold">{t("Sapma uyarıları")}</p>
                  <ul className="mt-2 space-y-1">
                    {deviationWarnings.map((warning) => (
                      <li key={warning.label}>
                        {warning.label}:{" "}
                        {warning.delta > 0 ? "+" : ""}
                        {Math.round(warning.delta)} {warning.unit} •{" "}
                        {warning.percent > 0 ? "+" : ""}
                        {warning.percent.toFixed(1)}%
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-[11px] text-emerald-700">{t("Belirgin sapma uyarısı yok.")}</p>
              )}
              <Link
                href="/report"
                className="inline-flex items-center justify-center rounded-xl border border-emerald-100 bg-white px-4 py-2 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-50"
              >
                {t("Detaylı raporu aç")}
              </Link>
            </>
          )}
        </div>
      </details>

      <details className="rounded-3xl border border-emerald-100 bg-white p-4">
        <summary className="cursor-pointer text-sm font-semibold text-ink">
          {t("4) Uyku / Stres / Ruh Hali Check-in")}
        </summary>
        <div className="mt-3 space-y-3 text-xs text-muted">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              value={sleepHours}
              onChange={(event) => setSleepHours(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-xs"
              placeholder={t("Uyku (saat)")}
              type="number"
              min="0"
              max="12"
            />
            <input
              value={checkInNote}
              onChange={(event) => setCheckInNote(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-xs"
              placeholder={t("Kısa not (opsiyonel)")}
              maxLength={120}
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <label className="text-[11px]">
              {t("Stres")} ({stressLevel})
              <input
                type="range"
                min="1"
                max="5"
                value={stressLevel}
                onChange={(event) => setStressLevel(Number(event.target.value))}
                className="mt-1 w-full accent-emerald-600"
              />
            </label>
            <label className="text-[11px]">
              {t("Mood")} ({moodLevel})
              <input
                type="range"
                min="1"
                max="5"
                value={moodLevel}
                onChange={(event) => setMoodLevel(Number(event.target.value))}
                className="mt-1 w-full accent-emerald-600"
              />
            </label>
            <label className="text-[11px]">
              {t("Enerji")} ({energyLevel})
              <input
                type="range"
                min="1"
                max="5"
                value={energyLevel}
                onChange={(event) => setEnergyLevel(Number(event.target.value))}
                className="mt-1 w-full accent-emerald-600"
              />
            </label>
          </div>
          <button
            onClick={() => {
              const today = getDayKey(new Date());
              const entry: CheckIn = {
                id: createId(),
                date: today,
                sleepHours: Number(sleepHours) || 0,
                stress: stressLevel,
                mood: moodLevel,
                energy: energyLevel,
                note: checkInNote.trim() || undefined,
              };
              setCheckIns((prev) => [entry, ...prev.filter((item) => item.date !== today)]);
              setCheckInNote("");
            }}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-[11px] font-semibold text-white hover:bg-emerald-700"
          >
            {t("Check-in Kaydet")}
          </button>
          <div className="grid gap-2 sm:grid-cols-2">
            {recentCheckIns.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-emerald-100 bg-white px-3 py-2 text-[11px] text-muted"
              >
                <div className="flex items-center justify-between">
                  <span>{item.date}</span>
                  <span>{t("{value} saat uyku", { value: item.sleepHours })}</span>
                </div>
                <div className="mt-1 text-[10px] text-emerald-700">
                  {t("Stres {s} • Mood {m} • Enerji {e}", {
                    s: item.stress,
                    m: item.mood,
                    e: item.energy,
                  })}
                </div>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-emerald-100 bg-white p-3">
            <p className="text-[11px] font-semibold text-emerald-700">{t("Korelasyon Özeti")}</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              {correlationMetrics.map((metric) => {
                const value = metric.value;
                const percent = value === null ? 0 : Math.min(100, Math.round(Math.abs(value) * 100));
                const tone = value !== null && value < 0 ? "bg-rose-400" : "bg-emerald-400";
                return (
                  <div
                    key={metric.label}
                    className="rounded-xl border border-emerald-100 bg-emerald-50/40 px-3 py-2 text-[11px]"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-emerald-700">{metric.label}</span>
                      <span className="text-muted">
                        {value === null ? t("Veri yok") : `${value > 0 ? "+" : ""}${value}`}
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-white">
                      <span className={`block h-full rounded-full ${tone}`} style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </details>

      <details className="rounded-3xl border border-emerald-100 bg-white p-4">
        <summary className="cursor-pointer text-sm font-semibold text-ink">
          {t("5) Giyilebilir Entegrasyonları")}
        </summary>
        <div className="mt-3 grid gap-3 text-xs text-muted sm:grid-cols-2">
          {integrationProviders.map((provider) => (
            <div
              key={provider.id}
              className="rounded-2xl border border-emerald-100 bg-white px-3 py-2"
            >
              <p className="text-[11px] font-semibold text-emerald-800">{t(provider.labelKey)}</p>
              <p className="text-[10px] text-muted">{t(provider.descriptionKey)}</p>
            </div>
          ))}
        </div>
      </details>

      <details className="rounded-3xl border border-emerald-100 bg-white p-4">
        <summary className="cursor-pointer text-sm font-semibold text-ink">
          {t("6) Akıllı Hatırlatmalar")}
        </summary>
        <div className="mt-3 space-y-3 text-xs text-muted">
          <p>
            {t("Önerilen hatırlatma saati: {value}", { value: suggestedReminder })}
          </p>
          <button
            onClick={() => updateReminder({ enabled: true, time: suggestedReminder })}
            className="rounded-xl border border-emerald-100 bg-white px-4 py-2 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            {t("Öneriyi Uygula")}
          </button>
          <p className="text-[11px] text-muted">
            {t("Mevcut ayar: {time} • {status}", {
              time: reminder.time,
              status: reminder.enabled ? t("Açık") : t("Kapalı"),
            })}
          </p>
        </div>
      </details>

      <details className="rounded-3xl border border-emerald-100 bg-white p-4">
        <summary className="cursor-pointer text-sm font-semibold text-ink">
          {t("7) Gamification & Streak")}
        </summary>
        <div className="mt-3 space-y-3 text-xs text-muted">
          <p>{t("Mevcut seri: {value} gün", { value: currentStreak })}</p>
          <button
            onClick={() => {
              const text = t("Calmet serim {value} gün! #calmet", { value: currentStreak });
              void navigator.clipboard?.writeText(text);
            }}
            className="rounded-xl border border-emerald-100 bg-white px-4 py-2 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-50"
          >
            {t("Seriyi Paylaş")}
          </button>
        </div>
      </details>

      <details className="rounded-3xl border border-emerald-100 bg-white p-4">
        <summary className="cursor-pointer text-sm font-semibold text-ink">
          {t("8) Koçluk Akışı")}
        </summary>
        <div className="mt-3 space-y-3 text-xs text-muted">
          <button
            onClick={() => {
              const next = buildCoachPlan(latestCheckIn);
              setCoachPlan({
                id: createId(),
                createdAt: new Date().toISOString(),
                summary: next.summary,
                actions: next.actions,
              });
            }}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-[11px] font-semibold text-white hover:bg-emerald-700"
          >
            {t("Haftalık Planı Üret")}
          </button>
          {coachPlan && (
            <div className="rounded-2xl border border-emerald-100 bg-emerald-50/60 p-3">
              <p className="text-[11px] font-semibold text-emerald-800">{coachPlan.summary}</p>
              <ul className="mt-2 list-disc pl-4 text-[11px] text-emerald-700">
                {coachPlan.actions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </details>

      <details className="rounded-3xl border border-emerald-100 bg-white p-4">
        <summary className="cursor-pointer text-sm font-semibold text-ink">
          {t("9) Yemek Kütüphanesi (Favori Setler)")}
        </summary>
        <div className="mt-3 space-y-3 text-xs text-muted">
          <div className="grid gap-2 sm:grid-cols-2">
            <input
              value={mealSetName}
              onChange={(event) => setMealSetName(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-xs"
              placeholder={t("Set adı")}
            />
            <input
              value={mealSetCalories}
              onChange={(event) => setMealSetCalories(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-xs"
              placeholder={t("Kalori")}
              type="number"
              min="0"
            />
            <input
              value={mealSetProtein}
              onChange={(event) => setMealSetProtein(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-xs"
              placeholder={t("Protein (g)")}
              type="number"
              min="0"
            />
            <input
              value={mealSetCarbs}
              onChange={(event) => setMealSetCarbs(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-xs"
              placeholder={t("Karbonhidrat (g)")}
              type="number"
              min="0"
            />
            <input
              value={mealSetFat}
              onChange={(event) => setMealSetFat(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-xs"
              placeholder={t("Yağ (g)")}
              type="number"
              min="0"
            />
            <input
              value={mealSetRecipeUrl}
              onChange={(event) => setMealSetRecipeUrl(event.target.value)}
              className="w-full rounded-xl border border-emerald-100 bg-white px-3 py-2 text-xs sm:col-span-2"
              placeholder={t("Tarif linki (opsiyonel)")}
              type="url"
            />
          </div>
          <button
            onClick={() => {
              if (!mealSetName.trim() || !mealSetCalories) {
                return;
              }
              const next: MealSet = {
                id: createId(),
                name: mealSetName.trim(),
                calories: Number(mealSetCalories),
                proteinG: mealSetProtein ? Number(mealSetProtein) : undefined,
                carbsG: mealSetCarbs ? Number(mealSetCarbs) : undefined,
                fatG: mealSetFat ? Number(mealSetFat) : undefined,
                recipeUrl: mealSetRecipeUrl.trim() || undefined,
              };
              setMealSets((prev) => [next, ...prev]);
              setMealSetName("");
              setMealSetCalories("");
              setMealSetProtein("");
              setMealSetCarbs("");
              setMealSetFat("");
              setMealSetRecipeUrl("");
            }}
            className="rounded-xl bg-emerald-600 px-4 py-2 text-[11px] font-semibold text-white hover:bg-emerald-700"
          >
            {t("Set Kaydet")}
          </button>
          <div className="grid gap-2 sm:grid-cols-2">
            {mealSets.map((set) => (
              <div key={set.id} className="rounded-2xl border border-emerald-100 bg-white px-3 py-2">
                <p className="text-[11px] font-semibold text-emerald-800">{set.name}</p>
                <p className="text-[10px] text-muted">{set.calories} kcal</p>
                {set.recipeUrl && (
                  <a
                    href={set.recipeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 inline-block text-[10px] font-semibold text-emerald-600 underline"
                  >
                    {t("Tarifi Aç")}
                  </a>
                )}
                <button
                  onClick={() =>
                    addFood({
                      name: set.name,
                      calories: set.calories,
                      mealType: "snack",
                      proteinG: set.proteinG,
                      carbsG: set.carbsG,
                      fatG: set.fatG,
                    })
                  }
                  className="mt-2 rounded-full border border-emerald-100 px-3 py-1 text-[10px] font-semibold text-emerald-700"
                >
                  {t("Hızlı Ekle")}
                </button>
              </div>
            ))}
          </div>
        </div>
      </details>

      <details className="rounded-3xl border border-emerald-100 bg-white p-4">
        <summary className="cursor-pointer text-sm font-semibold text-ink">
          {t("10) Gizlilik & Paylaşım")}
        </summary>
        <div className="mt-3 space-y-2 text-xs text-muted">
          <p>{t("Rapor paylaşımında artık süre ve anonimlik seçebilirsin.")}</p>
          <p className="text-[11px] text-emerald-700">
            {t("Rapor sayfasındaki paylaşım panelinden ayarlanır.")}
          </p>
        </div>
      </details>
    </div>
  );
}
