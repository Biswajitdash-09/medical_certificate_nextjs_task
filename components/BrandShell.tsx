import type { CSSProperties, ReactNode } from "react";
import type { Brand, Locale } from "@/brands/types";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ScrollButtons } from "./ScrollButtons";

// Every brand page (home, service, apply, content) shares the theme variables, header, footer and scroll buttons
export function BrandShell({
  brand,
  locale = "en",
  translatedLocales,
  children,
}: {
  brand: Brand;
  locale?: Locale;
  translatedLocales?: Locale[];
  children: ReactNode;
}) {
  const theme = {
    "--primary": brand.colors.primary,
    "--primary-text": brand.colors.primaryText,
    "--accent": brand.colors.accent,
    "--bg": brand.colors.bg,
    "--text": brand.colors.text,
  } as CSSProperties;
  // No lang here: the header, footer and homepage copy are English, so <html lang="en"> covers them and ContentPage marks its own translated text
  return (
    <div id="top" tabIndex={-1} style={theme} data-brand={brand.id} className="text-ink outline-none">
      <div id="scroll-sentinel-top" aria-hidden="true" className="h-px w-full" />
      <meta name="theme-color" content={brand.colors.primary} />
      <Header brand={brand} locale={locale} translatedLocales={translatedLocales} />
      {children}
      <Footer brand={brand} />
      <div id="scroll-sentinel-bottom" aria-hidden="true" className="h-px w-full" />
      <ScrollButtons />
    </div>
  );
}
