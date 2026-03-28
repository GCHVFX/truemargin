import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://gettruemargin.com/etsy-profit-margin";

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "What Is a Good Profit Margin on Etsy?",
      description:
        "Learn what a healthy Etsy profit margin looks like, how fees affect your margins, and how to calculate your real profit with TrueMargin.",
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
          name: "What is a healthy profit margin on Etsy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A good Etsy profit margin is 30-50% after all fees and costs. Below 30% is fragile — one refund, one offsite ad sale, or a shipping price increase can wipe your profit. Strong sellers typically run 40-55% on core products. Below 15% is risky and usually means you are underpricing.",
          },
        },
        {
          "@type": "Question",
          name: "Is 20% profit margin enough on Etsy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "20% is tight and often not enough. At 20% margin, a single offsite ad sale (which adds a 15% fee) can make that order unprofitable. Unexpected costs, refunds, or small fee increases quickly erode what little buffer you have. Aim for 30% minimum, 40%+ if you plan to run ads.",
          },
        },
        {
          "@type": "Question",
          name: "Do Etsy fees reduce profit margin a lot?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, significantly. On a $30 sale, Etsy takes roughly $3.30 in stacked fees before you account for your own costs — that is transaction fee, payment processing, and listing fee. Add offsite ads and it climbs to $7.80. Sellers who do not calculate this explicitly are almost always earning less than they think.",
          },
        },
        {
          "@type": "Question",
          name: "How do I calculate Etsy profit margin?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Subtract total fees and costs from revenue to get profit, then divide profit by revenue and multiply by 100. For example: $30 sale minus $10 cost minus $3.30 fees equals $16.70 profit. Divide $16.70 by $30 and multiply by 100 for a 55.7% margin. Use the TrueMargin Etsy Profit Calculator to do this instantly.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "What Is a Good Profit Margin on Etsy? | TrueMargin";
  const description =
    "Learn what a healthy Etsy profit margin looks like, how fees affect your margins, and how to calculate your real profit with TrueMargin.";

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
              What Is a Good Profit Margin on Etsy?
            </h1>
            <p className="mt-5 text-base leading-7 text-[#9AA6BF]">
              A good Etsy profit margin is 30&ndash;50% after all fees. Below 30% is fragile. Below 15% is risky.
              If you do not know your margin after fees, you are guessing &mdash; and most sellers guess wrong.
            </p>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#9AA6BF]">Want to know your real Etsy profit margin?</p>
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
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">The Only Margins That Actually Matter</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Most sellers think about profit in dollars. You should think about it as a percentage of revenue &mdash; because
                that is what determines whether your business survives fee changes, slow months, and ad costs.
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
                    <tr><td className="px-4 py-3">&lt;15%</td><td className="px-4 py-3 text-rose-400">Low</td><td className="px-4 py-3">Likely underpriced or losing money after hidden costs</td></tr>
                    <tr><td className="px-4 py-3">15&ndash;29%</td><td className="px-4 py-3 text-amber-400">OK</td><td className="px-4 py-3">Tight, vulnerable to fee changes and ad costs</td></tr>
                    <tr><td className="px-4 py-3">30&ndash;49%</td><td className="px-4 py-3 text-teal-400">Good</td><td className="px-4 py-3">Sustainable and scalable &mdash; room to absorb change</td></tr>
                    <tr><td className="px-4 py-3">50%+</td><td className="px-4 py-3 text-emerald-400">Strong</td><td className="px-4 py-3">You control your pricing &mdash; room to run ads or discount</td></tr>
                  </tbody>
                </table>
              </div>

              <p className="leading-7 text-[#9AA6BF]">
                Your goal is 30% minimum, ideally 40&ndash;50%+. Anything lower and small changes &mdash; offsite ads, a discount,
                a shipping cost increase &mdash; wipe out your profit entirely.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Worked Example: Real Fee Math on a $30 Sale</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Let us run the actual numbers. Product price $30, cost to make $10, shipping charged separately.
              </p>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6 space-y-3">
                <p className="font-semibold text-[#EAF0FF]">Etsy fees breakdown</p>
                <div className="space-y-1 text-sm text-[#9AA6BF]">
                  <div className="flex justify-between"><span>Transaction fee (6.5%)</span><span>$1.95</span></div>
                  <div className="flex justify-between"><span>Payment processing (~3% + $0.25)</span><span>$1.15</span></div>
                  <div className="flex justify-between"><span>Listing fee</span><span>$0.20</span></div>
                  <div className="flex justify-between border-t border-white/10 pt-2 font-semibold text-[#EAF0FF]"><span>Total fees</span><span>$3.30</span></div>
                </div>
                <div className="space-y-1 text-sm text-[#9AA6BF] border-t border-white/10 pt-3">
                  <div className="flex justify-between"><span>Revenue</span><span>$30.00</span></div>
                  <div className="flex justify-between"><span>Cost of goods</span><span>&minus;$10.00</span></div>
                  <div className="flex justify-between"><span>Fees</span><span>&minus;$3.30</span></div>
                  <div className="flex justify-between font-semibold text-emerald-400 border-t border-white/10 pt-2"><span>Profit</span><span>$16.70 &mdash; 55.7% (Strong)</span></div>
                </div>
              </div>

              <p className="leading-7 text-[#9AA6BF]">
                Now price the same product at $20. Fees drop to ~$2.45, but profit collapses to $7.55 &mdash; a 37.7% margin.
                You dropped the price by $10 but lost over 50% of your profit. That is the mistake most Etsy sellers make
                when they undercut competitors without running the numbers first.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">What Kills Your Margin (That You Are Probably Ignoring)</h2>

              <p className="leading-7 text-[#9AA6BF]">
                <span className="font-semibold text-[#EAF0FF]">Offsite ads (15% fee).</span>{" "}
                One sale through an Etsy offsite ad adds a 15% fee on top of everything else. On the $30 example above,
                that is an extra $4.50 &mdash; dropping profit from $16.70 to $12.20 and margin from 55.7% to 40.6%.
                If your base margin was 25%, that same sale is now barely breaking even. Once you hit $10K/year in sales,
                this fee is mandatory.
              </p>

              <p className="leading-7 text-[#9AA6BF]">
                <span className="font-semibold text-[#EAF0FF]">Shipping included in the transaction fee base.</span>{" "}
                Etsy charges its 6.5% transaction fee on any shipping you charge the buyer. If you charge $5 shipping,
                Etsy takes $0.33 of that too. Sellers who do not account for this consistently underestimate total fees.
              </p>

              <p className="leading-7 text-[#9AA6BF]">
                <span className="font-semibold text-[#EAF0FF]">Underestimating real costs.</span>{" "}
                Time, packaging, failed products, and platform subscriptions all count. Sellers who only track materials
                often discover their real margin is 10&ndash;15 points lower than they thought.
              </p>
            </section>

            <section className="mt-12 space-y-6">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Margin by Product Type</h2>
              <p className="leading-7 text-[#9AA6BF]">Different Etsy categories have very different margin profiles in practice.</p>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-[#EAF0FF]">Handmade (e.g. candles)</h3>
                <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                  Real material and time costs mean margins erode quickly. On a $24 candle with $9 in costs, after ~$2.90 in
                  fees you keep ~$12.10 &mdash; about 50%. That is healthy. But most handmade sellers sit at 20&ndash;30%
                  because they price based on what competitors charge rather than what their own costs require.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-[#EAF0FF]">Digital products (e.g. printables)</h3>
                <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                  Near-zero marginal cost means fees are almost the only deduction. An $8 digital product with $0.50 in
                  platform costs and ~$1.00 in Etsy fees leaves ~$6.50 &mdash; 81% margin. The trap is pricing too low.
                  Doubling from $5 to $10 often doubles profit with minimal drop in demand, because the cost structure stays
                  nearly flat.
                </p>
              </div>

              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="font-semibold text-[#EAF0FF]">Vintage items</h3>
                <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                  Higher perceived value gives more pricing flexibility, but sellers often ignore sourcing time as a real cost.
                  On a $45 item sourced for $18, after ~$4.10 in fees you keep ~$22.90 &mdash; 51%. That looks strong,
                  but factor in the hours spent finding, cleaning, and photographing the item and real margins compress fast.
                </p>
              </div>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">The Simple Rule Most Sellers Miss</h2>
              <p className="leading-7 text-[#9AA6BF]">
                You do not control Etsy fees. You only control your price. So the only lever you have is pricing high enough
                that after fees and costs, your margin is where it needs to be.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                The process is: pick a target margin (40%+), add all Etsy fees, subtract real costs, then adjust your price
                until the margin works. If the resulting price feels too high, that usually means your previous pricing was
                wrong &mdash; not that the market will not bear it.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                Use the{" "}
                <Link href="/etsy-pricing-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  Etsy Pricing Calculator
                </Link>{" "}
                to reverse-engineer the price you need to hit your target margin.
              </p>
            </section>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#9AA6BF]">Check your margin before your next listing</p>
              <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                Run your numbers through the Etsy Profit Calculator. See exact profit, margin health, and full fee breakdown &mdash;
                free, no account needed.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/etsy-profit-calculator"
                  className="inline-flex items-center rounded-md bg-[#2F3A56] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                >
                  Calculate My Margin
                </Link>
                <Link
                  href="/etsy-pricing-calculator"
                  className="inline-flex items-center rounded-md border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Find My Target Price
                </Link>
              </div>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Related: Etsy Fees by Sale Price</h2>
              <p className="leading-7 text-[#9AA6BF]">See exactly what Etsy takes at common price points:</p>
              <div className="flex flex-wrap gap-2 text-sm">
                {[
                  { label: "Fees on a $20 sale", href: "/etsy-fees-on-20-dollar-sale" },
                  { label: "Fees on a $30 sale", href: "/etsy-fees-on-30-dollar-sale" },
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

              <h3 className="text-lg font-semibold text-[#EAF0FF]">What is a healthy profit margin on Etsy?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                30&ndash;50% after all fees and costs is the target range for most Etsy sellers. Below 30% leaves little buffer
                for ads, refunds, or fee changes. Strong sellers run 40&ndash;55% on their core products, which gives them
                room to run promotions or absorb the mandatory offsite ads fee without going unprofitable.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Is 20% profit margin enough on Etsy?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                Rarely. At 20%, a single offsite ad sale (15% additional fee) makes that order nearly unprofitable. One refund,
                one shipping cost increase, or one slow promotional period can tip you into a loss. It can work for very high
                volume digital products, but for most sellers 20% is a warning sign that pricing needs adjustment.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Do Etsy fees reduce profit margin a lot?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                Yes. On a $30 sale, stacked fees total roughly $3.30 before your own costs &mdash; that is over 11% of revenue
                gone immediately. Add offsite ads and it reaches $7.80, or 26% of the sale price. Sellers who do not calculate
                this explicitly are almost always earning significantly less than they expect. Use the{" "}
                <Link href="/etsy-fee-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  Etsy Fee Calculator
                </Link>{" "}
                to see the full picture.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">How do I calculate Etsy profit margin?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                Subtract total fees and costs from revenue to get profit, then divide profit by revenue and multiply by 100.
                Example: $30 revenue minus $10 cost minus $3.30 fees equals $16.70 profit. Divide by $30 and multiply by 100
                for 55.7% margin. The{" "}
                <Link href="/etsy-profit-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  Etsy Profit Calculator
                </Link>{" "}
                does this instantly with the full fee breakdown included.
              </p>
            </section>

          </article>
        </div>
      </main>
    </>
  );
}
