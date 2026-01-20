import { shareAsync, isAvailableAsync } from "expo-sharing";
import * as Print from "expo-print";
import { Alert, Platform } from "react-native";
import { t } from "@calai/shared";

const CSV_HEADERS = [
  "date",
  "type",
  "name",
  "calories",
  "amountMl",
  "amountG",
  "proteinG",
  "carbsG",
  "fatG",
  "mealType",
  "activityType",
  "durationMin",
  "estimatedCalories",
  "note",
];

function toCsvValue(value: unknown) {
  if (value === null || value === undefined) return "";
  const text = String(value);
  if (text.includes(",") || text.includes("\"") || text.includes("\n")) {
    return `"${text.replaceAll("\"", "\"\"")}"`;
  }
  return text;
}

function buildCsv(rows: Record<string, unknown>[]) {
  const lines = [CSV_HEADERS.join(",")];
  rows.forEach((row) => {
    const line = CSV_HEADERS.map((header) => toCsvValue(row[header])).join(",");
    lines.push(line);
  });
  return lines.join("\n");
}

// Exports entries to CSV and shares them
export async function exportEntriesToCSV(entries: any[]) {
  try {
    if (!entries || entries.length === 0) {
      Alert.alert(t("Uyarı"), t("Dışa aktarılacak kayıt bulunamadı."));
      return;
    }

    const rows = entries.map((entry: any) => ({
      ...entry,
      date: entry?.timestamp ? String(entry.timestamp).slice(0, 10) : "",
    }));
    const csv = buildCsv(rows);

    // Create a data URI for the CSV
    const dataUri = `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;

    if (!(await isAvailableAsync())) {
      Alert.alert(
        t("Paylaşım kullanılamıyor"),
        t("Bu cihazda paylaşım desteklenmiyor.")
      );
      return;
    }

    await shareAsync(dataUri, {
      mimeType: "text/csv",
      dialogTitle: t("CSV Dışa Aktar"),
      UTI: "public.comma-separated-values-text",
    });
  } catch (error) {
    console.error("Export error:", error);
    Alert.alert(t("Dışa aktarma başarısız"), t("Lütfen tekrar deneyin."));
  }
}

// Alias for backward compatibility
export const exportEntriesToCsv = exportEntriesToCSV;

// CSV içe aktarma fonksiyonu
function parseCsvLine(line: string): string[] {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

export function importEntriesFromCSV(csvContent: string): any[] {
  const lines = csvContent.split(/\r?\n/).filter((line) => line.trim());
  if (lines.length < 2) return [];

  const headers = parseCsvLine(lines[0]);
  const entries: any[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCsvLine(lines[i]);
    if (values.length !== headers.length) continue;

    const entry: Record<string, any> = {};
    headers.forEach((header, index) => {
      const value = values[index]?.trim() || "";

      // Sayısal alanları dönüştür
      if (["calories", "amountMl", "amountG", "proteinG", "carbsG", "fatG", "durationMin", "estimatedCalories"].includes(header)) {
        entry[header] = value ? Number(value) : 0;
      } else {
        entry[header] = value;
      }
    });

    // Gerekli alanları kontrol et
    if (entry.type && (entry.type === "food" || entry.type === "water" || entry.type === "activity")) {
      // Timestamp oluştur
      if (entry.date && !entry.timestamp) {
        entry.timestamp = new Date(entry.date).toISOString();
      }
      // ID oluştur
      if (!entry.id) {
        entry.id = `import_${Date.now()}_${i}`;
      }
      entries.push(entry);
    }
  }

  return entries;
}

// Alias
export const importEntriesFromCsv = importEntriesFromCSV;

// PDF Export Function
export interface ExportOptions {
  format?: 'csv' | 'pdf';
  includeSummary?: boolean;
  dateRange?: { start: string; end: string };
}

export async function exportEntriesToPDF(entries: any[], options: ExportOptions = {}) {
  try {
    if (!entries || entries.length === 0) {
      Alert.alert(t("Uyarı"), t("Dışa aktarılacak kayıt bulunamadı."));
      return;
    }

    // Calculate summaries
    const totalCalories = entries.reduce((sum, e) => sum + (e.calories || 0), 0);
    const totalWater = entries.reduce((sum, e) => sum + (e.amountMl || 0), 0);
    const totalProtein = entries.reduce((sum, e) => sum + (e.proteinG || 0), 0);
    const totalCarbs = entries.reduce((sum, e) => sum + (e.carbsG || 0), 0);
    const totalFat = entries.reduce((sum, e) => sum + (e.fatG || 0), 0);

    // Group entries by type
    const foodEntries = entries.filter((e: any) => e.type === 'food');
    const waterEntries = entries.filter((e: any) => e.type === 'water');
    const activityEntries = entries.filter((e: any) => e.type === 'activity');

    // Generate HTML for PDF
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              padding: 24px;
              background: #f7fffb;
              color: #111827;
            }
            .header {
              text-align: center;
              margin-bottom: 24px;
              padding-bottom: 16px;
              border-bottom: 2px solid #10b981;
            }
            h1 {
              color: #10b981;
              font-size: 28px;
              font-weight: 900;
              margin-bottom: 8px;
            }
            .date {
              color: #6b7280;
              font-size: 14px;
              font-weight: 600;
            }
            .summary {
              background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
              border-radius: 16px;
              padding: 20px;
              margin-bottom: 24px;
              border: 1px solid #10b98120;
            }
            .summary h2 {
              color: #065f46;
              font-size: 16px;
              font-weight: 800;
              margin-bottom: 16px;
            }
            .summary-grid {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
              gap: 12px;
            }
            .summary-item {
              background: white;
              padding: 12px;
              border-radius: 12px;
              text-align: center;
            }
            .summary-label {
              font-size: 11px;
              font-weight: 700;
              color: #6b7280;
              text-transform: uppercase;
              margin-bottom: 4px;
            }
            .summary-value {
              font-size: 20px;
              font-weight: 900;
              color: #10b981;
            }
            .summary-unit {
              font-size: 12px;
              font-weight: 600;
              color: #9ca3af;
            }
            .section {
              background: white;
              border-radius: 16px;
              padding: 20px;
              margin-bottom: 20px;
              border: 1px solid #e5e7eb;
            }
            .section-title {
              font-size: 16px;
              font-weight: 800;
              color: #111827;
              margin-bottom: 16px;
              padding-bottom: 12px;
              border-bottom: 1px solid #f3f4f6;
            }
            table {
              width: 100%;
              border-collapse: collapse;
            }
            th {
              background: #f0fdf4;
              padding: 12px;
              text-align: left;
              font-weight: 700;
              font-size: 12px;
              color: #065f46;
              text-transform: uppercase;
              border-bottom: 2px solid #10b981;
            }
            td {
              padding: 12px;
              border-bottom: 1px solid #f3f4f6;
              font-size: 13px;
              color: #374151;
            }
            tr:last-child td {
              border-bottom: none;
            }
            .badge {
              display: inline-block;
              padding: 4px 10px;
              border-radius: 8px;
              font-size: 11px;
              font-weight: 700;
            }
            .badge-food { background: #fef3c7; color: #92400e; }
            .badge-water { background: #dbeafe; color: #1e40af; }
            .badge-activity { background: #dcfce7; color: #166534; }
            .footer {
              text-align: center;
              margin-top: 24px;
              padding-top: 16px;
              border-top: 1px solid #e5e7eb;
              color: #9ca3af;
              font-size: 11px;
              font-weight: 600;
            }
            @media print {
              body { padding: 16px; }
              .section { page-break-inside: avoid; }
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>📊 Cal AI Raporu</h1>
            <p class="date">${new Date().toLocaleDateString('tr-TR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div class="summary">
            <h2>📈 Özet</h2>
            <div class="summary-grid">
              <div class="summary-item">
                <div class="summary-label">Toplam Kalori</div>
                <div class="summary-value">${totalCalories.toLocaleString()}</div>
                <div class="summary-unit">kcal</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Su Tüketimi</div>
                <div class="summary-value">${totalWater.toLocaleString()}</div>
                <div class="summary-unit">ml</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Protein</div>
                <div class="summary-value">${Math.round(totalProtein)}</div>
                <div class="summary-unit">gram</div>
              </div>
              <div class="summary-item">
                <div class="summary-label">Karbonhidrat</div>
                <div class="summary-value">${Math.round(totalCarbs)}</div>
                <div class="summary-unit">gram</div>
              </div>
            </div>
          </div>

          ${foodEntries.length > 0 ? `
          <div class="section">
            <div class="section-title">🍽️ Yiyecek Kayıtları (${foodEntries.length})</div>
            <table>
              <thead>
                <tr>
                  <th>Tarih</th>
                  <th>İsim</th>
                  <th>Öğün</th>
                  <th>Kalori</th>
                  <th>Makro (P/K/Y)</th>
                </tr>
              </thead>
              <tbody>
                ${foodEntries.map((e: any) => `
                  <tr>
                    <td>${new Date(e.timestamp).toLocaleDateString('tr-TR')}</td>
                    <td>${e.name || '-'}</td>
                    <td>${e.mealType || '-'}</td>
                    <td>${e.calories || 0} kcal</td>
                    <td>${(e.proteinG || 0)}g / ${(e.carbsG || 0)}g / ${(e.fatG || 0)}g</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ` : ''}

          ${waterEntries.length > 0 ? `
          <div class="section">
            <div class="section-title">💧 Su Kayıtları (${waterEntries.length})</div>
            <table>
              <thead>
                <tr>
                  <th>Tarih</th>
                  <th>Miktar</th>
                </tr>
              </thead>
              <tbody>
                ${waterEntries.map((e: any) => `
                  <tr>
                    <td>${new Date(e.timestamp).toLocaleDateString('tr-TR')}</td>
                    <td>${e.amountMl || 0} ml</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ` : ''}

          ${activityEntries.length > 0 ? `
          <div class="section">
            <div class="section-title">🏃 Aktivite Kayıtları (${activityEntries.length})</div>
            <table>
              <thead>
                <tr>
                  <th>Tarih</th>
                  <th>Aktivite</th>
                  <th>Süre</th>
                  <th>Kalori</th>
                </tr>
              </thead>
              <tbody>
                ${activityEntries.map((e: any) => `
                  <tr>
                    <td>${new Date(e.timestamp).toLocaleDateString('tr-TR')}</td>
                    <td>${e.activityType || '-'}</td>
                    <td>${e.durationMin || 0} dakika</td>
                    <td>${e.estimatedCalories || 0} kcal</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
          ` : ''}

          <div class="footer">
            <p>Cal AI ile oluşturuldu • ${new Date().toLocaleDateString('tr-TR')}</p>
          </div>
        </body>
      </html>
    `;

    // Generate PDF
    const { uri } = await Print.printToFileAsync({ html });

    // Check if sharing is available
    if (!(await isAvailableAsync())) {
      Alert.alert(
        t("Paylaşım Hatası"),
        t("Bu cihazda paylaşım desteklenmiyor.")
      );
      return;
    }

    // Share the PDF
    await shareAsync(uri, {
      mimeType: "application/pdf",
      dialogTitle: t("PDF Dışa Aktar"),
      UTI: "com.adobe.pdf",
    });
  } catch (error) {
    console.error("PDF Export error:", error);
    Alert.alert(t("Dışa aktarma başarısız"), t("Lütfen tekrar deneyin."));
  }
}

// Unified export function
export async function exportEntries(entries: any[], options: ExportOptions = {}) {
  const { format = 'csv' } = options;

  if (format === 'pdf') {
    return exportEntriesToPDF(entries, options);
  } else {
    return exportEntriesToCSV(entries);
  }
}
