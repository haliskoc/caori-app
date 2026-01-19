
import { NextRequest, NextResponse } from "next/server";
import { getDb, ensureUser } from "@/lib/database/db";
import { users } from "@/lib/database/schema";
import { eq } from "drizzle-orm";
import { isSameOrigin } from "@/lib/auth/security";
import { getApiPrincipal } from "@/lib/auth/api-auth";

export async function POST(req: NextRequest) {
    if (!isSameOrigin(req)) {
        console.error("Activation Error: Invalid origin", {
            origin: req.headers.get("origin"),
            host: req.headers.get("host"),
            forwardedHost: req.headers.get("x-forwarded-host")
        });
        return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
    }

    const principal = await getApiPrincipal(req);
    if (!principal) {
        console.error("Activation Error: Unauthorized - No session found");
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
        const isMatch = password === activationKey;

        if (!isMatch) {
            console.error("Activation Error: Key mismatch", {
                enteredLength: password.length,
                expectedLength: activationKey.length,
                enteredMasked: password.substring(0, 2) + "..." + password.substring(password.length - 2)
            });
            return NextResponse.json({ error: "Geçersiz aktivasyon kodu." }, { status: 403 });
        }

        if (!["pro", "ai_plus"].includes(plan)) {
            return NextResponse.json({ error: "Geçersiz plan seçimi." }, { status: 400 });
        }

        await ensureUser({
            sub: principal.userId,
            email: principal.email ?? undefined,
        });
        const db = getDb();

        // Kullanıcının planını güncelle
        await db
            .update(users)
            .set({
                plan: plan,
                subscriptionStatus: "active",
            })
            .where(eq(users.id, principal.userId));

        return NextResponse.json({ success: true, message: `Tebrikler! ${plan.toUpperCase()} paketiniz aktif edildi.` });
    } catch (error: unknown) {
        console.error("Activation Error:", error);
        return NextResponse.json({ error: "Sistem hatası oluştu." }, { status: 500 });
    }
}
