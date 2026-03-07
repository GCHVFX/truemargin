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
  );
}
