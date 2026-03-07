/**
 * Shared calculator helpers for Etsy calculators.
 * Ensures consistent thresholds, labels, and result presentation across profit, fee, and break-even pages.
 */

/** Margin health tiers (marginPct as decimal, e.g. 0.15 = 15%) */
export const MARGIN_HEALTH_THRESHOLDS = {
  RISKY: { max: 0.15, label: "Risky", badge: "bg-rose-50 text-rose-700 ring-1 ring-rose-200" },
  TIGHT: { min: 0.15, max: 0.25, label: "Tight", badge: "bg-amber-50 text-amber-700 ring-1 ring-amber-200" },
  HEALTHY: { min: 0.25, max: 0.35, label: "Healthy", badge: "bg-teal-50 text-teal-700 ring-1 ring-teal-200" },
  STRONG: { min: 0.35, label: "Strong", badge: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200" },
} as const;

export type MarginHealthTier = "Risky" | "Tight" | "Healthy" | "Strong";

/**
 * Returns margin health tier for a given margin percentage (decimal, 0–1).
 * Thresholds: <15% Risky, 15–<25% Tight, 25–<35% Healthy, >=35% Strong.
 */
export function getMarginHealthTier(marginPct: number): { label: MarginHealthTier; badge: string } {
  const m = typeof marginPct === "number" ? marginPct : 0;
  if (m >= MARGIN_HEALTH_THRESHOLDS.STRONG.min) {
    return { label: "Strong", badge: MARGIN_HEALTH_THRESHOLDS.STRONG.badge };
  }
  if (m >= MARGIN_HEALTH_THRESHOLDS.HEALTHY.min) {
    return { label: "Healthy", badge: MARGIN_HEALTH_THRESHOLDS.HEALTHY.badge };
  }
  if (m >= MARGIN_HEALTH_THRESHOLDS.TIGHT.min) {
    return { label: "Tight", badge: MARGIN_HEALTH_THRESHOLDS.TIGHT.badge };
  }
  return { label: "Risky", badge: MARGIN_HEALTH_THRESHOLDS.RISKY.badge };
}

/** Contextual insight messages for each margin tier */
export const MARGIN_INSIGHT_MESSAGES: Record<MarginHealthTier, string> = {
  Risky: "Low margin. This price leaves little room for refunds, ads, or cost increases.",
  Tight: "Tight margin. Small cost changes or promotions could erase profit.",
  Healthy: "Healthy margin. You have reasonable room for fees and promotions.",
  Strong: "Strong margin. Pricing comfortably covers Etsy fees and operating costs.",
};

/** Standardized result labels used across all Etsy calculators */
export const CALC_LABELS = {
  COST_OF_GOODS_PER_UNIT: "Cost of goods per unit",
  SHIPPING_CHARGED_TO_BUYER: "Shipping charged to buyer",
  YOUR_SHIPPING_COST: "Your shipping cost",
  BREAK_EVEN_PRICE_PER_UNIT: "Break-even price per unit",
  FEE_BREAKDOWN: "Fee breakdown",
  ORDER_REVENUE: "Order revenue",
  TOTAL_FEES: "Total fees",
  COST_OF_GOODS: "Cost of goods",
  MARGIN_HEALTH: "Margin health",
  BREAK_EVEN_DESCRIPTION: "Minimum item price to cover fees, COGS, and shipping.",

  // Fee breakdown rows
  LISTING_FEE: "Listing fee",
  TRANSACTION_FEE: "Transaction fee",
  PAYMENT_PROCESSING: "Payment processing",
  REGULATORY_FEE: "Regulatory fee",
  OFFSITE_ADS: "Offsite ads",
} as const;
