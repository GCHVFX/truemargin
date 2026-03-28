import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://gettruemargin.com/how-to-price-etsy-products";

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "How to Price Etsy Products",
      description:
        "Learn how to price Etsy products using a simple formula that accounts for fees, cost of goods, and profit margin. Calculate your real Etsy profit with TrueMargin.",
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
          name: "How do I calculate Etsy pricing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Work backwards from your target margin. Add your cost of goods, shipping cost, and all Etsy fees (6.5% transaction, ~3% + $0.25 processing, $0.20 listing). Then set your price so that after all deductions, your profit divided by sale price meets your target — ideally 30% or higher.",
          },
        },
        {
          "@type": "Question",
          name: "What profit margin should Etsy sellers aim for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Aim for at least 30% after all fees and costs. Below 30% is tight — one refund, one slow week, or an offsite ad fee can wipe your profit. Below 15% is risky and usually means you are underpricing. Strong Etsy sellers typically run 40-55% margins on their core products.",
          },
        },
        {
          "@type": "Question",
          name: "Should shipping be included in Etsy pricing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, always. Shipping cost comes directly out of your pocket. Include your actual outbound shipping cost in your pricing model, not what you charge the buyer. Etsy also charges its transaction fee on shipping you charge buyers, so it affects your fee calculation too.",
          },
        },
        {
          "@type": "Question",
          name: "Do Etsy fees make pricing harder?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Etsy fees stack — transaction fee, payment processing, listing fee, and potentially offsite ads all apply to the same order. On a $25 sale that is roughly $2.83 in fees before your own costs. Sellers who price based on gut feel often end up with far less than expected.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "How to Price Etsy Products (Simple Pricing Formula) | TrueMargin";
  const description =
    "Learn how to price Etsy products using a simple formula that accounts for fees, cost of goods, and profit margin. Calculate your real Etsy profit with TrueMargin.";

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
              How to Price Etsy Products (The Only Way That Actually Works)
            </h1>
            <p className="mt-5 text-base leading-7 text-[#9AA6BF]">
              Price your product so you land at 30&ndash;50%+ profit margin after Etsy fees. Anything below 30% is fragile.
              Below 15% is risky. Most sellers price based on competitors or gut feel &mdash; that&apos;s how you end up working
              for Etsy instead of making money.
            </p>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#9AA6BF]">Want to know your real Etsy profit?</p>
              <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                Use the free Etsy Profit Calculator to see exactly what you keep after every fee &mdash; no signup needed.
              </p>
              <Link
                href="/etsy-profit-calculator"
                className="mt-4 inline-flex items-center rounded-md bg-[#2F3A56] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Try the Etsy Profit Calculator
              </Link>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Step 1: Know What Etsy Actually Takes</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Every Etsy sale includes multiple stacked fees. Most sellers only think about one or two of them:
              </p>
              <ul className="space-y-2 pl-5 text-[#9AA6BF]">
                <li className="leading-7"><span className="font-semibold text-[#EAF0FF]">6.5% transaction fee</span> &mdash; charged on the full sale price including shipping you charge</li>
                <li className="leading-7"><span className="font-semibold text-[#EAF0FF]">~3% + $0.25 payment processing</span> &mdash; varies slightly by country</li>
                <li className="leading-7"><span className="font-semibold text-[#EAF0FF]">$0.20 listing fee</span> &mdash; charged when listed and again when sold via auto-renew</li>
                <li className="leading-7"><span className="font-semibold text-[#EAF0FF]">15% offsite ads fee</span> &mdash; applies if a sale comes through an offsite ad; mandatory once you hit $10K/year in sales</li>
              </ul>
              <p className="leading-7 text-[#9AA6BF]">
                These stack. On a $25 sale with no offsite ads, you are already giving Etsy roughly $2.83 before you
                account for your own costs. That is why pricing by feel never works.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Step 2: Work Backwards From Your Target Margin</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Do not start with a price and hope the margin works out. Start with the margin you need, then find the price that hits it.
              </p>

              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-4 py-3 text-left font-semibold text-[#EAF0FF]">Margin</th>
                      <th className="px-4 py-3 text-left font-semibold text-[#EAF0FF]">Label</th>
                      <th className="px-4 py-3 text-left font-semibold text-[#EAF0FF]">What it means</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#9AA6BF]">
                    <tr><td className="px-4 py-3">&lt;15%</td><td className="px-4 py-3 text-rose-400">Low</td><td className="px-4 py-3">You are likely underpricing &mdash; one refund wipes you out</td></tr>
                    <tr><td className="px-4 py-3">15&ndash;29%</td><td className="px-4 py-3 text-amber-400">OK</td><td className="px-4 py-3">Tight, little room for error or ad costs</td></tr>
                    <tr><td className="px-4 py-3">30&ndash;49%</td><td className="px-4 py-3 text-teal-400">Good</td><td className="px-4 py-3">Sustainable, room to absorb fee changes</td></tr>
                    <tr><td className="px-4 py-3">50%+</td><td className="px-4 py-3 text-emerald-400">Strong</td><td className="px-4 py-3">You have pricing power &mdash; room to run ads or discount</td></tr>
                  </tbody>
                </table>
              </div>

              <p className="leading-7 text-[#9AA6BF]">
                Aim for Good (30%+) as your floor. If you plan to run offsite ads or promotions, aim for Strong (50%+)
                so there is margin left after the extra fees hit.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Step 3: Worked Example With Real Numbers</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Let us price a handmade item properly. Sale price $25, cost to produce $8, shipping charged separately.
              </p>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6 space-y-3">
                <p className="font-semibold text-[#EAF0FF]">Fee breakdown</p>
                <div className="space-y-1 text-sm text-[#9AA6BF]">
                  <div className="flex justify-between"><span>Transaction fee (6.5%)</span><span>$1.63</span></div>
                  <div className="flex justify-between"><span>Processing (~3% + $0.25)</span><span>$1.00</span></div>
                  <div className="flex justify-between"><span>Listing fee</span><span>$0.20</span></div>
                  <div className="flex justify-between border-t border-white/10 pt-2 font-semibold text-[#EAF0FF]"><span>Total fees</span><span>$2.83</span></div>
                </div>
                <div className="space-y-1 text-sm text-[#9AA6BF] border-t border-white/10 pt-3">
                  <div className="flex justify-between"><span>Revenue</span><span>$25.00</span></div>
                  <div className="flex justify-between"><span>Cost of goods</span><span>&minus;$8.00</span></div>
                  <div className="flex justify-between"><span>Fees</span><span>&minus;$2.83</span></div>
                  <div className="flex justify-between font-semibold text-emerald-400 border-t border-white/10 pt-2"><span>Profit</span><span>$14.17 &mdash; 56.7% (Strong)</span></div>
                </div>
              </div>

              <p className="leading-7 text-[#9AA6BF]">
                Now price the same item at $15. Fees drop to ~$1.80, but profit collapses to $5.20 &mdash; a 34.6% margin.
                You did not just lose $10 in price. You cut your profit by 63%. That is why pricing matters more than volume.
              </p>
            </section>

            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Step 4: Price by Product Type</h2>
              <p className="leading-7 text-[#9AA6BF]">Different Etsy categories behave very differently.</p>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-[#EAF0FF]">Handmade (e.g. candles)</h3>
                <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                  Real material and time costs mean margins get squeezed fast. On a $20 candle with $7 in materials,
                  after ~$2.50 in fees you keep roughly $10.50 &mdash; about 52%. Drop to $14 and you are probably at 25%
                  or below. Handmade needs higher prices than most sellers think. If you are under $20&ndash;25 on physical
                  items, you are usually underpaid for your time.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-[#EAF0FF]">Digital products (e.g. printable planner)</h3>
                <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                  Near-zero marginal cost means fees dominate the equation. A $10 digital product with $0.50 in platform
                  costs and ~$1.15 in Etsy fees leaves you with ~$8.35 &mdash; 83% margin. The trap here is pricing too low.
                  Going from $5 to $10 often doubles profit with no extra work because the fee structure stays nearly identical.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-[#EAF0FF]">Vintage items</h3>
                <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                  Pricing flexibility is higher, but sellers often underprice because items feel found rather than produced.
                  On a $40 vintage item sourced for $15, after ~$3.85 in fees you keep ~$21 &mdash; about 52%. Treat your
                  sourcing cost exactly like manufacturing cost. Your time finding and photographing the item is real labour.
                </p>
              </div>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Step 5: Account for Offsite Ads</h2>
              <p className="leading-7 text-[#9AA6BF]">
                If a sale comes through an Etsy offsite ad, a 15% fee applies on top of everything else. On the $25
                example above, that is an extra $3.75 &mdash; dropping profit from $14.17 to $10.42 and margin from 56.7%
                to 41.7%. If your base margin is already thin at 20%, offsite ads push you into unprofitable territory instantly.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                Once you hit $10,000 in annual Etsy sales, offsite ads enrollment is mandatory and you cannot opt out.
                Price with that in mind now, not after you cross the threshold. Use the{" "}
                <Link href="/etsy-offsite-ads-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  Etsy Offsite Ads Calculator
                </Link>{" "}
                to see exactly how ads affect your margin at any price point.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Common Etsy Pricing Mistakes</h2>
              <p className="leading-7 text-[#9AA6BF]">
                <span className="font-semibold text-[#EAF0FF]">Pricing off competitors only.</span>{" "}
                Their costs are not your costs. Use competitor prices as a ceiling check, not a formula.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <span className="font-semibold text-[#EAF0FF]">Ignoring shipping cost.</span>{" "}
                Include your actual outbound shipping cost, not what you charge the buyer. Etsy also charges its
                transaction fee on shipping you charge buyers, so it affects your fee total too.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <span className="font-semibold text-[#EAF0FF]">Leaving no buffer for ads or refunds.</span>{" "}
                A 15% margin sounds okay until you get one refund or one offsite ad sale. Price to absorb those, not to
                just survive without them.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <span className="font-semibold text-[#EAF0FF]">Assuming demand drops if you raise prices.</span>{" "}
                Most Etsy sellers who test higher prices are surprised. Buyers often perceive higher-priced items as
                higher quality. Test it before assuming you will lose sales.
              </p>
            </section>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#9AA6BF]">Check your pricing before your next listing</p>
              <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                Run your numbers through the Etsy Profit Calculator. See exact profit, margin health, and fee breakdown &mdash;
                free, no account needed.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/etsy-profit-calculator"
                  className="inline-flex items-center rounded-md bg-[#2F3A56] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Calculate Profit
                </Link>
                <Link
                  href="/etsy-pricing-calculator"
                  className="inline-flex items-center rounded-md border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Find Your Target Price
                </Link>
              </div>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Related: Etsy Fees by Sale Price</h2>
              <p className="leading-7 text-[#9AA6BF]">See exactly what Etsy takes at common price points:</p>
              <div className="flex flex-wrap gap-2 text-sm">
                {[
                  { label: "Fees on a $15 sale", href: "/etsy-fees-on-15-dollar-sale" },
                  { label: "Fees on a $25 sale", href: "/etsy-fees-on-25-dollar-sale" },
                  { label: "Fees on a $50 sale", href: "/etsy-fees-on-50-dollar-sale" },
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

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">FAQ</h2>

              <h3 className="text-lg font-semibold text-[#EAF0FF]">How do I calculate Etsy pricing?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                Work backwards from your target margin. Add cost of goods, your shipping cost, and all Etsy fees. Then
                set your price so that profit divided by sale price hits your target &mdash; aim for 30% minimum. The
                easiest way is to use the{" "}
                <Link href="/etsy-pricing-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  Etsy Pricing Calculator
                </Link>{" "}
                which does this in one step.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">What profit margin should Etsy sellers aim for?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                30% after all fees and costs is your floor. Below that, one refund, one offsite ad sale, or one shipping
                price increase can push you into a loss. Aim for 40&ndash;50% if you plan to run ads or offer promotions.
                Strong Etsy sellers typically run 40&ndash;55% on core products.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Should shipping be included in Etsy pricing?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                Yes, always. Include the cost you pay to ship the order, not what you charge the buyer. The gap between
                those two numbers comes directly out of your margin. Etsy also charges its transaction fee on shipping
                you charge buyers, so the impact is compounded.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Do Etsy fees make pricing harder?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                Yes. Transaction, payment processing, listing, and potentially offsite ads all apply to the same order.
                On a $25 sale that is roughly $2.83 in fees before your own costs. Sellers who price by feel often end
                up with far less than expected. Use the{" "}
                <Link href="/etsy-fee-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  Etsy Fee Calculator
                </Link>{" "}
                to see the full picture before you list.
              </p>
            </section>

          </article>
        </div>
      </main>
    </>
  );
}
