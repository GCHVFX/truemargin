"use client";

import { useEffect } from "react";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function handleWaitlist(event: Event) {
  event.preventDefault();

  const input = document.getElementById("waitlist-email") as HTMLInputElement | null;
  const msg = document.getElementById("msg");
  const email = input ? String(input.value || "").trim().toLowerCase() : "";

  if (!email) {
    if (msg) msg.textContent = "Please enter an email.";
    return false;
  }

  if (!EMAIL_REGEX.test(email)) {
    if (msg) msg.textContent = "Please enter a valid email.";
    return false;
  }

  if (msg) msg.textContent = "Submitting...";

  const res = await fetch("/api/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    if (res.status === 409 || data.error === "duplicate") {
      if (msg) msg.textContent = "You're already on the list.";
    } else {
      if (msg) msg.textContent = "Something went wrong. Try again.";
    }
    return false;
  }

  if (msg) msg.textContent = "You're on the list.";
  if (input) input.value = "";
  return false;
}

export function WaitlistHandler() {
  useEffect(() => {
    (window as unknown as { handleWaitlist: (e: Event) => void }).handleWaitlist = handleWaitlist;
  }, []);
  return null;
}
