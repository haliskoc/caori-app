import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";
import { and, eq } from "drizzle-orm";
import { entries } from "@/lib/schema";
import { getDb } from "@/lib/db";

export async function DELETE(
  _request: Request,
  { params }: { params: { id: string } }
) {
  const session = await getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = params;
  const db = getDb();
  await db
    .delete(entries)
    .where(and(eq(entries.id, id), eq(entries.userId, session.user.sub)));

  return NextResponse.json({ success: true });
}
