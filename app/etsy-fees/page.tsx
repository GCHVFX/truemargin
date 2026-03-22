import type { Metadata } from "next";
import Link from "next/link";

const CANONICAL = "https://gettruemargin.com/etsy-fees";

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "Etsy Fees Explained",
      description:
        "Learn the full Etsy fee structure including listing fees, transaction fees, payment processing, offsite ads, and region-based charges. Calculate your exact Etsy fees with TrueMargin.",
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
          name: "What percentage does Etsy take in fees?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "There is no single percentage. Etsy fees usually combine listing, transaction, and payment processing charges, with possible offsite ad and regional fees depending on the order.",
          },
        },
        {
          "@type": "Question",
          name: "Does Etsy charge fees on shipping?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In many cases, yes. Certain Etsy fees can apply to the total paid by the buyer, including shipping charged.",
          },
        },
        {
          "@type": "Question",
          name: "Are Etsy fees the same in every country?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Payment processing rates and region-based charges can vary by country, so total fees differ by seller location.",
          },
        },
        {
          "@type": "Question",
          name: "Do offsite ads apply to every sale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Offsite ad fees only apply when Etsy attributes a sale to its offsite advertising.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Etsy Fees Explained (Full Seller Fee Breakdown) | TrueMargin";
  const description =
    "Learn the full Etsy fee structure including listing fees, transaction fees, payment processing, offsite ads, and region-based charges. Calculate your exact Etsy fees with TrueMargin.";

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
            <h1 className="text-3xl font-semibold tracking-tight text-[#EAF0FF] sm:text-4xl">Etsy Fees Explained</h1>
            <p className="mt-5 text-base leading-7 text-[#9AA6BF]">
              Etsy fees usually include a listing fee, transaction fee, and payment processing fee, with possible offsite ad or regulatory charges
              depending on the order and seller region.
            </p>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#9AA6BF]">Want the exact fee breakdown for your sale?</p>
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
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">What Fees Does Etsy Charge?</h2>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Listing fee:</strong> A fixed charge when you publish or renew a listing.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Transaction fee:</strong> A percentage fee Etsy takes when your product sells.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Payment processing fee:</strong> A processing charge on buyer payments, often a percentage plus a fixed amount.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Offsite ads:</strong> An additional fee if Etsy attributes the sale to offsite advertising.
              </p>
              <p className="leading-7 text-[#9AA6BF]">
                <strong>Regulatory operating fee / region-based charges:</strong> Extra charges may apply in certain regions.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Example: Etsy Fees on a Typical Sale</h2>
              <p className="leading-7 text-[#9AA6BF]">
                If you sell an item for $30, Etsy can apply multiple charges at once, such as listing, transaction, and payment processing fees.
                If offsite ads were involved, that fee can be added too. Together, these reduce the final amount you keep.
              </p>
            </section>

            <section className="mt-8 rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#9AA6BF]">See your real Etsy fees before you price your product</p>
              <p className="mt-2 text-sm leading-6 text-[#9AA6BF]">Check your numbers with the Etsy Fee Calculator.</p>
              <Link
                href="/etsy-fee-calculator"
                className="mt-4 inline-flex items-center rounded-md border border-white/20 bg-white/5 px-4 py-2 text-sm font-semibold text-[#EAF0FF] transition hover:bg-white/10"
              >
                Calculate Etsy Fees
              </Link>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">Why Etsy Fees Matter for Profit</h2>
              <p className="leading-7 text-[#9AA6BF]">
                Many sellers underprice when they only account for one fee. Looking at the full fee stack helps you set prices that protect margin,
                and you can also validate your numbers with the{" "}
                <Link href="/etsy-profit-calculator" className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2">
                  Etsy Profit Calculator
                </Link>{" "}
                or set safer minimums with the{" "}
                <Link
                  href="/etsy-break-even-calculator"
                  className="font-semibold text-[#6EE7B7] underline decoration-[#6EE7B7] decoration-2 underline-offset-2"
                >
                  Etsy Break-even Calculator
                </Link>
                .
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#EAF0FF]">FAQ</h2>

              <h3 className="text-lg font-semibold text-[#EAF0FF]">What percentage does Etsy take in fees?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                There is no single percentage. Total fees vary by order details, seller location, and whether extras like offsite ads apply.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Does Etsy charge fees on shipping?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                In many cases, yes. Certain Etsy fees are calculated on what the buyer pays, which can include shipping charged.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Are Etsy fees the same in every country?</h3>
              <p className="leading-7 text-[#9AA6BF]">
                No. Processing rates and region-based charges can differ by country, so total Etsy fees are not always identical globally.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#EAF0FF]">Do offsite ads apply to every sale?</h3>
              <p className="leading-7 text-[#9AA6BF]">No. Offsite ad fees only apply when Etsy attributes a sale to its external advertising.</p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
