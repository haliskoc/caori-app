import { ActivityType, Entry, MealType } from "./types";
import { createId } from "./utils";

function normalizeHeader(value: string) {
  return value.trim().toLowerCase();
}

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (char === "\"") {
      if (inQuotes && nextChar === "\"") {
        current += "\"";
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (!inQuotes && (char === "," || char === "\n" || char === "\r")) {
      if (char === "," ) {
        row.push(current);
        current = "";
      } else {
        row.push(current);
        current = "";
        if (row.some((cell) => cell.trim() !== "")) {
          rows.push(row);
        }
        row = [];
        if (char === "\r" && nextChar === "\n") {
          i += 1;
        }
      }
      continue;
    }

    current += char;
  }

  if (current.length > 0 || row.length > 0) {
    row.push(current);
    if (row.some((cell) => cell.trim() !== "")) {
      rows.push(row);
    }
  }

  return rows;
}

export function entriesFromCsv(rows: string[][]): Entry[] {
  if (rows.length === 0) {
    return [];
  }
  const header = rows[0].map(normalizeHeader);
  const hasHeader = header.includes("type");
  const dataRows = hasHeader ? rows.slice(1) : rows;

  const idx = (name: string) => header.indexOf(name);
  const get = (row: string[], name: string) => {
    const index = idx(name);
    return index >= 0 ? row[index] : "";
  };

  return dataRows
    .map<Entry | null>((row) => {
      const type = (hasHeader ? get(row, "type") : row[1])?.trim();
      if (type !== "food" && type !== "water" && type !== "activity") {
        return null;
      }
      const timestamp = (hasHeader ? get(row, "timestamp") : row[9])?.trim();
      const parsedDate = timestamp ? new Date(timestamp) : new Date();
      const safeTimestamp = Number.isNaN(parsedDate.getTime())
        ? new Date().toISOString()
        : parsedDate.toISOString();

      const id = (hasHeader ? get(row, "id") : row[0])?.trim() || createId();

      if (type === "food") {
        return {
          id,
          type: "food" as const,
          name: (hasHeader ? get(row, "name") : row[2])?.trim() || "Belirtilmedi",
          calories: Number(hasHeader ? get(row, "calories") : row[3]) || 0,
          mealType: ((hasHeader ? get(row, "mealtype") : row[4])?.trim() ||
            "snack") as MealType,
          amountG: Number(hasHeader ? get(row, "amountg") : "") || undefined,
          proteinG: Number(hasHeader ? get(row, "proteing") : "") || undefined,
          carbsG: Number(hasHeader ? get(row, "carbsg") : "") || undefined,
          fatG: Number(hasHeader ? get(row, "fatg") : "") || undefined,
          timestamp: safeTimestamp,
        };
      }
      if (type === "water") {
        return {
          id,
          type: "water" as const,
          amountMl: Number(hasHeader ? get(row, "amountml") : row[5]) || 0,
          timestamp: safeTimestamp,
        };
      }
      return {
        id,
        type: "activity" as const,
        activityType: ((hasHeader ? get(row, "activitytype") : row[6])?.trim() ||
          "walking") as ActivityType,
        durationMin: Number(hasHeader ? get(row, "durationmin") : row[7]) || 0,
        estimatedCalories: Number(hasHeader ? get(row, "estimatedcalories") : row[8]) || 0,
        timestamp: safeTimestamp,
      };
    })
    .filter((entry): entry is Entry => entry !== null);
}

function csvEscape(value: string | number | null | undefined) {
  const str = value === null || value === undefined ? "" : String(value);
  if (str.includes(",") || str.includes("\n") || str.includes("\"")) {
    return `"${str.replace(/"/g, "\"\"")}"`;
  }
  return str;
}

export function entriesToCsv(entries: Entry[]): string {
  const header = [
    "id",
    "type",
    "name",
    "calories",
    "mealType",
    "amountG",
    "proteinG",
    "carbsG",
    "fatG",
    "amountMl",
    "activityType",
    "durationMin",
    "estimatedCalories",
    "timestamp",
  ];

  const lines = [header.join(",")];
  for (const entry of entries) {
    const line = [
      entry.id,
      entry.type,
      entry.type === "food" ? entry.name : "",
      entry.type === "food" ? entry.calories : "",
      entry.type === "food" ? entry.mealType : "",
      entry.type === "food" ? entry.amountG ?? "" : "",
      entry.type === "food" ? entry.proteinG ?? "" : "",
      entry.type === "food" ? entry.carbsG ?? "" : "",
      entry.type === "food" ? entry.fatG ?? "" : "",
      entry.type === "water" ? entry.amountMl : "",
      entry.type === "activity" ? entry.activityType : "",
      entry.type === "activity" ? entry.durationMin : "",
      entry.type === "activity" ? entry.estimatedCalories : "",
      entry.timestamp,
    ].map(csvEscape);
    lines.push(line.join(","));
  }
  return lines.join("\n");
}
