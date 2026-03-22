import type { MetadataRoute } from "next";

const baseUrl = "https://gettruemargin.com";

/** Update when price page content changes */
const PRICE_PAGES_DATE = "2026-03-21";

/** Homepage, calculators, informational, regional — update when content changes */
const CORE_PAGES_DATE = "2026-03-21";

/** Legal pages — update only when terms/privacy change */
const LEGAL_PAGES_DATE = "2025-01-01";

// All price points that have actual page directories in /app
const pricePoints = [
  10, 12, 15, 18, 20, 25, 30, 35, 40, 50, 60, 75, 80,
  100, 120, 150, 200, 250, 300, 400, 500, 750,
];

const pricePageRoutes: MetadataRoute.Sitemap = pricePoints.map((price) => ({
  url: `${baseUrl}/etsy-fees-on-${price}-dollar-sale`,
  lastModified: PRICE_PAGES_DATE,
  changeFrequency: "monthly" as const,
  priority: 0.6,
}));

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ── Homepage ────────────────────────────────────────────────
    {
      url: baseUrl,
      lastModified: CORE_PAGES_DATE,
      changeFrequency: "weekly",
      priority: 1.0,
    },

    // ── Core calculators — highest-intent pages ──────────────────
    {
      url: `${baseUrl}/etsy-profit-calculator`,
      lastModified: CORE_PAGES_DATE,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/etsy-fee-calculator`,
      lastModified: CORE_PAGES_DATE,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/etsy-break-even-calculator`,
      lastModified: CORE_PAGES_DATE,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/etsy-pricing-calculator`,
      lastModified: CORE_PAGES_DATE,
      changeFrequency: "weekly",
      priority: 0.9,
    },

    // ── High-value informational / hub pages ─────────────────────
    {
      url: `${baseUrl}/etsy-fees-explained`,
      lastModified: CORE_PAGES_DATE,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/how-much-does-etsy-take`,
      lastModified: CORE_PAGES_DATE,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/etsy-profit-margin`,
      lastModified: CORE_PAGES_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/how-to-price-etsy-products`,
      lastModified: CORE_PAGES_DATE,
      changeFrequency: "monthly",
      priority: 0.8,
    },

    // ── Regional fee pages ────────────────────────────────────────
    {
      url: `${baseUrl}/etsy-fees`,
      lastModified: CORE_PAGES_DATE,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/etsy-fees-us`,
      lastModified: CORE_PAGES_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/etsy-fees-canada`,
      lastModified: CORE_PAGES_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    },

    // ── Legal — low priority but should be indexed ───────────────
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: LEGAL_PAGES_DATE,
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: LEGAL_PAGES_DATE,
      changeFrequency: "yearly",
      priority: 0.2,
    },

    // ── Programmatic price pages ─────────────────────────────────
    ...pricePageRoutes,
  ];
}


