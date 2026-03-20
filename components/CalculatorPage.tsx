"use client";

import * as React from "react";
import Link from "next/link";
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
import { getCalculatorConfig } from "@/config/calculators";
import { getCalculatorContent, getSeoContent } from "@/lib/calculatorContent";
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
  const content = config?.content ?? getCalculatorContent(contentKey);
  const seoContent =
    "seoContent" in content && content.seoContent ? content.seoContent : getSeoContent(contentKey);

  React.useEffect(() => {
    track("calculator_page_view", { variant: vRaw || pathname, contentKey });
  }, [vRaw, pathname, contentKey]);

  const logicContent = React.useMemo(() => {
    if (isPricing) {
      return {
        heading: "How the Etsy Pricing Calculator Works",
        intro:
          "This calculator solves backwards for the Etsy sale price needed to hit your target margin after fees, cost of goods, and shipping cost.",
        formulaLines: [
          "Required Price = (Fixed costs + Etsy fixed fees) / (1 - variable Etsy fee % - target margin)",
        ],
        uses: [
          "cost of goods per unit",
          "your shipping cost",
          "shipping charged to buyer",
          "target margin",
          "seller region fee preset",
          "optional Offsite Ads",
        ],
        exampleTitle: "Example Target-Margin Pricing",
        exampleBlocks: [
          ["Cost of goods: $12", "Shipping cost: $5", "Shipping charged: $0", "Target margin: 30%"],
          ["Estimated Etsy fee profile: ~9.75% + fixed fees", "Recommended Etsy price: about $29.50"],
          ["You keep per order: about $8.85", "Your margin: 30%"],
          ["Exact results change with region fee presets and Offsite Ads settings."],
        ],
        relatedIntro: "Compare your price target with full profit and fee scenarios below.",
        related: [
          {
            href: "/etsy-profit-calculator",
            title: "Etsy Profit Calculator",
            description: "Validate net profit at any sale price.",
          },
          {
            href: "/etsy-fee-calculator",
            title: "Etsy Fee Calculator",
            description: "Estimate total Etsy fees for one order.",
          },
          {
            href: "/etsy-break-even-calculator",
            title: "Etsy Break-even Calculator",
            description: "Find your minimum safe price floor.",
          },
        ],
      };
    }

    if (isFee) {
      return {
        heading: "How the Etsy Fee Calculator Works",
        intro:
          "This calculator estimates Etsy selling fees using your order value, shipping charged, seller region preset, and optional Offsite Ads.",
        formulaLines: [
          "Estimated Etsy Fees = Listing fee + Transaction fee + Payment processing fee + Optional Offsite Ads fee + Any applicable regional fee",
        ],
        uses: ["item price", "quantity", "shipping charged", "seller region fee preset", "Offsite Ads toggle"],
        exampleTitle: "Example Etsy Fee Calculation",
        exampleBlocks: [
          ["Item price: $25", "Quantity: 1", "Shipping charged: $0"],
          ["Listing fee: $0.20", "Transaction fee: $1.63", "Payment processing: about $1.00"],
          ["Estimated total Etsy fees: about $2.83"],
          ["Fees can vary by country-specific payment rates and whether Offsite Ads applies."],
        ],
        relatedIntro: "For full take-home and pricing planning, use the calculators below.",
        related: [
          {
            href: "/etsy-profit-calculator",
            title: "Etsy Profit Calculator",
            description: "Calculate net profit and margin after fees.",
          },
          {
            href: "/etsy-break-even-calculator",
            title: "Etsy Break-even Calculator",
            description: "Find your minimum safe listing price.",
          },
          {
            href: "/etsy-pricing-calculator",
            title: "Etsy Pricing Calculator",
            description: "Set price for your target margin.",
          },
        ],
      };
    }

    if (isBreakEven) {
      return {
        heading: "How the Etsy Break-even Calculator Works",
        intro:
          "This calculator estimates the minimum price required to avoid losing money after Etsy fees, cost of goods, and shipping.",
        formulaLines: [
          "Break-even Price = Total costs + Estimated Etsy fees",
          "Break-even per Unit = Break-even order total / Quantity",
        ],
        uses: [
          "quantity",
          "shipping charged to buyer",
          "cost of goods per unit",
          "your shipping cost",
          "seller region fee preset",
          "optional Offsite Ads",
        ],
        exampleTitle: "Example Break-even Calculation",
        exampleBlocks: [
          ["Quantity: 1", "Cost of goods: $10", "Your shipping cost: $5", "Shipping charged: $0"],
          ["Minimum price per unit solves to about $19", "Estimated Etsy fees at that price: about $4"],
          ["Exact results change with seller fee region preset, shipping inputs, and Offsite Ads settings."],
        ],
        relatedIntro: "After finding your minimum safe price, compare scenarios with the calculators below.",
        related: [
          {
            href: "/etsy-profit-calculator",
            title: "Etsy Profit Calculator",
            description: "Model net profit after all costs and fees.",
          },
          {
            href: "/etsy-fee-calculator",
            title: "Etsy Fee Calculator",
            description: "Estimate fee totals for any order value.",
          },
          {
            href: "/etsy-pricing-calculator",
            title: "Etsy Pricing Calculator",
            description: "Set price for your target margin goal.",
          },
        ],
      };
    }

    return {
      heading: "How the Etsy Profit Calculator Works",
      intro:
        "This calculator estimates what you keep after Etsy fees, cost of goods, and shipping. Profit margin is then calculated by dividing net profit by revenue.",
      formulaLines: [
        "Net Profit = Revenue - Etsy fees - Cost of goods - Shipping cost",
        "Profit Margin = Net Profit / Revenue",
      ],
      uses: [
        "item price",
        "quantity",
        "shipping charged",
        "cost of goods per unit",
        "shipping cost",
        "seller region fee preset",
        "optional Offsite Ads",
      ],
      exampleTitle: "Example Profit Calculation",
      exampleBlocks: [
        ["Item price: $40", "Quantity: 1", "Shipping charged: $5", "Revenue: $45"],
        ["Estimated Etsy fees: $5", "Cost of goods: $12", "Shipping cost: $6"],
        ["You keep per order: $22", "Your margin: 48.9%"],
        ["Exact results vary by seller region preset and Offsite Ads settings."],
      ],
      relatedIntro: "Explore fee-only and break-even scenarios with the calculators below.",
      related: [
        {
          href: "/etsy-fee-calculator",
          title: "Etsy Fee Calculator",
          description: "See a fee-only breakdown per order.",
        },
        {
          href: "/etsy-break-even-calculator",
          title: "Etsy Break-even Calculator",
          description: "Find the minimum safe price per unit.",
        },
        {
          href: "/etsy-pricing-calculator",
          title: "Etsy Pricing Calculator",
          description: "Find price needed for target margin.",
        },
      ],
    };
  }, [isFee, isBreakEven, isPricing]);
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
        "—",
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
        "—",
        `${CALC_LABELS.MINIMUM_PRICE_PER_UNIT}: ${result.breakEvenItemPrice != null ? currencyFmt.format(result.breakEvenItemPrice) : "—"}`,
        `${CALC_LABELS.BREAK_EVEN_DESCRIPTION}`,
        "—",
        `${CALC_LABELS.FEE_BREAKDOWN}`,
        `${CALC_LABELS.LISTING_FEE}: ${currencyFmt.format(result.fees.listingFee)}`,
        `Transaction fee: ${currencyFmt.format(result.fees.transactionFee)}`,
        `${CALC_LABELS.PAYMENT_PROCESSING}: ${currencyFmt.format(result.fees.paymentProcessingFee)}`,
        `${CALC_LABELS.REGULATORY_FEE}: ${currencyFmt.format(result.fees.regulatoryFee)}`,
        `${CALC_LABELS.OFFSITE_ADS}: ${currencyFmt.format(result.fees.offsiteAdsFee)}`,
        "—",
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
        "—",
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
                : "Break-even price per unit: —",
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
    <main className="calculator-page-bg min-h-screen text-[#EAF0FF]">
      <section className="mx-auto max-w-5xl px-4 py-10">
        <div className="flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 text-sm text-[#9AA6BF]">
            <BadgeCheck className="h-4 w-4" />
            <span>{content.eyebrowText}</span>
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[#EAF0FF]">{content.heroH1}</h1>
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

      <section className="mx-auto max-w-5xl px-4 pt-8 pb-12">
        <div className="space-y-6">
          <div>
            <h2 className="text-xl md:text-2xl font-semibold text-[#EAF0FF]">{seoContent.heading}</h2>
            <p className="mt-3 max-w-3xl text-base leading-relaxed text-[#D6DEEE]">{seoContent.intro}</p>
          </div>

          {seoContent.supportBlock && (
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg md:text-xl font-semibold text-[#EAF0FF]">{seoContent.supportBlock.heading}</h3>
              <div className="mt-3 space-y-3 text-base leading-relaxed text-[#D6DEEE]">
                {seoContent.supportBlock.paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg md:text-xl font-semibold text-[#EAF0FF]">What this calculator includes</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-[#D6DEEE]">
                {seoContent.includes.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-lg md:text-xl font-semibold text-[#EAF0FF]">How to use it</h3>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-base leading-relaxed text-[#D6DEEE]">
                {seoContent.howTo.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </div>
          </div>

          <div>
            <h3 className="text-xl md:text-2xl font-semibold text-[#EAF0FF]">FAQ</h3>
            <div className="mt-3 space-y-3">
              {seoContent.faqs.map((f) => (
                <div key={f.q} className="rounded-xl border border-white/10 bg-white/5 p-6">
                  <p className="text-lg md:text-xl font-semibold text-[#EAF0FF]">{f.q}</p>
                  <p className="mt-2 text-base leading-relaxed text-[#D6DEEE]">{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-14">
        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-7">
            <h2 className="text-xl md:text-2xl font-semibold text-[#EAF0FF]">{logicContent.heading}</h2>
            <p className="mt-4 text-base leading-8 text-[#D6DEEE]">{logicContent.intro}</p>

            <div className="mt-5 rounded-lg border border-white/15 bg-[#0F172A]/80 px-5 py-4">
              {logicContent.formulaLines.map((line) => (
                <p key={line} className="text-base md:text-lg font-medium leading-relaxed text-[#EAF0FF]">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-7">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-[#10182A]/60 p-5">
                <h3 className="text-lg md:text-xl font-semibold text-[#EAF0FF]">What this calculator uses</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-[#D6DEEE]">
                  {logicContent.uses.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#10182A]/60 p-5">
                <h3 className="text-lg md:text-xl font-semibold text-[#EAF0FF]">{logicContent.exampleTitle}</h3>
                {logicContent.exampleBlocks.map((block, i) => (
                  <p key={i} className="mt-3 text-base leading-relaxed text-[#D6DEEE]">
                    {block.map((line, lineIdx) => (
                      <React.Fragment key={line}>
                        {line}
                        {lineIdx < block.length - 1 ? <br /> : null}
                      </React.Fragment>
                    ))}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-7">
            <h3 className="text-xl md:text-2xl font-semibold text-[#EAF0FF]">Related Etsy Calculators</h3>
            <p className="mt-4 text-base leading-relaxed text-[#D6DEEE]">{logicContent.relatedIntro}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {logicContent.related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-white/15 bg-[#10182A]/70 p-4 text-lg md:text-xl font-semibold text-[#EAF0FF] transition hover:bg-[#10182A]"
                >
                  {item.title}
                  <span className="mt-1 block text-base leading-relaxed font-normal text-[#D6DEEE]">{item.description}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-7">
            <h3 className="text-xl md:text-2xl font-semibold text-[#EAF0FF]">Related Etsy Guides</h3>
            <p className="mt-4 text-base leading-relaxed text-[#D6DEEE]">
              Prefer a quick explanation before you run numbers? These guides break down how Etsy fees work and what sellers usually miss.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/how-much-does-etsy-take"
                className="rounded-lg border border-white/15 bg-[#10182A]/70 p-4 text-lg md:text-xl font-semibold text-[#EAF0FF] transition hover:bg-[#10182A]"
              >
                How Much Does Etsy Take Per Sale?
                <span className="mt-1 block text-base leading-relaxed font-normal text-[#D6DEEE]">
                  Get a direct answer with practical fee ranges and examples.
                </span>
              </Link>
              <Link
                href="/etsy-fees-explained"
                className="rounded-lg border border-white/15 bg-[#10182A]/70 p-4 text-lg md:text-xl font-semibold text-[#EAF0FF] transition hover:bg-[#10182A]"
              >
                Etsy Fees Explained (Full 2026 Breakdown)
                <span className="mt-1 block text-base leading-relaxed font-normal text-[#D6DEEE]">
                  Understand each Etsy fee type and how it affects take-home profit.
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
  </main>
  );
}
