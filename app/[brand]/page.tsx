import type { Metadata, Viewport } from "next";
import type { CSSProperties } from "react";
import { notFound } from "next/navigation";
import { brands, getBrand } from "@/brands";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { Facts } from "@/components/Facts";
import { Legal } from "@/components/Legal";
import { Countries } from "@/components/Countries";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";
import { Statement } from "@/components/Statement";
import { PhoneBar } from "@/components/PhoneBar";
import { CtaTracking } from "@/components/CtaTracking";

// Pre-render only configured brands; unknown slugs hit notFound() below (dynamicParams is barred under cacheComponents)
export function generateStaticParams() {
  return Object.keys(brands).map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: PageProps<"/[brand]">): Promise<Metadata> {
  const brand = getBrand((await params).brand);
  // Canonical points at the brand's real domain so the preview routes never compete with it in search
  return brand
    ? {
        title: brand.meta.title,
        description: brand.meta.description,
        alternates: { canonical: brand.meta.url },
        icons: { icon: brand.icon },
        openGraph: { title: brand.meta.title, description: brand.meta.description, url: brand.meta.url, siteName: brand.name, type: "website" },
      }
    : {};
}

// Browser chrome on phones takes the brand's primary colour
export async function generateViewport({ params }: PageProps<"/[brand]">): Promise<Viewport> {
  const brand = getBrand((await params).brand);
  return brand ? { themeColor: brand.colors.primary } : {};
}

export default async function BrandPage({ params }: PageProps<"/[brand]">) {
  const brand = getBrand((await params).brand);
  if (!brand) notFound();
  // Brand colours become CSS variables so shared components stay colour-agnostic
  const theme = {
    "--primary": brand.colors.primary,
    "--primary-text": brand.colors.primaryText,
    "--accent": brand.colors.accent,
    "--bg": brand.colors.bg,
    "--text": brand.colors.text,
  } as CSSProperties;
  return (
    <div style={theme} data-brand={brand.id} className="text-ink">
      {/* FAQ structured data from the same live answers the page shows, so search results can quote them */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: brand.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }).replace(/</g, String.fromCharCode(92) + "u003c"), // escape "<" as \u003c so config text can never close the script tag
        }}
      />
      <Header brand={brand} />
      <main>
        <Hero brand={brand} />
        <Services brand={brand} />
        <HowItWorks brand={brand} />
        <Statement brand={brand} />
        <Facts brand={brand} />
        <Legal brand={brand} />
        <Countries brand={brand} />
        <Faq brand={brand} />
        <FinalCta brand={brand} />
      </main>
      <Footer brand={brand} />
      <PhoneBar ctaLabel={brand.ctaLabel} ctaHref={brand.ctaHref} />
      <CtaTracking />
    </div>
  );
}
