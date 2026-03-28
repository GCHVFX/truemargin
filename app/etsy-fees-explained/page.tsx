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
                <span className="font-semibold text-[#EAF0FF]">Listing fee: $0.20</span> &mdash; fixed per listing published or auto-renewed on sale. Applies every time the listing sells and renews.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <span className="font-semibold text-[#EAF0FF]">
                  <Link href="/etsy-transaction-fee" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                    Transaction fee: 6.5%
                  </Link>
                </span>{" "}
                &mdash; applied to the full order total including shipping charged to the buyer. On a $35 item with $5 shipping, the fee is 6.5% of $40 = $2.60.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <span className="font-semibold text-[#EAF0FF]">
                  <Link href="/etsy-payment-processing-fee" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                    Payment processing: 3% + $0.25 (US)
                  </Link>
                </span>{" "}
                &mdash; varies by seller country. US sellers pay 3% + $0.25, UK sellers pay 4% + £0.20, EU sellers pay 4% + €0.30.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <span className="font-semibold text-[#EAF0FF]">Offsite Ads fee: 15% (12% above $10K/year)</span>{" "}
                &mdash; only applies when Etsy attributes the sale to an external ad. Mandatory once you cross $10,000 in annual sales. Use the{" "}
                <Link href="/etsy-offsite-ads-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  Offsite Ads Calculator
                </Link>{" "}
                to see your threshold status and per-order impact.
              </p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Real Fee Totals at Common Price Points</h2>
              <p className="leading-7 text-[#9AA6BF]">
                These examples use US payment processing rates with no shipping charged and no offsite ads.
                Your total will be higher if you charge shipping.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">$25 sale</p>
                  <div className="mt-2 space-y-1 text-xs text-[#9AA6BF]">
                    <div className="flex justify-between"><span>Transaction (6.5%)</span><span>$1.63</span></div>
                    <div className="flex justify-between"><span>Processing (3% + $0.25)</span><span>$1.00</span></div>
                    <div className="flex justify-between"><span>Listing fee</span><span>$0.20</span></div>
                    <div className="flex justify-between font-semibold text-[#EAF0FF] border-t border-white/10 pt-1 mt-1"><span>Total</span><span>$2.83</span></div>
                  </div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">$50 sale</p>
                  <div className="mt-2 space-y-1 text-xs text-[#9AA6BF]">
                    <div className="flex justify-between"><span>Transaction (6.5%)</span><span>$3.25</span></div>
                    <div className="flex justify-between"><span>Processing (3% + $0.25)</span><span>$1.75</span></div>
                    <div className="flex justify-between"><span>Listing fee</span><span>$0.20</span></div>
                    <div className="flex justify-between font-semibold text-[#EAF0FF] border-t border-white/10 pt-1 mt-1"><span>Total</span><span>$5.20</span></div>
                  </div>
                </div>
                <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                  <p className="font-semibold text-[#EAF0FF]">$100 sale</p>
                  <div className="mt-2 space-y-1 text-xs text-[#9AA6BF]">
                    <div className="flex justify-between"><span>Transaction (6.5%)</span><span>$6.50</span></div>
                    <div className="flex justify-between"><span>Processing (3% + $0.25)</span><span>$3.25</span></div>
                    <div className="flex justify-between"><span>Listing fee</span><span>$0.20</span></div>
                    <div className="flex justify-between font-semibold text-[#EAF0FF] border-t border-white/10 pt-1 mt-1"><span>Total</span><span>$9.95</span></div>
                  </div>
                </div>
              </div>
              <p className="leading-7 text-[#9AA6BF]">
                To get exact numbers for your specific sale including shipping and offsite ads, use the{" "}
                <Link href="/etsy-fee-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  Etsy Fee Calculator
                </Link>.
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
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">FAQ</h2>

              <h3 className="text-lg font-semibold text-[#EAF0FF]">How much does Etsy take per sale?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                On a typical US sale with no offsite ads, Etsy takes roughly 10&ndash;12% in combined fees. On a $25 sale
                that is $2.83. On a $50 sale it is $5.20. On a $100 sale it is $9.95. Add offsite ads and those totals
                jump by 15%, which can push total fees to 25%+ of the sale price on lower-margin products.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">What Etsy fees are included in the total?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                Every sale includes the $0.20 listing fee, 6.5% transaction fee on the full order including any shipping
                charged, and payment processing (3% + $0.25 for US sellers). Offsite ads add 15% on qualifying sales.
                Some regions have a regulatory operating fee on top. Run all of these through the{" "}
                <Link href="/etsy-fee-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  fee calculator
                </Link>{" "}
                to see your specific total.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Why do Etsy profits feel lower than expected?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                Because fees stack in ways that aren&apos;t obvious. Most sellers only mentally account for the transaction fee
                and forget that payment processing, listing fees, and the fact that fees apply to shipping all compound
                on the same order. Add cost of goods and your own shipping cost on top, and a $25 sale that feels like
                $15 profit is often closer to $8. The only fix is running the full calculation before you price.
              </p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
