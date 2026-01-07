import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { getDb, ensureUser } from "@/lib/db";
import { auditLog } from "@/lib/schema";
import { desc, eq } from "drizzle-orm";
import { createId } from "@/lib/utils";
import type { AuditEvent } from "@/lib/audit";

const MAX_AUDIT = 150;

export async function GET() {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureUser(session.user);
  const db = getDb();
  const rows = await db
    .select()
    .from(auditLog)
    .where(eq(auditLog.userId, session.user.sub))
    .orderBy(desc(auditLog.timestamp))
    .limit(MAX_AUDIT);

  const events: AuditEvent[] = rows.map((row) => ({
    id: row.id,
    action: row.action as AuditEvent["action"],
    timestamp: row.timestamp.toISOString(),
    detail: row.detail,
    meta: (row.meta as AuditEvent["meta"]) ?? undefined,
  }));

  return NextResponse.json(events);
}

export async function POST(request: Request) {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as Partial<AuditEvent>;
  if (!body?.action || !body?.detail) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  await ensureUser(session.user);
  const db = getDb();
  const event: AuditEvent = {
    id: body.id ?? createId(),
    action: body.action,
    detail: body.detail,
    timestamp: body.timestamp ?? new Date().toISOString(),
    meta: body.meta,
  };

  const [row] = await db
    .insert(auditLog)
    .values({
      id: event.id,
      userId: session.user.sub,
      action: event.action,
      detail: event.detail,
      meta: event.meta ?? null,
      timestamp: new Date(event.timestamp),
    })
    .returning();

  return NextResponse.json(row ? event : null, { status: 201 });
}

export async function DELETE() {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureUser(session.user);
  const db = getDb();
  await db.delete(auditLog).where(eq(auditLog.userId, session.user.sub));
  return NextResponse.json({ ok: true });
}
