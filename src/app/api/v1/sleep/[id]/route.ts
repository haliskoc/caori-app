import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth/auth0";
import { getDb } from "@/lib/database/db";
import { sleepLogs } from "@/lib/database/schema";
import { eq, and } from "drizzle-orm";

type Params = {
    params: Promise<{ id: string }>;
};

// GET - Tek bir uyku kaydını getir
export async function GET(request: NextRequest, { params }: Params) {
    try {
        const session = await auth0.getSession(request);
        if (!session?.user?.sub) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const userId = session.user.sub;
        const db = getDb();

        const logs = await db
            .select()
            .from(sleepLogs)
            .where(and(eq(sleepLogs.id, id), eq(sleepLogs.userId, userId)))
            .limit(1);

        if (logs.length === 0) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        const log = logs[0];
        return NextResponse.json({
            id: log.id,
            type: "sleep",
            sleepStart: log.sleepStart?.toISOString() ?? "",
            sleepEnd: log.sleepEnd?.toISOString() ?? "",
            durationMin: log.durationMin,
            quality: log.quality,
            note: log.note ?? undefined,
            timestamp: log.timestamp?.toISOString() ?? "",
        });
    } catch (error) {
        console.error("Sleep GET by ID error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// PUT - Uyku kaydını güncelle
export async function PUT(request: NextRequest, { params }: Params) {
    try {
        const session = await auth0.getSession(request);
        if (!session?.user?.sub) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const userId = session.user.sub;
        const db = getDb();
        const body = await request.json();

        const { sleepStart, sleepEnd, durationMin, quality, note } = body;

        const existing = await db
            .select()
            .from(sleepLogs)
            .where(and(eq(sleepLogs.id, id), eq(sleepLogs.userId, userId)))
            .limit(1);

        if (existing.length === 0) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        await db
            .update(sleepLogs)
            .set({
                sleepStart: sleepStart ? new Date(sleepStart) : undefined,
                sleepEnd: sleepEnd ? new Date(sleepEnd) : undefined,
                durationMin: durationMin ? Number(durationMin) : undefined,
                quality: quality ?? undefined,
                note: note ?? undefined,
            })
            .where(and(eq(sleepLogs.id, id), eq(sleepLogs.userId, userId)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Sleep PUT error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// DELETE - Uyku kaydını sil
export async function DELETE(request: NextRequest, { params }: Params) {
    try {
        const session = await auth0.getSession(request);
        if (!session?.user?.sub) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;
        const userId = session.user.sub;
        const db = getDb();

        const existing = await db
            .select()
            .from(sleepLogs)
            .where(and(eq(sleepLogs.id, id), eq(sleepLogs.userId, userId)))
            .limit(1);

        if (existing.length === 0) {
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        await db
            .delete(sleepLogs)
            .where(and(eq(sleepLogs.id, id), eq(sleepLogs.userId, userId)));

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Sleep DELETE error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
