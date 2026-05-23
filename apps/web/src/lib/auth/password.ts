import { createHash, randomBytes } from "node:crypto";

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function createSalt() {
  return randomBytes(16).toString("hex");
}

export function hashPassword(password: string, salt: string) {
  return createHash("sha256").update(`${salt}:${password}`).digest("hex");
}
