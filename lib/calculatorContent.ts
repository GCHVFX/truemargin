/**
 * Page-specific copy and content for Etsy calculator pages.
 * Used by CalculatorPage and CalculatorSeoSection.
 */

export type CalculatorContentKey = "profit" | "fee" | "break-even" | "pricing";

export type CalculatorContent = {
  eyebrowText: string;
  heroH1: string;
  heroH2: string;
  heroSubhead: string;
  seoHeading: string;
  seoIntro: string;
  includes: string[];
  howTo: string[];
  faqs: Array<{ q: string; a: string }>;
  supportBlock: {
    heading: string;
    paragraphs: string[];
  };
};

const CONTENT: Record<CalculatorContentKey, CalculatorContent> = {
  profit: {
    eyebrowText: "Etsy profit calculator (V1): fees, break-even, target margin.",
    heroH1: "Etsy Profit Calculator",
    heroH2: "Calculate real profit after every Etsy fee",
    heroSubhead:
      "Enter one order and see net profit, margin, and a full fee breakdown. Know what you keep after listing, transaction, processing, and offsite ads.",
    seoHeading: "Etsy profit calculator",
    seoIntro:
      "Calculate real Etsy profit per order after fees, cost of goods, and shipping. Use it to validate margins before ads and spot pricing mistakes fast.",
    includes: [
      "Transaction, payment processing, and listing fee estimates (based on your seller region preset).",
      "Cost of goods (per unit) and your shipping cost to calculate true profit.",
      "Optional Offsite Ads fee when you toggle it on.",
      "Break-even and target margin pricing suggestions.",
    ],
    howTo: [
      "Enter item price, quantity, and shipping charged.",
      "Add cost of goods per unit and your shipping cost.",
      "Toggle Offsite Ads if the order came from Etsy Offsite Ads.",
      "Click Calculate to see net profit and profit margin.",
    ],
    faqs: [
      {
        q: "How much does Etsy take per sale?",
        a: "Etsy fees can include listing fees, transaction fees, payment processing fees, and optional Offsite Ads fees depending on the order.",
      },
      {
        q: "Does this calculator include Etsy payment processing fees?",
        a: "Yes. It includes payment processing as a percentage plus a fixed fee, based on your selected seller region preset.",
      },
      {
        q: "Does this calculator include Offsite Ads?",
        a: "Yes. You can toggle Offsite Ads on or off to see how Etsy fees affect your profit margin.",
      },
      {
        q: "What is a healthy Etsy profit margin?",
        a: "It depends on the product, but many sellers aim for a margin that leaves room for fees, refunds, promotions, and rising costs.",
      },
    ],
    supportBlock: {
      heading: "How real Etsy profit is calculated",
      paragraphs: [
        "Real profit is what you keep after Etsy fees, your cost of goods, and your shipping cost. Revenue minus those three gives you net profit. Divide by revenue to get margin.",
        "Sellers often overestimate profit by forgetting fees, shipping, or both. Etsy fees alone can reach 15% or more of the sale; payment processing adds more. Combined with COGS and your shipping cost, the gap between gross and net can be large.",
        "Margin clarity helps you spot underpriced items before they sell. It also helps you set realistic targets for ads and promotions.",
      ],
    },
  },
  fee: {
    eyebrowText: "Etsy fee calculator (V1): fee breakdown, break-even, pricing targets.",
    heroH1: "Etsy Fee Calculator",
    heroH2: "See exactly how much Etsy takes per order",
    heroSubhead:
      "Estimate Etsy fees per order with a clear breakdown: listing, transaction, processing, offsite ads, and shipping. See total fees instantly.",
    seoHeading: "Etsy fee calculator",
    seoIntro:
      "Estimate Etsy fees for an order, including listing, transaction, payment processing, and optional Offsite Ads. Results focus on total fees and the line-item breakdown.",
    includes: [
      "Transaction, payment processing, and listing fee estimates (based on your seller region preset).",
      "Optional Offsite Ads fee when you toggle it on.",
      "A clear fee breakdown with total fees highlighted.",
    ],
    howTo: [
      "Enter item price, quantity, and shipping charged to the buyer.",
      "Select seller region and toggle Offsite Ads if needed.",
      "Click Calculate to see total fees and the breakdown.",
    ],
    faqs: [
      {
        q: "What fees does this Etsy fee calculator include?",
        a: "It estimates listing, transaction, and payment processing fees, plus optional Offsite Ads when enabled. Presets vary by seller region.",
      },
      {
        q: "Do Etsy fees apply to shipping?",
        a: "Often, yes. This calculator applies fees to the combined revenue (item subtotal plus shipping charged) where applicable.",
      },
      {
        q: "Is this an exact match to my Etsy statement?",
        a: "No. It's an estimate for planning and pricing. Your final statement can differ based on taxes, shop settings, and promotions.",
      },
    ],
    supportBlock: {
      heading: "Understanding Etsy fees for pricing",
      paragraphs: [
        "Etsy sellers face several fees: a listing fee per item, a transaction fee on the sale total, and payment processing fees that include both a percentage and a fixed amount. Offsite Ads add another percentage when the order comes from Etsy's advertising.",
        "Listing, transaction, and payment processing fees are applied to the combined order value—item subtotal plus shipping charged. That means what the buyer pays for shipping also gets fee treatment.",
        "Knowing your total fees per order helps you price accurately. Underestimate fees and you eat into margin; overestimate and you may overprice. A clear fee breakdown gives you the visibility to make better pricing decisions.",
      ],
    },
  },
  "break-even": {
    eyebrowText: "Etsy break-even calculator (V1): minimum price after fees and costs.",
    heroH1: "Etsy Break-even Calculator",
    heroH2: "Find your minimum price to cover fees and costs",
    heroSubhead:
      "Enter your order details to get the break-even price per unit—the minimum you need to charge so fees, COGS, and shipping don't eat your margin.",
    seoHeading: "Etsy break-even calculator",
    seoIntro:
      "Find the minimum price per unit you need to charge to avoid losing money after fees and costs. Useful for new listings and price checks before running ads.",
    includes: [
      "Minimum price per unit based on fees, cost of goods per unit, and shipping costs.",
      "Fee estimates including listing, transaction, payment processing, and optional Offsite Ads.",
      "Full fee breakdown at the solved minimum price.",
    ],
    howTo: [
      "Enter quantity, shipping charged to the buyer, cost of goods per unit, and your shipping cost.",
      "Choose seller region and toggle Offsite Ads if needed.",
      "Click Calculate to solve for minimum price per unit and see the fee breakdown.",
    ],
    faqs: [
      {
        q: "What is break-even price?",
        a: "It's the minimum price per unit required to make $0 profit after fees and costs, based on the inputs you provide.",
      },
      {
        q: "Does break-even include shipping?",
        a: "Yes. The calculator considers shipping charged and your shipping cost, and models fees on the combined revenue where applicable.",
      },
      {
        q: "Can I use this for multi-quantity orders?",
        a: "Yes. Set Quantity to match the order and enter cost of goods per unit. Results are per order, with break-even shown per unit.",
      },
    ],
    supportBlock: {
      heading: "Why break-even matters for Etsy sellers",
      paragraphs: [
        "Break-even is the minimum item price that covers Etsy fees, your cost of goods, and your shipping cost. Below that, you lose money on the sale.",
        "Etsy fees, shipping, and COGS all push your break-even higher. Transaction and payment fees scale with order value; listing fees add per unit; your shipping cost and materials add fixed costs that must be recovered.",
        "Underpricing is common when sellers forget fees or shipping. A break-even number gives you a clear floor. Price above it to leave room for profit, refunds, and promotions.",
      ],
    },
  },
  pricing: {
    eyebrowText: "Etsy pricing calculator (V1): target margin with full fee clarity.",
    heroH1: "Etsy Pricing Calculator",
    heroH2: "Set your Etsy price to hit your target margin",
    heroSubhead:
      "Enter your costs, shipping charged to the buyer, and target margin, then see the recommended item price per unit with net profit, margin health, and a full fee breakdown.",
    seoHeading: "Etsy pricing calculator",
    seoIntro:
      "Find the Etsy item price you should charge to hit your target margin after fees, cost of goods, shipping charged to the buyer, and your shipping cost. Use it to price with confidence before you list.",
    includes: [
      "Recommended Etsy item price per unit based on your target margin and selected seller region.",
      "Shipping charged to the buyer included in the solve.",
      "Estimated net profit and margin at the recommended price.",
      "Full fee breakdown including listing, transaction, processing, and optional Offsite Ads.",
      "Margin health indicator so you can quickly judge pricing strength.",
    ],
    howTo: [
      "Enter your cost of goods, your shipping cost, and shipping charged to the buyer.",
      "Set your target margin percentage.",
      "Choose seller region and toggle Offsite Ads if needed.",
      "Click Update Recommended Price to refresh the item price and fee breakdown.",
    ],
    faqs: [
      {
        q: "How is the recommended Etsy price calculated?",
        a: "The calculator solves for the item price per unit needed to hit your target margin after Etsy fees, cost of goods, shipping charged to the buyer, and your shipping cost.",
      },
      {
        q: "Does this include Etsy payment processing and listing fees?",
        a: "Yes. It includes listing fee, transaction fee, payment processing, and optional Offsite Ads based on your selected seller region preset.",
      },
      {
        q: "What if I turn on Offsite Ads?",
        a: "The calculator includes the Offsite Ads fee in the math, which usually raises the recommended Etsy price needed to keep your target margin.",
      },
      {
        q: "Can I use this for different countries?",
        a: "Yes. Select your seller region to apply region-based fee presets so your recommended price stays realistic.",
      },
    ],
    supportBlock: {
      heading: "How target-margin Etsy pricing works",
      paragraphs: [
        "Target-margin pricing starts with the margin you want to keep, then solves backward for the item price per unit required after Etsy fees and costs.",
        "The calculator includes listing fees, transaction fees, payment processing, and optional Offsite Ads, plus your cost of goods, shipping charged to the buyer, and your shipping cost.",
        "This gives you a clear recommended item price so you can avoid guesswork and protect profit before publishing a listing.",
      ],
    },
  },
};

/** Maps variant/pathname to content key */
export function getCalculatorContentKey(
  variant: string | undefined,
  pathname: string
): CalculatorContentKey {
  const v = (variant || pathname || "").toLowerCase();
  if (v.includes("pricing")) return "pricing";
  if (v.includes("fee")) return "fee";
  if (v.includes("break")) return "break-even";
  return "profit";
}

/** Returns full content for a calculator variant, including seoContent for CalculatorSeoSection */
export function getCalculatorContent(key: CalculatorContentKey): CalculatorContent & { seoContent: ReturnType<typeof getSeoContent> } {
  const c = CONTENT[key];
  return {
    ...c,
    seoContent: getSeoContent(key),
  };
}

/** Returns seoContent shape for CalculatorSeoSection (heading, intro, includes, howTo, faqs, supportBlock) */
export function getSeoContent(key: CalculatorContentKey): {
  heading: string;
  intro: string;
  includes: string[];
  howTo: string[];
  faqs: Array<{ q: string; a: string }>;
  supportBlock: { heading: string; paragraphs: string[] };
} {
  const c = CONTENT[key];
  return {
    heading: c.seoHeading,
    intro: c.seoIntro,
    includes: c.includes,
    howTo: c.howTo,
    faqs: c.faqs,
    supportBlock: c.supportBlock,
  };
}
