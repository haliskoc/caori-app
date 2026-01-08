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
import { getIntlLocale, t } from "@/lib/i18n";

export default function ReportPage() {
  const { user } = useUser();
  const { entries, goals, dataMode } = useTracker();
  const [rangeDays, setRangeDays] = useState(30);
  const [remoteReport, setRemoteReport] = useState<ReportData | null>(null);
  const [profile, setProfile] = useState<ProfileInfo>(() => loadProfile());
  const [activeSection, setActiveSection] = useState<
    "overview" | "weekly" | "trends" | "insights" | "details"
  >("overview");
  const activityLabels: Record<ActivityType, string> = {
    walking: t("Yürümek"),
    running: t("Koşu"),
    gym: t("Salon"),
  };

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
  const name = user?.name ?? user?.email ?? t("Kullanıcı");
  const rangeLabel = t("Son {value} gün", { value: report.rangeDays });
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
  const numberFormat = useMemo(() => new Intl.NumberFormat(getIntlLocale()), []);
  const formatNumber = (value: number) => numberFormat.format(Math.round(value));
  const sections = [
    { key: "overview", label: t("Özet") },
    { key: "weekly", label: t("Sapma") },
    { key: "trends", label: t("Trendler") },
    { key: "insights", label: t("Öne çıkanlar") },
    { key: "details", label: t("Detaylar") },
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
        const title = block.getAttribute("data-chart-title") ?? t("Grafik");
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
            <td>${formatDelta(week.deltas.caloriesIn, t("kcal"))}</td>
            <td>${formatDelta(week.deltas.waterMl, t("ml"))}</td>
            <td>${formatDelta(week.deltas.activityMin, t("dk"))}</td>
            <td>${formatDelta(week.deltas.mealCount, t("öğün"))}</td>
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
      <tr><td>${t("Hedef uyum skoru")}</td><td>%${report.adherenceScore}</td></tr>
      <tr><td>${t("Toplam kalori")}</td><td>${formatNumber(report.totals.caloriesIn)} ${t("kcal")}</td></tr>
      <tr><td>${t("Net kalori")}</td><td>${formatNumber(report.totals.netCalories)} ${t("kcal")}</td></tr>
      <tr><td>${t("Toplam su")}</td><td>${formatNumber(report.totals.waterMl)} ${t("ml")}</td></tr>
      <tr><td>${t("Aktivite süresi")}</td><td>${formatNumber(report.totals.activityMin)} ${t("dk")}</td></tr>
      <tr><td>${t("Öğün toplamı")}</td><td>${formatNumber(report.totals.mealCount)} ${t("öğün")}</td></tr>
    `;

    const html = `<!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <title>${t("Cal AI Rapor")}</title>
          <style>
            body { font-family: Arial, sans-serif; color: #2b2b2b; margin: 0; padding: 20px; }
            h1 { font-size: 20px; margin-bottom: 4px; }
            h2 { margin-top: 20px; font-size: 16px; }
            h3 { font-size: 13px; margin: 12px 0 6px; }
            p { font-size: 12px; margin: 4px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 8px; }
            th, td { border: 1px solid #e0e0e0; padding: 6px; font-size: 11px; text-align: left; }
            th { background: #f7f4f0; }
            .chart img { max-width: 720px; width: 100%; height: auto; border: 1px solid #eee; }
            .cover-page { text-align: center; padding: 40px; page-break-after: always; }
            .cover-title { font-size: 36px; font-weight: bold; color: #ff7a00; margin-bottom: 20px; }
            .cover-score { font-size: 48px; font-weight: bold; color: #ff7a00; margin: 20px 0; }
            .stats-grid { display: flex; justify-content: center; gap: 40px; margin: 30px 0; }
            .stat-item { text-align: center; }
            .stat-value { font-size: 24px; font-weight: bold; }
            .stat-label { font-size: 12px; color: #6f5f52; }
          </style>
        </head>
        <body>
          <div class="cover-page">
            <div class="cover-title">Cal AI</div>
            <h1>${t("Performans Özeti")}</h1>
            <p>${escapeHtml(name)} • ${escapeHtml(rangeLabel)}</p>
            <p>${escapeHtml(formatDateFull(report.startDate))} - ${escapeHtml(formatDateFull(report.endDate))}</p>
            <div class="cover-score">%${report.adherenceScore}</div>
            <p>${t("Hedef Uyum Skoru")}</p>
            <div class="stats-grid">
              <div class="stat-item">
                <div class="stat-value">${formatNumber(report.totals.caloriesIn)}</div>
                <div class="stat-label">${t("Kalori (kcal)")}</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">${formatNumber(report.totals.waterMl)}</div>
                <div class="stat-label">${t("Su (ml)")}</div>
              </div>
              <div class="stat-item">
                <div class="stat-value">${formatNumber(report.totals.activityMin)}</div>
                <div class="stat-label">${t("Aktivite (dk)")}</div>
              </div>
            </div>
            <p style="margin-top: 40px; font-size: 10px; color: #999;">
              ${t("Rapor Tarihi: {date}", {
                date: new Date().toLocaleDateString("tr-TR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              })}
            </p>
          </div>

          <h2>${t("Motivasyon Notu")}</h2>
          <p>${escapeHtml(report.comment)}</p>
          <p>${t("Aktif gün: {active}/{range} • Toplam kayıt: {count}", {
            active: report.activeDays,
            range: report.rangeDays,
            count: report.entryCount,
          })}</p>

          <h2>${t("Özet")}</h2>
          <table>
            <tbody>
              ${summaryRows}
            </tbody>
          </table>

          <h2>${t("Haftalık Sapma")}</h2>
          <table>
            <thead>
              <tr>
                <th>${t("Hafta")}</th>
                <th>${t("Uyum")}</th>
                <th>${t("Kalori")}</th>
                <th>${t("Su")}</th>
                <th>${t("Aktivite")}</th>
                <th>${t("Öğün")}</th>
              </tr>
            </thead>
            <tbody>
              ${weeklyRows}
            </tbody>
          </table>

          <h2>${t("Grafikler")}</h2>
          ${chartHtml}

          <h2>${t("Günlük Detaylar")}</h2>
          <table>
            <thead>
              <tr>
                <th>${t("Gün")}</th>
                <th>${t("Kalori")}</th>
                <th>${t("Akt. Kalori")}</th>
                <th>${t("Su")}</th>
                <th>${t("Akt. Süre")}</th>
                <th>${t("Öğün")}</th>
                <th>${t("Protein")}</th>
                <th>${t("Karbonhidrat")}</th>
                <th>${t("Yağ")}</th>
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

  const handlePdfExport = async () => {
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
        const title = block.getAttribute("data-chart-title") ?? t("Grafik");
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
          <div class="chart-block">
            <h3 class="section-subtitle">${escapeHtml(chart.title)}</h3>
            <img src="${chart.dataUrl}" class="chart-img" />
          </div>
        `;
      })
      .join("");

    const weeklyRows = report.weekly
      .map(
        (week) => `
          <tr>
            <td><strong>${escapeHtml(formatShortDate(week.weekStart))} - ${escapeHtml(
          formatShortDate(week.weekEnd)
        )}</strong></td>
            <td class="text-accent">%${week.adherenceScore}</td>
            <td>${formatDelta(week.deltas.caloriesIn, "kcal")}</td>
            <td>${formatDelta(week.deltas.waterMl, "ml")}</td>
            <td>${formatDelta(week.deltas.activityMin, "dk")}</td>
            <td>${formatDelta(week.deltas.mealCount, t("öğün"))}</td>
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
            <td>${day.mealCount}</td>
            <td>${formatNumber(day.proteinG)}g</td>
            <td>${formatNumber(day.carbsG)}g</td>
            <td>${formatNumber(day.fatG)}g</td>
          </tr>
        `
      )
      .join("");

    const topFoodsHtml = report.topFoods
      .map(
        (food) => `
      <div class="list-item">
        <div class="list-item-main">
          <span class="list-item-title">${escapeHtml(food.name)}</span>
          <span class="list-item-meta">${food.count} ${t("kez")}</span>
        </div>
        <div class="list-item-value">${formatNumber(food.calories)} kcal</div>
      </div>`
      )
      .join("");

    const topActivitiesHtml = report.topActivities
      .map(
        (act) => `
      <div class="list-item">
        <div class="list-item-main">
          <span class="list-item-title">${escapeHtml(act.activityType)}</span>
          <span class="list-item-meta">${act.durationMin} ${t("dk")}</span>
        </div>
        <div class="list-item-value">${formatNumber(act.calories)} kcal</div>
      </div>`
      )
      .join("");

    const effectiveDaysHtml = report.effectiveDays
      .map(
        (day) => `
      <div class="day-card">
        <div class="day-card-date">${formatShortDate(day.date)}</div>
        <div class="day-card-score">%${day.score}</div>
        <div class="day-card-stats">
          <div class="day-stat">${formatNumber(day.caloriesIn)} kcal</div>
          <div class="day-stat">${formatNumber(day.activityMin)} dk</div>
        </div>
      </div>`
      )
      .join("");

    const html = `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <title>${t("Cal AI Rapor")}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
    
    @page {
      size: A4;
      margin: 15mm;
    }
    
    * { box-sizing: border-box; }
    
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #1a1a1a;
      background: white;
      margin: 0;
      padding: 0;
      line-height: 1.5;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }

    h1, h2, h3, h4 { margin: 0; font-weight: 700; }
    
    .cover-page {
      height: 260mm;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      page-break-after: always;
      position: relative;
      background: radial-gradient(circle at top right, #fff5eb, transparent),
                  radial-gradient(circle at bottom left, #fff0e0, transparent);
    }
    
    .logo {
      font-size: 80px;
      font-weight: 800;
      color: #ff7a00;
      letter-spacing: -2px;
      margin-bottom: 20px;
    }
    
    .report-title {
      font-size: 32px;
      color: #1a1a1a;
      margin-bottom: 10px;
      text-transform: uppercase;
      letter-spacing: 2px;
    }
    
    .user-info {
      font-size: 18px;
      color: #666;
      margin-bottom: 40px;
    }
    
    .date-range {
      font-size: 14px;
      color: #999;
      margin-bottom: 60px;
    }
    
    .score-circle {
      width: 200px;
      height: 200px;
      border-radius: 100px;
      border: 8px solid #ff7a00;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin-bottom: 60px;
      background: white;
      box-shadow: 0 20px 40px rgba(255, 122, 0, 0.1);
    }
    
    .score-value {
      font-size: 64px;
      font-weight: 800;
      color: #ff7a00;
      line-height: 1;
    }
    
    .score-label {
      font-size: 12px;
      font-weight: 600;
      color: #666;
      text-transform: uppercase;
      margin-top: 5px;
    }
    
    .cover-footer {
      position: absolute;
      bottom: 20px;
      font-size: 12px;
      color: #999;
    }

    .section {
      margin-bottom: 40px;
      page-break-inside: avoid;
    }
    
    .section-title {
      font-size: 20px;
      color: #1a1a1a;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid #f0f0f0;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    
    .grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
    }
    
    .card {
      background: #fafafa;
      border-radius: 12px;
      padding: 20px;
      border: 1px solid #f0f0f0;
    }
    
    .stat-label {
      font-size: 11px;
      color: #666;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 5px;
    }
    
    .stat-value {
      font-size: 24px;
      font-weight: 700;
      color: #1a1a1a;
    }
    
    .motivation-card {
      background: #fff8f0;
      border-left: 4px solid #ff7a00;
      padding: 20px;
      border-radius: 0 12px 12px 0;
      font-style: italic;
      color: #444;
      font-size: 15px;
      line-height: 1.6;
    }
    
    .list-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid #f5f5f5;
    }
    
    .list-item-title {
      font-weight: 600;
      font-size: 14px;
    }
    
    .list-item-meta {
      font-size: 12px;
      color: #999;
      margin-left: 10px;
    }
    
    .list-item-value {
      font-weight: 700;
      color: #ff7a00;
      font-size: 14px;
    }
    
    .day-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
    }
    
    .day-card {
      padding: 15px;
      border: 1px solid #f0f0f0;
      border-radius: 12px;
      text-align: center;
    }
    
    .day-card-date {
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 10px;
    }
    
    .day-card-score {
      font-size: 28px;
      font-weight: 800;
      color: #ff7a00;
      margin-bottom: 5px;
    }
    
    .day-card-stats {
      font-size: 11px;
      color: #666;
      display: flex;
      justify-content: center;
      gap: 10px;
    }
    
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 10px;
    }
    
    th {
      text-align: left;
      font-size: 11px;
      text-transform: uppercase;
      color: #999;
      padding: 10px;
      border-bottom: 2px solid #f0f0f0;
    }
    
    td {
      padding: 12px 10px;
      font-size: 13px;
      border-bottom: 1px solid #f5f5f5;
    }
    
    .text-accent { color: #ff7a00; font-weight: 700; }
    
    .chart-block {
      margin-bottom: 30px;
      page-break-inside: avoid;
    }
    
    .section-subtitle {
      font-size: 14px;
      margin-bottom: 10px;
      color: #666;
    }
    
    .chart-img {
      width: 100%;
      border-radius: 8px;
      border: 1px solid #f0f0f0;
    }

    .footer {
      text-align: center;
      font-size: 10px;
      color: #ccc;
      margin-top: 40px;
    }
  </style>
</head>
<body>
  <div class="cover-page">
    <div class="logo">Cal AI</div>
    <h1 class="report-title">${t("Performans Analizi")}</h1>
    <div class="user-info">${escapeHtml(name)} • ${escapeHtml(rangeLabel)}</div>
    <div class="date-range">${escapeHtml(formatDateFull(report.startDate))} - ${escapeHtml(
      formatDateFull(report.endDate)
    )}</div>
    
    <div class="score-circle">
      <div class="score-value">%${report.adherenceScore}</div>
      <div class="score-label">${t("Uyum Skoru")}</div>
    </div>
    
    <div class="cover-footer">
      ${t("Rapor Oluşturulma Tarihi")}: ${new Date().toLocaleDateString("tr-TR")}
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">✨ ${t("Motivasyon ve Analiz")}</h2>
    <div class="motivation-card">${escapeHtml(report.comment)}</div>
  </div>

  <div class="section">
    <h2 class="section-title">📊 ${t("Genel Özet")}</h2>
    <div class="grid-3">
      <div class="card">
        <div class="stat-label">${t("Toplam Kalori")}</div>
        <div class="stat-value">${formatNumber(report.totals.caloriesIn)}</div>
        <div class="stat-label" style="margin-top:5px; text-transform:none">kcal</div>
      </div>
      <div class="card">
        <div class="stat-label">${t("Günlük Ort.")}</div>
        <div class="stat-value">${formatNumber(report.averages.caloriesIn)}</div>
        <div class="stat-label" style="margin-top:5px; text-transform:none">kcal</div>
      </div>
      <div class="card">
        <div class="stat-label">${t("Net Kalori")}</div>
        <div class="stat-value">${formatNumber(report.totals.netCalories)}</div>
        <div class="stat-label" style="margin-top:5px; text-transform:none">kcal</div>
      </div>
      <div class="card">
        <div class="stat-label">${t("Toplam Su")}</div>
        <div class="stat-value">${formatNumber(report.totals.waterMl)}</div>
        <div class="stat-label" style="margin-top:5px; text-transform:none">ml</div>
      </div>
      <div class="card">
        <div class="stat-label">${t("Aktivite")}</div>
        <div class="stat-value">${formatNumber(report.totals.activityMin)}</div>
        <div class="stat-label" style="margin-top:5px; text-transform:none">dk</div>
      </div>
      <div class="card">
        <div class="stat-label">${t("Öğün Sayısı")}</div>
        <div class="stat-value">${formatNumber(report.totals.mealCount)}</div>
        <div class="stat-label" style="margin-top:5px; text-transform:none">${t(
          "öğün"
        )}</div>
      </div>
      <div class="card" style="grid-column: span 3">
        <div class="stat-label">${t("Günlük Ortalama Makro Dağılımı")}</div>
        <div class="stat-value" style="font-size: 18px; color: #666; margin-top: 5px;">
          <span style="color:#ff7a00">P:</span> ${formatNumber(report.averages.proteinG)}g &nbsp;&nbsp;
          <span style="color:#ff7a00">K:</span> ${formatNumber(report.averages.carbsG)}g &nbsp;&nbsp;
          <span style="color:#ff7a00">Y:</span> ${formatNumber(report.averages.fatG)}g
        </div>
      </div>
    </div>
  </div>

  ${
    report.effectiveDays.length > 0
      ? `
  <div class="section">
    <h2 class="section-title">🏆 ${t("En Başarılı Günler")}</h2>
    <div class="day-grid">
      ${effectiveDaysHtml}
    </div>
  </div>
  `
      : ""
  }

  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 30px;">
    <div class="section">
      <h2 class="section-title">🍎 ${t("En Çok Tüketilenler")}</h2>
      <div class="list-container">
        ${topFoodsHtml || `<p style="font-size:12px; color:#999">${t("Veri yok")}</p>`}
      </div>
    </div>
    <div class="section">
      <h2 class="section-title">🏃 ${t("En Sık Aktiviteler")}</h2>
      <div class="list-container">
        ${
          topActivitiesHtml ||
          `<p style="font-size:12px; color:#999">${t("Veri yok")}</p>`
        }
      </div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">📅 ${t("Haftalık Performans")}</h2>
    <table>
      <thead>
        <tr>
          <th>${t("Aralık")}</th>
          <th>${t("Uyum")}</th>
          <th>${t("Kalori")}</th>
          <th>${t("Su")}</th>
          <th>${t("Aktivite")}</th>
          <th>${t("Öğün")}</th>
        </tr>
      </thead>
      <tbody>
        ${weeklyRows}
      </tbody>
    </table>
  </div>

  <div class="section" style="page-break-before: always;">
    <h2 class="section-title">📈 ${t("Görsel Analiz")}</h2>
    ${chartHtml}
  </div>

  <div class="section">
    <h2 class="section-title">📝 ${t("Günlük Veri Dökümü")}</h2>
    <table>
      <thead>
        <tr>
          <th>${t("Tarih")}</th>
          <th>${t("Kalori")}</th>
          <th>${t("Yakılan")}</th>
          <th>${t("Su")}</th>
          <th>${t("Akt.")}</th>
          <th>${t("Öğün")}</th>
          <th>P</th>
          <th>K</th>
          <th>Y</th>
        </tr>
      </thead>
      <tbody>
        ${dailyRows}
      </tbody>
    </table>
  </div>

  <div class="footer">
    Cal AI Analytics • ${new Date().getFullYear()} • Generated by Cal AI
  </div>
</body>
</html>
    `;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
      }, 1000);
    }
  };

  const formatDateFull = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="print-page space-y-8">
      <div className="print-watermark">
        {t("Cal AI • {date}", {
          date: new Date().toLocaleDateString("tr-TR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }),
        })}
      </div>
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-muted">{t("Rapor")}</p>
          <h1 className="text-2xl font-semibold text-ink">{t("Performans Özeti")}</h1>
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
            <option value={7}>{t("{value} gün", { value: 7 })}</option>
            <option value={30}>{t("{value} gün", { value: 30 })}</option>
            <option value={60}>{t("{value} gün", { value: 60 })}</option>
            <option value={90}>{t("{value} gün", { value: 90 })}</option>
          </select>
          <button
            onClick={handlePdfExport}
            className="rounded-xl bg-accent px-4 py-2 text-xs font-semibold text-white"
          >
            {t("PDF Olarak Kaydet")}
          </button>
          <button
            onClick={handleExcelExport}
            className="rounded-xl border border-amber-100 bg-white px-4 py-2 text-xs font-semibold text-amber-700"
          >
            {t("Excel Olarak İndir")}
          </button>
        </div>
      </header>

      {/* Print Cover Page */}
      <div className="hidden print:block print-cover-page">
        <div className="flex flex-col items-center justify-center text-center py-20 min-h-[290mm]">
          <div className="mb-4 text-[80px] font-extrabold text-[#ff7a00] leading-none">Cal AI</div>
          <h2 className="mb-2 text-3xl font-bold text-ink tracking-widest uppercase">{t("Performans Analizi")}</h2>
          <p className="mb-2 text-xl text-muted font-medium">{name}</p>
          <p className="mb-8 text-lg text-muted">{rangeLabel}</p>
          <div className="mb-12 text-sm text-muted">
            {formatDateFull(report.startDate)} - {formatDateFull(report.endDate)}
          </div>
          
          <div className="relative mb-12 flex h-48 w-48 flex-col items-center justify-center rounded-full border-[6px] border-[#ff7a00] bg-white shadow-xl shadow-amber-900/5">
            <span className="text-[64px] font-black text-[#ff7a00] leading-none mt-2">%{report.adherenceScore}</span>
            <span className="text-[10px] font-bold text-muted uppercase tracking-wider">{t("Uyum Skoru")}</span>
          </div>

          <div className="mt-8 grid grid-cols-3 gap-12 text-center w-full max-w-2xl">
            <div className="space-y-1">
              <p className="text-sm uppercase tracking-widest text-muted">{t("Toplam Kalori")}</p>
              <p className="text-3xl font-bold text-ink">
                {formatNumber(report.totals.caloriesIn)}
              </p>
              <p className="text-xs text-muted">kcal</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm uppercase tracking-widest text-muted">{t("Toplam Su")}</p>
              <p className="text-3xl font-bold text-ink">
                {formatNumber(report.totals.waterMl)}
              </p>
              <p className="text-xs text-muted">ml</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm uppercase tracking-widest text-muted">{t("Aktivite")}</p>
              <p className="text-3xl font-bold text-ink">
                {formatNumber(report.totals.activityMin)}
              </p>
              <p className="text-xs text-muted">dk</p>
            </div>
          </div>
          
          <div className="mt-24 text-[10px] text-muted-foreground uppercase tracking-tighter">
            {t("Rapor Tarihi: {date}", {
              date: new Date().toLocaleDateString("tr-TR", {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              }),
            })}
          </div>
        </div>
      </div>

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
              <p className="text-sm font-semibold">{t("Motivasyon Notu")}</p>
              <p className="text-sm text-muted">{report.comment}</p>
              <p className="text-xs text-muted">
                {t("Aktif gün: {active}/{range} • Toplam kayıt: {count}", {
                  active: report.activeDays,
                  range: report.rangeDays,
                  count: report.entryCount,
                })}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-amber-50/70 px-4 py-3 text-center">
              <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
                {t("Hedef Uyum Skoru")}
              </p>
              <p className="mt-1 text-3xl font-semibold text-ink">%{report.adherenceScore}</p>
              <p className="text-[11px] text-muted">{rangeLabel}</p>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">{t("Toplam kalori")}</p>
              <p className="mt-1 text-lg font-semibold text-ink">
                {t("{value} kcal", { value: formatNumber(report.totals.caloriesIn) })}
              </p>
              <p className="text-[11px] text-muted">
                {t("Net {value} kcal", { value: formatNumber(report.totals.netCalories) })}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">{t("Aktivite kalorisi")}</p>
              <p className="mt-1 text-lg font-semibold text-ink">
                {t("{value} kcal", { value: formatNumber(report.totals.caloriesOut) })}
              </p>
              <p className="text-[11px] text-muted">
                {t("Günlük ort. {value}", { value: formatNumber(report.averages.caloriesOut) })}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">{t("Su toplamı")}</p>
              <p className="mt-1 text-lg font-semibold text-ink">
                {t("{value} ml", { value: formatNumber(report.totals.waterMl) })}
              </p>
              <p className="text-[11px] text-muted">
                {t("Günlük ort. {value} ml", { value: formatNumber(report.averages.waterMl) })}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">{t("Aktivite süresi")}</p>
              <p className="mt-1 text-lg font-semibold text-ink">
                {t("{value} dk", { value: formatNumber(report.totals.activityMin) })}
              </p>
              <p className="text-[11px] text-muted">
                {t("Günlük ort. {value} dk", { value: formatNumber(report.averages.activityMin) })}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">{t("Öğün ritmi")}</p>
              <p className="mt-1 text-lg font-semibold text-ink">
                {t("{value} öğün/gün", { value: formatNumber(report.averages.mealCount) })}
              </p>
              <p className="text-[11px] text-muted">
                {t("Toplam {value} öğün", { value: formatNumber(report.totals.mealCount) })}
              </p>
            </div>
            <div className="rounded-2xl border border-amber-100 bg-white px-3 py-3 text-xs">
              <p className="text-muted">{t("Makro toplamı")}</p>
              <p className="mt-1 text-lg font-semibold text-ink">
                {t("{value} g", {
                  value: formatNumber(
                    report.totals.proteinG + report.totals.carbsG + report.totals.fatG
                  ),
                })}
              </p>
              <p className="text-[11px] text-muted">
                {t(
                  "P {protein} • K {carb} • Y {fat}",
                  {
                    protein: formatNumber(report.averages.proteinG),
                    carb: formatNumber(report.averages.carbsG),
                    fat: formatNumber(report.averages.fatG),
                  }
                )}
              </p>
            </div>
          </div>
        </Card>

        <Card className="space-y-4">
          <div>
            <p className="text-sm font-semibold">{t("Hedeflere Yakınlık")}</p>
            <p className="text-xs text-muted">{t("Ortalama değerler ile hedef karşılaştırması")}</p>
          </div>
          {hasGoals ? (
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">{t("Kalori hedefi")}</span>
                  {safeCalorieGoal !== null ? (
                    <span className="font-semibold text-ink">
                      {formatNumber(report.averages.caloriesIn)} /{" "}
                      {t("{value} kcal", { value: formatNumber(safeCalorieGoal) })}
                    </span>
                  ) : (
                    <span className="text-muted">{t("Hedef yok")}</span>
                  )}
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-amber-100">
                  <div
                    className="h-full rounded-full bg-amber-600"
                    style={{ width: `${Math.min(100, caloriePercent ?? 0)}%` }}
                  />
                </div>
                <p className="text-[11px] text-muted">
                  {t("{value} sapma • %{percent}", {
                    value: formatDelta(calorieDelta, t("kcal")),
                    percent: caloriePercent ?? 0,
                  })}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">{t("Su hedefi")}</span>
                  {safeWaterGoalMl !== null ? (
                    <span className="font-semibold text-ink">
                      {formatNumber(report.averages.waterMl)} /{" "}
                      {t("{value} ml", { value: formatNumber(safeWaterGoalMl) })}
                    </span>
                  ) : (
                    <span className="text-muted">{t("Hedef yok")}</span>
                  )}
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-amber-100">
                  <div
                    className="h-full rounded-full bg-amber-600"
                    style={{ width: `${Math.min(100, waterPercent ?? 0)}%` }}
                  />
                </div>
                <p className="text-[11px] text-muted">
                  {t("{value} sapma • %{percent}", {
                    value: formatDelta(waterDelta, t("ml")),
                    percent: waterPercent ?? 0,
                  })}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">{t("Aktivite hedefi")}</span>
                  {safeActivityGoalMin !== null ? (
                    <span className="font-semibold text-ink">
                      {formatNumber(report.averages.activityMin)} /{" "}
                      {t("{value} dk", { value: formatNumber(safeActivityGoalMin) })}
                    </span>
                  ) : (
                    <span className="text-muted">{t("Hedef yok")}</span>
                  )}
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-amber-100">
                  <div
                    className="h-full rounded-full bg-amber-600"
                    style={{ width: `${Math.min(100, activityPercent ?? 0)}%` }}
                  />
                </div>
                <p className="text-[11px] text-muted">
                  {t("{value} sapma • %{percent}", {
                    value: formatDelta(activityDelta, t("dk")),
                    percent: activityPercent ?? 0,
                  })}
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted">{t("Öğün hedefi")}</span>
                  {safeMealGoalCount !== null ? (
                    <span className="font-semibold text-ink">
                      {formatNumber(report.averages.mealCount)} /{" "}
                      {t("{value} öğün", { value: formatNumber(safeMealGoalCount) })}
                    </span>
                  ) : (
                    <span className="text-muted">{t("Hedef yok")}</span>
                  )}
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-amber-100">
                  <div
                    className="h-full rounded-full bg-amber-600"
                    style={{ width: `${Math.min(100, mealPercent ?? 0)}%` }}
                  />
                </div>
                <p className="text-[11px] text-muted">
                  {t("{value} sapma • %{percent}", {
                    value: formatDelta(mealDelta, t("öğün")),
                    percent: mealPercent ?? 0,
                  })}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-xs text-muted">{t("Hedef bilgisi henüz eklenmemiş.")}</p>
          )}
          {safeWeightGoalKg !== null && (
            <div className="rounded-2xl border border-amber-100 bg-amber-50/70 px-4 py-3 text-xs text-muted">
              <span>{t("Hedef kilo: {value} kg", { value: formatNumber(safeWeightGoalKg) })}</span>
              <span className="mx-2">•</span>
              <span>
                {t("Mevcut: {value}", {
                  value:
                    safeCurrentWeight !== null
                      ? t("{value} kg", { value: formatNumber(safeCurrentWeight) })
                      : "-",
                })}
              </span>
              <span className="mx-2">•</span>
              <span>
                {t("Fark: {value}", {
                  value:
                    weightDelta !== null
                      ? `${weightDelta > 0 ? "+" : ""}${weightDelta} ${t("kg")}`
                      : "-",
                })}
              </span>
            </div>
          )}
        </Card>
      </section>

      <section className={sectionClass("weekly")}>
        <Card className="space-y-3">
          <div>
            <p className="text-sm font-semibold">{t("Haftalık Sapma Analizi")}</p>
            <p className="text-xs text-muted">{t("Hedeflerden sapma ve uyum skoru")}</p>
          </div>
          {report.weekly.length === 0 ? (
            <p className="text-xs text-muted">{t("Henüz haftalık veri yok.")}</p>
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
                        {t("{value} gün • Uyum %{score}", {
                          value: week.days,
                          score: week.adherenceScore,
                        })}
                      </p>
                    </div>
                    <div className="text-[11px] text-muted">
                      {t(
                        "Kalori {calorie} • Su {water} • Aktivite {activity} • Öğün {meal}",
                        {
                          calorie: formatDelta(week.deltas.caloriesIn, t("kcal")),
                          water: formatDelta(week.deltas.waterMl, t("ml")),
                          activity: formatDelta(week.deltas.activityMin, t("dk")),
                          meal: formatDelta(week.deltas.mealCount, t("öğün")),
                        }
                      )}
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
            <p className="text-sm font-semibold">{t("En Etkili Günler")}</p>
            <p className="text-xs text-muted">{t("Hedef uyumunun en yüksek olduğu günler")}</p>
          </div>
          {report.effectiveDays.length === 0 ? (
            <p className="text-xs text-muted">{t("Henüz öne çıkan gün yok.")}</p>
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
                      {t("Uyum %{score} • {calorie} kcal", {
                        score: day.score,
                        calorie: formatNumber(day.caloriesIn),
                      })}
                    </p>
                  </div>
                  <div className="text-[11px] text-muted">
                    {t("Su {water} ml • Aktivite {activity} dk • Öğün {meal}", {
                      water: formatNumber(day.waterMl),
                      activity: formatNumber(day.activityMin),
                      meal: formatNumber(day.mealCount),
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>

      <section className={sectionClass("trends")}>
        <div className="print-hidden">
          <p className="text-sm font-semibold">{t("Trendler")}</p>
          <p className="text-xs text-muted">{t("Kalori, su ve makro değişimleri")}</p>
        </div>
        <ReportCharts summary={report.daily} hasEntries={report.entryCount > 0} />
      </section>

      <section className={sectionClass("insights")}>
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="space-y-3">
            <div>
              <p className="text-sm font-semibold">{t("Öne Çıkan Öğünler")}</p>
              <p className="text-xs text-muted">{t("En çok kalori getiren seçimler")}</p>
            </div>
            {report.topFoods.length === 0 ? (
              <p className="text-xs text-muted">{t("Henüz öğün kaydı yok.")}</p>
            ) : (
              <div className="space-y-2 text-sm">
                {report.topFoods.map((food) => (
                  <div key={food.name} className="flex items-center justify-between">
                    <span className="truncate">{food.name}</span>
                    <span className="text-xs text-muted">
                      {t("{calorie} kcal • {count} kez", {
                        calorie: formatNumber(food.calories),
                        count: food.count,
                      })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="space-y-3">
            <div>
              <p className="text-sm font-semibold">{t("Öne Çıkan Aktiviteler")}</p>
              <p className="text-xs text-muted">{t("Hareket yoğunluğu özeti")}</p>
            </div>
            {report.topActivities.length === 0 ? (
              <p className="text-xs text-muted">{t("Henüz aktivite kaydı yok.")}</p>
            ) : (
              <div className="space-y-2 text-sm">
                {report.topActivities.map((activity) => (
                  <div key={activity.activityType} className="flex items-center justify-between">
                    <span>
                      {activityLabels[activity.activityType as ActivityType] ?? t("Aktivite")}
                    </span>
                    <span className="text-xs text-muted">
                      {t("{calorie} kcal • {duration} dk", {
                        calorie: formatNumber(activity.calories),
                        duration: formatNumber(activity.durationMin),
                      })}
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
            <p className="text-sm font-semibold">{t("Günlük Detaylar")}</p>
            <p className="text-xs text-muted">{t("Kayıtların gün bazlı özeti")}</p>
          </div>
          <div className="max-h-80 space-y-2 overflow-y-auto pr-1 text-xs print:max-h-none print:overflow-visible">
            {report.daily.map((day) => (
              <div
                key={day.date}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl border border-amber-100 bg-white px-3 py-2"
              >
                <span className="text-muted">{formatShortDate(day.date)}</span>
                <span>
                  {t("{in} kcal • {out} kcal • {water} ml", {
                    in: formatNumber(day.caloriesIn),
                    out: formatNumber(day.caloriesOut),
                    water: formatNumber(day.waterMl),
                  })}
                </span>
                <span className="text-muted">
                  {t("Aktivite {activity} dk • Öğün {meal}", {
                    activity: formatNumber(day.activityMin),
                    meal: formatNumber(day.mealCount),
                  })}
                </span>
                <span className="text-muted">
                  {t("P {protein} • K {carb} • Y {fat}", {
                    protein: formatNumber(day.proteinG),
                    carb: formatNumber(day.carbsG),
                    fat: formatNumber(day.fatG),
                  })}
                </span>
              </div>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}
