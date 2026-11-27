import type { Brand } from "@/brands/types";

// One button style for every Apply link; data-cta names its position so clicks can be counted per placement
export function CtaLink({ brand, position, id, className = "" }: { brand: Brand; position: string; id?: string; className?: string }) {
  return (
    <a id={id} href={brand.ctaHref} data-cta={position} className={`btn-primary ${className}`}>
      {brand.ctaLabel} <span aria-hidden="true" className="btn-arrow">→</span>
    </a>
  );
}
