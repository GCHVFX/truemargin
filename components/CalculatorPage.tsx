"use client";

import * as React from "react";
import Link from "next/link";
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
import { track } from "@/lib/analytics";

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
  const seoContent =
    "seoContent" in content && content.seoContent ? content.seoContent : getSeoContent(contentKey);

  React.useEffect(() => {
    track("calculator_page_view", { variant: vRaw || pathname, contentKey });
  }, [vRaw, pathname, contentKey]);

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

  const logicContent = React.useMemo(() => {
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
          "shipping charged",
          "cost of goods per unit",
          "shipping cost",
          "seller region fee preset",
          "optional Offsite Ads",
        ],
        exampleTitle: "Example Break-even Calculation",
        exampleBlocks: [
          ["Quantity: 1", "Cost of goods: $10", "Shipping cost: $5", "Estimated Etsy fees: $4"],
          ["Break-even order total: $19", "Break-even price per unit: $19"],
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
        ["Net profit: $22", "Profit margin: 48.9%"],
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
      ],
    };
  }, [isFee, isBreakEven]);
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
    track("calculator_copy_results_clicked");
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
            onRegionChange={(r) => track("calculator_region_changed", { region: r })}
            onOffsiteAdsToggle={(enabled) => track("calculator_offsite_ads_toggled", { enabled })}
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

      <CalculatorSeoSection seoContent={seoContent} />

      <section className="mx-auto max-w-5xl px-4 pb-14">
        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-7">
            <h2 className="text-2xl font-semibold text-[#EAF0FF]">{logicContent.heading}</h2>
            <p className="mt-4 text-base leading-8 text-[#D6DEEE]">{logicContent.intro}</p>

            <div className="mt-5 rounded-lg border border-white/15 bg-[#0F172A]/80 px-5 py-4">
              {logicContent.formulaLines.map((line) => (
                <p key={line} className="text-base font-semibold leading-8 text-[#EAF0FF]">
                  {line}
                </p>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-7">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-[#10182A]/60 p-5">
                <h3 className="text-xl font-semibold text-[#EAF0FF]">What this calculator uses</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-8 text-[#D6DEEE]">
                  {logicContent.uses.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#10182A]/60 p-5">
                <h3 className="text-xl font-semibold text-[#EAF0FF]">{logicContent.exampleTitle}</h3>
                {logicContent.exampleBlocks.map((block, i) => (
                  <p key={i} className="mt-3 text-base leading-8 text-[#D6DEEE]">
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
            <h3 className="text-2xl font-semibold text-[#EAF0FF]">Related Etsy Calculators</h3>
            <p className="mt-4 text-base leading-8 text-[#D6DEEE]">{logicContent.relatedIntro}</p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {logicContent.related.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-lg border border-white/15 bg-[#10182A]/70 p-4 text-lg font-semibold text-[#EAF0FF] transition hover:bg-[#10182A]"
                >
                  {item.title}
                  <span className="mt-1 block text-base font-normal text-[#D6DEEE]">{item.description}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
  </main>
  );
}
