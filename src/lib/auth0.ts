import { Auth0Client } from "@auth0/nextjs-auth0/server";
import { NextResponse } from "next/server";

const appBaseUrl = process.env.APP_BASE_URL || process.env.AUTH0_BASE_URL || "http://localhost:3000";
const isProduction = process.env.NODE_ENV === "production";

let domain = process.env.AUTH0_DOMAIN;
if (!domain && process.env.AUTH0_ISSUER_BASE_URL) {
  try {
    domain = new URL(process.env.AUTH0_ISSUER_BASE_URL).host;
  } catch {
    domain = undefined;
  }
}

export const auth0 = new Auth0Client({
  appBaseUrl,
  domain,
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  secret: process.env.AUTH0_SECRET,
  signInReturnToPath: "/dashboard",
  routes: {
    callback: "/auth/callback",
    login: "/auth/login",
    logout: "/auth/logout",
  },
  session: {
    cookie: {
      sameSite: "lax",
      secure: isProduction,
    },
  },
  async onCallback(error, context) {
    if (error) {
      console.error("Auth0 callback error:", error.message);
      return NextResponse.redirect(new URL("/", appBaseUrl));
    }
    const returnTo = context.returnTo && context.returnTo !== "/" 
      ? context.returnTo 
      : "/dashboard";
    return NextResponse.redirect(new URL(returnTo, appBaseUrl));
  },
});
