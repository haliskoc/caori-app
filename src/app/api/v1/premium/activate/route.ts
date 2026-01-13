
import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";
import { getDb } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export async function POST(req: NextRequest) {
    const session = await auth0.getSession(req);
    if (!session?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
        const { password, plan } = await req.json();

        // Gizli anahtar kontrolü
        if (password !== "sffaresi") {
            return NextResponse.json({ error: "Geçersiz aktivasyon kodu." }, { status: 403 });
        }

        if (!["pro", "ai_plus"].includes(plan)) {
            return NextResponse.json({ error: "Geçersiz plan seçimi." }, { status: 400 });
        }

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
    } catch (error: any) {
        console.error("Activation Error:", error);
        return NextResponse.json({ error: "Sistem hatası oluştu." }, { status: 500 });
    }
}
