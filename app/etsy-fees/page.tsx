import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://gettruemargin.com/etsy-fees";

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "Etsy Fees (2026)",
      description:
        "The complete Etsy fee breakdown for 2026. Listing fee $0.20, transaction fee 6.5%, payment processing 3% + $0.25, offsite ads 15%. See exactly what Etsy takes from every sale.",
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
          name: "What percentage does Etsy take in fees?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "On a typical US sale with no offsite ads, Etsy takes roughly 9.5% to 12% of the sale price in combined fees: transaction fee (6.5%), payment processing (~3% + $0.25), and listing fee ($0.20). On a $40 sale that is about $4.10. Offsite ads add another 15% on qualifying sales.",
          },
        },
        {
          "@type": "Question",
          name: "Does Etsy charge fees on shipping?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Etsy's 6.5% transaction fee and payment processing both apply to the full order value including any shipping you charge the buyer. Charge $8 shipping on a $30 item and Etsy calculates fees on $38, not $30.",
          },
        },
        {
          "@type": "Question",
          name: "Are Etsy fees the same in every country?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The transaction fee (6.5%) and listing fee ($0.20 USD) are the same globally. Payment processing varies by country. US sellers pay 3% + $0.25, Canadian sellers pay 3% + $0.25 CAD. Some regions also have a regulatory operating fee that does not apply to US or Canadian sellers.",
          },
        },
        {
          "@type": "Question",
          name: "Do offsite ads fees apply to every sale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Only on sales Etsy attributes to an offsite ad click. However, once your shop exceeds $10,000 in annual sales, participation is mandatory. The fee is 15% below that threshold and 12% above it.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Etsy Fees (2026) — Complete Seller Fee Breakdown | TrueMargin";
  const description =
    "The complete Etsy fee breakdown for 2026. Listing fee $0.20, transaction fee 6.5%, payment processing 3% + $0.25, offsite ads 15%. See exactly what Etsy takes from every sale.";

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
              Etsy Fees (2026)
            </h1>

            <div className="mt-6 border-l-4 border-emerald-500/60 pl-4 py-2 bg-white/[0.03]">
              <p className="text-xs font-medium uppercase tracking-wide text-[#9AA6BF] mb-1">Quick answer</p>
              <p className="leading-7 text-[#9AA6BF]">
                Etsy charges a $0.20 listing fee, 6.5% transaction fee, and ~3% + $0.25 payment processing on every sale.
                Offsite ads add 15% when applicable. On a $40 sale, total fees are roughly $4.10 before your own costs.
              </p>
            </div>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Every Etsy Fee in One Table</h2>

              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-4 py-3 text-left font-semibold text-[#EAF0FF]">Fee</th>
                      <th className="px-4 py-3 text-left font-semibold text-[#EAF0FF]">Rate</th>
                      <th className="px-4 py-3 text-left font-semibold text-[#EAF0FF]">On a $40 sale</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#9AA6BF]">
                    <tr>
                      <td className="px-4 py-3 font-medium text-[#EAF0FF]">Listing fee</td>
                      <td className="px-4 py-3">$0.20 fixed</td>
                      <td className="px-4 py-3">$0.20</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-[#EAF0FF]">Transaction fee</td>
                      <td className="px-4 py-3">6.5% of order total</td>
                      <td className="px-4 py-3">$2.60</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-[#EAF0FF]">Payment processing (US)</td>
                      <td className="px-4 py-3">3% + $0.25</td>
                      <td className="px-4 py-3">$1.45</td>
                    </tr>
                    <tr className="bg-white/[0.02]">
                      <td className="px-4 py-3 font-semibold text-[#EAF0FF]">Total (no ads)</td>
                      <td className="px-4 py-3 font-semibold text-[#EAF0FF]">N/A</td>
                      <td className="px-4 py-3 font-semibold text-[#EAF0FF]">$4.25</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-rose-400">+ Offsite ads fee</td>
                      <td className="px-4 py-3 text-rose-400">15% (12% over $10K/yr)</td>
                      <td className="px-4 py-3 text-rose-400">+ $6.00</td>
                    </tr>
                    <tr className="bg-white/[0.02]">
                      <td className="px-4 py-3 font-semibold text-rose-400">Total (with ads)</td>
                      <td className="px-4 py-3 font-semibold text-rose-400">N/A</td>
                      <td className="px-4 py-3 font-semibold text-rose-400">$10.25</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="text-xs text-[#9AA6BF]">
                Transaction and payment processing fees apply to the full order value including shipping charged to the buyer.
                Offsite ads only apply when Etsy attributes the sale to an external ad.
              </p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Worked Example: $40 Sale With $6 Shipping</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Item price $40, shipping charged to buyer $6. Total order value Etsy charges fees on: $46.
              </p>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6 space-y-3">
                <div className="space-y-1 text-sm text-[#9AA6BF]">
                  <div className="flex justify-between">
                    <span>Transaction fee (6.5% of $46)</span>
                    <span>$2.99</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment processing (3% of $46 + $0.25)</span>
                    <span>$1.63</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Listing fee</span>
                    <span>$0.20</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2 font-semibold text-[#EAF0FF]">
                    <span>Total Etsy fees</span>
                    <span>$4.82</span>
                  </div>
                </div>
                <p className="text-xs text-[#9AA6BF] pt-1">
                  Etsy takes $4.82 from a $40 sale with $6 shipping, 12.1% of item revenue, before your own costs.
                </p>
              </div>

              <p className="leading-7 text-[#9AA6BF]">
                Note that the transaction fee applied to the full $46 including shipping, not just the $40 item price.
                That extra $0.39 on the shipping alone is what most sellers miss when estimating fees by hand.
              </p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">How Fees Stack With Your Costs</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Fees alone don&apos;t tell the full story. What matters is what you keep after fees and your own costs.
                On the $40 example above, add $12 in cost of goods and you keep $23.18, a 57.9% margin. Strong.
                But price the same item at $22 with the same costs and margin drops to 11.8%, dangerously thin.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                Use the{" "}
                <Link href="/etsy-profit-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  Etsy Profit Calculator
                </Link>{" "}
                to see fees, costs, and margin together in one view before you list.
              </p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Etsy Fees by Country</h2>
              <p className="leading-7 text-[#9AA6BF]">
                The transaction fee (6.5%) and listing fee ($0.20 USD) are the same for every seller globally.
                Payment processing varies:
              </p>
              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-4 py-3 text-left font-semibold text-[#EAF0FF]">Country</th>
                      <th className="px-4 py-3 text-left font-semibold text-[#EAF0FF]">Payment processing</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#9AA6BF]">
                    <tr><td className="px-4 py-3">United States</td><td className="px-4 py-3">3% + $0.25 USD</td></tr>
                    <tr><td className="px-4 py-3">Canada</td><td className="px-4 py-3">3% + $0.25 CAD</td></tr>
                    <tr><td className="px-4 py-3">United Kingdom</td><td className="px-4 py-3">4% + £0.20</td></tr>
                    <tr><td className="px-4 py-3">Australia</td><td className="px-4 py-3">3% + $0.25 AUD</td></tr>
                    <tr><td className="px-4 py-3">European Union</td><td className="px-4 py-3">4% + €0.30</td></tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-[#9AA6BF]">
                Rates sourced from Etsy&apos;s fee schedule. Some regions also have a regulatory operating fee not listed above.
                Verify with{" "}
                <Link href="/etsy-fee-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  the calculator
                </Link>{" "}
                for your specific region.
              </p>
            </section>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#9AA6BF]">Calculate your exact fees now</p>
              <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                Free, no account needed. Enter your price, costs, and shipping and see every fee itemised instantly.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/etsy-fee-calculator"
                  className="inline-flex items-center rounded-md bg-[#2F3A56] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Calculate Etsy Fees
                </Link>
                <Link
                  href="/etsy-profit-calculator"
                  className="inline-flex items-center rounded-md border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Calculate My Profit
                </Link>
              </div>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Etsy Fees at Specific Price Points</h2>
              <div className="flex flex-wrap gap-2 text-sm">
                {[
                  { label: "Fees on a $15 sale", href: "/etsy-fees-on-15-dollar-sale" },
                  { label: "Fees on a $25 sale", href: "/etsy-fees-on-25-dollar-sale" },
                  { label: "Fees on a $40 sale", href: "/etsy-fees-on-40-dollar-sale" },
                  { label: "Fees on a $50 sale", href: "/etsy-fees-on-50-dollar-sale" },
                  { label: "Fees on a $75 sale", href: "/etsy-fees-on-75-dollar-sale" },
                  { label: "Fees on a $100 sale", href: "/etsy-fees-on-100-dollar-sale" },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 text-[#9AA6BF] transition hover:bg-white/10 hover:text-[#EAF0FF]"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">FAQ</h2>

              <h3 className="text-lg font-semibold text-[#EAF0FF]">What percentage does Etsy take in fees?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                On a typical US sale with no offsite ads, Etsy takes roughly 9.5&ndash;12% in combined fees. The exact
                percentage depends on order value (the $0.25 fixed processing fee matters more on small orders), whether
                you charge shipping, and your seller region. On a $40 sale it is about 10.6%. On a $15 sale it is closer
                to 13% because the fixed fees are a larger share of a smaller order.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Does Etsy charge fees on shipping?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                Yes. Both the 6.5% transaction fee and payment processing apply to the total order value including any
                shipping charged to the buyer. Charge $8 shipping on a $30 item and Etsy calculates fees on $38 total.
                On the transaction fee alone that is an extra $0.52 most sellers do not account for.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Are Etsy fees the same in every country?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                The 6.5% transaction fee and $0.20 USD listing fee are universal. Payment processing varies, UK
                sellers pay 4% + £0.20, EU sellers pay 4% + €0.30, while US and Canadian sellers pay 3% + $0.25 in
                their local currency. Some regions also have a regulatory operating fee on top.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Do offsite ads fees apply to every sale?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                No, only on sales attributed to an offsite ad click. Sellers under $10,000 in annual sales can opt
                out. Above that threshold enrollment is mandatory and the fee drops from 15% to 12%. The offsite ads fee
                is the single largest variable in your total Etsy fee bill and the one most likely to catch sellers off guard.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                What most sellers don&apos;t realise: Etsy&apos;s attribution window is 30 days. If a buyer clicked an
                offsite ad at any point in the 30 days before their purchase, even accidentally, even on a
                different device, the fee applies. A buyer who tapped a Google Shopping result on their phone
                and then returned to buy directly a week later still triggers the fee. One click resets the 30-day
                clock. There is no appeal process. This is why the offsite ads fee is less predictable than it appears
               , repeat customers with any ad exposure in the last month all count.
              </p>
            </section>

          </article>
        </div>
      </main>
    </>
  );
}
