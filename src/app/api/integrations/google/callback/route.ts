import { getTokens, saveTokens } from "@/lib/google-fit";
import { auth0 } from "@/lib/auth0";
import { NextRequest, NextResponse } from "next/server";
import { getDb, ensureUser } from "@/lib/db";
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
    await ensureUser(session.user);
    
    const userId = session.user.sub;
    await saveTokens(userId, tokens);

    return NextResponse.redirect(new URL("/settings?google_fit=connected", req.url));
  } catch (err) {
    console.error("Error exchanging code for tokens", err);
    return NextResponse.redirect(new URL("/settings?google_fit=error", req.url));
  }
};
