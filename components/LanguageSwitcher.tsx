"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import type { Locale } from "@/brands/types";

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  fil: "Filipino",
  id: "Bahasa Indonesia",
  ms: "Bahasa Melayu",
  th: "ไทย",
  vi: "Tiếng Việt",
  km: "ខ្មែរ",
  lo: "ລາວ",
  my: "မြန်မာ",
};

// Compute the target href for switching to `target` locale from the current pathname
export function localeHref(brandId: string, pathname: string, locales: Locale[], target: Locale, translatedLocales?: Locale[]): string {
  const prefix = `/${brandId}`;
  const rest = pathname.startsWith(prefix) ? pathname.slice(prefix.length).replace(/^\/+/, "") : "";
  const segs = rest ? rest.split("/") : [];
  const first = segs[0] as Locale | undefined;
  const slugSegs = first && first !== "en" && locales.includes(first) ? segs.slice(1) : segs;
  const slug = slugSegs.join("/");
  const base = target === "en" ? prefix : `${prefix}/${target}`;
  if (!slug) return base;
  if (translatedLocales && !translatedLocales.includes(target)) return base;
  return `${base}/${slug}`;
}

// Language switcher dropdown; renders nothing when a brand defines no locales (e.g. GetMedicalCertificate)
export function LanguageSwitcher({
  brandId,
  locales,
  currentLocale = "en",
  translatedLocales,
  fullWidth = false,
}: {
  brandId: string;
  locales?: Locale[];
  currentLocale?: Locale;
  translatedLocales?: Locale[];
  fullWidth?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname() ?? `/${brandId}`;

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open]);

  if (!locales || locales.length === 0) return null;

  return (
    <div ref={rootRef} className={`relative ${fullWidth ? "w-full" : ""}`}>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${LOCALE_NAMES[currentLocale]}`}
        onClick={() => setOpen((o) => !o)}
        className={`inline-flex min-h-10 items-center justify-between gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-medium text-slate-700 hover:border-brand/40 ${fullWidth ? "w-full" : ""}`}
      >
        <span>{LOCALE_NAMES[currentLocale]}</span>
        <span aria-hidden="true" className="text-xs text-slate-400">▾</span>
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label="Languages"
          className={`absolute z-50 mt-1.5 max-h-72 overflow-y-auto rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg ${fullWidth ? "inset-x-0" : "right-0 w-48"}`}
        >
          {locales.map((loc) => {
            const href = localeHref(brandId, pathname, locales, loc, translatedLocales);
            const active = loc === currentLocale;
            return (
              <li key={loc} role="option" aria-selected={active}>
                <a
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors ${active ? "bg-brand/10 font-semibold text-brand" : "text-slate-700 hover:bg-surface"}`}
                >
                  <span>{LOCALE_NAMES[loc]}</span>
                  {active && <span aria-hidden="true">✓</span>}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
