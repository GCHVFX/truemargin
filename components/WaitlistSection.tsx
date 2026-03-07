"use client";

import WaitlistForm from "@/components/WaitlistForm";

/**
 * Waitlist section for the landing page.
 * Renders the card structure with id="waitlist-card" for HeroCTAs focus/highlight.
 * Uses WaitlistForm as the single source of truth for waitlist logic.
 */
export function WaitlistSection() {
  return (
    <div className="section" id="waitlist-card">
      <h2>Join the waitlist</h2>
      <p className="mini">
        This is a simple MVP. If you join, you&apos;ll get early access and launch pricing.
      </p>
      <WaitlistForm variant="landing" inputId="waitlist-email" />
    </div>
  );
}
