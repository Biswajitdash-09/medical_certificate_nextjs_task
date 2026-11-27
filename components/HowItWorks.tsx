import type { Brand } from "@/brands/types";
import { Section } from "./Section";

// A real sequence, so it reads as one: a vertical timeline on phones, a connected row from md; copy is per brand
export function HowItWorks({ brand }: { brand: Brand }) {
  const last = brand.steps.length - 1;
  return (
    <Section id="how-it-works" title="How it works" tint>
      <ol className="grid gap-0 md:grid-cols-3 md:gap-6">
        {brand.steps.map((s, i) => (
          <li key={s.title} className="relative flex gap-5 pb-8 last:pb-0 md:flex-col md:gap-0 md:pb-0">
            {/* Connector to the next step: down the left on phones, across to the right from md */}
            {i < last && (
              <span aria-hidden="true" className="absolute left-[21px] top-12 bottom-0 w-0.5 bg-brand/20 md:left-14 md:right-[-1.5rem] md:top-[21px] md:bottom-auto md:h-0.5 md:w-auto" />
            )}
            <span className="relative z-10 grid size-11 shrink-0 place-items-center rounded-full bg-brand text-lg font-semibold text-brand-ink ring-8 ring-surface">
              {i + 1}
            </span>
            <div className="pt-1.5 md:mt-6 md:rounded-2xl md:bg-white md:p-6 md:shadow-sm lg:p-7 md:flex-1">
              <h3 className="text-[20px] leading-snug md:text-[22px]">{s.title}</h3>
              <p className="mt-2 max-w-prose text-slate-600">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
