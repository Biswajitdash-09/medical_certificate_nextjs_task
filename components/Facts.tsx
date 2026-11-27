import type { Brand } from "@/brands/types";
import { Section } from "./Section";

// Price, timing and reviewer stated once, replacing the three places dr repeated them
export function Facts({ brand }: { brand: Brand }) {
  if (!brand.facts) return null;
  return (
    <Section id="facts" title="Before you apply">
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <dl className="grid gap-x-8 gap-y-5 sm:grid-cols-2">
          {brand.facts.map((f) => (
            <div key={f.label}>
              <dt className="font-semibold">{f.label}</dt>
              <dd className="mt-1 text-slate-600">{f.value}</dd>
            </div>
          ))}
        </dl>
        {brand.priceTable && (
          <table className="h-fit w-full overflow-hidden rounded-2xl border border-slate-200 text-left">
            <caption className="sr-only">Price per certificate by country</caption>
            <thead className="bg-surface">
              <tr><th className="p-3">Country</th><th className="p-3">Price per certificate</th></tr>
            </thead>
            <tbody>
              {brand.priceTable.map((r) => (
                <tr key={r.country} className="border-t border-slate-200"><td className="p-3">{r.country}</td><td className="p-3 font-semibold">{r.price}</td></tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </Section>
  );
}
