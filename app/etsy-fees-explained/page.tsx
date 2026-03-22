import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://gettruemargin.com/etsy-fees-explained";

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "Etsy Fees Explained - Listing, Transaction and Payment Fees",
      description:
        "See the full breakdown of Etsy listing fees, transaction fees, payment processing costs, regulatory fees, and Offsite Ads.",
      url: CANONICAL,
      isPartOf: {
        "@type": "WebSite",
        name: "TrueMargin",
        url: "https://gettruemargin.com",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How much does Etsy take per sale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Many sellers often see Etsy fees around 10% to 15% on a standard order, but the exact total depends on seller region, shipping charged, and whether Offsite Ads applies.",
          },
        },
        {
          "@type": "Question",
          name: "What Etsy fees are included in the total?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The total can include listing fee, transaction fee, payment processing fee, regulatory operating fee in some regions, and optional Offsite Ads fee.",
          },
        },
        {
          "@type": "Question",
          name: "Why do Etsy profits feel lower than expected?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sellers often price from product cost alone and miss stacked platform fees, shipping cost, and ad fees. Profit calculators help show take-home clearly before listing.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Etsy Fees Explained - Listing, Transaction and Payment Fees";
  const description =
    "See the full breakdown of Etsy listing fees, transaction fees, payment processing costs, and Offsite Ads in one practical guide.";

  return {
    title,
    description,
    alternates: { canonical: CANONICAL },
    openGraph: {
      type: "article",
      url: CANONICAL,
      title,
      description,
      siteName: "TrueMargin",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />

      <main className="calculator-page-bg min-h-screen py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 text-[#EAF0FF] sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#EAF0FF] sm:text-4xl">
              Etsy Fees Explained (Full 2026 Breakdown)
            </h1>
            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-[#9AA6BF] mb-2">Quick answer</p>
              <div className="border-l-4 border-emerald-500/60 pl-4 py-2 bg-white/5 text-[#D6DEEE] text-base">
                <p className="leading-7 text-[#9AA6BF]">Etsy charges sellers four main fees per order: a $0.20 listing fee, a 6.5% transaction fee, a payment processing fee (around 3%), and an optional Offsite Ads fee of 12–15%.</p>
              </div>
            </div>

            <section className="mt-6 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">How Much Does Etsy Take?</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Short answer: many sellers often see Etsy fees land around 10% to 15% on a standard order. Your exact total can be lower or higher
                depending on payment processing rules for your seller region and whether Offsite Ads applies to that sale.
              </p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Etsy Fee Breakdown</h2>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Listing fee:</strong> A fixed fee per listing or renewal.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Transaction fee:</strong> A percentage Etsy applies to the order total.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Payment processing:</strong> Usually a percentage plus fixed amount, based on seller region.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Regulatory fees:</strong> Additional region-based operating fee in some markets.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Offsite Ads:</strong> Optional percentage fee when Etsy attributes a sale to Offsite Ads.
              </p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Example Etsy Sale Scenarios</h2>
              <p className="leading-7 text-[#9AA6BF]">
                These ranges are planning examples, not exact statements. Use your own inputs for precise numbers.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">$25 sale</p>
                  <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                    Typical fees can land around a few dollars after listing, transaction, and processing.
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">$50 sale</p>
                  <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                    Fees usually rise with order value, and Offsite Ads can increase the total further.
                  </p>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">$100 sale</p>
                  <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                    Total Etsy fees can become a meaningful dollar amount, so pricing with margin in mind is critical.
                  </p>
                </div>
              </div>
              <p className="leading-7 text-[#9AA6BF]">
                To replace rough ranges with exact fee output, run these scenarios in the{" "}
                <Link href="/etsy-fee-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  Etsy Fee Calculator
                </Link>
                .
              </p>
            </section>

            <section className="mt-10 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">TrueMargin Etsy Calculator Tools</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/etsy-fee-calculator"
                  className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy Fee Calculator
                  <span className="mt-1 block text-xs font-normal text-[#9AA6BF]">Estimate Etsy fees per order.</span>
                </Link>
                <Link
                  href="/etsy-profit-calculator"
                  className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy Profit Calculator
                  <span className="mt-1 block text-xs font-normal text-[#9AA6BF]">See what you actually keep after fees and costs.</span>
                </Link>
                <Link
                  href="/etsy-break-even-calculator"
                  className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy Break-even Calculator
                  <span className="mt-1 block text-xs font-normal text-[#9AA6BF]">Find your minimum safe item price.</span>
                </Link>
                <Link
                  href="/etsy-pricing-calculator"
                  className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy Pricing Calculator
                  <span className="mt-1 block text-xs font-normal text-[#9AA6BF]">Set your Etsy price to hit your target margin.</span>
                </Link>
              </div>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Example Etsy Fee Calculations</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href="/etsy-fees-on-10-dollar-sale"
                  className="rounded-lg border border-white/10 bg-white/5 p-4 text-base font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy fees on a $10 sale
                  <span className="mt-1 block text-sm font-normal text-[#9AA6BF]">
                    See a practical fee breakdown for a low-ticket order.
                  </span>
                </Link>
                <Link
                  href="/etsy-fees-on-25-dollar-sale"
                  className="rounded-lg border border-white/10 bg-white/5 p-4 text-base font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy fees on a $25 sale
                  <span className="mt-1 block text-sm font-normal text-[#9AA6BF]">
                    Review a common mid-range example with estimated fee totals.
                  </span>
                </Link>
                <Link
                  href="/etsy-fees-on-50-dollar-sale"
                  className="rounded-lg border border-white/10 bg-white/5 p-4 text-base font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy fees on a $50 sale
                  <span className="mt-1 block text-sm font-normal text-[#9AA6BF]">
                    Understand how fee dollars scale as order value grows.
                  </span>
                </Link>
                <Link
                  href="/etsy-fees-on-100-dollar-sale"
                  className="rounded-lg border border-white/10 bg-white/5 p-4 text-base font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy fees on a $100 sale
                  <span className="mt-1 block text-sm font-normal text-[#9AA6BF]">
                    Check a higher-value example and expected payout range.
                  </span>
                </Link>
                <Link
                  href="/etsy-fees-on-250-dollar-sale"
                  className="rounded-lg border border-white/10 bg-white/5 p-4 text-base font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy fees on a $250 sale
                  <span className="mt-1 block text-sm font-normal text-[#9AA6BF]">
                    See why fee dollars become significant on larger orders.
                  </span>
                </Link>
                <Link
                  href="/etsy-fees-on-500-dollar-sale"
                  className="rounded-lg border border-white/10 bg-white/5 p-4 text-base font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy fees on a $500 sale
                  <span className="mt-1 block text-sm font-normal text-[#9AA6BF]">
                    Review a high-ticket fee example before setting price targets.
                  </span>
                </Link>
              </div>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Etsy Fees on Different Sale Prices</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Etsy fees vary depending on your price point. Here&apos;s a breakdown of what Etsy takes at different sale amounts.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                If you want to calculate your exact profit after fees, use the{" "}
                <Link href="/etsy-profit-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  Etsy profit calculator
                </Link>
                .
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                You can also use the{" "}
                <Link href="/etsy-fee-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  Etsy fee calculator
                </Link>
                {" "}to break down each fee individually.
              </p>
              <ul className="list-disc space-y-2 pl-6 leading-7">
                <li>
                  <Link href="/etsy-fees-on-10-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                    Etsy fees on a $10 sale
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-12-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                    Etsy fees on a $12 sale
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-15-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                    What Etsy takes from a $15 sale
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-18-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                    What Etsy takes from an $18 sale
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-20-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                    Etsy fee breakdown for a $20 item
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-25-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                    Etsy fees on a $25 sale
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-30-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                    What you keep from a $30 Etsy sale
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-35-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                    Etsy fee breakdown for a $35 item
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-40-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                    Etsy fees on a $40 sale
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-50-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                    What Etsy takes from a $50 sale
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-60-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                    What you keep from a $60 Etsy sale
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-75-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                    Etsy fee breakdown for a $75 item
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-80-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                    Etsy fees on an $80 sale
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-100-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                    Etsy fees on a $100 sale
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-120-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                    What Etsy takes from a $120 sale
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-150-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                    What Etsy takes from a $150 sale
                  </Link>
                </li>
              </ul>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Why Etsy Fees Are Often Underestimated</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Many sellers price from product cost and forget that Etsy fees are layered. Transaction and processing fees scale with order value,
                and optional ad fees can reduce take-home even more.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                Profit calculators help because they show fees, cost of goods, shipping, and margin together in one view. That makes pricing
                decisions more reliable and prevents surprises after a sale.
              </p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
