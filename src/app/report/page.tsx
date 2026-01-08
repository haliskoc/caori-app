"use client";

import { useEffect, useMemo, useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { Card } from "@/components/card";
import { ReportCharts } from "@/components/report-charts";
import { useTracker } from "@/components/tracker-provider";
import { buildReportData, type ReportData } from "@/lib/report";
import { formatShortDate } from "@/lib/utils";
import { ActivityType } from "@/lib/types";
import { defaultProfile, loadProfile, type ProfileInfo } from "@/lib/profile";

const activityLabels: Record<ActivityType, string> = {
  walking: "Yürümek",
  running: "Koşu",
  gym: "Salon",
};

export default function ReportPage() {
  const { user } = useUser();
  const { entries, goals, dataMode } = useTracker();
  const [rangeDays, setRangeDays] = useState(30);
  const [remoteReport, setRemoteReport] = useState<ReportData | null>(null);
  const [profile, setProfile] = useState<ProfileInfo>(() => loadProfile());
  const [activeSection, setActiveSection] = useState<
    "overview" | "weekly" | "trends" | "insights" | "details"
  >("overview");

  const localReport = useMemo(
    () => buildReportData(entries, rangeDays, goals),
    [entries, rangeDays, goals]
  );

  useEffect(() => {
    setRemoteReport(null);
    if (dataMode !== "remote") {
      return;
    }
    let active = true;
    fetch(`/api/v1/report?range=${rangeDays}`, { credentials: "include" })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (active && data) {
          setRemoteReport(data as ReportData);
        }
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, [dataMode, rangeDays]);

  useEffect(() => {
    if (dataMode !== "remote") {
      setProfile(loadProfile());
      return;
    }
    let active = true;
    fetch("/api/v1/profile", { credentials: "include", cache: "no-store" })
      .then((res) => (res.ok ? res.json() : defaultProfile))
      .then((data) => {
        if (active) {
          setProfile(data as ProfileInfo);
        }
      })
      .catch(() => {
        if (active) {
          setProfile(defaultProfile);
        }
      });
    return () => {
      active = false;
    };
  }, [dataMode]);

  const report = remoteReport ?? localReport;
  const name = user?.name ?? user?.email ?? "Kullanıcı";
  const rangeLabel = `Son ${report.rangeDays} gün`;
  const calorieGoal = report.goals?.calorieGoal;
  const waterGoalMl = report.goals?.waterGoalMl;
  const activityGoalMin = report.goals?.activityGoalMin;
  const mealGoalCount = report.goals?.mealGoalCount;
  const weightGoalKg = report.goals?.weightGoalKg;
  const safeCalorieGoal =
    typeof calorieGoal === "number" && calorieGoal > 0 ? calorieGoal : null;
  const safeWaterGoalMl =
    typeof waterGoalMl === "number" && waterGoalMl > 0 ? waterGoalMl : null;
  const safeActivityGoalMin =
    typeof activityGoalMin === "number" && activityGoalMin > 0 ? activityGoalMin : null;
  const safeMealGoalCount =
    typeof mealGoalCount === "number" && mealGoalCount > 0 ? mealGoalCount : null;
  const safeWeightGoalKg =
    typeof weightGoalKg === "number" && weightGoalKg > 0 ? weightGoalKg : null;
  const hasGoals =
    safeCalorieGoal !== null ||
    safeWaterGoalMl !== null ||
    safeActivityGoalMin !== null ||
    safeMealGoalCount !== null;
  const caloriePercent =
    safeCalorieGoal !== null
      ? Math.round((report.averages.caloriesIn / safeCalorieGoal) * 100)
      : null;
  const waterPercent =
    safeWaterGoalMl !== null
      ? Math.round((report.averages.waterMl / safeWaterGoalMl) * 100)
      : null;
  const activityPercent =
    safeActivityGoalMin !== null
      ? Math.round((report.averages.activityMin / safeActivityGoalMin) * 100)
      : null;
  const mealPercent =
    safeMealGoalCount !== null
      ? Math.round((report.averages.mealCount / safeMealGoalCount) * 100)
      : null;
  const calorieDelta =
    safeCalorieGoal !== null ? report.averages.caloriesIn - safeCalorieGoal : null;
  const waterDelta =
    safeWaterGoalMl !== null ? report.averages.waterMl - safeWaterGoalMl : null;
  const activityDelta =
    safeActivityGoalMin !== null ? report.averages.activityMin - safeActivityGoalMin : null;
  const mealDelta =
    safeMealGoalCount !== null ? report.averages.mealCount - safeMealGoalCount : null;
  const currentWeightKg = Number(profile.weightKg);
  const safeCurrentWeight =
    Number.isFinite(currentWeightKg) && currentWeightKg > 0 ? currentWeightKg : null;
  const weightDelta =
    safeWeightGoalKg !== null && safeCurrentWeight !== null
      ? Math.round((safeCurrentWeight - safeWeightGoalKg) * 10) / 10
      : null;
  const numberFormat = useMemo(() => new Intl.NumberFormat("tr-TR"), []);
  const formatNumber = (value: number) => numberFormat.format(Math.round(value));
  const sections = [
    { key: "overview", label: "Özet" },
    { key: "weekly", label: "Sapma" },
    { key: "trends", label: "Trendler" },
    { key: "insights", label: "Öne çıkanlar" },
    { key: "details", label: "Detaylar" },
  ] as const;
  const sectionClass = (key: (typeof sections)[number]["key"]) =>
    `${activeSection === key ? "block" : "hidden"} sm:block print:block space-y-6`;
  const formatDelta = (value: number | null, unit: string) => {
    if (value === null) return "-";
    const sign = value > 0 ? "+" : value < 0 ? "-" : "";
    return `${sign}${formatNumber(Math.abs(value))} ${unit}`.trim();
  };

  const handleExcelExport = async () => {
    if (typeof document === "undefined") {
      return;
    }

    const escapeHtml = (value: string) =>
      value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");

    const svgToPngDataUrl = async (svg: SVGSVGElement) => {
      const serializer = new XMLSerializer();
      const svgText = serializer.serializeToString(svg);
      const svgBlob = new Blob([svgText], { type: "image/svg+xml;charset=utf-8" });
      const url = URL.createObjectURL(svgBlob);
      return await new Promise<string>((resolve) => {
        const img = new Image();
        img.onload = () => {
          const width = svg.viewBox?.baseVal?.width || svg.clientWidth || 600;
          const height = svg.viewBox?.baseVal?.height || svg.clientHeight || 300;
          const canvas = document.createElement("canvas");
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          if (ctx) {
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, width, height);
            ctx.drawImage(img, 0, 0, width, height);
            resolve(canvas.toDataURL("image/png"));
          } else {
            resolve("");
          }
          URL.revokeObjectURL(url);
        };
        img.onerror = () => {
          URL.revokeObjectURL(url);
          resolve("");
        };
        img.src = url;
      });
    };

    const chartBlocks = Array.from(document.querySelectorAll("[data-report-chart]"));
    const charts = await Promise.all(
      chartBlocks.map(async (block) => {
        const title = block.getAttribute("data-chart-title") ?? "Grafik";
        const svg = block.querySelector("svg");
        if (!svg) {
          return { title, dataUrl: "" };
        }
        const dataUrl = await svgToPngDataUrl(svg);
        return { title, dataUrl };
      })
    );

    const chartHtml = charts
      .map((chart) => {
        if (!chart.dataUrl) return "";
        return `
          <div class="chart">
            <h3>${escapeHtml(chart.title)}</h3>
            <img src="${chart.dataUrl}" alt="${escapeHtml(chart.title)}" />
          </div>
        `;
      })
      .join("");

    const weeklyRows = report.weekly
      .map(
        (week) => `
          <tr>
            <td>${escapeHtml(formatShortDate(week.weekStart))} - ${escapeHtml(
              formatShortDate(week.weekEnd)
            )}</td>
            <td>%${week.adherenceScore}</td>
            <td>${formatDelta(week.deltas.caloriesIn, "kcal")}</td>
            <td>${formatDelta(week.deltas.waterMl, "ml")}</td>
            <td>${formatDelta(week.deltas.activityMin, "dk")}</td>
            <td>${formatDelta(week.deltas.mealCount, "öğün")}</td>
          </tr>
        `
      )
      .join("");

    const dailyRows = report.daily
      .map(
        (day) => `
          <tr>
            <td>${escapeHtml(formatShortDate(day.date))}</td>
            <td>${formatNumber(day.caloriesIn)}</td>
            <td>${formatNumber(day.caloriesOut)}</td>
            <td>${formatNumber(day.waterMl)}</td>
            <td>${formatNumber(day.activityMin)}</td>
            <td>${formatNumber(day.mealCount)}</td>
            <td>${formatNumber(day.proteinG)}</td>
            <td>${formatNumber(day.carbsG)}</td>
            <td>${formatNumber(day.fatG)}</td>
          </tr>
        `
      )
      .join("");

    const summaryRows = `
      <tr><td>Hedef uyum skoru</td><td>%${report.adherenceScore}</td></tr>
      <tr><td>Toplam kalori</td><td>${formatNumber(report.totals.caloriesIn)} kcal</td></tr>
      <tr><td>Net kalori</td><td>${formatNumber(report.totals.netCalories)} kcal</td></tr>
      <tr><td>Toplam su</td><td>${formatNumber(report.totals.waterMl)} ml</td></tr>
      <tr><td>Aktivite süresi</td><td>${formatNumber(report.totals.activityMin)} dk</td></tr>
      <tr><td>Öğün toplamı</td><td>${formatNumber(report.totals.mealCount)} öğün</td></tr>
    `;

    const html = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>Cal AI Rapor</title>
          <style>
            body { font-family: Arial, sans-serif; color: #2b2b2b; }
            h1 { font-size: 20px; margin-bottom: 4px; }
            h2 { margin-top: 20px; font-size: 16px; }
            h3 { font-size: 13px; margin: 12px 0 6px; }
            p { font-size: 12px; margin: 4px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 8px; }
            th, td { border: 1px solid #e0e0e0; padding: 6px; font-size: 11px; text-align: left; }
            th { background: #f7f4f0; }
            .chart img { max-width: 720px; width: 100%; height: auto; border: 1px solid #eee; }
          </style>
        </head>
        <body>
          <h1>Performans Özeti</h1>
          <p>${escapeHtml(name)} • ${escapeHtml(rangeLabel)} • ${escapeHtml(
      formatShortDate(report.startDate)
    )} - ${escapeHtml(formatShortDate(report.endDate))}</p>
          <p>${escapeHtml(report.comment)}</p>

          <h2>Özet</h2>
          <table>
            <tbody>
              ${summaryRows}
            </tbody>
          </table>

          <h2>Haftalık Sapma</h2>
          <table>
            <thead>
              <tr>
                <th>Hafta</th>
                <th>Uyum</th>
                <th>Kalori</th>
                <th>Su</th>
                <th>Aktivite</th>
                <th>Öğün</th>
              </tr>
            </thead>
            <tbody>
              ${weeklyRows}
            </tbody>
          </table>

          <h2>Grafikler</h2>
          ${chartHtml}

          <h2>Günlük Detaylar</h2>
          <table>
            <thead>
              <tr>
                <th>Gün</th>
                <th>Kalori</th>
                <th>Akt. Kalori</th>
                <th>Su</th>
                <th>Akt. Süre</th>
                <th>Öğün</th>
                <th>Protein</th>
                <th>Karbonhidrat</th>
                <th>Yağ</th>
              </tr>
            </thead>
            <tbody>
              ${dailyRows}
            </tbody>
          </table>
        </body>
      </html>`;

    const blob = new Blob([html], { type: "application/vnd.ms-excel" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `calai-rapor-${new Date().toISOString().slice(0, 10)}.xls`;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="print-page space-y-8">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">Rapor</p>
          <h1 className="text-2xl font-semibold text-ink">Performans Özeti</h1>
          <p className="text-xs text-muted">
            {name} • {rangeLabel} • {formatShortDate(report.startDate)} -{" "}
            {formatShortDate(report.endDate)}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 print-hidden">
          <select
            value={rangeDays}
            onChange={(event) => setRangeDays(Number(event.target.value))}
            className="rounded-xl border border-amber-100 bg-white px-3 py-2 text-xs"
          >
            <option value={7}>7 gün</option>
            <option value={30}>30 gün</option>
            <option value={60}>60 gün</option>
            <option value={90}>90 gün</option>
          </select>
          <button
            onClick={() => window.print()}
            className="rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-white"
          >
            PDF Olarak Kaydet
          </button>
          <button
            onClick={handleExcelExport}
            className="rounded-xl border border-amber-100 bg-white px-4 py-2 text-xs font-semibold text-amber-700"
          >
            Excel Olarak İndir
          </button>
        </div>
      </header>

      <div className="flex flex-wrap gap-2 sm:hidden print-hidden">
        {sections.map((section) => (
          <button
            key={section.key}
            onClick={() => setActiveSection(section.key)}
            className={`rounded-full px-3 py-1 text-[11px] font-semibold transition ${
              activeSection === section.key
                ? "bg-accent text-white"
                : "border border-amber-100 bg-white text-amber-700"
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      <section className={sectionClass("overview")}>
        <Card className="space-y-4">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <p className="text-sm font-semibold">Motivasyon Notu</p>
              <p className="text-sm text-muted">{report.comment}</p>
              <p className="text-xs text-muted">
                Aktif gün: {report.activeDays}/{report.rangeDays} • Toplam kayıt:{" "}
                {report.entryCount}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-amber-50/70 px-4 py-3 text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
                Hedef Uyum Skoru
              </p>
              <p className="mt-1 text-3xl font-semibold text-ink">%{report.adherenceScore}</p>
              <p className="text-[11px] text-muted">{rangeLabel}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">Toplam kalori</p>
              <p className="mt-1 text-lg font-semibold text-ink">
                {formatNumber(report.totals.caloriesIn)} kcal
              </p>
              <p className="text-[11px] text-muted">
                Net {formatNumber(report.totals.netCalories)} kcal
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">Aktivite kalorisi</p>
              <p className="mt-1 text-lg font-semibold text-ink">
                {formatNumber(report.totals.caloriesOut)} kcal
              </p>
              <p className="text-[11px] text-muted">
                Günlük ort. {formatNumber(report.averages.caloriesOut)}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">Su toplamı</p>
              <p className="mt-1 text-lg font-semibold text-ink">
                {formatNumber(report.totals.waterMl)} ml
              </p>
              <p className="text-[11px] text-muted">
                Günlük ort. {formatNumber(report.averages.waterMl)} ml
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">Aktivite süresi</p>
              <p className="mt-1 text-lg font-semibold text-ink">
                {formatNumber(report.totals.activityMin)} dk
              </p>
              <p className="text-[11px] text-muted">
                Günlük ort. {formatNumber(report.averages.activityMin)} dk
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">Öğün ritmi</p>
              <p className="mt-1 text-lg font-semibold text-ink">
                {formatNumber(report.averages.mealCount)} öğün/gün
              </p>
              <p className="text-[11px] text-muted">
                Toplam {formatNumber(report.totals.mealCount)} öğün
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">Makro toplamı</p>
              <p className="mt-1 text-lg font-semibold text-ink">
                {formatNumber(
                  report.totals.proteinG + report.totals.carbsG + report.totals.fatG
                )}{" "}
                g
              </p>
              <p className="text-[11px] text-muted">
                P {formatNumber(report.averages.proteinG)} • K{" "}
                {formatNumber(report.averages.carbsG)} • Y{" "}
                {formatNumber(report.averages.fatG)}
              </p>
            </div>
          </div>
        </Card>

        <Card className="space-y-4">
          <div>
            <p className="text-sm font-semibold">Hedeflere Yakınlık</p>
            <p className="text-xs text-muted">Ortalama değerler ile hedef karşılaştırması</p>
          </div>
          {hasGoals ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">Kalori hedefi</span>
                  {safeCalorieGoal !== null ? (
                    <span className="font-semibold text-ink">
                      {formatNumber(report.averages.caloriesIn)} /{" "}
                      {formatNumber(safeCalorieGoal)} kcal
                    </span>
                  ) : (
                    <span className="text-muted">Hedef yok</span>
                  )}
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-amber-100">
                  <div
                    className="h-full rounded-full bg-amber-600"
                    style={{ width: `${Math.min(100, caloriePercent ?? 0)}%` }}
                  />
                </div>
                <p className="text-[11px] text-muted">
                  {formatDelta(calorieDelta, "kcal")} sapma • %{caloriePercent ?? 0}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">Su hedefi</span>
                  {safeWaterGoalMl !== null ? (
                    <span className="font-semibold text-ink">
                      {formatNumber(report.averages.waterMl)} /{" "}
                      {formatNumber(safeWaterGoalMl)} ml
                    </span>
                  ) : (
                    <span className="text-muted">Hedef yok</span>
                  )}
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-amber-100">
                  <div
                    className="h-full rounded-full bg-amber-600"
                    style={{ width: `${Math.min(100, waterPercent ?? 0)}%` }}
                  />
                </div>
                <p className="text-[11px] text-muted">
                  {formatDelta(waterDelta, "ml")} sapma • %{waterPercent ?? 0}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">Aktivite hedefi</span>
                  {safeActivityGoalMin !== null ? (
                    <span className="font-semibold text-ink">
                      {formatNumber(report.averages.activityMin)} /{" "}
                      {formatNumber(safeActivityGoalMin)} dk
                    </span>
                  ) : (
                    <span className="text-muted">Hedef yok</span>
                  )}
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-amber-100">
                  <div
                    className="h-full rounded-full bg-amber-600"
                    style={{ width: `${Math.min(100, activityPercent ?? 0)}%` }}
                  />
                </div>
                <p className="text-[11px] text-muted">
                  {formatDelta(activityDelta, "dk")} sapma • %{activityPercent ?? 0}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">Öğün hedefi</span>
                  {safeMealGoalCount !== null ? (
                    <span className="font-semibold text-ink">
                      {formatNumber(report.averages.mealCount)} /{" "}
                      {formatNumber(safeMealGoalCount)} öğün
                    </span>
                  ) : (
                    <span className="text-muted">Hedef yok</span>
                  )}
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-amber-100">
                  <div
                    className="h-full rounded-full bg-amber-600"
                    style={{ width: `${Math.min(100, mealPercent ?? 0)}%` }}
                  />
                </div>
                <p className="text-[11px] text-muted">
                  {formatDelta(mealDelta, "öğün")} sapma • %{mealPercent ?? 0}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted">Hedef bilgisi henüz eklenmemiş.</p>
          )}
          {safeWeightGoalKg !== null && (
            <div className="rounded-2xl border border-amber-100 bg-amber-50/70 px-4 py-3 text-xs text-muted">
              <span>Hedef kilo: {formatNumber(safeWeightGoalKg)} kg</span>
              <span className="mx-2">•</span>
              <span>
                Mevcut:{" "}
                {safeCurrentWeight !== null ? `${formatNumber(safeCurrentWeight)} kg` : "-"}
              </span>
              <span className="mx-2">•</span>
              <span>
                Fark: {weightDelta !== null ? `${weightDelta > 0 ? "+" : ""}${weightDelta} kg` : "-"}
              </span>
            </div>
          )}
        </Card>
      </section>

      <section className={sectionClass("weekly")}>
        <Card className="space-y-3">
          <div>
            <p className="text-sm font-semibold">Haftalık Sapma Analizi</p>
            <p className="text-xs text-muted">Hedeflerden sapma ve uyum skoru</p>
          </div>
          {report.weekly.length === 0 ? (
            <p className="text-xs text-muted">Henüz haftalık veri yok.</p>
          ) : (
            <div className="space-y-2">
              {report.weekly.map((week) => (
                <div
                  key={`${week.weekStart}-${week.weekEnd}`}
                  className="rounded-2xl border border-amber-100 bg-white px-4 py-3 text-xs"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="font-semibold text-ink">
                        {formatShortDate(week.weekStart)} - {formatShortDate(week.weekEnd)}
                      </p>
                      <p className="text-[11px] text-muted">
                        {week.days} gün • Uyum %{week.adherenceScore}
                      </p>
                    </div>
                    <div className="text-[11px] text-muted">
                      Kalori {formatDelta(week.deltas.caloriesIn, "kcal")} • Su{" "}
                      {formatDelta(week.deltas.waterMl, "ml")} • Aktivite{" "}
                      {formatDelta(week.deltas.activityMin, "dk")} • Öğün{" "}
                      {formatDelta(week.deltas.mealCount, "öğün")}
                    </div>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-amber-100">
                    <div
                      className="h-2 rounded-full bg-amber-600"
                      style={{ width: `${Math.min(100, week.adherenceScore)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card className="space-y-3">
          <div>
            <p className="text-sm font-semibold">En Etkili Günler</p>
            <p className="text-xs text-muted">Hedef uyumunun en yüksek olduğu günler</p>
          </div>
          {report.effectiveDays.length === 0 ? (
            <p className="text-xs text-muted">Henüz öne çıkan gün yok.</p>
          ) : (
            <div className="space-y-2">
              {report.effectiveDays.map((day) => (
                <div
                  key={day.date}
                  className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-amber-100 bg-white px-4 py-3 text-xs"
                >
                  <div>
                    <p className="font-semibold text-ink">{formatShortDate(day.date)}</p>
                    <p className="text-[11px] text-muted">
                      Uyum %{day.score} • {formatNumber(day.caloriesIn)} kcal
                    </p>
                  </div>
                  <div className="text-[11px] text-muted">
                    Su {formatNumber(day.waterMl)} ml • Aktivite {formatNumber(day.activityMin)} dk
                    • Öğün {formatNumber(day.mealCount)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>

      <section className={sectionClass("trends")}>
        <div className="print-hidden">
          <p className="text-sm font-semibold">Trendler</p>
          <p className="text-xs text-muted">Kalori, su ve makro değişimleri</p>
        </div>
        <ReportCharts summary={report.daily} hasEntries={report.entryCount > 0} />
      </section>

      <section className={sectionClass("insights")}>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="space-y-3">
            <div>
              <p className="text-sm font-semibold">Öne Çıkan Öğünler</p>
              <p className="text-xs text-muted">En çok kalori getiren seçimler</p>
            </div>
            {report.topFoods.length === 0 ? (
              <p className="text-xs text-muted">Henüz öğün kaydı yok.</p>
            ) : (
              <div className="space-y-2 text-sm">
                {report.topFoods.map((food) => (
                  <div key={food.name} className="flex items-center justify-between">
                    <span className="truncate">{food.name}</span>
                    <span className="text-xs text-muted">
                      {formatNumber(food.calories)} kcal • {food.count} kez
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="space-y-3">
            <div>
              <p className="text-sm font-semibold">Öne Çıkan Aktiviteler</p>
              <p className="text-xs text-muted">Hareket yoğunluğu özeti</p>
            </div>
            {report.topActivities.length === 0 ? (
              <p className="text-xs text-muted">Henüz aktivite kaydı yok.</p>
            ) : (
              <div className="space-y-2 text-sm">
                {report.topActivities.map((activity) => (
                  <div key={activity.activityType} className="flex items-center justify-between">
                    <span>{activityLabels[activity.activityType as ActivityType] ?? "Aktivite"}</span>
                    <span className="text-xs text-muted">
                      {formatNumber(activity.calories)} kcal •{" "}
                      {formatNumber(activity.durationMin)} dk
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </section>

      <section className={sectionClass("details")}>
        <Card className="space-y-3">
          <div>
            <p className="text-sm font-semibold">Günlük Detaylar</p>
            <p className="text-xs text-muted">Kayıtların gün bazlı özeti</p>
          </div>
          <div className="max-h-80 space-y-2 overflow-y-auto pr-1 text-xs print:max-h-none print:overflow-visible">
            {report.daily.map((day) => (
              <div
                key={day.date}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-100 bg-white px-3 py-2"
              >
                <span className="text-muted">{formatShortDate(day.date)}</span>
                <span>
                  {formatNumber(day.caloriesIn)} kcal • {formatNumber(day.caloriesOut)} kcal •{" "}
                  {formatNumber(day.waterMl)} ml
                </span>
                <span className="text-muted">
                  Aktivite {formatNumber(day.activityMin)} dk • Öğün{" "}
                  {formatNumber(day.mealCount)}
                </span>
                <span className="text-muted">
                  P {formatNumber(day.proteinG)} • K {formatNumber(day.carbsG)} • Y{" "}
                  {formatNumber(day.fatG)}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
