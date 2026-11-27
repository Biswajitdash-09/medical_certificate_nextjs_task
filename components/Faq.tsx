import type { Brand } from "@/brands/types";
import { Section } from "./Section";

// Native <details> works with JS off, is keyboard accessible, and ships zero client code
export function Faq({ brand }: { brand: Brand }) {
  return (
    <Section id="faq" title="Frequently asked questions" tint>
      <div className="divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white">
        {brand.faq.map((f) => (
          <details key={f.q} className="group px-5">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium [&::-webkit-details-marker]:hidden">
              {f.q}
              <span aria-hidden="true" className="text-xl text-brand transition group-open:rotate-45">+</span>
            </summary>
            <p className="pb-5 text-slate-600">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
