"use client";

import { useState } from "react";
import { Card } from "@/components/card";
import { Tooltip } from "@/components/tooltip";
import { ProgressRing } from "@/components/progress-ring";
import { WeeklyCharts } from "@/components/weekly-charts";
import { useTracker } from "@/components/tracker-provider";
import { MealType } from "@/lib/types";
import { t } from "@/lib/i18n";

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

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">{t("Bugün Özeti")}</p>
              <p className="text-xs text-muted">{t("Kalori girişi ve çıkışı")}</p>
            </div>
            <div className="rounded-full bg-amber-100 px-3 py-1 text-[11px] text-amber-700">
              {t("Tahmini")}
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-amber-50 p-3">
              <p className="text-xs text-muted">{t("Kalori Giriş")}</p>
              <p className="text-2xl font-semibold text-ink">{dailySummary.caloriesIn}</p>
            </div>
            <div className="rounded-2xl bg-amber-50 p-3">
              <p className="text-xs text-muted">{t("Kalori Çıkış")}</p>
              <p className="text-2xl font-semibold text-ink">{dailySummary.caloriesOut}</p>
            </div>
            <div className="rounded-2xl bg-amber-50 p-3">
              <p className="text-xs text-muted">{t("Net")}</p>
              <p className="text-2xl font-semibold text-ink">{netCalories}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-amber-100 bg-white p-3">
              <p className="text-xs text-muted">{t("Protein")}</p>
              <p className="text-xl font-semibold text-ink">{t("{value} g", { value: Math.round(dailySummary.proteinG) })}</p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white p-3">
              <p className="text-xs text-muted">{t("Karbonhidrat")}</p>
              <p className="text-xl font-semibold text-ink">{t("{value} g", { value: Math.round(dailySummary.carbsG) })}</p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white p-3">
              <p className="text-xs text-muted">{t("Yağ")}</p>
              <p className="text-xl font-semibold text-ink">{t("{value} g", { value: Math.round(dailySummary.fatG) })}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-white p-4">
            <div className="flex items-center gap-2 text-xs text-muted">
              <span>{t("Hızlı Kalori Ekle")}</span>
              <Tooltip label={t("Sadece kalori yazıp öğünü seçerek hızlı kayıt oluşturun.")}>
                <span className="flex h-5 w-5 items-center justify-center rounded-full border border-amber-200 text-[10px] text-amber-700">
                  ?
                </span>
              </Tooltip>
            </div>
            <div className="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                value={quickCalories}
                onChange={(event) => setQuickCalories(event.target.value)}
                className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200"
                placeholder={t("Örn: 420")}
                type="number"
                min="0"
              />
              <select
                value={quickMeal}
                onChange={(event) => setQuickMeal(event.target.value as MealType)}
                className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-200 sm:max-w-[160px]"
              >
                {Object.entries(mealLabels).map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <button
                onClick={() => {
                  if (!quickCalories) return;
                  addFood({
                    name: t("Hızlı Ekleme"),
                    calories: Number(quickCalories),
                    mealType: quickMeal,
                  });
                  setQuickCalories("");
                }}
                className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-strong"
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
                className="rounded-full border border-amber-100 bg-white px-3 py-1 text-[11px] font-semibold text-amber-700 hover:border-amber-200"
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
          <div className="rounded-2xl bg-amber-50 p-4 text-xs text-muted">
            {t("Kalori çıkışı değeri tahminidir. Kullanıcı düzenlemesi her zaman geçerli.")}
          </div>
        </Card>

        <Card className="flex flex-col gap-2">
          <p className="text-sm font-semibold">{t("AI Özellikleri")}</p>
          <p className="text-xs text-muted">{t("Görüntü tabanlı loglama şu an kapalıdır.")}</p>
          <div className="flex items-center justify-between rounded-2xl bg-amber-50 p-4 text-xs text-muted">
            <span>{t("AI Görsel Tanıma")}</span>
            <span className="rounded-full bg-white px-3 py-1 text-[11px] text-amber-700">
              {flags.aiVisual ? t("Açık") : t("Kapalı")}
            </span>
          </div>
        </Card>
      </section>

    </div>
  );
}
