import Image from "next/image";
import type { Brand, Social } from "@/brands/types";

function SocialIcon({ kind }: { kind: Social["kind"] }) {
  if (kind === "x") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-current">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (kind === "instagram") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-none stroke-current" strokeWidth="2">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="size-4 fill-current">
      <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002M7 8.48H3V21h4zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91z" />
    </svg>
  );
}

const SOCIAL_LABELS: Record<Social["kind"], string> = { x: "X", instagram: "Instagram", linkedin: "LinkedIn" };

// Contact and emergency info come only from this brand's config; multi-column with mobile accordions when footerColumns is set
export function Footer({ brand }: { brand: Brand }) {
  const { contact, footerColumns, socials } = brand;
  const nav = brand.nav.map((n) => ({ ...n, href: n.href.startsWith("#") ? `/${brand.id}${n.href}` : n.href }));
  const legalCol = footerColumns?.find((c) => c.title.toLowerCase() === "legal");
  const mainCols = footerColumns?.filter((c) => c !== legalCol);

  return (
    <footer id="footer" tabIndex={-1} className="bg-slate-950 pb-24 text-sm text-slate-300 outline-none md:pb-0">
      <div className={`mx-auto grid max-w-6xl gap-10 px-4 py-12 md:py-16 ${mainCols ? "md:grid-cols-[1.35fr_2fr]" : "md:grid-cols-[1.4fr_1fr]"}`}>
        <div className="space-y-4">
          <a href={`/${brand.id}`} className="inline-flex rounded-xl bg-white px-4 py-2.5">
            <Image src={brand.logo.src} alt={brand.logo.alt} width={brand.logo.width} height={32} className="h-6 w-auto" />
          </a>
          {contact.address && <p className="max-w-md leading-relaxed">{contact.address}</p>}
          {contact.email && (
            <p>
              Questions? <a href={`mailto:${contact.email}`} className="text-white underline underline-offset-4">{contact.email}</a>
            </p>
          )}
          {socials && socials.length > 0 && (
            <div className="flex items-center gap-3 pt-1">
              {socials.map((s) => (
                <a
                  key={s.kind}
                  href={s.href}
                  aria-label={SOCIAL_LABELS[s.kind]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid size-9 place-items-center rounded-lg border border-white/15 text-slate-300 transition-colors hover:border-white/40 hover:text-white"
                >
                  <SocialIcon kind={s.kind} />
                </a>
              ))}
            </div>
          )}
        </div>

        {mainCols ? (
          <nav aria-label="Footer">
            {/* Accordions on phones so the footer stays compact; side-by-side columns from md */}
            <div className="divide-y divide-white/10 md:hidden">
              {mainCols.map((col) => (
                <details key={col.title} className="group py-3">
                  <summary className="flex cursor-pointer list-none items-center justify-between font-semibold text-white">
                    <span>{col.title}</span>
                    <span aria-hidden="true" className="text-xs text-slate-400 transition-transform group-open:rotate-180">▾</span>
                  </summary>
                  <ul className="mt-3 space-y-2 pl-1">
                    {col.links.map((l) => (
                      <li key={l.href}><a href={l.href} className="link-draw hover:text-white">{l.label}</a></li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
            <div className="hidden gap-8 md:grid md:grid-cols-3">
              {mainCols.map((col) => (
                <div key={col.title}>
                  <p className="font-semibold text-white">{col.title}</p>
                  <ul className="mt-3 space-y-2">
                    {col.links.map((l) => (
                      <li key={l.href}><a href={l.href} className="link-draw hover:text-white">{l.label}</a></li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </nav>
        ) : (
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {nav.map((n) => (
                <li key={n.href}><a href={n.href} className="link-draw hover:text-white">{n.label}</a></li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl space-y-2 px-4 py-6 text-xs text-slate-400">
          {contact.emergency && <p className="text-sm text-slate-300">{contact.emergency}</p>}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
            <p>© 2026 {brand.name}</p>
            {legalCol && (
              <ul className="flex flex-wrap gap-x-5 gap-y-2">
                {legalCol.links.map((l) => (
                  <li key={l.href}><a href={l.href} className="link-draw hover:text-white">{l.label}</a></li>
                ))}
              </ul>
            )}
          </div>
          {/* Licence credit for a stand-in photograph, in the one footer line the licence requires */}
          {brand.hero.visual.kind === "photo" && brand.hero.visual.credit && <p>{brand.hero.visual.credit}</p>}
        </div>
      </div>
    </footer>
  );
}
