import type { Brand } from "@/brands/types";
import { Section } from "./Section";

// Verbatim legal points under scan headings, so "non-refundable" is found before someone pays
export function Legal({ brand }: { brand: Brand }) {
  return (
    <Section id="legal" title="Good to know" tint>
      <div className="grid gap-6 md:grid-cols-3">
        {brand.legal.map((group) => (
          <div key={group.heading} className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="font-semibold">{group.heading}</h3>
            <ul className="mt-3 space-y-3 text-sm text-slate-700">
              {group.points.map((p) => (
                <li key={p} className="border-l-2 border-brand pl-3">{p}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
