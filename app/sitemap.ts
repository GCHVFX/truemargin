import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = "https://gettruemargin.com";
  const now = new Date();

  // Keep this list tight for V1. Add new tool routes here as you ship them.
  const routes = [
    "",
    "/etsy-profit-calculator",
    "/etsy-fee-calculator",
    "/etsy-break-even-calculator",
  ];

  return routes.map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: path === "" ? 1 : 0.8,
  }));
}
