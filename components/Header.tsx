import Image from "next/image";
import type { Brand } from "@/brands/types";
import { MobileMenu } from "./MobileMenu";

// Sticky header keeps the Apply button one tap away on every scroll position
export function Header({ brand }: { brand: Brand }) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <a href="#top" className="shrink-0">
          <Image src={brand.logo.src} alt={brand.logo.alt} width={brand.logo.width} height={32} priority className="h-7 w-auto" />
        </a>
        <nav aria-label="Main" className="hidden gap-6 text-sm font-medium md:flex">
          {brand.nav.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-brand">{item.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={brand.ctaHref} className="hidden min-h-11 items-center rounded-lg bg-brand px-4 text-sm font-semibold text-brand-ink min-[400px]:inline-flex">
            {brand.ctaLabel}
          </a>
          <MobileMenu nav={brand.nav} ctaLabel={brand.ctaLabel} ctaHref={brand.ctaHref} />
        </div>
      </div>
    </header>
  );
}
