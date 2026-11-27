import type { Brand } from "@/brands/types";
import { Section } from "./Section";
import { CountryFlag } from "./CountryFlag";

// Compact chips: gmc lists 42 countries, so the list must not dominate the page
export function Countries({ brand }: { brand: Brand }) {
  return (
    <Section id="countries" title={`Available in ${brand.countries.length} countries`}>
      <ul className="flex flex-wrap gap-2.5">
        {brand.countries.map((c) => (
          <li key={c} className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white px-3.5 py-1.5 text-sm font-medium text-slate-700 shadow-xs transition-colors hover:border-brand/30 hover:bg-surface/50">
            <CountryFlag country={c} />
            <span>{c}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
