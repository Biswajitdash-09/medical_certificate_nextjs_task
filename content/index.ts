import fs from "node:fs";
import path from "node:path";
import type { ContentPage, Locale } from "@/brands/types";

const CONTENT_ROOT = path.join(process.cwd(), "content");

// Normalize a slug (strip leading/trailing slashes) so lookups match regardless of caller formatting
function normSlug(slug: string): string {
  return slug.replace(/^\/+|\/+$/g, "");
}

// Read one scraped JSON page for a brand and locale; returns undefined when missing
export function getPage(brand: string, locale: Locale, slug: string): ContentPage | undefined {
  const clean = normSlug(slug);
  const file = path.join(CONTENT_ROOT, brand, locale, `${clean}.json`);
  if (!fs.existsSync(file)) return undefined;
  const page = JSON.parse(fs.readFileSync(file, "utf8")) as ContentPage;
  // Scraped <title>s end in " - DrCertificate.com"; drop it so the h1 and our own "· DrCertificate" title suffix don't repeat the name
  return { ...page, title: page.title.replace(/\s+-\s+DrCertificate\.com$/i, ""), blocks: dropSampleCard(page.blocks) };
}

// The live pages draw a sample certificate that the scraper saved as 10 loose lines ("Dr Certificate", "Certificate no.",
// "DRC-SAMPLE-0001", … "Reg. no. ••••••", "Organisations can verify…"); remove that run so it doesn't read as body text
function dropSampleCard(blocks: ContentPage["blocks"]): ContentPage["blocks"] {
  const out = [...blocks];
  for (let i = out.length - 1; i >= 2; i--) {
    const b = out[i];
    if (b.kind === "text" && /^DRC-SAMPLE/.test(b.text)) {
      const reg = out[i + 6];
      if (reg?.kind === "text" && /^Reg\./.test(reg.text)) out.splice(i - 2, 10);
    }
  }
  return out;
}

// List every { locale, slug } pair that exists on disk for a brand
export function listPages(brand: string): { locale: Locale; slug: string }[] {
  const dir = path.join(CONTENT_ROOT, brand);
  if (!fs.existsSync(dir)) return [];
  const out: { locale: Locale; slug: string }[] = [];
  for (const loc of fs.readdirSync(dir)) {
    const locDir = path.join(dir, loc);
    if (!fs.statSync(locDir).isDirectory()) continue;
    const walk = (sub: string) => {
      for (const entry of fs.readdirSync(path.join(locDir, sub), { withFileTypes: true })) {
        const rel = sub ? `${sub}/${entry.name}` : entry.name;
        if (entry.isDirectory()) walk(rel);
        else if (entry.name.endsWith(".json")) out.push({ locale: loc as Locale, slug: rel.slice(0, -5) });
      }
    };
    walk("");
  }
  return out;
}

// Return all locales in which a given slug exists for a brand
export function listPageLocales(brand: string, slug: string): Locale[] {
  const clean = normSlug(slug);
  return listPages(brand)
    .filter((p) => p.slug === clean)
    .map((p) => p.locale);
}

// Split [...slug] into locale and page slug. Country pages such as "id/medical-certificates-online-in-indonesia" start with a
// segment that is also a locale code, so an English page matching the whole path wins over the locale reading.
export function parseSlug(brand: string, brandLocales: Locale[] | undefined, segments: string[]): { locale: Locale; pageSlug: string; isLocaleHome: boolean } {
  const whole = segments.join("/");
  const first = segments[0] as Locale | undefined;
  const isLocale = first && first !== "en" && brandLocales?.includes(first) && !getPage(brand, "en", whole);
  if (isLocale) {
    const rest = segments.slice(1).join("/");
    return { locale: first, pageSlug: rest, isLocaleHome: rest.length === 0 };
  }
  return { locale: "en", pageSlug: whole, isLocaleHome: false };
}
