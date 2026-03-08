import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Suspense } from "react";
import { CalculatorPage } from "@/components/CalculatorPage";

const CANONICAL = 'https://gettruemargin.com/etsy-fee-calculator';

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": CANONICAL + "#webpage",
      "name": "Etsy Fee Calculator",
      "description": "See exactly how much Etsy takes per order. Estimate listing, transaction, payment processing, offsite ads, and shipping fees with a clear breakdown.",
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
        { "@type": "ListItem", "position": 3, "name": 'Etsy Fee Calculator', "item": CANONICAL }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": CANONICAL + "#app",
      "name": 'Etsy Fee Calculator',
      "url": CANONICAL,
      "description": "Estimate total Etsy fees per order: listing, transaction, payment processing, offsite ads, and shipping. See the fee breakdown instantly.",
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
          "name": "What fees does this Etsy fee calculator include?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "It estimates listing, transaction, and payment processing fees, plus optional Offsite Ads when enabled. Presets vary by seller region."
          }
        },
        {
          "@type": "Question",
          "name": "Do Etsy fees apply to shipping?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "Often, yes. This calculator applies fees to the combined revenue (item subtotal plus shipping charged) where applicable."
          }
        },
        {
          "@type": "Question",
          "name": "Is this an exact match to my Etsy statement?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text": "No. It's an estimate for planning and pricing. Your final statement can differ based on taxes, shop settings, and promotions."
          }
        }
      ]
    }
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Etsy Fee Calculator (How Much Etsy Takes) | TrueMargin';
  const description = 'Estimate Etsy fees per order with a clear breakdown: listing, transaction, processing, offsite ads, and shipping. See total fees instantly.';

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
          url: "https://gettruemargin.com/og/etsy-fee-calculator.png",
          width: 1200,
          height: 630,
          alt: "TrueMargin Etsy Fee Calculator"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://gettruemargin.com/og/etsy-fee-calculator.png"]
    }
  };
}

export default function Page() {
  return (
    <>
      <Script
        id='tm-etsy-fee-jsonld'
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: jsonLd() }}
      />
      <Suspense fallback={null}>
        <CalculatorPage variant='etsy-fee-calculator' />
      </Suspense>
      <section className="mx-auto max-w-5xl px-4 pb-14">
        <div className="space-y-6">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-7">
            <h2 className="text-2xl font-semibold text-[#EAF0FF]">How the Etsy Fee Calculator Works</h2>
            <p className="mt-4 text-base leading-8 text-[#D6DEEE]">
              This calculator estimates Etsy selling fees using your order value, shipping charged, seller region preset, and optional Offsite Ads.
            </p>

            <div className="mt-5 rounded-lg border border-white/15 bg-[#0F172A]/80 px-5 py-4 text-base font-medium leading-8 text-[#EAF0FF]">
              Estimated Etsy Fees = Listing fee + Transaction fee + Payment processing fee + Optional Offsite Ads fee + Any applicable regional fee
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-7">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-white/10 bg-[#10182A]/60 p-5">
                <h3 className="text-xl font-semibold text-[#EAF0FF]">What this calculator uses</h3>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-8 text-[#D6DEEE]">
                  <li>item price</li>
                  <li>quantity</li>
                  <li>shipping charged</li>
                  <li>seller region fee preset</li>
                  <li>Offsite Ads toggle</li>
                </ul>
              </div>

              <div className="rounded-lg border border-white/10 bg-[#10182A]/60 p-5">
                <h3 className="text-xl font-semibold text-[#EAF0FF]">Example Etsy Fee Calculation</h3>
                <p className="mt-4 text-base leading-8 text-[#D6DEEE]">
                  Item price: $25
                  <br />
                  Quantity: 1
                  <br />
                  Shipping charged: $0
                </p>
                <p className="mt-3 text-base leading-8 text-[#D6DEEE]">
                  Listing fee: $0.20
                  <br />
                  Transaction fee: $1.63
                  <br />
                  Payment processing: about $1.00
                </p>
                <p className="mt-3 text-base leading-8 text-[#D6DEEE]">
                  Estimated total Etsy fees: about $2.83
                </p>
                <p className="mt-3 text-base leading-8 text-[#D6DEEE]">
                  Fees can vary by country-specific payment rates and whether Offsite Ads applies.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-6 sm:p-7">
            <h2 className="text-2xl font-semibold text-[#EAF0FF]">Related Etsy Calculators</h2>
            <p className="mt-4 text-base leading-8 text-[#D6DEEE]">
              For full take-home and pricing planning, use the{" "}
              calculators below.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <Link
                href="/etsy-profit-calculator"
                className="rounded-lg border border-white/15 bg-[#10182A]/70 p-4 text-lg font-semibold text-[#EAF0FF] transition hover:bg-[#10182A]"
              >
                Etsy Profit Calculator
                <span className="mt-1 block text-base font-normal text-[#D6DEEE]">Calculate net profit and margin after fees.</span>
              </Link>
              <Link
                href="/etsy-break-even-calculator"
                className="rounded-lg border border-white/15 bg-[#10182A]/70 p-4 text-lg font-semibold text-[#EAF0FF] transition hover:bg-[#10182A]"
              >
                Etsy Break-even Calculator
                <span className="mt-1 block text-base font-normal text-[#D6DEEE]">Find your minimum safe listing price.</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
