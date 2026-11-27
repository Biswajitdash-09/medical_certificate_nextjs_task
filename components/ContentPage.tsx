import Image from "next/image";
import type { Brand, ContentPage as ContentPageData, Locale, PageBlock } from "@/brands/types";
import { conditionPhotos } from "@/content/photos";
import { CountryFlag } from "./CountryFlag";
import { CertificateCard } from "./CertificateCard";
import { LOCALE_NAMES } from "./LanguageSwitcher";
import { FaqItem } from "./FaqItem";
import { HowItWorks } from "./HowItWorks";
import { BeforeYouStart } from "./BeforeYouStart";
import { Legal } from "./Legal";
import { FinalCta } from "./FinalCta";
import { CtaTracking } from "./CtaTracking";

// Turn a heading into a URL-safe anchor id for the article table of contents
function toAnchor(text: string, idx: number): string {
  const base = text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return base || `section-${idx}`;
}

// Extract the country name from a country slug/title so it matches CountryFlag and priceTable
function extractCountry(slug: string): string {
  const tail = slug.split("/").pop() ?? "";
  const match = tail.match(/in-([a-z-]+)$/i);
  if (!match) return "";
  return match[1].split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
}

// Collapse runs of h3 + text pairs (scraped FAQ sections) into native <details> FAQ blocks
function normalizeBlocks(blocks: PageBlock[]): PageBlock[] {
  const out: PageBlock[] = [];
  let i = 0;
  while (i < blocks.length) {
    const cur = blocks[i];
    const next = blocks[i + 1];
    if (cur.kind === "heading" && cur.level === 3 && next?.kind === "text") {
      const items: { q: string; a: string }[] = [];
      while (i < blocks.length && blocks[i].kind === "heading" && (blocks[i] as { level: number }).level === 3 && blocks[i + 1]?.kind === "text") {
        items.push({ q: (blocks[i] as { text: string }).text, a: (blocks[i + 1] as { text: string }).text });
        i += 2;
      }
      out.push({ kind: "faq", items });
      continue;
    }
    out.push(cur);
    i++;
  }
  return out;
}

function BlockList({ blocks }: { blocks: PageBlock[] }) {
  const normalized = normalizeBlocks(blocks);
  // A short unpunctuated line right before a heading is the live page's section label ("How it works", "FAQs")
  const isLabel = (i: number) => {
    const b = normalized[i];
    return b?.kind === "text" && normalized[i + 1]?.kind === "heading" && b.text.length < 40 && !/[.?!]$/.test(b.text);
  };
  return (
    <div className="space-y-5">
      {normalized.map((b, idx) => {
        if (b.kind === "heading") {
          const id = toAnchor(b.text, idx);
          return b.level === 2 ? (
            <h2 key={idx} id={id} className={`${isLabel(idx - 1) ? "!mt-3" : "mt-14"} scroll-mt-24 text-[26px] font-semibold leading-snug tracking-tight text-slate-900 first:mt-0 sm:text-[30px]`}>
              {b.text}
            </h2>
          ) : (
            <h3 key={idx} id={id} className="mt-8 scroll-mt-24 text-[20px] font-semibold leading-snug text-slate-900">
              {b.text}
            </h3>
          );
        }
        if (b.kind === "text") {
          // Set section labels as a small brand-coloured label above their heading, not a stray paragraph
          if (isLabel(idx)) {
            return <p key={idx} className="!mt-14 -mb-2 text-sm font-semibold text-brand">{b.text}</p>;
          }
          return <p key={idx} className="text-[16px] leading-relaxed text-slate-700 sm:text-[17px]">{b.text}</p>;
        }
        if (b.kind === "list") {
          return (
            <ul key={idx} className="divide-y divide-slate-100 rounded-2xl border border-slate-200/80 bg-white px-4 shadow-xs sm:px-6">
              {b.items.map((item, j) => (
                <li key={j} className="flex gap-3.5 py-3.5 text-[15px] leading-snug text-slate-700 sm:py-4">
                  <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-white">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (b.kind === "faq") {
          return (
            <div key={idx} className="divide-y divide-slate-100 rounded-2xl border border-slate-200/80 bg-white px-5 shadow-sm sm:px-7">
              {b.items.map((item) => (
                <FaqItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          );
        }
        if (b.kind === "table") {
          return (
            <div key={idx} className="overflow-x-auto rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <table className="w-full text-left text-[15px]">
                <thead className="border-b border-slate-200/80 bg-surface">
                  <tr>
                    {b.head.map((h, j) => (
                      <th key={j} className="px-4 py-3 text-xs font-semibold uppercase tracking-[0.06em] text-slate-600 sm:px-5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {b.rows.map((row, r) => (
                    <tr key={r} className="even:bg-surface/40">
                      {row.map((cell, c) => (
                        <td key={c} className="px-4 py-3 text-slate-700 sm:px-5">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

// Renders any scraped internal page with a hero matched to its group and the shared closing banner
export function ContentPage({
  brand,
  page,
  locale,
  serviceObj,
  fallbackFrom,
}: {
  brand: Brand;
  page: ContentPageData;
  locale: Locale;
  serviceObj?: Brand["services"][number];
  fallbackFrom?: Locale;
}) {
  const homeHref = locale === "en" ? `/${brand.id}` : `/${brand.id}/${locale}`;
  const isGuide = page.group === "guide";
  const isSymptom = page.group === "symptom";
  const isCountry = page.group === "country";
  const countryName = isCountry ? extractCountry(page.slug) : "";
  const countryPrice = isCountry
    ? brand.priceTable?.find((r) => r.country.toLowerCase() === countryName.toLowerCase())?.price
    : undefined;
  const ctaQuery = isSymptom || page.group === "audience" ? "?type=sick-leave" : serviceObj ? `?type=${serviceObj.slug}` : "";

  // For symptom pages, extract the first text block as hero lead, keep real intro paragraphs before the sample card, and start body at the first h2
  const firstH2Idx = isSymptom ? page.blocks.findIndex((b) => b.kind === "heading" && b.level === 2) : -1;
  const symptomLead = isSymptom && page.blocks[0]?.kind === "text" ? page.blocks[0].text : page.description;
  const symptomPhoto = isSymptom ? conditionPhotos[page.slug] : undefined;
  const symptomPrice = isSymptom ? brand.services.find((s) => s.slug === "sick-leave")?.price ?? brand.portal.price : undefined;

  let introBlocks: PageBlock[] = [];
  let bodyBlocks = page.blocks;
  if (isSymptom && firstH2Idx > 0) {
    const preH2 = page.blocks.slice(1, firstH2Idx);
    const certNoiseIdx = preH2.findIndex((b) => b.kind === "text" && /^Dr\.?\s*Certificate$/i.test(b.text));
    introBlocks = (certNoiseIdx >= 0 ? preH2.slice(0, certNoiseIdx) : preH2).filter((b) => b.kind === "text");
    bodyBlocks = page.blocks.slice(firstH2Idx);
  }

  const normalizedForToc = normalizeBlocks(bodyBlocks);
  const toc = isGuide || isSymptom
    ? (normalizedForToc
        .map((b, i) => (b.kind === "heading" && b.level === 2 ? { id: toAnchor(b.text, i), text: b.text } : null))
        .filter(Boolean) as { id: string; text: string }[])
    : [];

  // Sample certificate for the text-only heroes, typed from the page title ("Fit to Fly Certificate Online…" → "Fit to Fly Certificate")
  const visual = brand.hero.visual;
  const heroCard = visual.kind === "certificate" && (isCountry || page.group === "certificate" || page.group === "audience")
    ? { ...visual, type: isCountry ? visual.type : page.title.match(/^.*?Certificate\b/i)?.[0] ?? page.title }
    : undefined;

  // Sibling conditions from megaNav for the "Other conditions" strip
  const siblingConditions = isSymptom
    ? (brand.megaNav?.find((g) => g.title === "Conditions")?.items.filter((item) => !item.href.endsWith(`/${page.slug}`)) ?? [])
    : [];

  return (
    <main>
      {fallbackFrom && (
        <div role="status" className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900">
          Not available in {LOCALE_NAMES[fallbackFrom]} yet. Showing the English version.
        </div>
      )}

      {serviceObj ? (
        <section className="bg-surface">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.1fr_1fr] md:items-center md:py-20">
            <div>
              <a href={`${homeHref}#services`} className="link-draw text-sm text-slate-600">All certificates</a>
              <h1 className="mt-4 text-[40px] leading-[1.05] md:text-[56px]">{serviceObj.title}</h1>
              <p className="mt-5 max-w-xl text-lg text-slate-700">{serviceObj.body}</p>
              {serviceObj.uses && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {serviceObj.uses.map((u) => <li key={u} className="rounded-full bg-white px-3 py-1 text-sm">{u}</li>)}
                </ul>
              )}
              {serviceObj.price && <p className="mt-6 text-[28px] font-semibold text-brand">{serviceObj.price}</p>}
              <a href={`${brand.ctaHref}${ctaQuery}`} data-cta="service-page" className="btn-primary mt-7">{brand.ctaLabel}</a>
              <p className="mt-3 text-sm text-slate-600">{brand.ctaNote}</p>
            </div>
            {serviceObj.photo && (
              <div className="photo-frame aspect-[4/3]">
                <Image src={serviceObj.photo.src} alt={serviceObj.photo.alt} width={900} height={600} priority sizes="(max-width: 767px) 100vw, 45vw" className="size-full object-cover" />
              </div>
            )}
          </div>
        </section>
      ) : isSymptom ? (
        <section className="bg-surface">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.1fr_1fr] md:items-center md:py-20">
            <div>
              <a href={`${homeHref}#services`} className="link-draw text-sm text-slate-600">All conditions</a>
              <h1 className="mt-4 text-[36px] leading-[1.08] tracking-tight md:text-[50px]">{page.title}</h1>
              <p className="mt-5 max-w-xl text-lg text-slate-700">{symptomLead}</p>
              {symptomPrice && <p className="mt-6 text-[26px] font-semibold text-brand tabular-nums">{symptomPrice}</p>}
              <a href={`${brand.ctaHref}${ctaQuery}`} data-cta="condition-hero" className="btn-primary mt-6">{brand.ctaLabel}</a>
              <p className="mt-3 text-sm text-slate-600">{brand.ctaNote}</p>
            </div>
            {symptomPhoto && (
              <div className="photo-frame aspect-[4/3]">
                <Image src={symptomPhoto.src} alt={symptomPhoto.alt} width={1200} height={900} priority sizes="(max-width: 767px) 100vw, 45vw" className="size-full object-cover" />
              </div>
            )}
          </div>
        </section>
      ) : (
        <section className="bg-surface">
          {/* Country, certificate and audience pages get the brand's sample certificate beside the text, so the hero is never a bare column */}
          <div className={`mx-auto max-w-6xl px-4 py-12 md:py-16 ${heroCard ? "grid gap-10 md:grid-cols-[1.1fr_1fr] md:items-center" : ""}`}>
            <div>
            <a href={homeHref} className="link-draw block w-fit text-sm text-slate-600">Back to {brand.name}</a>
            {isCountry && countryName && (
              <div className="mt-5 flex w-fit items-center gap-2.5 rounded-full border border-slate-200/80 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700">
                <CountryFlag country={countryName} />
                <span>{countryName}</span>
              </div>
            )}
            <h1 className="mt-4 max-w-4xl text-[34px] leading-[1.08] tracking-tight md:text-[48px]">{page.title}</h1>
            {page.description && <p className="mt-4 max-w-2xl text-lg text-slate-700">{page.description}</p>}
            {countryPrice && (
              <p className="mt-5 text-[28px] font-semibold text-brand tabular-nums">{countryPrice}</p>
            )}
            {page.group === "legal" && page.lastUpdated && (
              <p className="mt-4 text-sm text-slate-500">Last updated: {page.lastUpdated}</p>
            )}
            {page.slug === "contact" && (brand.contact.email || brand.contact.address) && (
              <div className="mt-6 grid gap-4 rounded-2xl border border-slate-200/80 bg-white p-6 sm:grid-cols-2">
                {brand.contact.email && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Email</p>
                    <a href={`mailto:${brand.contact.email}`} className="mt-1 inline-block font-semibold text-brand underline underline-offset-4">{brand.contact.email}</a>
                  </div>
                )}
                {brand.contact.address && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Address</p>
                    <p className="mt-1 text-sm text-slate-700">{brand.contact.address}</p>
                  </div>
                )}
              </div>
            )}
            {(page.group === "country" || page.group === "certificate" || page.group === "audience") && (
              <div className="mt-7">
                <a href={`${brand.ctaHref}${ctaQuery}`} data-cta="content-hero" className="btn-primary">{brand.ctaLabel}</a>
                <p className="mt-3 text-sm text-slate-600">{brand.ctaNote}</p>
              </div>
            )}
            </div>
            {heroCard && <CertificateCard visual={heroCard} />}
          </div>
        </section>
      )}

      <section className="bg-white py-12 md:py-16">
        <div className={`mx-auto max-w-6xl px-4 ${toc.length > 0 ? "grid gap-10 lg:grid-cols-[16rem_1fr] lg:items-start" : ""}`}>
          {toc.length > 0 && (
            <aside aria-label="Table of contents" className="hidden rounded-2xl border border-slate-200/80 bg-surface/50 p-5 lg:sticky lg:top-24 lg:block">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-500">On this page</p>
              <ul className="mt-3 space-y-2 text-sm">
                {toc.map((item) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="link-draw text-slate-700 hover:text-brand">{item.text}</a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
          {/* min-w-0 lets the grid column shrink on phones; without it long words and tables stretched it past the screen and got clipped */}
          <div className={`min-w-0 ${isGuide || isSymptom || page.group === "company" || page.group === "legal" ? "max-w-[68ch]" : "max-w-4xl"}`}>
            {introBlocks.length > 0 && (
              <div className="mb-10 space-y-4 border-b border-slate-100 pb-8">
                {introBlocks.map((b, i) => (
                  <p key={i} className={i === 0 ? "text-lg leading-relaxed text-slate-800" : "text-[16px] leading-relaxed text-slate-700 sm:text-[17px]"}>
                    {b.kind === "text" ? b.text : ""}
                  </p>
                ))}
              </div>
            )}
            <BlockList blocks={bodyBlocks} />
          </div>
        </div>
      </section>

      {siblingConditions.length > 0 && (
        <section aria-label="Other conditions" className="border-t border-slate-100 bg-surface/50 py-12 md:py-16">
          <div className="mx-auto max-w-6xl px-4">
            <h2 className="text-[26px] font-semibold tracking-tight text-slate-900 md:text-[32px]">Other conditions</h2>
            <ul className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
              {siblingConditions.map((item) => (
                <li key={item.href} className="flex">
                  <a href={item.href} className="card card-link overflow-hidden p-0">
                    {item.image && (
                      <div className="photo-frame aspect-[4/3] rounded-b-none">
                        <Image src={item.image} alt="" width={600} height={450} sizes="(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 20vw" className="size-full object-cover" />
                      </div>
                    )}
                    <div className="flex flex-1 items-center justify-between gap-2 p-3.5 sm:p-4">
                      <span className="text-sm font-semibold text-slate-900">{item.label}</span>
                      <span aria-hidden="true" className="card-arrow text-brand">→</span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {serviceObj && (
        <>
          <HowItWorks brand={brand} />
          <BeforeYouStart brand={brand} />
          <Legal brand={brand} />
        </>
      )}
      <FinalCta brand={brand} />
      <CtaTracking />
    </main>
  );
}
