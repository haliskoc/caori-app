import type { MeasurementEntry, MeasurementType } from "@calai/shared/types";
import { all, run } from "@/db";
import { createId } from "@/lib/id";

export const measurementLabels: Record<MeasurementType, string> = {
  weight: "Kilo",
  waist: "Bel",
  hip: "Kalça",
  chest: "Göğüs",
  bodyFat: "Vücut Yağ %",
};

export const measurementUnits: Record<MeasurementType, string> = {
  weight: "kg",
  waist: "cm",
  hip: "cm",
  chest: "cm",
  bodyFat: "%",
};

function isValidType(value: unknown): value is MeasurementType {
  return (
    value === "weight" ||
    value === "waist" ||
    value === "hip" ||
    value === "chest" ||
    value === "bodyFat"
  );
}

export function normalizeMeasurement(entry: Partial<MeasurementEntry>): MeasurementEntry | null {
  if (!entry.id || !isValidType(entry.type)) {
    return null;
  }
  const value = Number(entry.value);
  if (!Number.isFinite(value) || value <= 0) {
    return null;
  }
  const timestampDate = entry.timestamp ? new Date(entry.timestamp) : new Date();
  const timestamp = Number.isNaN(timestampDate.getTime())
    ? new Date().toISOString()
    : timestampDate.toISOString();
  const unit = entry.unit || measurementUnits[entry.type];

  return {
    id: entry.id,
    type: entry.type,
    value,
    unit,
    timestamp,
  };
}

function rowToMeasurement(row: any): MeasurementEntry | null {
  if (!row?.id || !isValidType(row.type)) return null;
  return {
    id: row.id,
    type: row.type,
    value: row.value,
    unit: row.unit,
    timestamp: row.timestamp,
  };
}

export async function getMeasurements(userId: string): Promise<MeasurementEntry[]> {
  const rows = await all<any>(
    "SELECT * FROM measurements WHERE user_id = ? ORDER BY timestamp DESC",
    [userId]
  );
  return rows.map(rowToMeasurement).filter((entry): entry is MeasurementEntry => Boolean(entry));
}

export async function addMeasurement(
  userId: string,
  input: Omit<MeasurementEntry, "id"> & { id?: string }
) {
  const entry: MeasurementEntry = {
    id: input.id || createId("measure"),
    type: input.type,
    value: input.value,
    unit: input.unit || measurementUnits[input.type],
    timestamp: input.timestamp ? new Date(input.timestamp).toISOString() : new Date().toISOString(),
  };

  await run(
    `INSERT INTO measurements (id, user_id, type, value, unit, timestamp, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)` ,
    [
      entry.id,
      userId,
      entry.type,
      entry.value,
      entry.unit,
      entry.timestamp,
      new Date().toISOString(),
    ]
  );

  return entry;
}

export async function updateMeasurement(userId: string, entry: MeasurementEntry) {
  await run(
    `UPDATE measurements SET value = ?, unit = ?, timestamp = ?
     WHERE id = ? AND user_id = ?` ,
    [entry.value, entry.unit, entry.timestamp, entry.id, userId]
  );
}

export async function removeMeasurement(userId: string, id: string) {
  await run("DELETE FROM measurements WHERE id = ? AND user_id = ?", [id, userId]);
}
