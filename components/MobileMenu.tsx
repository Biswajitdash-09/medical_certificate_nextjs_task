"use client";

import { useEffect, useState } from "react";
import type { Brand, Locale, NavGroup } from "@/brands/types";
import { LanguageSwitcher } from "./LanguageSwitcher";

type Props = Pick<Brand, "nav" | "ctaLabel" | "ctaHref"> & {
  megaNav?: NavGroup[];
  brandId?: string;
  locales?: Locale[];
  currentLocale?: Locale;
  translatedLocales?: Locale[];
};

// Small-screen nav; renders <details> accordions when megaNav is present, flat links otherwise
export function MobileMenu({ nav, ctaLabel, ctaHref, megaNav, brandId, locales, currentLocale, translatedLocales }: Props) {
  const [open, setOpen] = useState(false);

  // Escape closes the menu, matching how users dismiss any overlay
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className={megaNav ? "lg:hidden" : "md:hidden"}>
      <button
        type="button"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen(!open)}
        className="grid size-11 place-items-center rounded-lg border border-slate-200 bg-white"
      >
        <span aria-hidden="true" className="text-xl leading-none">{open ? "✕" : "☰"}</span>
      </button>
      {open && (
        <nav id="mobile-menu" className="absolute inset-x-0 top-full max-h-[80svh] overflow-y-auto border-b border-slate-200 bg-white px-4 pb-5 shadow-lg">
          {brandId && locales && locales.length > 0 && (
            <div className="border-b border-slate-100 py-3">
              <LanguageSwitcher brandId={brandId} locales={locales} currentLocale={currentLocale} translatedLocales={translatedLocales} fullWidth />
            </div>
          )}
          {megaNav ? (
            <div className="divide-y divide-slate-100">
              {megaNav.map((group) => (
                <details key={group.title} className="group py-2">
                  <summary className="flex cursor-pointer list-none items-center justify-between py-2 font-semibold text-slate-900">
                    <span>{group.title}</span>
                    <span aria-hidden="true" className="text-xs text-slate-400 transition-transform group-open:rotate-180">▾</span>
                  </summary>
                  <ul className="space-y-1 pb-2 pl-2">
                    {group.items.map((item) => (
                      <li key={item.href}>
                        <a href={item.href} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-2 text-sm text-slate-700 hover:bg-surface">
                          {item.label}
                        </a>
                      </li>
                    ))}
                    {group.seeAll && (
                      <li>
                        <a href={group.seeAll.href} onClick={() => setOpen(false)} className="block rounded-lg px-2 py-2 text-sm font-semibold text-brand">
                          {group.seeAll.label} →
                        </a>
                      </li>
                    )}
                  </ul>
                </details>
              ))}
            </div>
          ) : (
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a href={item.href} onClick={() => setOpen(false)} className="block border-b border-slate-100 py-3.5 font-medium">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          )}
          <a href={ctaHref} data-cta="menu" className="mt-4 flex min-h-12 items-center justify-center rounded-xl bg-brand font-semibold text-brand-ink">
            {ctaLabel}
          </a>
        </nav>
      )}
    </div>
  );
}
