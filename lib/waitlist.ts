/**
 * Shared waitlist logic. Single source of truth for waitlist API calls.
 * Used by WaitlistForm and any other waitlist UI.
 */

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export type WaitlistSubmitResult =
  | { status: "success" }
  | { status: "duplicate" }
  | { status: "error" };

export function isValidWaitlistEmail(email: string): boolean {
  return EMAIL_REGEX.test(String(email || "").trim());
}

export async function submitWaitlistEmail(email: string): Promise<WaitlistSubmitResult> {
  const normalized = String(email || "").trim().toLowerCase();
  if (!normalized) {
    return { status: "error" };
  }
  if (!EMAIL_REGEX.test(normalized)) {
    return { status: "error" };
  }

  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: normalized }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (res.status === 409 || data.error === "duplicate") {
      return { status: "duplicate" };
    }
    return { status: "error" };
  }

  return { status: "success" };
}
