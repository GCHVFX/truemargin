/**
 * Calculator config registry.
 * Maps route variant to full config. Add new marketplaces here.
 */

import type { CalculatorConfig } from "./types";
import { ETSY_CALCULATOR_CONFIGS } from "./etsy";

const REGISTRY: Record<string, CalculatorConfig> = {
  ...ETSY_CALCULATOR_CONFIGS,
};

/**
 * Returns config for a calculator by variant or pathname.
 * Falls back to Etsy profit if no match (for backwards compatibility).
 */
export function getCalculatorConfig(
  variantOrPathname: string | undefined
): CalculatorConfig | null {
  const v = (variantOrPathname || "").toLowerCase().trim();
  if (!v) return null;

  // Direct match
  if (REGISTRY[v]) return REGISTRY[v];

  // Pathname-style match (e.g. /etsy-profit-calculator -> etsy-profit-calculator)
  const normalized = v.startsWith("/") ? v.slice(1) : v;
  if (REGISTRY[normalized]) return REGISTRY[normalized];

  // Fallback: derive from path segments
  if (v.includes("pricing")) return REGISTRY["etsy-pricing-calculator"] ?? null;
  if (v.includes("fee")) return REGISTRY["etsy-fee-calculator"] ?? null;
  if (v.includes("break")) return REGISTRY["etsy-break-even-calculator"] ?? null;
  if (v.includes("profit")) return REGISTRY["etsy-profit-calculator"] ?? null;

  return null;
}

/** List all registered calculator configs (for sitemaps, etc.) */
export function listCalculatorConfigs(): CalculatorConfig[] {
  return Object.values(REGISTRY);
}
