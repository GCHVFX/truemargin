import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://gettruemargin.com/etsy-fees-on-150-dollar-sale";

function jsonLd() {
  return JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "Etsy Fees on a $150 Sale (Full Breakdown)",
      description: "What Etsy takes from a $150 sale. Listing, transaction, payment processing, Offsite Ads. See take-home before product and shipping costs.",
      url: CANONICAL,
      isPartOf: { "@type": "WebSite", name: "TrueMargin", url: "https://gettruemargin.com" },
    },
  ]);
}

export const metadata: Metadata = {
  title: "Etsy Fees on a $150 Sale (Full Breakdown)",
  description: "What Etsy takes from a $150 sale. Listing, transaction, payment processing, Offsite Ads. See take-home before product and shipping costs.",
  alternates: { canonical: CANONICAL },
  openGraph: { type: "article", url: CANONICAL, title: "Etsy Fees on a $150 Sale (Full Breakdown)", description: "What Etsy takes from a $150 sale.", siteName: "TrueMargin" },
  twitter: { card: "summary_large_image", title: "Etsy Fees on a $150 Sale", description: "What Etsy takes from a $150 sale." },
};

export default function Page() {
  const listingFee = 0.2;
  const transactionFee = 9.75; // 6.5%
  const processingFee = 4.75; // 3% + $0.25
  const totalFees = 14.7;
  const withOffsiteAds = 32.7;
  const keepBeforeCosts = 135.3;
  const keepWithOffsite = 117.3;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
      <main className="calculator-page-bg min-h-screen py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 text-[#EAF0FF] sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#EAF0FF] sm:text-4xl">Etsy Fees on a $150 Sale (Full Breakdown)</h1>
            <p className="mt-5 text-base leading-7 text-[#9AA6BF]">A $150 sale generates listing, transaction, and payment processing fees. This breakdown shows how much Etsy takes and what you keep before product and shipping costs.</p>
            <p className="mt-3 text-base leading-7 text-[#9AA6BF]">On higher-ticket orders, fee dollars can become substantial. Even when payout is large, real profit can be thinner than expected after fees, shipping, ad fees, and product costs.</p>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Fee breakdown for a $150 order</h2>
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
              <p className="leading-7 text-[#9AA6BF]">With Offsite Ads, total fees can reach about <strong>${withOffsiteAds.toFixed(2)}</strong>, depending on your region and order details.</p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Take-home profit example</h2>
              <p className="leading-7 text-[#9AA6BF]">Before your costs, you keep roughly <strong>${keepBeforeCosts.toFixed(2)}</strong> after baseline Etsy fees. With Offsite Ads, that falls to around <strong>${keepWithOffsite.toFixed(2)}</strong>.</p>
              <p className="leading-7 text-[#9AA6BF]">If cost of goods is $60 and shipping $12, real profit before ads is about $63.30. A calculator helps you model different COGS and shipping scenarios for high-ticket items.</p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">What affects your profit</h2>
              <p className="leading-7 text-[#9AA6BF]">Shipping charged to the buyer can be subject to fees. Payment processing rates vary by region. Offsite Ads add 12% when they drive the sale. Product costs, packaging, and your shipping cost determine final net earnings.</p>
              <p className="leading-7 text-[#9AA6BF]">Compare at other price points: <Link href="/etsy-fees-on-75-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">Etsy fees on a $75 sale</Link>, <Link href="/etsy-fees-on-100-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">Etsy fees on a $100 sale</Link>, or <Link href="/etsy-fees-on-250-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">Etsy fees on a $250 sale</Link>.</p>
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
                <Link href="/etsy-fees-on-500-dollar-sale" className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10">
                  Etsy Fees on a $500 Sale<span className="mt-1 block text-xs font-normal text-[#9AA6BF]">See fee impact at $500.</span>
                </Link>
              </div>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
