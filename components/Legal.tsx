import type { Brand } from "@/brands/types";
import { Section } from "./Section";

// Verbatim legal points under scan headings, so "non-refundable" is found before someone pays.
// Separate group cards with numbered anchors and surface point tiles for clear scanning across all viewports
export function Legal({ brand }: { brand: Brand }) {
  return (
    <Section id="legal" title="Good to know" tint>
      <div className="space-y-4 sm:space-y-5">
        {brand.legal.map((group, i) => (
          <section
            key={group.heading}
            aria-label={group.heading}
            className="grid gap-5 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-7 lg:grid-cols-[14rem_1fr] lg:items-start lg:gap-10 lg:p-8"
          >
            <div className="flex items-center gap-3 lg:pt-1">
              {/* Solid brand badge: gmc's red text on a 10% red tint failed the contrast check */}
              <span aria-hidden="true" className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand text-xs font-semibold text-brand-ink tabular-nums">
                0{i + 1}
              </span>
              <h3 className="text-[18px] leading-snug text-slate-900 sm:text-[19px]">{group.heading}</h3>
            </div>
            <ul className={`grid gap-3.5 sm:gap-4 text-[15px] leading-relaxed text-slate-700 ${group.points.length > 1 ? "md:grid-cols-2" : ""}`}>
              {group.points.map((p) => (
                <li key={p} className="flex gap-3 rounded-xl bg-surface/60 p-4">
                  <span aria-hidden="true" className="mt-[0.55em] size-2 shrink-0 rounded-full bg-brand/70" />
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
