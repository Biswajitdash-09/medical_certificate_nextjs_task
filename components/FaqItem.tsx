// Shared native <details> FAQ row used by both the homepage Faq section and scraped ContentPage accordions
export function FaqItem({ q, a }: { q: string; a: string }) {
  return (
    <details className="group">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-5 text-[17px] font-medium leading-snug [&::-webkit-details-marker]:hidden">
        {q}
        <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-surface text-lg text-brand transition group-open:rotate-45 group-open:bg-brand group-open:text-brand-ink">+</span>
      </summary>
      <p className="max-w-prose pb-6 pr-12 leading-relaxed text-slate-600">{a}</p>
    </details>
  );
}
