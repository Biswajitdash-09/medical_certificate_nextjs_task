import type { Brand } from "@/brands/types";
import { Section } from "./Section";
import { CountryFlag } from "./CountryFlag";

// Price, timing and reviewer stated once, replacing the three places dr repeated them
export function Facts({ brand }: { brand: Brand }) {
  if (!brand.facts) return null;
  const hasTable = Boolean(brand.priceTable);
  return (
    <Section id="facts" title="Before you apply">
      <div className={hasTable ? "grid gap-8 lg:grid-cols-[1.45fr_1fr] lg:items-start lg:gap-10" : undefined}>
        <dl className={`grid gap-4 sm:grid-cols-2 sm:gap-5 ${hasTable ? "" : "lg:grid-cols-3"}`}>
          {brand.facts.map((f) => (
            <div key={f.label} className="rounded-2xl border border-slate-200/80 bg-surface/50 p-5 sm:p-6">
              <dt className="text-[16px] font-semibold leading-snug text-slate-900">{f.label}</dt>
              <dd className="mt-2 text-[15px] leading-relaxed text-slate-600">{f.value}</dd>
            </div>
          ))}
        </dl>
        {brand.priceTable && (
          <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm lg:sticky lg:top-24">
            <table className="w-full text-left text-[15px]">
              <caption className="sr-only">Price per certificate by country</caption>
              <thead className="border-b border-slate-200/80 bg-surface">
                <tr>
                  <th className="px-4 py-3.5 text-xs font-semibold uppercase tracking-[0.06em] text-slate-600 sm:px-5">Country</th>
                  <th className="px-4 py-3.5 text-right text-xs font-semibold uppercase tracking-[0.06em] text-slate-600 sm:px-5">Price per certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {brand.priceTable.map((r) => (
                  <tr key={r.country} className="transition-colors hover:bg-surface/40">
                    <td className="px-4 py-3.5 text-slate-700 sm:px-5">
                      <span className="inline-flex items-center gap-2.5">
                        <CountryFlag country={r.country} />
                        <span>{r.country}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3.5 text-right font-semibold text-brand tabular-nums sm:px-5">{r.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Section>
  );
}
