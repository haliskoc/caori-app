import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { and, eq } from "drizzle-orm";
import { entries } from "@/lib/schema";
import { getDb } from "@/lib/db";
import { isSameOrigin } from "@/lib/security";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const db = getDb();
  await db
    .delete(entries)
    .where(and(eq(entries.id, id), eq(entries.userId, session.user.sub)));

  return NextResponse.json({ success: true });
}
