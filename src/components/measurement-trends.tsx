"use client";

import { useMemo, useState } from "react";
import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { MeasurementEntry, MeasurementType } from "@/lib/types";
import { Card } from "@/components/card";
import { formatShortDate, getDayKey } from "@/lib/utils";
import { measurementLabels, measurementUnits } from "@/lib/measurements";
import { t } from "@/lib/i18n";

type MeasurementTrendsProps = {
  measurements: MeasurementEntry[];
  rangeDays: number;
};

export function MeasurementTrends({ measurements, rangeDays }: MeasurementTrendsProps) {
  const availableTypes = useMemo(() => {
    const set = new Set<MeasurementType>();
    for (const entry of measurements) {
      set.add(entry.type);
    }
    return Array.from(set);
  }, [measurements]);

  const [selectedType, setSelectedType] = useState<MeasurementType>("weight");
  const activeType =
    availableTypes.includes(selectedType) ? selectedType : availableTypes[0] ?? "weight";
  const chartTitle =
    measurements.length > 0
      ? `${t("Kilo & Ölçüm Trendleri")} • ${measurementLabels[activeType]}`
      : t("Kilo & Ölçüm Trendleri");

  const data = useMemo(() => {
    const cutoff = new Date();
    cutoff.setHours(0, 0, 0, 0);
    cutoff.setDate(cutoff.getDate() - rangeDays + 1);
    const sorted = [...measurements]
      .filter((entry) => entry.type === activeType)
      .filter((entry) => new Date(entry.timestamp) >= cutoff)
      .sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
    const dailyMap = new Map<string, MeasurementEntry>();
    for (const entry of sorted) {
      const key = getDayKey(entry.timestamp);
      dailyMap.set(key, entry);
    }
    return Array.from(dailyMap.entries()).map(([date, entry]) => ({
      name: formatShortDate(date),
      value: entry.value,
    }));
  }, [activeType, measurements, rangeDays]);

  if (measurements.length === 0) {
    return (
    <Card className="min-h-[240px]" data-report-chart data-chart-title={chartTitle}>
        <div className="mb-3">
          <p className="text-sm font-semibold">{t("Kilo & Ölçüm Trendleri")}</p>
          <p className="text-xs text-muted">{t("Ölçüm eklediğinizde çizgi oluşur.")}</p>
        </div>
        <div className="flex h-40 items-center justify-center rounded-2xl border border-dashed border-emerald-100 bg-emerald-50/60 text-xs text-muted">
          {t("Henüz ölçüm yok. Profil sayfasından ekleyin.")}
        </div>
      </Card>
    );
  }

  return (
    <Card className="min-h-[260px]" data-report-chart data-chart-title={chartTitle}>
      <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold">{t("Kilo & Ölçüm Trendleri")}</p>
          <p className="text-xs text-muted">{t("Son {value} gün", { value: rangeDays })}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {availableTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
                activeType === type
                  ? "bg-emerald-600 text-white"
                  : "border border-emerald-100 bg-white text-emerald-700"
              }`}
            >
              {measurementLabels[type]}
            </button>
          ))}
        </div>
      </div>
      <div className="h-44 w-full">
        {data.length === 0 ? (
          <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-emerald-100 bg-emerald-50/60 text-xs text-muted">
            {t("Seçilen ölçüm için veri yok.")}
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#dcfce7" />
              <XAxis dataKey="name" tick={{ fill: "#4b5563", fontSize: 11 }} />
              <YAxis tick={{ fill: "#4b5563", fontSize: 11 }} width={36} />
              <Tooltip
                cursor={{ stroke: "#6ee7b7", strokeWidth: 1 }}
                contentStyle={{
                  background: "rgba(255,255,255,0.95)",
                  borderRadius: "12px",
                  border: "1px solid #a7f3d0",
                  fontSize: "12px",
                }}
                formatter={(value) => {
                  const safeValue = typeof value === "number" ? value : Number(value ?? 0);
                  return [
                    `${safeValue} ${measurementUnits[activeType]}`,
                    measurementLabels[activeType],
                  ];
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ r: 3, fill: "#10b981" }}
                activeDot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
      <p className="mt-3 text-[11px] text-muted">
        {t("Ölçümleri düzenli girerek trendi netleştir.")}
      </p>
    </Card>
  );
}
