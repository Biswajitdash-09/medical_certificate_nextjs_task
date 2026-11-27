import type { Brand } from "@/brands/types";

// Last nudge right after the FAQ: a contained brand panel with the headline, the action and where it leads
export function FinalCta({ brand }: { brand: Brand }) {
  return (
    <section className="bg-surface px-4 pb-14 md:pb-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 rounded-3xl bg-brand p-7 text-brand-ink sm:p-10 md:flex-row md:items-center md:justify-between lg:p-14">
        <p className="max-w-2xl text-balance text-[28px] font-bold leading-[1.1] tracking-tight sm:text-[36px] lg:text-[44px]">{brand.hero.title}</p>
        <div className="flex shrink-0 flex-col gap-3 md:items-end">
          <a href={brand.ctaHref} data-cta="final" className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-7 font-semibold text-ink transition hover:-translate-y-px active:translate-y-px active:scale-[0.98]">
            {brand.ctaLabel}
          </a>
          <p className="max-w-xs text-sm opacity-80 md:text-right">{brand.ctaNote}</p>
        </div>
      </div>
    </section>
  );
}
