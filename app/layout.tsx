import type { Metadata } from "next";
import Script from "next/script";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const BASE_URL = "https://gettruemargin.com";

// Default metadata — individual pages override title/description/canonical.
// The template means a page with title "Etsy Profit Calculator" renders as
// "Etsy Profit Calculator | TrueMargin" in the browser tab.
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "TrueMargin — Etsy Profit & Fee Calculators for Sellers",
    template: "%s | TrueMargin",
  },
  description:
    "Free Etsy profit, fee, break-even, and pricing calculators. See exactly what you keep after every Etsy fee — no account required.",
  applicationName: "TrueMargin",
  authors: [{ name: "TrueMargin", url: BASE_URL }],
  keywords: [
    "etsy profit calculator",
    "etsy fee calculator",
    "etsy fees",
    "how much does etsy take",
    "etsy seller tools",
    "etsy margin calculator",
  ],
  openGraph: {
    type: "website",
    siteName: "TrueMargin",
    url: BASE_URL,
    title: "TrueMargin — Etsy Profit & Fee Calculators",
    description:
      "Free Etsy profit, fee, break-even, and pricing calculators. See exactly what you keep after every Etsy fee.",
    images: [
      {
        url: `${BASE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "TrueMargin — Etsy Profit & Fee Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TrueMargin — Etsy Profit & Fee Calculators",
    description:
      "Free Etsy profit, fee, break-even, and pricing calculators. See exactly what you keep after every Etsy fee.",
    images: [`${BASE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

// Site-level schema — rendered inline so it's in the initial HTML.
// Organization tells Google/AI systems who runs this site.
// WebSite enables the sitelinks search box in search results.
const SITE_SCHEMA = JSON.stringify([
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${BASE_URL}/#organization`,
    name: "TrueMargin",
    url: BASE_URL,
    logo: {
      "@type": "ImageObject",
      url: `${BASE_URL}/logo.png`,
      width: 512,
      height: 512,
    },
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      email: "support@gettruemargin.com",
      contactType: "customer support",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    name: "TrueMargin",
    url: BASE_URL,
    publisher: { "@id": `${BASE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/etsy-profit-calculator`,
      },
      "query-input": "required name=search_term_string",
    },
  },
]);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Site-level schema — inline so it's in the initial HTML response */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: SITE_SCHEMA }}
        />
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-82L1R5S3WB"
          strategy="afterInteractive"
        />
        <Script
          defer
          src="https://cloud.umami.is/script.js"
          data-website-id="e9bcfee7-7089-4ed0-9657-037806d8742e"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-82L1R5S3WB');
          `}
        </Script>
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <div className="flex flex-1 flex-col">{children}</div>
        <Footer />
      </body>
    </html>
  );
}