"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tooltip } from "@/components/ui/tooltip";
import { ProgressRing } from "@/components/ui/progress-ring";
import { WeeklyCharts } from "@/components/features/charts/weekly-charts";
import { useTracker } from "@/components/providers/tracker-provider";
import { MealType } from "@/lib/core/types";
import { t } from "@/lib/core/i18n";

export default function DashboardPage() {
  const { entries, dailySummary, weeklySummary, goals, addFood, addWater, flags } = useTracker();
  const [quickCalories, setQuickCalories] = useState("");
  const [quickMeal, setQuickMeal] = useState<MealType>("snack");
  const mealLabels: Record<MealType, string> = {
    breakfast: t("Kahvaltı"),
    lunch: t("Öğle"),
    dinner: t("Akşam"),
    snack: t("Atıştırmalık"),
  };

  const netCalories = dailySummary.caloriesIn - dailySummary.caloriesOut;
  const waterLeft = Math.max(goals.waterGoalMl - dailySummary.waterMl, 0);
  const hasEntries = entries.length > 0;
  const macroGoals = [
    { key: "protein", label: t("Protein Hedefi"), goal: goals.proteinGoalG, value: dailySummary.proteinG },
    { key: "carbs", label: t("Karbonhidrat Hedefi"), goal: goals.carbsGoalG, value: dailySummary.carbsG },
    { key: "fat", label: t("Yağ Hedefi"), goal: goals.fatGoalG, value: dailySummary.fatG },
  ];
  const hasMacroGoals = macroGoals.some((goal) => goal.goal > 0);
  const handleQuickAdd = () => {
    if (!quickCalories) {
      return;
    }
    addFood({
      name: t("Hızlı Ekleme"),
      calories: Number(quickCalories),
      mealType: quickMeal,
    });
    setQuickCalories("");
  };

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-4 border-emerald-50 bg-white/50 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-gray-900">{t("Bugün Özeti")}</p>
              <p className="text-xs text-muted">{t("Kalori girişi ve çıkışı")}</p>
            </div>
            <div className="rounded-full bg-emerald-100 px-3 py-1 text-[11px] font-bold text-emerald-700">
              {t("Tahmini")}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-emerald-500/10 p-3 border border-emerald-100">
              <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{t("Kalori Giriş")}</p>
              <p className="text-2xl font-black text-gray-900">{dailySummary.caloriesIn}</p>
            </div>
            <div className="rounded-2xl bg-gray-900 p-3 border border-gray-800">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t("Kalori Çıkış")}</p>
              <p className="text-2xl font-black text-white">{dailySummary.caloriesOut}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 p-3 border border-gray-100">
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{t("Net")}</p>
              <p className="text-2xl font-black text-gray-900">{netCalories}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-emerald-50 bg-white p-3 shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase">{t("Protein")}</p>
              <p className="text-xl font-black text-emerald-700">{t("{value} g", { value: Math.round(dailySummary.proteinG) })}</p>
            </div>
            <div className="rounded-2xl border border-emerald-100 bg-white p-3 shadow-sm">
              <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t("Karbonhidrat")}</p>
              <p className="text-xl font-black text-emerald-600">{t("{value} g", { value: Math.round(dailySummary.carbsG) })}</p>
            </div>
            <div className="rounded-2xl border border-rose-50 bg-white p-3 shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase">{t("Yağ")}</p>
              <p className="text-xl font-black text-rose-500">{t("{value} g", { value: Math.round(dailySummary.fatG) })}</p>
            </div>
          </div>
          {hasMacroGoals && (
            <div className="rounded-2xl border border-emerald-50 bg-emerald-50/30 p-4">
              <p className="text-xs font-bold text-emerald-900 uppercase tracking-tight">{t("Makro Hedef Takibi")}</p>
              <div className="mt-3 grid gap-4 sm:grid-cols-3">
                {macroGoals.map((macro) => (
                  <div key={macro.key} className="space-y-1.5 text-xs text-ink font-sans">
                    <div className="flex items-center justify-between text-[11px] font-bold">
                      <span className="text-gray-600">{macro.label}</span>
                      <span className="text-emerald-700">
                        {t("{value}/{goal} g", {
                          value: Math.round(macro.value),
                          goal: Math.round(macro.goal),
                        })}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-emerald-100/50">
                      <div
                        className="h-full rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                        style={{
                          width: `${macro.goal > 0 ? Math.min(100, (macro.value / macro.goal) * 100) : 0}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-2xl border border-gray-100 bg-gray-50/50 p-4 transition-all hover:bg-white hover:shadow-md">
            <div className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-tighter">
              <span>{t("Hızlı Kalori Ekle")}</span>
              <Tooltip label={t("Sadece kalori yazıp öğünü seçerek hızlı kayıt oluşturun.")}>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-200 text-[10px] text-gray-400">
                  ?
                </span>
              </Tooltip>
            </div>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                value={quickCalories}
                onChange={(event) => setQuickCalories(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    handleQuickAdd();
                  }
                }}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all"
                placeholder={t("Örn: 420")}
                type="number"
                min="0"
              />
              <select
                value={quickMeal}
                onChange={(event) => setQuickMeal(event.target.value as MealType)}
                className="w-full rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/10 transition-all sm:max-w-[160px]"
              >
                {Object.entries(mealLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <button
                onClick={handleQuickAdd}
                className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-200 hover:bg-emerald-700 active:scale-95 transition-all"
              >
                {t("Kaydet")}
              </button>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col items-center gap-4">
          <div className="self-start">
            <p className="text-sm font-semibold">{t("Su Takibi")}</p>
            <p className="text-xs text-muted">
              {t("Günlük hedef {value} L", { value: Math.round(goals.waterGoalMl / 1000) })}
            </p>
          </div>
          <ProgressRing value={dailySummary.waterMl} goal={goals.waterGoalMl} />
          <div className="text-center text-xs text-muted">
            {t("Kalan {value} ml", { value: Math.round(waterLeft) })}
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[200, 500, 1000].map((amount) => (
              <button
                key={amount}
                onClick={() => addWater({ amountMl: amount })}
                className="rounded-full border border-emerald-100 bg-white px-4 py-1.5 text-[11px] font-black text-emerald-700 shadow-sm hover:bg-emerald-50 transition-all active:scale-95"
              >
                {t("+{value}", { value: amount === 1000 ? "1L" : `${amount}ml` })}
              </button>
            ))}
          </div>
        </Card>
      </section>

      <WeeklyCharts summary={weeklySummary} hasEntries={hasEntries} />

      {!hasEntries && (
        <Card className="text-center text-sm text-muted">
          {t("Henüz kayıt yok. Hızlı ekleme veya \"Ekle\" sekmesini kullanarak başlayın.")}
        </Card>
      )}

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="flex flex-col gap-2">
          <p className="text-sm font-semibold">{t("Aktivite Girdisi")}</p>
          <p className="text-xs text-muted">
            {t("Yürümek, koşu veya salon aktivitelerini manuel ekleyin.")}
          </p>
          <div className="rounded-2xl bg-emerald-50 p-4 text-xs font-bold text-emerald-700">
            {t("Kalori çıkışı değeri tahminidir. Kullanıcı düzenlemesi her zaman geçerli.")}
          </div>
        </Card>

        <Card className="flex flex-col gap-2">
          <p className="text-sm font-semibold">{t("AI Özellikleri")}</p>
          <p className="text-xs text-muted">{t("Görüntü tabanlı loglama şu an kapalıdır.")}</p>
          <div className="flex items-center justify-between rounded-2xl bg-emerald-50 p-4 text-xs font-bold text-emerald-700">
            <span>{t("AI Görsel Tanıma")}</span>
            <span className="rounded-full bg-white px-3 py-1 text-[11px] font-black border border-emerald-100">
              {flags.aiVisual ? t("Açık") : t("Kapalı")}
            </span>
          </div>
        </Card>
      </section>

    </div>
  );
}
