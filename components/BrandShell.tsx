import type { CSSProperties, ReactNode } from "react";
import type { Brand } from "@/brands/types";
import { Header } from "./Header";
import { Footer } from "./Footer";

// Every brand page (home, service, apply) shares the theme variables, header and footer from that brand's config
export function BrandShell({ brand, children }: { brand: Brand; children: ReactNode }) {
  const theme = {
    "--primary": brand.colors.primary,
    "--primary-text": brand.colors.primaryText,
    "--accent": brand.colors.accent,
    "--bg": brand.colors.bg,
    "--text": brand.colors.text,
  } as CSSProperties;
  return (
    <div style={theme} data-brand={brand.id} className="text-ink">
      <meta name="theme-color" content={brand.colors.primary} />
      <Header brand={brand} />
      {children}
      <Footer brand={brand} />
    </div>
  );
}
