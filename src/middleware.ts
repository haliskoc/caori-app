import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "@/lib/auth0";

export async function middleware(request: NextRequest) {
  const authRes = await auth0.middleware(request);

  // Auth route'ları için Auth0 middleware'in handle etmesine izin ver
  if (request.nextUrl.pathname.startsWith("/auth")) {
    return authRes;
  }

  // Ana sayfa public olarak kalsın
  if (request.nextUrl.pathname === "/") {
    return authRes;
  }

  // API routes ve protected sayfalar için session kontrolü
  const session = await auth0.getSession(request);

  if (!session) {
    // Kullanıcı giriş yapmamışsa login sayfasına yönlendir
    return NextResponse.redirect(
      new URL("/auth/login", request.nextUrl.origin)
    );
  }

  return authRes;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
