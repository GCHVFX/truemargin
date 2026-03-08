import type { Metadata } from "next";
import Link from "next/link";
import Script from "next/script";
import { Suspense } from "react";
import { CalculatorPage } from "@/components/CalculatorPage";

const CANONICAL = 'https://gettruemargin.com/etsy-profit-calculator';

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": CANONICAL + "#webpage",
      "name": "Etsy Profit Calculator",
      "description": "Calculate real Etsy profit per order after fees, cost of goods, and shipping. See net profit, margin, and a full fee breakdown instantly.",
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
        { "@type": "ListItem", "position": 3, "name": 'Etsy Profit Calculator', "item": CANONICAL }
      ]
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": "Etsy Profit Calculator",
      "url": CANONICAL,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Any",
      "description": "Calculate your real Etsy profit after fees, shipping, and costs. Instantly see what you keep from every order.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
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
          "name": 'What does this Etsy profit calculator include?',
          "acceptedAnswer": {
            "@type": "Answer",
            "text": 'It estimates net profit and margin after common Etsy fees: listing, transaction, payment processing, optional offsite ads, and country-specific taxes where applicable.'
          }
        },
        {
          "@type": "Question",
          "name": 'Does it account for shipping and cost of goods?',
          "acceptedAnswer": {
            "@type": "Answer",
            "text": 'Yes. You can include shipping charged to the buyer and your cost of goods so the result reflects what you keep per order.'
          }
        },
        {
          "@type": "Question",
          "name": 'Can I see how much Etsy takes per sale?',
          "acceptedAnswer": {
            "@type": "Answer",
            "text": 'Yes. The calculator shows an itemized breakdown so you can see each fee and the total impact on profit.'
          }
        },
        {
          "@type": "Question",
          "name": 'Is the calculator free to use?',
          "acceptedAnswer": {
            "@type": "Answer",
            "text": 'Yes. You can run unlimited single calculations with full fee transparency.'
          }
        }
      ]
    }
  ];

  return JSON.stringify(data);
}

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does Etsy take per sale?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Etsy fees can include listing fees, transaction fees, payment processing fees, and optional Offsite Ads fees depending on the order."
      }
    },
    {
      "@type": "Question",
      "name": "Does this Etsy profit calculator include shipping?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. You can include both shipping charged to the buyer and your own shipping cost to estimate real profit more accurately."
      }
    },
    {
      "@type": "Question",
      "name": "Does this calculator include Offsite Ads?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. You can toggle Offsite Ads on or off to see how Etsy ad fees affect your profit margin."
      }
    },
    {
      "@type": "Question",
      "name": "What is a healthy Etsy profit margin?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "It depends on the product, but many sellers aim for a margin that leaves room for fees, refunds, promotions, and rising costs."
      }
    }
  ]
};

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Etsy Profit Calculator (What You Keep After Fees) | TrueMargin';
  const description = 'Calculate Etsy profit and margin per order after listing, transaction, processing, offsite ads, and shipping. See a clear fee breakdown instantly.';

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
          url: "https://gettruemargin.com/og/etsy-profit-calculator.png",
          width: 1200,
          height: 630,
          alt: "TrueMargin Etsy Profit Calculator"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://gettruemargin.com/og/etsy-profit-calculator.png"]
    }
  };
}

export default function Page() {
  return (
    <>
      <Script
        id='tm-etsy-profit-jsonld'
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: jsonLd() }}
      />
      <Suspense fallback={null}>
        <CalculatorPage variant='etsy-profit-calculator' />
      </Suspense>
      <section className="mx-auto max-w-5xl px-4 pb-12">
        <div className="rounded-xl border border-white/10 bg-white/5 p-5 sm:p-6">
            <h2 className="text-lg font-semibold text-[#EAF0FF]">How the Etsy Profit Calculator Works</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#9AA6BF]">
              This calculator estimates what you keep after Etsy fees, cost of goods, and shipping. Profit margin is then calculated by dividing
              net profit by revenue.
            </p>

            <div className="mt-4 rounded-lg border border-white/10 bg-[#10182A]/60 px-4 py-3 text-sm font-medium text-[#EAF0FF]">
              Net Profit = Revenue - Etsy fees - Cost of goods - Shipping cost
              <br />
              Profit Margin = Net Profit / Revenue
            </div>

            <h3 className="mt-6 text-sm font-medium text-[#EAF0FF]">What this calculator uses</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-[#9AA6BF]">
              <li>item price</li>
              <li>quantity</li>
              <li>shipping charged</li>
              <li>cost of goods per unit</li>
              <li>shipping cost</li>
              <li>seller region fee preset</li>
              <li>optional Offsite Ads</li>
            </ul>

            <h3 className="mt-6 text-sm font-medium text-[#EAF0FF]">Example Profit Calculation</h3>
            <p className="mt-3 text-sm leading-relaxed text-[#9AA6BF]">
              Item price: $40
              <br />
              Quantity: 1
              <br />
              Shipping charged: $5
              <br />
              Revenue: $45
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#9AA6BF]">
              Estimated Etsy fees: $5
              <br />
              Cost of goods: $12
              <br />
              Shipping cost: $6
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#9AA6BF]">
              Net profit: $22
              <br />
              Profit margin: 48.9%
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#9AA6BF]">
              Exact results vary by seller region preset and Offsite Ads settings.
            </p>

            <h2 className="mt-8 text-lg font-semibold text-[#EAF0FF]">Related Etsy Calculators</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#9AA6BF]">
              Explore fee-only and break-even scenarios with the{" "}
              <Link href="/etsy-fee-calculator" className="font-semibold text-[#EAF0FF] underline decoration-[#F4A261] decoration-2 underline-offset-2">
                Etsy Fee Calculator
              </Link>{" "}
              and the{" "}
              <Link
                href="/etsy-break-even-calculator"
                className="font-semibold text-[#EAF0FF] underline decoration-[#F4A261] decoration-2 underline-offset-2"
              >
                Etsy Break-even Calculator
              </Link>
              .
            </p>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
