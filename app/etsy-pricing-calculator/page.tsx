import type { Metadata } from "next";
import Script from "next/script";
import { Suspense } from "react";
import { CalculatorPage } from "@/components/CalculatorPage";

const CANONICAL = "https://gettruemargin.com/etsy-pricing-calculator";

function jsonLd() {
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${CANONICAL}#webpage`,
      name: "Etsy Pricing Calculator",
      description:
        "Find the Etsy price to charge for your target margin after fees, cost of goods, and shipping. See recommended price, net profit, and fee breakdown instantly.",
      url: CANONICAL,
      isPartOf: {
        "@type": "WebSite",
        name: "TrueMargin",
        url: "https://gettruemargin.com",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://gettruemargin.com/" },
        { "@type": "ListItem", position: 2, name: "Etsy Calculators", item: "https://gettruemargin.com/etsy-profit-calculator" },
        { "@type": "ListItem", position: 3, name: "Etsy Pricing Calculator", item: CANONICAL },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "@id": `${CANONICAL}#app`,
      name: "Etsy Pricing Calculator",
      url: CANONICAL,
      description:
        "Solve for the Etsy sale price required to hit your target margin after Etsy fees, cost of goods, and shipping cost.",
      applicationCategory: "BusinessApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      isAccessibleForFree: true,
      creator: {
        "@type": "Organization",
        name: "TrueMargin",
        url: "https://gettruemargin.com",
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${CANONICAL}#faq`,
      mainEntity: [
        {
          "@type": "Question",
          name: "How is the recommended Etsy price calculated?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The calculator solves for the sale price needed to hit your target margin after Etsy fees, cost of goods, and shipping cost.",
          },
        },
        {
          "@type": "Question",
          name: "Does this include Etsy payment processing and listing fees?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. It includes listing, transaction, payment processing, and optional Offsite Ads based on your selected seller region preset.",
          },
        },
        {
          "@type": "Question",
          name: "What if I turn on Offsite Ads?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "When Offsite Ads is enabled, the fee is included in the pricing math, which usually raises the recommended Etsy price required for your margin target.",
          },
        },
      ],
    },
  ];

  return JSON.stringify(data);
}

export async function generateMetadata(): Promise<Metadata> {
  const title = "Etsy Pricing Calculator (Price for Target Margin) | TrueMargin";
  const description =
    "Calculate the Etsy price you should charge to hit your target margin after fees, cost of goods, shipping, and optional Offsite Ads.";

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
          url: "https://gettruemargin.com/og/etsy-pricing-calculator.png",
          width: 1200,
          height: 630,
          alt: "TrueMargin Etsy Pricing Calculator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["https://gettruemargin.com/og/etsy-pricing-calculator.png"],
    },
  };
}

export default function Page() {
  return (
    <>
      <Script
        id="tm-etsy-pricing-jsonld"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{ __html: jsonLd() }}
      />
      <Suspense fallback={null}>
        <CalculatorPage variant="etsy-pricing-calculator" />
      </Suspense>
    </>
  );
}
