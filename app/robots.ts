import type { MetadataRoute } from "next";

const baseUrl = "https://gettruemargin.com";

// Private routes — no SEO value, keep out of indexes
const PRIVATE_ROUTES = [
  "/api/",
  "/(auth)/",
  "/(dashboard)/",
  "/auth/",
  "/success",
  "/pricing",
  "/disclaimer",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Block training crawlers — we want search citations, not training data
      {
        userAgent: "GPTBot",
        disallow: "/",
      },
      {
        userAgent: "CCBot",
        disallow: "/",
      },
      // Allow AI search crawlers explicitly — these drive real referral traffic
      {
        userAgent: "OAI-SearchBot",
        allow: "/",
        disallow: PRIVATE_ROUTES,
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: PRIVATE_ROUTES,
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: PRIVATE_ROUTES,
      },
      // All other crawlers
      {
        userAgent: "*",
        allow: "/",
        disallow: [...PRIVATE_ROUTES, "/_next/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}