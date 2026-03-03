"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Info, Calculator, BadgeCheck } from "lucide-react";

import {
  REGION_PRESETS,
  type Currency,
  type FeeInputs,
  type SellerRegion,
  defaultCurrencyForRegion,
} from "@/lib/fees";
import { calculateOrder } from "@/lib/feeEngine";
import { usePathname } from "next/navigation";
import { CalculatorSwitcher } from "@/components/CalculatorSwitcher";

const clampNonNeg = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

const fmt = (currency: Currency) =>
  new Intl.NumberFormat(currency === "CAD" ? "en-CA" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export type CalculatorPageVariant = "home" | "etsy-profit-calculator" | "etsy-fee-calculator" | "etsy-break-even-calculator";

export function CalculatorPage({ variant = "home" }: { variant?: CalculatorPageVariant }) {
  
  // Robust page intent detection (handles variant prop OR pathname).
  const pathname = usePathname() || "";
  const vRaw =
    typeof variant === "string" && variant !== "home" && variant.length > 0
      ? variant
      : pathname;
  const v = (vRaw || "").toLowerCase();

  const isFee = v.includes("fee");
  const isBreakEven = v.includes("break");
  const isProfit = v.includes("profit") || (!isFee && !isBreakEven);

  const eyebrowText = isFee
    ? "Etsy fee calculator (V1): fee breakdown, break-even, pricing targets."
    : isBreakEven
      ? "Etsy break-even calculator (V1): minimum price after fees and costs."
      : "Etsy profit calculator (V1): fees, break-even, target margin.";

  const heroH1 = isFee
    ? "Etsy Fee Calculator"
    : isBreakEven
      ? "Etsy Break-even Calculator"
      : "Etsy Profit Calculator";

  const heroSubhead = isFee
    ? "Estimate Etsy fees per order and see how each fee impacts your profit."
    : isBreakEven
      ? "Find the minimum item price you need to cover Etsy fees, cost of goods, and shipping."
      : "Calculate your real Etsy profit per order after fees, cost of goods, and shipping.";

  const seoH2 = isFee
    ? "Etsy fee calculator"
    : isBreakEven
      ? "Etsy break-even calculator"
      : "Etsy profit calculator";

  const seoIntro = isFee
    ? "TrueMargin helps you estimate Etsy fees per order and see a clear fee breakdown in seconds. Use it to price new listings and understand what Etsy takes."
    : isBreakEven
      ? "TrueMargin estimates your break-even item price per order after Etsy fees, cost of goods, and shipping costs. Use it to set a clear minimum price."
      : "TrueMargin helps you calculate Etsy profit per order after fees, cost of goods, and shipping. Use it to validate margins before you run ads.";
// Region drives fee rules (and defaults currency)
  const [region, setRegion] = React.useState<SellerRegion>("US");
  const [currency, setCurrency] = React.useState<Currency>(() => defaultCurrencyForRegion("US"));
  const [currencyOverridden, setCurrencyOverridden] = React.useState<boolean>(false);

  // Base inputs
  const [itemPrice, setItemPrice] = React.useState<string>("");
  const [quantity, setQuantity] = React.useState<string>("1");
  const [shippingCharged, setShippingCharged] = React.useState<string>("");
  const [cogsPerUnit, setCogsPerUnit] = React.useState<string>("");
  const [yourShippingCost, setYourShippingCost] = React.useState<string>("");

  // Toggles / advanced
  const [includeOffsiteAds, setIncludeOffsiteAds] = React.useState<boolean>(false);
  const [showAdvanced, setShowAdvanced] = React.useState<boolean>(false);

  // Optional tax estimate (V1 preview)
  const [includeTaxEstimate, setIncludeTaxEstimate] = React.useState<boolean>(false);
  const [taxRatePct, setTaxRatePct] = React.useState<string>("25");

  // Preset for current seller region
  const preset = REGION_PRESETS[region];

  // Advanced overrides (optional)
  const [listingFee, setListingFee] = React.useState<string>(() => String(preset.listingFeeFixed));
  const [transactionFeePct, setTransactionFeePct] = React.useState<string>(() => String(preset.transactionFeePct * 100));
  const [paymentFeePct, setPaymentFeePct] = React.useState<string>(() => String(preset.paymentProcessingPct * 100));
  const [paymentFeeFixed, setPaymentFeeFixed] = React.useState<string>(() => String(preset.paymentProcessingFixed));
  const [regulatoryFeePct, setRegulatoryFeePct] = React.useState<string>(() => String(preset.regulatoryFeePct * 100));
  const [offsiteAdsPct, setOffsiteAdsPct] = React.useState<string>(() => String(preset.offsiteAdsPct * 100));

  // When region changes:
  // - reset fee defaults to that region's preset
  // - auto-set currency unless user explicitly overrode it
  React.useEffect(() => {
    const p = REGION_PRESETS[region];

    setListingFee(String(p.listingFeeFixed));
    setTransactionFeePct(String(p.transactionFeePct * 100));
    setPaymentFeePct(String(p.paymentProcessingPct * 100));
    setPaymentFeeFixed(String(p.paymentProcessingFixed));
    setRegulatoryFeePct(String(p.regulatoryFeePct * 100));
    setOffsiteAdsPct(String(p.offsiteAdsPct * 100));

    if (!currencyOverridden) {
      setCurrency(defaultCurrencyForRegion(region));
    }
  }, [region, currencyOverridden]);

  const currencyFmt = React.useMemo(() => fmt(currency), [currency]);

  const parseNumber = (s: string): number => {
    const cleaned = s.replace(/,/g, "").trim();
    if (cleaned === "") return 0;
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : 0;
  };

  const onCalculate = () => {
    const inputs: FeeInputs = {
      currency,
      itemPrice: clampNonNeg(parseNumber(itemPrice)),
      quantity: Math.max(1, Math.floor(clampNonNeg(parseNumber(quantity)) || 1)),
      shippingCharged: clampNonNeg(parseNumber(shippingCharged)),
      cogsPerUnit: clampNonNeg(parseNumber(cogsPerUnit)),
      yourShippingCost: clampNonNeg(parseNumber(yourShippingCost)),
      includeOffsiteAds,

      // Advanced overrides (defaults come from region preset)
      listingFeeFixed: clampNonNeg(parseNumber(listingFee)),
      transactionFeePct: clampNonNeg(parseNumber(transactionFeePct)) / 100,
      paymentProcessingPct: clampNonNeg(parseNumber(paymentFeePct)) / 100,
      paymentProcessingFixed: clampNonNeg(parseNumber(paymentFeeFixed)),
      regulatoryFeePct: clampNonNeg(parseNumber(regulatoryFeePct)) / 100,
      offsiteAdsPct: clampNonNeg(parseNumber(offsiteAdsPct)) / 100,
    };

    const r = calculateOrder(inputs);
    setResult(r);
    setHasCalculated(true);
  };

  const onReset = () => {
    setItemPrice("");
    setQuantity("1");
    setShippingCharged("");
    setCogsPerUnit("");
    setYourShippingCost("");
    setIncludeOffsiteAds(false);
    setShowAdvanced(false);
    setIncludeTaxEstimate(false);
    setTaxRatePct("25");
    setHasCalculated(false);
    setResult(null);

    setCurrencyOverridden(false);
    setCurrency(defaultCurrencyForRegion(region));

    const p = REGION_PRESETS[region];
    setListingFee(String(p.listingFeeFixed));
    setTransactionFeePct(String(p.transactionFeePct * 100));
    setPaymentFeePct(String(p.paymentProcessingPct * 100));
    setPaymentFeeFixed(String(p.paymentProcessingFixed));
    setRegulatoryFeePct(String(p.regulatoryFeePct * 100));
    setOffsiteAdsPct(String(p.offsiteAdsPct * 100));
  };

  // Results
  const [hasCalculated, setHasCalculated] = React.useState<boolean>(false);
  const [result, setResult] = React.useState<ReturnType<typeof calculateOrder> | null>(null);

  const onCurrencyChange = (next: Currency) => {
    setCurrency(next);
    setCurrencyOverridden(next !== defaultCurrencyForRegion(region));
  };


;

  return (
    <main className="min-h-screen bg-background">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <BadgeCheck className="h-4 w-4" />
            <span>
              {variant === "etsy-fee-calculator"
                ? "Etsy fee calculator (V1): fee breakdown, break-even, pricing targets."
                : variant === "etsy-profit-calculator"
                  ? "Etsy profit calculator (V1): fees, break-even, target margin."
                  : "Calculator V1: accurate fee engine, no dashboards."}
            </span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight">{heroH1}</h1>
          <p className="text-muted-foreground max-w-2xl">{heroSubhead}</p>

          <CalculatorSwitcher current={isFee ? "fee" : isBreakEven ? "break-even" : "profit"} />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Inputs */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calculator className="h-5 w-5" />
                Calculator
              </CardTitle>
              <CardDescription>Enter one order. Get a clear breakdown.</CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="itemPrice">Item price</Label>
                  <Input
                    id="itemPrice"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={itemPrice}
                    onChange={(e) => setItemPrice(e.target.value)}
                    className="mt-2 h-11"
                  />
                </div>

                <div>
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    inputMode="numeric"
                    placeholder="1"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="mt-2 h-11"
                  />
                </div>

                <div>
                  <Label htmlFor="region">Seller region</Label>
                  <select
                    id="region"
                    value={region}
                    onChange={(e) => {
                      const nextRegion = e.target.value as SellerRegion;
                      setRegion(nextRegion);
                      // If they had overridden currency, keep it; otherwise it will auto-set via effect
                    }}
                    className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                  </select>
                  <p className="mt-2 text-xs text-muted-foreground">
                    Region drives fee rules. Currency auto-sets by region.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="shippingCharged">Shipping charged to buyer</Label>
                  <Input
                    id="shippingCharged"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={shippingCharged}
                    onChange={(e) => setShippingCharged(e.target.value)}
                    className="mt-2 h-11"
                  />
                </div>

                <div>
                  <Label htmlFor="cogsPerUnit">COGS per unit</Label>
                  <Input
                    id="cogsPerUnit"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={cogsPerUnit}
                    onChange={(e) => setCogsPerUnit(e.target.value)}
                    className="mt-2 h-11"
                  />
                </div>

                <div>
                  <Label htmlFor="yourShippingCost">Your shipping cost</Label>
                  <Input
                    id="yourShippingCost"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={yourShippingCost}
                    onChange={(e) => setYourShippingCost(e.target.value)}
                    className="mt-2 h-11"
                  />
                </div>

                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="offsiteAds" className="cursor-pointer">
                        Offsite Ads
                      </Label>
                      <span className="text-xs text-muted-foreground">(if this order came from Etsy Offsite Ads)</span>
                    </div>
                  </div>
                  <Switch id="offsiteAds" checked={includeOffsiteAds} onCheckedChange={setIncludeOffsiteAds} />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="taxEstimate" className="cursor-pointer">
                        Include income tax estimate
                      </Label>
                      <span className="text-xs text-muted-foreground">(optional preview)</span>
                    </div>
                  </div>
                  <Switch id="taxEstimate" checked={includeTaxEstimate} onCheckedChange={setIncludeTaxEstimate} />
                </div>

                <div>
                  <Label htmlFor="taxRatePct">Estimated tax rate (%)</Label>
                  <Input
                    id="taxRatePct"
                    inputMode="decimal"
                    placeholder="25"
                    value={taxRatePct}
                    onChange={(e) => setTaxRatePct(e.target.value)}
                    className="mt-2 h-11"
                    disabled={!includeTaxEstimate}
                  />
                  <p className="mt-2 text-xs text-muted-foreground">Applied to net profit only (no deductions modelled).</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Advanced</span>
                </div>
                <Switch checked={showAdvanced} onCheckedChange={setShowAdvanced} />
              </div>

              {showAdvanced && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="md:col-span-1">
                      <Label htmlFor="currency">Display currency</Label>
                      <select
                        id="currency"
                        value={currency}
                        onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                        className="mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        <option value="USD">USD</option>
                        <option value="CAD">CAD</option>
                      </select>
                      <p className="mt-2 text-xs text-muted-foreground">
                        Formatting only. No FX conversion in V1.
                      </p>
                    </div>

                    <div className="md:col-span-2 rounded-lg border p-4">
                      <div className="text-sm font-medium">Current preset</div>
                      <div className="mt-1 text-xs text-muted-foreground">
                        Region: <span className="font-medium">{region === "US" ? "United States" : "Canada"}</span>
                        {" • "}
                        Updated: <span className="font-medium">{preset.updatedAt}</span>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                        <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                          <span className="text-muted-foreground">Listing</span>
                          <span className="font-medium">{currencyFmt.format(preset.listingFeeFixed)}</span>
                        </div>
                        <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                          <span className="text-muted-foreground">Transaction</span>
                          <span className="font-medium">{(preset.transactionFeePct * 100).toFixed(2)}%</span>
                        </div>
                        <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                          <span className="text-muted-foreground">Payment %</span>
                          <span className="font-medium">{(preset.paymentProcessingPct * 100).toFixed(2)}%</span>
                        </div>
                        <div className="flex items-center justify-between rounded-md bg-muted/50 px-3 py-2">
                          <span className="text-muted-foreground">Payment fixed</span>
                          <span className="font-medium">{currencyFmt.format(preset.paymentProcessingFixed)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                      <Label htmlFor="listingFee">Listing fee (fixed)</Label>
                      <Input
                        id="listingFee"
                        inputMode="decimal"
                        value={listingFee}
                        onChange={(e) => setListingFee(e.target.value)}
                        className="mt-2 h-11"
                      />
                    </div>

                    <div>
                      <Label htmlFor="transactionFeePct">Transaction fee (%)</Label>
                      <Input
                        id="transactionFeePct"
                        inputMode="decimal"
                        value={transactionFeePct}
                        onChange={(e) => setTransactionFeePct(e.target.value)}
                        className="mt-2 h-11"
                      />
                    </div>

                    <div>
                      <Label htmlFor="paymentFeePct">Payment fee (%)</Label>
                      <Input
                        id="paymentFeePct"
                        inputMode="decimal"
                        value={paymentFeePct}
                        onChange={(e) => setPaymentFeePct(e.target.value)}
                        className="mt-2 h-11"
                      />
                    </div>

                    <div>
                      <Label htmlFor="paymentFeeFixed">Payment fee (fixed)</Label>
                      <Input
                        id="paymentFeeFixed"
                        inputMode="decimal"
                        value={paymentFeeFixed}
                        onChange={(e) => setPaymentFeeFixed(e.target.value)}
                        className="mt-2 h-11"
                      />
                    </div>

                    <div>
                      <Label htmlFor="regulatoryFeePct">Regulatory fee (%)</Label>
                      <Input
                        id="regulatoryFeePct"
                        inputMode="decimal"
                        value={regulatoryFeePct}
                        onChange={(e) => setRegulatoryFeePct(e.target.value)}
                        className="mt-2 h-11"
                      />
                    </div>

                    <div>
                      <Label htmlFor="offsiteAdsPct">Offsite ads fee (%)</Label>
                      <Input
                        id="offsiteAdsPct"
                        inputMode="decimal"
                        value={offsiteAdsPct}
                        onChange={(e) => setOffsiteAdsPct(e.target.value)}
                        className="mt-2 h-11"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button onClick={onCalculate} className="h-11">
                  Calculate My True Margin
                </Button>
                <Button variant="secondary" onClick={onReset} className="h-11">
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          <Card>
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
                  <div className="rounded-lg border p-4">
                    <div className="text-xs text-muted-foreground">Net profit</div>
                    <div className="mt-1 text-2xl font-semibold">{currencyFmt.format(result.netProfit)}</div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Margin: <span className="font-medium">{(result.marginPct * 100).toFixed(2)}%</span>
                    </div>
                    {/* Margin health indicator */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Margin health</span>
                        <span className="font-medium">{((result.marginPct || 0) * 100).toFixed(0)}%</span>
                      </div>
                      <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                        {(() => {
                          const m = Math.max(0, Math.min(1, result.marginPct || 0));
                          const width = `${m * 100}%`;
                          const band = m < 0.2 ? "bg-red-500" : m < 0.35 ? "bg-yellow-500" : "bg-emerald-500";
                          return <div className={`h-full ${band}`} style={{ width }} />;
                        })()}
                      </div>
                      <div className="mt-2 flex items-center justify-between text-[11px] text-muted-foreground">
                        <span>Low</span>
                        <span>OK</span>
                        <span>Strong</span>
                      </div>

                      <div className="mt-3 rounded-md bg-muted/50 p-3 text-sm">
                        {(() => {
                          const m = (result.marginPct || 0) * 100;
                          const isOffsite = includeOffsiteAds;

                          if (m < 20) {
                            return (
                              <div>
                                <div className="font-medium">Low margin</div>
                                <div className="mt-1 text-muted-foreground">
                                  You’re in a risky zone. Small fee changes or ad costs can wipe out profit.
                                  {isOffsite ? " Offsite Ads is on, which can amplify the risk." : ""}
                                </div>
                              </div>
                            );
                          }

                          if (m < 35) {
                            return (
                              <div>
                                <div className="font-medium">Moderate margin</div>
                                <div className="mt-1 text-muted-foreground">
                                  This is workable, but keep an eye on shipping costs and ads. Try nudging price up or reducing cost of goods to create buffer.
                                  {isOffsite ? " Offsite Ads is on, so your buffer matters more." : ""}
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div>
                              <div className="font-medium">Healthy margin</div>
                              <div className="mt-1 text-muted-foreground">
                                You’ve got a solid buffer after fees. If you want to grow, test higher prices or paid traffic while monitoring conversion.
                                {isOffsite ? " Offsite Ads is on, but you still have room." : ""}
                              </div>
                            </div>
                          );
                        })()}
                      </div>
                    </div>

                    {includeTaxEstimate && (
                      <div className="mt-3 space-y-1 text-sm">
                        {(() => {
                          const rate = clampNonNeg(parseNumber(taxRatePct)) / 100;
                          const taxable = Math.max(0, result.netProfit);
                          const estTax = taxable * rate;
                          const afterTax = result.netProfit - estTax;
                          return (
                            <>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Estimated tax</span>
                                <span className="font-medium">{currencyFmt.format(estTax)}</span>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">Profit after tax</span>
                                <span className="font-medium">{currencyFmt.format(afterTax)}</span>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Order revenue</span>
                      <span className="font-medium">{currencyFmt.format(result.orderRevenue)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Total fees</span>
                      <span className="font-medium">{currencyFmt.format(result.totalFees)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">COGS</span>
                      <span className="font-medium">{currencyFmt.format(result.totalCogs)}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Your shipping</span>
                      <span className="font-medium">{currencyFmt.format(result.totalYourShipping)}</span>
                    </div>

                    {includeTaxEstimate && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Tax rate</span>
                        <span className="font-medium">{clampNonNeg(parseNumber(taxRatePct)).toFixed(2)}%</span>
                      </div>
                    )}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="text-sm font-medium">Fee breakdown</div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Listing fee</span>
                      <span className="font-medium">{currencyFmt.format(result.fees.listingFee)}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Transaction fee</span>
                      <span className="font-medium">{currencyFmt.format(result.fees.transactionFee)}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Payment processing</span>
                      <span className="font-medium">{currencyFmt.format(result.fees.paymentProcessingFee)}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Regulatory fee</span>
                      <span className="font-medium">{currencyFmt.format(result.fees.regulatoryFee)}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Offsite ads</span>
                      <span className="font-medium">{currencyFmt.format(result.fees.offsiteAdsFee)}</span>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>

{/* SEO content section */}
<section className="mx-auto mt-14 max-w-5xl px-4 pb-16">
  <div className="rounded-2xl border bg-card p-6 shadow-sm">
    <h2 className="text-2xl font-semibold tracking-tight">
              {variant === "etsy-fee-calculator"
                ? "Etsy fee calculator"
                : variant === "etsy-profit-calculator"
                  ? "Etsy profit calculator"
                  : seoH2}
            </h2>
    <p className="mt-2 max-w-3xl text-muted-foreground">
      {variant === "etsy-fee-calculator"
                ? "TrueMargin helps you estimate Etsy fees per order and see a clear fee breakdown in seconds."
                : variant === "etsy-profit-calculator"
                  ? "TrueMargin helps you calculate Etsy profit per order after fees, cost of goods, and shipping."
                  : "TrueMargin estimates your real profit per order after Etsy fees, cost of goods, and shipping costs."}
      Use it to price new listings, validate margins before you run ads, and find your break-even price quickly.
    </p>

    <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
      <div className="space-y-3">
        <h3 className="text-lg font-semibold">What this calculator includes</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Etsy transaction fee, payment processing fee, and listing fee (based on your seller region preset).</li>
          <li>Optional Offsite Ads fee when you toggle it on.</li>
          <li>Cost of goods (per unit) and your shipping cost to calculate true profit.</li>
          <li>Break-even item price and target margin pricing suggestions.</li>
        </ul>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-semibold">How to use it</h3>
        <ol className="list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
          <li>Enter your item price, quantity, and shipping charged.</li>
          <li>Add cost of goods and your shipping cost to get true profit.</li>
          <li>Toggle Offsite Ads if the order came from Etsy Offsite Ads.</li>
          <li>Check break-even and target margin to refine pricing.</li>
        </ol>
      </div>
    </div>

    <div className="mt-10">
      <h3 className="text-lg font-semibold">FAQ</h3>
      <div className="mt-4 space-y-4">
        <div className="rounded-xl border p-4">
          <div className="font-medium">How does the Etsy fee calculator work?</div>
          <div className="mt-2 text-sm text-muted-foreground">
            Enter your item price, quantity, shipping charged, cost of goods, and your shipping cost. TrueMargin estimates Etsy fees and shows your net profit, margin, break-even price, and a target margin price.
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <div className="font-medium">Does this include Etsy payment processing fees?</div>
          <div className="mt-2 text-sm text-muted-foreground">
            Yes. The calculator includes payment processing as a percentage plus a fixed fee, based on your selected seller region and the current preset values.
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <div className="font-medium">Do Etsy fees apply to shipping?</div>
          <div className="mt-2 text-sm text-muted-foreground">
            In most cases, Etsy fees are calculated on the order total, which can include shipping charged. TrueMargin models fees on the combined order revenue (item subtotal plus shipping charged).
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <div className="font-medium">What is break-even price?</div>
          <div className="mt-2 text-sm text-muted-foreground">
            Break-even item price is the minimum price per unit you need to charge to make $0 profit after fees, cost of goods, and your shipping cost, based on the inputs you provided.
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <div className="font-medium">Is there currency conversion?</div>
          <div className="mt-2 text-sm text-muted-foreground">
            Not in V1. Currency is used for formatting only. Fees are set by seller region presets, and the calculator does not convert between currencies.
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

      </section>
</main>
  );
}