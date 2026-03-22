"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { submitWaitlistEmail } from "@/lib/waitlist";
import { track } from "@/lib/analytics";

export type WaitlistFormVariant = "default" | "landing" | "calculator" | "pricing";

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

    const endpoint = variant === "pricing" ? "/api/pro-waitlist" : "/api/waitlist";
    const result = await submitWaitlistEmail(email, endpoint);

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
  const isCalculator = variant === "calculator";
  const isPricing = variant === "pricing";

  const formClass = isLanding ? "form" : (isCalculator || isPricing) ? "flex gap-2" : "flex gap-3";
  const inputClass = isLanding
    ? ""
    : (isCalculator || isPricing)
      ? "h-9 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-[#EAF0FF] placeholder:text-[#9AA6BF] focus:outline-none focus:ring-1 focus:ring-white/20 sm:w-56"
      : "w-full rounded-xl border border-slate-600 bg-slate-900 px-4 py-3 text-white";
  const buttonClass = isLanding ? "" : isCalculator ? "" : isPricing ? "" : "rounded-xl bg-teal-600 px-6 py-3 text-white hover:bg-teal-500";

  const getStatusMessageProps = (isError: boolean) => ({
    className: isLanding ? "mini" : isError ? "text-red-400 ml-4" : "text-green-400 ml-4",
    style: isLanding ? { marginTop: 10, ...(isError ? { color: "#f87171" } : {}) } : undefined,
  });

  const formContent = (
    <>
      <input
        id={inputId}
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className={inputClass}
      />

      {(isCalculator || isPricing) ? (
        <Button
          type="submit"
          size="sm"
          disabled={status === "loading"}
          className={isPricing ? "h-9 shrink-0 bg-[#EAF0FF] text-[#070B14] font-semibold hover:bg-white border-0" : undefined}
        >
          {status === "loading" ? "Submitting..." : isPricing ? "Lock in my spot" : "Get updates"}
        </Button>
      ) : (
        <button type="submit" disabled={status === "loading"} className={buttonClass}>
          {status === "loading" ? "Submitting..." : "Notify me"}
        </button>
      )}
    </>
  );

  if (isCalculator || isPricing) {
    return (
      <div className="flex flex-col">
        <form onSubmit={handleSubmit} className={formClass}>
          {formContent}
        </form>
        {status === "success" && (
          <p className="text-xs mt-1.5 text-[#9AA6BF]">You&apos;re on the list.</p>
        )}
        {status === "duplicate" && (
          <p className="text-xs mt-1.5 text-[#9AA6BF]">You&apos;re already on the list.</p>
        )}
        {status === "error" && (
          <p className="text-xs mt-1.5 text-red-400">Something went wrong.</p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={formClass}>
      {formContent}

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
