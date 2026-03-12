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
      "description": "See exactly what Etsy takes per sale. Estimate listing, transaction, payment processing, and optional Offsite Ads fees.",
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
      "description": "Calculate exactly how much Etsy takes from each sale including listing, transaction, processing, and optional ad fees.",
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
  const title = "Etsy Fee Calculator - See What Etsy Takes";
  const description =
    "Calculate exactly how much Etsy takes from each sale including listing fees, transaction fees, payment processing, and optional ad fees.";

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
    </>
  );
}
