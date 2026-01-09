import { createId } from "./utils";

export type AuditAction =
  | "add"
  | "remove"
  | "update-entry"
  | "update-goals"
  | "update-flags"
  | "import"
  | "theme"
  | "reminder"
  | "onboarding"
  | "measurement";

export type AuditEvent = {
  id: string;
  action: AuditAction;
  timestamp: string;
  detail: string;
  meta?: Record<string, string | number | boolean>;
};

const AUDIT_KEY = "calai.audit.v1";
const MAX_AUDIT = 150;

export function loadAuditLog(): AuditEvent[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const raw = window.localStorage.getItem(AUDIT_KEY);
    if (!raw) {
      return [];
    }
    const parsed = JSON.parse(raw) as AuditEvent[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveAuditLog(events: AuditEvent[]) {
  if (typeof window === "undefined") {
    return;
  }
  window.localStorage.setItem(AUDIT_KEY, JSON.stringify(events));
}

export function buildAuditEvent(input: Omit<AuditEvent, "id" | "timestamp">): AuditEvent {
  return {
    id: createId(),
    timestamp: new Date().toISOString(),
    ...input,
  };
}

export function appendAuditEvent(event: AuditEvent, existing: AuditEvent[]) {
  const next = [event, ...existing].slice(0, MAX_AUDIT);
  return next;
}
