import { MeasurementEntry, MeasurementType } from "@/lib/core/types";
import { t } from "@/lib/core/i18n";

const MEASUREMENTS_KEY = "calai.measurements.v1";

export const measurementLabels: Record<MeasurementType, string> = {
  weight: t("Kilo"),
  waist: t("Bel"),
  hip: t("Kalça"),
  chest: t("Göğüs"),
  bodyFat: t("Vücut Yağ %"),
};

export const measurementUnits: Record<MeasurementType, string> = {
  weight: "kg",
  waist: "cm",
  hip: "cm",
  chest: "cm",
  bodyFat: "%",
};

function isValidType(value: unknown): value is MeasurementType {
  return (
    value === "weight" ||
    value === "waist" ||
    value === "hip" ||
    value === "chest" ||
    value === "bodyFat"
  );
}

export function normalizeMeasurement(
  entry: Partial<MeasurementEntry>
): MeasurementEntry | null {
  if (!entry.id || !isValidType(entry.type)) {
    return null;
  }
  const value = Number(entry.value);
  if (!Number.isFinite(value) || value <= 0) {
    return null;
  }
  const timestampDate = entry.timestamp ? new Date(entry.timestamp) : new Date();
  const timestamp = Number.isNaN(timestampDate.getTime())
    ? new Date().toISOString()
    : timestampDate.toISOString();
  const unit = entry.unit || measurementUnits[entry.type];

  return {
    id: entry.id,
    type: entry.type,
    value,
    unit,
    timestamp,
  };
}

export function loadMeasurements() {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(MEASUREMENTS_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as Partial<MeasurementEntry>[];
    return Array.isArray(parsed)
      ? parsed
          .map((entry) => normalizeMeasurement(entry))
          .filter((entry): entry is MeasurementEntry => Boolean(entry))
      : [];
  } catch {
    return [];
  }
}

export function saveMeasurements(entries: MeasurementEntry[]) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(MEASUREMENTS_KEY, JSON.stringify(entries));
}
