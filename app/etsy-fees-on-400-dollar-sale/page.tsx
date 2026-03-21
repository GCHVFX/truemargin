import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const CANONICAL = "https://gettruemargin.com/etsy-fees-on-400-dollar-sale";

function jsonLd() {
  return JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "How Much You Keep From a $400 Etsy Sale",
      description: "Etsy fees on a $400 sale. Listing, transaction, payment processing, Offsite Ads. Payout after fees before costs.",
      url: CANONICAL,
      isPartOf: { "@type": "WebSite", name: "TrueMargin", url: "https://gettruemargin.com" },
    },
  ]);
}

export const metadata: Metadata = {
  title: "How Much You Keep From a $400 Etsy Sale",
  description: "Etsy fees on a $400 sale. Listing, transaction, payment processing, Offsite Ads. See payout after fees before product and shipping costs.",
  alternates: { canonical: CANONICAL },
  openGraph: { type: "article", url: CANONICAL, title: "How Much You Keep From a $400 Etsy Sale", description: "Etsy fees on a $400 sale.", siteName: "TrueMargin" },
  twitter: { card: "summary_large_image", title: "How Much You Keep From a $400 Etsy Sale", description: "Etsy fees on a $400 sale." },
};

export default function Page() {
  const listingFee = 0.2;
  const transactionFee = 26;
  const processingFee = 12.25;
  const totalFees = 38.45;
  const withOffsiteAds = 86.45;
  const keepBeforeCosts = 361.55;
  const keepWithOffsite = 313.55;

  return (
    <>
      <Script id="tm-etsy-fees-400-jsonld" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
      <main className="bg-[#F7F8FA] py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <article className="rounded-2xl bg-white p-6 text-slate-800 shadow-sm ring-1 ring-slate-200 sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#2F3A56] sm:text-4xl">How Much You Keep From a $400 Etsy Sale</h1>
            <p className="mt-5 text-base leading-7">A $400 sale attracts listing, transaction, and payment processing fees. This page explains the fee structure and your take-home before product and shipping costs.</p>
            <p className="mt-3 text-base leading-7">Fee dollars are significant at this level. Even when payout looks large, real profit depends on cost of goods, shipping, and whether Offsite Ads applies.</p>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Fee breakdown for a $400 order</h2>
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
              <p className="leading-7">With Offsite Ads, fees can reach about <strong>${withOffsiteAds.toFixed(2)}</strong>, depending on region and order details.</p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Real profit example</h2>
              <p className="leading-7">Before your costs, you keep roughly <strong>${keepBeforeCosts.toFixed(2)}</strong> after baseline Etsy fees. With Offsite Ads, that becomes around <strong>${keepWithOffsite.toFixed(2)}</strong>.</p>
              <p className="leading-7">If cost of goods is $160 and shipping $25, real profit before ads is about $176.55. Use a calculator to model different COGS and shipping scenarios.</p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">What affects your profit</h2>
              <p className="leading-7">Shipping charged to the buyer can be subject to fees. Regional payment rates differ. Offsite Ads add 12% when they drive the sale. Product costs, packaging, and your shipping cost determine final net earnings.</p>
              <p className="leading-7">Compare: <Link href="/etsy-fees-on-300-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">Etsy fees on a $300 sale</Link>, <Link href="/etsy-fees-on-500-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">Etsy fees on a $500 sale</Link>, or <Link href="/etsy-fees-on-750-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">what Etsy takes from a $750 sale</Link>.</p>
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
                <Link href="/etsy-fees-on-250-dollar-sale" className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50">
                  Etsy Fees on a $250 Sale<span className="mt-1 block text-xs font-normal text-slate-600">Compare at lower price.</span>
                </Link>
                <Link href="/etsy-fees-on-150-dollar-sale" className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50">
                  Etsy Fees on a $150 Sale<span className="mt-1 block text-xs font-normal text-slate-600">See fee impact at $150.</span>
                </Link>
              </div>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
