import Link from "next/link";

type SwitcherKey = "profit" | "fee" | "break-even";

const ITEMS: Array<{
  key: SwitcherKey;
  href: string;
  label: string;
  description: string;
}> = [
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
];

export function CalculatorSwitcher({
  current,
  dark = false,
}: {
  current: SwitcherKey;
  dark?: boolean;
}) {
  return (
    <div className="mt-4 space-y-3">
      <div>
        <p
          className={
            dark ? "text-sm font-medium text-[#EAF0FF]" : "text-sm font-medium text-foreground"
          }
        >
          Compare Etsy pricing tools
        </p>
        <nav
          className="mt-2 flex flex-wrap items-center gap-2"
          aria-label="Etsy calculator switcher"
        >
          {ITEMS.map((item) => {
            const active = item.key === current;
            return (
              <Link
                key={item.key}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium transition-all",
                  dark
                    ? active
                      ? "bg-white/20 text-[#EAF0FF] shadow-md ring-1 ring-white/20"
                      : "bg-white/5 text-[#9AA6BF] ring-1 ring-white/10 hover:bg-white/10 hover:text-[#EAF0FF] hover:ring-white/20"
                    : active
                      ? "bg-foreground/10 text-foreground shadow-sm ring-1 ring-foreground/20"
                      : "bg-muted/50 text-muted-foreground ring-1 ring-border hover:bg-muted hover:text-foreground",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
        {ITEMS.map((item) => {
          const active = item.key === current;
          return (
            <span
              key={item.key}
              className={
                dark
                  ? active
                    ? "text-[#EAF0FF]"
                    : "text-[#9AA6BF]"
                  : active
                    ? "text-foreground"
                    : "text-muted-foreground"
              }
            >
              <span className="font-medium">{item.label}</span>
              <span className="font-normal"> – {item.description}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
