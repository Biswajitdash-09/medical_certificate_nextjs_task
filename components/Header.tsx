import Image from "next/image";
import type { Brand, Locale } from "@/brands/types";
import { MobileMenu } from "./MobileMenu";
import { MegaMenu } from "./MegaMenu";
import { LanguageSwitcher } from "./LanguageSwitcher";

// Sticky header keeps the Apply button one tap away on every scroll position
export function Header({ brand, locale = "en", translatedLocales }: { brand: Brand; locale?: Locale; translatedLocales?: Locale[] }) {
  // Anchors point at the brand homepage, so the same nav works from service and apply pages
  const nav = brand.nav.map((n) => ({ ...n, href: n.href.startsWith("#") ? `/${brand.id}${n.href}` : n.href }));
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="relative mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <a href={locale === "en" ? `/${brand.id}` : `/${brand.id}/${locale}`} className="shrink-0">
          <Image src={brand.logo.src} alt={brand.logo.alt} width={brand.logo.width} height={32} priority className="h-7 w-auto" />
        </a>
        {brand.megaNav ? (
          <MegaMenu groups={brand.megaNav} />
        ) : (
          <nav aria-label="Main" className="hidden gap-6 text-sm font-medium md:flex">
            {nav.map((item) => (
              <a key={item.href} href={item.href} className="link-draw hover:text-brand">{item.label}</a>
            ))}
          </nav>
        )}
        <div className="flex items-center gap-2">
          <div className="hidden lg:block">
            <LanguageSwitcher brandId={brand.id} locales={brand.locales} currentLocale={locale} translatedLocales={translatedLocales} />
          </div>
          <a href={brand.ctaHref} data-cta="header" className="hidden min-h-11 items-center whitespace-nowrap rounded-lg bg-brand px-4 text-sm font-semibold text-brand-ink min-[400px]:inline-flex">
            {brand.ctaLabel}
          </a>
          <MobileMenu
            nav={nav}
            ctaLabel={brand.ctaLabel}
            ctaHref={brand.ctaHref}
            megaNav={brand.megaNav}
            brandId={brand.id}
            locales={brand.locales}
            currentLocale={locale}
            translatedLocales={translatedLocales}
          />
        </div>
      </div>
    </header>
  );
}
