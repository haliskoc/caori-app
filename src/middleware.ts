import { auth0 } from "@/lib/auth0";

export default auth0.withMiddlewareAuthRequired();

export const config = {
  matcher: ["/", "/add-entry", "/history", "/settings"],
};
