import { EtsyCalculatorStaticContent } from "../../components/EtsyCalculatorStaticContent";
import type { Metadata } from "next";
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
      "description": "Calculate Etsy profit after fees, shipping, and costs. See net profit, margin, and a full fee breakdown per order.",
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
      "@id": CANONICAL + "#app",
      "name": "Etsy Profit Calculator",
      "url": CANONICAL,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Any",
      "description": "Calculate Etsy profit after listing, transaction, processing, and optional ad fees. See exactly what you keep from each sale.",
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

export async function generateMetadata(): Promise<Metadata> {
  const title = "Etsy Profit Calculator (2026) - Profit After Fees";
  const description =
    "Calculate Etsy profit after listing fees, transaction fees, payment processing, shipping, and costs. See net profit and margin clearly.";

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd() }}
      />
      <Suspense fallback={null}>
        <CalculatorPage variant='etsy-profit-calculator' />
        <EtsyCalculatorStaticContent contentKey="profit" />
      </Suspense>
    </>
  );
}
