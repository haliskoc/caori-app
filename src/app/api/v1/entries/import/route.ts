import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { entries, users } from "@/lib/schema";
import { getDb } from "@/lib/db";
import { createId } from "@/lib/utils";

function toNumber(value: unknown) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : 0;
}

async function ensureUser(user: { sub: string; email?: string; name?: string }) {
  const db = getDb();
  await db
    .insert(users)
    .values({ id: user.sub, email: user.email ?? null, name: user.name ?? null })
    .onConflictDoUpdate({
      target: users.id,
      set: { email: user.email ?? null, name: user.name ?? null },
    });
}

export async function POST(request: Request) {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const items = Array.isArray(body) ? body : body?.entries;
  if (!Array.isArray(items)) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  await ensureUser(session.user);
  const db = getDb();

  const prepared = items.map((item) => {
    const type = String(item?.type ?? "");
    const timestamp = item?.timestamp ? new Date(item.timestamp) : new Date();
    return {
      id: item?.id ? String(item.id) : createId(),
      userId: session.user.sub,
      type,
      name: type === "food" ? String(item?.name ?? "Belirtilmedi") : null,
      calories: type === "food" ? toNumber(item?.calories) : null,
      mealType: type === "food" ? String(item?.mealType ?? "snack") : null,
      amountMl: type === "water" ? toNumber(item?.amountMl) : null,
      activityType: type === "activity" ? String(item?.activityType ?? "walking") : null,
      durationMin: type === "activity" ? toNumber(item?.durationMin) : null,
      estimatedCalories: type === "activity" ? toNumber(item?.estimatedCalories) : null,
      timestamp: Number.isNaN(timestamp.getTime()) ? new Date() : timestamp,
    };
  });

  if (prepared.length === 0) {
    return NextResponse.json({ imported: 0 });
  }

  await db.insert(entries).values(prepared).onConflictDoNothing();
  return NextResponse.json({ imported: prepared.length });
}
