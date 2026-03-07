import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const CANONICAL = "https://gettruemargin.com/etsy-profit-margin";

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "What Is a Good Profit Margin on Etsy?",
      description:
        "Learn what a healthy Etsy profit margin looks like, how fees affect your margins, and how to calculate your real profit with TrueMargin.",
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
          name: "What is a healthy profit margin on Etsy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A common target is around 30% or higher after Etsy fees, shipping, and product costs, though ideal margins vary by product type and competition.",
          },
        },
        {
          "@type": "Question",
          name: "Is 20% profit margin enough on Etsy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "20% can work for some sellers, but it is often tight. Unexpected costs, discounts, and ads can quickly reduce take-home profit.",
          },
        },
        {
          "@type": "Question",
          name: "Do Etsy fees reduce profit margin a lot?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "They can. Listing, transaction, payment processing, and optional offsite ad fees all reduce the final margin on each order.",
          },
        },
        {
          "@type": "Question",
          name: "How do I calculate Etsy profit margin?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Subtract total fees and costs from revenue to get profit, then divide profit by revenue and multiply by 100 to get margin percentage.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "What Is a Good Profit Margin on Etsy? | TrueMargin";
  const description =
    "Learn what a healthy Etsy profit margin looks like, how fees affect your margins, and how to calculate your real profit with TrueMargin.";

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
        id="tm-etsy-profit-margin-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: jsonLd() }}
      />

      <main className="bg-[#F7F8FA] py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <article className="rounded-2xl bg-white p-6 text-slate-800 shadow-sm ring-1 ring-slate-200 sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#2F3A56] sm:text-4xl">What Is a Good Profit Margin on Etsy?</h1>
            <p className="mt-5 text-base leading-7">
              Many Etsy sellers aim for roughly 30%+ margin after fees, shipping, and product costs. Lower margins can leave little room for ads,
              refunds, or pricing mistakes.
            </p>

            <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#2F3A56]">Want to know your real Etsy profit margin?</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Use the Etsy Profit Calculator to see what you actually keep after Etsy fees and costs.
              </p>
              <Link
                href="/etsy-profit-calculator"
                className="mt-4 inline-flex items-center rounded-md bg-[#2F3A56] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Try the Etsy Profit Calculator
              </Link>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">What Affects Your Etsy Profit Margin?</h2>
              <p className="leading-7">
                <strong>Etsy fees:</strong> Listing, transaction, payment processing, and possible offsite ad fees reduce what you keep.
              </p>
              <p className="leading-7">
                <strong>Cost of goods:</strong> Materials, packaging, and production costs directly lower margin on every sale.
              </p>
              <p className="leading-7">
                <strong>Shipping costs:</strong> If your shipping cost is higher than expected, margin drops quickly.
              </p>
              <p className="leading-7">
                <strong>Discounts and ads:</strong> Coupons and paid promotion can increase sales but compress per-order profit.
              </p>
              <p className="leading-7">
                <strong>Pricing strategy:</strong> Underpricing to compete can create volume but still leave weak profitability.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">What Is Considered a Good Etsy Profit Margin?</h2>
              <p className="leading-7">
                A practical rule of thumb for many handmade and product-based Etsy shops is:
              </p>
              <p className="leading-7">
                <strong>Under 15% = risky:</strong> Very little buffer for discounts, returns, or fee changes.
              </p>
              <p className="leading-7">
                <strong>15-29% = tight:</strong> Can work, but margins are vulnerable to ad spend and rising costs.
              </p>
              <p className="leading-7">
                <strong>30-49% = healthy:</strong> Better room to reinvest and absorb normal business volatility.
              </p>
              <p className="leading-7">
                <strong>50%+ = strong:</strong> High flexibility for growth, promotions, and unexpected costs.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Example: Etsy Profit Margin on a Real Sale</h2>
              <p className="leading-7">
                Suppose you sell a product for $40. After Etsy fees and payment processing, and after subtracting your cost of goods and shipping,
                you might keep $12 profit. That equals a 30% margin, which is often considered a healthier target than a tight 15-20% margin.
              </p>
            </section>

            <section className="mt-8 rounded-xl border border-[#F4A261]/35 bg-[#F4A261]/10 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#2F3A56]">Check your margin before you list your product</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">Use the Etsy Profit Calculator to test your numbers in seconds.</p>
              <Link
                href="/etsy-profit-calculator"
                className="mt-4 inline-flex items-center rounded-md border border-[#2F3A56] bg-white px-4 py-2 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50"
              >
                Calculate Profit Margin
              </Link>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Why Profit Margin Matters on Etsy</h2>
              <p className="leading-7">
                Sellers can make consistent sales and still earn too little if margins are weak. Margin-aware pricing helps you protect take-home
                profit, and you can cross-check fee impact with the{" "}
                <Link href="/etsy-fee-calculator" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                  Etsy Fee Calculator
                </Link>{" "}
                or plan safer minimum pricing with the{" "}
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

              <h3 className="text-lg font-semibold text-[#2F3A56]">What is a healthy profit margin on Etsy?</h3>
              <p className="leading-7">
                Many sellers target around 30% or higher after all costs, though the right number depends on your product category and business
                model.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#2F3A56]">Is 20% profit margin enough on Etsy?</h3>
              <p className="leading-7">
                It can be workable, but it is often tight. Small fee changes or extra costs can quickly shrink net profit.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#2F3A56]">Do Etsy fees reduce profit margin a lot?</h3>
              <p className="leading-7">
                They can. Multiple Etsy fees can stack on each order, which is why it helps to estimate fees before finalizing prices.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#2F3A56]">How do I calculate Etsy profit margin?</h3>
              <p className="leading-7">
                Subtract total costs and fees from revenue to get profit, then divide profit by revenue and multiply by 100. The{" "}
                <Link href="/etsy-profit-calculator" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                  Etsy Profit Calculator
                </Link>{" "}
                does this automatically.
              </p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
