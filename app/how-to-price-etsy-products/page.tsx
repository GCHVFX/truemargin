import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

const CANONICAL = "https://gettruemargin.com/how-to-price-etsy-products";

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "How to Price Etsy Products",
      description:
        "Learn how to price Etsy products using a simple formula that accounts for fees, cost of goods, and profit margin. Calculate your real Etsy profit with TrueMargin.",
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
          name: "How do I calculate Etsy pricing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Use a pricing formula that includes cost of goods, shipping, Etsy fees, and your target margin. A common method is: Price = (Costs + Fees) divided by (1 minus target margin).",
          },
        },
        {
          "@type": "Question",
          name: "What profit margin should Etsy sellers aim for?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Many sellers aim for around 30% or higher after all fees and costs, though the best margin depends on product type, competition, and growth goals.",
          },
        },
        {
          "@type": "Question",
          name: "Should shipping be included in Etsy pricing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Shipping cost should be included in your pricing model, because it directly affects your final profit margin.",
          },
        },
        {
          "@type": "Question",
          name: "Do Etsy fees make pricing harder?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Etsy fees are layered, so ignoring them can lead to underpricing and low margins. Estimating fees before listing helps protect profit.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "How to Price Etsy Products (Simple Pricing Formula) | TrueMargin";
  const description =
    "Learn how to price Etsy products using a simple formula that accounts for fees, cost of goods, and profit margin. Calculate your real Etsy profit with TrueMargin.";

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
        id="tm-how-to-price-etsy-products-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: jsonLd() }}
      />

      <main className="bg-[#F7F8FA] py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <article className="rounded-2xl bg-white p-6 text-slate-800 shadow-sm ring-1 ring-slate-200 sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#2F3A56] sm:text-4xl">How to Price Etsy Products</h1>
            <p className="mt-5 text-base leading-7">
              Etsy pricing should account for cost of goods, Etsy fees, shipping, and your target profit margin. If one of these is missing, your
              final profit can be lower than expected.
            </p>

            <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#2F3A56]">Want to know your real Etsy profit?</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
                Use the Etsy Profit Calculator to see what you actually keep after fees and costs.
              </p>
              <Link
                href="/etsy-profit-calculator"
                className="mt-4 inline-flex items-center rounded-md bg-[#2F3A56] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Try the Etsy Profit Calculator
              </Link>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">A Simple Etsy Pricing Formula</h2>
              <p className="rounded-lg bg-slate-50 px-4 py-3 font-semibold text-[#2F3A56]">
                Price = (Cost of goods + Shipping + Etsy fees) / (1 - Target profit margin)
              </p>
              <p className="leading-7">
                <strong>Cost of goods:</strong> Materials, production, and packaging costs.
              </p>
              <p className="leading-7">
                <strong>Shipping:</strong> The cost you pay to deliver the order.
              </p>
              <p className="leading-7">
                <strong>Etsy fees:</strong> Listing, transaction, payment processing, and possible offsite ad fees.
              </p>
              <p className="leading-7">
                <strong>Target profit margin:</strong> Your desired margin as a decimal (for example, 30% = 0.30).
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Example: Pricing an Etsy Product</h2>
              <p className="leading-7">
                Example inputs:
                <br />
                Cost of goods: $8
                <br />
                Shipping cost: $4
                <br />
                Estimated Etsy fees: $4
              </p>
              <p className="leading-7">
                Total costs and fees are $16. If you want roughly a 30% margin, you would price above simple break-even so margin remains after all
                deductions. You can validate this quickly with the{" "}
                <Link href="/etsy-break-even-calculator" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                  Etsy Break-even Calculator
                </Link>{" "}
                and then confirm actual take-home profit.
              </p>
            </section>

            <section className="mt-8 rounded-xl border border-[#F4A261]/35 bg-[#F4A261]/10 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#2F3A56]">Check your pricing before listing your product</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">Run your numbers with the Etsy Profit Calculator.</p>
              <Link
                href="/etsy-profit-calculator"
                className="mt-4 inline-flex items-center rounded-md border border-[#2F3A56] bg-white px-4 py-2 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50"
              >
                Calculate Profit
              </Link>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Common Etsy Pricing Mistakes</h2>
              <p className="leading-7">
                <strong>Ignoring fees:</strong> Pricing off product cost alone can leave you with much less profit than planned. Use the{" "}
                <Link href="/etsy-fee-calculator" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                  Etsy Fee Calculator
                </Link>{" "}
                to estimate full fee impact.
              </p>
              <p className="leading-7">
                <strong>Underestimating shipping:</strong> Shipping changes can erase margin if not included in your model.
              </p>
              <p className="leading-7">
                <strong>Pricing based on competitors only:</strong> Market prices matter, but your own costs and margin target matter more.
              </p>
              <p className="leading-7">
                <strong>Leaving no margin for ads or refunds:</strong> Thin margins make your pricing fragile when extra costs appear.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">FAQ</h2>

              <h3 className="text-lg font-semibold text-[#2F3A56]">How do I calculate Etsy pricing?</h3>
              <p className="leading-7">
                Add product cost, shipping, and Etsy fees, then divide by 1 minus your target margin. This helps you price to keep your desired
                profit.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#2F3A56]">What profit margin should Etsy sellers aim for?</h3>
              <p className="leading-7">
                Many sellers aim for about 30% or more after all costs, though target margin varies by category and business model.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#2F3A56]">Should shipping be included in Etsy pricing?</h3>
              <p className="leading-7">Yes. Shipping cost is part of your real cost and should be included when setting prices.</p>

              <h3 className="pt-2 text-lg font-semibold text-[#2F3A56]">Do Etsy fees make pricing harder?</h3>
              <p className="leading-7">
                Yes. Multiple fee types can apply to one order, which is why testing your numbers before listing is important.
              </p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
