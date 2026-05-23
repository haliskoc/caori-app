/** True when Auth0 env vars are present (not dummy placeholders). */
export function isAuth0Configured(): boolean {
  const domain =
    process.env.AUTH0_DOMAIN ||
    (process.env.AUTH0_ISSUER_BASE_URL
      ? tryHost(process.env.AUTH0_ISSUER_BASE_URL)
      : undefined);
  const clientId = process.env.AUTH0_CLIENT_ID;
  const secret = process.env.AUTH0_SECRET;

  if (!domain || !clientId || !secret) {
    return false;
  }
  if (clientId === "dummy_client_id" || domain.includes("dummy.auth0.com")) {
    return false;
  }
  return true;
}

function tryHost(url: string): string | undefined {
  try {
    return new URL(url).host;
  } catch {
    return undefined;
  }
}
