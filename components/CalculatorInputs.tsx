"use client";

import * as React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Info, Calculator } from "lucide-react";
import type { Currency, FeePreset, SellerRegion } from "@/lib/fees";
import { CALC_LABELS } from "@/lib/calculatorHelpers";
import { CalculatorAdvancedFields } from "@/components/CalculatorAdvancedFields";

export type EtsyCalculatorVariant = "profit" | "fee" | "breakEven" | "pricing";

export type CalculatorInputsProps = {
  calculatorVariant: EtsyCalculatorVariant;
  itemPrice: string;
  setItemPrice: (v: string) => void;
  quantity: string;
  setQuantity: (v: string) => void;
  region: SellerRegion;
  setRegion: (v: SellerRegion) => void;
  shippingCharged: string;
  setShippingCharged: (v: string) => void;
  cogsPerUnit: string;
  setCogsPerUnit: (v: string) => void;
  yourShippingCost: string;
  setYourShippingCost: (v: string) => void;
  includeOffsiteAds: boolean;
  setIncludeOffsiteAds: (v: boolean) => void;
  includeTaxEstimate: boolean;
  setIncludeTaxEstimate: (v: boolean) => void;
  taxRatePct: string;
  setTaxRatePct: (v: string) => void;
  targetMarginPct?: string;
  setTargetMarginPct?: (v: string) => void;
  showAdvanced: boolean;
  setShowAdvanced: (v: boolean) => void;
  currency: Currency;
  onCurrencyChange: (v: Currency) => void;
  listingFee: string;
  setListingFee: (v: string) => void;
  transactionFeePct: string;
  setTransactionFeePct: (v: string) => void;
  paymentFeePct: string;
  setPaymentFeePct: (v: string) => void;
  paymentFeeFixed: string;
  setPaymentFeeFixed: (v: string) => void;
  regulatoryFeePct: string;
  setRegulatoryFeePct: (v: string) => void;
  offsiteAdsPct: string;
  setOffsiteAdsPct: (v: string) => void;
  preset: FeePreset;
  onCalculate: () => void;
  onReset: () => void;
  /** Optional analytics: called when user changes region */
  onRegionChange?: (region: SellerRegion) => void;
  /** Optional analytics: called when user toggles Offsite Ads */
  onOffsiteAdsToggle?: (enabled: boolean) => void;
};

export function CalculatorInputs(props: CalculatorInputsProps) {
  const {
    calculatorVariant,
    itemPrice,
    setItemPrice,
    quantity,
    setQuantity,
    region,
    setRegion,
    shippingCharged,
    setShippingCharged,
    cogsPerUnit,
    setCogsPerUnit,
    yourShippingCost,
    setYourShippingCost,
    includeOffsiteAds,
    setIncludeOffsiteAds,
    includeTaxEstimate,
    setIncludeTaxEstimate,
    taxRatePct,
    setTaxRatePct,
    targetMarginPct = "",
    setTargetMarginPct,
    showAdvanced,
    setShowAdvanced,
    currency,
    onCurrencyChange,
    listingFee,
    setListingFee,
    transactionFeePct,
    setTransactionFeePct,
    paymentFeePct,
    setPaymentFeePct,
    paymentFeeFixed,
    setPaymentFeeFixed,
    regulatoryFeePct,
    setRegulatoryFeePct,
    offsiteAdsPct,
    setOffsiteAdsPct,
    preset,
    onCalculate,
    onReset,
    onRegionChange,
    onOffsiteAdsToggle,
  } = props;

  const showItemPriceAndQuantity = calculatorVariant === "profit" || calculatorVariant === "fee";
  const showQuantityOnly = calculatorVariant === "breakEven";
  const showCogsAndYourShipping =
    calculatorVariant === "profit" || calculatorVariant === "breakEven" || calculatorVariant === "pricing";
  const showShippingCharged =
    calculatorVariant === "profit" ||
    calculatorVariant === "fee" ||
    calculatorVariant === "breakEven" ||
    calculatorVariant === "pricing";
  const showTaxEstimate = calculatorVariant === "profit";

  return (
    <Card className="border-white/15 bg-[#0F1E30] shadow-lg lg:col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-[#EAF0FF]">
          <Calculator className="h-5 w-5" />
          Calculator
        </CardTitle>
        <CardDescription className="text-[#9AA6BF]">Enter one order. Get a clear breakdown.</CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {showItemPriceAndQuantity && (
            <>
              <div>
                <Label htmlFor="itemPrice" className="text-[#9AA6BF] text-sm font-medium">Item price</Label>
                <Input
                  id="itemPrice"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={itemPrice}
                  onChange={(e) => setItemPrice(e.target.value)}
                  className="mt-2 h-11 bg-[#0A1628] border-white/15 text-[#EAF0FF] placeholder:text-[#4A5568] focus-visible:ring-white/20"
                />
              </div>

              <div>
                <Label htmlFor="quantity" className="text-[#9AA6BF] text-sm font-medium">Quantity</Label>
                <Input
                  id="quantity"
                  inputMode="numeric"
                  placeholder="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="mt-2 h-11 bg-[#0A1628] border-white/15 text-[#EAF0FF] placeholder:text-[#4A5568] focus-visible:ring-white/20"
                />
              </div>
            </>
          )}

          {showQuantityOnly && (
            <div>
              <Label htmlFor="quantity" className="text-[#9AA6BF] text-sm font-medium">Quantity</Label>
              <Input
                id="quantity"
                inputMode="numeric"
                placeholder="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="mt-2 h-11 bg-[#0A1628] border-white/15 text-[#EAF0FF] placeholder:text-[#4A5568] focus-visible:ring-white/20"
              />
            </div>
          )}

          <div>
            <Label htmlFor="region" className="text-[#9AA6BF] text-sm font-medium">Seller region</Label>
            <select
              id="region"
              value={region}
              onChange={(e) => {
                const v = e.target.value as SellerRegion;
                setRegion(v);
                onRegionChange?.(v);
              }}
              className="mt-2 h-11 w-full rounded-md border border-white/15 bg-[#0A1628] px-3 text-sm text-[#EAF0FF] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="US">United States</option>
              <option value="CA">Canada</option>
            </select>
            <p className="mt-2 text-xs text-[#9AA6BF]">
              Region drives fee rules. Currency auto-sets by region.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {showCogsAndYourShipping && (
            <>
              <div>
                <Label htmlFor="cogsPerUnit" className="text-[#9AA6BF] text-sm font-medium">{CALC_LABELS.COST_OF_GOODS_PER_UNIT}</Label>
                <Input
                  id="cogsPerUnit"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={cogsPerUnit}
                  onChange={(e) => setCogsPerUnit(e.target.value)}
                  className="mt-2 h-11 bg-[#0A1628] border-white/15 text-[#EAF0FF] placeholder:text-[#4A5568] focus-visible:ring-white/20"
                />
              </div>

              <div>
                <Label htmlFor="yourShippingCost" className="text-[#9AA6BF] text-sm font-medium">{CALC_LABELS.YOUR_SHIPPING_COST}</Label>
                <Input
                  id="yourShippingCost"
                  inputMode="decimal"
                  placeholder="0.00"
                  value={yourShippingCost}
                  onChange={(e) => setYourShippingCost(e.target.value)}
                  className="mt-2 h-11 bg-[#0A1628] border-white/15 text-[#EAF0FF] placeholder:text-[#4A5568] focus-visible:ring-white/20"
                />
              </div>
            </>
          )}

          {calculatorVariant === "pricing" && (
            <div>
              <Label htmlFor="targetMarginPct" className="text-[#9AA6BF] text-sm font-medium">Target margin (%)</Label>
              <Input
                id="targetMarginPct"
                inputMode="decimal"
                placeholder="30"
                value={targetMarginPct}
                onChange={(e) => setTargetMarginPct?.(e.target.value)}
                className="mt-2 h-11 bg-[#0A1628] border-white/15 text-[#EAF0FF] placeholder:text-[#4A5568] focus-visible:ring-white/20"
              />
            </div>
          )}

          {showShippingCharged && (
            <div>
              <Label htmlFor="shippingCharged" className="text-[#9AA6BF] text-sm font-medium">{CALC_LABELS.SHIPPING_CHARGED_TO_BUYER}</Label>
              <Input
                id="shippingCharged"
                inputMode="decimal"
                placeholder="0.00"
                value={shippingCharged}
                onChange={(e) => setShippingCharged(e.target.value)}
                className="mt-2 h-11 bg-[#0A1628] border-white/15 text-[#EAF0FF] placeholder:text-[#4A5568] focus-visible:ring-white/20"
              />
            </div>
          )}

          <div className="flex items-center justify-between gap-4 rounded-lg border border-white/15 bg-white/[0.05] p-4">
            <div className="flex min-w-0 flex-col gap-0.5">
              <Label htmlFor="offsiteAds" className="cursor-pointer text-[#EAF0FF] text-sm font-medium">
                Offsite Ads
              </Label>
              <span className="text-xs text-[#9AA6BF]">Order came via Etsy Offsite Ads</span>
            </div>
            <Switch
              className="data-[state=unchecked]:bg-white/20 data-[state=checked]:bg-[#6EE7B7] border-white/10"
              id="offsiteAds"
              checked={includeOffsiteAds}
              onCheckedChange={(v) => {
                setIncludeOffsiteAds(v);
                onOffsiteAdsToggle?.(v);
              }}
            />
          </div>
        </div>

        {showTaxEstimate && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center justify-between gap-4 rounded-lg border border-white/15 bg-white/[0.05] p-4">
              <div className="flex min-w-0 flex-col gap-0.5">
                <Label htmlFor="taxEstimate" className="cursor-pointer text-[#EAF0FF] text-sm font-medium">
                  Include income tax estimate
                </Label>
                <span className="text-xs text-[#9AA6BF]">Optional, preview only</span>
              </div>
              <Switch className="data-[state=unchecked]:bg-white/20 data-[state=checked]:bg-[#6EE7B7] border-white/10" id="taxEstimate" checked={includeTaxEstimate} onCheckedChange={setIncludeTaxEstimate} />
            </div>

            <div>
              <Label htmlFor="taxRatePct" className="text-[#9AA6BF] text-sm font-medium">Estimated tax rate (%)</Label>
              <Input
                id="taxRatePct"
                inputMode="decimal"
                placeholder="25"
                value={taxRatePct}
                onChange={(e) => setTaxRatePct(e.target.value)}
                className="mt-2 h-11 bg-[#0A1628] border-white/15 text-[#EAF0FF] placeholder:text-[#4A5568] focus-visible:ring-white/20"
                disabled={!includeTaxEstimate}
              />
              <p className="mt-2 text-xs text-[#9AA6BF]">Applied to net profit only (no deductions modelled).</p>
            </div>
          </div>
        )}

        <Separator className="bg-white/10" />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-[#9AA6BF]" />
            <span className="text-sm text-[#9AA6BF]">Advanced</span>
          </div>
          <Switch className="data-[state=unchecked]:bg-white/20 data-[state=checked]:bg-[#6EE7B7] border-white/10" checked={showAdvanced} onCheckedChange={setShowAdvanced} />
        </div>

        {showAdvanced && (
          <CalculatorAdvancedFields
            currency={currency}
            onCurrencyChange={onCurrencyChange}
            region={region}
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
          />
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            onClick={onCalculate}
            className="h-11 w-full sm:w-auto sm:px-8 bg-white/90 text-[#0D1829] font-semibold hover:bg-white border-0"
          >
            {calculatorVariant === "pricing" ? "Update Recommended Price" : "Calculate My True Margin"}
          </Button>
          <Button
            variant="ghost"
            onClick={onReset}
            className="h-11 px-5 text-[#9AA6BF] hover:text-[#EAF0FF] hover:bg-white/10 border border-white/10"
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
