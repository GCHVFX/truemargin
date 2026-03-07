import type { Metadata } from "next";
import Script from "next/script";
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
      "@type": "WebApplication",
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
        id='tm-etsy-break-even-jsonld'
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: jsonLd() }}
      />
      <CalculatorPage variant='etsy-break-even-calculator' />
    </>
  );
}
