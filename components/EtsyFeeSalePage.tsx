import Link from "next/link";
import Script from "next/script";
import { buildEtsyFeeSaleJsonLd, getEtsyFeeSaleScenario } from "@/lib/etsyFeeSalePages";

const currency = (n: number) => `$${n.toFixed(2)}`;

const PRICE_POINTS = [10, 12, 15, 18, 20, 25, 30, 35, 40, 50, 60, 75, 80, 100, 120, 150, 200, 250, 300, 400, 500, 750];

function getNeighbourAmounts(amount: number): number[] {
  const idx = PRICE_POINTS.indexOf(amount);
  if (idx === -1) return [];
  const below = PRICE_POINTS.slice(Math.max(0, idx - 2), idx);
  const above = PRICE_POINTS.slice(idx + 1, Math.min(PRICE_POINTS.length, idx + 3));
  return [...below, ...above];
}

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

      <main className="calculator-page-bg min-h-screen py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 text-[#EAF0FF] sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#EAF0FF] sm:text-4xl">{s.h1}</h1>
            <p className="mt-5 text-base leading-7 text-[#9AA6BF]">{s.intro}</p>
            <p className="mt-3 text-base leading-7 text-[#9AA6BF]">{s.variationNote}</p>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Example: Etsy Fees on a ${amount} Order</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Listing fee: {currency(s.fees.listingFee)}
                <br />
                Transaction fee (6.5%): {currency(s.fees.transactionFee)}
                <br />
                Payment processing: {currency(s.fees.processingFee)}
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Estimated total fees before Offsite Ads: {currency(s.fees.totalEstimatedFees)}</strong>
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                If Offsite Ads applies, fees could be closer to <strong>{currency(s.fees.withOffsiteAdsEstimate)}</strong> depending on your exact
                order details and region.
              </p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">What You Might Keep from a ${amount} Sale</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Before product costs and shipping cost, you might keep around <strong>{currency(s.fees.estimatedKeepBeforeCosts)}</strong> after
                baseline Etsy fees.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                If Offsite Ads applies, take-home before your own costs may be closer to{" "}
                <strong>{currency(s.fees.estimatedKeepWithOffsiteBeforeCosts)}</strong>.
              </p>
              <p className="leading-7 text-[#9AA6BF]">{s.keepSummary}</p>
            </section>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#9AA6BF]">Use tools to turn this estimate into exact pricing decisions</p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/etsy-fee-calculator"
                  className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy Fee Calculator
                  <span className="mt-1 block text-xs font-normal text-slate-600">Get an exact fee estimate for your order.</span>
                </Link>
                <Link
                  href="/etsy-profit-calculator"
                  className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy Profit Calculator
                  <span className="mt-1 block text-xs font-normal text-slate-600">See what you keep after fees and costs.</span>
                </Link>
                <Link
                  href="/etsy-pricing-calculator"
                  className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy Pricing Calculator
                  <span className="mt-1 block text-xs font-normal text-slate-600">Set your price for your target margin.</span>
                </Link>
                <Link
                  href="/etsy-fees-explained"
                  className="rounded-md border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
                >
                  Etsy Fees Explained
                  <span className="mt-1 block text-xs font-normal text-slate-600">Review the full Etsy fee system in one guide.</span>
                </Link>
              </div>
            </section>

            {getNeighbourAmounts(amount).length > 0 && (
              <section className="mt-10 space-y-3">
                <h2 className="text-xl font-semibold text-[#EAF0FF]">Related: Etsy fees by order value</h2>
                <div className="flex flex-wrap gap-2">
                  {getNeighbourAmounts(amount).map((neighbour) => (
                    <Link
                      key={neighbour}
                      href={`/etsy-fees-on-${neighbour}-dollar-sale`}
                      className="rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-[#EAF0FF] transition hover:bg-slate-50 hover:border-slate-300"
                    >
                      Etsy fees on a ${neighbour} sale
                    </Link>
                  ))}
                </div>
              </section>
            )}

            <p className="mt-10">
              <Link
                href="/etsy-fees-explained"
                className="text-sm font-medium text-[#EAF0FF] underline decoration-[#F4A261] decoration-2 underline-offset-2 transition hover:text-slate-600"
              >
                See the full Etsy fee breakdown →
              </Link>
            </p>

            <section className="mt-10 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Learn how Etsy fees work</h2>
              <p className="mt-3 leading-7 text-[#9AA6BF]">
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
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">FAQ</h2>

              <h3 className="text-lg font-semibold text-[#EAF0FF]">{s.faq.q1}</h3>
              <p className="leading-7 text-[#9AA6BF]">{s.faq.a1}</p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">{s.faq.q2}</h3>
              <p className="leading-7 text-[#9AA6BF]">{s.faq.a2}</p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">{s.faq.q3}</h3>
              <p className="leading-7 text-[#9AA6BF]">{s.faq.a3}</p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
