import { getTokens, saveTokens } from "@/lib/integrations/google-fit";
import { auth0 } from "@/lib/auth/auth0";
import { NextRequest, NextResponse } from "next/server";
import { ensureUser } from "@/lib/database/db";
import { cookies } from "next/headers";

export const GET = async (req: NextRequest) => {
  const session = await auth0.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const state = searchParams.get("state");
  const cookieStore = await cookies();
  const storedState = cookieStore.get("calai_gfit_state")?.value;

  if (error) {
    return NextResponse.json({ error }, { status: 400 });
  }

  if (!code) {
    return NextResponse.json({ error: "No code provided" }, { status: 400 });
  }

  if (!state || !storedState || state !== storedState) {
    return NextResponse.json({ error: "Invalid state" }, { status: 400 });
  }

  try {
    const tokens = await getTokens(code);
    
    // We need to ensure the user exists in our DB to link the tokens
    // Auth0 user ID is session.user.sub
    await ensureUser(session.user);
    
    const userId = session.user.sub;
    await saveTokens(userId, tokens);

    const response = NextResponse.redirect(
      new URL("/settings?google_fit=connected", req.url)
    );
    response.cookies.set("calai_gfit_state", "", {
      maxAge: 0,
      path: "/",
    });
    return response;
  } catch (err) {
    console.error("Error exchanging code for tokens", err);
    const response = NextResponse.redirect(new URL("/settings?google_fit=error", req.url));
    response.cookies.set("calai_gfit_state", "", {
      maxAge: 0,
      path: "/",
    });
    return response;
  }
};
