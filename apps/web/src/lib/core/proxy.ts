import { NextResponse } from "next/server";
import { auth0 } from "@/lib/auth/auth0";
import {
  LOCALE_COOKIE,
  localeCookieOptions,
  pickLocaleFromAcceptLanguage,
} from "@/lib/core/locale";

/**
 * Auth0 session + /auth/* route handler.
 * App pages stay reachable without login (local-first); API routes enforce auth via getApiPrincipal().
 */
export async function proxy(request: Request) {
  const authRes = await auth0.middleware(request);
  const response =
    authRes instanceof NextResponse ? authRes : NextResponse.next({ request });

  if (!request.cookies.get(LOCALE_COOKIE)?.value) {
    const locale = pickLocaleFromAcceptLanguage(request.headers.get("accept-language"));
    response.cookies.set(LOCALE_COOKIE, locale, localeCookieOptions());
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
