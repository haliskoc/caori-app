"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DailySummary } from "@/lib/types";
import { formatShortDate } from "@/lib/utils";
import { Card } from "@/components/card";
import { t } from "@/lib/i18n";

type ReportChartsProps = {
  summary: DailySummary[];
  hasEntries?: boolean;
};

export function ReportCharts({ summary, hasEntries = true }: ReportChartsProps) {
  const data = summary.map((day) => ({
    name: formatShortDate(day.date),
    caloriesIn: day.caloriesIn,
    caloriesOut: day.caloriesOut,
    waterMl: day.waterMl,
    activityMin: day.activityMin,
    mealCount: day.mealCount,
    proteinG: day.proteinG,
    carbsG: day.carbsG,
    fatG: day.fatG,
  }));

  const isEmpty =
    !hasEntries ||
    summary.every(
      (day) =>
        day.caloriesIn === 0 &&
        day.caloriesOut === 0 &&
        day.waterMl === 0 &&
        day.activityMin === 0 &&
        day.mealCount === 0 &&
        day.proteinG === 0 &&
        day.carbsG === 0 &&
        day.fatG === 0
    );

  return (
    <div className="grid gap-4 lg:grid-cols-2 print-charts">
      <div className="print-chart" data-report-chart data-chart-title={t("Kalori Dengesi")}>
        <Card className="min-h-[260px]">
        <div className="mb-3">
          <p className="text-sm font-semibold">{t("Kalori Dengesi")}</p>
          <p className="text-xs text-muted">{t("Girilen ve yakılan kalori trendi")}</p>
        </div>
        <div className="h-44 w-full">
          {isEmpty ? (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-emerald-100 bg-emerald-50/60 text-xs text-muted">
              {t("Henüz veri yok. İlk kayıtlar grafiği dolduracak.")}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
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
                />
                <Area
                  type="monotone"
                  dataKey="caloriesIn"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.18}
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="caloriesOut"
                  stroke="#14b8a6"
                  fill="#14b8a6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
        <p className="mt-3 text-[11px] text-muted">
          {t("Enerji dengesinin hareketini takip edin.")}
        </p>
      </Card>
      </div>

      <div className="print-chart" data-report-chart data-chart-title={t("Su Alımı")}>
        <Card className="min-h-[260px]">
        <div className="mb-3">
          <p className="text-sm font-semibold">{t("Su Alımı")}</p>
          <p className="text-xs text-muted">{t("Günlük su trendi")}</p>
        </div>
        <div className="h-44 w-full">
          {isEmpty ? (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-emerald-100 bg-emerald-50/60 text-xs text-muted">
              {t("Su takibi başladığında burada görünecek.")}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dcfce7" />
                <XAxis dataKey="name" tick={{ fill: "#4b5563", fontSize: 11 }} />
                <YAxis tick={{ fill: "#4b5563", fontSize: 11 }} width={36} />
                <Tooltip
                  cursor={{ fill: "rgba(16,185,129,0.12)" }}
                  contentStyle={{
                    background: "rgba(255,255,255,0.95)",
                    borderRadius: "12px",
                    border: "1px solid #a7f3d0",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="waterMl" fill="#34d399" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <p className="mt-3 text-[11px] text-muted">{t("Hedefe yaklaşan günleri vurgular.")}</p>
      </Card>
      </div>

      <div className="print-chart" data-report-chart data-chart-title={t("Aktivite Süresi")}>
        <Card className="min-h-[260px]">
        <div className="mb-3">
          <p className="text-sm font-semibold">{t("Aktivite Süresi")}</p>
          <p className="text-xs text-muted">{t("Günlük hareket dakikaları")}</p>
        </div>
        <div className="h-44 w-full">
          {isEmpty ? (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-emerald-100 bg-emerald-50/60 text-xs text-muted">
              {t("Aktivite kayıtları başladığında burada görünecek.")}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
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
                />
                <Area
                  type="monotone"
                  dataKey="activityMin"
                  stroke="#16a34a"
                  fill="#16a34a"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
        <p className="mt-3 text-[11px] text-muted">{t("Aktivite temposunu görselleştirir.")}</p>
      </Card>
      </div>

      <div className="print-chart" data-report-chart data-chart-title={t("Öğün Sayısı")}>
        <Card className="min-h-[260px]">
        <div className="mb-3">
          <p className="text-sm font-semibold">{t("Öğün Sayısı")}</p>
          <p className="text-xs text-muted">{t("Günlük öğün ritmi")}</p>
        </div>
        <div className="h-44 w-full">
          {isEmpty ? (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-emerald-100 bg-emerald-50/60 text-xs text-muted">
              {t("Öğün kayıtları başladığında burada görünecek.")}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dcfce7" />
                <XAxis dataKey="name" tick={{ fill: "#4b5563", fontSize: 11 }} />
                <YAxis tick={{ fill: "#4b5563", fontSize: 11 }} width={36} />
                <Tooltip
                  cursor={{ fill: "rgba(16,185,129,0.12)" }}
                  contentStyle={{
                    background: "rgba(255,255,255,0.95)",
                    borderRadius: "12px",
                    border: "1px solid #a7f3d0",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="mealCount" fill="#84cc16" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <p className="mt-3 text-[11px] text-muted">{t("Öğün düzenini gün gün izleyin.")}</p>
      </Card>
      </div>

      <div
        className="print-chart lg:col-span-2"
        data-report-chart
        data-chart-title={t("Makro Dağılımı")}
      >
        <Card className="min-h-[260px] lg:col-span-2">
        <div className="mb-3">
          <p className="text-sm font-semibold">{t("Makro Dağılımı")}</p>
          <p className="text-xs text-muted">{t("Protein / Karbonhidrat / Yağ")}</p>
        </div>
        <div className="h-48 w-full">
          {isEmpty ? (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-emerald-100 bg-emerald-50/60 text-xs text-muted">
              {t("Makro verisi oluştuğunda burada görünecek.")}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#dcfce7" />
                <XAxis dataKey="name" tick={{ fill: "#4b5563", fontSize: 11 }} />
                <YAxis tick={{ fill: "#4b5563", fontSize: 11 }} width={36} />
                <Tooltip
                  cursor={{ fill: "rgba(16,185,129,0.12)" }}
                  contentStyle={{
                    background: "rgba(255,255,255,0.95)",
                    borderRadius: "12px",
                    border: "1px solid #a7f3d0",
                    fontSize: "12px",
                  }}
                />
                <Legend
                  wrapperStyle={{ fontSize: "11px" }}
                  iconType="circle"
                  formatter={(value) =>
                    value === "proteinG"
                      ? t("Protein")
                      : value === "carbsG"
                        ? t("Karbonhidrat")
                        : t("Yağ")
                  }
                />
                <Bar dataKey="proteinG" stackId="macro" fill="#10b981" />
                <Bar dataKey="carbsG" stackId="macro" fill="#34d399" />
                <Bar dataKey="fatG" stackId="macro" fill="#a3e635" />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
        <p className="mt-3 text-[11px] text-muted">
          {t("Makro dengesini haftalık ritimle izleyin.")}
        </p>
      </Card>
      </div>
    </div>
  );
}
