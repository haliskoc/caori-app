import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const SESSION_COOKIE = "calmet_session";

export type SessionUser = {
  sub: string;
  email: string;
  name: string | null;
};

function getSecret() {
  const secret =
    process.env.SESSION_SECRET ||
    process.env.AUTH0_SECRET ||
    (process.env.NODE_ENV === "development" ? "dev-session-secret-change-me" : undefined);
  if (!secret) {
    throw new Error("SESSION_SECRET is not set");
  }
  return new TextEncoder().encode(secret);
}

export async function createSessionToken(user: SessionUser) {
  return new SignJWT({
    sub: user.sub,
    email: user.email,
    name: user.name,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(getSecret());
}

async function verifySessionToken(token: string): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (typeof payload.sub !== "string" || !payload.sub) {
      return null;
    }
    return {
      sub: payload.sub,
      email: typeof payload.email === "string" ? payload.email : "",
      name: typeof payload.name === "string" ? payload.name : null,
    };
  } catch {
    return null;
  }
}

function readTokenFromRequest(request?: Request | NextRequest) {
  if (!request) {
    return undefined;
  }
  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) {
    return undefined;
  }
  const match = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${SESSION_COOKIE}=`));
  if (!match) {
    return undefined;
  }
  return decodeURIComponent(match.slice(SESSION_COOKIE.length + 1));
}

export async function getSessionUser(request?: Request | NextRequest) {
  const token =
    readTokenFromRequest(request) ??
    (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }
  return verifySessionToken(token);
}

export async function setSessionCookie(user: SessionUser) {
  const token = await createSessionToken(user);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}
