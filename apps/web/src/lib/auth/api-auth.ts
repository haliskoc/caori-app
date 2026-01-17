import { auth0 } from "@/lib/auth/auth0";
import { jwtVerify, createRemoteJWKSet, type JWTPayload } from "jose";
import type { NextRequest } from "next/server";

export type ApiPrincipal = {
  userId: string;
  email?: string | null;
  authType: "session" | "bearer";
  payload?: JWTPayload;
};

const auth0Domain =
  process.env.AUTH0_DOMAIN ||
  (process.env.AUTH0_ISSUER_BASE_URL
    ? new URL(process.env.AUTH0_ISSUER_BASE_URL).host
    : undefined);

const auth0Issuer = auth0Domain ? `https://${auth0Domain}/` : undefined;
const auth0Audience = process.env.AUTH0_AUDIENCE;

const jwks = auth0Domain
  ? createRemoteJWKSet(new URL(`https://${auth0Domain}/.well-known/jwks.json`))
  : null;

async function verifyBearerToken(token: string): Promise<ApiPrincipal | null> {
  if (!jwks || !auth0Issuer) {
    return null;
  }

  const { payload } = await jwtVerify(token, jwks, {
    issuer: auth0Issuer,
    audience: auth0Audience || undefined,
  });

  if (!payload.sub) {
    return null;
  }

  return {
    userId: payload.sub,
    email: typeof payload.email === "string" ? payload.email : undefined,
    authType: "bearer",
    payload,
  };
}

export async function getApiPrincipal(request: Request | NextRequest) {
  const authHeader = request.headers.get("authorization");
  if (authHeader && authHeader.toLowerCase().startsWith("bearer ")) {
    const token = authHeader.slice("bearer ".length).trim();
    if (token) {
      const principal = await verifyBearerToken(token).catch(() => null);
      if (principal) {
        return principal;
      }
    }
  }

  const session = await auth0.getSession(request as NextRequest);
  if (session?.user?.sub) {
    return {
      userId: session.user.sub,
      email: session.user.email ?? null,
      authType: "session",
    } satisfies ApiPrincipal;
  }

  return null;
}
