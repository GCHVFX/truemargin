import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";

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
      <Script
        id="tm-etsy-fees-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: jsonLd() }}
      />

      <main className="bg-[#F7F8FA] py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <article className="rounded-2xl bg-white p-6 text-slate-800 shadow-sm ring-1 ring-slate-200 sm:p-10">
            <h1 className="text-3xl font-semibold tracking-tight text-[#2F3A56] sm:text-4xl">Etsy Fees Explained</h1>
            <p className="mt-5 text-base leading-7">
              Etsy fees usually include a listing fee, transaction fee, and payment processing fee, with possible offsite ad or regulatory charges
              depending on the order and seller region.
            </p>

            <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#2F3A56]">Want the exact fee breakdown for your sale?</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">
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
              <h2 className="text-2xl font-semibold text-[#2F3A56]">What Fees Does Etsy Charge?</h2>
              <p className="leading-7">
                <strong>Listing fee:</strong> A fixed charge when you publish or renew a listing.
              </p>
              <p className="leading-7">
                <strong>Transaction fee:</strong> A percentage fee Etsy takes when your product sells.
              </p>
              <p className="leading-7">
                <strong>Payment processing fee:</strong> A processing charge on buyer payments, often a percentage plus a fixed amount.
              </p>
              <p className="leading-7">
                <strong>Offsite ads:</strong> An additional fee if Etsy attributes the sale to offsite advertising.
              </p>
              <p className="leading-7">
                <strong>Regulatory operating fee / region-based charges:</strong> Extra charges may apply in certain regions.
              </p>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Example: Etsy Fees on a Typical Sale</h2>
              <p className="leading-7">
                If you sell an item for $30, Etsy can apply multiple charges at once, such as listing, transaction, and payment processing fees.
                If offsite ads were involved, that fee can be added too. Together, these reduce the final amount you keep.
              </p>
            </section>

            <section className="mt-8 rounded-xl border border-[#F4A261]/35 bg-[#F4A261]/10 p-5 sm:p-6">
              <p className="text-sm font-medium uppercase tracking-wide text-[#2F3A56]">See your real Etsy fees before you price your product</p>
              <p className="mt-2 text-sm leading-6 text-slate-700">Check your numbers with the Etsy Fee Calculator.</p>
              <Link
                href="/etsy-fee-calculator"
                className="mt-4 inline-flex items-center rounded-md border border-[#2F3A56] bg-white px-4 py-2 text-sm font-semibold text-[#2F3A56] transition hover:bg-slate-50"
              >
                Calculate Etsy Fees
              </Link>
            </section>

            <section className="mt-12 space-y-4">
              <h2 className="text-2xl font-semibold text-[#2F3A56]">Why Etsy Fees Matter for Profit</h2>
              <p className="leading-7">
                Many sellers underprice when they only account for one fee. Looking at the full fee stack helps you set prices that protect margin,
                and you can also validate your numbers with the{" "}
                <Link href="/etsy-profit-calculator" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                  Etsy Profit Calculator
                </Link>{" "}
                or set safer minimums with the{" "}
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

              <h3 className="text-lg font-semibold text-[#2F3A56]">What percentage does Etsy take in fees?</h3>
              <p className="leading-7">
                There is no single percentage. Total fees vary by order details, seller location, and whether extras like offsite ads apply.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#2F3A56]">Does Etsy charge fees on shipping?</h3>
              <p className="leading-7">
                In many cases, yes. Certain Etsy fees are calculated on what the buyer pays, which can include shipping charged.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#2F3A56]">Are Etsy fees the same in every country?</h3>
              <p className="leading-7">
                No. Processing rates and region-based charges can differ by country, so total Etsy fees are not always identical globally.
              </p>

              <h3 className="pt-2 text-lg font-semibold text-[#2F3A56]">Do offsite ads apply to every sale?</h3>
              <p className="leading-7">No. Offsite ad fees only apply when Etsy attributes a sale to its external advertising.</p>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
