"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import type { CalcResult } from "@/lib/feeEngine";
import type { Currency } from "@/lib/fees";
import type { ResultBlockKey } from "@/config/calculators/types";
import { getMarginHealthTier, MARGIN_INSIGHT_MESSAGES, CALC_LABELS } from "@/lib/calculatorHelpers";

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
  /** Config-driven result block order. When provided, overrides isProfit/isFee/isBreakEven ordering. */
  resultOrder?: ResultBlockKey[];
  includeTaxEstimate: boolean;
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
  resultOrder,
  includeTaxEstimate,
  taxRatePct,
  onCopyResults,
  parseNumber,
  clampNonNeg,
}: CalculatorResultsProps) {
  const currencyFmt = React.useMemo(() => fmt(currency), [currency]);

  return (
    <Card className="border-white/10 bg-emerald-50/95 shadow-lg backdrop-blur-sm">
      <CardHeader>
        <CardTitle>Results</CardTitle>
        <CardDescription>Per order (all values include quantity).</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        {!hasCalculated || !result ? (
          <div className="text-sm text-muted-foreground">
            Enter values and click <span className="font-medium">Calculate</span>.
          </div>
        ) : (
          <>
            <Button
              variant="secondary"
              size="sm"
              className="h-9 w-full"
              onClick={onCopyResults}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy results
            </Button>
            {/* 1. Top 3: Net profit, Margin %, Margin health — always first */}
            <div className="rounded-lg border p-4">
              <div className="text-xs text-muted-foreground">Net profit</div>
              <div className="mt-1 text-2xl font-semibold">{currencyFmt.format(result.netProfit)}</div>
              <div className="mt-2 text-sm text-muted-foreground">
                Margin: <span className="font-medium">{(result.marginPct * 100).toFixed(2)}%</span>
              </div>
              <div className="mt-3">
                {(() => {
                  const { label: tierLabel, badge: tierBadge } = getMarginHealthTier(result.marginPct);
                  const m = typeof result.marginPct === "number" ? result.marginPct : 0;
                  const mPct = m * 100;
                  const clamp = (x: number) => Math.max(0, Math.min(100, x));
                  const markerLeft = `calc(${clamp(mPct)}% - 6px)`;
                  return (
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-600">
                        <span className="flex items-center gap-2">
                          <span>{CALC_LABELS.MARGIN_HEALTH}</span>
                          <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${tierBadge}`}>
                            {tierLabel}
                          </span>
                        </span>
                        <span>Risky → Strong</span>
                      </div>
                      <div className="relative mt-2 h-3 w-full overflow-hidden rounded-full bg-slate-100">
                        <div className="absolute inset-y-0 left-0 w-[15%] bg-rose-200" />
                        <div className="absolute inset-y-0 left-[15%] w-[10%] bg-amber-200" />
                        <div className="absolute inset-y-0 left-[25%] w-[10%] bg-teal-200" />
                        <div className="absolute inset-y-0 left-[35%] w-[65%] bg-emerald-200" />
                        <div
                          className="absolute top-1/2 h-5 w-1 -translate-y-1/2 rounded-full bg-slate-900"
                          style={{ left: markerLeft }}
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-1 flex justify-between text-[11px] text-slate-500">
                        <span>&lt;15%</span>
                        <span>15–25%</span>
                        <span>25–35%</span>
                        <span>&gt;35%</span>
                      </div>
                      <p className="mt-2 text-xs text-slate-500 leading-snug">
                        {MARGIN_INSIGHT_MESSAGES[tierLabel]}
                      </p>
                    </div>
                  );
                })()}
              </div>
            </div>

            {/* Config-driven or fallback ordering: profit = summary→fee→be; fee = fee→be→summary; break-even = be→fee→summary */}
            {(resultOrder ?? (isProfit
              ? ["summary", "fee", ...(result.breakEvenItemPrice != null ? ["breakEven"] : [])]
              : isFee
                ? ["fee", ...(result.breakEvenItemPrice != null ? ["breakEven"] : []), "summary"]
                : ["breakEven", "fee", "summary"].filter((k) => k !== "breakEven" || result.breakEvenItemPrice != null)
            )).filter((key) => key !== "breakEven" || result.breakEvenItemPrice != null).map((key) => {
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
                      {CALC_LABELS.BREAK_EVEN_PRICE_PER_UNIT}
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
                    <p className="mt-1 text-sm text-muted-foreground">
                      {CALC_LABELS.BREAK_EVEN_DESCRIPTION}
                    </p>
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
                        <span className="text-muted-foreground">{CALC_LABELS.TRANSACTION_FEE}</span>
                        <span className="font-medium">
                          {currencyFmt.format(result.fees.transactionFee)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">{CALC_LABELS.PAYMENT_PROCESSING}</span>
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
                        <span className="text-muted-foreground">{CALC_LABELS.OFFSITE_ADS}</span>
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
                  {includeTaxEstimate && (
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

            {/* Tax estimate (optional) */}
            {includeTaxEstimate && (
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
