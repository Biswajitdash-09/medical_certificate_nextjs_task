import type { Brand } from "@/brands/types";
import { Section } from "./Section";
import { CtaLink } from "./CtaLink";

// Whole card links to the live detail page; one Apply button under the list keeps CTAs from competing
export function Services({ brand }: { brand: Brand }) {
  return (
    <Section id="services" title={brand.servicesTitle}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {brand.services.map((s) => {
          const body = (
            <>
              <h3 className="text-lg font-semibold">
                {s.title}
                {s.href && <span aria-hidden="true" className="card-arrow ml-1 text-brand">→</span>}
              </h3>
              <p className="mt-2 text-slate-600">{s.body}</p>
              {s.uses && (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {s.uses.map((u) => <li key={u} className="rounded-full bg-surface px-3 py-1 text-sm">{u}</li>)}
                </ul>
              )}
              {s.price && <p className="mt-auto pt-4 text-xl font-bold text-brand">{s.price}</p>}
            </>
          );
          return (
            <li key={s.title} className="flex">
              {s.href ? (
                <a href={s.href} className="card card-link">{body}</a>
              ) : (
                <div className="card">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
      <CtaLink brand={brand} position="services" className="mt-8 w-full sm:w-auto" />
    </Section>
  );
}
