import Link from "next/link";

type SwitcherKey = "profit" | "fee" | "break-even";

export function CalculatorSwitcher({ current }: { current: SwitcherKey }) {
  const items: Array<{ key: SwitcherKey; href: string; label: string }> = [
    { key: "profit", href: "/etsy-profit-calculator", label: "Profit calculator" },
    { key: "fee", href: "/etsy-fee-calculator", label: "Fee calculator" },
    { key: "break-even", href: "/etsy-break-even-calculator", label: "Break-even calculator" },
  ];

  return (
    <div className="mt-4">
      <div className="text-xs text-muted-foreground">Compare tools</div>
      <nav className="mt-2 flex flex-wrap items-center gap-3 text-sm">
        {items.map((item) => {
          const active = item.key === current;
          return (
            <Link
              key={item.key}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className={[
                "rounded-full border px-3 py-1 transition-colors",
                active
                  ? "border-foreground/20 bg-foreground/5 text-foreground"
                  : "border-border hover:bg-muted/40 text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
      <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
        TrueMargin offers three focused Etsy calculators: profit to measure real net margin, fees to
        break down Etsy&apos;s charges, and break-even to set a clear minimum price.
      </p>
    </div>
  );
}
