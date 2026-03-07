import type { Metadata } from "next";
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
      "@type": "WebApplication",
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
      siteName: "TrueMargin"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
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
    </>
  );
}
