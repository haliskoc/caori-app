import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { Alert } from "react-native";
import api from "../api/axios-instance";
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

export async function exportEntriesToCsv() {
  try {
    const response = await api.get("/entries");
    const entries = response.data || [];
    const rows = entries.map((entry: any) => ({
      ...entry,
      date: entry?.timestamp ? String(entry.timestamp).slice(0, 10) : "",
    }));
    const csv = buildCsv(rows);

    const fileName = `calai-entries-${Date.now()}.csv`;
    const fileUri = `${FileSystem.cacheDirectory}${fileName}`;
    await FileSystem.writeAsStringAsync(fileUri, csv, {
      encoding: FileSystem.EncodingType.UTF8,
    });

    if (!(await Sharing.isAvailableAsync())) {
      Alert.alert(t("Paylaşım kullanılamıyor"), t("Dosya cihazda oluşturuldu: {file}", { file: fileName }));
      return;
    }

    await Sharing.shareAsync(fileUri, {
      mimeType: "text/csv",
      dialogTitle: t("CSV Dışa Aktar"),
      UTI: "public.comma-separated-values-text",
    });
  } catch (error) {
    Alert.alert(t("Dışa aktarma başarısız"), t("Lütfen tekrar deneyin."));
  }
}
