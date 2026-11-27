import type { Brand } from "@/brands/types";
import { Section } from "./Section";

// Verbatim legal points under scan headings, so "non-refundable" is found before someone pays.
// One card of full-width rows (heading left, points right from lg), so groups of different lengths never leave uneven columns
export function Legal({ brand }: { brand: Brand }) {
  return (
    <Section id="legal" title="Good to know" tint>
      <div className="divide-y divide-slate-100 rounded-2xl bg-white px-5 shadow-sm sm:px-8 lg:px-10">
        {brand.legal.map((group) => (
          <section key={group.heading} aria-label={group.heading} className="grid gap-4 py-6 sm:py-8 lg:grid-cols-[14rem_1fr] lg:gap-10">
            <h3 className="text-[19px] leading-snug lg:pt-0.5">{group.heading}</h3>
            <ul className="grid gap-x-10 gap-y-4 text-[15px] leading-relaxed text-slate-700 md:grid-cols-2">
              {group.points.map((p) => (
                <li key={p} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{p}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </Section>
  );
}
