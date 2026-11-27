"use client";

import { useEffect, useState } from "react";
import type { Brand } from "@/brands/types";

type Props = Pick<Brand, "nav" | "ctaLabel" | "ctaHref">;

// Small-screen nav; includes the Apply link because the live gmc menu had none
export function MobileMenu({ nav, ctaLabel, ctaHref }: Props) {
  const [open, setOpen] = useState(false);

  // Escape closes the menu, matching how users dismiss any overlay
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
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
        <nav id="mobile-menu" className="absolute inset-x-0 top-full border-b border-slate-200 bg-white px-4 pb-5 shadow-lg">
          <ul>
            {nav.map((item) => (
              <li key={item.href}>
                <a href={item.href} onClick={() => setOpen(false)} className="block border-b border-slate-100 py-3.5 font-medium">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={ctaHref} data-cta="menu" className="mt-4 flex min-h-12 items-center justify-center rounded-xl bg-brand font-semibold text-brand-ink">
            {ctaLabel}
          </a>
        </nav>
      )}
    </div>
  );
}
