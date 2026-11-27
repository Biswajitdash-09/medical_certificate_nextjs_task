import type { Brand } from "@/brands/types";
import { Section } from "./Section";

// Every legal point in one scannable block, verbatim from the brand's live site
export function Legal({ brand }: { brand: Brand }) {
  return (
    <Section id="legal" title="Good to know" tint>
      <ul className="grid gap-3 md:grid-cols-2">
        {brand.legal.map((l) => (
          <li key={l} className="rounded-xl border-l-4 border-brand bg-white p-4 text-sm text-slate-700">{l}</li>
        ))}
      </ul>
    </Section>
  );
}
