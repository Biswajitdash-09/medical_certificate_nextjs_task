import type { Brand } from "@/brands/types";

// One button style for every Apply link, so all CTAs look and track the same on both brands
export function CtaLink({ brand, className = "" }: { brand: Brand; className?: string }) {
  return (
    <a
      href={brand.ctaHref}
      className={`inline-flex min-h-12 items-center justify-center rounded-xl bg-brand px-6 font-semibold text-brand-ink shadow-sm transition hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${className}`}
    >
      {brand.ctaLabel} <span aria-hidden="true" className="ml-2">→</span>
    </a>
  );
}
