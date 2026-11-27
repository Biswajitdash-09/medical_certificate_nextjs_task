"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

// One delegated listener counts every Apply click by brand and position, without touching each button
export function CtaTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const cta = (e.target as Element).closest<HTMLElement>("[data-cta]");
      if (!cta) return;
      const brand = cta.closest<HTMLElement>("[data-brand]")?.dataset.brand ?? "unknown";
      track("apply_click", { brand, position: cta.dataset.cta ?? "unknown" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
