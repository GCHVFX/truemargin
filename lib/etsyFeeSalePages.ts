import type { Metadata } from "next";

export const SUPPORTED_ETSY_FEE_SALE_AMOUNTS = [10, 25, 50, 100, 250, 500] as const;

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

function getVariationNote(amount: number): string {
  if (amount <= 25) {
    return "On lower-priced items, fixed fees take a bigger percentage of the sale, so margin can feel tighter than expected.";
  }
  if (amount <= 100) {
    return "At this price point, fee dollars rise quickly with order value, so even small pricing changes can meaningfully affect take-home.";
  }
  return "On higher-ticket orders, fee dollars can become substantial, especially when Offsite Ads applies, so pricing strategy matters more.";
}

function getKeepSummary(amount: number): string {
  if (amount <= 25) {
    return "You may keep most of the sale before product and shipping costs, but the remaining margin can shrink fast once those costs are added.";
  }
  if (amount <= 100) {
    return "The payout can still look healthy before costs, but true profit depends heavily on your cost of goods and shipping setup.";
  }
  return "Even when payout is large in dollars, real profit can be thinner than expected after fees, shipping, ad fees, and product costs.";
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
