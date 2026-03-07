"use client";

import { useState } from "react";
import { submitWaitlistEmail } from "@/lib/waitlist";

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

    setStatus("loading");
    const result = await submitWaitlistEmail(email);

    if (result.status === "success") {
      setStatus("success");
      setEmail("");
    } else if (result.status === "duplicate") {
      setStatus("duplicate");
    } else {
      setStatus("error");
    }
  };

  const isLanding = variant === "landing";

  return (
    <form
      onSubmit={handleSubmit}
      className={isLanding ? "form" : "flex gap-3"}
    >
      <input
        id={inputId}
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={
          isLanding
            ? ""
            : "w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-white"
        }
      />

      <button
        type="submit"
        disabled={status === "loading"}
        className={isLanding ? "" : "rounded-xl bg-teal-600 px-6 py-3 text-white hover:bg-teal-500"}
      >
        {status === "loading" ? "Submitting..." : "Notify me"}
      </button>

      {status === "success" && (
        <p className={isLanding ? "mini" : "text-green-400 ml-4"} style={isLanding ? { marginTop: 10 } : undefined}>
          You&apos;re on the list.
        </p>
      )}

      {status === "duplicate" && (
        <p className={isLanding ? "mini" : "text-green-400 ml-4"} style={isLanding ? { marginTop: 10 } : undefined}>
          You&apos;re already on the list.
        </p>
      )}

      {status === "error" && (
        <p className={isLanding ? "mini" : "text-red-400 ml-4"} style={isLanding ? { marginTop: 10, color: "#f87171" } : undefined}>
          Something went wrong.
        </p>
      )}
    </form>
  );
}
