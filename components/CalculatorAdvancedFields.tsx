"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type Currency, type FeePreset, type SellerRegion } from "@/lib/fees";

const fmt = (currency: Currency) =>
  new Intl.NumberFormat(currency === "CAD" ? "en-CA" : "en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

export function CalculatorAdvancedFields({
  region,
  currency,
  preset,
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
  onCurrencyChange,
}: {
  region: SellerRegion;
  currency: Currency;
  preset: FeePreset;
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
  onCurrencyChange: (next: Currency) => void;
}) {
  const currencyFmt = fmt(currency);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-1">
          <Label htmlFor="currency" className="text-[#9AA6BF] text-sm font-medium">Display currency</Label>
          <select
            id="currency"
            value={currency}
            onChange={(e) => onCurrencyChange(e.target.value as Currency)}
            className="mt-2 h-11 w-full rounded-md border border-white/15 bg-[#0A1628] px-3 text-sm text-[#EAF0FF] shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="USD">USD</option>
            <option value="CAD">CAD</option>
          </select>
          <p className="mt-2 text-xs text-[#9AA6BF]">
            Formatting only. No FX conversion in V1.
          </p>
        </div>

        <div className="md:col-span-2 rounded-lg border border-white/15 bg-white/[0.05] p-4">
          <div className="text-sm font-medium text-[#EAF0FF]">Current preset</div>
          <div className="mt-1 text-xs text-[#9AA6BF]">
            Region: <span className="font-medium text-[#EAF0FF]">{region === "US" ? "United States" : "Canada"}</span>
            {" • "}
            Updated: <span className="font-medium text-[#EAF0FF]">{preset.updatedAt}</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            <div className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2">
              <span className="text-[#9AA6BF]">Listing</span>
              <span className="font-medium text-[#EAF0FF]">{currencyFmt.format(preset.listingFeeFixed)}</span>
            </div>
            <div className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2">
              <span className="text-[#9AA6BF]">Transaction</span>
              <span className="font-medium text-[#EAF0FF]">{(preset.transactionFeePct * 100).toFixed(2)}%</span>
            </div>
            <div className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2">
              <span className="text-[#9AA6BF]">Payment %</span>
              <span className="font-medium text-[#EAF0FF]">{(preset.paymentProcessingPct * 100).toFixed(2)}%</span>
            </div>
            <div className="flex items-center justify-between rounded-md bg-white/5 px-3 py-2">
              <span className="text-[#9AA6BF]">Payment fixed</span>
              <span className="font-medium text-[#EAF0FF]">{currencyFmt.format(preset.paymentProcessingFixed)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <Label htmlFor="listingFee" className="text-[#9AA6BF] text-sm font-medium">Listing fee (fixed)</Label>
          <Input
            id="listingFee"
            inputMode="decimal"
            value={listingFee}
            onChange={(e) => setListingFee(e.target.value)}
            className="mt-2 h-11 bg-[#0A1628] border-white/15 text-[#EAF0FF] placeholder:text-[#4A5568] focus-visible:ring-white/20"
          />
        </div>

        <div>
          <Label htmlFor="transactionFeePct" className="text-[#9AA6BF] text-sm font-medium">Transaction fee (%)</Label>
          <Input
            id="transactionFeePct"
            inputMode="decimal"
            value={transactionFeePct}
            onChange={(e) => setTransactionFeePct(e.target.value)}
            className="mt-2 h-11 bg-[#0A1628] border-white/15 text-[#EAF0FF] placeholder:text-[#4A5568] focus-visible:ring-white/20"
          />
        </div>

        <div>
          <Label htmlFor="paymentFeePct" className="text-[#9AA6BF] text-sm font-medium">Payment fee (%)</Label>
          <Input
            id="paymentFeePct"
            inputMode="decimal"
            value={paymentFeePct}
            onChange={(e) => setPaymentFeePct(e.target.value)}
            className="mt-2 h-11 bg-[#0A1628] border-white/15 text-[#EAF0FF] placeholder:text-[#4A5568] focus-visible:ring-white/20"
          />
        </div>

        <div>
          <Label htmlFor="paymentFeeFixed" className="text-[#9AA6BF] text-sm font-medium">Payment fee (fixed)</Label>
          <Input
            id="paymentFeeFixed"
            inputMode="decimal"
            value={paymentFeeFixed}
            onChange={(e) => setPaymentFeeFixed(e.target.value)}
            className="mt-2 h-11 bg-[#0A1628] border-white/15 text-[#EAF0FF] placeholder:text-[#4A5568] focus-visible:ring-white/20"
          />
        </div>

        <div>
          <Label htmlFor="regulatoryFeePct" className="text-[#9AA6BF] text-sm font-medium">Regulatory fee (%)</Label>
          <Input
            id="regulatoryFeePct"
            inputMode="decimal"
            value={regulatoryFeePct}
            onChange={(e) => setRegulatoryFeePct(e.target.value)}
            className="mt-2 h-11 bg-[#0A1628] border-white/15 text-[#EAF0FF] placeholder:text-[#4A5568] focus-visible:ring-white/20"
          />
        </div>

        <div>
          <Label htmlFor="offsiteAdsPct" className="text-[#9AA6BF] text-sm font-medium">Offsite ads fee (%)</Label>
          <Input
            id="offsiteAdsPct"
            inputMode="decimal"
            value={offsiteAdsPct}
            onChange={(e) => setOffsiteAdsPct(e.target.value)}
            className="mt-2 h-11 bg-[#0A1628] border-white/15 text-[#EAF0FF] placeholder:text-[#4A5568] focus-visible:ring-white/20"
          />
        </div>
      </div>
    </div>
  );
}
