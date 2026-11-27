"use client";

import { useEffect, useState } from "react";
import type { Brand } from "@/brands/types";

// Phone-only Apply bar: shown only while no in-page Apply button is on screen, so the action is one tap off but never doubled
export function PhoneBar({ ctaLabel, ctaHref }: Pick<Brand, "ctaLabel" | "ctaHref">) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const targets = document.querySelectorAll("main [data-cta]");
    if (!targets.length) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setShown(visible.size === 0);
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div data-testid="phone-bar" data-shown={shown} className="phone-bar md:hidden" aria-hidden={!shown}>
      <a href={ctaHref} data-cta="phone-bar" tabIndex={shown ? 0 : -1} className="btn-primary w-full">
        {ctaLabel} <span aria-hidden="true" className="btn-arrow">→</span>
      </a>
    </div>
  );
}
