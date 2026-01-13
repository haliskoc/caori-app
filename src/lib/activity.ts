import { ActivityType } from "./types";
import { t } from "./i18n";

const DEFAULT_WEIGHT_KG = 70;

const activityConfig: Record<ActivityType, { label: string; met: number }> = {
  walking: { label: t("Yürüyüş"), met: 3.3 },
  running: { label: t("Koşu"), met: 8.0 },
  gym: { label: t("Ağırlık"), met: 6.0 },
  cycling: { label: t("Bisiklet"), met: 6.8 },
  swimming: { label: t("Yüzme"), met: 7.0 },
  yoga: { label: t("Yoga"), met: 2.5 },
  hiit: { label: t("HIIT"), met: 9.0 },
  pilates: { label: t("Pilates"), met: 3.0 },
  stairs: { label: t("Merdiven"), met: 8.8 },
};

export const activityLabels: Record<ActivityType, string> = Object.entries(
  activityConfig
).reduce((acc, [key, value]) => {
  acc[key as ActivityType] = value.label;
  return acc;
}, {} as Record<ActivityType, string>);

export const activityOptions = Object.entries(activityConfig).map(([key, value]) => ({
  type: key as ActivityType,
  label: value.label,
  met: value.met,
}));

export function getActivityMet(type: ActivityType) {
  return activityConfig[type]?.met ?? 3;
}

export function estimateActivityCalories(input: {
  type: ActivityType;
  durationMin: number;
  weightKg?: number | null;
  intensity?: "low" | "medium" | "high";
}) {
  const duration = Number(input.durationMin);
  const weight = Number(input.weightKg);
  if (!Number.isFinite(duration) || duration <= 0) {
    return 0;
  }
  const safeWeight = Number.isFinite(weight) && weight > 0 ? weight : DEFAULT_WEIGHT_KG;
  const intensityMultiplier =
    input.intensity === "low" ? 0.85 : input.intensity === "high" ? 1.15 : 1;
  const met = getActivityMet(input.type) * intensityMultiplier;
  const hours = duration / 60;
  return Math.round(met * safeWeight * hours);
}
