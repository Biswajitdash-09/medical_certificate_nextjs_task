import type { Brand } from "@/brands/types";
import { Section } from "./Section";

// Compact chips: gmc lists 42 countries, so the list must not dominate the page
export function Countries({ brand }: { brand: Brand }) {
  return (
    <Section id="countries" title={`Available in ${brand.countries.length} countries`}>
      <ul className="flex flex-wrap gap-2">
        {brand.countries.map((c) => <li key={c} className="rounded-full border border-slate-200 px-3 py-1 text-sm">{c}</li>)}
      </ul>
    </Section>
  );
}
