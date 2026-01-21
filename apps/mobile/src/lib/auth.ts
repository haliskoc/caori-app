import * as SecureStore from "expo-secure-store";
import * as Crypto from "expo-crypto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { run, getFirst, initDb } from "@/db";
import { createId } from "@/lib/id";
import { ensureUserDefaults } from "@/lib/user-defaults";

export type AuthUser = {
  id: string;
  email: string;
  name: string | null;
};

const SESSION_KEY = "calai.session.user";

async function setSession(userId: string) {
  try {
    if (await SecureStore.isAvailableAsync()) {
      await SecureStore.setItemAsync(SESSION_KEY, userId);
      return;
    }
  } catch {
    // Fall back to AsyncStorage.
  }
  await AsyncStorage.setItem(SESSION_KEY, userId);
}

async function getSession() {
  try {
    if (await SecureStore.isAvailableAsync()) {
      return await SecureStore.getItemAsync(SESSION_KEY);
    }
  } catch {
    // Fall back to AsyncStorage.
  }
  return await AsyncStorage.getItem(SESSION_KEY);
}

async function clearSession() {
  try {
    if (await SecureStore.isAvailableAsync()) {
      await SecureStore.deleteItemAsync(SESSION_KEY);
      return;
    }
  } catch {
    // Fall back to AsyncStorage.
  }
  await AsyncStorage.removeItem(SESSION_KEY);
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

async function hashPassword(password: string, salt: string) {
  if (typeof Crypto.digestStringAsync === "function") {
    return Crypto.digestStringAsync(
      Crypto.CryptoDigestAlgorithm.SHA256,
      `${salt}:${password}`
    );
  }
  let hash = 0;
  const value = `${salt}:${password}`;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(i);
    hash |= 0;
  }
  return `fallback_${Math.abs(hash)}`;
}

async function createSalt() {
  if (typeof Crypto.getRandomBytesAsync === "function") {
    const bytes = await Crypto.getRandomBytesAsync(16);
    return Array.from(bytes)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");
  }
  return `${Date.now().toString(16)}${Math.random().toString(16).slice(2, 10)}`;
}

export async function registerUser(input: {
  email: string;
  name?: string;
  password: string;
}) {
  await initDb();
  const email = normalizeEmail(input.email);
  if (!email || !input.password.trim()) {
    throw new Error("INVALID_INPUT");
  }
  try {
    const existing = await getFirst<{ id: string }>(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );
    if (existing?.id) {
      throw new Error("EMAIL_EXISTS");
    }
    const id = createId("user");
    const salt = await createSalt();
    const passwordHash = await hashPassword(input.password, salt);
    const now = new Date().toISOString();

    await run(
      `INSERT INTO users (id, email, name, password_hash, salt, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [id, email, input.name?.trim() || null, passwordHash, salt, now]
    );

    await ensureUserDefaults(id);
    await setSession(id);

    return { id, email, name: input.name?.trim() || null };
  } catch (err: any) {
    const message = String(err?.message ?? "");
    if (message.toLowerCase().includes("unique") || message.toLowerCase().includes("constraint")) {
      throw new Error("EMAIL_EXISTS");
    }
    const existing = await getFirst<{ id: string; email: string; name: string | null }>(
      "SELECT id, email, name FROM users WHERE email = ?",
      [email]
    );
    if (existing?.id) {
      await ensureUserDefaults(existing.id);
      await setSession(existing.id);
      return { id: existing.id, email: existing.email, name: existing.name };
    }
    throw err;
  }
}

export async function loginUser(input: { email: string; password: string }) {
  await initDb();
  const email = normalizeEmail(input.email);
  if (!email || !input.password.trim()) {
    throw new Error("INVALID_INPUT");
  }
  const row = await getFirst<{
    id: string;
    email: string;
    name: string | null;
    password_hash: string;
    salt: string;
  }>(
    "SELECT id, email, name, password_hash, salt FROM users WHERE email = ?",
    [email]
  );

  if (!row?.id) {
    throw new Error("INVALID_CREDENTIALS");
  }
  const passwordHash = await hashPassword(input.password, row.salt);
  if (passwordHash !== row.password_hash) {
    throw new Error("INVALID_CREDENTIALS");
  }

  await setSession(row.id);
  await ensureUserDefaults(row.id);

  return { id: row.id, email: row.email, name: row.name };
}

export async function createGuestUser() {
  await initDb();
  const id = createId("guest");
  const salt = await createSalt();
  const passwordHash = await hashPassword(createId("pw"), salt);
  const now = new Date().toISOString();
  const email = `guest_${id}@local`;

  await run(
    `INSERT INTO users (id, email, name, password_hash, salt, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [id, email, "Guest", passwordHash, salt, now]
  );

  await ensureUserDefaults(id);
  await setSession(id);

  return { id, email, name: "Guest" } as AuthUser;
}

export async function logoutUser() {
  await clearSession();
}

export async function getSessionUser() {
  const userId = await getSession();
  if (!userId) return null;

  const row = await getFirst<{ id: string; email: string; name: string | null }>(
    "SELECT id, email, name FROM users WHERE id = ?",
    [userId]
  );

  if (!row?.id) {
    await clearSession();
    return null;
  }

  return { id: row.id, email: row.email ?? "", name: row.name } as AuthUser;
}
