import type { Brand } from "@/brands/types";
import { Section } from "./Section";
import { CtaLink } from "./CtaLink";

// What the brand's form will ask for, right before the button that opens it, so people arrive ready and don't drop off mid-form
export function BeforeYouStart({ brand }: { brand: Brand }) {
  const { title, items } = brand.beforeYouStart;
  return (
    <Section id="before-you-start" title={title}>
      {/* One panel holds the checklist and its action, so the button reads as the end of the list, not a loose box */}
      <div className="grid gap-6 rounded-3xl bg-surface p-4 sm:p-6 lg:grid-cols-[1fr_22rem] lg:gap-10 lg:p-10">
        {/* One card with divided rows: compact on phones and no hanging tile when a brand has an odd number of items */}
        <ul className="divide-y divide-slate-100 rounded-2xl bg-white px-4 shadow-sm sm:px-6">
          {items.map((item) => (
            <li key={item.text} className="flex gap-3.5 py-4 leading-snug sm:py-5">
              <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-white">✓</span>
              {item.href ? (
                <a href={item.href} className="link-draw underline decoration-slate-300 underline-offset-4">{item.text}</a>
              ) : (
                <span>{item.text}</span>
              )}
            </li>
          ))}
        </ul>
        {/* Beside the list from lg and stuck in view while the list scrolls; under it on smaller screens */}
        <div className="flex flex-col justify-center rounded-2xl bg-white p-5 shadow-sm sm:p-6 lg:sticky lg:top-24 lg:self-start">
          <p className="text-[20px] font-semibold leading-snug">Have these ready?</p>
          <CtaLink brand={brand} position="before-you-start" className="mt-4 w-full" />
          <p className="mt-3 text-sm text-slate-600">{brand.ctaNote}</p>
        </div>
      </div>
    </Section>
  );
}
