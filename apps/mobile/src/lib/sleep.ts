import type { SleepEntry, SleepQuality } from "@calai/shared/types";
import { createId } from "@/lib/id";
import { t } from "@/lib/i18n";

export const SLEEP_QUALITIES: SleepQuality[] = ["poor", "fair", "good", "excellent"];

export const sleepQualityLabelKeys: Record<SleepQuality, string> = {
  poor: "Kötü",
  fair: "Orta",
  good: "İyi",
  excellent: "Mükemmel",
};

export const sleepQualityEmojis: Record<SleepQuality, string> = {
  poor: "😫",
  fair: "😐",
  good: "😊",
  excellent: "😴",
};

export function normalizeSleepEntry(entry: Partial<SleepEntry>): SleepEntry | null {
  if (!entry.sleepStart || !entry.sleepEnd) {
    return null;
  }

  const sleepStart = new Date(entry.sleepStart);
  const sleepEnd = new Date(entry.sleepEnd);

  if (isNaN(sleepStart.getTime()) || isNaN(sleepEnd.getTime())) {
    return null;
  }

  const durationMs = sleepEnd.getTime() - sleepStart.getTime();
  const durationMin = Math.round(durationMs / 60000);

  if (durationMin <= 0) {
    return null;
  }

  return {
    id: entry.id || createId("sleep"),
    type: "sleep",
    sleepStart: sleepStart.toISOString(),
    sleepEnd: sleepEnd.toISOString(),
    durationMin: entry.durationMin ?? durationMin,
    quality: SLEEP_QUALITIES.includes(entry.quality as SleepQuality)
      ? (entry.quality as SleepQuality)
      : "good",
    note: entry.note?.trim() || undefined,
    timestamp: entry.timestamp || new Date().toISOString(),
  };
}

export function formatDuration(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) {
    return t("{value} dk", { value: mins });
  }
  if (mins === 0) {
    return t("{value} saat", { value: hours });
  }
  return t("{hours} saat {minutes} dk", { hours, minutes: mins });
}

export function getSleepQualityLabel(quality: SleepQuality) {
  return t(sleepQualityLabelKeys[quality]);
}

export function formatSleepTime(isoString: string, locale = "tr-TR"): string {
  const date = new Date(isoString);
  return date.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatSleepDate(isoString: string, locale = "tr-TR"): string {
  const date = new Date(isoString);
  return date.toLocaleDateString(locale, {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function calculateSleepScore(
  quality: SleepQuality,
  durationMin: number,
  goalHours: number
): number {
  const qualityScore: Record<SleepQuality, number> = {
    poor: 25,
    fair: 50,
    good: 75,
    excellent: 100,
  };

  const durationHours = durationMin / 60;
  const durationScore = Math.min(100, (durationHours / goalHours) * 100);

  return Math.round((qualityScore[quality] + durationScore) / 2);
}

export function getSleepInsight(
  durationMin: number,
  goalHours: number
): { message: string; tone: "positive" | "neutral" | "warning" } {
  const durationHours = durationMin / 60;
  const diff = durationHours - goalHours;

  if (diff >= 0.5) {
    return {
      message: `Bugün ${diff.toFixed(1)} saat fazla uyudunuz. Harikaydı! 🌟`,
      tone: "positive",
    };
  }
  if (diff >= -0.5) {
    return {
      message: "Uyku hedefinize ulaştınız! İyi dinlenmiş görünüyorsunuz. 😊",
      tone: "positive",
    };
  }
  if (diff >= -2) {
    return {
      message: `Bugün ${Math.abs(diff).toFixed(1)} saat eksik uyudunuz. Biraz daha dinlenmeye bakın.`,
      tone: "neutral",
    };
  }
  return {
    message: `Uyku eksikliğiniz kritik seviyede! ${Math.abs(diff).toFixed(1)} saat eksik.`,
    tone: "warning",
  };
}
