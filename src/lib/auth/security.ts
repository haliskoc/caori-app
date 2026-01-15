type NumberOptions = {
  min?: number;
  max?: number;
  integer?: boolean;
};

export function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) {
    return true;
  }

  let originHost = "";
  try {
    originHost = new URL(origin).host;
  } catch {
    return false;
  }

  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (host && originHost === host) {
    return true;
  }

  const baseUrl = process.env.APP_BASE_URL || process.env.AUTH0_BASE_URL;
  if (baseUrl) {
    try {
      const baseHost = new URL(baseUrl).host;
      if (originHost === baseHost) {
        return true;
      }
    } catch {
      return false;
    }
  }

  return false;
}

export function toSafeNumber(value: unknown, fallback: number, options?: NumberOptions) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return fallback;
  }
  let next = parsed;
  if (options?.integer) {
    next = Math.floor(next);
  }
  if (typeof options?.min === "number") {
    next = Math.max(options.min, next);
  }
  if (typeof options?.max === "number") {
    next = Math.min(options.max, next);
  }
  return next;
}
