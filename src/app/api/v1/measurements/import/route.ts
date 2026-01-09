import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { measurements } from "@/lib/schema";
import { getDb, ensureUser } from "@/lib/db";
import { createId } from "@/lib/utils";
import { isSameOrigin, toSafeNumber } from "@/lib/security";

export const dynamic = "force-dynamic";

const allowedTypes = new Set(["weight", "waist", "hip", "chest", "bodyFat"]);
const unitByType: Record<string, string> = {
  weight: "kg",
  waist: "cm",
  hip: "cm",
  chest: "cm",
  bodyFat: "%",
};
const MAX_IMPORT = 300;

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

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
  const prepared = items
    .map((item) => {
      const type = String(item?.type ?? "");
      if (!allowedTypes.has(type)) {
        return null;
      }
      const value = toSafeNumber(item?.value, 0, { min: 0.1, max: 1000 });
      if (!Number.isFinite(value) || value <= 0) {
        return null;
      }
      const timestamp = item?.timestamp ? new Date(item.timestamp) : new Date();
      const safeTimestamp = Number.isNaN(timestamp.getTime()) ? new Date() : timestamp;
      return {
        id: item?.id ? String(item.id) : createId(),
        userId: session.user.sub,
        type,
        value,
        unit:
          typeof item?.unit === "string" && item.unit.trim()
            ? item.unit.trim()
            : unitByType[type],
        timestamp: safeTimestamp,
      };
    })
    .filter((entry): entry is NonNullable<typeof entry> => Boolean(entry))
    .slice(0, MAX_IMPORT);

  if (prepared.length === 0) {
    return NextResponse.json({ imported: 0 });
  }

  await db.insert(measurements).values(prepared).onConflictDoNothing();
  return NextResponse.json({ imported: prepared.length });
}
