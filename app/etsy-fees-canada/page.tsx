import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://gettruemargin.com/etsy-fees-canada";

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "Etsy Fees in Canada",
      description:
        "Learn how Etsy fees work for Canadian sellers, including listing fees, transaction fees, payment processing, and optional Offsite Ads. Estimate your exact Etsy fees with TrueMargin.",
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
          name: "How much does Etsy charge Canadian sellers?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Canadian sellers usually see listing, transaction, payment processing, and possible Offsite Ads fees, with totals affected by order details and tax treatment.",
          },
        },
        {
          "@type": "Question",
          name: "Does Etsy charge fees on shipping in Canada?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In many cases, yes. Some Etsy fees can be calculated on sale-related revenue, including shipping charged to buyers.",
          },
        },
        {
          "@type": "Question",
          name: "Do Canadian Etsy sellers pay Offsite Ads fees on every sale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Offsite Ads fees apply only when Etsy attributes a sale to offsite advertising.",
          },
        },
        {
          "@type": "Question",
          name: "How do I calculate Etsy fees in Canada?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Estimate listing, transaction, and payment processing fees in CAD, then include Offsite Ads when relevant. The Etsy Fee Calculator can model this quickly.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Etsy Fees in Canada (Seller Fee Breakdown) | TrueMargin";
  const description =
    "Learn how Etsy fees work for Canadian sellers, including listing fees, transaction fees, payment processing, and optional Offsite Ads. Estimate your exact Etsy fees with TrueMargin.";

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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd() }} />

      <main className="calculator-page-bg min-h-screen py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <article className="rounded-2xl border border-white/10 bg-white/5 p-6 text-[#EAF0FF] sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#EAF0FF] sm:text-4xl">Etsy Fees in Canada</h1>
            <p className="mt-5 text-base leading-7 text-[#9AA6BF]">
              Canadian Etsy sellers usually pay a $0.20 listing fee, a 6.5% transaction fee, about 3% + $0.25 CAD in payment processing, and
              optional Offsite Ads fees when applicable.
            </p>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#9AA6BF]">Want the exact fee breakdown for your Canadian Etsy sale?</p>
              <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">
                Use the Etsy Fee Calculator to estimate listing, transaction, processing, and ad fees in seconds.
              </p>
              <Link
                href="/etsy-fee-calculator"
                className="mt-4 inline-flex items-center rounded-md bg-[#2F3A56] px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
              >
                Try the Etsy Fee Calculator
              </Link>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">What Fees Does Etsy Charge Canadian Sellers?</h2>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Listing fee:</strong> A fixed amount when listings are published or renewed.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Transaction fee:</strong> 6.5% of sale-related revenue.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Payment processing:</strong> Canada seller processing is often around 3% + $0.25 CAD.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Offsite Ads:</strong> Extra ad fees apply only when Etsy attributes the order to offsite ads.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                Exchange-rate effects and taxes can influence final totals, so running your own numbers is important.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Example: Etsy Fees on a Canadian Sale</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Item price: $40 CAD
                <br />
                Shipping charged: $8 CAD
                <br />
                Listing fee: $0.20
                <br />
                Transaction fee: 6.5% of sale-related revenue
                <br />
                Payment processing: about 3% + $0.25 CAD
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                Exact totals depend on the order structure, currency effects, and whether Offsite Ads applies.
              </p>
            </section>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#9AA6BF]">Check your real Etsy fees before you price your product</p>
              <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">Use the Etsy Fee Calculator for a more precise estimate.</p>
              <Link
                href="/etsy-fee-calculator"
                className="mt-4 inline-flex items-center rounded-md border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
              >
                Calculate Etsy Fees
              </Link>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Why Etsy Fees Matter for Canadian Sellers</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Fees can compress margin quickly when product costs and shipping are layered in. Use the{" "}
                <Link href="/etsy-profit-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  Etsy Profit Calculator
                </Link>{" "}
                to model take-home profit and the{" "}
                <Link
                  href="/etsy-break-even-calculator"
                  className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2"
                >
                  Etsy Break-even Calculator
                </Link>{" "}
                to set safer minimum listing prices.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">FAQ</h2>

              <h3 className="text-lg font-semibold text-[#EAF0FF]">How much does Etsy charge Canadian sellers?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                Typical Canadian seller fees include listing, transaction, payment processing, and possible Offsite Ads depending on the order.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Does Etsy charge fees on shipping in Canada?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                In many cases, yes. Some Etsy fees can be applied to sale-related revenue that includes shipping charged.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Do Canadian Etsy sellers pay Offsite Ads fees on every sale?</h3>
              <p className="leading-7 text-[#9AA6BF]">No. Offsite Ads fees only apply on sales attributed to Etsy offsite advertising.</p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">How do I calculate Etsy fees in Canada?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                Estimate listing, transaction, and payment processing in CAD, then include Offsite Ads when relevant. The{" "}
                <Link href="/etsy-fee-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  Etsy Fee Calculator
                </Link>{" "}
                can do this automatically.
              </p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
