"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/card";
import { Tooltip } from "@/components/tooltip";
import { ProgressRing } from "@/components/progress-ring";
import { WeeklyCharts } from "@/components/weekly-charts";
import { useTracker } from "@/components/tracker-provider";
import { MealType } from "@/lib/types";
import { isProfileComplete, loadProfile } from "@/lib/profile";
import { ProfileSetupModal } from "@/components/profile-setup-modal";

const mealLabels: Record<MealType, string> = {
  breakfast: "Kahvaltı",
  lunch: "Öğle",
  dinner: "Akşam",
  snack: "Atıştırmalık",
};

export default function DashboardPage() {
  const router = useRouter();
  const { entries, dailySummary, weeklySummary, goals, addFood, addWater, flags } = useTracker();
  const [quickCalories, setQuickCalories] = useState("");
  const [quickMeal, setQuickMeal] = useState<MealType>("snack");
  const [onboardingParam, setOnboardingParam] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    const params = new URLSearchParams(window.location.search);
    const fromOnboarding = params.get("onboarding") === "1";
    setOnboardingParam(fromOnboarding);
    if (fromOnboarding || !isProfileComplete(loadProfile())) {
      setShowProfileSetup(true);
    }
  }, []);

  const netCalories = dailySummary.caloriesIn - dailySummary.caloriesOut;
  const waterLeft = Math.max(goals.waterGoalMl - dailySummary.waterMl, 0);
  const hasEntries = entries.length > 0;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold">Bugün Özeti</p>
              <p className="text-xs text-muted">Kalori girişi ve çıkışı</p>
            </div>
            <div className="rounded-full bg-amber-100 px-3 py-1 text-[11px] text-amber-700">
              Tahmini
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl bg-amber-50 p-3">
              <p className="text-xs text-muted">Kalori Giriş</p>
              <p className="text-2xl font-semibold text-ink">{dailySummary.caloriesIn}</p>
            </div>
            <div className="rounded-2xl bg-amber-50 p-3">
              <p className="text-xs text-muted">Kalori Çıkış</p>
              <p className="text-2xl font-semibold text-ink">{dailySummary.caloriesOut}</p>
            </div>
            <div className="rounded-2xl bg-amber-50 p-3">
              <p className="text-xs text-muted">Net</p>
              <p className="text-2xl font-semibold text-ink">{netCalories}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-amber-100 bg-white p-4">
            <div className="flex items-center gap-2 text-xs text-muted">
              <span>Hızlı Kalori Ekle</span>
              <Tooltip label="Sadece kalori yazıp öğünü seçerek hızlı kayıt oluşturun.">
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
                placeholder="Örn: 420"
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
                    name: "Hızlı Ekleme",
                    calories: Number(quickCalories),
                    mealType: quickMeal,
                  });
                  setQuickCalories("");
                }}
                className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-strong"
              >
                Kaydet
              </button>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col items-center gap-4">
          <div className="self-start">
            <p className="text-sm font-semibold">Su Takibi</p>
            <p className="text-xs text-muted">
              Günlük hedef {Math.round(goals.waterGoalMl / 1000)} L
            </p>
          </div>
          <ProgressRing value={dailySummary.waterMl} goal={goals.waterGoalMl} />
          <div className="text-center text-xs text-muted">Kalan {Math.round(waterLeft)} ml</div>
          <div className="flex flex-wrap justify-center gap-2">
            {[200, 500, 1000].map((amount) => (
              <button
                key={amount}
                onClick={() => addWater({ amountMl: amount })}
                className="rounded-full border border-amber-100 bg-white px-3 py-1 text-[11px] font-semibold text-amber-700 hover:border-amber-200"
              >
                +{amount === 1000 ? "1L" : `${amount}ml`}
              </button>
            ))}
          </div>
        </Card>
      </section>

      <WeeklyCharts summary={weeklySummary} hasEntries={hasEntries} />

      {!hasEntries && (
        <Card className="text-center text-sm text-muted">
          Henüz kayıt yok. Hızlı ekleme veya &quot;Ekle&quot; sekmesini kullanarak başlayın.
        </Card>
      )}

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="flex flex-col gap-2">
          <p className="text-sm font-semibold">Aktivite Girdisi</p>
          <p className="text-xs text-muted">
            Yürümek, koşu veya salon aktivitelerini manuel ekleyin.
          </p>
          <div className="rounded-2xl bg-amber-50 p-4 text-xs text-muted">
            Kalori çıkışı değeri tahminidir. Kullanıcı düzenlemesi her zaman geçerli.
          </div>
        </Card>

        <Card className="flex flex-col gap-2">
          <p className="text-sm font-semibold">AI Özellikleri</p>
          <p className="text-xs text-muted">Görüntü tabanlı loglama şu an kapalıdır.</p>
          <div className="flex items-center justify-between rounded-2xl bg-amber-50 p-4 text-xs text-muted">
            <span>AI Görsel Tanıma</span>
            <span className="rounded-full bg-white px-3 py-1 text-[11px] text-amber-700">
              {flags.aiVisual ? "Açık" : "Kapalı"}
            </span>
          </div>
        </Card>
      </section>

      <ProfileSetupModal
        open={showProfileSetup}
        onClose={() => setShowProfileSetup(false)}
        onSaved={() => {
          setShowProfileSetup(false);
          if (onboardingParam) {
            router.replace("/dashboard");
          }
        }}
      />
    </div>
  );
}
