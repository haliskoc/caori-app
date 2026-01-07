import { Auth0Client } from "@auth0/nextjs-auth0/server";

const appBaseUrl = process.env.APP_BASE_URL || process.env.AUTH0_BASE_URL;

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
  routes: {
    callback: "/auth/callback",
    login: "/auth/login",
    logout: "/auth/logout",
  },
});
