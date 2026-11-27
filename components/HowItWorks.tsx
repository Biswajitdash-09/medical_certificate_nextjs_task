import type { Brand } from "@/brands/types";
import { Section } from "./Section";

// Three numbered steps; the copy is per brand because each brand describes its review differently
export function HowItWorks({ brand }: { brand: Brand }) {
  return (
    <Section id="how-it-works" title="How it works" tint>
      <ol className="grid gap-4 md:grid-cols-3">
        {brand.steps.map((s, i) => (
          <li key={s.title} className="rounded-2xl bg-white p-6 shadow-sm">
            <span className="grid size-9 place-items-center rounded-full bg-brand font-bold text-brand-ink">{i + 1}</span>
            <h3 className="mt-4 font-semibold">{s.title}</h3>
            <p className="mt-2 text-slate-600">{s.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
