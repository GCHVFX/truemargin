import type { FeeInputs } from "@/lib/fees";

const round2 = (n: number) => Math.round(n * 100) / 100;

export type FeeBreakdown = {
  listingFee: number;
  transactionFee: number;
  paymentProcessingFee: number;
  regulatoryFee: number;
  offsiteAdsFee: number;
};

export type CalcResult = {
  orderRevenue: number;
  totalFees: number;
  totalCogs: number;
  totalYourShipping: number;
  netProfit: number;
  marginPct: number;
  breakEvenItemPrice: number | null; // per unit
  fees: FeeBreakdown;
};

/**
 * Break-even item price (per unit): minimum item price required for net profit = 0.
 * Assumptions (consistent with V1 calculator):
 * - shippingCharged is per-order total
 * - yourShippingCost is per-order total
 * - paymentProcessingFixed is per-order
 * - listingFeeFixed is per-unit (multiplied by quantity)
 */
export function calculateBreakEvenItemPrice(i: FeeInputs): number | null {
  return calculateTargetMarginItemPrice(i, 0);
}

/**
 * Target margin item price (per unit): minimum item price required to hit the given margin.
 * targetMarginPct is a decimal (0.4 = 40%).
 */
export function calculateTargetMarginItemPrice(i: FeeInputs, targetMarginPct: number): number | null {
  const qty = Math.max(1, Math.floor(i.quantity || 1));

  const pctTotal =
    i.transactionFeePct +
    i.paymentProcessingPct +
    i.regulatoryFeePct +
    (i.includeOffsiteAds ? i.offsiteAdsPct : 0);

  const m = Number.isFinite(targetMarginPct) ? targetMarginPct : 0;

  // netProfit = orderRevenue*(1-pctTotal) - fixedCosts
  // We want netProfit = m*orderRevenue
  // => orderRevenue*(1-pctTotal-m) = fixedCosts
  const denom = 1 - pctTotal - m;
  if (!Number.isFinite(denom) || denom <= 0) return null;

  const fixedFees = i.listingFeeFixed * qty + i.paymentProcessingFixed;
  const totalCogs = i.cogsPerUnit * qty;
  const totalYourShipping = i.yourShippingCost;

  const fixedCosts = fixedFees + totalCogs + totalYourShipping;

  const requiredOrderRevenue = fixedCosts / denom;

  const requiredItemSubtotal = requiredOrderRevenue - i.shippingCharged;
  const perUnit = requiredItemSubtotal / qty;

  const safe = Number.isFinite(perUnit) ? Math.max(0, perUnit) : null;
  return safe === null ? null : round2(safe);
}

export function calculateOrder(i: FeeInputs): CalcResult {
  const qty = Math.max(1, Math.floor(i.quantity || 1));

  const itemSubtotal = i.itemPrice * qty;
  const shippingRevenue = i.shippingCharged; // per-order total
  const orderRevenue = itemSubtotal + shippingRevenue;

  const listingFee = i.listingFeeFixed * qty;

  const transactionFee = orderRevenue * i.transactionFeePct;

  const paymentProcessingFee = orderRevenue * i.paymentProcessingPct + i.paymentProcessingFixed;

  const regulatoryFee = orderRevenue * i.regulatoryFeePct;

  const offsiteAdsFee = i.includeOffsiteAds ? orderRevenue * i.offsiteAdsPct : 0;

  const totalFees = listingFee + transactionFee + paymentProcessingFee + regulatoryFee + offsiteAdsFee;

  const totalCogs = i.cogsPerUnit * qty;
  const totalYourShipping = i.yourShippingCost; // per-order total

  const netProfit = orderRevenue - totalFees - totalCogs - totalYourShipping;

  const marginPct = orderRevenue > 0 ? netProfit / orderRevenue : 0;

  const breakEvenItemPrice = calculateBreakEvenItemPrice(i);

  return {
    orderRevenue: round2(orderRevenue),
    totalFees: round2(totalFees),
    totalCogs: round2(totalCogs),
    totalYourShipping: round2(totalYourShipping),
    netProfit: round2(netProfit),
    marginPct,
    breakEvenItemPrice,
    fees: {
      listingFee: round2(listingFee),
      transactionFee: round2(transactionFee),
      paymentProcessingFee: round2(paymentProcessingFee),
      regulatoryFee: round2(regulatoryFee),
      offsiteAdsFee: round2(offsiteAdsFee),
    },
  };
}
