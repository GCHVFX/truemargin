import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://gettruemargin.com/etsy-fees-us";

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "Etsy Fees for US Sellers",
      description:
        "A complete breakdown of Etsy fees for US sellers in 2026: listing fees, transaction fees, payment processing, and offsite ads. See exactly what Etsy takes from every sale.",
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
          name: "How much does Etsy charge US sellers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "US Etsy sellers pay a $0.20 listing fee, a 6.5% transaction fee on the full sale price including shipping charged, and payment processing of 3% + $0.25 per order. Offsite ads add a 15% fee on top when a sale comes through an Etsy ad. This drops to 12% once you exceed $10,000 in annual sales, but enrollment becomes mandatory.",
          },
        },
        {
          "@type": "Question",
          name: "Does Etsy charge fees on shipping in the US?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Etsy's 6.5% transaction fee applies to the full sale amount including any shipping you charge the buyer. If you charge $5 shipping, Etsy takes $0.33 of that. Payment processing fees also apply to the total order including shipping.",
          },
        },
        {
          "@type": "Question",
          name: "Do US Etsy sellers pay offsite ads fees on every sale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The 15% offsite ads fee only applies when Etsy attributes the sale to an offsite ad click. However, once your shop exceeds $10,000 in annual sales, participation in offsite ads becomes mandatory and you cannot opt out.",
          },
        },
        {
          "@type": "Question",
          name: "How do I calculate Etsy fees in the US?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Add the $0.20 listing fee, 6.5% of total sale price including shipping, and 3% + $0.25 for payment processing. If the sale came through an offsite ad, add 15% of the sale price. On a $35 sale with $5 shipping, total fees come to roughly $4.21 before offsite ads.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Etsy Fees for US Sellers (2026 Breakdown) | TrueMargin";
  const description =
    "A complete breakdown of Etsy fees for US sellers: listing fees, transaction fees, payment processing, and offsite ads. See exactly what Etsy takes from every sale.";

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
              Etsy Fees for US Sellers (2026)
            </h1>
            <p className="mt-5 text-base leading-7 text-[#9AA6BF]">
              US Etsy sellers pay four main fees on every sale: a $0.20 listing fee, a 6.5% transaction fee,
              payment processing of 3% + $0.25, and a 15% offsite ads fee when applicable. On a typical $35 sale
              that is roughly $4.21 out of your pocket before you account for your own costs.
            </p>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#9AA6BF]">See the exact fee breakdown for your sale</p>
              <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                Enter your price, costs, and shipping into the free Etsy Fee Calculator and see every fee itemised instantly.
              </p>
              <Link
                href="/etsy-fee-calculator"
                className="mt-4 inline-flex items-center rounded-md bg-[#2F3A56] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Try the Etsy Fee Calculator
              </Link>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Every Etsy Fee US Sellers Pay</h2>

              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-4 py-3 text-left font-semibold text-[#EAF0FF]">Fee</th>
                      <th className="px-4 py-3 text-left font-semibold text-[#EAF0FF]">Rate</th>
                      <th className="px-4 py-3 text-left font-semibold text-[#EAF0FF]">Applied to</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#9AA6BF]">
                    <tr>
                      <td className="px-4 py-3 font-medium text-[#EAF0FF]">Listing fee</td>
                      <td className="px-4 py-3">$0.20</td>
                      <td className="px-4 py-3">Per listing published or auto-renewed</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-[#EAF0FF]">Transaction fee</td>
                      <td className="px-4 py-3">6.5%</td>
                      <td className="px-4 py-3">Full sale price including shipping charged to buyer</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-[#EAF0FF]">Payment processing</td>
                      <td className="px-4 py-3">3% + $0.25</td>
                      <td className="px-4 py-3">Total order value including shipping</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-[#EAF0FF]">Offsite ads</td>
                      <td className="px-4 py-3">15% (12% over $10K/yr)</td>
                      <td className="px-4 py-3">Sales attributed to an Etsy offsite ad only</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="leading-7 text-[#9AA6BF]">
                The listing fee applies twice on sold items. It charges once when the listing is created and again when it sells
                via auto-renew. Most sellers factor in one listing fee per sale as a fixed cost.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Worked Example: Fees on a $35 US Sale</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Item price $35, $5 shipping charged to buyer, no offsite ads.
              </p>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6 space-y-3">
                <p className="font-semibold text-[#EAF0FF]">Fee breakdown</p>
                <div className="space-y-1 text-sm text-[#9AA6BF]">
                  <div className="flex justify-between">
                    <span>Transaction fee (6.5% of $35 + $5)</span>
                    <span>$2.60</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment processing (3% of $40 + $0.25)</span>
                    <span>$1.45</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Listing fee</span>
                    <span>$0.20</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2 font-semibold text-[#EAF0FF]">
                    <span>Total Etsy fees</span>
                    <span>$4.25</span>
                  </div>
                </div>
                <p className="text-xs text-[#9AA6BF] pt-1">
                  Etsy keeps $4.25 of your $35 sale. That is 12.1% of item revenue, before your own costs.
                </p>
              </div>

              <p className="leading-7 text-[#9AA6BF]">
                Now add a $12 cost of goods and you keep $18.75, a 53.6% margin. That is healthy. Drop your price
                to $20 with the same costs and fees collapse to ~$2.85, leaving you with just $5.15, a 25.7% margin
                that barely survives a refund or a slow week.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">What Happens When Offsite Ads Apply</h2>
              <p className="leading-7 text-[#9AA6BF]">
                If a buyer clicked an Etsy offsite ad before purchasing, Etsy charges an additional 15% fee on the full
                sale price. On the $35 example above that is an extra $5.25. That is more than the total of all other fees
                combined. Your $18.75 profit becomes $13.50 and margin drops from 53.6% to 38.6%.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                Sellers under $10,000 in annual sales can opt out of offsite ads. Once you cross that threshold, enrollment
                is mandatory. The fee drops to 12% above $10K, but you cannot turn it off. Price your products with this
                in mind before you hit the threshold, not after. Use the{" "}
                <Link href="/etsy-offsite-ads-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  Etsy Offsite Ads Calculator
                </Link>{" "}
                to see exactly how it affects your margin.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                Etsy's attribution window is 30 days. If a buyer clicked an offsite ad at any point in the 30 days
                before their purchase, the fee applies. It does not matter if they came back to your shop directly. It
                does not matter if the click was accidental or on a different device. A repeat customer who returns
                directly to your shop can still trigger the fee. One click resets the 30-day window. There is no
                appeal process.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">The Fee Sellers Most Often Miscalculate</h2>
              <p className="leading-7 text-[#9AA6BF]">
                <span className="font-semibold text-[#EAF0FF]">Transaction fee on shipping.</span>{" "}
                Etsy charges its 6.5% transaction fee on any shipping you charge the buyer, not just the item price.
                If you charge $8 shipping on a $25 item, the transaction fee applies to $33, not $25. That adds
                $0.52 to your fee total that most sellers miss completely.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <span className="font-semibold text-[#EAF0FF]">Payment processing on the full order.</span>{" "}
                The 3% + $0.25 processing fee also applies to the total order value including shipping. The $0.25 fixed
                component is small but adds up across hundreds of orders.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <span className="font-semibold text-[#EAF0FF]">Listing fee on every sale.</span>{" "}
                When a listing sells and auto-renews, the $0.20 fee applies again. Sellers who run high volume on low-price
                items often underestimate this cost across their full catalogue.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">What Margin Should US Etsy Sellers Target?</h2>
              <p className="leading-7 text-[#9AA6BF]">
                After all fees and your own costs, aim for at least 30%. Below that you have very little buffer for ads,
                refunds, or fee changes. The breakdown:
              </p>

              <div className="overflow-x-auto rounded-xl border border-white/10">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 bg-white/5">
                      <th className="px-4 py-3 text-left font-semibold text-[#EAF0FF]">Margin</th>
                      <th className="px-4 py-3 text-left font-semibold text-[#EAF0FF]">Label</th>
                      <th className="px-4 py-3 text-left font-semibold text-[#EAF0FF]">Reality</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-[#9AA6BF]">
                    <tr><td className="px-4 py-3">&lt;15%</td><td className="px-4 py-3 text-rose-400">Low</td><td className="px-4 py-3">One refund or offsite ad sale likely puts you in the red</td></tr>
                    <tr><td className="px-4 py-3">15&ndash;29%</td><td className="px-4 py-3 text-amber-400">OK</td><td className="px-4 py-3">Workable but fragile. No room for promotions or ads</td></tr>
                    <tr><td className="px-4 py-3">30&ndash;49%</td><td className="px-4 py-3 text-teal-400">Good</td><td className="px-4 py-3">Sustainable. Can absorb fee changes and occasional ads</td></tr>
                    <tr><td className="px-4 py-3">50%+</td><td className="px-4 py-3 text-emerald-400">Strong</td><td className="px-4 py-3">Pricing power. Room to scale with ads or run promotions</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#9AA6BF]">Know your real profit before you list</p>
              <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                Run your US sale through the Etsy Profit Calculator. See exact fees, net profit, and margin health. Free, no account needed.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/etsy-profit-calculator"
                  className="inline-flex items-center rounded-md bg-[#2F3A56] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Calculate My Profit
                </Link>
                <Link
                  href="/etsy-fee-calculator"
                  className="inline-flex items-center rounded-md border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Calculate My Fees
                </Link>
              </div>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Etsy Fees at Common US Sale Prices</h2>
              <p className="leading-7 text-[#9AA6BF]">See exactly what Etsy takes at price points common for US sellers:</p>
              <div className="flex flex-wrap gap-2 text-sm">
                {[
                  { label: "Fees on a $20 sale", href: "/etsy-fees-on-20-dollar-sale" },
                  { label: "Fees on a $35 sale", href: "/etsy-fees-on-35-dollar-sale" },
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

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">FAQ</h2>

              <h3 className="text-lg font-semibold text-[#EAF0FF]">How much does Etsy charge US sellers?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                US sellers pay $0.20 listing fee, 6.5% transaction fee on the full sale price including shipping charged,
                and 3% + $0.25 payment processing per order. On a $35 sale with $5 shipping, that is $4.25 in fees before
                your own costs. Offsite ads add 15% on top when applicable.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Does Etsy charge fees on shipping in the US?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                Yes. The 6.5% transaction fee and payment processing fee both apply to the full order value including any
                shipping you charge the buyer. If you charge $8 shipping on a $25 item, Etsy calculates fees on $33 total.
                This is one of the most commonly missed fee calculations for US sellers.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Do US Etsy sellers pay offsite ads fees on every sale?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                No. Only on sales Etsy attributes to an offsite ad click. But once your shop exceeds $10,000 in annual
                sales, offsite ads enrollment becomes mandatory. You cannot opt out. The fee drops from 15% to 12% above
                that threshold, but it applies to every qualifying sale regardless.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">How do I calculate Etsy fees in the US?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                Add $0.20 listing fee, 6.5% of total order value including shipping, and 3% + $0.25 processing. If offsite
                ads apply, add 15%. On a $35 item with $5 shipping: ($40 &times; 6.5%) + ($40 &times; 3% + $0.25) + $0.20
                = $2.60 + $1.45 + $0.20 = $4.25. The{" "}
                <Link href="/etsy-fee-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  Etsy Fee Calculator
                </Link>{" "}
                does this instantly for any price point.
              </p>
            </section>

          </article>
        </div>
      </main>
    </>
  );
}
