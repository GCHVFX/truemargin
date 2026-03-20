/**
 * Shared calculator helpers for Etsy calculators.
 * Ensures consistent thresholds, labels, and result presentation across profit, fee, and break-even pages.
 */

import { REGION_PRESETS, type SellerRegion } from "@/lib/fees";

/** Margin health tiers (marginPct as decimal). Bar segments are equal width; tiers map to Etsy-style bands. */
export const MARGIN_HEALTH_THRESHOLDS = {
  RISKY: { max: 0.15, label: "Low", badge: "bg-rose-50 text-rose-700 ring-1 ring-rose-200" },
  OK: { min: 0.15, max: 0.25, label: "OK", badge: "bg-amber-50 text-amber-800 ring-1 ring-amber-200" },
  GOOD: { min: 0.25, max: 0.35, label: "Good", badge: "bg-teal-50 text-teal-800 ring-1 ring-teal-200" },
  STRONG: { min: 0.35, label: "Strong", badge: "bg-emerald-50 text-emerald-800 ring-1 ring-emerald-200" },
} as const;

export type MarginHealthTier = "Low" | "OK" | "Good" | "Strong";

/**
 * Returns margin health tier for a given margin percentage (decimal, 0–1).
 * Thresholds: &lt;15% Low, 15–&lt;25% OK, 25–&lt;35% Good, ≥35% Strong.
 */
export function getMarginHealthTier(marginPct: number): { label: MarginHealthTier; badge: string } {
  const m = typeof marginPct === "number" ? marginPct : 0;
  if (m >= MARGIN_HEALTH_THRESHOLDS.STRONG.min) {
    return { label: "Strong", badge: MARGIN_HEALTH_THRESHOLDS.STRONG.badge };
  }
  if (m >= MARGIN_HEALTH_THRESHOLDS.GOOD.min) {
    return { label: "Good", badge: MARGIN_HEALTH_THRESHOLDS.GOOD.badge };
  }
  if (m >= MARGIN_HEALTH_THRESHOLDS.OK.min) {
    return { label: "OK", badge: MARGIN_HEALTH_THRESHOLDS.OK.badge };
  }
  return { label: "Low", badge: MARGIN_HEALTH_THRESHOLDS.RISKY.badge };
}

/** Verdict paragraph under margin % (aligned with tier bands). */
export const MARGIN_INSIGHT_MESSAGES: Record<MarginHealthTier, string> = {
  Low: "Very little profit buffer. Small cost increases or refunds will push this into a loss.",
  OK: "Margins are tight. Consider increasing price or reducing costs to protect profit.",
  Good: "Healthy margin. You have room for ads, discounts, or cost fluctuations.",
  Strong: "High margin. You can scale ads or lower price to increase conversion if needed.",
};

/**
 * Decision-first verdict line under margin % (marginPct as decimal, e.g. 0.15 = 15%).
 * Bands: &lt;15%, 15–&lt;25%, 25–&lt;35%, ≥35% (matches segmented margin bar labels).
 */
export function getMarginVerdictMessage(marginPctDecimal: number): string {
  const m = typeof marginPctDecimal === "number" && Number.isFinite(marginPctDecimal) ? marginPctDecimal : 0;
  if (m < 0.15) return MARGIN_INSIGHT_MESSAGES.Low;
  if (m < 0.25) return MARGIN_INSIGHT_MESSAGES.OK;
  if (m < 0.35) return MARGIN_INSIGHT_MESSAGES.Good;
  return MARGIN_INSIGHT_MESSAGES.Strong;
}

/** Standardized result labels used across all Etsy calculators */
export const CALC_LABELS = {
  YOU_KEEP_PER_ORDER: "You keep per order",
  COST_OF_GOODS_PER_UNIT: "Cost of goods per unit",
  SHIPPING_CHARGED_TO_BUYER: "Shipping charged to buyer",
  YOUR_SHIPPING_COST: "Your shipping cost",
  BREAK_EVEN_PRICE_PER_UNIT: "Break-even price per unit",
  /** Break-even calculator primary headline */
  MINIMUM_PRICE_PER_UNIT: "Minimum price per unit",
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

const approxEq = (a: number, b: number, eps = 1e-9) => Math.abs(a - b) < eps;

/** Fee breakdown row label: show 6.5% only when that rate is what the calculator is using. */
export function getTransactionFeeBreakdownLabel(transactionFeePct: number): string {
  if (approxEq(transactionFeePct, 0.065)) return "Transaction fee (6.5%)";
  return CALC_LABELS.TRANSACTION_FEE;
}

/**
 * Canada preset uses 3% + fixed; only then show the parenthetical (shared component is also used for US).
 */
export function getPaymentProcessingBreakdownLabel(
  sellerRegion: SellerRegion,
  paymentProcessingPct: number,
  paymentProcessingFixed: number
): string {
  const ca = REGION_PRESETS.CA;
  if (
    sellerRegion === "CA" &&
    approxEq(paymentProcessingPct, ca.paymentProcessingPct) &&
    approxEq(paymentProcessingFixed, ca.paymentProcessingFixed)
  ) {
    return "Payment processing (3% + $0.25)";
  }
  return CALC_LABELS.PAYMENT_PROCESSING;
}

/** Matches standard Etsy offsite ad tiers when those exact rates are in use. */
export function getOffsiteAdsBreakdownLabel(offsiteAdsPct: number): string {
  if (approxEq(offsiteAdsPct, 0.12)) return "Offsite ads (12%)";
  if (approxEq(offsiteAdsPct, 0.15)) return "Offsite ads (15%)";
  return CALC_LABELS.OFFSITE_ADS;
}
