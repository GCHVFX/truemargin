import type { Metadata } from "next";

export const SUPPORTED_ETSY_FEE_SALE_AMOUNTS = [10, 12, 15, 18, 20, 25, 30, 35, 40, 50, 60, 75, 80, 100, 120, 150, 200, 250, 300, 400, 500, 750] as const;

type SupportedAmount = (typeof SUPPORTED_ETSY_FEE_SALE_AMOUNTS)[number];

type FeeSaleScenario = {
  amount: SupportedAmount;
  slug: string;
  canonical: string;
  h1: string;
  title: string;
  metaDescription: string;
  intro: string;
  variationNote: string;
  keepSummary: string;
  faq: {
    q1: string;
    a1: string;
    q2: string;
    a2: string;
    q3: string;
    a3: string;
  };
  fees: {
    listingFee: number;
    transactionFee: number;
    processingFee: number;
    totalEstimatedFees: number;
    withOffsiteAdsEstimate: number;
    estimatedKeepBeforeCosts: number;
    estimatedKeepWithOffsiteBeforeCosts: number;
  };
};

const BASE_URL = "https://gettruemargin.com";
const LISTING_FEE = 0.2;
const TRANSACTION_FEE_RATE = 0.065;
const PROCESSING_FEE_RATE = 0.03;
const PROCESSING_FEE_FIXED = 0.25;
const OFFSITE_ADS_RATE = 0.12;

const round2 = (n: number) => Math.round(n * 100) / 100;
const fmt = (n: number) => `$${n.toFixed(2)}`;

function assertSupportedAmount(amount: number): asserts amount is SupportedAmount {
  if (!SUPPORTED_ETSY_FEE_SALE_AMOUNTS.includes(amount as SupportedAmount)) {
    throw new Error(`Unsupported Etsy fee page amount: ${amount}`);
  }
}

const VARIATION_NOTES: Record<number, string> = {
  10:  "At $10, the $0.20 listing fee alone is 2% of the sale before any other fees apply. Combined with transaction and processing, total fees of around $1.40 represent about 14% of revenue. Unusually high for a single fee stack.",
  12:  "A $12 sale incurs roughly $1.59 in Etsy fees. The fixed $0.25 processing component weighs heavier here than on larger orders, pushing the effective fee rate above 13%.",
  15:  "At $15, estimated fees of about $1.88 represent over 12.5% of the sale. The listing fee is a smaller share than at $10, but processing and transaction fees still combine to take a meaningful slice.",
  18:  "On an $18 sale, fees land near $2.16. The processing fixed fee ($0.25) still adds noticeable overhead, and with Offsite Ads enabled the total jumps by another $2.16, effectively doubling the fee burden.",
  20:  "A $20 sale sees roughly $2.35 in fees. At this price point sellers sometimes round up by $1–$2 to absorb fees, but even that buffer can disappear once shipping cost and COGS are added.",
  25:  "At $25, estimated fees reach about $2.83, over 11% of the sale. Payment processing now contributes $1.00 of that total, making it the second-largest fee component after the transaction fee.",
  30:  "On a $30 sale, fees total around $3.30. Transaction and processing fees now each exceed $1, so the combined percentage impact stays above 11% even though the listing fee's share has shrunk.",
  35:  "At $35, total estimated fees of roughly $3.78 mean the seller starts with about $31.22 before costs. Adding Offsite Ads pushes fees past $7.98, more than doubling the base fee total.",
  40:  "A $40 sale generates about $4.25 in Etsy fees. The transaction fee ($2.60) is now the dominant component, and Offsite Ads would add another $4.80 on top, a significant hit at this mid-range price.",
  50:  "At $50, fees approach $5.20, with the transaction fee alone accounting for $3.25. Sellers pricing at this level often absorb 10–11% in fees before product costs and shipping are factored in.",
  60:  "On a $60 order, estimated fees hit around $6.15. The transaction fee ($3.90) now clearly drives total fees, and if Offsite Ads applies the combined bill exceeds $13, over 21% of the sale price.",
  75:  "At $75, total fees reach about $7.58. The processing fee crosses $2.50 for the first time, and with Offsite Ads the full fee load climbs past $16.58, meaningful enough to shift pricing strategy.",
  80:  "An $80 sale incurs roughly $8.05 in fees. The 10% effective rate is lower than at cheaper price points, but in dollar terms the gap between revenue and payout is wide enough to matter for thin-margin products.",
  100: "At $100, estimated fees land near $9.95, just under $10. The round-number psychology can mislead sellers into assuming $90 payout; the actual keep before costs is closer to $90.05 with standard fees.",
  120: "A $120 sale sees roughly $11.85 in fees. The transaction fee ($7.80) now represents nearly two-thirds of the total fee bill, and Offsite Ads would add another $14.40, bringing combined fees to about $26.25.",
  150: "At $150, total estimated fees reach about $14.70. That's a meaningful dollar amount. With Offsite Ads the combined bill exceeds $32.70, which can significantly compress margin on mid-to-high ticket items.",
  200: "On a $200 sale, fees total around $19.45. The transaction fee alone is $13.00, and adding Offsite Ads brings the full fee load to about $43.45, over 21% of the sale price.",
  250: "At $250, estimated fees of roughly $24.20 make the fee bill clearly visible in dollar terms. Offsite Ads adds another $30, which means attributed sales carry fees exceeding $54 before any product or shipping costs.",
  300: "A $300 order incurs approximately $28.95 in standard fees. With Offsite Ads, that climbs to about $64.95, more than 21% of the sale. At this price point, fee strategy and ad eligibility decisions directly affect profitability.",
  400: "At $400, total fees reach around $38.45. The transaction fee ($26.00) dominates, and Offsite Ads would add $48, pushing the combined fee load past $86, nearly 21.5% of the sale price.",
  500: "On a $500 sale, estimated fees approach $47.95. This is a significant dollar outlay before costs, and Offsite Ads at 12% would add $60 more, meaning attributed sales could carry $107.95 in fees.",
  750: "At $750, fees total roughly $71.70 under standard conditions. Offsite Ads adds $90, bringing the potential combined fee bill to about $161.70, over 21% of the sale, making pricing precision critical at this ticket size.",
};

const KEEP_SUMMARIES: Record<number, string> = {
  10:  "After roughly $1.40 in fees, you keep about $8.60 before costs. On a $10 item that might seem fine, but once materials, packaging, and shipping are subtracted, many sellers find the real margin is $2–$4 or less.",
  12:  "You keep around $10.41 before costs on a $12 sale. With fees eating about 13%, the remaining margin for COGS and shipping is limited. Pricing at $12 often only works if your cost of goods is under $5.",
  15:  "A $15 sale leaves roughly $13.12 before costs. That gives you more breathing room than at $10–$12, but with shipping often $4–$6 and materials adding up, true net profit on a $15 listing can still be thin.",
  18:  "After about $2.16 in fees, you keep roughly $15.84 before costs. At $18, many handmade sellers find they can cover basic costs and retain a small margin, but only if COGS and shipping together stay under $10.",
  20:  "You keep around $17.65 before costs on a $20 sale. Fees represent about 11.8% of revenue. Whether that leaves a healthy profit depends heavily on your shipping setup and cost of goods per unit.",
  25:  "After roughly $2.83 in fees, you keep about $22.17 before costs. $25 is a common floor for craft sellers seeking to cover fees and basic materials, but shipping costs can still push real margin into single digits.",
  30:  "A $30 sale leaves approximately $26.70 before costs. This price point often works well for mid-range handmade goods if materials cost under $10 and shipping is manageable, leaving a workable net margin.",
  35:  "You keep around $31.22 before costs on a $35 sale. Fees of about $3.78 represent roughly 10.8% of revenue. With controlled COGS and shipping, $35 items can deliver solid margins for Etsy sellers.",
  40:  "After roughly $4.25 in fees, you keep about $35.75 before costs. At $40, the fee percentage drops toward 10.6%, giving sellers more room for materials and shipping while still protecting margin.",
  50:  "A $50 sale leaves approximately $44.80 before costs. With fees stabilising near 10.4%, sellers at this price point generally find the fee impact more predictable, though shipping and packaging still require careful accounting.",
  60:  "After about $6.15 in fees, you keep roughly $53.85 before costs. Fees represent around 10.25% of the $60 sale, a lower effective rate than at lower price points, rewarding sellers who can price into this range.",
  75:  "You keep approximately $67.42 before costs on a $75 sale. With fees near $7.58 (about 10.1% effective rate), this is often a target price zone for sellers whose COGS and shipping allow for healthy margins.",
  80:  "After roughly $8.05 in fees, you keep about $71.95 before costs. At $80 the effective fee rate dips just below 10.1%, making this price point efficient from a fee perspective for sellers with controlled costs.",
  100: "A $100 sale leaves approximately $90.05 before costs. Fees are just under $10, representing roughly 9.95% of revenue, one of the more predictable fee ratios and a common benchmark price for premium Etsy products.",
  120: "After about $11.85 in fees, you keep roughly $108.15 before costs. At $120, the effective fee rate is around 9.9%, and sellers who reach this price tier typically see meaningfully better per-order economics.",
  150: "You keep approximately $135.30 before costs on a $150 sale. With fees at roughly $14.70 (about 9.8% effective), this price point can support strong margins for sellers whose COGS and shipping are well managed.",
  200: "After roughly $19.45 in fees, you keep about $180.55 before costs. The 9.7% effective fee rate at $200 is among the better ratios in Etsy's standard fee structure, rewarding higher-ticket product strategies.",
  250: "A $250 sale leaves approximately $225.80 before costs. Fees of about $24.20 represent roughly 9.7% of revenue, consistent with other high-ticket price points and a strong argument for premium positioning.",
  300: "After about $28.95 in fees, you keep roughly $271.05 before costs. At $300 the effective fee rate holds near 9.65%, but Offsite Ads, if triggered, can significantly change the economics of each sale.",
  400: "You keep approximately $361.55 before costs on a $400 sale. Fees of roughly $38.45 represent about 9.6% of revenue. At this price point, Offsite Ads eligibility and ad spend strategy matter more than fee optimisation.",
  500: "After roughly $47.95 in fees, you keep about $452.05 before costs. The effective fee rate at $500 sits near 9.6%. Offsite Ads at 12% can add $60 more, making attributed sales worth scrutinising carefully.",
  750: "A $750 sale leaves approximately $678.30 before standard Etsy fees. At this ticket size, fee dollars are large in absolute terms, and Offsite Ads can add $90 per order, making ad settings and margin targets critical decisions.",
};

function getVariationNote(amount: number): string {
  return VARIATION_NOTES[amount] ?? "Fees vary by seller region, currency, and whether Offsite Ads applies to the order.";
}

function getKeepSummary(amount: number): string {
  return KEEP_SUMMARIES[amount] ?? "After Etsy fees, your take-home before costs depends on your region preset, shipping setup, and cost of goods.";
}

export function getEtsyFeeSaleScenario(amount: number): FeeSaleScenario {
  assertSupportedAmount(amount);

  const slug = `etsy-fees-on-${amount}-dollar-sale`;
  const canonical = `${BASE_URL}/${slug}`;

  const transactionFee = round2(amount * TRANSACTION_FEE_RATE);
  const processingFee = round2(amount * PROCESSING_FEE_RATE + PROCESSING_FEE_FIXED);
  const totalEstimatedFees = round2(LISTING_FEE + transactionFee + processingFee);
  const withOffsiteAdsEstimate = round2(totalEstimatedFees + amount * OFFSITE_ADS_RATE);

  const estimatedKeepBeforeCosts = round2(amount - totalEstimatedFees);
  const estimatedKeepWithOffsiteBeforeCosts = round2(amount - withOffsiteAdsEstimate);

  const h1 = `Etsy Fees on a $${amount} Sale`;
  const title = `Etsy Fees on a $${amount} Sale - Full Breakdown`;
  const metaDescription = `See exactly how much Etsy takes from a $${amount} sale including listing, transaction and payment fees.`;

  return {
    amount,
    slug,
    canonical,
    h1,
    title,
    metaDescription,
    intro: `If you sell an item for $${amount} on Etsy, total fees usually include listing, transaction, and payment processing fees. This page gives a practical estimate so you can price with better margin clarity.`,
    variationNote: getVariationNote(amount),
    keepSummary: getKeepSummary(amount),
    faq: {
      q1: `How much does Etsy take on a $${amount} sale?`,
      a1: `A common baseline estimate is around ${fmt(totalEstimatedFees)} before Offsite Ads and region-specific adjustments.`,
      q2: "Does shipping change Etsy fee totals?",
      a2: "Yes. Some Etsy fee components may apply to the total paid by the buyer, which can include shipping charged.",
      q3: "Why use a calculator instead of rough percentages?",
      a3: "Fee percentages are useful for quick checks, but real take-home depends on fixed fees, optional ad fees, and your own costs.",
    },
    fees: {
      listingFee: LISTING_FEE,
      transactionFee,
      processingFee,
      totalEstimatedFees,
      withOffsiteAdsEstimate,
      estimatedKeepBeforeCosts,
      estimatedKeepWithOffsiteBeforeCosts,
    },
  };
}

export function buildEtsyFeeSaleMetadata(amount: number): Metadata {
  const scenario = getEtsyFeeSaleScenario(amount);

  return {
    title: scenario.title,
    description: scenario.metaDescription,
    alternates: { canonical: scenario.canonical },
    openGraph: {
      type: "article",
      url: scenario.canonical,
      title: scenario.title,
      description: scenario.metaDescription,
      siteName: "TrueMargin",
    },
    twitter: {
      card: "summary_large_image",
      title: scenario.title,
      description: scenario.metaDescription,
    },
  };
}

export function buildEtsyFeeSaleJsonLd(amount: number): string {
  const s = getEtsyFeeSaleScenario(amount);
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${s.canonical}#webpage`,
      name: s.h1,
      description: s.metaDescription,
      url: s.canonical,
      isPartOf: {
        "@type": "WebSite",
        name: "TrueMargin",
        url: BASE_URL,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${s.canonical}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: s.faq.q1,
          acceptedAnswer: {
            "@type": "Answer",
            text: s.faq.a1,
          },
        },
        {
          "@type": "Question",
          name: s.faq.q2,
          acceptedAnswer: {
            "@type": "Answer",
            text: s.faq.a2,
          },
        },
        {
          "@type": "Question",
          name: s.faq.q3,
          acceptedAnswer: {
            "@type": "Answer",
            text: s.faq.a3,
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}
