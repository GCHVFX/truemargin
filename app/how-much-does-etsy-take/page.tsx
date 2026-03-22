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
      name: "How Much Does Etsy Take? (Full Fee Breakdown)",
      description:
        "How much Etsy takes depends on listing, transaction, processing, and optional ad fees. See clear examples and practical fee ranges.",
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
            text: "There is no single Etsy fee percentage. Most sellers often see total fees around 10% to 15% on a standard order, but the exact amount depends on shipping charged, region, and whether Offsite Ads applies.",
          },
        },
        {
          "@type": "Question",
          name: "How much does Etsy take on a $25 sale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "On a $25 sale, Etsy commonly takes several dollars once listing, transaction, and payment processing fees are combined. The exact amount changes by country settings and Offsite Ads.",
          },
        },
        {
          "@type": "Question",
          name: "Why does Etsy profit feel lower than expected?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Profit can feel lower because sellers focus on item price but forget stacked Etsy fees, shipping cost, and cost of goods. Looking at all three together gives a more realistic take-home number.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "How Much Does Etsy Take? (Full Fee Breakdown)";
  const description =
    "Learn how much Etsy takes per sale with clear examples for common order amounts, plus a practical breakdown of each fee type.";

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
            <div className="mt-6">
              <p className="text-xs font-medium uppercase tracking-wide text-[#9AA6BF] mb-2">Quick answer</p>
              <div className="border-l-4 border-emerald-500/60 pl-4 py-2 bg-white/5 text-[#EAF0FF] text-base">
                <p className="leading-7">Etsy takes between 9.5% and 15% of each sale depending on your fees. Every order incurs a $0.20 listing fee, a 6.5% transaction fee, and a payment processing fee of around 3%.</p>
              </div>
            </div>
            <p className="mt-5 text-base leading-7">
              Etsy does not take one flat fee. Most sellers often see total Etsy fees around 10% to 15% on a typical order, but your exact fee
              amount depends on order value, shipping charged, seller region, and whether Offsite Ads applies.
            </p>
            <p className="mt-3 text-base leading-7">
              Short answer: Etsy usually takes a few dollars on small orders and can take well over $10 on higher-value orders once all fee layers
              are included.
            </p>

            <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#2F3A56]">Need your exact fee amount, not a rough range?</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Use the Etsy Fee Calculator for a clear per-order breakdown based on your product and seller region.
              </p>
              <Link
                href="/etsy-fee-calculator"
                className="mt-4 inline-flex items-center rounded-md bg-[#2F3A56] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Try the Etsy Fee Calculator
              </Link>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Etsy Fee Breakdown</h2>
              <p className="leading-7">
                <strong>Listing fee:</strong> A fixed charge each time an item is listed or renewed.
              </p>
              <p className="leading-7">
                <strong>Transaction fee:</strong> A percentage fee Etsy takes from the order total.
              </p>
              <p className="leading-7">
                <strong>Payment processing fee:</strong> Usually a percentage plus a fixed amount, based on your seller region.
              </p>
              <p className="leading-7">
                <strong>Offsite Ads fee:</strong> Applies when Etsy attributes the order to Offsite Ads.
              </p>
              <p className="leading-7">
                <strong>Regulatory operating fee (where applicable):</strong> Extra fee in some regions.
              </p>
              <p className="leading-7">
                Certain Etsy fees can apply to shipping charged to the buyer, which is one reason total fees can feel higher than expected.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Real Sale Examples: How Much Etsy Takes</h2>
              <p className="leading-7">
                These are practical ranges to help with planning. Your exact result changes with seller country settings, shipping charged, and
                whether Offsite Ads applies.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-[#2F3A56]">$10 sale</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Etsy fees are often around <strong>$1.30 to $2.20</strong>, depending on fee settings and ad attribution.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-[#2F3A56]">$25 sale</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Etsy fees are often around <strong>$2.80 to $5.00</strong> once all layers are included.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-[#2F3A56]">$50 sale</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Etsy fees are often around <strong>$5.20 to $9.20</strong>, with Offsite Ads increasing the total.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <p className="font-semibold text-[#2F3A56]">$100 sale</p>
                  <p className="mt-2 text-sm leading-6 text-slate-700">
                    Etsy fees are often around <strong>$9.80 to $17.00+</strong> depending on region and ad fees.
                  </p>
                </div>
              </div>
              <p className="leading-7">
                If you want exact numbers for your listing instead of ranges, run your inputs through the{" "}
                <Link href="/etsy-fee-calculator" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                  Etsy Fee Calculator
                </Link>
                .
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Why Etsy Profit Feels Lower Than Expected</h2>
              <p className="leading-7">
                A lot of sellers compare sale price to product cost and miss the rest: Etsy fees are layered, shipping cost can be meaningful, and
                ad-related fees can reduce take-home further.
              </p>
              <p className="leading-7">
                That is why revenue can look healthy while actual profit feels thin. Checking fees, costs, and margin together gives a more honest
                view before you list or run ads.
              </p>
            </section>

            <section className="mt-8 rounded-xl border border-[#F4A261]/35 bg-[#F4A261]/10 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#2F3A56]">Use the right Etsy calculator for your next pricing decision</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Start with fees, then validate profit, break-even, and target-margin pricing.
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/etsy-fee-calculator"
                  className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50"
                >
                  Etsy Fee Calculator
                  <span className="mt-1 block text-xs font-normal text-slate-600">Estimate Etsy fees for one order</span>
                </Link>
                <Link
                  href="/etsy-profit-calculator"
                  className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50"
                >
                  Etsy Profit Calculator
                  <span className="mt-1 block text-xs font-normal text-slate-600">See what you actually keep</span>
                </Link>
                <Link
                  href="/etsy-break-even-calculator"
                  className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50"
                >
                  Etsy Break-even Calculator
                  <span className="mt-1 block text-xs font-normal text-slate-600">Find your minimum safe price</span>
                </Link>
                <Link
                  href="/etsy-pricing-calculator"
                  className="rounded-md border border-[#2F3A56] bg-white px-4 py-3 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50"
                >
                  Etsy Pricing Calculator
                  <span className="mt-1 block text-xs font-normal text-slate-600">Set your Etsy price to hit your target margin</span>
                </Link>
              </div>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">FAQ</h2>
              <h3 className="text-lg font-semibold text-[#2F3A56]">What percentage does Etsy take?</h3>
              <p className="leading-7">
                There is no single percentage. Most sellers often see total fees around 10% to 15% on a standard order, but your exact amount
                depends on shipping charged, region, and Offsite Ads.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#2F3A56]">How much does Etsy take on a $25 sale?</h3>
              <p className="leading-7">
                A $25 sale often has a few dollars in Etsy fees once listing, transaction, and payment processing are combined. Offsite Ads can
                push the total higher.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#2F3A56]">Why does Etsy profit feel lower than expected?</h3>
              <p className="leading-7">
                Because multiple fee types can apply to one order, and shipping and product costs also reduce take-home. Looking only at sale price
                can make profit look better than it really is.
              </p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
