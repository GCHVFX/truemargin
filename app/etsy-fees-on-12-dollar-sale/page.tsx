import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://gettruemargin.com/etsy-fees-on-12-dollar-sale";

function jsonLd() {
  return JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "What Etsy Takes From a $12 Sale",
      description: "Breakdown of Etsy fees on a $12 sale. Listing, transaction, payment processing. See take-home before product and shipping costs.",
      url: CANONICAL,
      isPartOf: { "@type": "WebSite", name: "TrueMargin", url: "https://gettruemargin.com" },
    },
  ]);
}

export const metadata: Metadata = {
  title: "What Etsy Takes From a $12 Sale - Fee Breakdown",
  description: "Breakdown of Etsy fees on a $12 sale. Listing, transaction, payment processing. See what you keep before product and shipping costs.",
  alternates: { canonical: CANONICAL },
  openGraph: { type: "article", url: CANONICAL, title: "What Etsy Takes From a $12 Sale", description: "Breakdown of Etsy fees on a $12 sale.", siteName: "TrueMargin" },
  twitter: { card: "summary_large_image", title: "What Etsy Takes From a $12 Sale", description: "Breakdown of Etsy fees on a $12 sale." },
};

export default function Page() {
  const listingFee = 0.2;
  const transactionFee = 0.78;
  const processingFee = 0.61;
  const totalFees = 1.59;
  const withOffsiteAds = 3.03;
  const keepBeforeCosts = 10.41;
  const keepWithOffsite = 8.97;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
      <main className="calculator-page-bg min-h-screen py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 text-[#EAF0FF] sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#EAF0FF] sm:text-4xl">What Etsy Takes From a $12 Sale</h1>
            <p className="mt-5 text-base leading-7 text-[#9AA6BF]">Selling for $12 means Etsy applies listing, transaction, and payment processing fees. This page shows the fee breakdown and your net earnings before product and shipping costs.</p>
            <p className="mt-3 text-base leading-7 text-[#9AA6BF]">At low price points, fixed fees eat a larger share of the sale. Margin tightens quickly once you add cost of goods and shipping.</p>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Fee breakdown for a $12 order</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Listing fee: ${listingFee.toFixed(2)}
                <br />
                Transaction fee (6.5%): ${transactionFee.toFixed(2)}
                <br />
                Payment processing (3% + $0.25): ${processingFee.toFixed(2)}
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Estimated total fees before Offsite Ads: ${totalFees.toFixed(2)}</strong>
              </p>
              <p className="leading-7 text-[#9AA6BF]">With Offsite Ads, fees can reach about <strong>${withOffsiteAds.toFixed(2)}</strong>, depending on region and order details.</p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Take-home profit example</h2>
              <p className="leading-7 text-[#9AA6BF]">Before your costs, you keep roughly <strong>${keepBeforeCosts.toFixed(2)}</strong> after baseline Etsy fees. With Offsite Ads, that drops to about <strong>${keepWithOffsite.toFixed(2)}</strong>.</p>
              <p className="leading-7 text-[#9AA6BF]">Example: $4 cost of goods and $2 shipping leaves around $4.41 in real profit before ads. Use a calculator to model your own numbers.</p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">What affects your profit</h2>
              <p className="leading-7 text-[#9AA6BF]">Shipping charged to the buyer may be subject to fees. Payment processing varies by region. Offsite Ads add 12% when they drive the sale. Product costs and shipping eat into the remainder.</p>
              <p className="leading-7 text-[#9AA6BF]">Compare: <Link href="/etsy-fees-on-10-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">Etsy fees on a $10 sale</Link>, <Link href="/etsy-fees-on-15-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">what Etsy takes from a $15 sale</Link>, or <Link href="/etsy-fees-on-20-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">Etsy fee breakdown for a $20 item</Link>.</p>
            </section>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#9AA6BF]">Use tools to turn this estimate into exact pricing decisions</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link href="/etsy-fee-calculator" className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10">
                  Etsy Fee Calculator<span className="mt-1 block text-xs font-normal text-[#9AA6BF]">Get an exact fee estimate for your order.</span>
                </Link>
                <Link href="/etsy-profit-calculator" className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10">
                  Etsy Profit Calculator<span className="mt-1 block text-xs font-normal text-[#9AA6BF]">See what you keep after fees and costs.</span>
                </Link>
                <Link href="/etsy-break-even-calculator" className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10">
                  Etsy Break-even Calculator<span className="mt-1 block text-xs font-normal text-[#9AA6BF]">Find your minimum safe price per unit.</span>
                </Link>
                <Link href="/etsy-fees-explained" className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10">
                  Etsy Fees Explained<span className="mt-1 block text-xs font-normal text-[#9AA6BF]">Full guide to listing, transaction, and processing fees.</span>
                </Link>
                <Link href="/etsy-fees-on-25-dollar-sale" className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10">
                  Etsy Fees on a $25 Sale<span className="mt-1 block text-xs font-normal text-[#9AA6BF]">See fee impact at $25.</span>
                </Link>
              </div>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
