import fs from "node:fs";
import path from "node:path";
import { describe, expect, test } from "vitest";
import { brands } from "@/brands";
import { getPage, listPages, parseSlug } from "./index";
import { conditionPhotos } from "./photos";

describe("scraped content", () => {
  const drPages = listPages("dr");

  test("dr content pages exist", () => {
    expect(drPages.length).toBeGreaterThan(0);
  });

  test("every href in megaNav and footerColumns resolves to an existing page or homepage anchor", () => {
    const dr = brands.dr;
    const validSlugs = new Set(drPages.filter((p) => p.locale === "en").map((p) => p.slug));
    const serviceSlugs = new Set(dr.services.map((s) => s.slug));
    const hrefs = [
      ...(dr.megaNav ?? []).flatMap((g) => [...g.items.map((i) => i.href), ...(g.seeAll ? [g.seeAll.href] : [])]),
      ...(dr.footerColumns ?? []).flatMap((c) => c.links.map((l) => l.href)),
    ];
    for (const href of hrefs) {
      if (href.startsWith("/dr#") || href.startsWith("mailto:")) continue;
      expect(href.startsWith("/dr/")).toBe(true);
      const slug = href.slice("/dr/".length);
      expect(validSlugs.has(slug) || serviceSlugs.has(slug), `Missing target for ${href}`).toBe(true);
    }
  });

  test("no content file contains drcertificate.com in a link", () => {
    for (const p of drPages) {
      const raw = fs.readFileSync(path.join(process.cwd(), "content", "dr", p.locale, `${p.slug}.json`), "utf8");
      expect(raw).not.toMatch(/https?:\/\/[^"]*drcertificate\.com/i);
    }
  });

  test("every non-English page has an English counterpart", () => {
    const enSlugs = new Set(drPages.filter((p) => p.locale === "en").map((p) => p.slug));
    for (const p of drPages) {
      if (p.locale !== "en") {
        expect(enSlugs.has(p.slug), `Missing English counterpart for ${p.locale}/${p.slug}`).toBe(true);
        expect(getPage("dr", "en", p.slug)).toBeDefined();
      }
    }
  });

  test("every symptom page has a condition photo and the file exists under public/", () => {
    const enPages = drPages.filter((p) => p.locale === "en").map((p) => getPage("dr", "en", p.slug)!);
    const symptomPages = enPages.filter((p) => p.group === "symptom");
    expect(symptomPages).toHaveLength(6);
    for (const p of symptomPages) {
      const photo = conditionPhotos[p.slug];
      expect(photo, `Missing conditionPhotos entry for ${p.slug}`).toBeDefined();
      expect(fs.existsSync(path.join(process.cwd(), "public", photo.src))).toBe(true);
    }
  });

  // Country slugs like "id/..." share their first segment with a locale code; the English page must still resolve
  test("country slugs that start with a locale code resolve to the English page", () => {
    const locales = brands.dr.locales;
    expect(parseSlug("dr", locales, ["id", "medical-certificates-online-in-indonesia"])).toEqual({ locale: "en", pageSlug: "id/medical-certificates-online-in-indonesia", isLocaleHome: false });
    expect(parseSlug("dr", locales, ["id", "id", "medical-certificates-online-in-indonesia"]).locale).toBe("id");
    expect(parseSlug("dr", locales, ["th"])).toEqual({ locale: "th", pageSlug: "", isLocaleHome: true });
  });

  // The live site's sample-certificate drawing was scraped as loose lines; none of it may reach a rendered page
  test("no page body carries the scraped sample-certificate lines", () => {
    for (const p of drPages) {
      const page = getPage("dr", p.locale, p.slug)!;
      expect(page.blocks.some((b) => b.kind === "text" && /^DRC-SAMPLE|^Reg\. no\./.test(b.text)), `${p.locale}/${p.slug}`).toBe(false);
    }
  });
});
