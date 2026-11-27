import type { Brand } from "@/brands/types";
import { Section } from "./Section";

// Native <details> works with JS off, is keyboard accessible, and ships zero client code
export function Faq({ brand }: { brand: Brand }) {
  const email = brand.contact.email;
  return (
    <Section id="faq" title="Frequently asked questions" tint>
      {/* With a contact email the questions get a side note on wide screens; without one they stay a single readable column */}
      <div className={email ? "grid gap-8 lg:grid-cols-[1fr_18rem] lg:gap-12" : "max-w-4xl"}>
        <div className="divide-y divide-slate-100 rounded-2xl bg-white px-5 shadow-sm sm:px-7">
          {brand.faq.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] font-medium leading-snug [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-surface text-lg text-brand transition group-open:rotate-45 group-open:bg-brand group-open:text-brand-ink">+</span>
              </summary>
              <p className="max-w-prose pb-6 pr-12 leading-relaxed text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
        {email && (
          <aside className="self-start rounded-2xl bg-white p-6 shadow-sm lg:sticky lg:top-24">
            <p className="text-[19px] font-semibold leading-snug">Still have a question?</p>
            <a href={`mailto:${email}`} className="link-draw mt-2 inline-block break-all font-medium text-brand">{email}</a>
          </aside>
        )}
      </div>
    </Section>
  );
}
