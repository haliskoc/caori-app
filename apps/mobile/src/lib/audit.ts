import { all, run } from "@/db";
import { createId } from "@/lib/id";

export type AuditEvent = {
  id: string;
  action: string;
  detail: string;
  meta?: Record<string, unknown> | null;
  timestamp: string;
};

export async function loadAuditLog(userId: string): Promise<AuditEvent[]> {
  const rows = await all<any>(
    "SELECT * FROM audit_log WHERE user_id = ? ORDER BY timestamp DESC",
    [userId]
  );
  return rows.map((row) => ({
    id: row.id,
    action: row.action,
    detail: row.detail,
    meta: row.meta ? JSON.parse(row.meta) : null,
    timestamp: row.timestamp,
  }));
}

export async function appendAuditEvent(
  userId: string,
  input: Omit<AuditEvent, "id" | "timestamp"> & { timestamp?: string }
) {
  const event: AuditEvent = {
    id: createId("audit"),
    action: input.action,
    detail: input.detail,
    meta: input.meta ?? null,
    timestamp: input.timestamp ?? new Date().toISOString(),
  };

  await run(
    `INSERT INTO audit_log (id, user_id, action, detail, meta, timestamp, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)` ,
    [
      event.id,
      userId,
      event.action,
      event.detail,
      event.meta ? JSON.stringify(event.meta) : null,
      event.timestamp,
      new Date().toISOString(),
    ]
  );

  return event;
}

export async function clearAuditLog(userId: string) {
  await run("DELETE FROM audit_log WHERE user_id = ?", [userId]);
}
