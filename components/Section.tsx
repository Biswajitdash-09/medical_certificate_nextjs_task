import type { ReactNode } from "react";

// Shared section frame so spacing and heading scale are identical across brands
export function Section({ id, title, intro, tint, children }: { id: string; title: string; intro?: string; tint?: boolean; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={tint ? "bg-surface" : ""}>
      <div className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <h2 id={`${id}-title`} className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
        {intro && <p className="mt-3 max-w-2xl text-slate-600">{intro}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}
