"use client";

import { Card } from "@/components/card";
import { useTracker } from "@/components/tracker-provider";
import { ActivityType, MealType } from "@/lib/types";
import { formatShortDate, getDayKey } from "@/lib/utils";

const mealLabels: Record<MealType, string> = {
  breakfast: "Kahvaltı",
  lunch: "Öğle",
  dinner: "Akşam",
  snack: "Atıştırmalık",
};

const activityLabels: Record<ActivityType, string> = {
  walking: "Yürümek",
  running: "Koşu",
  gym: "Salon",
};

export default function HistoryPage() {
  const { entries, removeEntry } = useTracker();
  const groups = entries.reduce<Record<string, typeof entries>>((acc, entry) => {
    const dayKey = getDayKey(entry.timestamp);
    acc[dayKey] = acc[dayKey] ? [...acc[dayKey], entry] : [entry];
    return acc;
  }, {});

  const dayKeys = Object.keys(groups).sort((a, b) => b.localeCompare(a));

  return (
    <div className="space-y-6">
      <Card>
        <p className="text-sm font-semibold">Geçmiş Kayıtlar</p>
        <p className="text-xs text-muted">Düzenlemek için kaydı silebilirsiniz.</p>
      </Card>

      {dayKeys.length === 0 && (
        <Card className="text-center text-sm text-muted">
          Henüz kayıt yok. İlk girişinizi ekleyin.
        </Card>
      )}

      {dayKeys.map((day) => (
        <Card key={day} className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">{formatShortDate(day)}</p>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-[11px] text-muted">
              {groups[day].length} kayıt
            </span>
          </div>
          <div className="space-y-2">
            {groups[day].map((entry) => (
              <div
                key={entry.id}
                className="flex flex-col gap-1 rounded-2xl border border-amber-100 bg-white px-3 py-2 text-xs sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  {entry.type === "food" && (
                    <div>
                      <p className="text-sm font-semibold text-ink">{entry.name}</p>
                      <p className="text-xs text-muted">
                        {mealLabels[entry.mealType]} • {entry.calories} kcal
                      </p>
                    </div>
                  )}
                  {entry.type === "water" && (
                    <div>
                      <p className="text-sm font-semibold text-ink">Su</p>
                      <p className="text-xs text-muted">{entry.amountMl} ml</p>
                    </div>
                  )}
                  {entry.type === "activity" && (
                    <div>
                      <p className="text-sm font-semibold text-ink">
                        {activityLabels[entry.activityType]}
                      </p>
                      <p className="text-xs text-muted">
                        {entry.durationMin} dk • {entry.estimatedCalories} kcal (tahmini)
                      </p>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => removeEntry(entry.id)}
                  className="mt-2 rounded-full border border-amber-100 px-3 py-1 text-[11px] text-muted hover:text-ink sm:mt-0"
                >
                  Sil
                </button>
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  );
}
