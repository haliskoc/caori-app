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

    const html = `
<!DOCTYPE html>
<html lang="tr">
<head>
  <meta charset="utf-8" />
  <title>${t("Cal AI Rapor")}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
    
    @page {
      size: A4;
      margin: 15mm;
      @bottom-right {
        content: counter(page) " / " counter(pages);
        font-family: 'Inter', sans-serif;
        font-size: 10px;
        color: #999;
      }
    }
    
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    
    body {
      font-family: 'Inter', sans-serif;
      color: #1a1a1a;
      background: #ffffff;
      margin: 0;
      padding: 0;
      line-height: 1.4;
    }

    .cover-page {
      height: 275mm;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-align: center;
      page-break-after: always;
      background: radial-gradient(circle at 10% 10%, #fffbf0 0%, transparent 40%),
                  radial-gradient(circle at 90% 90%, #fff5e6 0%, transparent 40%),
                  #ffffff;
    }
    
    .cover-logo {
      width: 120px;
      height: 120px;
      background: #ff7a00;
      border-radius: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 40px;
      box-shadow: 0 20px 40px rgba(255, 122, 0, 0.2);
    }
    
    .cover-logo span {
      color: white;
      font-size: 60px;
      font-weight: 900;
      letter-spacing: -3px;
    }
    
    .report-badge {
      background: #fff0e0;
      color: #ff7a00;
      padding: 6px 16px;
      border-radius: 100px;
      font-size: 13px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 2px;
      margin-bottom: 20px;
    }
    
    .report-title {
      font-size: 48px;
      font-weight: 800;
      color: #1a1a1a;
      margin: 0 0 10px 0;
      letter-spacing: -1px;
    }
    
    .user-info {
      font-size: 20px;
      color: #666;
      font-weight: 500;
      margin-bottom: 60px;
    }
    
    .score-container {
      position: relative;
      margin-bottom: 80px;
    }
    
    .score-ring {
      width: 240px;
      height: 240px;
      border-radius: 50%;
      border: 12px solid #ff7a00;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      background: white;
      box-shadow: 0 30px 60px rgba(0,0,0,0.05);
    }
    
    .score-value {
      font-size: 80px;
      font-weight: 900;
      color: #ff7a00;
      line-height: 1;
    }
    
    .score-label {
      font-size: 14px;
      font-weight: 700;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 5px;
    }
    
    .cover-stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 40px;
      width: 100%;
      max-width: 600px;
    }
    
    .cover-stat-item h4 {
      font-size: 11px;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin: 0 0 8px 0;
    }
    
    .cover-stat-item p {
      font-size: 24px;
      font-weight: 800;
      color: #1a1a1a;
      margin: 0;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 15px;
      border-bottom: 1px solid #eee;
      margin-bottom: 30px;
    }
    
    .page-header-logo {
      font-weight: 800;
      color: #ff7a00;
      font-size: 18px;
    }
    
    .page-header-info {
      font-size: 11px;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 1px;
    }

    .section {
      margin-bottom: 40px;
      page-break-inside: avoid;
    }
    
    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 20px;
    }
    
    .section-icon {
      width: 32px;
      height: 32px;
      background: #fff0e0;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
    
    .section-title {
      font-size: 20px;
      font-weight: 800;
      color: #1a1a1a;
    }
    
    .insight-card {
      background: linear-gradient(135deg, #fffcf5 0%, #fff8eb 100%);
      border: 1px solid #ffe8cc;
      border-radius: 20px;
      padding: 24px;
      position: relative;
      overflow: hidden;
    }
    
    .insight-card:before {
      content: '"';
      position: absolute;
      top: -20px;
      right: 10px;
      font-size: 120px;
      color: #ff7a00;
      opacity: 0.05;
      font-family: serif;
    }
    
    .insight-text {
      font-size: 16px;
      color: #444;
      line-height: 1.6;
      font-weight: 500;
      font-style: italic;
    }
    
    .stat-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
    }
    
    .stat-card {
      background: #ffffff;
      border: 1px solid #f0f0f0;
      border-radius: 16px;
      padding: 20px;
      transition: all 0.3s ease;
    }
    
    .stat-card:hover { background: #fafafa; }
    
    .stat-card-label {
      font-size: 11px;
      font-weight: 700;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-bottom: 8px;
    }
    
    .stat-card-value {
      font-size: 26px;
      font-weight: 800;
      color: #1a1a1a;
      display: flex;
      align-items: baseline;
      gap: 4px;
    }
    
    .stat-card-unit {
      font-size: 12px;
      font-weight: 600;
      color: #999;
    }
    
    .modern-table {
      width: 100%;
      border-collapse: separate;
      border-spacing: 0 8px;
    }
    
    .modern-table th {
      text-align: left;
      font-size: 11px;
      font-weight: 700;
      color: #999;
      text-transform: uppercase;
      letter-spacing: 1px;
      padding: 0 16px;
    }
    
    .modern-table td {
      background: #fafafa;
      padding: 16px;
      font-size: 13px;
    }
    
    .modern-table tr td:first-child { border-radius: 12px 0 0 12px; }
    .modern-table tr td:last-child { border-radius: 0 12px 12px 0; }
    
    .progress-bar {
      height: 6px;
      background: #eee;
      border-radius: 3px;
      overflow: hidden;
      margin-top: 8px;
      width: 60px;
    }
    
    .progress-fill {
      height: 100%;
      background: #ff7a00;
    }
    
    .pill {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 100px;
      font-size: 11px;
      font-weight: 700;
    }
    
    .pill-accent { background: #fff0e0; color: #ff7a00; }
    
    .chart-container {
      background: #ffffff;
      border: 1px solid #f0f0f0;
      border-radius: 20px;
      padding: 24px;
      margin-bottom: 24px;
    }
    
    .chart-header {
      font-size: 14px;
      font-weight: 700;
      color: #666;
      margin-bottom: 16px;
      display: flex;
      justify-content: space-between;
    }
    
    .chart-img {
      width: 100%;
      height: auto;
      border-radius: 12px;
    }

    .footer {
      border-top: 1px solid #eee;
      padding-top: 20px;
      margin-top: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #bbb;
      font-size: 10px;
    }
  </style>
</head>
<body>
  <div class="cover-page">
    <div class="cover-logo"><span>C</span></div>
    <div class="report-badge">${t("Beslenme Raporu")}</div>
    <h1 class="report-title">${t("Performans Analizi")}</h1>
    <div class="user-info">${escapeHtml(name)} • ${escapeHtml(rangeLabel)}</div>
    
    <div class="score-container">
      <div class="score-ring">
        <div class="score-value">${report.adherenceScore}</div>
        <div class="score-label">${t("Uyum Skoru")}</div>
      </div>
    </div>
    
    <div class="cover-stats">
      <div class="cover-stat-item">
        <h4>${t("Toplam Kalori")}</h4>
        <p>${formatNumber(report.totals.caloriesIn)}</p>
      </div>
      <div class="cover-stat-item">
        <h4>${t("Aktif Günler")}</h4>
        <p>${report.activeDays} / ${report.rangeDays}</p>
      </div>
      <div class="cover-stat-item">
        <h4>${t("Kayıt Sayısı")}</h4>
        <p>${report.entryCount}</p>
      </div>
    </div>
  </div>

  <div class="page-content" style="padding: 20mm;">
    <div class="page-header">
      <div class="page-header-logo">Cal AI</div>
      <div class="page-header-info">${escapeHtml(name)} • ${new Date().toLocaleDateString("tr-TR")}</div>
    </div>

    <div class="section">
      <div class="section-header">
        <div class="section-icon">✨</div>
        <h2 class="section-title">${t("Kişisel Analiz ve Motivasyon")}</h2>
      </div>
      <div class="insight-card">
        <div class="insight-text">${escapeHtml(report.comment)}</div>
      </div>
    </div>

    <div class="section">
      <div class="section-header">
        <div class="section-icon">📊</div>
        <h2 class="section-title">${t("Genel Performans Özeti")}</h2>
      </div>
      <div class="stat-grid">
        <div class="stat-card">
          <div class="stat-card-label">${t("Ort. Kalori")}</div>
          <div class="stat-card-value">${formatNumber(report.averages.caloriesIn)} <span class="stat-card-unit">kcal</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-card-label">${t("Net Değişim")}</div>
          <div class="stat-card-value">${formatNumber(report.totals.netCalories)} <span class="stat-card-unit">kcal</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-card-label">${t("Su Tüketimi")}</div>
          <div class="stat-card-value">${formatNumber(report.totals.waterMl)} <span class="stat-card-unit">ml</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-card-label">${t("Aktivite Süresi")}</div>
          <div class="stat-card-value">${formatNumber(report.totals.activityMin)} <span class="stat-card-unit">dk</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-card-label">${t("Yürüyüş")}</div>
          <div class="stat-card-value">${formatNumber(report.totals.activityMin)} <span class="stat-card-unit">dk</span></div>
        </div>
        <div class="stat-card">
          <div class="stat-card-label">${t("Öğün Ritmi")}</div>
          <div class="stat-card-value">${report.averages.mealCount} <span class="stat-card-unit">${t(
      "öğün/gün"
    )}</span></div>
        </div>
      </div>
    </div>

    ${
      report.effectiveDays.length > 0
        ? `
    <div class="section">
      <div class="section-header">
        <div class="section-icon">🏆</div>
        <h2 class="section-title">${t("Zirve Günler")}</h2>
      </div>
      <div class="stat-grid">
        ${report.effectiveDays
          .map(
            (day) => `
          <div class="stat-card" style="text-align: center; background: #fdfaf5">
            <div class="stat-card-label">${formatShortDate(day.date)}</div>
            <div class="stat-card-value" style="justify-content: center; color: #ff7a00">%${
              day.score
            }</div>
            <div style="font-size: 10px; color: #999; margin-top: 8px;">${formatNumber(
              day.caloriesIn
            )} kcal • ${day.activityMin} dk</div>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
    `
        : ""
    }

    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
      <div class="section">
        <div class="section-header">
          <div class="section-icon">🍎</div>
          <h2 class="section-title">${t("Beslenme Tercihleri")}</h2>
        </div>
        <div class="stat-card" style="padding: 10px 20px;">
          ${
            report.topFoods.length > 0
              ? report.topFoods
                  .map(
                    (food) => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f6f6f6;">
              <div style="font-size: 14px; font-weight: 600;">${escapeHtml(food.name)}</div>
              <div style="font-size: 13px; font-weight: 700; color: #ff7a00;">${formatNumber(
                food.calories
              )} kcal</div>
            </div>
          `
                  )
                  .join("")
              : `<p style="padding: 20px 0; color: #999; font-size: 13px;">${t(
                  "Henüz veri yok"
                )}</p>`
          }
        </div>
      </div>
      <div class="section">
        <div class="section-header">
          <div class="section-icon">🏃</div>
          <h2 class="section-title">${t("Aktivite Özeti")}</h2>
        </div>
        <div class="stat-card" style="padding: 10px 20px;">
          ${
            report.topActivities.length > 0
              ? report.topActivities
                  .map(
                    (act) => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 0; border-bottom: 1px solid #f6f6f6;">
              <div style="font-size: 14px; font-weight: 600;">${escapeHtml(
                act.activityType
              )}</div>
              <div style="font-size: 13px; font-weight: 700; color: #ff7a00;">${
                act.durationMin
              } dk</div>
            </div>
          `
                  )
                  .join("")
              : `<p style="padding: 20px 0; color: #999; font-size: 13px;">${t(
                  "Henüz veri yok"
                )}</p>`
          }
        </div>
      </div>
    </div>

    <div class="section" style="page-break-before: always;">
      <div class="section-header">
        <div class="section-icon">📈</div>
        <h2 class="section-title">${t("Görsel Veri Analizi")}</h2>
      </div>
      ${charts
        .map(
          (chart) => `
        <div class="chart-container">
          <div class="chart-header">
            <span>${escapeHtml(chart.title)}</span>
            <span class="pill pill-accent">${rangeLabel}</span>
          </div>
          <img src="${chart.dataUrl}" class="chart-img" />
        </div>
      `
        )
        .join("")}
    </div>

    <div class="section">
      <div class="section-header">
        <div class="section-icon">📅</div>
        <h2 class="section-title">${t("Haftalık Karşılaştırma")}</h2>
      </div>
      <table class="modern-table">
        <thead>
          <tr>
            <th>${t("Dönem")}</th>
            <th>${t("Uyum")}</th>
            <th>${t("Kalori")}</th>
            <th>${t("Su")}</th>
            <th>${t("Aktivite")}</th>
          </tr>
        </thead>
        <tbody>
          ${report.weekly
            .map(
              (week) => `
            <tr>
              <td><strong>${formatShortDate(week.weekStart)}</strong></td>
              <td style="color: #ff7a00; font-weight: 700;">%${week.adherenceScore}</td>
              <td>${formatDelta(week.deltas.caloriesIn, "kcal")}</td>
              <td>${formatDelta(week.deltas.waterMl, "ml")}</td>
              <td>${formatDelta(week.deltas.activityMin, "dk")}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>

    <div class="section" style="page-break-before: always;">
      <div class="section-header">
        <div class="section-icon">📝</div>
        <h2 class="section-title">${t("Günlük Veri Kayıtları")}</h2>
      </div>
      <table class="modern-table" style="font-size: 11px;">
        <thead>
          <tr>
            <th>${t("Tarih")}</th>
            <th>${t("Kalori")}</th>
            <th>${t("Yakılan")}</th>
            <th>${t("Su")}</th>
            <th>${t("Akt.")}</th>
            <th>P</th>
            <th>K</th>
            <th>Y</th>
          </tr>
        </thead>
        <tbody>
          ${report.daily
            .map(
              (day) => `
            <tr>
              <td>${formatShortDate(day.date)}</td>
              <td>${formatNumber(day.caloriesIn)}</td>
              <td>${formatNumber(day.caloriesOut)}</td>
              <td>${formatNumber(day.waterMl)}</td>
              <td>${day.activityMin}</td>
              <td>${formatNumber(day.proteinG)}g</td>
              <td>${formatNumber(day.carbsG)}g</td>
              <td>${formatNumber(day.fatG)}g</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>

    <div class="footer">
      <div>CAL AI • ANALYTICS ENGINE v2.0</div>
      <div>${new Date().getFullYear()} © Cal AI. Tüm hakları saklıdır.</div>
    </div>
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
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="flex flex-col items-center justify-center bg-gradient-to-br from-amber-50/50 to-white py-10 lg:col-span-1">
            <div className="relative mb-4 flex h-40 w-40 flex-col items-center justify-center rounded-full border-[6px] border-[#ff7a00] bg-white shadow-xl shadow-amber-900/5">
              <span className="text-5xl font-black text-[#ff7a00]">%{report.adherenceScore}</span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{t("Uyum Skoru")}</span>
            </div>
            <div className="text-center">
              <p className="text-sm font-semibold text-ink">{t("Performans Durumu")}</p>
              <p className="text-xs text-muted-foreground">{rangeLabel}</p>
            </div>
          </Card>

          <Card className="lg:col-span-2 space-y-6">
            <div className="space-y-2 text-center sm:text-left">
              <p className="text-sm font-bold uppercase tracking-widest text-[#ff7a00]">{t("Analiz Notu")}</p>
              <p className="text-lg font-medium leading-relaxed text-ink italic">"{report.comment}"</p>
              <p className="text-xs text-muted-foreground">
                {t("Aktif gün: {active}/{range} • Toplam kayıt: {count}", {
                  active: report.activeDays,
                  range: report.rangeDays,
                  count: report.entryCount,
                })}
              </p>
            </div>
            
            <div className="grid gap-3 sm:grid-cols-3 text-center">
              <div className="rounded-2xl bg-amber-50/40 p-3 border border-amber-100/50">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">{t("Toplam Kalori")}</p>
                <p className="text-xl font-bold text-ink mt-1">{formatNumber(report.totals.caloriesIn)}</p>
                <p className="text-[10px] text-muted-foreground">kcal</p>
              </div>
              <div className="rounded-2xl bg-amber-50/40 p-3 border border-amber-100/50">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">{t("Günlük Ort.")}</p>
                <p className="text-xl font-bold text-ink mt-1">{formatNumber(report.averages.caloriesIn)}</p>
                <p className="text-[10px] text-muted-foreground">kcal</p>
              </div>
              <div className="rounded-2xl bg-amber-50/40 p-3 border border-amber-100/50">
                <p className="text-[10px] uppercase font-bold text-muted-foreground">{t("Net Kalori")}</p>
                <p className="text-xl font-bold text-ink mt-1">{formatNumber(report.totals.netCalories)}</p>
                <p className="text-[10px] text-muted-foreground">kcal</p>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-amber-100 bg-white px-4 py-4 shadow-sm">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("Su Tüketimi")}</p>
            <p className="mt-2 text-2xl font-bold text-ink">
              {t("{value} ml", { value: formatNumber(report.totals.waterMl) })}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">
              {t("Günlük ort. {value} ml", { value: formatNumber(report.averages.waterMl) })}
            </p>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-white px-4 py-4 shadow-sm">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("Aktivite")}</p>
            <p className="mt-2 text-2xl font-bold text-ink">
              {t("{value} dk", { value: formatNumber(report.totals.activityMin) })}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">
              {t("Günlük ort. {value} dk", { value: formatNumber(report.averages.activityMin) })}
            </p>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-white px-4 py-4 shadow-sm">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("Öğün Ritmi")}</p>
            <p className="mt-2 text-2xl font-bold text-ink">
              {t("{value} öğün/gün", { value: formatNumber(report.averages.mealCount) })}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">
              {t("Toplam {value} öğün", { value: formatNumber(report.totals.mealCount) })}
            </p>
          </div>
          <div className="rounded-2xl border border-amber-100 bg-white px-4 py-4 shadow-sm">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">{t("Ort. Protein")}</p>
            <p className="mt-2 text-2xl font-bold text-ink">
              {t("{value} g", { value: formatNumber(report.averages.proteinG) })}
            </p>
            <p className="text-[10px] text-muted-foreground mt-1">
              {t("K {carb} • Y {fat}", {
                carb: formatNumber(report.averages.carbsG),
                fat: formatNumber(report.averages.fatG),
              })}
            </p>
          </div>
        </div>

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
        <div className="grid gap-6 lg:grid-cols-2">
          <Card className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">🍎</div>
              <div>
                <p className="text-sm font-bold text-ink">{t("Öne Çıkan Öğünler")}</p>
                <p className="text-xs text-muted-foreground">{t("En çok kalori getiren seçimler")}</p>
              </div>
            </div>
            {report.topFoods.length === 0 ? (
              <p className="text-xs text-muted-foreground py-4 text-center">{t("Henüz öğün kaydı yok.")}</p>
            ) : (
              <div className="divide-y divide-amber-50">
                {report.topFoods.map((food) => (
                  <div key={food.name} className="flex items-center justify-between py-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-ink truncate max-w-[180px]">{food.name}</span>
                      <span className="text-[10px] text-muted-foreground">{food.count} {t("kez tüketildi")}</span>
                    </div>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                      {formatNumber(food.calories)} kcal
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">🏃</div>
              <div>
                <p className="text-sm font-bold text-ink">{t("Öne Çıkan Aktiviteler")}</p>
                <p className="text-xs text-muted-foreground">{t("Hareket yoğunluğu özeti")}</p>
              </div>
            </div>
            {report.topActivities.length === 0 ? (
              <p className="text-xs text-muted-foreground py-4 text-center">{t("Henüz aktivite kaydı yok.")}</p>
            ) : (
              <div className="divide-y divide-amber-50">
                {report.topActivities.map((activity) => (
                  <div key={activity.activityType} className="flex items-center justify-between py-3">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-ink">
                        {activityLabels[activity.activityType as ActivityType] ?? t("Aktivite")}
                      </span>
                      <span className="text-[10px] text-muted-foreground">{formatNumber(activity.durationMin)} {t("dakika")}</span>
                    </div>
                    <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                      {formatNumber(activity.calories)} kcal
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
