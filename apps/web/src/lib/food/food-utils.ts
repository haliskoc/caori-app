export function normalizeBarcode(input: string) {
  return input.replace(/\D/g, "");
}

function parseNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }
  if (typeof value !== "string") {
    return undefined;
  }
  const cleaned = value.trim().replace(",", ".");
  if (!cleaned) {
    return undefined;
  }
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : undefined;
}

export function parseServingSizeToGrams(size: unknown, unit?: unknown) {
  const unitText = typeof unit === "string" ? unit.toLowerCase() : "";
  const numeric = parseNumber(size);
  if (typeof numeric === "number") {
    if (!unitText || unitText.includes("g") || unitText.includes("gram")) {
      return numeric;
    }
    if (unitText.includes("ml")) {
      return numeric;
    }
  }

  if (typeof size !== "string") {
    return undefined;
  }
  const text = size.toLowerCase();
  const match = text.match(/(\d+(?:[.,]\d+)?)\s*(g|gr|gram|grams|ml)\b/);
  if (!match) {
    return undefined;
  }
  const value = parseNumber(match[1]);
  return typeof value === "number" ? value : undefined;
}

export function coerceNumber(value: unknown) {
  const parsed = parseNumber(value);
  return typeof parsed === "number" ? parsed : undefined;
}
