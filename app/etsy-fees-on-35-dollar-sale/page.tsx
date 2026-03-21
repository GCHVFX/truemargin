import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const CANONICAL = "https://gettruemargin.com/etsy-fees-on-35-dollar-sale";

function jsonLd() {
  return JSON.stringify([
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "How Much You Keep From a $35 Etsy Sale",
      description: "Etsy fees on a $35 sale. Listing, transaction, payment processing, Offsite Ads. Payout before product and shipping costs.",
      url: CANONICAL,
      isPartOf: { "@type": "WebSite", name: "TrueMargin", url: "https://gettruemargin.com" },
    },
  ]);
}

export const metadata: Metadata = {
  title: "How Much You Keep From a $35 Etsy Sale - Fee Breakdown",
  description: "Etsy fees on a $35 sale. Listing, transaction, payment processing, Offsite Ads. See payout before product and shipping costs.",
  alternates: { canonical: CANONICAL },
  openGraph: { type: "article", url: CANONICAL, title: "How Much You Keep From a $35 Etsy Sale", description: "Etsy fees on a $35 sale.", siteName: "TrueMargin" },
  twitter: { card: "summary_large_image", title: "How Much You Keep From a $35 Etsy Sale", description: "Etsy fees on a $35 sale." },
};

export default function Page() {
  const listingFee = 0.2;
  const transactionFee = 2.28;
  const processingFee = 1.3;
  const totalFees = 3.78;
  const withOffsiteAds = 7.98;
  const keepBeforeCosts = 31.22;
  const keepWithOffsite = 27.02;

  return (
    <>
      <Script id="tm-etsy-fees-35-jsonld" type="application/ld+json" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: jsonLd() }} />
      <main className="bg-[#F7F8FA] py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <article className="rounded-2xl bg-white p-6 text-slate-800 shadow-sm ring-1 ring-slate-200 sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#2F3A56] sm:text-4xl">How Much You Keep From a $35 Etsy Sale</h1>
            <p className="mt-5 text-base leading-7">A $35 sale generates listing, transaction, and payment processing fees. This breakdown shows what Etsy takes and what you retain before product and shipping costs.</p>
            <p className="mt-3 text-base leading-7">At this price, fee dollars climb with order value. Small pricing adjustments can meaningfully change take-home profit.</p>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Fee breakdown for a $35 order</h2>
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
              <p className="leading-7">Before your costs, you keep around <strong>${keepBeforeCosts.toFixed(2)}</strong> after baseline Etsy fees. With Offsite Ads, that becomes roughly <strong>${keepWithOffsite.toFixed(2)}</strong>.</p>
              <p className="leading-7">If cost of goods is $14 and shipping $5, real profit before ads is about $12.22. A calculator lets you model different scenarios.</p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">What affects your profit</h2>
              <p className="leading-7">Shipping charged to the buyer can be subject to fees. Payment processing varies by region. Offsite Ads add 12% when they drive the sale. Product costs, packaging, and shipping determine final net earnings.</p>
              <p className="leading-7">Compare: <Link href="/etsy-fees-on-30-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">Etsy fees on a $30 sale</Link>, <Link href="/etsy-fees-on-40-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">what Etsy takes from a $40 sale</Link>, <Link href="/etsy-fees-on-50-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">Etsy fees on a $50 sale</Link>, or <Link href="/etsy-fees-on-60-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">Etsy fee breakdown for a $60 item</Link>.</p>
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
                  Etsy Fees on a $25 Sale<span className="mt-1 block text-xs font-normal text-slate-600">Compare at lower price.</span>
                </Link>
              </div>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
