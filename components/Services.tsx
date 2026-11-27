import type { Brand } from "@/brands/types";
import { Section } from "./Section";
import { CtaLink } from "./CtaLink";

// One Apply button under the whole list instead of one per card: fewer competing CTAs
export function Services({ brand }: { brand: Brand }) {
  return (
    <Section id="services" title={brand.servicesTitle}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {brand.services.map((s) => (
          <li key={s.title} className="flex flex-col rounded-2xl border border-slate-200 p-5">
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-slate-600">{s.body}</p>
            {s.uses && (
              <ul className="mt-3 flex flex-wrap gap-2">
                {s.uses.map((u) => <li key={u} className="rounded-full bg-surface px-3 py-1 text-sm">{u}</li>)}
              </ul>
            )}
            {s.price && <p className="mt-auto pt-4 text-xl font-bold text-brand">{s.price}</p>}
          </li>
        ))}
      </ul>
      <CtaLink brand={brand} className="mt-8 w-full sm:w-auto" />
    </Section>
  );
}
