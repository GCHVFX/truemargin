/**
 * Etsy calculator configuration.
 * Defines content, result ordering, and switcher for all Etsy calculator pages.
 */

import type { CalculatorConfig, SwitcherConfig } from "./types";
import { getCalculatorContent } from "@/lib/calculatorContent";

const ETSY_SWITCHER: SwitcherConfig = {
  marketplace: "etsy",
  label: "Compare Etsy pricing tools",
  items: [
    {
      key: "profit",
      href: "/etsy-profit-calculator",
      label: "Profit calculator",
      description: "calculate real profit after Etsy fees",
    },
    {
      key: "fee",
      href: "/etsy-fee-calculator",
      label: "Fee calculator",
      description: "estimate Etsy fees per order",
    },
    {
      key: "break-even",
      href: "/etsy-break-even-calculator",
      label: "Break-even calculator",
      description: "find the minimum profitable price",
    },
  ],
};

/** Etsy calculator configs keyed by route variant */
export const ETSY_CALCULATOR_CONFIGS: Record<string, CalculatorConfig> = {
  "etsy-profit-calculator": {
    id: "etsy-profit-calculator",
    marketplace: "etsy",
    contentKey: "profit",
    content: getCalculatorContent("profit"),
    resultOrder: ["summary", "fee", "breakEven"],
    switcher: ETSY_SWITCHER,
  },
  "etsy-fee-calculator": {
    id: "etsy-fee-calculator",
    marketplace: "etsy",
    contentKey: "fee",
    content: getCalculatorContent("fee"),
    resultOrder: ["fee", "breakEven", "summary"],
    switcher: ETSY_SWITCHER,
  },
  "etsy-break-even-calculator": {
    id: "etsy-break-even-calculator",
    marketplace: "etsy",
    contentKey: "break-even",
    content: getCalculatorContent("break-even"),
    resultOrder: ["breakEven", "fee", "summary"],
    switcher: ETSY_SWITCHER,
  },
};
