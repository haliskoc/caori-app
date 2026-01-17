import { getAuthUrl } from "@/lib/integrations/google-fit";
import { auth0 } from "@/lib/auth/auth0";
import { NextResponse } from "next/server";
import { nanoid } from "nanoid";

export const GET = async () => {
  const session = await auth0.getSession();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const state = nanoid();
  const url = getAuthUrl(state);
  const response = NextResponse.redirect(url);
  response.cookies.set("calai_gfit_state", state, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 300,
    path: "/",
  });
  return response;
};
