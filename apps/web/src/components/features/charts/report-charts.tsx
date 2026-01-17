"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { DailySummary } from "@/lib/core/types";
import { formatShortDate } from "@/lib/core/utils";
import { Card } from "@/components/ui/card";
import { t } from "@/lib/core/i18n";

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
  const macroTotals = summary.reduce(
    (acc, day) => ({
      proteinG: acc.proteinG + day.proteinG,
      carbsG: acc.carbsG + day.carbsG,
      fatG: acc.fatG + day.fatG,
    }),
    { proteinG: 0, carbsG: 0, fatG: 0 }
  );
  const macroTotalValue = macroTotals.proteinG + macroTotals.carbsG + macroTotals.fatG;
  const macroData = [
    { name: t("Protein"), value: macroTotals.proteinG, color: "#10b981" },
    { name: t("Karbonhidrat"), value: macroTotals.carbsG, color: "#34d399" },
    { name: t("Yağ"), value: macroTotals.fatG, color: "#a3e635" },
  ].filter((item) => item.value > 0);

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
        <div className="h-52 w-full">
          {isEmpty || macroTotalValue === 0 ? (
            <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-emerald-100 bg-emerald-50/60 text-xs text-muted">
              {t("Makro verisi oluştuğunda burada görünecek.")}
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  contentStyle={{
                    background: "rgba(255,255,255,0.95)",
                    borderRadius: "12px",
                    border: "1px solid #a7f3d0",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [`${value} g`, t("Makro")]}
                />
                <Pie
                  data={macroData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={55}
                  outerRadius={90}
                  paddingAngle={4}
                  stroke="transparent"
                >
                  {macroData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
        {!isEmpty && macroTotalValue > 0 && (
          <div className="mt-2 flex flex-wrap justify-center gap-3 text-[11px] text-muted">
            {macroData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                <span className="font-semibold text-ink">
                  {item.name}: {Math.round(item.value)}g
                </span>
              </div>
            ))}
          </div>
        )}
        <p className="mt-3 text-[11px] text-muted">
          {t("Makro dengesini haftalık ritimle izleyin.")}
        </p>
      </Card>
      </div>
    </div>
  );
}
