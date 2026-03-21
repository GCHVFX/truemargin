import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const CANONICAL = "https://gettruemargin.com/etsy-fees-on-18-dollar-sale";

function jsonLd() {
  return JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "Etsy Fees on an $18 Sale (Full Breakdown)",
      description: "See how much Etsy takes from an $18 sale. Listing, transaction, payment processing. Know your payout after fees.",
      url: CANONICAL,
      isPartOf: { "@type": "WebSite", name: "TrueMargin", url: "https://gettruemargin.com" },
    },
  ]);
}

export const metadata: Metadata = {
  title: "Etsy Fees on an $18 Sale (Full Breakdown)",
  description: "See how much Etsy takes from an $18 sale. Listing, transaction, payment processing fees. Know your payout after fees before costs.",
  alternates: { canonical: CANONICAL },
  openGraph: { type: "article", url: CANONICAL, title: "Etsy Fees on an $18 Sale", description: "See how much Etsy takes from an $18 sale.", siteName: "TrueMargin" },
  twitter: { card: "summary_large_image", title: "Etsy Fees on an $18 Sale", description: "See how much Etsy takes from an $18 sale." },
};

export default function Page() {
  const listingFee = 0.2;
  const transactionFee = 1.17;
  const processingFee = 0.79;
  const totalFees = 2.16;
  const withOffsiteAds = 4.32;
  const keepBeforeCosts = 15.84;
  const keepWithOffsite = 13.68;

  return (
    <>
      <Script id="tm-etsy-fees-18-jsonld" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
      <main className="bg-[#F7F8FA] py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <article className="rounded-2xl bg-white p-6 text-slate-800 shadow-sm ring-1 ring-slate-200 sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#2F3A56] sm:text-4xl">Etsy Fees on an $18 Sale (Full Breakdown)</h1>
            <p className="mt-5 text-base leading-7">An $18 sale triggers listing, transaction, and payment processing fees. Here’s what goes to Etsy and what you keep before product and shipping costs.</p>
            <p className="mt-3 text-base leading-7">On items in this range, fixed fees still take a meaningful percentage. Margin clarity helps you avoid underpricing.</p>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Fee breakdown for an $18 order</h2>
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
              <p className="leading-7">If Offsite Ads applies, total fees can rise to roughly <strong>${withOffsiteAds.toFixed(2)}</strong>.</p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Net earnings example</h2>
              <p className="leading-7">Before your costs, payout after baseline fees is about <strong>${keepBeforeCosts.toFixed(2)}</strong>. With Offsite Ads, that falls to around <strong>${keepWithOffsite.toFixed(2)}</strong>.</p>
              <p className="leading-7">If cost of goods is $6 and shipping $3, real profit is roughly $6.84 before ads. Calculators help you test different COGS and shipping setups.</p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">What affects your profit</h2>
              <p className="leading-7">Fees may apply to shipping charged. Regional payment rates differ. Offsite Ads add 12% when they drive the order. Product costs, packaging, and your shipping cost determine final take-home.</p>
              <p className="leading-7">See <Link href="/etsy-fees-on-15-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">Etsy fees on a $15 sale</Link>, <Link href="/etsy-fees-on-20-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">what Etsy takes from a $20 sale</Link>, or <Link href="/etsy-fees-on-30-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">what you keep from a $30 Etsy sale</Link>.</p>
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
                <Link href="/etsy-fees-explained" className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50">
                  Etsy Fees Explained<span className="mt-1 block text-xs font-normal text-slate-600">Full guide to listing, transaction, and processing fees.</span>
                </Link>
                <Link href="/etsy-fees-on-25-dollar-sale" className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50">
                  Etsy Fees on a $25 Sale<span className="mt-1 block text-xs font-normal text-slate-600">Compare at $25.</span>
                </Link>
                <Link href="/etsy-fees-on-40-dollar-sale" className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50">
                  Etsy Fees on a $40 Sale<span className="mt-1 block text-xs font-normal text-slate-600">See fee impact at higher price.</span>
                </Link>
              </div>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
