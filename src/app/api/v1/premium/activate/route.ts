
import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { getDb, ensureUser } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { isSameOrigin } from "@/lib/security";

export async function POST(req: NextRequest) {
    if (!isSameOrigin(req)) {
        return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }

    const session = await auth0.getSession(req);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const activationKey = process.env.PREMIUM_ACTIVATION_KEY?.trim();
        if (!activationKey) {
            return NextResponse.json({ error: "Activation key is not configured." }, { status: 500 });
        }

        const body = await req.json().catch(() => ({}));
        const password = typeof body?.password === "string" ? body.password.trim() : "";
        const plan = typeof body?.plan === "string" ? body.plan : "";

        // Gizli anahtar kontrolü
        if (!password || password !== activationKey) {
            return NextResponse.json({ error: "Geçersiz aktivasyon kodu." }, { status: 403 });
        }

        if (!["pro", "ai_plus"].includes(plan)) {
            return NextResponse.json({ error: "Geçersiz plan seçimi." }, { status: 400 });
        }

        await ensureUser(session.user);
        const db = getDb();

        // Kullanıcının planını güncelle
        await db
            .update(users)
            .set({
                plan: plan,
                subscriptionStatus: "active",
            })
            .where(eq(users.id, session.user.sub));

        return NextResponse.json({ success: true, message: `Tebrikler! ${plan.toUpperCase()} paketiniz aktif edildi.` });
    } catch (error: unknown) {
        console.error("Activation Error:", error);
        return NextResponse.json({ error: "Sistem hatası oluştu." }, { status: 500 });
    }
}
