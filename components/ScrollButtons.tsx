"use client";

import { useEffect, useState } from "react";

// Floating scroll-to-top and scroll-to-bottom buttons; hidden when at top/bottom via IntersectionObserver on sentinels
export function ScrollButtons() {
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const topEl = document.getElementById("scroll-sentinel-top");
    const botEl = document.getElementById("scroll-sentinel-bottom");
    if (!topEl || !botEl || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.target === topEl) setAtTop(e.isIntersecting);
          if (e.target === botEl) setAtBottom(e.isIntersecting);
        }
      },
      { threshold: 0 }
    );
    io.observe(topEl);
    io.observe(botEl);
    return () => io.disconnect();
  }, []);

  function scroll(dir: "top" | "bottom") {
    const reduced = typeof window.matchMedia === "function" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const behavior: ScrollBehavior = reduced ? "auto" : "smooth";
    if (dir === "top") {
      window.scrollTo({ top: 0, behavior });
      document.getElementById("top")?.focus({ preventScroll: true });
    } else {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior });
      document.getElementById("footer")?.focus({ preventScroll: true });
    }
  }

  return (
    <div className="fixed bottom-24 right-4 z-30 flex flex-col gap-2 md:bottom-6 md:right-6">
      {!atTop && (
        <button
          type="button"
          aria-label="Scroll to top"
          onClick={() => scroll("top")}
          className="grid size-11 place-items-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-md backdrop-blur transition hover:border-brand/40 hover:text-brand"
        >
          <span aria-hidden="true">↑</span>
        </button>
      )}
      {!atBottom && (
        <button
          type="button"
          aria-label="Scroll to bottom"
          onClick={() => scroll("bottom")}
          className="grid size-11 place-items-center rounded-full border border-slate-200 bg-white/95 text-slate-700 shadow-md backdrop-blur transition hover:border-brand/40 hover:text-brand"
        >
          <span aria-hidden="true">↓</span>
        </button>
      )}
    </div>
  );
}
