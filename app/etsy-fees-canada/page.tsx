import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://gettruemargin.com/etsy-fees-canada";

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "Etsy Fees for Canadian Sellers",
      description:
        "A complete breakdown of Etsy fees for Canadian sellers in 2026: listing fees, transaction fees, payment processing in CAD, and offsite ads. See exactly what Etsy takes from every sale.",
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
          name: "How much does Etsy charge Canadian sellers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Canadian Etsy sellers pay a $0.20 USD listing fee (converted to CAD at time of charge), a 6.5% transaction fee on the full sale price including shipping charged, and payment processing of 3% + $0.25 CAD per order. Offsite ads add 15% when a sale comes through an Etsy ad, dropping to 12% above $10,000 CAD in annual sales.",
          },
        },
        {
          "@type": "Question",
          name: "Does Etsy charge fees on shipping in Canada?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Etsy's 6.5% transaction fee applies to the total sale amount including any shipping charged to the buyer. If you charge $8 CAD shipping, Etsy takes 6.5% of that too. Payment processing fees also apply to the full order total including shipping.",
          },
        },
        {
          "@type": "Question",
          name: "Do Canadian Etsy sellers pay offsite ads fees on every sale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. The offsite ads fee only applies when Etsy attributes the sale to an offsite ad click. However, once your shop exceeds $10,000 CAD in annual sales, participation becomes mandatory and you cannot opt out. The fee is 15% under that threshold and 12% above it.",
          },
        },
        {
          "@type": "Question",
          name: "How do I calculate Etsy fees in Canada?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Add the listing fee (approx $0.27 CAD), 6.5% of total sale price including shipping, and 3% + $0.25 CAD for payment processing. If offsite ads apply, add 15%. On a $45 CAD sale with $8 CAD shipping, total fees come to roughly $5.11 CAD before offsite ads.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Etsy Fees for Canadian Sellers (2026 Breakdown) | TrueMargin";
  const description =
    "A complete breakdown of Etsy fees for Canadian sellers: listing fees, transaction fees, payment processing in CAD, and offsite ads. See exactly what Etsy takes from every sale.";

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
              Etsy Fees for Canadian Sellers (2026)
            </h1>
            <p className="mt-5 text-base leading-7 text-[#9AA6BF]">
              Canadian Etsy sellers pay four main fees on every sale: a listing fee (~$0.27 CAD), a 6.5% transaction fee,
              payment processing of 3% + $0.25 CAD, and a 15% offsite ads fee when applicable. On a typical $45 CAD sale
              with $8 CAD shipping, that is roughly $5.11 CAD out of your pocket before your own costs.
            </p>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#9AA6BF]">See the exact fee breakdown for your Canadian sale</p>
              <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                Enter your price, costs, and shipping into the free Etsy Fee Calculator and see every fee itemised in CAD.
              </p>
              <Link
                href="/etsy-fee-calculator"
                className="mt-4 inline-flex items-center rounded-md bg-[#2F3A56] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Try the Etsy Fee Calculator
              </Link>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Every Etsy Fee Canadian Sellers Pay</h2>

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
                      <td className="px-4 py-3">$0.20 USD (~$0.27 CAD)</td>
                      <td className="px-4 py-3">Per listing published or auto-renewed</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-[#EAF0FF]">Transaction fee</td>
                      <td className="px-4 py-3">6.5%</td>
                      <td className="px-4 py-3">Full sale price including shipping charged to buyer</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-[#EAF0FF]">Payment processing</td>
                      <td className="px-4 py-3">3% + $0.25 CAD</td>
                      <td className="px-4 py-3">Total order value including shipping</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-medium text-[#EAF0FF]">Offsite ads</td>
                      <td className="px-4 py-3">15% (12% over $10K CAD/yr)</td>
                      <td className="px-4 py-3">Sales attributed to an Etsy offsite ad only</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="leading-7 text-[#9AA6BF]">
                The listing fee is charged in USD and converted to CAD at the exchange rate at the time of charge.
                The exact CAD amount varies slightly with the exchange rate, but budgeting ~$0.27 CAD per listing is a
                reasonable estimate. The listing fee also applies again when a sold listing auto-renews.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Worked Example: Fees on a $45 CAD Sale</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Item price $45 CAD, $8 CAD shipping charged to buyer, no offsite ads.
              </p>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6 space-y-3">
                <p className="font-semibold text-[#EAF0FF]">Fee breakdown (CAD)</p>
                <div className="space-y-1 text-sm text-[#9AA6BF]">
                  <div className="flex justify-between">
                    <span>Transaction fee (6.5% of $45 + $8)</span>
                    <span>$3.45</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Payment processing (3% of $53 + $0.25)</span>
                    <span>$1.84</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Listing fee (~$0.27 CAD)</span>
                    <span>$0.27</span>
                  </div>
                  <div className="flex justify-between border-t border-white/10 pt-2 font-semibold text-[#EAF0FF]">
                    <span>Total Etsy fees</span>
                    <span>$5.56 CAD</span>
                  </div>
                </div>
                <p className="text-xs text-[#9AA6BF] pt-1">
                  Etsy keeps $5.56 CAD of your $45 sale, 12.4% of item revenue, before your own costs.
                </p>
              </div>

              <p className="leading-7 text-[#9AA6BF]">
                Add a $14 CAD cost of goods and you keep $25.44 CAD, a 56.5% margin. Healthy. But price the same
                item at $25 CAD and fees drop to ~$3.32, leaving just $7.68, a 30.7% margin that barely holds up
                against a refund or an offsite ad sale.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">What Happens When Offsite Ads Apply</h2>
              <p className="leading-7 text-[#9AA6BF]">
                If a buyer clicked an Etsy offsite ad before purchasing, Etsy charges an additional 15% on the full sale
                price. On the $45 CAD example above, that is an extra $6.75 CAD, more than the combined total of
                all other fees. Your profit drops from $25.44 to $18.69 and margin falls from 56.5% to 41.5%.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                Canadian sellers under $10,000 CAD in annual sales can opt out of offsite ads. Once you exceed that
                threshold enrollment is mandatory, though the fee drops to 12%. Price with this in mind now. Building margin before you hit the threshold is far easier than repricing your entire shop after.
                Use the{" "}
                <Link href="/etsy-offsite-ads-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  Etsy Offsite Ads Calculator
                </Link>{" "}
                to see how ads affect your margin at any price point.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                Etsy's attribution window is 30 days. If a buyer clicked an offsite ad at any point in the 30 days
                before purchasing, the fee applies. This includes accidental clicks and clicks on a different device.
                A buyer who tapped a Google Shopping result on their phone and returned to buy directly a week later
                still triggers the fee. One click resets the 30-day window. There is no appeal process.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Canada-Specific Fee Details to Know</h2>
              <p className="leading-7 text-[#9AA6BF]">
                <span className="font-semibold text-[#EAF0FF]">Transaction fee applies to shipping charged.</span>{" "}
                Etsy's 6.5% transaction fee is calculated on the full order including any shipping you charge the buyer.
                If you charge $10 CAD shipping on a $30 item, the transaction fee applies to $40, adding $0.65
                that many sellers miss.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <span className="font-semibold text-[#EAF0FF]">Currency conversion if selling in USD.</span>{" "}
                If your Etsy shop is set to list in USD but you are based in Canada, Etsy charges a 2.5% currency
                conversion fee when depositing funds to your CAD bank account. This adds another layer of cost that
                does not appear in the standard fee breakdown.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <span className="font-semibold text-[#EAF0FF]">GST/HST on Etsy fees.</span>{" "}
                Etsy charges GST or HST on seller fees for Canadian accounts. This is a tax on the fees themselves,
                not the sale price. The rate depends on your province. Factor this into your cost model when calculating
                true net profit.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">What Margin Should Canadian Etsy Sellers Target?</h2>
              <p className="leading-7 text-[#9AA6BF]">
                After all fees and your own costs, aim for at least 30% in CAD. The fee structure is nearly identical to
                the US, so the same margin targets apply:
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
                    <tr><td className="px-4 py-3">15&ndash;29%</td><td className="px-4 py-3 text-amber-400">OK</td><td className="px-4 py-3">Workable but fragile . No room for promotions or ads</td></tr>
                    <tr><td className="px-4 py-3">30&ndash;49%</td><td className="px-4 py-3 text-teal-400">Good</td><td className="px-4 py-3">Sustainable . Can absorb fee changes and occasional ads</td></tr>
                    <tr><td className="px-4 py-3">50%+</td><td className="px-4 py-3 text-emerald-400">Strong</td><td className="px-4 py-3">Pricing power . Room to scale with ads or run promotions</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#9AA6BF]">Know your real profit before you list</p>
              <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                Run your Canadian sale through the Etsy Profit Calculator. See exact fees in CAD, net profit, and margin
                health, free, no account needed.
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
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Etsy Fees at Common Canadian Sale Prices</h2>
              <p className="leading-7 text-[#9AA6BF]">See exactly what Etsy takes at price points common for Canadian sellers:</p>
              <div className="flex flex-wrap gap-2 text-sm">
                {[
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

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">FAQ</h2>

              <h3 className="text-lg font-semibold text-[#EAF0FF]">How much does Etsy charge Canadian sellers?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                Canadian sellers pay ~$0.27 CAD listing fee, 6.5% transaction fee on the full sale price including
                shipping charged, and 3% + $0.25 CAD payment processing per order. On a $45 CAD sale with $8 CAD
                shipping, that is $5.56 CAD in fees. Offsite ads add 15% on qualifying sales. GST/HST also applies
                to the fees themselves depending on your province.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Does Etsy charge fees on shipping in Canada?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                Yes. The 6.5% transaction fee and payment processing both apply to the total order value including
                any shipping charged to the buyer. Charging $10 CAD shipping on a $30 item means fees are calculated
                on $40 total, not just the item price. This catches a lot of Canadian sellers off guard.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Do Canadian Etsy sellers pay offsite ads fees on every sale?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                No, only on sales Etsy attributes to an offsite ad click. But once your shop exceeds $10,000 CAD
                in annual sales, offsite ads enrollment is mandatory. The fee is 15% below that threshold and 12% above
                it. You cannot opt out once enrolled.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">How do I calculate Etsy fees in Canada?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                Add ~$0.27 CAD listing fee, 6.5% of total order value including shipping, and 3% + $0.25 CAD
                processing. If offsite ads apply, add 15%. On a $45 item with $8 CAD shipping:
                ($53 &times; 6.5%) + ($53 &times; 3% + $0.25) + $0.27 = $3.45 + $1.84 + $0.27 = $5.56 CAD.
                The{" "}
                <Link href="/etsy-fee-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  Etsy Fee Calculator
                </Link>{" "}
                handles this automatically with CAD support built in.
              </p>
            </section>

          </article>
        </div>
      </main>
    </>
  );
}
