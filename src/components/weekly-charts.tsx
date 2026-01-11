"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { WeeklySummary } from "@/lib/types";
import { formatShortDate } from "@/lib/utils";
import { Card } from "@/components/card";
import { t } from "@/lib/i18n";

type WeeklyChartsProps = {
  summary: WeeklySummary;
  hasEntries?: boolean;
};

export function WeeklyCharts({ summary, hasEntries = true }: WeeklyChartsProps) {
  const data = summary.map((day) => ({
    name: formatShortDate(day.date),
    caloriesIn: day.caloriesIn,
    caloriesOut: day.caloriesOut,
    waterMl: day.waterMl,
  }));
  const isEmpty =
    !hasEntries ||
    summary.every((day) => day.caloriesIn === 0 && day.caloriesOut === 0 && day.waterMl === 0);

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Card
        className="min-h-[260px]"
        data-report-chart
        data-chart-title={t("Haftalık Kalori Dengesi")}
      >
        <div className="mb-3">
          <p className="text-sm font-semibold">{t("Haftalık Kalori Dengesi")}</p>
          <p className="text-xs text-muted">{t("Girilen ve tahmini yakılan kalori")}</p>
        </div>
        <div className="h-40 w-full">
          {isEmpty ? (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-amber-100 bg-amber-50/60 text-xs text-muted">
              {t("Henüz veri yok. İlk kayıtlar grafiği dolduracak.")}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e3d4" />
                <XAxis dataKey="name" tick={{ fill: "#6f5f52", fontSize: 11 }} />
                <YAxis tick={{ fill: "#6f5f52", fontSize: 11 }} width={36} />
                <Tooltip
                  cursor={{ stroke: "#ffb56b", strokeWidth: 1 }}
                  contentStyle={{
                    background: "rgba(255,255,255,0.95)",
                    borderRadius: "12px",
                    border: "1px solid #f4d8bd",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="caloriesIn"
                  stroke="#ff7a00"
                  fill="#ff7a00"
                  fillOpacity={0.15}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="caloriesOut"
                  stroke="#ffb56b"
                  fill="#ffb56b"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>

      <Card
        className="min-h-[260px]"
        data-report-chart
        data-chart-title={t("Haftalık Su Alımı")}
      >
        <div className="mb-3">
          <p className="text-sm font-semibold">{t("Haftalık Su Alımı")}</p>
          <p className="text-xs text-muted">{t("Hedefe yaklaşma")}</p>
        </div>
        <div className="h-40 w-full">
          {isEmpty ? (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-amber-100 bg-amber-50/60 text-xs text-muted">
              {t("Su takibi başladığında burada görünecek.")}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f3e3d4" />
                <XAxis dataKey="name" tick={{ fill: "#6f5f52", fontSize: 11 }} />
                <YAxis tick={{ fill: "#6f5f52", fontSize: 11 }} width={36} />
                <Tooltip
                  cursor={{ fill: "rgba(255,122,0,0.12)" }}
                  contentStyle={{
                    background: "rgba(255,255,255,0.95)",
                    borderRadius: "12px",
                    border: "1px solid #f4d8bd",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="waterMl" fill="#ff7a00" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
    </div>
  );
}
