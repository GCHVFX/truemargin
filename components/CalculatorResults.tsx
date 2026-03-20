"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import type { CalcResult } from "@/lib/feeEngine";
import type { Currency, SellerRegion } from "@/lib/fees";
import type { ResultBlockKey } from "@/config/calculators/types";
import {
  getMarginHealthTier,
  getMarginVerdictMessage,
  CALC_LABELS,
  getTransactionFeeBreakdownLabel,
  getPaymentProcessingBreakdownLabel,
  getOffsiteAdsBreakdownLabel,
} from "@/lib/calculatorHelpers";

const fmt = (currency: Currency) =>
  new Intl.NumberFormat(currency === "CAD" ? "en-CA" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export type CalculatorResultsProps = {
  result: CalcResult | null;
  hasCalculated: boolean;
  currency: Currency;
  isProfit: boolean;
  isFee: boolean;
  isBreakEven: boolean;
  isPricing?: boolean;
  /** Config-driven result block order. When provided, overrides isProfit/isFee/isBreakEven ordering. */
  resultOrder?: ResultBlockKey[];
  /** Drives Canada-only payment processing label; fee breakdown is shared across US/CA calculators. */
  sellerRegion: SellerRegion;
  /** Current fee inputs (decimals for % fields), used only for breakdown row labels. */
  transactionFeePct: number;
  paymentProcessingPct: number;
  paymentProcessingFixed: number;
  offsiteAdsPct: number;
  includeTaxEstimate: boolean;
  /** Per-unit item subtotal for pricing mode (order revenue minus shipping charged). */
  recommendedItemSubtotal?: number;
  /** When Offsite Ads is on: net profit without ads minus net profit with ads. */
  offsiteAdsProfitReduction?: number | null;
  taxRatePct: string;
  onCopyResults: () => void;
  parseNumber: (s: string) => number;
  clampNonNeg: (n: number) => number;
};

export function CalculatorResults({
  result,
  hasCalculated,
  currency,
  isProfit,
  isFee,
  isBreakEven,
  isPricing = false,
  resultOrder,
  sellerRegion,
  transactionFeePct,
  paymentProcessingPct,
  paymentProcessingFixed,
  offsiteAdsPct,
  includeTaxEstimate,
  recommendedItemSubtotal,
  offsiteAdsProfitReduction = null,
  taxRatePct,
  onCopyResults,
  parseNumber,
  clampNonNeg,
}: CalculatorResultsProps) {
  const currencyFmt = React.useMemo(() => fmt(currency), [currency]);

  const transactionFeeLabel = React.useMemo(
    () => getTransactionFeeBreakdownLabel(transactionFeePct),
    [transactionFeePct]
  );
  const paymentProcessingLabel = React.useMemo(
    () =>
      getPaymentProcessingBreakdownLabel(sellerRegion, paymentProcessingPct, paymentProcessingFixed),
    [sellerRegion, paymentProcessingPct, paymentProcessingFixed]
  );
  const offsiteAdsLabel = React.useMemo(() => getOffsiteAdsBreakdownLabel(offsiteAdsPct), [offsiteAdsPct]);

  const blockKeys = React.useMemo((): ResultBlockKey[] => {
    if (!result) return [];
    const baseOrder =
      resultOrder ??
      (isProfit
        ? (["summary", "fee", ...(result.breakEvenItemPrice != null ? (["breakEven"] as const) : [])] as ResultBlockKey[])
        : isFee
          ? (["fee", ...(result.breakEvenItemPrice != null ? (["breakEven"] as const) : []), "summary"] as ResultBlockKey[])
          : (["breakEven", "fee", "summary"] as ResultBlockKey[]).filter(
              (k) => k !== "breakEven" || result.breakEvenItemPrice != null
            ));

    return baseOrder.filter((key) => {
      if (key === "breakEven" && isBreakEven) return false;
      if (key === "breakEven" && result.breakEvenItemPrice == null) return false;
      return true;
    });
  }, [result, resultOrder, isProfit, isFee, isBreakEven]);

  return (
    <Card className="border-white/10 bg-emerald-50/95 shadow-lg backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Results</CardTitle>
        <CardDescription>Per order (all values include quantity).</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {!hasCalculated ? (
          <div className="text-sm text-muted-foreground">
            Enter values and click{" "}
            <span className="font-medium">
              {isPricing ? "Update Recommended Price" : "Calculate"}
            </span>
            .
          </div>
        ) : !result ? (
          <div className="text-sm text-muted-foreground">
            These inputs don&apos;t produce a valid price. Try adjusting your margin, shipping, or fee
            settings.
          </div>
        ) : (
          <>
            {isPricing && recommendedItemSubtotal != null && (
              <div className="rounded-lg border p-4">
                <div className="text-xs text-muted-foreground">Recommended Etsy item price (per unit)</div>
                <div className="mt-1 text-2xl font-semibold">
                  {currencyFmt.format(recommendedItemSubtotal)}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Item price before shipping charged to buyer, estimated to hit your target margin.
                </p>
              </div>
            )}
            {isFee && (
              <div className="space-y-2 rounded-xl border-2 border-primary/30 bg-primary/5 p-4">
                <div className="text-xs text-muted-foreground">{CALC_LABELS.TOTAL_FEES}</div>
                <div className="mt-1 text-2xl font-semibold">{currencyFmt.format(result.totalFees)}</div>
              </div>
            )}
            {isBreakEven && result.breakEvenItemPrice != null && (
              <div className="space-y-2 rounded-xl border-2 border-primary/30 bg-primary/5 p-4">
                <div className="text-xs text-muted-foreground">{CALC_LABELS.MINIMUM_PRICE_PER_UNIT}</div>
                <div className="mt-1 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                  {currencyFmt.format(result.breakEvenItemPrice)}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{CALC_LABELS.BREAK_EVEN_DESCRIPTION}</p>
              </div>
            )}
            <Button
              variant="secondary"
              size="sm"
              className="h-9 w-full"
              onClick={onCopyResults}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy results
            </Button>
            {/* Profit & pricing: you keep, margin, verdict, segmented margin bar, optional offsite impact */}
            {(isProfit || isPricing) && !isFee && (
              <div className="rounded-lg border p-4">
                {(() => {
                  const m = typeof result.marginPct === "number" ? result.marginPct : 0;
                  const mPct = Math.max(0, Math.min(100, m * 100));
                  const markerLeft = `clamp(0px, calc(${mPct}% - 2px), calc(100% - 4px))`;
                  const { label: tierLabel, badge: tierBadge } = getMarginHealthTier(m);
                  return (
                    <>
                      <p className="text-2xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                        You keep:{" "}
                        <span className="font-extrabold">{currencyFmt.format(result.netProfit)}</span> per
                        order
                      </p>
                      <p className="mt-2 text-base font-medium text-slate-800">
                        Your margin: {(m * 100).toFixed(2)}%
                      </p>
                      <p className="mt-2 text-sm leading-snug text-slate-600">
                        {getMarginVerdictMessage(m)}
                      </p>
                      <div className="mt-3">
                        <div className="flex items-center justify-between gap-2 text-xs text-slate-600">
                          <span className="flex flex-wrap items-center gap-2">
                            <span>{CALC_LABELS.MARGIN_HEALTH}</span>
                            <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${tierBadge}`}>
                              {tierLabel}
                            </span>
                          </span>
                          <span className="hidden shrink-0 text-right text-[10px] text-slate-500 sm:inline sm:text-[11px]">
                            Low → Strong
                          </span>
                        </div>
                        {/* Segmented track: segment widths match margin scale (15% / 10% / 10% / 65%) */}
                        <div className="relative mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-100 ring-1 ring-slate-200/90">
  <div className="absolute inset-0 flex w-full">
    <div className="h-full w-[15%] shrink-0 border-r border-white/70 bg-rose-200" />
    <div className="h-full w-[10%] shrink-0 border-r border-white/70 bg-amber-200" />
    <div className="h-full w-[10%] shrink-0 border-r border-white/70 bg-teal-200" />
    <div className="h-full min-w-0 flex-1 bg-emerald-200" />
  </div>
  <div
    className="absolute top-1/2 z-[2] h-4 w-1 -translate-y-1/2 rounded-full bg-slate-900 shadow-sm ring-1 ring-white/90"
    style={{ left: markerLeft }}
    aria-hidden
  />
</div>
                        <div className="relative mt-1.5 h-4 text-[10px] text-slate-500 sm:text-[11px]">
                          <span className="absolute left-[6%] -translate-x-1/2 whitespace-nowrap">Low</span>
                          <span className="absolute left-[18%] -translate-x-1/2 whitespace-nowrap">OK</span>
                          <span className="absolute left-[30%] -translate-x-1/2 whitespace-nowrap">Good</span>
                          <span className="absolute left-[72%] -translate-x-1/2 whitespace-nowrap">Strong</span>
                        </div>
<p className="mt-1 text-[10px] text-slate-500">
  Based on typical Etsy fee ranges
</p>
                      </div>
                      {offsiteAdsProfitReduction != null && offsiteAdsProfitReduction > 0 ? (
                        <p className="mt-3 text-sm text-slate-600">
                          Offsite ads reduced your profit by{" "}
                          <span className="font-semibold text-slate-800">
                            {currencyFmt.format(offsiteAdsProfitReduction)}
                          </span>
                        </p>
                      ) : null}
                    </>
                  );
                })()}
              </div>
            )}

            <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4">
              <p className="text-sm font-medium leading-snug text-slate-900">
                Get smarter about Etsy pricing
              </p>

              <p className="mt-1 text-xs leading-snug text-slate-500">
                New tools, fee updates, and ways to improve your margins.
              </p>

              <div className="mt-3 space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900/10"
                />

                <button
                  className="w-full rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
                >
                  Get updates
                </button>
              </div>
            </div>

            {blockKeys.map((key) => {
              if (key === "breakEven") {
                return (
                  <div
                    key="breakEven"
                    className={
                      isBreakEven
                        ? "rounded-xl border-2 border-primary/30 bg-primary/5 p-4"
                        : "rounded-lg border p-4"
                    }
                  >
                    <div className="text-xs text-muted-foreground">
                      {isBreakEven ? CALC_LABELS.MINIMUM_PRICE_PER_UNIT : CALC_LABELS.BREAK_EVEN_PRICE_PER_UNIT}
                    </div>
                    <div
                      className={
                        isBreakEven
                          ? "mt-1 text-2xl font-semibold"
                          : "mt-1 text-lg font-medium"
                      }
                    >
                      {currencyFmt.format(result.breakEvenItemPrice!)}
                    </div>
                    {!isBreakEven ? (
                      <p className="mt-1 text-sm text-muted-foreground">{CALC_LABELS.BREAK_EVEN_DESCRIPTION}</p>
                    ) : null}
                  </div>
                );
              }
              if (key === "fee") {
                return (
                  <div
                    key="fee"
                    className={
                      isFee
                        ? "space-y-2 rounded-xl border-2 border-primary/30 bg-primary/5 p-4"
                        : "space-y-2 rounded-lg border p-4"
                    }
                  >
                    <div
                      className={
                        isFee ? "text-base font-medium" : "text-sm font-medium"
                      }
                    >
                      {CALC_LABELS.FEE_BREAKDOWN}
                    </div>
                    <div className="space-y-1.5 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{CALC_LABELS.LISTING_FEE}</span>
                        <span className="font-medium">
                          {currencyFmt.format(result.fees.listingFee)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{transactionFeeLabel}</span>
                        <span className="font-medium">
                          {currencyFmt.format(result.fees.transactionFee)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{paymentProcessingLabel}</span>
                        <span className="font-medium">
                          {currencyFmt.format(result.fees.paymentProcessingFee)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{CALC_LABELS.REGULATORY_FEE}</span>
                        <span className="font-medium">
                          {currencyFmt.format(result.fees.regulatoryFee)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{offsiteAdsLabel}</span>
                        <span className="font-medium">
                          {currencyFmt.format(result.fees.offsiteAdsFee)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div key="summary" className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{CALC_LABELS.ORDER_REVENUE}</span>
                    <span className="font-medium">
                      {currencyFmt.format(result.orderRevenue)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{CALC_LABELS.TOTAL_FEES}</span>
                    <span className="font-medium">
                      {currencyFmt.format(result.totalFees)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{CALC_LABELS.COST_OF_GOODS}</span>
                    <span className="font-medium">
                      {currencyFmt.format(result.totalCogs)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">{CALC_LABELS.YOUR_SHIPPING_COST}</span>
                    <span className="font-medium">
                      {currencyFmt.format(result.totalYourShipping)}
                    </span>
                  </div>
                  {includeTaxEstimate && isProfit && (
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Tax rate</span>
                      <span className="font-medium">
                        {clampNonNeg(parseNumber(taxRatePct)).toFixed(2)}%
                      </span>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Tax estimate (optional) — profit calculator only */}
            {includeTaxEstimate && isProfit && (
              <div className="rounded-lg border p-4 space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Estimated tax</span>
                  <span className="font-medium">
                    {currencyFmt.format(
                      Math.max(0, result.netProfit) *
                        (clampNonNeg(parseNumber(taxRatePct)) / 100)
                    )}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Profit after tax</span>
                  <span className="font-medium">
                    {currencyFmt.format(
                      result.netProfit -
                        Math.max(0, result.netProfit) *
                          (clampNonNeg(parseNumber(taxRatePct)) / 100)
                    )}
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
