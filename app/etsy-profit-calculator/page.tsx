import type { Metadata } from "next";
import Script from "next/script";
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
      "@type": "WebApplication",
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
      "creator": {
        "@type": "Organization",
        "name": "TrueMargin"
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
        id='tm-etsy-profit-jsonld'
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: jsonLd() }}
      />
      <CalculatorPage variant='etsy-profit-calculator' />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
