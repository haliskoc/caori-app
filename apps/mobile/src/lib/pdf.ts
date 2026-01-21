import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import type { ReportData } from "@/lib/report";

export async function exportReportPdf(report: ReportData) {
  const html = `
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 24px; }
          h1 { font-size: 20px; }
          .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
          .card { padding: 12px; border: 1px solid #e2e8f0; border-radius: 12px; }
          .muted { color: #64748b; font-size: 12px; }
        </style>
      </head>
      <body>
        <h1>Calmet Raporu (${report.rangeDays} gün)</h1>
        <p class="muted">${report.startDate} - ${report.endDate}</p>
        <div class="grid">
          <div class="card"><strong>Kalori In</strong><div>${report.totals.caloriesIn}</div></div>
          <div class="card"><strong>Kalori Out</strong><div>${report.totals.caloriesOut}</div></div>
          <div class="card"><strong>Net</strong><div>${report.totals.netCalories}</div></div>
        </div>
        <h2>İçgörüler</h2>
        ${report.insights.map((insight) => `<div class="card"><strong>${insight.title}</strong><div>${insight.message}</div></div>`).join("")}
      </body>
    </html>
  `;

  const file = await Print.printToFileAsync({ html });
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(file.uri);
  }
  return file.uri;
}
