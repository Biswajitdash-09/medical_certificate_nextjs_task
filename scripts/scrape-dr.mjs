// Hand-run scraper for drcertificate.com (not part of the Next.js build).
// Fetches the ~45 navbar/footer pages across all available locales and writes content/dr/<locale>/<slug>.json.
import fs from "node:fs";
import path from "node:path";

const UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36";
const LOCALES = ["en", "fil", "id", "ms", "th", "vi", "km", "lo", "my"];

const PAGES = [
  // Services (4)
  { slug: "sick-leave-certificate", group: "service", service: "sick-leave" },
  { slug: "medical-fitness-certificate", group: "service", service: "medical-fitness" },
  { slug: "unfit-to-fly", group: "service", service: "unfit-to-fly" },
  { slug: "general-medical-certificate", group: "service", service: "general" },
  // Countries (10)
  { slug: "sg/medical-certificates-online-in-singapore", group: "country" },
  { slug: "id/medical-certificates-online-in-indonesia", group: "country" },
  { slug: "ph/medical-certificates-online-in-philippines", group: "country" },
  { slug: "th/medical-certificates-online-in-thailand", group: "country" },
  { slug: "vn/medical-certificates-online-in-vietnam", group: "country" },
  { slug: "my/medical-certificates-online-in-malaysia", group: "country" },
  { slug: "cb/medical-certificates-online-in-cambodia", group: "country" },
  { slug: "lo/medical-certificates-online-in-laos", group: "country" },
  { slug: "mn/medical-certificates-online-in-myanmar", group: "country" },
  { slug: "br/medical-certificates-online-in-brunei", group: "country" },
  // Symptoms (6)
  { slug: "medical-certificate-for-fever", group: "symptom" },
  { slug: "medical-certificate-for-flu", group: "symptom" },
  { slug: "medical-certificate-for-cold-and-cough", group: "symptom" },
  { slug: "medical-certificate-for-back-pain", group: "symptom" },
  { slug: "medical-certificate-for-food-poisoning", group: "symptom" },
  { slug: "medical-certificate-for-migraine", group: "symptom" },
  // Other certificates (5)
  { slug: "fit-to-fly-certificate", group: "certificate" },
  { slug: "fit-to-work-certificate", group: "certificate" },
  { slug: "work-from-home-certificate", group: "certificate" },
  { slug: "medical-fitness-certificate-for-employment", group: "certificate" },
  { slug: "sports-fitness-certificate", group: "certificate" },
  // Audiences (4)
  { slug: "sick-leave-certificate-for-students", group: "audience" },
  { slug: "sick-leave-certificate-for-it-employees", group: "audience" },
  { slug: "sick-leave-certificate-for-bpo-employees", group: "audience" },
  { slug: "sick-leave-certificate-for-bank-employees", group: "audience" },
  // Guides (7)
  { slug: "how-to-get-a-medical-certificate-online", group: "guide" },
  { slug: "is-an-online-medical-certificate-valid", group: "guide" },
  { slug: "what-is-a-medical-certificate", group: "guide" },
  { slug: "what-should-a-medical-certificate-include", group: "guide" },
  { slug: "sick-leave-or-fitness-certificate", group: "guide" },
  { slug: "what-if-the-doctor-declines-your-request", group: "guide" },
  { slug: "guides", group: "guide" },
  // Company (4)
  { slug: "about-us", group: "company" },
  { slug: "contact", group: "company" },
  { slug: "faqs", group: "company" },
  { slug: "work-with-us", group: "company" },
  // Legal (3)
  { slug: "refund-cancellation-policy", group: "legal" },
  { slug: "privacy-policy", group: "legal" },
  { slug: "terms-of-use", group: "legal" },
];

function decode(s) {
  return s
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&ndash;/gi, "-")
    .replace(/&mdash;/gi, "-")
    .replace(/&rsquo;/gi, "'")
    .replace(/&lsquo;/gi, "'")
    .replace(/&rdquo;/gi, '"')
    .replace(/&ldquo;/gi, '"')
    .replace(/\u2014/g, "-");
}

function stripTags(html) {
  return decode(html.replace(/<[^>]+>/g, " "))
    .replace(/\s+/g, " ")
    .trim();
}

function parseMain(html) {
  const titleRaw = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? "";
  const descRaw =
    html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)?.[1] ??
    html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i)?.[1] ??
    "";
  let main = html.match(/<main[\s\S]*?<\/main>/i)?.[0] ?? "";
  // Drop non-content elements
  main = main
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<svg[\s\S]*?<\/svg>/gi, "")
    .replace(/<header[\s\S]*?<\/header>/gi, "")
    .replace(/<footer[\s\S]*?<\/footer>/gi, "")
    .replace(/<nav[\s\S]*?<\/nav>/gi, "")
    .replace(/<a[^>]+href=["']https?:\/\/forms\.drcertificate\.com[^"']*["'][^>]*>[\s\S]*?<\/a>/gi, "");

  // Extract lastUpdated if present
  const lastUpdatedMatch = main.match(/(?:Last updated|Updated on)[:\s]+([A-Za-z0-9,\s-]{6,30})/i);
  const lastUpdated = lastUpdatedMatch ? stripTags(lastUpdatedMatch[1]) : undefined;

  // Tokenize top-level blocks in document order: h2, h3, p, ul/ol, table
  const blocks = [];
  const blockRegex = /<(h2|h3|p|ul|ol|table)(?:\s[^>]*)?>([\s\S]*?)<\/\1>/gi;
  let m;
  let lastIndex = 0;

  while ((m = blockRegex.exec(main)) !== null) {
    if (m.index < lastIndex) continue; // skip nested matches (e.g., <p> inside <table> or <ul>)
    lastIndex = m.index + m[0].length;
    const tag = m[1].toLowerCase();
    const inner = m[2];

    if (tag === "h2" || tag === "h3") {
      const text = stripTags(inner);
      if (text && !/^take care of your health/i.test(text)) {
        blocks.push({ kind: "heading", level: tag === "h2" ? 2 : 3, text });
      }
    } else if (tag === "p") {
      const text = stripTags(inner);
      if (text && !/^(apply now|get your certificate|back to top)$/i.test(text)) {
        blocks.push({ kind: "text", text });
      }
    } else if (tag === "ul" || tag === "ol") {
      const items = [...inner.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi)].map((li) => stripTags(li[1])).filter(Boolean);
      if (items.length > 0) blocks.push({ kind: "list", items });
    } else if (tag === "table") {
      const rowsRaw = [...inner.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)];
      if (rowsRaw.length > 0) {
        const parsedRows = rowsRaw.map((r) =>
          [...r[1].matchAll(/<(t[hd])[^>]*>([\s\S]*?)<\/\1>/gi)].map((c) => stripTags(c[2]))
        );
        const head = parsedRows[0] ?? [];
        const rows = parsedRows.slice(1).filter((r) => r.length > 0);
        if (head.length > 0) blocks.push({ kind: "table", head, rows });
      }
    }
  }

  return {
    title: stripTags(titleRaw).replace(/\s*\|\s*DrCertificate$/i, "").trim(),
    description: decode(descRaw).trim(),
    blocks,
    ...(lastUpdated ? { lastUpdated } : {}),
  };
}

async function fetchText(url) {
  try {
    const r = await fetch(url, { headers: { "user-agent": UA }, redirect: "follow" });
    if (!r.ok) return null;
    return await r.text();
  } catch {
    return null;
  }
}

const counts = Object.fromEntries(LOCALES.map((l) => [l, 0]));
const missing = [];

for (const page of PAGES) {
  const enUrl = `https://drcertificate.com/${page.slug}/`;
  const enHtml = await fetchText(enUrl);
  if (!enHtml) {
    console.error(`FAILED EN: ${enUrl}`);
    process.exitCode = 1;
    continue;
  }

  // Discover available locales from hreflang tags on the English page
  const available = new Set(["en"]);
  for (const hm of enHtml.matchAll(/<link[^>]+hreflang=["']([^"']+)["'][^>]*>/gi)) {
    const loc = hm[1].toLowerCase();
    if (LOCALES.includes(loc)) available.add(loc);
  }

  const enParsed = parseMain(enHtml);
  const enOut = { slug: page.slug, group: page.group, ...(page.service ? { service: page.service } : {}), ...enParsed };
  const enFile = path.join("content", "dr", "en", `${page.slug}.json`);
  fs.mkdirSync(path.dirname(enFile), { recursive: true });
  fs.writeFileSync(enFile, JSON.stringify(enOut, null, 2));
  counts.en++;

  // Fetch non-English locales in parallel for this page
  const otherLocales = LOCALES.filter((l) => l !== "en");
  await Promise.all(
    otherLocales.map(async (loc) => {
      if (!available.has(loc)) {
        missing.push(`${loc}/${page.slug}`);
        return;
      }
      const locUrl = `https://drcertificate.com/${loc}/${page.slug}/`;
      const locHtml = await fetchText(locUrl);
      if (!locHtml) {
        missing.push(`${loc}/${page.slug}`);
        return;
      }
      const parsed = parseMain(locHtml);
      if (parsed.blocks.length === 0) {
        missing.push(`${loc}/${page.slug}`);
        return;
      }
      const out = { slug: page.slug, group: page.group, ...(page.service ? { service: page.service } : {}), ...parsed };
      const file = path.join("content", "dr", loc, `${page.slug}.json`);
      fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, JSON.stringify(out, null, 2));
      counts[loc]++;
    })
  );

  // Polite pause between pages
  await new Promise((r) => setTimeout(r, 150));
}

console.log("Scrape complete. Page counts per locale:", counts);
console.log("Missing translations count:", missing.length);
