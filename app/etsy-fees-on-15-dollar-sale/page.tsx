import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://gettruemargin.com/etsy-fees-on-15-dollar-sale";

function jsonLd() {
  return JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "Etsy Fees on a $15 Sale (Full Breakdown)",
      description: "See exactly how much Etsy takes from a $15 sale including listing, transaction and payment fees. Know what you keep before costs.",
      url: CANONICAL,
      isPartOf: { "@type": "WebSite", name: "TrueMargin", url: "https://gettruemargin.com" },
    },
  ]);
}

export const metadata: Metadata = {
  title: "Etsy Fees on a $15 Sale (Full Breakdown)",
  description: "See exactly how much Etsy takes from a $15 sale. Listing, transaction, payment processing fees plus what you keep before product costs.",
  alternates: { canonical: CANONICAL },
  openGraph: { type: "article", url: CANONICAL, title: "Etsy Fees on a $15 Sale (Full Breakdown)", description: "See exactly how much Etsy takes from a $15 sale.", siteName: "TrueMargin" },
  twitter: { card: "summary_large_image", title: "Etsy Fees on a $15 Sale (Full Breakdown)", description: "See exactly how much Etsy takes from a $15 sale." },
};

export default function Page() {
  const listingFee = 0.2;
  const transactionFee = 0.98; // 6.5%
  const processingFee = 0.7; // 3% + $0.25
  const totalFees = 1.88;
  const withOffsiteAds = 3.68;
  const keepBeforeCosts = 13.12;
  const keepWithOffsite = 11.32;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
      <main className="calculator-page-bg min-h-screen py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 text-[#EAF0FF] sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#EAF0FF] sm:text-4xl">Etsy Fees on a $15 Sale (Full Breakdown)</h1>
            <p className="mt-5 text-base leading-7 text-[#9AA6BF]">A $15 sale triggers listing, transaction, and payment processing fees. Here’s a clear breakdown so you know what goes to Etsy and what you keep before product and shipping costs.</p>
            <p className="mt-3 text-base leading-7 text-[#9AA6BF]">On lower-priced items, fixed fees take a bigger slice of the sale, so your margin can feel tighter than the sticker price suggests.</p>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Fee breakdown for a $15 order</h2>
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
              <p className="leading-7 text-[#9AA6BF]">If the order came from Offsite Ads, fees can add another 12%, bringing the total closer to <strong>${withOffsiteAds.toFixed(2)}</strong>.</p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Real profit example</h2>
              <p className="leading-7 text-[#9AA6BF]">Before product and shipping costs, you might keep around <strong>${keepBeforeCosts.toFixed(2)}</strong> from a $15 sale after baseline Etsy fees. With Offsite Ads, take-home before costs drops to about <strong>${keepWithOffsite.toFixed(2)}</strong>.</p>
              <p className="leading-7 text-[#9AA6BF]">If your cost of goods is $5 and shipping runs $3, real profit shrinks fast. That’s why many sellers use calculators to model different scenarios.</p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">What affects your profit</h2>
              <p className="leading-7 text-[#9AA6BF]">Shipping charged to the buyer can be subject to fees, which changes the math. Your region may have slightly different payment processing rates. Offsite Ads add 12% when they apply. Product costs, packaging, and shipping eat into the remainder.</p>
              <p className="leading-7 text-[#9AA6BF]">For more context on similar price points, see <Link href="/etsy-fees-on-10-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">Etsy fees on a $10 sale</Link> or <Link href="/etsy-fees-on-25-dollar-sale" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">Etsy fees on a $25 sale</Link>.</p>
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
                <Link href="/etsy-fees-on-50-dollar-sale" className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10">
                  Etsy Fees on a $50 Sale<span className="mt-1 block text-xs font-normal text-[#9AA6BF]">Compare fee impact at a higher price point.</span>
                </Link>
              </div>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
