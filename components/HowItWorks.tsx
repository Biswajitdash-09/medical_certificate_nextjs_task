import type { Brand } from "@/brands/types";
import { Section } from "./Section";

// A real sequence: a vertical timeline on phones, cohesive step cards with progression cues from md; copy is per brand
export function HowItWorks({ brand }: { brand: Brand }) {
  const last = brand.steps.length - 1;
  return (
    <Section id="how-it-works" title="How it works" tint>
      <ol className="grid gap-0 md:grid-cols-3 md:gap-6">
        {brand.steps.map((s, i) => (
          <li key={s.title} className="relative flex gap-4 pb-6 last:pb-0 md:flex-col md:gap-0 md:pb-0">
            {/* Vertical connector on phones */}
            {i < last && (
              <span aria-hidden="true" className="absolute left-[19px] top-11 bottom-0 w-0.5 bg-brand/20 md:hidden" />
            )}
            {/* Mobile step circle */}
            <span aria-hidden="true" className="relative z-10 grid size-10 shrink-0 place-items-center rounded-full bg-brand text-sm font-semibold text-brand-ink ring-8 ring-surface md:hidden">
              {i + 1}
            </span>
            <div className="flex flex-1 flex-col rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-md md:p-6 lg:p-7">
              <div className="mb-4 hidden items-center justify-between md:flex">
                <div className="flex items-center gap-3">
                  <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand text-sm font-semibold text-brand-ink tabular-nums">
                    {i + 1}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-brand/75 tabular-nums">
                    Step 0{i + 1}
                  </span>
                </div>
                {i < last && (
                  <span aria-hidden="true" className="text-base font-medium text-brand/40">→</span>
                )}
              </div>
              <h3 className="text-[19px] leading-snug md:text-[21px]">{s.title}</h3>
              <p className="mt-2.5 max-w-prose text-[15px] leading-relaxed text-slate-600 md:text-base">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
