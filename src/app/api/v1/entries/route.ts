import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { desc, eq } from "drizzle-orm";
import { entries, users } from "@/lib/schema";
import { getDb, ensureUser } from "@/lib/db";
import { createId } from "@/lib/utils";

function toNumber(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

export async function GET() {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureUser(session.user);
  const db = getDb();
  const data = await db
    .select()
    .from(entries)
    .where(eq(entries.userId, session.user.sub))
    .orderBy(desc(entries.timestamp));

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const type = body?.type as string;
  if (!type) {
    return NextResponse.json({ error: "Missing type" }, { status: 400 });
  }

  const timestamp = body?.timestamp ? new Date(body.timestamp) : new Date();
  if (Number.isNaN(timestamp.getTime())) {
    return NextResponse.json({ error: "Invalid timestamp" }, { status: 400 });
  }

  await ensureUser(session.user);
  const db = getDb();

  const entry = {
    id: createId(),
    userId: session.user.sub,
    type,
    name: type === "food" ? String(body?.name ?? "Belirtilmedi") : null,
    calories: type === "food" ? toNumber(body?.calories) : null,
    mealType: type === "food" ? String(body?.mealType ?? "snack") : null,
    amountMl: type === "water" ? toNumber(body?.amountMl) : null,
    activityType: type === "activity" ? String(body?.activityType ?? "walking") : null,
    durationMin: type === "activity" ? toNumber(body?.durationMin) : null,
    estimatedCalories: type === "activity" ? toNumber(body?.estimatedCalories) : null,
    timestamp,
  };

  const [created] = await db.insert(entries).values(entry).returning();
  return NextResponse.json(created, { status: 201 });
}
