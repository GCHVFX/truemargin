"use client";

import { useState } from "react";
import { submitWaitlistEmail } from "@/lib/waitlist";
import { track } from "@/lib/analytics";

export type WaitlistFormVariant = "default" | "landing";

export default function WaitlistForm({
  variant = "default",
  inputId = "waitlist-email",
}: {
  variant?: WaitlistFormVariant;
  inputId?: string;
}) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error" | "duplicate">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    track("waitlist_submit_started");
    setStatus("loading");
    const result = await submitWaitlistEmail(email);

    if (result.status === "success") {
      track("waitlist_submit_success");
      setStatus("success");
      setEmail("");
    } else if (result.status === "duplicate") {
      track("waitlist_submit_duplicate");
      setStatus("duplicate");
    } else {
      track("waitlist_submit_error");
      setStatus("error");
    }
  };

  const isLanding = variant === "landing";

  const formClass = isLanding ? "form" : "flex gap-3";
  const inputClass = isLanding ? "" : "w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-white";
  const buttonClass = isLanding ? "" : "rounded-xl bg-teal-600 px-6 py-3 text-white hover:bg-teal-500";

  const getStatusMessageProps = (isError: boolean) => ({
    className: isLanding ? "mini" : isError ? "text-red-400 ml-4" : "text-green-400 ml-4",
    style: isLanding ? { marginTop: 10, ...(isError ? { color: "#f87171" } : {}) } : undefined,
  });

  return (
    <form onSubmit={handleSubmit} className={formClass}>
      <input
        id={inputId}
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={inputClass}
      />

      <button type="submit" disabled={status === "loading"} className={buttonClass}>
        {status === "loading" ? "Submitting..." : "Notify me"}
      </button>

      {status === "success" && (
        <p {...getStatusMessageProps(false)}>You&apos;re on the list.</p>
      )}

      {status === "duplicate" && (
        <p {...getStatusMessageProps(false)}>You&apos;re already on the list.</p>
      )}

      {status === "error" && (
        <p {...getStatusMessageProps(true)}>Something went wrong.</p>
      )}
    </form>
  );
}
