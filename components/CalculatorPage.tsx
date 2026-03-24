"use client";

import * as React from "react";
import { BadgeCheck } from "lucide-react";

import {
  REGION_PRESETS,
  type Currency,
  type FeeInputs,
  type SellerRegion,
  defaultCurrencyForRegion,
} from "@/lib/fees";
import {
  calculateOrder,
  calculateTargetMarginItemPrice,
  calculateBreakEvenItemPrice,
} from "@/lib/feeEngine";
import { getMarginHealthTier, getMarginVerdictMessage, CALC_LABELS } from "@/lib/calculatorHelpers";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { CalculatorSwitcher } from "@/components/CalculatorSwitcher";
import { CalculatorInputs, type EtsyCalculatorVariant } from "@/components/CalculatorInputs";
import { CalculatorResults } from "@/components/CalculatorResults";
import WaitlistForm from "@/components/WaitlistForm";
import { getCalculatorConfig } from "@/config/calculators";
import { getCalculatorContent } from "@/lib/calculatorContent";
import { track } from "@/lib/analytics";

const clampNonNeg = (n: number) => (Number.isFinite(n) && n > 0 ? n : 0);

const fmt = (currency: Currency) =>
  new Intl.NumberFormat(currency === "CAD" ? "en-CA" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export type CalculatorPageVariant =
  | "home"
  | "etsy-profit-calculator"
  | "etsy-fee-calculator"
  | "etsy-break-even-calculator"
  | "etsy-pricing-calculator";

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
  const isPricing = v.includes("pricing");
  const isProfit = v.includes("profit") || (!isFee && !isBreakEven && !isPricing);

  const calculatorVariant: EtsyCalculatorVariant = isPricing
    ? "pricing"
    : isFee
      ? "fee"
      : isBreakEven
        ? "breakEven"
        : "profit";

  const config = getCalculatorConfig(vRaw || pathname);
  const contentKey = config?.contentKey ?? (isPricing ? "pricing" : isFee ? "fee" : isBreakEven ? "break-even" : "profit");

  const knownContentKeys = ["profit", "fee", "break-even", "pricing"] as const;
  type KnownContentKey = typeof knownContentKeys[number];
  const isKnownKey = (k: string): k is KnownContentKey =>
    knownContentKeys.includes(k as KnownContentKey);

  const content = config?.content ?? (isKnownKey(contentKey) ? getCalculatorContent(contentKey) : null);

  React.useEffect(() => {
    track("calculator_page_view", { variant: vRaw || pathname, contentKey });
  }, [vRaw, pathname, contentKey]);

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
  const [targetMarginPct, setTargetMarginPct] = React.useState<string>("30");

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
    const targetMargin = p.get("targetMargin");
    if (targetMargin != null) setTargetMarginPct(targetMargin);
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
    if (isPricing) params.set("targetMargin", targetMarginPct);
    const query = params.toString();
    const newUrl = query ? `${pathname}?${query}` : pathname;
    router.replace(newUrl, { scroll: false });
  }, [pathname, router, itemPrice, quantity, shippingCharged, cogsPerUnit, yourShippingCost, region, includeOffsiteAds, targetMarginPct, isPricing]);

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
    const qty = Math.max(1, Math.floor(clampNonNeg(parseNumber(quantity)) || 1));
    const shippingChargedNum = clampNonNeg(parseNumber(shippingCharged));

    const feePresetFields = {
      listingFeeFixed: clampNonNeg(parseNumber(listingFee)),
      transactionFeePct: clampNonNeg(parseNumber(transactionFeePct)) / 100,
      paymentProcessingPct: clampNonNeg(parseNumber(paymentFeePct)) / 100,
      paymentProcessingFixed: clampNonNeg(parseNumber(paymentFeeFixed)),
      regulatoryFeePct: clampNonNeg(parseNumber(regulatoryFeePct)) / 100,
      offsiteAdsPct: clampNonNeg(parseNumber(offsiteAdsPct)) / 100,
    };

    let inputs: FeeInputs;

    if (isFee) {
      inputs = {
        currency,
        itemPrice: clampNonNeg(parseNumber(itemPrice)),
        quantity: qty,
        shippingCharged: shippingChargedNum,
        cogsPerUnit: 0,
        yourShippingCost: 0,
        includeOffsiteAds,
        ...feePresetFields,
      };
    } else if (isBreakEven) {
      const baseForBreakEven: FeeInputs = {
        currency,
        itemPrice: 0,
        quantity: qty,
        shippingCharged: shippingChargedNum,
        cogsPerUnit: clampNonNeg(parseNumber(cogsPerUnit)),
        yourShippingCost: clampNonNeg(parseNumber(yourShippingCost)),
        includeOffsiteAds,
        ...feePresetFields,
      };
      const solvedItemPrice = calculateBreakEvenItemPrice(baseForBreakEven);
      if (solvedItemPrice == null) {
        setResult(null);
        setOffsiteAdsProfitReduction(null);
        setHasCalculated(true);
        track("calculator_calculate_clicked");
        return;
      }
      inputs = { ...baseForBreakEven, itemPrice: solvedItemPrice };
    } else if (isPricing) {
      const baseForPricing: FeeInputs = {
        currency,
        itemPrice: 0,
        quantity: 1,
        shippingCharged: shippingChargedNum,
        cogsPerUnit: clampNonNeg(parseNumber(cogsPerUnit)),
        yourShippingCost: clampNonNeg(parseNumber(yourShippingCost)),
        includeOffsiteAds,
        ...feePresetFields,
      };
      const solvedItemPrice = calculateTargetMarginItemPrice(
        baseForPricing,
        clampNonNeg(parseNumber(targetMarginPct)) / 100
      );
      if (solvedItemPrice == null) {
        setResult(null);
        setOffsiteAdsProfitReduction(null);
        setHasCalculated(true);
        track("calculator_calculate_clicked");
        return;
      }
      inputs = { ...baseForPricing, itemPrice: solvedItemPrice };
    } else {
      inputs = {
        currency,
        itemPrice: clampNonNeg(parseNumber(itemPrice)),
        quantity: qty,
        shippingCharged: shippingChargedNum,
        cogsPerUnit: clampNonNeg(parseNumber(cogsPerUnit)),
        yourShippingCost: clampNonNeg(parseNumber(yourShippingCost)),
        includeOffsiteAds,
        ...feePresetFields,
      };
    }

    const r = calculateOrder(inputs);
    setResult(r);
    if (isFee) {
      setOffsiteAdsProfitReduction(null);
    } else if (inputs.includeOffsiteAds && (isProfit || isPricing)) {
      const withoutAds = calculateOrder({ ...inputs, includeOffsiteAds: false });
      setOffsiteAdsProfitReduction(Math.max(0, withoutAds.netProfit - r.netProfit));
    } else {
      setOffsiteAdsProfitReduction(null);
    }
    setHasCalculated(true);
    if (typeof window !== "undefined") {
      const umami = (window as Window & {
        umami?: { track: (eventName: string, data?: { calculator: string }) => void };
      }).umami;
      if (umami) {
        umami.track("calculator_run", {
          calculator: contentKey,
        });
      }
    }
    track("calculator_calculate_clicked");
  };

  const onReset = () => {
    track("calculator_reset_clicked");
    setItemPrice("");
    setQuantity("1");
    setShippingCharged("");
    setCogsPerUnit("");
    setYourShippingCost("");
    setIncludeOffsiteAds(false);
    setShowAdvanced(false);
    setIncludeTaxEstimate(false);
    setTaxRatePct("25");
    setTargetMarginPct("30");
    setHasCalculated(false);
    setResult(null);
    setOffsiteAdsProfitReduction(null);

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
  /** Profit without offsite ads minus profit with ads, when ads are on (same inputs, comparison only). */
  const [offsiteAdsProfitReduction, setOffsiteAdsProfitReduction] = React.useState<number | null>(null);

  const onCurrencyChange = (next: Currency) => {
    setCurrency(next);
    setCurrencyOverridden(next !== defaultCurrencyForRegion(region));
  };

  const onCopyResults = React.useCallback(() => {
    if (!result) return;
    const shippingNum = clampNonNeg(parseNumber(shippingCharged));
    const itemSubtotal = result.orderRevenue - shippingNum;

    if (isFee) {
      const lines = [
        "Etsy Fee Calculator Results",
        "N/A",
        `${CALC_LABELS.TOTAL_FEES}: ${currencyFmt.format(result.totalFees)}`,
        `${CALC_LABELS.LISTING_FEE}: ${currencyFmt.format(result.fees.listingFee)}`,
        `Transaction fee: ${currencyFmt.format(result.fees.transactionFee)}`,
        `${CALC_LABELS.PAYMENT_PROCESSING}: ${currencyFmt.format(result.fees.paymentProcessingFee)}`,
        `${CALC_LABELS.REGULATORY_FEE}: ${currencyFmt.format(result.fees.regulatoryFee)}`,
        `${CALC_LABELS.OFFSITE_ADS}: ${currencyFmt.format(result.fees.offsiteAdsFee)}`,
      ];
      navigator.clipboard.writeText(lines.join("\n"));
      track("calculator_copy_results_clicked");
      return;
    }

    if (isBreakEven) {
      const lines = [
        "Etsy Break-even Calculator Results",
        "N/A",
        `${CALC_LABELS.MINIMUM_PRICE_PER_UNIT}: ${result.breakEvenItemPrice != null ? currencyFmt.format(result.breakEvenItemPrice) : "N/A"}`,
        `${CALC_LABELS.BREAK_EVEN_DESCRIPTION}`,
        "N/A",
        `${CALC_LABELS.FEE_BREAKDOWN}`,
        `${CALC_LABELS.LISTING_FEE}: ${currencyFmt.format(result.fees.listingFee)}`,
        `Transaction fee: ${currencyFmt.format(result.fees.transactionFee)}`,
        `${CALC_LABELS.PAYMENT_PROCESSING}: ${currencyFmt.format(result.fees.paymentProcessingFee)}`,
        `${CALC_LABELS.REGULATORY_FEE}: ${currencyFmt.format(result.fees.regulatoryFee)}`,
        `${CALC_LABELS.OFFSITE_ADS}: ${currencyFmt.format(result.fees.offsiteAdsFee)}`,
        "N/A",
        `${CALC_LABELS.ORDER_REVENUE}: ${currencyFmt.format(result.orderRevenue)}`,
        `${CALC_LABELS.TOTAL_FEES}: ${currencyFmt.format(result.totalFees)}`,
        `${CALC_LABELS.COST_OF_GOODS}: ${currencyFmt.format(result.totalCogs)}`,
        `${CALC_LABELS.YOUR_SHIPPING_COST}: ${currencyFmt.format(result.totalYourShipping)}`,
      ];
      navigator.clipboard.writeText(lines.join("\n"));
      track("calculator_copy_results_clicked");
      return;
    }

    if (isProfit || isPricing) {
      const { label: tierLabel } = getMarginHealthTier(result.marginPct);
      const lines = [
        isPricing ? "Etsy Pricing Calculator Results" : "Etsy Profit Calculator Results",
        "N/A",
        isPricing
          ? `Recommended Etsy item price (per unit): ${currencyFmt.format(itemSubtotal)}`
          : `Item price: ${currencyFmt.format(itemSubtotal)}`,
        `${CALC_LABELS.SHIPPING_CHARGED_TO_BUYER}: ${currencyFmt.format(shippingNum)}`,
        `You keep: ${currencyFmt.format(result.netProfit)} per order`,
        `Your margin: ${(result.marginPct * 100).toFixed(2)}%`,
        getMarginVerdictMessage(result.marginPct),
        ...(offsiteAdsProfitReduction != null && offsiteAdsProfitReduction > 0
          ? [`Offsite ads reduced your profit by ${currencyFmt.format(offsiteAdsProfitReduction)}`]
          : []),
        `Margin health: ${tierLabel}`,
        `Total fees: ${currencyFmt.format(result.totalFees)}`,
        `Cost of goods: ${currencyFmt.format(result.totalCogs)}`,
        `${CALC_LABELS.YOUR_SHIPPING_COST}: ${currencyFmt.format(result.totalYourShipping)}`,
        ...(isProfit
          ? [
              result.breakEvenItemPrice != null
                ? `Break-even price per unit: ${currencyFmt.format(result.breakEvenItemPrice)}`
                : "Break-even price per unit: N/A",
            ]
          : []),
      ];
      navigator.clipboard.writeText(lines.join("\n"));
      track("calculator_copy_results_clicked");
      return;
    }
  }, [result, shippingCharged, currencyFmt, isPricing, isFee, isBreakEven, isProfit, offsiteAdsProfitReduction]);

  React.useEffect(() => {
    if (!isPricing) return;
    onCalculate();
  }, [
    isPricing,
    cogsPerUnit,
    yourShippingCost,
    shippingCharged,
    targetMarginPct,
    region,
    includeOffsiteAds,
    listingFee,
    transactionFeePct,
    paymentFeePct,
    paymentFeeFixed,
    regulatoryFeePct,
    offsiteAdsPct,
  ]);

  return (
    <main className="calculator-page-bg text-[#EAF0FF]">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col gap-3">
          {content && (
            <>
              <div className="inline-flex items-center gap-2 text-sm text-[#9AA6BF]">
                <BadgeCheck className="h-4 w-4" />
                <span>{content.eyebrowText}</span>
              </div>

              <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#EAF0FF]">{content.heroH1}</h1>
              <h2 className="text-lg font-medium text-[#9AA6BF]">{content.heroH2}</h2>
              <p className="max-w-2xl text-[#9AA6BF]">{content.heroSubhead}</p>
            </>
          )}

          <CalculatorSwitcher
            current={contentKey}
            switcher={config?.switcher}
            dark
          />
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
          <CalculatorInputs
            calculatorVariant={calculatorVariant}
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
            targetMarginPct={targetMarginPct}
            setTargetMarginPct={setTargetMarginPct}
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
            onRegionChange={(r) => track("calculator_region_changed", { region: r })}
            onOffsiteAdsToggle={(enabled) => track("calculator_offsite_ads_toggled", { enabled })}
          />
          <CalculatorResults
            hasCalculated={hasCalculated}
            result={result}
            isProfit={isProfit}
            isFee={isFee}
            isBreakEven={isBreakEven}
            isPricing={isPricing}
            resultOrder={config?.resultOrder}
            currency={currency}
            sellerRegion={region}
            transactionFeePct={clampNonNeg(parseNumber(transactionFeePct)) / 100}
            paymentProcessingPct={clampNonNeg(parseNumber(paymentFeePct)) / 100}
            paymentProcessingFixed={clampNonNeg(parseNumber(paymentFeeFixed))}
            offsiteAdsPct={clampNonNeg(parseNumber(offsiteAdsPct)) / 100}
            taxRatePct={taxRatePct}
            includeTaxEstimate={isFee ? false : includeTaxEstimate}
            recommendedItemSubtotal={
              isPricing && result
                ? result.orderRevenue - clampNonNeg(parseNumber(shippingCharged))
                : undefined
            }
            offsiteAdsProfitReduction={offsiteAdsProfitReduction}
            parseNumber={parseNumber}
            clampNonNeg={clampNonNeg}
            onCopyResults={onCopyResults}
          />
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-8">
        <div className="flex flex-col gap-4 rounded-xl border border-white/10 bg-white/5 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-[#EAF0FF]">Get Etsy fee updates and pricing tips</p>
            <p className="text-xs text-[#9AA6BF] mt-0.5">No spam. Unsubscribe any time.</p>
          </div>
          <WaitlistForm variant="calculator" inputId="calculator-page-email" />
        </div>
      </section>

  </main>
  );
}
