import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";
import type { Entry } from "@calai/shared/types";

const CSV_HEADER = [
  "id",
  "type",
  "name",
  "calories",
  "mealType",
  "amountMl",
  "activityType",
  "durationMin",
  "estimatedCalories",
  "amountG",
  "proteinG",
  "carbsG",
  "fatG",
  "sleepStart",
  "sleepEnd",
  "quality",
  "note",
  "timestamp",
];

function escapeCsv(value: string | number | null | undefined) {
  if (value === null || value === undefined) return "";
  const text = String(value);
  if (text.includes(",") || text.includes("\n") || text.includes("\"")) {
    return `"${text.replace(/\"/g, '""')}"`;
  }
  return text;
}

export function entriesToCsv(entries: Entry[]) {
  const rows = entries.map((entry) => {
    const base = {
      id: entry.id,
      type: entry.type,
      name: "name" in entry ? (entry as any).name : undefined,
      calories: "calories" in entry ? (entry as any).calories : undefined,
      mealType: "mealType" in entry ? (entry as any).mealType : undefined,
      amountMl: "amountMl" in entry ? (entry as any).amountMl : undefined,
      activityType: "activityType" in entry ? (entry as any).activityType : undefined,
      durationMin: "durationMin" in entry ? (entry as any).durationMin : undefined,
      estimatedCalories: "estimatedCalories" in entry ? (entry as any).estimatedCalories : undefined,
      amountG: "amountG" in entry ? (entry as any).amountG : undefined,
      proteinG: "proteinG" in entry ? (entry as any).proteinG : undefined,
      carbsG: "carbsG" in entry ? (entry as any).carbsG : undefined,
      fatG: "fatG" in entry ? (entry as any).fatG : undefined,
      sleepStart: entry.type === "sleep" ? entry.sleepStart : undefined,
      sleepEnd: entry.type === "sleep" ? entry.sleepEnd : undefined,
      quality: entry.type === "sleep" ? entry.quality : undefined,
      note: entry.type === "sleep" ? entry.note : "note" in entry ? (entry as any).note : undefined,
      timestamp: entry.timestamp,
    };

    return CSV_HEADER.map((key) => escapeCsv((base as any)[key])).join(",");
  });

  return [CSV_HEADER.join(","), ...rows].join("\n");
}

function parseCsvLine(line: string) {
  const result: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];
    if (char === "\"") {
      if (inQuotes && line[i + 1] === "\"") {
        current += "\"";
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }
    if (char === "," && !inQuotes) {
      result.push(current);
      current = "";
      continue;
    }
    current += char;
  }
  result.push(current);
  return result;
}

export function parseEntriesFromCsv(csv: string): Entry[] {
  const lines = csv.split(/\r?\n/).filter(Boolean);
  if (lines.length < 2) return [];
  const header = parseCsvLine(lines[0]);
  const entries: Entry[] = [];

  for (let i = 1; i < lines.length; i += 1) {
    const cols = parseCsvLine(lines[i]);
    const row: Record<string, string> = {};
    header.forEach((key, index) => {
      row[key] = cols[index] ?? "";
    });

    const type = row.type as Entry["type"];
    const timestamp = row.timestamp || new Date().toISOString();

    if (type === "food") {
      entries.push({
        id: row.id,
        type: "food",
        name: row.name || "",
        calories: Number(row.calories || 0),
        mealType: (row.mealType as any) || "snack",
        amountG: row.amountG ? Number(row.amountG) : undefined,
        proteinG: row.proteinG ? Number(row.proteinG) : undefined,
        carbsG: row.carbsG ? Number(row.carbsG) : undefined,
        fatG: row.fatG ? Number(row.fatG) : undefined,
        timestamp,
      });
    } else if (type === "drink") {
      entries.push({
        id: row.id,
        type: "drink",
        name: row.name || "",
        amountMl: Number(row.amountMl || 0),
        calories: Number(row.calories || 0),
        proteinG: row.proteinG ? Number(row.proteinG) : undefined,
        carbsG: row.carbsG ? Number(row.carbsG) : undefined,
        fatG: row.fatG ? Number(row.fatG) : undefined,
        timestamp,
      });
    } else if (type === "water") {
      entries.push({
        id: row.id,
        type: "water",
        amountMl: Number(row.amountMl || 0),
        timestamp,
      });
    } else if (type === "activity") {
      entries.push({
        id: row.id,
        type: "activity",
        activityType: (row.activityType as any) || "walking",
        durationMin: Number(row.durationMin || 0),
        estimatedCalories: Number(row.estimatedCalories || 0),
        note: row.note || undefined,
        timestamp,
      });
    } else if (type === "sleep") {
      entries.push({
        id: row.id,
        type: "sleep",
        sleepStart: row.sleepStart || timestamp,
        sleepEnd: row.sleepEnd || timestamp,
        durationMin: Number(row.durationMin || 0),
        quality: (row.quality as any) || "good",
        note: row.note || undefined,
        timestamp,
      });
    }
  }

  return entries;
}

export async function exportEntriesCsv(entries: Entry[]) {
  const csv = entriesToCsv(entries);
  const fileUri = `${FileSystem.cacheDirectory}calai-entries-${Date.now()}.csv`;
  await FileSystem.writeAsStringAsync(fileUri, csv, {
    encoding: FileSystem.EncodingType.UTF8,
  });
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(fileUri);
  }
  return fileUri;
}

export async function exportEntriesXls(entries: Entry[]) {
  const rows = entries.map((entry) => {
    const cells = [
      entry.id,
      entry.type,
      "name" in entry ? entry.name : "",
      "calories" in entry ? String(entry.calories ?? "") : "",
      "mealType" in entry ? String((entry as any).mealType ?? "") : "",
      "amountMl" in entry ? String((entry as any).amountMl ?? "") : "",
      "activityType" in entry ? String((entry as any).activityType ?? "") : "",
      "durationMin" in entry ? String((entry as any).durationMin ?? "") : "",
      "estimatedCalories" in entry ? String((entry as any).estimatedCalories ?? "") : "",
      "amountG" in entry ? String((entry as any).amountG ?? "") : "",
      "proteinG" in entry ? String((entry as any).proteinG ?? "") : "",
      "carbsG" in entry ? String((entry as any).carbsG ?? "") : "",
      "fatG" in entry ? String((entry as any).fatG ?? "") : "",
      entry.type === "sleep" ? entry.sleepStart : "",
      entry.type === "sleep" ? entry.sleepEnd : "",
      entry.type === "sleep" ? entry.quality : "",
      entry.type === "sleep"
        ? entry.note ?? ""
        : "note" in entry
          ? (entry as any).note ?? ""
          : "",
      entry.timestamp,
    ];
    return `<tr>${cells.map((cell) => `<td>${String(cell).replace(/</g, "&lt;")}</td>`).join("")}</tr>`;
  });

  const html = `
    <table>
      <thead><tr>${CSV_HEADER.map((header) => `<th>${header}</th>`).join("")}</tr></thead>
      <tbody>${rows.join("")}</tbody>
    </table>
  `;

  const fileUri = `${FileSystem.cacheDirectory}calai-entries-${Date.now()}.xls`;
  await FileSystem.writeAsStringAsync(fileUri, html, {
    encoding: FileSystem.EncodingType.UTF8,
  });
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(fileUri);
  }
  return fileUri;
}

export async function pickCsvFile() {
  const result = await DocumentPicker.getDocumentAsync({
    type: "text/csv",
  });
  if (result.canceled) return null;
  const asset = result.assets?.[0];
  if (!asset?.uri) return null;
  return FileSystem.readAsStringAsync(asset.uri, {
    encoding: FileSystem.EncodingType.UTF8,
  });
}
