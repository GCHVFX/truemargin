/**
 * Shared types for config-driven calculator pages.
 * Supports multiple marketplaces (Etsy, future: Amazon, eBay, etc.).
 */

export type CalculatorContentKey = "profit" | "fee" | "break-even" | "pricing";

/** Order of result blocks in CalculatorResults. breakEven is shown only when result has breakEvenItemPrice. */
export type ResultBlockKey = "summary" | "fee" | "breakEven";

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
  /** Added by getCalculatorContent for CalculatorSeoSection */
  seoContent?: SeoContent;
};

export type SeoContent = {
  heading: string;
  intro: string;
  includes: string[];
  howTo: string[];
  faqs: Array<{ q: string; a: string }>;
  supportBlock?: {
    heading: string;
    paragraphs: string[];
  };
};

export type SwitcherItem = {
  key: CalculatorContentKey;
  href: string;
  label: string;
  description: string;
};

export type SwitcherConfig = {
  marketplace: string;
  label: string;
  items: SwitcherItem[];
};

export type CalculatorConfig = {
  /** Unique id, e.g. "etsy-profit-calculator" */
  id: string;
  /** Marketplace slug for grouping, e.g. "etsy" */
  marketplace: string;
  /** Calculation mode: profit, fee, or break-even */
  contentKey: CalculatorContentKey;
  /** Page content: headings, support, FAQ */
  content: CalculatorContent;
  /** Order of result blocks. breakEven omitted when not applicable. */
  resultOrder: ResultBlockKey[];
  /** Switcher for related calculators in same marketplace */
  switcher: SwitcherConfig;
};
