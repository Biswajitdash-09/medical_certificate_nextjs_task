import type { HeroVisual } from "@/brands/types";

type Certificate = Extract<HeroVisual, { kind: "certificate" }>;

// HTML rebuild of dr's live certificate illustration: crisp at any size, no image request, watermark kept for honesty
export function CertificateCard({ visual }: { visual: Certificate }) {
  return (
    <figure aria-label={`${visual.title}, ${visual.type}, illustration`} className="relative mx-auto max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_30px_60px_-20px_rgba(15,23,42,0.25)]">
      <span aria-hidden="true" className="pointer-events-none absolute right-[-2.5rem] top-6 rotate-[35deg] bg-brand/10 px-12 py-1 text-xs font-bold tracking-[0.3em] text-brand">
        {visual.watermark}
      </span>
      <p className="text-sm font-bold text-brand">{visual.brandLine}</p>
      <p className="mt-4 text-2xl font-extrabold tracking-tight">{visual.title}</p>
      <p className="text-slate-500">{visual.type}</p>
      <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-slate-100 py-5">
        {visual.fields.map((f) => (
          <div key={f.label}>
            <dt className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">{f.label}</dt>
            <dd className="mt-0.5 font-medium">{f.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-5 text-sm leading-relaxed text-slate-600">{visual.assessment}</p>
      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <svg aria-hidden="true" viewBox="0 0 120 28" className="h-7 w-28 text-ink"><path d="M2 20c10-14 16-14 18-4s8 6 14-4 10 2 14 8 12-10 20-6 10 8 18 2 14-6 30-4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
          <p className="text-sm font-semibold">{visual.signer}</p>
          <p className="text-xs text-slate-500">{visual.reg}</p>
        </div>
        <span className="grid size-20 shrink-0 place-items-center rounded-full border-2 border-accent text-center text-[10px] font-bold uppercase leading-tight tracking-wide text-accent">
          {visual.seal}
        </span>
      </div>
    </figure>
  );
}
