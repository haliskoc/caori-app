import { proxy } from "./lib/core/proxy";

export function middleware(request: Request) {
  return proxy(request);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
