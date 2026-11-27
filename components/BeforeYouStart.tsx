import type { Brand } from "@/brands/types";
import { Section } from "./Section";
import { CtaLink } from "./CtaLink";

// What the brand's form will ask for, right before the button that opens it, so people arrive ready and don't drop off mid-form
export function BeforeYouStart({ brand }: { brand: Brand }) {
  const { title, items } = brand.beforeYouStart;
  return (
    <Section id="before-you-start" title={title}>
      <div className="grid gap-8 md:grid-cols-[1.4fr_1fr] md:items-end">
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.text} className="flex gap-4 rounded-xl border border-slate-200 p-4">
              <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-white">✓</span>
              {item.href ? (
                <a href={item.href} className="link-draw underline decoration-slate-300 underline-offset-4">{item.text}</a>
              ) : (
                <span>{item.text}</span>
              )}
            </li>
          ))}
        </ul>
        <div className="rounded-2xl bg-surface p-6">
          <CtaLink brand={brand} position="before-you-start" className="w-full" />
          <p className="mt-3 text-sm text-slate-600">{brand.ctaNote}</p>
        </div>
      </div>
    </Section>
  );
}
