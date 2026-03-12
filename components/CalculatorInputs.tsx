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

export type CalculatorInputsProps = {
  isPricing?: boolean;
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
    isPricing = false,
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

  return (
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
          {!isPricing && (
            <>
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
            </>
          )}

          <div>
            <Label htmlFor="region">Seller region</Label>
            <select
              id="region"
              value={region}
              onChange={(e) => {
                const v = e.target.value as SellerRegion;
                setRegion(v);
                onRegionChange?.(v);
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
            <Label htmlFor="cogsPerUnit">{CALC_LABELS.COST_OF_GOODS_PER_UNIT}</Label>
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
            <Label htmlFor="yourShippingCost">{CALC_LABELS.YOUR_SHIPPING_COST}</Label>
            <Input
              id="yourShippingCost"
              inputMode="decimal"
              placeholder="0.00"
              value={yourShippingCost}
              onChange={(e) => setYourShippingCost(e.target.value)}
              className="mt-2 h-11"
            />
          </div>

          {isPricing && (
            <div>
              <Label htmlFor="targetMarginPct">Target margin (%)</Label>
              <Input
                id="targetMarginPct"
                inputMode="decimal"
                placeholder="30"
                value={targetMarginPct}
                onChange={(e) => setTargetMarginPct?.(e.target.value)}
                className="mt-2 h-11"
              />
            </div>
          )}

          {!isPricing && (
            <div>
              <Label htmlFor="shippingCharged">{CALC_LABELS.SHIPPING_CHARGED_TO_BUYER}</Label>
              <Input
                id="shippingCharged"
                inputMode="decimal"
                placeholder="0.00"
                value={shippingCharged}
                onChange={(e) => setShippingCharged(e.target.value)}
                className="mt-2 h-11"
              />
            </div>
          )}

          <div className="flex items-center justify-between rounded-lg border p-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Label htmlFor="offsiteAds" className="cursor-pointer">
                  Offsite Ads
                </Label>
                <span className="text-xs text-muted-foreground">(if this order came from Etsy Offsite Ads)</span>
              </div>
            </div>
            <Switch
              id="offsiteAds"
              checked={includeOffsiteAds}
              onCheckedChange={(v) => {
                setIncludeOffsiteAds(v);
                onOffsiteAdsToggle?.(v);
              }}
            />
          </div>
        </div>

        {!isPricing && (
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
        )}

        <Separator />

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Advanced</span>
          </div>
          <Switch checked={showAdvanced} onCheckedChange={setShowAdvanced} />
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
          <Button onClick={onCalculate} className="h-11">
            {isPricing ? "Update Recommended Price" : "Calculate My True Margin"}
          </Button>
          <Button variant="secondary" onClick={onReset} className="h-11">
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
