import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { OffsiteAdsCalculator } from "@/components/OffsiteAdsCalculator";
import { CalculatorSwitcher } from "@/components/CalculatorSwitcher";

const CANONICAL = "https://gettruemargin.com/etsy-offsite-ads-calculator";

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "Etsy Offsite Ads Calculator — Threshold & Margin Impact (2026)",
      description:
        "See how close you are to Etsy's $10K Offsite Ads threshold and exactly how enrollment affects your profit per order. Free, no signup.",
      url: CANONICAL,
      isPartOf: {
        "@type": "WebSite",
        name: "TrueMargin",
        url: "https://gettruemargin.com",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${CANONICAL}#app`,
      name: "Etsy Offsite Ads Calculator",
      url: CANONICAL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      isAccessibleForFree: true,
      creator: {
        "@type": "Organization",
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
          name: "What is the Etsy Offsite Ads threshold?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Etsy automatically enrolls sellers in Offsite Ads once their total Etsy sales exceed $10,000 in the past 365 days. Below $10K, participation is optional. Above $10K, the 12% fee is mandatory and cannot be turned off.",
          },
        },
        {
          "@type": "Question",
          name: "What percentage does Etsy charge for Offsite Ads?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sellers under the $10,000 threshold pay 15% on sales attributed to Offsite Ads. Sellers over the threshold pay 12% — a lower rate, but it becomes mandatory and cannot be opted out of.",
          },
        },
        {
          "@type": "Question",
          name: "How does Offsite Ads affect my profit per order?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "When an Offsite Ads fee applies, it is calculated on the total order value including shipping charged. On a $35 sale, a 15% fee adds $5.25 to your fee total, directly reducing net profit by the same amount.",
          },
        },
        {
          "@type": "Question",
          name: "Can I opt out of Etsy Offsite Ads?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sellers under $10,000 in annual Etsy sales can opt out of Offsite Ads entirely in their shop settings. Sellers over $10,000 cannot opt out — enrollment is mandatory at the 12% rate.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Etsy Offsite Ads Calculator — Threshold & Margin Impact (2026)";
  const description =
    "See how close you are to Etsy's $10K Offsite Ads threshold and exactly how enrollment affects your profit per order. Free, no signup.";

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
      images: [
        {
          url: "https://gettruemargin.com/og-image.png",
          width: 1200,
          height: 630,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://gettruemargin.com/og-image.png"],
    },
  };
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd() }}
      />

      <h1 className="sr-only">Etsy Offsite Ads Calculator</h1>

      <div className="calculator-page-bg min-h-screen">
        <div className="mx-auto max-w-3xl px-4 pt-10 pb-6 sm:pt-14">
          <h2 className="text-3xl font-semibold tracking-tight text-[#EAF0FF] sm:text-4xl">
            Etsy Offsite Ads Calculator
          </h2>
          <p className="mt-3 text-base leading-7 text-[#9AA6BF]">
            See how close you are to the $10K mandatory enrollment threshold and exactly how Offsite Ads affects your
            profit per order.
          </p>
          <CalculatorSwitcher dark={true} current="offsite-ads" />
        </div>

        <div className="mx-auto max-w-3xl px-4">
          <Suspense fallback={null}>
            <OffsiteAdsCalculator />
          </Suspense>
        </div>

        <section className="mx-auto max-w-3xl px-4 pt-6 pb-14 space-y-6">

            <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-7">
              <h2 className="text-xl font-semibold text-[#EAF0FF]">How the Etsy Offsite Ads Threshold Works</h2>
              <p className="mt-4 text-base leading-7 text-[#9AA6BF]">
                Etsy runs an advertising program that promotes listings on Google, Facebook, Instagram, Pinterest, and
                Bing. When a buyer clicks one of these ads and purchases within 30 days, Etsy charges the seller an
                Offsite Ads fee. The fee is 15% for sellers under $10,000 in annual sales, and 12% for sellers over
                that threshold — but above $10K the fee becomes mandatory.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-7">
              <h2 className="text-xl font-semibold text-[#EAF0FF]">What the $10K Threshold Means for Your Shop</h2>
              <p className="mt-4 text-base leading-7 text-[#9AA6BF]">
                The threshold is based on your total Etsy sales in the past 365 days, not the calendar year. Once you
                cross it, Etsy automatically enrolls you and the 12% fee applies to any sale attributed to Offsite Ads.
                You cannot opt out. Many sellers cross the threshold without realising the impact on their margins until
                they see their statement.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-7">
              <h2 className="text-xl font-semibold text-[#EAF0FF]">How Offsite Ads Fees Are Calculated</h2>
              <p className="mt-4 text-base leading-7 text-[#9AA6BF]">
                The fee applies to the total order value Etsy receives — item price plus any shipping you charge the
                buyer. On a $40 sale with $5 shipping, the fee base is $45. At 15%, that's $6.75. At 12%, it's $5.40.
                Combined with listing, transaction, and processing fees, total fees on an attributed sale can exceed 25%
                of order value.
              </p>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-7">
              <h3 className="text-xl font-semibold text-[#EAF0FF]">Related Etsy Calculators</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <Link
                  href="/etsy-profit-calculator"
                  className="rounded-lg border border-white/15 bg-[#10182A]/70 p-4 text-lg font-semibold text-[#EAF0FF] transition hover:bg-[#10182A]"
                >
                  Etsy Profit Calculator
                  <span className="mt-1 block text-base font-normal text-[#D6DEEE]">
                    See what you actually keep after all fees and costs.
                  </span>
                </Link>
                <Link
                  href="/etsy-fee-calculator"
                  className="rounded-lg border border-white/15 bg-[#10182A]/70 p-4 text-lg font-semibold text-[#EAF0FF] transition hover:bg-[#10182A]"
                >
                  Etsy Fee Calculator
                  <span className="mt-1 block text-base font-normal text-[#D6DEEE]">
                    Estimate Etsy fees for one order with your inputs.
                  </span>
                </Link>
                <Link
                  href="/etsy-break-even-calculator"
                  className="rounded-lg border border-white/15 bg-[#10182A]/70 p-4 text-lg font-semibold text-[#EAF0FF] transition hover:bg-[#10182A]"
                >
                  Etsy Break-Even Calculator
                  <span className="mt-1 block text-base font-normal text-[#D6DEEE]">
                    Find your minimum safe price before you list.
                  </span>
                </Link>
                <Link
                  href="/etsy-pricing-calculator"
                  className="rounded-lg border border-white/15 bg-[#10182A]/70 p-4 text-lg font-semibold text-[#EAF0FF] transition hover:bg-[#10182A]"
                >
                  Etsy Pricing Calculator
                  <span className="mt-1 block text-base font-normal text-[#D6DEEE]">
                    Set your Etsy price to hit your target margin.
                  </span>
                </Link>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-7">
              <h2 className="text-xl font-semibold text-[#EAF0FF]">Frequently Asked Questions</h2>
              <div className="mt-4 space-y-3">
                {[
                  {
                    q: "What is the Etsy Offsite Ads threshold?",
                    a: "Etsy automatically enrolls sellers in Offsite Ads once their total Etsy sales exceed $10,000 in the past 365 days. Below $10K, participation is optional. Above $10K, the 12% fee is mandatory and cannot be turned off.",
                  },
                  {
                    q: "What percentage does Etsy charge for Offsite Ads?",
                    a: "Sellers under the $10,000 threshold pay 15% on sales attributed to Offsite Ads. Sellers over the threshold pay 12% — a lower rate, but it becomes mandatory and cannot be opted out of.",
                  },
                  {
                    q: "How does Offsite Ads affect my profit per order?",
                    a: "When an Offsite Ads fee applies, it is calculated on the total order value including shipping charged. On a $35 sale, a 15% fee adds $5.25 to your fee total, directly reducing net profit by the same amount.",
                  },
                  {
                    q: "Can I opt out of Etsy Offsite Ads?",
                    a: "Sellers under $10,000 in annual Etsy sales can opt out of Offsite Ads entirely in their shop settings. Sellers over $10,000 cannot opt out — enrollment is mandatory at the 12% rate.",
                  },
                ].map((item) => (
                  <details
                    key={item.q}
                    className="group rounded-xl border border-white/10 bg-[#10182A]/60 overflow-hidden"
                  >
                    <summary className="cursor-pointer px-5 py-4 text-base font-semibold text-[#EAF0FF] transition hover:bg-white/5">
                      {item.q}
                    </summary>
                    <div className="border-t border-white/10 px-5 py-4">
                      <p className="text-base leading-relaxed text-[#D6DEEE]">{item.a}</p>
                    </div>
                  </details>
                ))}
              </div>
            </div>

          </section>
        </div>
    </>
  );
}
