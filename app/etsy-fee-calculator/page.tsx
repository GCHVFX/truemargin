import type { Metadata } from "next";
import Script from "next/script";
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
          "name": 'How does the Etsy fee calculator work?',
          "acceptedAnswer": {
            "@type": "Answer",
            "text": 'Enter item price, shipping charged, and your settings (like offsite ads). It estimates each fee line item and the total fees for the sale.'
          }
        },
        {
          "@type": "Question",
          "name": 'What Etsy fees are included?',
          "acceptedAnswer": {
            "@type": "Answer",
            "text": 'Typically: listing, transaction, payment processing, and optional offsite ads. Country-based taxes may apply depending on the order.'
          }
        },
        {
          "@type": "Question",
          "name": 'Can I compare fees with and without offsite ads?',
          "acceptedAnswer": {
            "@type": "Answer",
            "text": 'Yes. Toggle offsite ads to see how the profit and fee totals change.'
          }
        },
        {
          "@type": "Question",
          "name": 'Is this calculator free?',
          "acceptedAnswer": {
            "@type": "Answer",
            "text": 'Yes. Unlimited single calculations are free.'
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
      <CalculatorPage variant='etsy-fee-calculator' />
    </>
  );
}
