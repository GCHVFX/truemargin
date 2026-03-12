import Link from "next/link";
import Script from "next/script";
import { buildEtsyFeeSaleJsonLd, getEtsyFeeSaleScenario } from "@/lib/etsyFeeSalePages";

const currency = (n: number) => `$${n.toFixed(2)}`;

export function EtsyFeeSalePage({ amount }: { amount: number }) {
  const s = getEtsyFeeSaleScenario(amount);

  return (
    <>
      <Script
        id={`tm-etsy-fees-on-${amount}-jsonld`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: buildEtsyFeeSaleJsonLd(amount) }}
      />

      <main className="bg-[#F7F8FA] py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <article className="rounded-2xl bg-white p-6 text-slate-800 shadow-sm ring-1 ring-slate-200 sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#2F3A56] sm:text-4xl">{s.h1}</h1>
            <p className="mt-5 text-base leading-7">{s.intro}</p>
            <p className="mt-3 text-base leading-7">{s.variationNote}</p>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Example: Etsy Fees on a ${amount} Order</h2>
              <p className="leading-7">
                Listing fee: {currency(s.fees.listingFee)}
                <br />
                Transaction fee (6.5%): {currency(s.fees.transactionFee)}
                <br />
                Payment processing (~3% + $0.25): about {currency(s.fees.processingFee)}
              </p>
              <p className="leading-7">
                <strong>Estimated total fees before Offsite Ads: {currency(s.fees.totalEstimatedFees)}</strong>
              </p>
              <p className="leading-7">
                If Offsite Ads applies, fees could be closer to <strong>{currency(s.fees.withOffsiteAdsEstimate)}</strong> depending on your exact
                order details and region.
              </p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">What You Might Keep from a ${amount} Sale</h2>
              <p className="leading-7">
                Before product costs and shipping cost, you might keep around <strong>{currency(s.fees.estimatedKeepBeforeCosts)}</strong> after
                baseline Etsy fees.
              </p>
              <p className="leading-7">
                If Offsite Ads applies, take-home before your own costs may be closer to{" "}
                <strong>{currency(s.fees.estimatedKeepWithOffsiteBeforeCosts)}</strong>.
              </p>
              <p className="leading-7">{s.keepSummary}</p>
            </section>

            <section className="mt-8 rounded-xl border border-[#F4A261]/35 bg-[#F4A261]/10 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#2F3A56]">Use tools to turn this estimate into exact pricing decisions</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/etsy-fee-calculator"
                  className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50"
                >
                  Etsy Fee Calculator
                  <span className="mt-1 block text-xs font-normal text-slate-600">Get an exact fee estimate for your order.</span>
                </Link>
                <Link
                  href="/etsy-profit-calculator"
                  className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50"
                >
                  Etsy Profit Calculator
                  <span className="mt-1 block text-xs font-normal text-slate-600">See what you keep after fees and costs.</span>
                </Link>
                <Link
                  href="/etsy-pricing-calculator"
                  className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50"
                >
                  Etsy Pricing Calculator
                  <span className="mt-1 block text-xs font-normal text-slate-600">Set your price for your target margin.</span>
                </Link>
                <Link
                  href="/etsy-fees-explained"
                  className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50"
                >
                  Etsy Fees Explained
                  <span className="mt-1 block text-xs font-normal text-slate-600">Review the full Etsy fee system in one guide.</span>
                </Link>
              </div>
            </section>

            <section className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Learn how Etsy fees work</h2>
              <p className="mt-3 leading-7">
                Want the full breakdown of Etsy listing fees, transaction fees, payment processing and offsite ads?
              </p>
              <Link
                href="/etsy-fees-explained"
                className="mt-4 inline-flex items-center rounded-md bg-[#2F3A56] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Read the full Etsy Fees Explained guide
              </Link>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">FAQ</h2>

              <h3 className="text-lg font-semibold text-[#2F3A56]">{s.faq.q1}</h3>
              <p className="leading-7">{s.faq.a1}</p>

              <h3 className="pt-2 text-lg font-semibold text-[#2F3A56]">{s.faq.q2}</h3>
              <p className="leading-7">{s.faq.a2}</p>

              <h3 className="pt-2 text-lg font-semibold text-[#2F3A56]">{s.faq.q3}</h3>
              <p className="leading-7">{s.faq.a3}</p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
