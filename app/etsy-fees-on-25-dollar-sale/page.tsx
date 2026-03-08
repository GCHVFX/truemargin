import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const CANONICAL = "https://gettruemargin.com/etsy-fees-on-25-dollar-sale";

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "Etsy Fees on a $25 Sale",
      description:
        "See how Etsy fees affect a $25 sale including listing fees, transaction fees, and payment processing. Estimate your real profit using the TrueMargin Etsy Fee Calculator.",
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
          name: "How much does Etsy take from a $25 sale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A common estimate is around $2.83 in total fees before ads and regional differences, based on listing, transaction, and payment processing charges.",
          },
        },
        {
          "@type": "Question",
          name: "Do Etsy fees include shipping?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In many cases, yes. Some Etsy fees are calculated on the amount paid by the buyer, which can include shipping charged.",
          },
        },
        {
          "@type": "Question",
          name: "Are Etsy fees different by country?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Payment processing rates and some regional charges can vary by seller country, which changes total fees.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Etsy Fees on a $25 Sale (Full Breakdown) | TrueMargin";
  const description =
    "See how Etsy fees affect a $25 sale including listing fees, transaction fees, and payment processing. Estimate your real profit using the TrueMargin Etsy Fee Calculator.";

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
        id="tm-etsy-fees-on-25-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: jsonLd() }}
      />

      <main className="bg-[#F7F8FA] py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <article className="rounded-2xl bg-white p-6 text-slate-800 shadow-sm ring-1 ring-slate-200 sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#2F3A56] sm:text-4xl">Etsy Fees on a $25 Sale</h1>
            <p className="mt-5 text-base leading-7">
              Etsy applies several fees to each sale, including listing, transaction, and payment processing fees. On smaller orders like $25,
              those fees can take a meaningful share of your payout.
            </p>

            <section className="mt-10 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Example: $25 Etsy Sale</h2>
              <p className="leading-7">
                Listing fee: $0.20
                <br />
                Transaction fee (6.5%): $1.63
                <br />
                Payment processing (~3% + $0.25): about $1.00
              </p>
              <p className="leading-7">
                <strong>Total estimated fees: about $2.83</strong>
              </p>
              <p className="leading-7">
                Actual totals depend on your region, payment processing terms, and whether Offsite Ads apply. To estimate your exact order impact,
                use the calculator below.
              </p>
            </section>

            <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#2F3A56]">Calculate Your Exact Etsy Fees</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Use the Etsy Fee Calculator to estimate fees for your own order values.
              </p>
              <Link
                href="/etsy-fee-calculator"
                className="mt-4 inline-flex items-center rounded-md bg-[#2F3A56] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Try the Etsy Fee Calculator
              </Link>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">How to Use This Estimate for Pricing</h2>
              <p className="leading-7">
                Pair fee estimates with your real costs to avoid underpricing. You can project final take-home using the{" "}
                <Link href="/etsy-profit-calculator" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                  Etsy Profit Calculator
                </Link>{" "}
                and find safer minimum prices with the{" "}
                <Link
                  href="/etsy-break-even-calculator"
                  className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2"
                >
                  Etsy Break-even Calculator
                </Link>
                .
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">FAQ</h2>

              <h3 className="text-lg font-semibold text-[#2F3A56]">How much does Etsy take from a $25 sale?</h3>
              <p className="leading-7">
                A common estimate is around $2.83 before extra variables like Offsite Ads and regional rate differences.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#2F3A56]">Do Etsy fees include shipping?</h3>
              <p className="leading-7">
                In many cases, yes. Certain Etsy fees can apply to what the buyer pays, including shipping charged.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#2F3A56]">Are Etsy fees different by country?</h3>
              <p className="leading-7">Yes. Region-specific payment processing and regulatory charges can change total fees.</p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
