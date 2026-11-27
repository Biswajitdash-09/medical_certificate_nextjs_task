import type { Metadata } from "next";
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

// Pre-render only configured brands; unknown slugs hit notFound() below (dynamicParams is barred under cacheComponents)
export function generateStaticParams() {
  return Object.keys(brands).map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: PageProps<"/[brand]">): Promise<Metadata> {
  const brand = getBrand((await params).brand);
  return brand ? { title: brand.meta.title, description: brand.meta.description } : {};
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
    <div style={theme} className="text-ink">
      <Header brand={brand} />
      <main>
        <Hero brand={brand} />
        <Services brand={brand} />
        <HowItWorks brand={brand} />
        <Facts brand={brand} />
        <Legal brand={brand} />
        <Countries brand={brand} />
        <Faq brand={brand} />
        <FinalCta brand={brand} />
      </main>
      <Footer brand={brand} />
    </div>
  );
}
