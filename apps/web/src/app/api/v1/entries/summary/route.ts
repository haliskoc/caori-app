import { NextResponse } from "next/server";
import { desc, eq } from "drizzle-orm";
import { entries } from "@/lib/database/schema";
import { getDb, ensureUser } from "@/lib/database/db";
import { getApiPrincipal } from "@/lib/auth/api-auth";
import { buildWeeklySummary, getDayKey } from "@calai/shared";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const principal = await getApiPrincipal(request);
  if (!principal) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureUser({
    sub: principal.userId,
    email: principal.email ?? undefined,
  });
  const db = getDb();
  const data = await db
    .select()
    .from(entries)
    .where(eq(entries.userId, principal.userId))
    .orderBy(desc(entries.timestamp));

  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const dayKey = date ? getDayKey(date) : getDayKey(new Date());
  const summary = buildWeeklySummary(data, 1)[0];
  if (summary) {
    summary.date = dayKey;
  }

  return NextResponse.json(summary ?? null);
}
