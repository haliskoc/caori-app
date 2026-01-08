"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Card } from "@/components/card";
import { useTracker } from "@/components/tracker-provider";
import { DAY_MS, getDayKey } from "@/lib/utils";
import { loadProfile, saveProfile, type ProfileInfo } from "@/lib/profile";
import { MealType } from "@/lib/types";

type DayBucket = {
  caloriesIn: number;
  caloriesOut: number;
  waterMl: number;
  activityMin: number;
  meals: Set<MealType>;
};

type BadgeDefinition = {
  id: string;
  title: string;
  description: string;
  threshold: number;
  category: "streak" | "meal" | "water" | "activity";
  tone: string;
  accent: string;
  label: string;
};

const goalOptions = [
  { value: "fat_burn", label: "Yağ yakmak" },
  { value: "muscle_gain", label: "Kas kazanmak" },
  { value: "fit_form", label: "Fit & form kalmak" },
  { value: "conditioning", label: "Kondisyon artırmak" },
  { value: "healthy", label: "Sağlıklı yaşamak" },
] as const;

const sportLevelOptions = [
  { value: "beginner", label: "Yeni başlıyorum" },
  { value: "sometimes", label: "Ara sıra yapıyorum" },
  { value: "regular", label: "Düzenli yapıyorum" },
  { value: "advanced", label: "İleri seviye" },
] as const;

const workoutDaysOptions = [
  { value: "1-2", label: "1–2 gün" },
  { value: "3-4", label: "3–4 gün" },
  { value: "5+", label: "5+ gün" },
] as const;

const workoutPlaceOptions = [
  { value: "home", label: "Ev" },
  { value: "gym", label: "Spor salonu" },
  { value: "outdoor", label: "Açık alan" },
] as const;

const equipmentOptions = [
  { value: "none", label: "Ekipman yok" },
  { value: "basic", label: "Temel ekipman (dumbbell vb.)" },
  { value: "full", label: "Tam ekipman" },
] as const;

const injuryOptions = [
  { value: "none", label: "Yok" },
  { value: "knee", label: "Diz" },
  { value: "back", label: "Bel" },
  { value: "shoulder", label: "Omuz" },
  { value: "other", label: "Diğer" },
] as const;

const doctorRestrictionOptions = [
  { value: "no", label: "Hayır" },
  { value: "yes", label: "Evet" },
] as const;

const referralOptions = [
  { value: "instagram", label: "Instagram" },
  { value: "tiktok", label: "TikTok" },
  { value: "youtube", label: "YouTube" },
  { value: "friend", label: "Arkadaş tavsiyesi" },
  { value: "search", label: "Google / App Store" },
  { value: "other", label: "Diğer" },
] as const;

const badgeDefinitions: BadgeDefinition[] = [
  {
    id: "streak-3",
    title: "Ateş Başlangıcı",
    description: "3 gün üst üste kayıt",
    threshold: 3,
    category: "streak",
    tone: "from-amber-200 via-amber-100 to-white",
    accent: "text-amber-700",
    label: "3G",
  },
  {
    id: "streak-7",
    title: "Hafta İstikrarı",
    description: "7 gün seri",
    threshold: 7,
    category: "streak",
    tone: "from-orange-200 via-orange-100 to-white",
    accent: "text-orange-700",
    label: "7G",
  },
  {
    id: "streak-30",
    title: "Seri Efsanesi",
    description: "30 gün kesintisiz",
    threshold: 30,
    category: "streak",
    tone: "from-rose-200 via-rose-100 to-white",
    accent: "text-rose-700",
    label: "30G",
  },
  {
    id: "meal-3",
    title: "Öğün Dikkati",
    description: "3 gün tam öğün",
    threshold: 3,
    category: "meal",
    tone: "from-emerald-200 via-emerald-100 to-white",
    accent: "text-emerald-700",
    label: "3G",
  },
  {
    id: "meal-7",
    title: "Dengeli Hafta",
    description: "7 gün tam öğün",
    threshold: 7,
    category: "meal",
    tone: "from-teal-200 via-teal-100 to-white",
    accent: "text-teal-700",
    label: "7G",
  },
  {
    id: "meal-21",
    title: "Öğün Şampiyonu",
    description: "21 gün tam öğün",
    threshold: 21,
    category: "meal",
    tone: "from-cyan-200 via-cyan-100 to-white",
    accent: "text-cyan-700",
    label: "21G",
  },
  {
    id: "water-3",
    title: "Su Başlangıcı",
    description: "3 gün su hedefi",
    threshold: 3,
    category: "water",
    tone: "from-sky-200 via-sky-100 to-white",
    accent: "text-sky-700",
    label: "3G",
  },
  {
    id: "water-7",
    title: "Su İstikrarı",
    description: "7 gün su hedefi",
    threshold: 7,
    category: "water",
    tone: "from-blue-200 via-blue-100 to-white",
    accent: "text-blue-700",
    label: "7G",
  },
  {
    id: "water-21",
    title: "Su Disiplini",
    description: "21 gün su hedefi",
    threshold: 21,
    category: "water",
    tone: "from-cyan-200 via-cyan-100 to-white",
    accent: "text-cyan-700",
    label: "21G",
  },
  {
    id: "activity-3",
    title: "Aktivite Başlangıcı",
    description: "3 gün aktivite hedefi",
    threshold: 3,
    category: "activity",
    tone: "from-lime-200 via-lime-100 to-white",
    accent: "text-lime-700",
    label: "3G",
  },
  {
    id: "activity-7",
    title: "Aktivite İstikrarı",
    description: "7 gün aktivite hedefi",
    threshold: 7,
    category: "activity",
    tone: "from-green-200 via-green-100 to-white",
    accent: "text-green-700",
    label: "7G",
  },
  {
    id: "activity-21",
    title: "Aktivite Disiplini",
    description: "21 gün aktivite hedefi",
    threshold: 21,
    category: "activity",
    tone: "from-emerald-200 via-emerald-100 to-white",
    accent: "text-emerald-700",
    label: "21G",
  },
];

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) {
    return "CA";
  }
  const initials = parts.slice(0, 2).map((part) => part[0]?.toUpperCase() ?? "");
  return initials.join("");
}

function getBmiLabel(bmi: number) {
  if (bmi < 18.5) return "Zayıf";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Fazla";
  return "Yüksek";
}

function getOptionLabel<T extends { value: string; label: string }>(
  options: readonly T[],
  value: string,
) {
  return options.find((option) => option.value === value)?.label ?? "-";
}

export default function ProfilePage() {
  const { user } = useUser();
  const { entries, goals } = useTracker();
  const [profile, setProfile] = useState<ProfileInfo>(() => loadProfile());
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const isRemote = Boolean(user?.sub);

  useEffect(() => {
    if (!isRemote) {
      return;
    }
    let active = true;
    const load = async () => {
      try {
        const res = await fetch("/api/v1/profile", { credentials: "include" });
        if (res.ok) {
          const data = (await res.json()) as ProfileInfo;
          if (active) {
            setProfile(data);
          }
        }
      } catch {
        // ignore remote load errors
      }
    };
    void load();
    return () => {
      active = false;
    };
  }, [isRemote]);

  const stats = useMemo(() => {
    const dayMap = new Map<string, DayBucket>();

    for (const entry of entries) {
      const dayKey = getDayKey(entry.timestamp);
      let bucket = dayMap.get(dayKey);
      if (!bucket) {
        bucket = {
          caloriesIn: 0,
          caloriesOut: 0,
          waterMl: 0,
          activityMin: 0,
          meals: new Set(),
        };
        dayMap.set(dayKey, bucket);
      }
      if (entry.type === "food") {
        bucket.caloriesIn += entry.calories;
        bucket.meals.add(entry.mealType);
      }
      if (entry.type === "water") {
        bucket.waterMl += entry.amountMl;
      }
      if (entry.type === "activity") {
        bucket.caloriesOut += entry.estimatedCalories;
        bucket.activityMin += entry.durationMin;
      }
    }

    const dayKeys = Array.from(dayMap.keys()).sort();
    const daySet = new Set(dayKeys);
    const daysCount = dayKeys.length;

    let totalCaloriesIn = 0;
    let totalCaloriesOut = 0;
    let totalWater = 0;
    let totalActivityMin = 0;
    let mealGoalDays = 0;
    const waterGoalDays = new Set<string>();
    const activityGoalDays = new Set<string>();
    const mealGoalDaySet = new Set<string>();

    for (const key of dayKeys) {
      const bucket = dayMap.get(key);
      if (!bucket) continue;
      totalCaloriesIn += bucket.caloriesIn;
      totalCaloriesOut += bucket.caloriesOut;
      totalWater += bucket.waterMl;
      totalActivityMin += bucket.activityMin;
      if (goals.waterGoalMl > 0 && bucket.waterMl >= goals.waterGoalMl) {
        waterGoalDays.add(key);
      }
      if (goals.activityGoalMin > 0 && bucket.activityMin >= goals.activityGoalMin) {
        activityGoalDays.add(key);
      }
      if (goals.mealGoalCount > 0 && bucket.meals.size >= goals.mealGoalCount) {
        mealGoalDays += 1;
        mealGoalDaySet.add(key);
      }
    }
    const getCurrentStreak = (targetDays: Set<string>) => {
      let streak = 0;
      let cursor = new Date();
      while (targetDays.has(getDayKey(cursor))) {
        streak += 1;
        cursor = new Date(cursor.getTime() - DAY_MS);
      }
      return streak;
    };

    const currentStreak = getCurrentStreak(daySet);
    const currentWaterStreak = getCurrentStreak(waterGoalDays);
    const currentActivityStreak = getCurrentStreak(activityGoalDays);
    const currentMealStreak = getCurrentStreak(mealGoalDaySet);

    let longestStreak = 0;
    let running = 0;
    let prevDate: Date | null = null;

    for (const key of dayKeys) {
      const current = new Date(`${key}T00:00:00`);
      if (!prevDate) {
        running = 1;
      } else {
        const diffDays = Math.round((current.getTime() - prevDate.getTime()) / DAY_MS);
        running = diffDays === 1 ? running + 1 : 1;
      }
      longestStreak = Math.max(longestStreak, running);
      prevDate = current;
    }

    return {
      totalEntries: entries.length,
      daysCount,
      totalCaloriesIn,
      totalCaloriesOut,
      totalWater,
      totalActivityMin,
      mealGoalDays,
      currentStreak,
      currentWaterStreak,
      currentActivityStreak,
      currentMealStreak,
      longestStreak,
    };
  }, [entries, goals]);

  const profileCompletion = useMemo(() => {
    const requiredFields: Array<keyof ProfileInfo> = [
      "age",
      "heightCm",
      "weightKg",
      "mainGoal",
      "sportLevel",
      "workoutDays",
      "workoutPlace",
      "equipmentLevel",
      "injury",
      "doctorRestriction",
      "referralSource",
      "expectation",
    ];
    let filled = requiredFields.filter((key) => profile[key]?.toString().trim()).length;
    let total = requiredFields.length;
    if (profile.injury === "other") {
      total += 1;
      if (profile.injuryDetail.trim()) {
        filled += 1;
      }
    }
    return total > 0 ? Math.round((filled / total) * 100) : 0;
  }, [profile]);

  const heightCm = Number(profile.heightCm);
  const weightKg = Number(profile.weightKg);
  const age = Number(profile.age);
  const bmi = heightCm > 0 && weightKg > 0 ? weightKg / Math.pow(heightCm / 100, 2) : null;
  const ageLabel = Number.isFinite(age) && age > 0 ? `${age} yaş` : "-";

  const numberFormat = useMemo(() => new Intl.NumberFormat("tr-TR"), []);
  const formatNumber = (value: number) => numberFormat.format(Math.round(value));

  const mealRate =
    stats.daysCount > 0 ? Math.round((stats.mealGoalDays / stats.daysCount) * 100) : 0;
  const mainGoalLabel = getOptionLabel(goalOptions, profile.mainGoal);
  const sportLevelLabel = getOptionLabel(sportLevelOptions, profile.sportLevel);

  const badgeProgress = {
    streak: stats.currentStreak,
    meal: stats.currentMealStreak,
    water: stats.currentWaterStreak,
    activity: stats.currentActivityStreak,
  };

  const streakBadges = badgeDefinitions.filter((badge) => badge.category === "streak");
  const mealBadges = badgeDefinitions.filter((badge) => badge.category === "meal");
  const waterBadges = badgeDefinitions.filter((badge) => badge.category === "water");
  const activityBadges = badgeDefinitions.filter((badge) => badge.category === "activity");

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-amber-100 text-lg font-semibold text-amber-700">
                {getInitials(profile.fullName || user?.name || "")}
              </div>
              <div>
                <p className="text-sm font-semibold text-ink">Profil</p>
                <p className="text-xs text-muted">
                  {profile.fullName || user?.name || "İsmini ekle"}
                </p>
                <p className="text-[11px] text-muted">
                  {user?.email ? `E-posta: ${user.email}` : "Yerel profil"}
                </p>
              </div>
            </div>
            <div className="w-full sm:min-w-[200px] sm:w-auto">
              <div className="flex items-center justify-between text-[11px] text-muted">
                <span>Profil tamamlama</span>
                <span>%{profileCompletion}</span>
              </div>
              <div className="mt-2 h-2 rounded-full bg-amber-100">
                <div
                  className="h-2 rounded-full bg-accent"
                  style={{ width: `${profileCompletion}%` }}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">Mevcut seri</p>
              <p className="mt-1 text-lg font-semibold text-ink">{stats.currentStreak} gün</p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">Öğün hedef günleri</p>
              <p className="mt-1 text-lg font-semibold text-ink">{stats.mealGoalDays} gün</p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">Su hedefi</p>
              <p className="mt-1 text-lg font-semibold text-ink">
                {Math.round(goals.waterGoalMl / 1000)} L
              </p>
            </div>
          </div>

          {bmi && (
            <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs text-amber-900">
              BMI: {bmi.toFixed(1)} • {getBmiLabel(bmi)} aralık
            </div>
          )}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">Yaş</p>
              <p className="mt-1 text-lg font-semibold text-ink">
                {ageLabel}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">Ana hedef</p>
              <p className="mt-1 text-lg font-semibold text-ink">{mainGoalLabel}</p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">Spor seviyesi</p>
              <p className="mt-1 text-lg font-semibold text-ink">{sportLevelLabel}</p>
            </div>
          </div>
        </Card>

        <Card className="space-y-4">
          <div>
            <p className="text-sm font-semibold">Pro Bağlantıları</p>
            <p className="text-xs text-muted">Premium modüllerini bu panelden yönetin.</p>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-white px-4 py-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted">Plan</span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] text-amber-700">
                Ücretsiz
              </span>
            </div>
            <p className="mt-2 text-[11px] text-muted">
              Pro plan ile gelişmiş analiz, sınırsız kayıt ve özel raporlar açılır.
            </p>
          </div>
          <div className="space-y-2">
            <Link
              href="/#pricing"
              className="block w-full rounded-xl bg-amber-600 px-4 py-2 text-center text-xs font-semibold text-white hover:bg-amber-700"
            >
              Premiuma Geç
            </Link>
            <a
              href={user ? "/api/integrations/google/auth" : "/auth/login"}
              className="block w-full rounded-xl border border-amber-100 bg-white px-4 py-2 text-center text-xs font-semibold text-amber-700 hover:border-amber-200"
            >
              Google Fit Bağla
            </a>
            <Link
              href="/settings"
              className="block w-full rounded-xl border border-amber-100 bg-white px-4 py-2 text-center text-xs text-muted hover:text-ink"
            >
              Pro Ayarları
            </Link>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <Card className="space-y-4">
          <div>
            <p className="text-sm font-semibold">Kişisel Bilgiler</p>
            <p className="text-xs text-muted">Profiliniz kişiselleşsin, hedefleriniz netleşsin.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-[11px] text-muted">Ad Soyad</label>
              <input
                value={profile.fullName}
                onChange={(event) => {
                  setProfile((prev) => ({ ...prev, fullName: event.target.value }));
                  setSaveMessage(null);
                }}
                className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
                placeholder="İsim"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-muted">Yaş</label>
              <input
                value={profile.age}
                onChange={(event) => {
                  setProfile((prev) => ({ ...prev, age: event.target.value }));
                  setSaveMessage(null);
                }}
                className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
                placeholder="26"
                inputMode="numeric"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-muted">Boy (cm)</label>
              <input
                value={profile.heightCm}
                onChange={(event) => {
                  setProfile((prev) => ({ ...prev, heightCm: event.target.value }));
                  setSaveMessage(null);
                }}
                className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
                placeholder="175"
                inputMode="numeric"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-muted">Kilo (kg)</label>
              <input
                value={profile.weightKg}
                onChange={(event) => {
                  setProfile((prev) => ({ ...prev, weightKg: event.target.value }));
                  setSaveMessage(null);
                }}
                className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
                placeholder="70"
                inputMode="numeric"
              />
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-[11px] text-muted">Ana hedef</label>
              <select
                value={profile.mainGoal}
                onChange={(event) => {
                  setProfile((prev) => ({
                    ...prev,
                    mainGoal: event.target.value as ProfileInfo["mainGoal"],
                  }));
                  setSaveMessage(null);
                }}
                className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
              >
                <option value="">Seç</option>
                {goalOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-muted">Spor seviyesi</label>
              <select
                value={profile.sportLevel}
                onChange={(event) => {
                  setProfile((prev) => ({
                    ...prev,
                    sportLevel: event.target.value as ProfileInfo["sportLevel"],
                  }));
                  setSaveMessage(null);
                }}
                className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
              >
                <option value="">Seç</option>
                {sportLevelOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-muted">Haftalık spor</label>
              <select
                value={profile.workoutDays}
                onChange={(event) => {
                  setProfile((prev) => ({
                    ...prev,
                    workoutDays: event.target.value as ProfileInfo["workoutDays"],
                  }));
                  setSaveMessage(null);
                }}
                className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
              >
                <option value="">Seç</option>
                {workoutDaysOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-muted">Spor yeri</label>
              <select
                value={profile.workoutPlace}
                onChange={(event) => {
                  setProfile((prev) => ({
                    ...prev,
                    workoutPlace: event.target.value as ProfileInfo["workoutPlace"],
                  }));
                  setSaveMessage(null);
                }}
                className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
              >
                <option value="">Seç</option>
                {workoutPlaceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-muted">Ekipman durumu</label>
              <select
                value={profile.equipmentLevel}
                onChange={(event) => {
                  setProfile((prev) => ({
                    ...prev,
                    equipmentLevel: event.target.value as ProfileInfo["equipmentLevel"],
                  }));
                  setSaveMessage(null);
                }}
                className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
              >
                <option value="">Seç</option>
                {equipmentOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-[11px] text-muted">Sakatlık</label>
              <select
                value={profile.injury}
                onChange={(event) => {
                  setProfile((prev) => ({
                    ...prev,
                    injury: event.target.value as ProfileInfo["injury"],
                  }));
                  setSaveMessage(null);
                }}
                className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
              >
                <option value="">Seç</option>
                {injuryOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[11px] text-muted">Doktor kısıtı</label>
              <select
                value={profile.doctorRestriction}
                onChange={(event) => {
                  setProfile((prev) => ({
                    ...prev,
                    doctorRestriction: event.target.value as ProfileInfo["doctorRestriction"],
                  }));
                  setSaveMessage(null);
                }}
                className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
              >
                <option value="">Seç</option>
                {doctorRestrictionOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {profile.injury === "other" && (
            <div className="mt-4 space-y-1">
              <label className="text-[11px] text-muted">Sakatlık detayı</label>
              <input
                value={profile.injuryDetail}
                onChange={(event) => {
                  setProfile((prev) => ({ ...prev, injuryDetail: event.target.value }));
                  setSaveMessage(null);
                }}
                className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
                placeholder="Kısa açıklama"
              />
            </div>
          )}

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-[11px] text-muted">Bizi nereden duydun?</label>
              <select
                value={profile.referralSource}
                onChange={(event) => {
                  setProfile((prev) => ({
                    ...prev,
                    referralSource: event.target.value as ProfileInfo["referralSource"],
                  }));
                  setSaveMessage(null);
                }}
                className="w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
              >
                <option value="">Seç</option>
                {referralOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4 space-y-1">
            <label className="text-[11px] text-muted">Beklentin</label>
            <textarea
              value={profile.expectation}
              onChange={(event) => {
                setProfile((prev) => ({ ...prev, expectation: event.target.value }));
                setSaveMessage(null);
              }}
              className="min-h-[90px] w-full rounded-xl border border-amber-100 bg-white px-3 py-2 text-sm"
              placeholder="Kısa not (opsiyonel)..."
            />
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={async () => {
                setIsSaving(true);
                setSaveMessage(null);
                if (isRemote) {
                  try {
                    const res = await fetch("/api/v1/profile", {
                      method: "PUT",
                      headers: { "Content-Type": "application/json" },
                      credentials: "include",
                      body: JSON.stringify(profile),
                    });
                    if (res.ok) {
                      const data = (await res.json()) as ProfileInfo;
                      setProfile(data);
                      setSaveMessage("Profil kaydedildi.");
                    } else {
                      setSaveMessage("Profil kaydedilemedi.");
                    }
                  } catch {
                    setSaveMessage("Profil kaydedilemedi.");
                  } finally {
                    setIsSaving(false);
                  }
                  return;
                }
                saveProfile(profile);
                setSaveMessage("Profil kaydedildi.");
                setIsSaving(false);
              }}
              className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-strong"
            >
              {isSaving ? "Kaydediliyor..." : "Kaydet"}
            </button>
            {saveMessage && <span className="text-xs text-muted">{saveMessage}</span>}
          </div>
        </Card>

        <Card className="space-y-4">
          <div>
            <p className="text-sm font-semibold">Genel İstatistikler</p>
            <p className="text-xs text-muted">Tüm kayıtların özet görünümü.</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">Toplam kayıt</p>
              <p className="mt-1 text-lg font-semibold text-ink">{formatNumber(stats.totalEntries)}</p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">Takip edilen gün</p>
              <p className="mt-1 text-lg font-semibold text-ink">{formatNumber(stats.daysCount)}</p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">Günlük ort. kalori</p>
              <p className="mt-1 text-lg font-semibold text-ink">
                {formatNumber(stats.daysCount ? stats.totalCaloriesIn / stats.daysCount : 0)} kcal
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">Günlük ort. su</p>
              <p className="mt-1 text-lg font-semibold text-ink">
                {formatNumber(stats.daysCount ? stats.totalWater / stats.daysCount : 0)} ml
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">Aktivite kalorisi</p>
              <p className="mt-1 text-lg font-semibold text-ink">
                {formatNumber(stats.totalCaloriesOut)} kcal
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">Öğün hedefi oranı</p>
              <p className="mt-1 text-lg font-semibold text-ink">%{mealRate}</p>
            </div>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-xs text-amber-900">
            En uzun seri: {stats.longestStreak} gün • Mevcut seri: {stats.currentStreak} gün
          </div>
          <div className="rounded-2xl border border-amber-100 bg-white px-4 py-3 text-xs text-muted">
            Su serisi: {stats.currentWaterStreak} gün • Aktivite serisi:{" "}
            {stats.currentActivityStreak} gün • Öğün serisi: {stats.currentMealStreak} gün
          </div>
        </Card>
      </section>

      <Card className="space-y-4">
        <div>
          <p className="text-sm font-semibold">Rozetler</p>
          <p className="text-xs text-muted">
            Seri, su, aktivite ve öğün disiplini hedeflerine göre rozetler açılır.
          </p>
        </div>
        {entries.length === 0 && (
          <div className="rounded-2xl border border-dashed border-amber-100 bg-amber-50/60 px-4 py-4 text-xs text-muted">
            İlk kayıtlarını eklediğinde rozetler görünür.
          </div>
        )}
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted">Seri Rozetleri</p>
            {streakBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                progress={badgeProgress.streak}
              />
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted">Öğün Rozetleri</p>
            {mealBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} progress={badgeProgress.meal} />
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted">Su Rozetleri</p>
            {waterBadges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} progress={badgeProgress.water} />
            ))}
          </div>
          <div className="space-y-3">
            <p className="text-xs font-semibold text-muted">Aktivite Rozetleri</p>
            {activityBadges.map((badge) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                progress={badgeProgress.activity}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

function BadgeCard({ badge, progress }: { badge: BadgeDefinition; progress: number }) {
  const achieved = progress >= badge.threshold;
  const clamped = Math.min(progress, badge.threshold);
  const percent = Math.min((progress / badge.threshold) * 100, 100);

  return (
    <div
      className={`rounded-2xl border px-4 py-3 transition ${
        achieved
          ? "border-amber-200 bg-white"
          : "border-amber-100/70 bg-white/70"
      }`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${badge.tone} text-xs font-semibold ${badge.accent}`}
        >
          {badge.label}
        </div>
        <div className="flex-1 space-y-2">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-ink">{badge.title}</p>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] ${
                achieved
                  ? "bg-amber-100 text-amber-700"
                  : "bg-amber-50 text-muted"
              }`}
            >
              {achieved ? "Açıldı" : "Kilitli"}
            </span>
          </div>
          <p className="text-xs text-muted">{badge.description}</p>
          <div className="h-1.5 rounded-full bg-amber-100">
            <div className="h-1.5 rounded-full bg-accent" style={{ width: `${percent}%` }} />
          </div>
          <div className="text-[10px] text-muted">
            {clamped}/{badge.threshold} gün
          </div>
        </div>
      </div>
    </div>
  );
}
