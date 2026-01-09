import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export async function proxy(request: Request) {
  const authRes = await auth0.middleware(request);
  const { pathname, origin } = new URL(request.url);

  if (
    pathname.startsWith("/auth") ||
    pathname === "/" ||
    pathname.startsWith("/share") ||
    pathname.startsWith("/api/v1/share")
  ) {
    return authRes;
  }

  const session = await auth0.getSession(request as NextRequest);
  if (!session) {
    return NextResponse.redirect(new URL("/auth/login", origin));
  }

  return authRes;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
