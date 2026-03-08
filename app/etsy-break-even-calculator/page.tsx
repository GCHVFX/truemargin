import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Suspense } from "react";
import { CalculatorPage } from "@/components/CalculatorPage";

const CANONICAL = 'https://gettruemargin.com/etsy-break-even-calculator';

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": CANONICAL + "#webpage",
      "name": "Etsy Break-even Calculator",
      "description": "Find your minimum price to cover fees and costs. Get the break-even price per unit so you don't lose money on a sale.",
      "url": CANONICAL,
      "isPartOf": {
        "@type": "WebSite",
        "name": "TrueMargin",
        "url": "https://gettruemargin.com"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://gettruemargin.com/" },
        { "@type": "ListItem", "position": 2, "name": "Etsy Calculators", "item": "https://gettruemargin.com/etsy-profit-calculator" },
        { "@type": "ListItem", "position": 3, "name": 'Etsy Break-even Calculator', "item": CANONICAL }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": CANONICAL + "#app",
      "name": 'Etsy Break-even Calculator',
      "url": CANONICAL,
      "description": "Calculate the minimum item price per unit to cover Etsy fees, cost of goods, and shipping. Set a safe minimum price for your listings.",
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "All",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/InStock"
      },
      "isAccessibleForFree": true,
      "creator": {
        "@type": "Organization",
        "name": "TrueMargin",
        "url": "https://gettruemargin.com"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": CANONICAL + "#faq",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "What is break-even price?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It's the minimum price per unit required to make $0 profit after fees and costs, based on the inputs you provide."
          }
        },
        {
          "@type": "Question",
          "name": "Does break-even include shipping?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. The calculator considers shipping charged and your shipping cost, and models fees on the combined revenue where applicable."
          }
        },
        {
          "@type": "Question",
          "name": "Can I use this for multi-quantity orders?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Yes. Set Quantity to match the order and enter cost of goods per unit. Results are per order, with break-even shown per unit."
          }
        }
      ]
    }
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Etsy Break-even Calculator (Minimum Price After Fees) | TrueMargin';
  const description = 'Calculate the minimum Etsy item price needed to cover fees, cost of goods, and shipping. Get your break-even price instantly.';

  return {
    title,
    description,
    alternates: { canonical: CANONICAL },
    openGraph: {
      type: "website",
      url: CANONICAL,
      title,
      description,
      siteName: "TrueMargin",
      images: [
        {
          url: "https://gettruemargin.com/og/etsy-break-even-calculator.png",
          width: 1200,
          height: 630,
          alt: "TrueMargin Etsy Break-even Calculator"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://gettruemargin.com/og/etsy-break-even-calculator.png"]
    }
  };
}

export default function Page() {
  return (
    <>
      <Script
        id='tm-etsy-break-even-jsonld'
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: jsonLd() }}
      />
      <Suspense fallback={null}>
        <CalculatorPage variant='etsy-break-even-calculator' />
      </Suspense>
      <section className="mx-auto max-w-5xl px-4 pb-12">
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-[#EAF0FF]">How the Etsy Break-even Calculator Works</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#9AA6BF]">
              This calculator estimates the minimum price required to avoid losing money after Etsy fees, cost of goods, and shipping.
            </p>

            <div className="mt-4 rounded-lg border border-white/10 bg-[#10182A]/60 px-4 py-3 text-sm font-medium text-[#EAF0FF]">
              Break-even Price = Total costs + Estimated Etsy fees
              <br />
              Break-even per Unit = Break-even order total / Quantity
            </div>

            <h3 className="mt-6 text-sm font-medium text-[#EAF0FF]">What this calculator uses</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#9AA6BF]">
              <li>quantity</li>
              <li>shipping charged</li>
              <li>cost of goods per unit</li>
              <li>shipping cost</li>
              <li>seller region fee preset</li>
              <li>optional Offsite Ads</li>
            </ul>

            <h3 className="mt-6 text-sm font-medium text-[#EAF0FF]">Example Break-even Calculation</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#9AA6BF]">
              Quantity: 1
              <br />
              Cost of goods: $10
              <br />
              Shipping cost: $5
              <br />
              Estimated Etsy fees: $4
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#9AA6BF]">
              Break-even order total: $19
              <br />
              Break-even price per unit: $19
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#9AA6BF]">
              Exact results change with seller fee region preset, shipping inputs, and Offsite Ads settings.
            </p>

            <h2 className="mt-8 text-lg font-semibold text-[#EAF0FF]">Related Etsy Calculators</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#9AA6BF]">
              After finding your minimum safe price, compare scenarios with the{" "}
              <Link href="/etsy-profit-calculator" className="font-semibold text-[#EAF0FF] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                Etsy Profit Calculator
              </Link>{" "}
              and the{" "}
              <Link href="/etsy-fee-calculator" className="font-semibold text-[#EAF0FF] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                Etsy Fee Calculator
              </Link>
              .
            </p>
        </div>
      </section>
    </>
  );
}
