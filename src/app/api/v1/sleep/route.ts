import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth/auth0";
import { getDb } from "@/lib/database/db";
import { sleepLogs, users } from "@/lib/database/schema";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";

// GET - Tüm uyku kayıtlarını getir
export async function GET(request: NextRequest) {
    try {
        const session = await auth0.getSession(request);
        if (!session?.user?.sub) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const db = getDb();
        const userId = session.user.sub;

        // Kullanıcıyı kontrol et veya oluştur
        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

        if (existingUser.length === 0) {
            await db.insert(users).values({
                id: userId,
                email: session.user.email,
                name: session.user.name,
            });
        }

        const logs = await db
            .select()
            .from(sleepLogs)
            .where(eq(sleepLogs.userId, userId))
            .orderBy(desc(sleepLogs.timestamp));

        const formatted = logs.map((log: typeof sleepLogs.$inferSelect) => ({
            id: log.id,
            type: "sleep" as const,
            sleepStart: log.sleepStart?.toISOString() ?? "",
            sleepEnd: log.sleepEnd?.toISOString() ?? "",
            durationMin: log.durationMin,
            quality: log.quality as "poor" | "fair" | "good" | "excellent",
            note: log.note ?? undefined,
            timestamp: log.timestamp?.toISOString() ?? "",
        }));

        return NextResponse.json(formatted);
    } catch (error) {
        console.error("Sleep GET error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}

// POST - Yeni uyku kaydı ekle
export async function POST(request: NextRequest) {
    try {
        const session = await auth0.getSession(request);
        if (!session?.user?.sub) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userId = session.user.sub;
        const db = getDb();
        const body = await request.json();

        const {
            sleepStart,
            sleepEnd,
            durationMin,
            quality = "good",
            note,
            timestamp,
        } = body;

        if (!sleepStart || !sleepEnd || !durationMin) {
            return NextResponse.json(
                { error: "sleepStart, sleepEnd, and durationMin are required" },
                { status: 400 }
            );
        }

        // Kullanıcıyı kontrol et veya oluştur
        const existingUser = await db
            .select()
            .from(users)
            .where(eq(users.id, userId))
            .limit(1);

        if (existingUser.length === 0) {
            await db.insert(users).values({
                id: userId,
                email: session.user.email,
                name: session.user.name,
            });
        }

        const id = nanoid();
        const now = new Date();

        await db.insert(sleepLogs).values({
            id,
            userId,
            sleepStart: new Date(sleepStart),
            sleepEnd: new Date(sleepEnd),
            durationMin: Number(durationMin),
            quality: quality,
            note: note ?? null,
            timestamp: timestamp ? new Date(timestamp) : now,
        });

        return NextResponse.json({
            id,
            type: "sleep",
            sleepStart,
            sleepEnd,
            durationMin: Number(durationMin),
            quality,
            note,
            timestamp: timestamp ?? now.toISOString(),
        });
    } catch (error) {
        console.error("Sleep POST error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
