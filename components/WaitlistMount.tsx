"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import WaitlistForm from "@/components/WaitlistForm";

/**
 * Portals WaitlistForm into #waitlist-mount after the landing HTML is rendered.
 * Used because the landing page uses dangerouslySetInnerHTML; this injects the
 * React waitlist form into the correct spot inside the waitlist card.
 */
export function WaitlistMount() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || typeof document === "undefined") return null;

  const mount = document.getElementById("waitlist-mount");
  if (!mount) return null;

  return createPortal(<WaitlistForm variant="landing" inputId="waitlist-email" />, mount);
}
