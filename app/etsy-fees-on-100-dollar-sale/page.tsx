import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const CANONICAL = "https://gettruemargin.com/etsy-fees-on-100-dollar-sale";

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "Etsy Fees on a $100 Sale",
      description:
        "Learn how much Etsy takes from a $100 sale including listing fees, transaction fees, and payment processing. Calculate your real profit with TrueMargin.",
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
          name: "How much profit do you keep from a $100 Etsy sale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It depends on your costs and fee profile. A baseline fee estimate is around $9.95 before offsite ad or regional adjustments, then cost of goods and shipping further reduce profit.",
          },
        },
        {
          "@type": "Question",
          name: "What percentage does Etsy take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There is no single percentage. Etsy fees usually include listing, transaction, and payment processing charges, and optional offsite ad fees.",
          },
        },
        {
          "@type": "Question",
          name: "Do ads increase Etsy fees?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, when a sale is attributed to Etsy Offsite Ads, an additional ad fee may apply and increase total fees.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Etsy Fees on a $100 Sale (Seller Fee Breakdown) | TrueMargin";
  const description =
    "Learn how much Etsy takes from a $100 sale including listing fees, transaction fees, and payment processing. Calculate your real profit with TrueMargin.";

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
        id="tm-etsy-fees-on-100-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: jsonLd() }}
      />

      <main className="bg-[#F7F8FA] py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <article className="rounded-2xl bg-white p-6 text-slate-800 shadow-sm ring-1 ring-slate-200 sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#2F3A56] sm:text-4xl">Etsy Fees on a $100 Sale</h1>
            <p className="mt-5 text-base leading-7">
              Etsy applies multiple charges to each order. On a $100 sale, listing, transaction, and payment processing fees can significantly
              reduce payout before product and shipping costs are removed.
            </p>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Example: $100 Etsy Sale</h2>
              <p className="leading-7">
                Listing fee: $0.20
                <br />
                Transaction fee (6.5%): $6.50
                <br />
                Payment processing (~3% + $0.25): about $3.25
              </p>
              <p className="leading-7">
                <strong>Total estimated fees: about $9.95</strong>
              </p>
              <p className="leading-7">
                Offsite Ads and region-based payment fees may increase this total, so your exact result can vary by order and country.
              </p>
            </section>

            <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#2F3A56]">Estimate your exact fees and payout</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Use the Etsy Fee Calculator for precise fee projections based on your own order values.
              </p>
              <Link
                href="/etsy-fee-calculator"
                className="mt-4 inline-flex items-center rounded-md bg-[#2F3A56] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Calculate Etsy Fees
              </Link>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Turn Fee Estimates into Real Profit Targets</h2>
              <p className="leading-7">
                Fees are only one part of take-home profit. After estimating fees, use the{" "}
                <Link href="/etsy-profit-calculator" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                  Etsy Profit Calculator
                </Link>{" "}
                to include cost of goods and shipping, and use the{" "}
                <Link
                  href="/etsy-break-even-calculator"
                  className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2"
                >
                  Etsy Break-even Calculator
                </Link>{" "}
                to set minimum safe prices.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">FAQ</h2>

              <h3 className="text-lg font-semibold text-[#2F3A56]">How much profit do you keep from a $100 Etsy sale?</h3>
              <p className="leading-7">
                It depends on your costs. Baseline Etsy fees may be around $9.95, then product and shipping costs determine your final profit.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#2F3A56]">What percentage does Etsy take?</h3>
              <p className="leading-7">
                There is no one percentage. Total fees vary by fee type, order details, region, and whether Offsite Ads apply.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#2F3A56]">Do ads increase Etsy fees?</h3>
              <p className="leading-7">Yes. If Etsy attributes a sale to Offsite Ads, an additional ad fee can increase total fees.</p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
