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

      <main className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-semibold tracking-tight">How Much Does Etsy Take Per Sale?</h1>
        <p className="mt-4">
          Etsy charges multiple fees on each order, so what you keep is usually less than the item price. Most sellers pay a mix of listing,
          transaction, payment processing, and sometimes offsite ad fees.
        </p>

        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">Etsy Fees Explained</h2>
          <p>
            <strong>Listing fee:</strong> A fixed fee to publish an item listing. It is charged when the listing is created or renewed.
          </p>
          <p>
            <strong>Transaction fee:</strong> A percentage-based fee on the order value, typically applied when an item sells.
          </p>
          <p>
            <strong>Payment processing:</strong> A processing charge for handling the buyer&apos;s payment, often a percentage plus a small fixed amount.
          </p>
          <p>
            <strong>Offsite ads:</strong> If a sale is attributed to Etsy&apos;s offsite advertising, an additional ad fee may apply.
          </p>
          <p>
            <strong>Regulatory fees (where applicable):</strong> Some regions include extra required charges tied to local rules.
          </p>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">Example: How Etsy Fees Affect a $25 Sale</h2>
          <p>
            On a $25 order, Etsy does not just take one flat percentage. Instead, the final total can include the listing fee, transaction fee,
            payment processing, and optional ad-related charges. When those are combined, your net payout can be several dollars lower than your
            sale price.
          </p>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">Calculate Your Real Etsy Fees</h2>
          <p>
            For a precise estimate based on your order details, use the{" "}
            <Link href="/etsy-fee-calculator" className="font-semibold underline">
              Etsy Fee Calculator
            </Link>
            .
          </p>
        </section>

        <section className="mt-8 space-y-4">
          <h2 className="text-xl font-semibold">FAQ</h2>
          <h3 className="text-lg font-medium">What percentage does Etsy take?</h3>
          <p>
            There is no single percentage. The total depends on which fee types apply to your order and seller region.
          </p>

          <h3 className="text-lg font-medium">Do Etsy fees include shipping?</h3>
          <p>
            In many cases, certain Etsy fees are calculated on the amount paid by the buyer, which can include shipping charged.
          </p>

          <h3 className="text-lg font-medium">Are Etsy fees different by country?</h3>
          <p>Yes. Processing rates and region-specific charges can vary, so fee totals may differ by country.</p>
        </section>
      </main>
    </>
  );
}
