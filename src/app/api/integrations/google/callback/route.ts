import { getTokens, saveTokens } from "@/lib/google-fit";
import { auth0 } from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { users } from "@/lib/schema";
import { eq } from "drizzle-orm";

export const GET = async (req: NextRequest) => {
  const session = await auth0.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  try {
    const tokens = await getTokens(code);
    
    // We need to ensure the user exists in our DB to link the tokens
    // Auth0 user ID is session.user.sub
    const db = getDb();
    const user = await db.query.users.findFirst({
        where: eq(users.auth0Id, session.user.sub)
    });

    let userId = user?.id;

    if (!userId) {
         // This typically shouldn't happen if properly synced, but good to handle
         return NextResponse.json({ error: "User record not found" }, { status: 404 });
    }

    await saveTokens(userId, tokens);

    return NextResponse.redirect(new URL("/settings?google_fit=connected", req.url));
  } catch (err) {
    console.error("Error exchanging code for tokens", err);
    return NextResponse.redirect(new URL("/settings?google_fit=error", req.url));
  }
};
