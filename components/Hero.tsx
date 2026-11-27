import type { Brand } from "@/brands/types";
import { CtaLink } from "./CtaLink";

// First screen: the promise, one primary action, and the trust points that answer "is this legit?"
export function Hero({ brand }: { brand: Brand }) {
  const { hero } = brand;
  return (
    <section id="top" className="bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-10 md:grid-cols-[1.2fr_1fr] md:items-center md:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">{hero.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-tight tracking-tight md:text-5xl">{hero.title}</h1>
          <p className="mt-4 max-w-xl text-lg text-slate-700">{hero.body}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CtaLink brand={brand} />
            <a href="#how-it-works" className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 font-semibold">
              How it works
            </a>
          </div>
        </div>
        <ul className="space-y-3 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          {hero.bullets.map((b) => (
            <li key={b} className="flex gap-3">
              <span aria-hidden="true" className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-accent text-xs font-bold text-white">✓</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
