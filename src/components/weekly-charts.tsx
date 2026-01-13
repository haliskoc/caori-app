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
        className="min-h-[260px] border-emerald-50 bg-white/50 backdrop-blur-sm"
        data-report-chart
        data-chart-title={t("Haftalık Kalori Dengesi")}
      >
        <div className="mb-3">
          <p className="text-sm font-black text-gray-900">{t("Haftalık Kalori Dengesi")}</p>
          <p className="text-xs text-muted font-bold">{t("Girilen ve tahmini yakılan kalori")}</p>
        </div>
        <div className="h-40 w-full">
          {isEmpty ? (
            <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/30 text-xs font-bold text-emerald-600">
              {t("Henüz veri yok. İlk kayıtlar grafiği dolduracak.")}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }} width={36} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ stroke: "#10b981", strokeWidth: 2 }}
                  contentStyle={{
                    background: "rgba(255,255,255,0.9)",
                    borderRadius: "16px",
                    border: "1px solid #10b98120",
                    fontSize: "12px",
                    fontWeight: "700",
                    boxShadow: "0 10px 15px -3px rgba(16,185,129,0.1)",
                    backdropFilter: "blur(8px)"
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="caloriesIn"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.15}
                  strokeWidth={3}
                />
                <Area
                  type="monotone"
                  dataKey="caloriesOut"
                  stroke="#0f172a"
                  fill="#0f172a"
                  fillOpacity={0.1}
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>

      <Card
        className="min-h-[260px] border-emerald-50 bg-white/50 backdrop-blur-sm"
        data-report-chart
        data-chart-title={t("Haftalık Su Alımı")}
      >
        <div className="mb-3">
          <p className="text-sm font-black text-gray-900">{t("Haftalık Su Alımı")}</p>
          <p className="text-xs text-muted font-bold">{t("Hedefe yaklaşma")}</p>
        </div>
        <div className="h-40 w-full">
          {isEmpty ? (
            <div className="flex h-full items-center justify-center rounded-3xl border border-dashed border-emerald-200 bg-emerald-50/30 text-xs font-bold text-emerald-600">
              {t("Su takibi başladığında burada görünecek.")}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 700 }} width={36} axisLine={false} tickLine={false} />
                <Tooltip
                  cursor={{ fill: "rgba(16,185,129,0.05)" }}
                  contentStyle={{
                    background: "rgba(255,255,255,0.9)",
                    borderRadius: "16px",
                    border: "1px solid #10b98120",
                    fontSize: "12px",
                    fontWeight: "700",
                    boxShadow: "0 10px 15px -3px rgba(16,185,129,0.1)",
                    backdropFilter: "blur(8px)"
                  }}
                />
                <Bar dataKey="waterMl" fill="#10b981" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>
    </div>
  );
}
