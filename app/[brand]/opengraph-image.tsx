import { ImageResponse } from "next/og";
import { getBrand, brands } from "@/brands";

// Share card built from each brand's own name, headline and colours, so links never show the other brand
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Brand share card";

export function generateStaticParams() {
  return Object.keys(brands).map((brand) => ({ brand }));
}

export default async function Image({ params }: { params: Promise<{ brand: string }> }) {
  const brand = getBrand((await params).brand) ?? brands.dr;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: brand.colors.bg, color: brand.colors.text }}>
        <div style={{ fontSize: 34, fontWeight: 700, color: brand.colors.primary }}>{brand.name}</div>
        <div style={{ fontSize: 68, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1.5 }}>{brand.hero.title}</div>
        <div style={{ display: "flex" }}>
          <div style={{ background: brand.colors.primary, color: brand.colors.primaryText, padding: "18px 34px", borderRadius: 16, fontSize: 30, fontWeight: 700 }}>{brand.ctaLabel}</div>
        </div>
      </div>
    ),
    size,
  );
}
