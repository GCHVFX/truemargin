import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const CANONICAL = "https://gettruemargin.com/etsy-fees-explained";

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "Etsy Fees Explained - Listing, Transaction and Payment Fees",
      description:
        "See the full breakdown of Etsy listing fees, transaction fees, payment processing costs, regulatory fees, and Offsite Ads.",
      url: CANONICAL,
      isPartOf: {
        "@type": "WebSite",
        name: "TrueMargin",
        url: "https://gettruemargin.com",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How much does Etsy take per sale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Many sellers often see Etsy fees around 10% to 15% on a standard order, but the exact total depends on seller region, shipping charged, and whether Offsite Ads applies.",
          },
        },
        {
          "@type": "Question",
          name: "What Etsy fees are included in the total?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The total can include listing fee, transaction fee, payment processing fee, regulatory operating fee in some regions, and optional Offsite Ads fee.",
          },
        },
        {
          "@type": "Question",
          name: "Why do Etsy profits feel lower than expected?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sellers often price from product cost alone and miss stacked platform fees, shipping cost, and ad fees. Profit calculators help show take-home clearly before listing.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Etsy Fees Explained - Listing, Transaction and Payment Fees";
  const description =
    "See the full breakdown of Etsy listing fees, transaction fees, payment processing costs, and Offsite Ads in one practical guide.";

  return {
    title,
    description,
    alternates: { canonical: CANONICAL },
    openGraph: {
      type: "article",
      url: CANONICAL,
      title,
      description,
      siteName: "TrueMargin",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default function Page() {
  return (
    <>
      <Script
        id="tm-etsy-fees-explained-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: jsonLd() }}
      />

      <main className="bg-[#F7F8FA] py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <article className="rounded-2xl bg-white p-6 text-slate-800 shadow-sm ring-1 ring-slate-200 sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#2F3A56] sm:text-4xl">
              Etsy Fees Explained (Full 2026 Breakdown)
            </h1>

            <section className="mt-6 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">How Much Does Etsy Take?</h2>
              <p className="leading-7">
                Short answer: many sellers often see Etsy fees land around 10% to 15% on a standard order. Your exact total can be lower or higher
                depending on payment processing rules for your seller region and whether Offsite Ads applies to that sale.
              </p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Etsy Fee Breakdown</h2>
              <p className="leading-7">
                <strong>Listing fee:</strong> A fixed fee per listing or renewal.
              </p>
              <p className="leading-7">
                <strong>Transaction fee:</strong> A percentage Etsy applies to the order total.
              </p>
              <p className="leading-7">
                <strong>Payment processing:</strong> Usually a percentage plus fixed amount, based on seller region.
              </p>
              <p className="leading-7">
                <strong>Regulatory fees:</strong> Additional region-based operating fee in some markets.
              </p>
              <p className="leading-7">
                <strong>Offsite Ads:</strong> Optional percentage fee when Etsy attributes a sale to Offsite Ads.
              </p>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Example Etsy Sale Scenarios</h2>
              <p className="leading-7">
                These ranges are planning examples, not exact statements. Use your own inputs for precise numbers.
              </p>
              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-[#2F3A56]">$25 sale</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Typical fees can land around a few dollars after listing, transaction, and processing.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-[#2F3A56]">$50 sale</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Fees usually rise with order value, and Offsite Ads can increase the total further.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-[#2F3A56]">$100 sale</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Total Etsy fees can become a meaningful dollar amount, so pricing with margin in mind is critical.
                  </p>
                </div>
              </div>
              <p className="leading-7">
                To replace rough ranges with exact fee output, run these scenarios in the{" "}
                <Link href="/etsy-fee-calculator" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                  Etsy Fee Calculator
                </Link>
                .
              </p>
            </section>

            <section className="mt-10 rounded-xl border border-[#F4A261]/35 bg-[#F4A261]/10 p-5 sm:p-6">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">TrueMargin Etsy Calculator Tools</h2>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/etsy-fee-calculator"
                  className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50"
                >
                  Etsy Fee Calculator
                  <span className="mt-1 block text-xs font-normal text-slate-600">Estimate Etsy fees per order.</span>
                </Link>
                <Link
                  href="/etsy-profit-calculator"
                  className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50"
                >
                  Etsy Profit Calculator
                  <span className="mt-1 block text-xs font-normal text-slate-600">See what you actually keep after fees and costs.</span>
                </Link>
                <Link
                  href="/etsy-break-even-calculator"
                  className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50"
                >
                  Etsy Break-even Calculator
                  <span className="mt-1 block text-xs font-normal text-slate-600">Find your minimum safe item price.</span>
                </Link>
                <Link
                  href="/etsy-pricing-calculator"
                  className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50"
                >
                  Etsy Pricing Calculator
                  <span className="mt-1 block text-xs font-normal text-slate-600">Set your Etsy price to hit your target margin.</span>
                </Link>
              </div>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Example Etsy Fee Calculations</h2>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link
                  href="/etsy-fees-on-10-dollar-sale"
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-base font-semibold text-[#2F3A56] transition hover:bg-slate-100"
                >
                  Etsy fees on a $10 sale
                  <span className="mt-1 block text-sm font-normal text-slate-700">
                    See a practical fee breakdown for a low-ticket order.
                  </span>
                </Link>
                <Link
                  href="/etsy-fees-on-25-dollar-sale"
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-base font-semibold text-[#2F3A56] transition hover:bg-slate-100"
                >
                  Etsy fees on a $25 sale
                  <span className="mt-1 block text-sm font-normal text-slate-700">
                    Review a common mid-range example with estimated fee totals.
                  </span>
                </Link>
                <Link
                  href="/etsy-fees-on-50-dollar-sale"
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-base font-semibold text-[#2F3A56] transition hover:bg-slate-100"
                >
                  Etsy fees on a $50 sale
                  <span className="mt-1 block text-sm font-normal text-slate-700">
                    Understand how fee dollars scale as order value grows.
                  </span>
                </Link>
                <Link
                  href="/etsy-fees-on-100-dollar-sale"
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-base font-semibold text-[#2F3A56] transition hover:bg-slate-100"
                >
                  Etsy fees on a $100 sale
                  <span className="mt-1 block text-sm font-normal text-slate-700">
                    Check a higher-value example and expected payout range.
                  </span>
                </Link>
                <Link
                  href="/etsy-fees-on-250-dollar-sale"
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-base font-semibold text-[#2F3A56] transition hover:bg-slate-100"
                >
                  Etsy fees on a $250 sale
                  <span className="mt-1 block text-sm font-normal text-slate-700">
                    See why fee dollars become significant on larger orders.
                  </span>
                </Link>
                <Link
                  href="/etsy-fees-on-500-dollar-sale"
                  className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-base font-semibold text-[#2F3A56] transition hover:bg-slate-100"
                >
                  Etsy fees on a $500 sale
                  <span className="mt-1 block text-sm font-normal text-slate-700">
                    Review a high-ticket fee example before setting price targets.
                  </span>
                </Link>
              </div>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Etsy Fees on Different Sale Prices</h2>
              <p className="leading-7">
                Etsy fees vary depending on your price point. Here&apos;s a breakdown of what Etsy takes at different sale amounts.
              </p>
              <ul className="list-disc space-y-2 pl-6 leading-7">
                <li>
                  <Link href="/etsy-fees-on-10-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                    Etsy fees on a $10 sale
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-15-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                    What Etsy takes from a $15 sale
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-20-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                    Etsy fee breakdown for a $20 item
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-25-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                    Etsy fees on a $25 sale
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-30-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                    What you keep from a $30 Etsy sale
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-40-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                    Etsy fees on a $40 sale
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-50-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                    What Etsy takes from a $50 sale
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-75-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                    Etsy fee breakdown for a $75 item
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-100-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                    Etsy fees on a $100 sale
                  </Link>
                </li>
                <li>
                  <Link href="/etsy-fees-on-150-dollar-sale" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                    What Etsy takes from a $150 sale
                  </Link>
                </li>
              </ul>
            </section>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Why Etsy Fees Are Often Underestimated</h2>
              <p className="leading-7">
                Many sellers price from product cost and forget that Etsy fees are layered. Transaction and processing fees scale with order value,
                and optional ad fees can reduce take-home even more.
              </p>
              <p className="leading-7">
                Profit calculators help because they show fees, cost of goods, shipping, and margin together in one view. That makes pricing
                decisions more reliable and prevents surprises after a sale.
              </p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
