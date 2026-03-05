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

  const heroH2 = isFee
    ? "See exactly how much Etsy takes per order"
    : isBreakEven
      ? "Find your minimum price to cover fees and costs"
      : "Calculate real profit after every Etsy fee";

  const heroSubhead = isFee
    ? "Estimate Etsy fees per order with a clear breakdown: listing, transaction, processing, offsite ads, and shipping. See total fees instantly."
    : isBreakEven
      ? "Enter your order details to get the break-even price per unit—the minimum you need to charge so fees, COGS, and shipping don’t eat your margin."
      : "Enter one order and see net profit, margin, and a full fee breakdown. Know what you keep after listing, transaction, processing, and offsite ads.";

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
const seoContent = React.useMemo(() => {
  if (variant === "etsy-fee-calculator") {
    return {
      heading: "Etsy fee calculator",
      intro:
        "Estimate Etsy fees for an order, including listing, transaction, payment processing, and optional Offsite Ads. See fees alongside net profit so you can price with confidence.",
      includes: [
        "Transaction, payment processing, and listing fee estimates (based on your seller region preset).",
        "Optional Offsite Ads fee when you toggle it on.",
        "A clear fee breakdown plus net profit and margin.",
        "Break-even and target margin insights when available."
      ],
      howTo: [
        "Enter item price, quantity, and shipping charged.",
        "Add cost of goods per unit and your shipping cost.",
        "Select seller region and toggle Offsite Ads if needed.",
        "Click Calculate to see total fees and the breakdown."
      ],
      faqs: [
        {
          q: "What fees does this Etsy fee calculator include?",
          a: "It estimates listing, transaction, and payment processing fees, plus optional Offsite Ads when enabled. Presets vary by seller region."
        },
        {
          q: "Do Etsy fees apply to shipping?",
          a: "Often, yes. This calculator applies fees to the combined revenue (item subtotal plus shipping charged) where applicable."
        },
        {
          q: "Is this an exact match to my Etsy statement?",
          a: "No. It’s an estimate for planning and pricing. Your final statement can differ based on taxes, shop settings, and promotions."
        }
      ]
    };
  }

  if (variant === "etsy-break-even-calculator") {
    return {
      heading: "Etsy break-even calculator",
      intro:
        "Find the minimum price per unit you need to charge to avoid losing money after fees and costs. Useful for new listings and price checks before running ads.",
      includes: [
        "Break-even price per unit based on fees, cost of goods per unit, and shipping cost.",
        "Fee estimates including listing, transaction, payment processing, and optional Offsite Ads.",
        "Net profit and margin at your current price for comparison.",
        "Optional income tax estimate (preview) applied to net profit only."
      ],
      howTo: [
        "Enter item price, quantity, and shipping charged.",
        "Add cost of goods per unit and your shipping cost.",
        "Choose seller region and toggle Offsite Ads if needed.",
        "Click Calculate to see break-even per unit and your current profit."
      ],
      faqs: [
        {
          q: "What is break-even price?",
          a: "It’s the minimum price per unit required to make $0 profit after fees and costs, based on the inputs you provide."
        },
        {
          q: "Does break-even include shipping?",
          a: "Yes. The calculator considers shipping charged and your shipping cost, and models fees on the combined revenue where applicable."
        },
        {
          q: "Can I use this for multi-quantity orders?",
          a: "Yes. Set Quantity to match the order and enter cost of goods per unit. Results are per order, with break-even shown per unit."
        }
      ]
    };
  }

  return {
    heading: "Etsy profit calculator",
    intro:
      "Calculate real Etsy profit per order after fees, cost of goods, and shipping. Use it to validate margins before ads and spot pricing mistakes fast.",
    includes: [
      "Transaction, payment processing, and listing fee estimates (based on your seller region preset).",
      "Cost of goods (per unit) and your shipping cost to calculate true profit.",
      "Optional Offsite Ads fee when you toggle it on.",
      "Break-even and target margin pricing suggestions."
    ],
    howTo: [
      "Enter item price, quantity, and shipping charged.",
      "Add cost of goods per unit and your shipping cost.",
      "Toggle Offsite Ads if the order came from Etsy Offsite Ads.",
      "Click Calculate to see net profit and profit margin."
    ],
    faqs: [
      {
        q: "How does the Etsy profit calculator work?",
        a: "Enter your order price, shipping charged, costs, and region. The calculator estimates fees and shows your net profit, margin, break-even, and target margin pricing."
      },
      {
        q: "Does this include Etsy payment processing fees?",
        a: "Yes. It includes payment processing as a percentage plus a fixed fee, based on your selected seller region preset."
      },
      {
        q: "Is there currency conversion?",
        a: "Not in V1. Currency is used for formatting only. Fees are based on your seller region preset."
      }
    ]
  };
}, [variant]);


  return (
    <main className="calculator-page-bg min-h-screen text-[#EAF0FF]">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 text-sm text-[#9AA6BF]">
            <BadgeCheck className="h-4 w-4" />
            <span>{eyebrowText}</span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-[#EAF0FF]">{heroH1}</h1>
          <h2 className="text-lg font-medium text-[#9AA6BF]">{heroH2}</h2>
          <p className="max-w-2xl text-[#9AA6BF]">{heroSubhead}</p>

          <CalculatorSwitcher
            current={isFee ? "fee" : isBreakEven ? "break-even" : "profit"}
            dark
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Inputs */}
          <Card className="border-white/10 bg-white/95 shadow-lg backdrop-blur-sm lg:col-span-2">
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
                  {/* 1. Top 3: Net profit, Margin %, Margin health — always first */}
                  <div className="rounded-lg border p-4">
                    <div className="text-xs text-muted-foreground">Net profit</div>
                    <div className="mt-1 text-2xl font-semibold">{currencyFmt.format(result.netProfit)}</div>
                    <div className="mt-2 text-sm text-muted-foreground">
                      Margin: <span className="font-medium">{(result.marginPct * 100).toFixed(2)}%</span>
                    </div>
                    <div className="mt-3">
                      {(() => {
                        const m = typeof result.marginPct === "number" ? result.marginPct : 0;
                        let tierLabel = "Loss";
                        let tierBadge = "bg-rose-50 text-rose-700 ring-1 ring-rose-200";
                        if (m >= 35) {
                          tierLabel = "Strong";
                          tierBadge = "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200";
                        } else if (m >= 25) {
                          tierLabel = "Healthy";
                          tierBadge = "bg-teal-50 text-teal-700 ring-1 ring-teal-200";
                        } else if (m >= 15) {
                          tierLabel = "Tight";
                          tierBadge = "bg-amber-50 text-amber-700 ring-1 ring-amber-200";
                        }
                        const clamp = (x: number) => Math.max(0, Math.min(100, x));
                        const markerLeft = `calc(${clamp(m)}% - 6px)`;
                        return (
                          <div>
                            <div className="flex items-center justify-between text-xs text-slate-600">
                              <span className="flex items-center gap-2">
                                <span>Margin health</span>
                                <span className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${tierBadge}`}>
                                  {tierLabel}
                                </span>
                              </span>
                              <span>Loss → Strong</span>
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
                          </div>
                        );
                      })()}
                    </div>
                  </div>

                  {/* Route-ordered blocks: profit = summary→fee→be; fee = fee→be→summary; break-even = be→fee→summary */}
                  {[
                    ...(isProfit
                      ? [
                          "summary",
                          "fee",
                          ...(result.breakEvenItemPrice != null ? ["breakEven"] : []),
                        ]
                      : isFee
                        ? [
                            "fee",
                            ...(result.breakEvenItemPrice != null ? ["breakEven"] : []),
                            "summary",
                          ]
                        : [
                            ...(result.breakEvenItemPrice != null ? ["breakEven"] : []),
                            "fee",
                            "summary",
                          ]),
                  ].map((key) => {
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
                            Break-even price per unit
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
                            Minimum item price to cover fees, COGS, and shipping.
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
                            Fee breakdown
                          </div>
                          <div className="space-y-1.5 text-sm">
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Listing fee</span>
                              <span className="font-medium">
                                {currencyFmt.format(result.fees.listingFee)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Transaction fee</span>
                              <span className="font-medium">
                                {currencyFmt.format(result.fees.transactionFee)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Payment processing</span>
                              <span className="font-medium">
                                {currencyFmt.format(result.fees.paymentProcessingFee)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Regulatory fee</span>
                              <span className="font-medium">
                                {currencyFmt.format(result.fees.regulatoryFee)}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-muted-foreground">Offsite ads</span>
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
                          <span className="text-muted-foreground">Order revenue</span>
                          <span className="font-medium">
                            {currencyFmt.format(result.orderRevenue)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Total fees</span>
                          <span className="font-medium">
                            {currencyFmt.format(result.totalFees)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">COGS</span>
                          <span className="font-medium">
                            {currencyFmt.format(result.totalCogs)}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Your shipping</span>
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
        </div>
      </section>

{/* SEO section */}
<section className="mt-10 rounded-2xl border border-white/10 bg-white/95 p-6 shadow-lg backdrop-blur-sm">
  <h2 className="text-xl font-semibold text-slate-900">{seoContent.heading}</h2>
  <p className="mt-2 text-slate-600">{seoContent.intro}</p>

  <div className="mt-6 grid gap-6 md:grid-cols-2">
    <div>
      <h3 className="font-medium">What this calculator includes</h3>
      <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-600">
        {seoContent.includes.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>

    <div>
      <h3 className="font-medium">How to use it</h3>
      <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm text-slate-600">
        {seoContent.howTo.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
    </div>
  </div>

  <div className="mt-8">
    <h3 className="font-medium">FAQ</h3>
    <div className="mt-3 space-y-3">
      {seoContent.faqs.map((f) => (
        <div key={f.q} className="rounded-xl border border-slate-200 p-4">
          <p className="font-medium">{f.q}</p>
          <p className="mt-1 text-sm text-slate-600">{f.a}</p>
        </div>
      ))}
    </div>
  </div>
</section>
  </main>
  );
}
