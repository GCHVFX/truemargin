import Link from "next/link";
import type { SwitcherConfig } from "@/config/calculators/types";
import { track } from "@/lib/analytics";

function getLinkClassName(dark: boolean, active: boolean): string {
  const base = "rounded-full px-4 py-2 text-sm font-medium transition-all";
  if (dark) {
    return active
      ? `${base} bg-white/20 text-[#EAF0FF] shadow-md ring-1 ring-white/20`
      : `${base} bg-white/5 text-[#9AA6BF] ring-1 ring-white/10 hover:bg-white/10 hover:text-[#EAF0FF] hover:ring-white/20`;
  }
  return active
    ? `${base} bg-foreground/10 text-foreground shadow-sm ring-1 ring-foreground/20`
    : `${base} bg-muted/50 text-muted-foreground ring-1 ring-border hover:bg-muted hover:text-foreground`;
}

function getDescriptionClassName(dark: boolean, active: boolean): string {
  if (dark) return active ? "text-[#EAF0FF]" : "text-[#9AA6BF]";
  return active ? "text-foreground" : "text-muted-foreground";
}

function getLabelClassName(dark: boolean): string {
  return dark ? "text-sm font-medium text-[#EAF0FF]" : "text-sm font-medium text-foreground";
}

const ETSY_ITEMS: SwitcherConfig = {
  marketplace: "etsy",
  label: "Compare Etsy pricing tools",
  items: [
    { key: "profit", href: "/etsy-profit-calculator", label: "Profit calculator", description: "calculate real profit after Etsy fees" },
    { key: "fee", href: "/etsy-fee-calculator", label: "Fee calculator", description: "estimate Etsy fees per order" },
    { key: "break-even", href: "/etsy-break-even-calculator", label: "Break-even calculator", description: "find the minimum profitable price" },
  ],
};

export function CalculatorSwitcher({
  current,
  dark = false,
  switcher = ETSY_ITEMS,
}: {
  current: "profit" | "fee" | "break-even";
  dark?: boolean;
  /** Config-driven switcher. Defaults to Etsy when omitted for backwards compatibility. */
  switcher?: SwitcherConfig;
}) {
  return (
    <div className="mt-4 space-y-3">
      <div>
        <p className={getLabelClassName(dark)}>
          {switcher.label}
        </p>
        <nav
          className="mt-2 flex flex-wrap items-center gap-2"
          aria-label={`${switcher.marketplace} calculator switcher`}
        >
          {switcher.items.map((item) => {
            const active = item.key === current;
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => track("calculator_switcher_clicked", { from: current, to: item.key })}
                className={getLinkClassName(dark, active)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {switcher.items.map((item) => {
          const active = item.key === current;
          return (
            <span key={item.key} className={getDescriptionClassName(dark, active)}>
              <span className="font-medium">{item.label}</span>
              <span className="font-normal"> – {item.description}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
