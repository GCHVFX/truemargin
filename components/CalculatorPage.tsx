"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Info, Calculator, BadgeCheck, Copy } from "lucide-react";

import {
  REGION_PRESETS,
  type Currency,
  type FeeInputs,
  type SellerRegion,
  defaultCurrencyForRegion,
} from "@/lib/fees";
import { calculateOrder } from "@/lib/feeEngine";
import { getMarginHealthTier, CALC_LABELS } from "@/lib/calculatorHelpers";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { CalculatorSwitcher } from "@/components/CalculatorSwitcher";
import { CalculatorInputs } from "@/components/CalculatorInputs";
import { CalculatorResults } from "@/components/CalculatorResults";
import { CalculatorSeoSection } from "@/components/CalculatorSeoSection";
import { getCalculatorConfig } from "@/config/calculators";
import { getCalculatorContent, getSeoContent } from "@/lib/calculatorContent";

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
  
  const pathname = usePathname() || "";
  const searchParams = useSearchParams();
  const router = useRouter();
  const vRaw =
    typeof variant === "string" && variant !== "home" && variant.length > 0
      ? variant
      : pathname;
  const v = (vRaw || "").toLowerCase();

  const isFee = v.includes("fee");
  const isBreakEven = v.includes("break");
  const isProfit = v.includes("profit") || (!isFee && !isBreakEven);

  const config = getCalculatorConfig(vRaw || pathname);
  const contentKey = config?.contentKey ?? (isFee ? "fee" : isBreakEven ? "break-even" : "profit");
  const content = config?.content ?? getCalculatorContent(contentKey);

  // Region drives fee rules (fallback when no config)
  const heroH1 = config?.content.heroH1 ?? (isFee
    ? "Etsy Fee Calculator"
    : isBreakEven
      ? "Etsy Break-even Calculator"
      : "Etsy Profit Calculator");

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

  // Sync URL query params ↔ calculator inputs
  React.useEffect(() => {
    const p = searchParams;
    const price = p.get("price");
    if (price != null) setItemPrice(price);
    const q = p.get("quantity");
    if (q != null) setQuantity(q);
    const ship = p.get("shippingCharged");
    if (ship != null) setShippingCharged(ship);
    const cogs = p.get("cogs");
    if (cogs != null) setCogsPerUnit(cogs);
    const shipCost = p.get("shippingCost");
    if (shipCost != null) setYourShippingCost(shipCost);
    const reg = p.get("region");
    if (reg === "US" || reg === "CA") setRegion(reg);
    const offsite = p.get("offsiteAds");
    if (offsite === "true") setIncludeOffsiteAds(true);
    else if (offsite === "false") setIncludeOffsiteAds(false);
  }, [searchParams]);

  const skipNextUrlWrite = React.useRef(true);
  React.useEffect(() => {
    if (skipNextUrlWrite.current) {
      skipNextUrlWrite.current = false;
      return;
    }
    const params = new URLSearchParams();
    params.set("price", itemPrice);
    params.set("quantity", quantity);
    params.set("shippingCharged", shippingCharged);
    params.set("cogs", cogsPerUnit);
    params.set("shippingCost", yourShippingCost);
    params.set("region", region);
    params.set("offsiteAds", String(includeOffsiteAds));
    const query = params.toString();
    const newUrl = query ? `${pathname}?${query}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [pathname, router, itemPrice, quantity, shippingCharged, cogsPerUnit, yourShippingCost, region, includeOffsiteAds]);

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

  const onCopyResults = React.useCallback(() => {
    if (!result) return;
    const { label: tierLabel } = getMarginHealthTier(result.marginPct);
    const itemSubtotal = result.orderRevenue - clampNonNeg(parseNumber(shippingCharged));
    const lines = [
      "Etsy Calculator Results",
      "—",
      `Item price: ${currencyFmt.format(itemSubtotal)}`,
      `${CALC_LABELS.SHIPPING_CHARGED_TO_BUYER}: ${currencyFmt.format(clampNonNeg(parseNumber(shippingCharged)))}`,
      `Net profit: ${currencyFmt.format(result.netProfit)}`,
      `Margin: ${(result.marginPct * 100).toFixed(2)}%`,
      `Margin health: ${tierLabel}`,
      `Total fees: ${currencyFmt.format(result.totalFees)}`,
      `Cost of goods: ${currencyFmt.format(result.totalCogs)}`,
      `${CALC_LABELS.YOUR_SHIPPING_COST}: ${currencyFmt.format(result.totalYourShipping)}`,
      result.breakEvenItemPrice != null
        ? `Break-even price per unit: ${currencyFmt.format(result.breakEvenItemPrice)}`
        : "Break-even price per unit: —",
    ];
    navigator.clipboard.writeText(lines.join("\n"));
  }, [result, shippingCharged, currencyFmt]);

  return (
    <main className="calculator-page-bg min-h-screen text-[#EAF0FF]">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 text-sm text-[#9AA6BF]">
            <BadgeCheck className="h-4 w-4" />
            <span>{content.eyebrowText}</span>
          </div>

          <h1 className="text-3xl font-semibold tracking-tight text-[#EAF0FF]">{content.heroH1}</h1>
          <h2 className="text-lg font-medium text-[#9AA6BF]">{content.heroH2}</h2>
          <p className="max-w-2xl text-[#9AA6BF]">{content.heroSubhead}</p>

          <CalculatorSwitcher
            current={contentKey}
            switcher={config?.switcher}
            dark
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <CalculatorInputs
            itemPrice={itemPrice}
            setItemPrice={setItemPrice}
            quantity={quantity}
            setQuantity={setQuantity}
            region={region}
            setRegion={setRegion}
            shippingCharged={shippingCharged}
            setShippingCharged={setShippingCharged}
            cogsPerUnit={cogsPerUnit}
            setCogsPerUnit={setCogsPerUnit}
            yourShippingCost={yourShippingCost}
            setYourShippingCost={setYourShippingCost}
            includeOffsiteAds={includeOffsiteAds}
            setIncludeOffsiteAds={setIncludeOffsiteAds}
            includeTaxEstimate={includeTaxEstimate}
            setIncludeTaxEstimate={setIncludeTaxEstimate}
            taxRatePct={taxRatePct}
            setTaxRatePct={setTaxRatePct}
            showAdvanced={showAdvanced}
            setShowAdvanced={setShowAdvanced}
            currency={currency}
            onCurrencyChange={onCurrencyChange}
            preset={preset}
            listingFee={listingFee}
            setListingFee={setListingFee}
            transactionFeePct={transactionFeePct}
            setTransactionFeePct={setTransactionFeePct}
            paymentFeePct={paymentFeePct}
            setPaymentFeePct={setPaymentFeePct}
            paymentFeeFixed={paymentFeeFixed}
            setPaymentFeeFixed={setPaymentFeeFixed}
            regulatoryFeePct={regulatoryFeePct}
            setRegulatoryFeePct={setRegulatoryFeePct}
            offsiteAdsPct={offsiteAdsPct}
            setOffsiteAdsPct={setOffsiteAdsPct}
            onCalculate={onCalculate}
            onReset={onReset}
          />
          <CalculatorResults
            hasCalculated={hasCalculated}
            result={result}
            isProfit={isProfit}
            isFee={isFee}
            isBreakEven={isBreakEven}
            resultOrder={config?.resultOrder}
            currency={currency}
            taxRatePct={taxRatePct}
            includeTaxEstimate={includeTaxEstimate}
            parseNumber={parseNumber}
            clampNonNeg={clampNonNeg}
            onCopyResults={onCopyResults}
          />
        </div>
      </section>

      <CalculatorSeoSection seoContent={"seoContent" in content && content.seoContent ? content.seoContent : getSeoContent(contentKey)} />
  </main>
  );
}
