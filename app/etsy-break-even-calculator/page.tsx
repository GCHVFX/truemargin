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
      <section className="bg-[#F7F8FA] py-10 sm:py-14">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <div className="rounded-2xl bg-white p-6 text-slate-800 shadow-sm ring-1 ring-slate-200 sm:p-10">
            <h2 className="text-2xl font-semibold text-[#2F3A56]">How the Etsy Break-even Calculator Works</h2>
            <p className="mt-4 leading-7">
              This calculator estimates the minimum price required to avoid losing money after Etsy fees, cost of goods, and shipping.
            </p>

            <div className="mt-6 rounded-lg bg-slate-50 px-4 py-3 text-sm font-medium text-[#2F3A56] sm:text-base">
              Break-even Price = Total costs + Estimated Etsy fees
              <br />
              Break-even per Unit = Break-even order total / Quantity
            </div>

            <h3 className="mt-8 text-lg font-semibold text-[#2F3A56]">What this calculator uses</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 leading-7">
              <li>quantity</li>
              <li>shipping charged</li>
              <li>cost of goods per unit</li>
              <li>shipping cost</li>
              <li>seller region fee preset</li>
              <li>optional Offsite Ads</li>
            </ul>

            <h3 className="mt-8 text-lg font-semibold text-[#2F3A56]">Example Break-even Calculation</h3>
            <p className="mt-3 leading-7">
              Quantity: 1
              <br />
              Cost of goods: $10
              <br />
              Shipping cost: $5
              <br />
              Estimated Etsy fees: $4
            </p>
            <p className="mt-3 leading-7">
              Break-even order total: $19
              <br />
              Break-even price per unit: $19
            </p>
            <p className="mt-3 text-sm leading-6 text-slate-700">
              Exact results change with seller fee region preset, shipping inputs, and Offsite Ads settings.
            </p>

            <h2 className="mt-10 text-2xl font-semibold text-[#2F3A56]">Related Etsy Calculators</h2>
            <p className="mt-3 leading-7">
              After finding your minimum safe price, compare scenarios with the{" "}
              <Link href="/etsy-profit-calculator" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                Etsy Profit Calculator
              </Link>{" "}
              and the{" "}
              <Link href="/etsy-fee-calculator" className="font-semibold text-[#2F3A56] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                Etsy Fee Calculator
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
