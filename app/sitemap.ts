import type { MetadataRoute } from "next";
import { brands, SITE_URL } from "@/brands";
import { listPages } from "@/content";

// Lists every brand homepage, service page, and scraped internal page in every locale
export default function sitemap(): MetadataRoute.Sitemap {
  // Shared site URL; the old inline fallback pointed at a domain that isn't ours
  const base = SITE_URL;
  const entries: MetadataRoute.Sitemap = [{ url: `${base}/` }];

  for (const b of Object.values(brands)) {
    entries.push({ url: `${base}/${b.id}` });
    for (const s of b.services) {
      entries.push({ url: `${base}/${b.id}/${s.slug}` });
    }
    for (const loc of b.locales ?? []) {
      if (loc !== "en") entries.push({ url: `${base}/${b.id}/${loc}` });
    }
    for (const p of listPages(b.id)) {
      entries.push({ url: p.locale === "en" ? `${base}/${b.id}/${p.slug}` : `${base}/${b.id}/${p.locale}/${p.slug}` });
    }
  }
  return entries;
}
