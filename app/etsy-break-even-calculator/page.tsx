import type { Metadata } from "next";
import Script from "next/script";
import { CalculatorPage } from "@/components/CalculatorPage";

const CANONICAL = 'https://gettruemargin.com/etsy-break-even-calculator';

function jsonLd() {
  const data = [
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
      "description": 'Calculate the minimum Etsy item price needed to cover fees, cost of goods, and shipping so you do not lose money on a sale.',
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
          "name": 'What is an Etsy break-even price?',
          "acceptedAnswer": {
            "@type": "Answer",
            "text": 'It is the minimum price you need to charge so Etsy fees, shipping, and your cost of goods are fully covered, leaving you at $0 profit.'
          }
        },
        {
          "@type": "Question",
          "name": 'Does break-even include offsite ads?',
          "acceptedAnswer": {
            "@type": "Answer",
            "text": 'If you toggle offsite ads on, the calculator includes them so your break-even price reflects that extra cost.'
          }
        },
        {
          "@type": "Question",
          "name": 'Can this help me set a safer price?',
          "acceptedAnswer": {
            "@type": "Answer",
            "text": 'Yes. Once you know break-even, you can add your target profit on top instead of guessing.'
          }
        },
        {
          "@type": "Question",
          "name": 'Is this calculator free to use?',
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
