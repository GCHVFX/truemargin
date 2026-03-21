/**
 * Static “how it works” copy for Etsy calculator pages.
 * Server-safe — used in Server Components for SEO.
 */

import type { CalculatorContentKey } from "./calculatorContent";

export type EtsyCalculatorLogicContent = {
  heading: string;
  intro: string;
  formulaLines: string[];
  uses: string[];
  exampleTitle: string;
  exampleBlocks: string[][];
  relatedIntro: string;
  related: Array<{ href: string; title: string; description: string }>;
};

export const ETSY_CALCULATOR_LOGIC: Record<CalculatorContentKey, EtsyCalculatorLogicContent> = {
  pricing: {
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
  },
  fee: {
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
  },
  "break-even": {
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
  },
  profit: {
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
  },
};

export function getEtsyCalculatorLogicContent(key: CalculatorContentKey): EtsyCalculatorLogicContent {
  return ETSY_CALCULATOR_LOGIC[key];
}
