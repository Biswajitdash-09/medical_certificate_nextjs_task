import type { Brand } from "@/brands/types";

// Last nudge right after the FAQ, where remaining doubts have just been answered
export function FinalCta({ brand }: { brand: Brand }) {
  return (
    <section className="bg-brand text-brand-ink">
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-4 py-14 md:flex-row md:items-center md:justify-between">
        <p className="text-2xl font-bold">{brand.hero.title}</p>
        <a href={brand.ctaHref} className="inline-flex min-h-12 shrink-0 items-center rounded-xl bg-white px-6 font-semibold text-ink">
          {brand.ctaLabel} <span aria-hidden="true" className="ml-2">→</span>
        </a>
      </div>
    </section>
  );
}
