import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://gettruemargin.com/how-much-does-etsy-take";

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "How Much Does Etsy Take? (Full Fee Breakdown)",
      description:
        "Exact Etsy fee amounts for common sale prices. Listing, transaction, payment processing, and Offsite Ads fees broken down with real numbers.",
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
          name: "What percentage does Etsy take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Without Offsite Ads, baseline Etsy fees land between 10% and 13% of the order total depending on price. With Offsite Ads at 15%, the combined total can reach 25% or more on lower-priced items.",
          },
        },
        {
          "@type": "Question",
          name: "How much does Etsy take on a $25 sale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "On a $25 US sale: $0.20 listing + $1.63 transaction + $1.00 processing = $2.83 before Offsite Ads. If the order came through Offsite Ads, add $3.75 for a total of $6.58.",
          },
        },
        {
          "@type": "Question",
          name: "Does Etsy charge fees on shipping?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Transaction fees apply to the full order total including any shipping charged to the buyer. If you charge $5 for shipping on a $25 item, Etsy's 6.5% transaction fee applies to the full $30.",
          },
        },
        {
          "@type": "Question",
          name: "How does Etsy's Offsite Ads attribution window work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Etsy's Offsite Ads attribution window is 30 days. A sale can be tagged as an Offsite Ads order up to 30 days after the buyer first clicked the ad — even if they came back later and searched directly.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "How Much Does Etsy Take? (Full Fee Breakdown)";
  const description =
    "Exact Etsy fee amounts for $10, $25, $50, and $100 sales. Listing, transaction, payment processing, and Offsite Ads fees with real numbers — not estimates.";

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
              How Much Does Etsy Take Per Sale?
            </h1>

            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-[#9AA6BF] mb-2">Quick answer</p>
              <div className="border-l-4 border-emerald-500/60 pl-4 py-2 bg-white/5 text-[#D6DEEE] text-base">
                <p className="leading-7 text-[#9AA6BF]">
                  Every Etsy order incurs a $0.20 listing fee, a 6.5% transaction fee, and a payment processing fee
                  of roughly 3% + $0.25. On a $25 US sale that comes to $2.83 before Offsite Ads.
                </p>
              </div>
            </div>

            <p className="mt-5 text-base leading-7 text-[#9AA6BF]">
              Etsy does not charge one flat fee. Three separate fees apply to every order. A fourth — Offsite Ads —
              applies when Etsy attributes the sale to a promoted listing click within the past 30 days.
            </p>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#9AA6BF]">
                Want your exact number, not a breakdown?
              </p>
              <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                Enter your sale price, shipping, and seller region in the Etsy Fee Calculator for a per-order result.
              </p>
              <Link
                href="/etsy-fee-calculator"
                className="mt-4 inline-flex items-center rounded-md bg-[#2F3A56] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Try the Etsy Fee Calculator
              </Link>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">The Four Etsy Fees</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-[#9AA6BF] border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-left">
                      <th className="pb-3 pr-6 font-medium text-[#EAF0FF]">Fee</th>
                      <th className="pb-3 pr-6 font-medium text-[#EAF0FF]">Amount</th>
                      <th className="pb-3 font-medium text-[#EAF0FF]">When it applies</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="py-3 pr-6">Listing fee</td>
                      <td className="py-3 pr-6">$0.20</td>
                      <td className="py-3">Every new listing and each auto-renewal after a sale</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6">Transaction fee</td>
                      <td className="py-3 pr-6">6.5%</td>
                      <td className="py-3">Applied to item price plus any shipping charged</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6">Payment processing</td>
                      <td className="py-3 pr-6">~3% + $0.25</td>
                      <td className="py-3">Every order paid through Etsy Payments (varies by country)</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-6">Offsite Ads fee</td>
                      <td className="py-3 pr-6">15% (or 12%)</td>
                      <td className="py-3">Only when Etsy attributes the sale to an offsite ad click within 30 days</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="leading-7 text-[#9AA6BF]">
                The 12% Offsite Ads rate applies to sellers who have made more than $10,000 on Etsy in the past 365 days.
                Under that threshold, the rate is 15%.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Exact Fees by Sale Price (US, No Shipping)</h2>
              <p className="leading-7 text-[#9AA6BF]">
                These figures use US payment processing rates. Shipping fees charged to the buyer are not included in
                the order total below — adding shipping would increase the transaction fee.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-[#9AA6BF] border-collapse">
                  <thead>
                    <tr className="border-b border-white/10 text-left">
                      <th className="pb-3 pr-4 font-medium text-[#EAF0FF]">Sale price</th>
                      <th className="pb-3 pr-4 font-medium text-[#EAF0FF]">Listing</th>
                      <th className="pb-3 pr-4 font-medium text-[#EAF0FF]">Transaction</th>
                      <th className="pb-3 pr-4 font-medium text-[#EAF0FF]">Processing</th>
                      <th className="pb-3 pr-4 font-medium text-[#EAF0FF]">Total fees</th>
                      <th className="pb-3 font-medium text-[#EAF0FF]">You keep</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    <tr>
                      <td className="py-3 pr-4 text-[#EAF0FF] font-medium">$10</td>
                      <td className="py-3 pr-4">$0.20</td>
                      <td className="py-3 pr-4">$0.65</td>
                      <td className="py-3 pr-4">$0.55</td>
                      <td className="py-3 pr-4 text-[#EAF0FF]">$1.40</td>
                      <td className="py-3 text-emerald-400">$8.60</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-[#EAF0FF] font-medium">$25</td>
                      <td className="py-3 pr-4">$0.20</td>
                      <td className="py-3 pr-4">$1.63</td>
                      <td className="py-3 pr-4">$1.00</td>
                      <td className="py-3 pr-4 text-[#EAF0FF]">$2.83</td>
                      <td className="py-3 text-emerald-400">$22.17</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-[#EAF0FF] font-medium">$50</td>
                      <td className="py-3 pr-4">$0.20</td>
                      <td className="py-3 pr-4">$3.25</td>
                      <td className="py-3 pr-4">$1.75</td>
                      <td className="py-3 pr-4 text-[#EAF0FF]">$5.20</td>
                      <td className="py-3 text-emerald-400">$44.80</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-[#EAF0FF] font-medium">$100</td>
                      <td className="py-3 pr-4">$0.20</td>
                      <td className="py-3 pr-4">$6.50</td>
                      <td className="py-3 pr-4">$3.25</td>
                      <td className="py-3 pr-4 text-[#EAF0FF]">$9.95</td>
                      <td className="py-3 text-emerald-400">$90.05</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="leading-7 text-[#9AA6BF]">
                These are baseline fees only. Offsite Ads would add $1.50, $3.75, $7.50, or $15.00 to each row
                respectively (at 15%).
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">The Offsite Ads Fee and the 30-Day Window</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Etsy's Offsite Ads attribution window is 30 days. A sale can be tagged as an Offsite Ads order up to
                30 days after the buyer first clicked the promoted listing — even if they came back later via direct
                search or a bookmark.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                Sellers who made over $10,000 on Etsy in the past 365 days cannot opt out of Offsite Ads. The fee
                drops from 15% to 12% once you cross that threshold.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                On a $50 sale at 15%, Offsite Ads adds $7.50 — bringing total fees from $5.20 to $12.70. That shifts
                your pre-cost take-home from $44.80 to $37.30.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Why Shipping Makes Fees Higher Than Expected</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Etsy applies the 6.5% transaction fee to the full order total, including any shipping charged to the
                buyer. If you charge $5 for shipping on a $25 item, the transaction fee applies to $30, not $25.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                That adds $0.33 to the bill. Not huge — but it stacks, and it catches sellers off guard when they
                price without accounting for it.
              </p>
            </section>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#9AA6BF]">
                Run the numbers for your listing
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/etsy-fee-calculator"
                  className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy Fee Calculator
                  <span className="mt-1 block text-xs font-normal text-[#9AA6BF]">Estimate fees for one order</span>
                </Link>
                <Link
                  href="/etsy-profit-calculator"
                  className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy Profit Calculator
                  <span className="mt-1 block text-xs font-normal text-[#9AA6BF]">See what you actually keep</span>
                </Link>
                <Link
                  href="/etsy-break-even-calculator"
                  className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy Break-even Calculator
                  <span className="mt-1 block text-xs font-normal text-[#9AA6BF]">Find your minimum safe price</span>
                </Link>
                <Link
                  href="/etsy-fees-explained"
                  className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy Fees Explained
                  <span className="mt-1 block text-xs font-normal text-[#9AA6BF]">Full guide to every fee type</span>
                </Link>
              </div>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">FAQ</h2>

              <details className="group rounded-xl border border-white/10 bg-white/5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-sm font-medium text-[#EAF0FF] list-none">
                  What percentage does Etsy take?
                  <span className="shrink-0 text-[#9AA6BF] transition-transform group-open:rotate-180">▾</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-[#9AA6BF] leading-relaxed">
                  Without Offsite Ads, baseline fees land between 10% and 13% of the order total depending on price.
                  With Offsite Ads at 15%, the combined total can reach 25% or more on lower-priced items.
                </p>
              </details>

              <details className="group rounded-xl border border-white/10 bg-white/5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-sm font-medium text-[#EAF0FF] list-none">
                  How much does Etsy take on a $25 sale?
                  <span className="shrink-0 text-[#9AA6BF] transition-transform group-open:rotate-180">▾</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-[#9AA6BF] leading-relaxed">
                  On a $25 US sale: $0.20 listing + $1.63 transaction + $1.00 processing = $2.83 before Offsite Ads.
                  If the order came through Offsite Ads, add $3.75 for a total of $6.58.
                </p>
              </details>

              <details className="group rounded-xl border border-white/10 bg-white/5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-sm font-medium text-[#EAF0FF] list-none">
                  Does Etsy charge fees on shipping?
                  <span className="shrink-0 text-[#9AA6BF] transition-transform group-open:rotate-180">▾</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-[#9AA6BF] leading-relaxed">
                  Yes. The 6.5% transaction fee applies to the full order total including any shipping charged to the
                  buyer. If you charge $5 shipping on a $25 item, the transaction fee applies to $30.
                </p>
              </details>

              <details className="group rounded-xl border border-white/10 bg-white/5">
                <summary className="flex cursor-pointer items-center justify-between gap-4 p-5 text-sm font-medium text-[#EAF0FF] list-none">
                  How does Etsy's Offsite Ads attribution window work?
                  <span className="shrink-0 text-[#9AA6BF] transition-transform group-open:rotate-180">▾</span>
                </summary>
                <p className="px-5 pb-5 text-sm text-[#9AA6BF] leading-relaxed">
                  Etsy's attribution window is 30 days. A sale can be tagged as an Offsite Ads order up to 30 days
                  after the buyer first clicked the ad — even if they returned later via direct search.
                </p>
              </details>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
