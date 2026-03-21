import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const CANONICAL = "https://gettruemargin.com/etsy-fees-on-20-dollar-sale";

function jsonLd() {
  return JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "What Etsy Takes From a $20 Sale",
      description: "A straightforward breakdown of Etsy fees on a $20 sale. See listing, transaction, and payment processing fees and what you keep.",
      url: CANONICAL,
      isPartOf: { "@type": "WebSite", name: "TrueMargin", url: "https://gettruemargin.com" },
    },
  ]);
}

export const metadata: Metadata = {
  title: "What Etsy Takes From a $20 Sale - Fee Breakdown",
  description: "See exactly how much Etsy takes from a $20 sale. Listing, transaction, payment processing, and optional Offsite Ads fees explained.",
  alternates: { canonical: CANONICAL },
  openGraph: { type: "article", url: CANONICAL, title: "What Etsy Takes From a $20 Sale", description: "A straightforward breakdown of Etsy fees on a $20 sale.", siteName: "TrueMargin" },
  twitter: { card: "summary_large_image", title: "What Etsy Takes From a $20 Sale", description: "A straightforward breakdown of Etsy fees on a $20 sale." },
};

export default function Page() {
  const listingFee = 0.2;
  const transactionFee = 1.3; // 6.5%
  const processingFee = 0.85; // 3% + $0.25
  const totalFees = 2.35;
  const withOffsiteAds = 4.75;
  const keepBeforeCosts = 17.65;
  const keepWithOffsite = 15.25;

  return (
    <>
      <Script id="tm-etsy-fees-20-jsonld" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
      <main className="bg-[#F7F8FA] py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <article className="rounded-2xl bg-white p-6 text-slate-800 shadow-sm ring-1 ring-slate-200 sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#2F3A56] sm:text-4xl">What Etsy Takes From a $20 Sale</h1>
            <p className="mt-5 text-base leading-7">When you sell something for $20, Etsy applies listing, transaction, and payment processing fees. This page shows a realistic fee breakdown and how much you keep before your own costs.</p>
            <p className="mt-3 text-base leading-7">At this price, fee dollars are still modest, but they add up across many orders. Knowing the numbers helps you set prices that protect margin.</p>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Fee breakdown for a $20 order</h2>
              <p className="leading-7">
                Listing fee: ${listingFee.toFixed(2)}
                <br />
                Transaction fee (6.5%): ${transactionFee.toFixed(2)}
                <br />
                Payment processing (3% + $0.25): ${processingFee.toFixed(2)}
              </p>
              <p className="leading-7">
                <strong>Estimated total fees before Offsite Ads: ${totalFees.toFixed(2)}</strong>
              </p>
              <p className="leading-7">If Offsite Ads applies, total fees can rise to roughly <strong>${withOffsiteAds.toFixed(2)}</strong>, depending on order details and region.</p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Net earnings before costs</h2>
              <p className="leading-7">After baseline Etsy fees, take-home before product and shipping costs is about <strong>${keepBeforeCosts.toFixed(2)}</strong>. With Offsite Ads, that drops to around <strong>${keepWithOffsite.toFixed(2)}</strong>.</p>
              <p className="leading-7">Example: $8 cost of goods and $4 shipping leaves roughly $5.65 in real profit. Use a calculator to plug in your actual numbers.</p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">What affects your profit</h2>
              <p className="leading-7">Shipping charged to the buyer is often subject to fees. Payment processing rates vary by region. Offsite Ads add 12% when they drive the sale. Your cost of goods, packaging, and shipping costs determine what’s left over.</p>
              <p className="leading-7">Compare with <Link href="/etsy-fees-on-10-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">Etsy fees on a $10 sale</Link>, <Link href="/etsy-fees-on-50-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">Etsy fees on a $50 sale</Link>, or <Link href="/etsy-fees-on-100-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">Etsy fees on a $100 sale</Link> to see how fees scale.</p>
            </section>

            <section className="mt-8 rounded-xl border border-[#F4A261]/35 bg-[#F4A261]/10 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#2F3A56]">Use tools to turn this estimate into exact pricing decisions</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link href="/etsy-fee-calculator" className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50">
                  Etsy Fee Calculator<span className="mt-1 block text-xs font-normal text-slate-600">Get an exact fee estimate for your order.</span>
                </Link>
                <Link href="/etsy-profit-calculator" className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50">
                  Etsy Profit Calculator<span className="mt-1 block text-xs font-normal text-slate-600">See what you keep after fees and costs.</span>
                </Link>
                <Link href="/etsy-break-even-calculator" className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50">
                  Etsy Break-even Calculator<span className="mt-1 block text-xs font-normal text-slate-600">Find your minimum safe price per unit.</span>
                </Link>
                <Link href="/etsy-fees-on-25-dollar-sale" className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50">
                  Etsy Fees on a $25 Sale<span className="mt-1 block text-xs font-normal text-slate-600">See fee impact at $25.</span>
                </Link>
              </div>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
