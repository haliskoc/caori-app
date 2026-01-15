import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth/auth0";
import { getDb, ensureUser } from "@/lib/database/db";
import { integrations } from "@/lib/database/schema";
import { integrationProviders, type IntegrationProviderId } from "@/lib/integrations/integrations";
import { createId } from "@/lib/core/utils";
import { and, eq } from "drizzle-orm";
import { isSameOrigin } from "@/lib/auth/security";

export const dynamic = "force-dynamic";

const providerIds = new Set<IntegrationProviderId>(integrationProviders.map((provider) => provider.id));
const allowedStatuses = new Set(["connected", "pending", "disconnected"]);
const isIntegrationProviderId = (value: string): value is IntegrationProviderId =>
  providerIds.has(value as IntegrationProviderId);

type IntegrationUpdatePayload = {
  provider?: string;
  status?: string;
};

export async function GET() {
  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await ensureUser(session.user);
  const db = getDb();
  const rows = await db
    .select()
    .from(integrations)
    .where(eq(integrations.userId, session.user.sub));
  const rowMap = new Map(rows.map((row) => [row.provider, row]));

  const payload = integrationProviders.map((provider) => {
    const row = rowMap.get(provider.id);
    const fallbackStatus = provider.availability === "coming_soon" ? "coming_soon" : "disconnected";
    return {
      id: provider.id,
      status: row?.status ?? fallbackStatus,
      availability: provider.availability,
      updatedAt: row?.updatedAt ?? null,
    };
  });

  return NextResponse.json(payload);
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  const session = await auth0.getSession();
  if (!session?.user?.sub) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as IntegrationUpdatePayload;
  const provider = body.provider;
  if (!provider || !isIntegrationProviderId(provider)) {
    return NextResponse.json({ error: "Invalid provider" }, { status: 400 });
  }

  const status = body.status ?? "disconnected";
  if (!allowedStatuses.has(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  await ensureUser(session.user);
  const db = getDb();
  const [existing] = await db
    .select()
    .from(integrations)
    .where(and(eq(integrations.userId, session.user.sub), eq(integrations.provider, provider)))
    .limit(1);

  if (existing) {
    const [updated] = await db
      .update(integrations)
      .set({ status, updatedAt: new Date() })
      .where(eq(integrations.id, existing.id))
      .returning();
    return NextResponse.json(updated);
  }

  const [created] = await db
    .insert(integrations)
    .values({
      id: createId(),
      userId: session.user.sub,
      provider,
      status,
      updatedAt: new Date(),
    })
    .returning();

  return NextResponse.json(created);
}
