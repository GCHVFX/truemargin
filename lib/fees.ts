export type Currency = "USD" | "CAD";

/**
 * Seller region determines fee rules.
 * Currency is only used for formatting (V1 has no FX conversion).
 */
export type SellerRegion = "US" | "CA";

export type FeeInputs = {
  currency: Currency;

  // Order values (all per unit unless noted)
  itemPrice: number;
  quantity: number;
  shippingCharged: number;

  // Costs (per unit)
  cogsPerUnit: number;
  yourShippingCost: number;

  // Toggles
  includeOffsiteAds: boolean;

  // Fee overrides
  listingFeeFixed: number;
  transactionFeePct: number;
  paymentProcessingPct: number;
  paymentProcessingFixed: number;
  regulatoryFeePct: number;
  offsiteAdsPct: number;
};

export type FeePreset = {
  updatedAt: string; // YYYY-MM-DD
  listingFeeFixed: number;
  transactionFeePct: number; // 0.065 = 6.5%
  paymentProcessingPct: number; // 0.03 = 3%
  paymentProcessingFixed: number;
  regulatoryFeePct: number;
  offsiteAdsPct: number;
};

export const defaultCurrencyForRegion = (region: SellerRegion): Currency => {
  return region === "CA" ? "CAD" : "USD";
};

/**
 * Region-based presets (V1.1)
 * Keep all fee numbers in this one file so updates are easy.
 */
export const REGION_PRESETS: Record<SellerRegion, FeePreset> = {
  US: {
    updatedAt: "2026-02-28",
    listingFeeFixed: 0.2,
    transactionFeePct: 0.065,
    paymentProcessingPct: 0.03,
    paymentProcessingFixed: 0.25,
    regulatoryFeePct: 0.0025,
    offsiteAdsPct: 0.12,
  },
  CA: {
    updatedAt: "2026-02-28",
    listingFeeFixed: 0.2,
    transactionFeePct: 0.065,
    paymentProcessingPct: 0.03,
    paymentProcessingFixed: 0.25,
    regulatoryFeePct: 0.0,
    offsiteAdsPct: 0.12,
  },
};
