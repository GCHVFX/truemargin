import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://gettruemargin.com/etsy-fees-on-750-dollar-sale";

function jsonLd() {
  return JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "Etsy Fee Breakdown for a $750 Item",
      description: "What Etsy takes from a $750 sale. Listing, transaction, payment processing, Offsite Ads. See take-home before costs.",
      url: CANONICAL,
      isPartOf: { "@type": "WebSite", name: "TrueMargin", url: "https://gettruemargin.com" },
    },
  ]);
}

export const metadata: Metadata = {
  title: "Etsy Fee Breakdown for a $750 Item",
  description: "What Etsy takes from a $750 sale. Listing, transaction, payment processing, Offsite Ads. See take-home before product and shipping costs.",
  alternates: { canonical: CANONICAL },
  openGraph: { type: "article", url: CANONICAL, title: "Etsy Fee Breakdown for a $750 Item", description: "What Etsy takes from a $750 sale.", siteName: "TrueMargin" },
  twitter: { card: "summary_large_image", title: "Etsy Fee Breakdown for a $750 Item", description: "What Etsy takes from a $750 sale." },
};

export default function Page() {
  const listingFee = 0.2;
  const transactionFee = 48.75;
  const processingFee = 22.75;
  const totalFees = 71.7;
  const withOffsiteAds = 161.7;
  const keepBeforeCosts = 678.3;
  const keepWithOffsite = 588.3;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
      <main className="calculator-page-bg min-h-screen py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 text-[#EAF0FF] sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#EAF0FF] sm:text-4xl">Etsy Fee Breakdown for a $750 Item</h1>
            <p className="mt-5 text-base leading-7 text-[#9AA6BF]">When you sell for $750, Etsy applies listing, transaction, and payment processing fees. This page shows the fee breakdown and your payout before product and shipping costs.</p>
            <p className="mt-3 text-base leading-7 text-[#9AA6BF]">On high-ticket orders, fee dollars can exceed $70 before Offsite Ads. Pricing with margin in mind is critical at this level.</p>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Fee breakdown for a $750 order</h2>
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
              <p className="leading-7 text-[#9AA6BF]">With Offsite Ads, total fees can rise to roughly <strong>${withOffsiteAds.toFixed(2)}</strong>, depending on region and order details.</p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Payout after fees example</h2>
              <p className="leading-7 text-[#9AA6BF]">Before your costs, you keep about <strong>${keepBeforeCosts.toFixed(2)}</strong> after baseline Etsy fees. With Offsite Ads, that drops to around <strong>${keepWithOffsite.toFixed(2)}</strong>.</p>
              <p className="leading-7 text-[#9AA6BF]">If cost of goods is $300 and shipping $35, real profit before ads is roughly $343.30. A calculator helps you model different COGS and shipping scenarios for high-value items.</p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">What affects your profit</h2>
              <p className="leading-7 text-[#9AA6BF]">Shipping charged to the buyer may be subject to fees. Payment processing varies by region. Offsite Ads add 12% when they drive the sale. Product costs, packaging, and your shipping cost determine final take-home.</p>
              <p className="leading-7 text-[#9AA6BF]">See <Link href="/etsy-fees-on-500-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">Etsy fees on a $500 sale</Link>, <Link href="/etsy-fees-on-400-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">what you keep from a $400 Etsy sale</Link>, or <Link href="/etsy-fees-on-300-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">Etsy fees on a $300 sale</Link>.</p>
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
                <Link href="/etsy-fees-on-200-dollar-sale" className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10">
                  Etsy Fees on a $200 Sale<span className="mt-1 block text-xs font-normal text-[#9AA6BF]">Compare at lower price.</span>
                </Link>
                <Link href="/etsy-fees-on-250-dollar-sale" className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10">
                  Etsy Fees on a $250 Sale<span className="mt-1 block text-xs font-normal text-[#9AA6BF]">See fee impact at $250.</span>
                </Link>
              </div>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
