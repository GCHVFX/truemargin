import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const CANONICAL = "https://gettruemargin.com/how-much-does-etsy-take";

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "How Much Does Etsy Take Per Sale?",
      description:
        "A clear breakdown of Etsy fees including listing fees, transaction fees, payment processing, and offsite ads. See exactly how much Etsy takes from each sale.",
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
          name: "What percentage does Etsy take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There is no single percentage. Etsy fees can include a fixed listing fee, a transaction fee, payment processing, and possible offsite ads, so the total varies by order.",
          },
        },
        {
          "@type": "Question",
          name: "Do Etsy fees include shipping?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In many cases, Etsy applies certain fees to the total paid by the buyer, including shipping charged, which can increase the total fee amount.",
          },
        },
        {
          "@type": "Question",
          name: "Are Etsy fees different by country?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Payment processing rates and some regulatory charges can vary by country, so sellers in different regions may see different total fees.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "How Much Does Etsy Take Per Sale? (Full Fee Breakdown) | TrueMargin";
  const description =
    "A clear breakdown of Etsy fees including listing fees, transaction fees, payment processing, and offsite ads. See exactly how much Etsy takes from each sale.";

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
        id="tm-how-much-does-etsy-take-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: jsonLd() }}
      />

      <main className="bg-[#F7F8FA] py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <article className="rounded-2xl bg-white p-6 text-slate-800 shadow-sm ring-1 ring-slate-200 sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#2F3A56] sm:text-4xl">How Much Does Etsy Take Per Sale?</h1>
            <p className="mt-5 text-base leading-7">
              Etsy charges multiple fees on each order, so what you keep is usually less than the item price. Most sellers pay a mix of listing,
              transaction, payment processing, and sometimes offsite ad fees.
            </p>

            <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#2F3A56]">Want to see the exact fees on your product?</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">Use your real order numbers and get an instant fee breakdown.</p>
              <Link
                href="/etsy-fee-calculator"
                className="mt-4 inline-flex items-center rounded-md bg-[#2F3A56] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Try the Etsy Fee Calculator
              </Link>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Etsy Fees Explained</h2>
              <p className="leading-7">
                <strong>Listing fee:</strong> A fixed fee to publish an item listing. It is charged when the listing is created or renewed.
              </p>
              <p className="leading-7">
                <strong>Transaction fee:</strong> A percentage-based fee on the order value, typically applied when an item sells.
              </p>
              <p className="leading-7">
                <strong>Payment processing:</strong> A processing charge for handling the buyer&apos;s payment, often a percentage plus a small fixed amount.
              </p>
              <p className="leading-7">
                <strong>Offsite ads:</strong> If a sale is attributed to Etsy&apos;s offsite advertising, an additional ad fee may apply.
              </p>
              <p className="leading-7">
                <strong>Regulatory fees (where applicable):</strong> Some regions include extra required charges tied to local rules.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Example: How Etsy Fees Affect a $25 Sale</h2>
              <p className="leading-7">
                On a $25 order, Etsy does not just take one flat percentage. Instead, the final total can include the listing fee, transaction
                fee, payment processing, and optional ad-related charges. When those are combined, your net payout can be several dollars lower
                than your sale price.
              </p>
            </section>

            <section className="mt-8 rounded-xl border border-[#F4A261]/35 bg-[#F4A261]/10 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#2F3A56]">Want to see the exact fees on your product?</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">Estimate listing, transaction, processing, and ad fees in one place.</p>
              <Link
                href="/etsy-fee-calculator"
                className="mt-4 inline-flex items-center rounded-md border border-[#2F3A56] bg-white px-4 py-2 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50"
              >
                Try the Etsy Fee Calculator
              </Link>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Calculate Your Real Etsy Fees</h2>
              <p className="leading-7">
                For a precise estimate based on your order details, use the{" "}
                <Link href="/etsy-fee-calculator" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                  Etsy Fee Calculator
                </Link>
                .
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">FAQ</h2>
              <h3 className="text-lg font-semibold text-[#2F3A56]">What percentage does Etsy take?</h3>
              <p className="leading-7">
                There is no single percentage. The total depends on which fee types apply to your order and seller region.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#2F3A56]">Do Etsy fees include shipping?</h3>
              <p className="leading-7">
                In many cases, certain Etsy fees are calculated on the amount paid by the buyer, which can include shipping charged.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#2F3A56]">Are Etsy fees different by country?</h3>
              <p className="leading-7">Yes. Processing rates and region-specific charges can vary, so fee totals may differ by country.</p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
