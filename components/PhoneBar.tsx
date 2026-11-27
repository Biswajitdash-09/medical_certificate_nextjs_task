"use client";

import { useEffect, useState } from "react";
import type { Brand } from "@/brands/types";

// Phone-only Apply bar: appears once the hero button scrolls away, so the action is always one tap off
export function PhoneBar({ ctaLabel, ctaHref }: Pick<Brand, "ctaLabel" | "ctaHref">) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const target = document.getElementById("hero-cta");
    if (!target) return;
    const io = new IntersectionObserver(([entry]) => setShown(!entry.isIntersecting));
    io.observe(target);
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
