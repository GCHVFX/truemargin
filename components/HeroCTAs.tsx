"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function HeroCTAs() {
  const router = useRouter();

  const handleGetEarlyAccess = () => {
    const card = document.getElementById("waitlist-card");
    const input = document.getElementById("waitlist-email");

    if (card) {
      card.classList.add("waitlist-highlight");
      setTimeout(() => card.classList.remove("waitlist-highlight"), 1200);
    }
    input?.focus();
  };

  useEffect(() => {
    const placeholder = document.getElementById("hero-ctas-placeholder");
    if (!placeholder?.parentNode) return;

    const ctaRow = document.createElement("div");
    ctaRow.className = "ctaRow";

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "btn btnPrimary";
    btn.textContent = "Get early access";
    btn.onclick = handleGetEarlyAccess;

    const link = document.createElement("a");
    link.className = "btn";
    link.href = "/etsy-profit-calculator";
    link.textContent = "See what it does";
    link.onclick = (e) => {
      e.preventDefault();
      router.push("/etsy-profit-calculator");
    };

    ctaRow.append(btn, link);
    placeholder.parentNode.replaceChild(ctaRow, placeholder);
  }, [router]);

  return null;
}
