import { NextRequest } from "next/server";
import { auth0 } from "@/lib/auth0";

export async function middleware(request: NextRequest) {
  return await auth0.middleware(request);
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/api/:path*",
    "/settings/:path*",
    "/add-entry/:path*",
    "/history/:path*",
    "/auth/:path*",
  ],
};
