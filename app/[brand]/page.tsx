import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brands, getBrand } from "@/brands";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { HowItWorks } from "@/components/HowItWorks";
import { Facts } from "@/components/Facts";
import { Legal } from "@/components/Legal";
import { Countries } from "@/components/Countries";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { BrandShell } from "@/components/BrandShell";
import { Statement } from "@/components/Statement";
import { PhoneBar } from "@/components/PhoneBar";
import { CtaTracking } from "@/components/CtaTracking";
import { BeforeYouStart } from "@/components/BeforeYouStart";

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

export default async function BrandPage({ params }: PageProps<"/[brand]">) {
  const brand = getBrand((await params).brand);
  if (!brand) notFound();
  return (
    <BrandShell brand={brand}>
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
