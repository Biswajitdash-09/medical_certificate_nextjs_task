import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brands, getBrand } from "@/brands";
import { getPage, listPageLocales, listPages, parseSlug } from "@/content";
import { BrandShell } from "@/components/BrandShell";
import { ContentPage } from "@/components/ContentPage";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { BeforeYouStart } from "@/components/BeforeYouStart";
import { Statement } from "@/components/Statement";
import { Facts } from "@/components/Facts";
import { Legal } from "@/components/Legal";
import { Countries } from "@/components/Countries";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { PhoneBar } from "@/components/PhoneBar";
import { CtaTracking } from "@/components/CtaTracking";

// Pre-render every brand service slug, every scraped content page across locales, and each locale homepage
export function generateStaticParams() {
  const params: { brand: string; slug: string[] }[] = [];
  const seen = new Set<string>();
  const push = (brand: string, slug: string[]) => {
    const key = `${brand}/${slug.join("/")}`;
    if (!seen.has(key)) {
      seen.add(key);
      params.push({ brand, slug });
    }
  };
  for (const b of Object.values(brands)) {
    const enPages = listPages(b.id).filter((p) => p.locale === "en");
    for (const s of b.services) push(b.id, [s.slug]);
    for (const loc of b.locales ?? []) {
      if (loc !== "en") {
        push(b.id, [loc]);
        for (const s of b.services) push(b.id, [loc, s.slug]);
        for (const p of enPages) push(b.id, [loc, ...p.slug.split("/")]);
      }
    }
    for (const p of listPages(b.id)) {
      const segs = p.slug.split("/");
      push(b.id, p.locale === "en" ? segs : [p.locale, ...segs]);
    }
  }
  return params;
}

type CatchAllParams = Promise<{ brand: string; slug: string[] }>;

export async function generateMetadata({ params }: { params: CatchAllParams }): Promise<Metadata> {
  const { brand: id, slug } = await params;
  const brand = getBrand(id);
  if (!brand) return {};
  const { locale, pageSlug, isLocaleHome } = parseSlug(brand.id, brand.locales, slug);
  if (isLocaleHome) {
    return { title: brand.meta.title, description: brand.meta.description, icons: { icon: brand.icon } };
  }
  const page = getPage(brand.id, locale, pageSlug) ?? (locale !== "en" ? getPage(brand.id, "en", pageSlug) : undefined);
  const service = !page ? brand.services.find((s) => s.slug === pageSlug) : undefined;
  if (page) {
    const locales = listPageLocales(brand.id, pageSlug);
    const languages = Object.fromEntries(locales.map((l) => [l, l === "en" ? `/${brand.id}/${pageSlug}` : `/${brand.id}/${l}/${pageSlug}`]));
    return {
      title: `${page.title} · ${brand.name}`,
      description: page.description || brand.meta.description,
      alternates: { languages },
      icons: { icon: brand.icon },
    };
  }
  if (service) {
    return { title: `${service.title} · ${brand.name}`, description: service.body, icons: { icon: brand.icon } };
  }
  return {};
}

async function CatchAllContent({ params }: { params: CatchAllParams }) {
  const { brand: id, slug } = await params;
  const brand = getBrand(id);
  if (!brand) notFound();

  const { locale, pageSlug, isLocaleHome } = parseSlug(brand.id, brand.locales, slug);

  // Locale homepage fallback (e.g., /dr/fil when switching languages from an untranslated page)
  if (isLocaleHome) {
    return (
      <BrandShell brand={brand} locale={locale}>
        <main>
          <Hero brand={brand} />
          <Services brand={brand} />
          <HowItWorks brand={brand} />
          <BeforeYouStart brand={brand} />
          <Statement brand={brand} />
          <Facts brand={brand} />
          <Legal brand={brand} />
          <Countries brand={brand} />
          <Faq brand={brand} />
          <FinalCta brand={brand} />
        </main>
        <PhoneBar ctaLabel={brand.ctaLabel} ctaHref={brand.ctaHref} />
        <CtaTracking />
      </BrandShell>
    );
  }

  const translatedLocales = listPageLocales(brand.id, pageSlug);
  const localizedPage = getPage(brand.id, locale, pageSlug);
  const page = localizedPage ?? (locale !== "en" ? getPage(brand.id, "en", pageSlug) : undefined);
  const fallbackFrom = !localizedPage && locale !== "en" ? locale : undefined;
  if (page) {
    const serviceObj = page.service ? brand.services.find((s) => s.slug === page.service) : undefined;
    return (
      <BrandShell brand={brand} locale={locale} translatedLocales={translatedLocales}>
        <ContentPage brand={brand} page={page} locale={locale} serviceObj={serviceObj} fallbackFrom={fallbackFrom} />
      </BrandShell>
    );
  }

  // Existing [service] route slugs (e.g., /dr/sick-leave, /gmc/sick-leave)
  const serviceObj = brand.services.find((s) => s.slug === pageSlug);
  if (serviceObj) {
    const synthetic = { slug: serviceObj.slug, title: serviceObj.title, description: serviceObj.body, blocks: [], group: "service" as const };
    return (
      <BrandShell brand={brand} locale={locale} translatedLocales={translatedLocales}>
        <ContentPage brand={brand} page={synthetic} locale={locale} serviceObj={serviceObj} fallbackFrom={locale !== "en" ? locale : undefined} />
      </BrandShell>
    );
  }

  notFound();
}

export default function CatchAllPage({ params }: { params: CatchAllParams }) {
  return (
    <Suspense>
      <CatchAllContent params={params} />
    </Suspense>
  );
}
