"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import type { NavGroup } from "@/brands/types";

// Desktop mega-menu: hover with 150ms intent delay, click/Enter toggle, Escape & outside click close, arrow-key nav
export function MegaMenu({ groups }: { groups: NavGroup[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname() ?? "";

  const clearTimer = () => {
    if (hoverTimer.current) {
      clearTimeout(hoverTimer.current);
      hoverTimer.current = null;
    }
  };

  useEffect(() => {
    if (openIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        const prev = openIdx;
        setOpenIdx(null);
        triggerRefs.current[prev]?.focus();
      }
    };
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpenIdx(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openIdx]);

  function onPanelKeyDown(e: ReactKeyboardEvent<HTMLDivElement>) {
    if (!["ArrowDown", "ArrowUp", "ArrowRight", "ArrowLeft"].includes(e.key)) return;
    const links = Array.from(panelRef.current?.querySelectorAll<HTMLAnchorElement>("a[href]") ?? []);
    if (links.length === 0) return;
    const idx = links.indexOf(document.activeElement as HTMLAnchorElement);
    e.preventDefault();
    const delta = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : -1;
    const next = idx === -1 ? 0 : (idx + delta + links.length) % links.length;
    links[next]?.focus();
  }

  const activeGroup = openIdx !== null ? groups[openIdx] : null;
  const hasImages = Boolean(activeGroup?.items.some((i) => i.image));
  const cols = hasImages ? "grid-cols-2" : activeGroup && activeGroup.items.length > 8 ? "grid-cols-3" : "grid-cols-2";

  return (
    <nav
      ref={rootRef}
      aria-label="Main"
      className="hidden items-center gap-1 lg:flex"
      onMouseLeave={() => {
        clearTimer();
        hoverTimer.current = setTimeout(() => setOpenIdx(null), 150);
      }}
    >
      {groups.map((g, i) => {
        const isOpen = openIdx === i;
        return (
          <div
            key={g.title}
            onMouseEnter={() => {
              clearTimer();
              hoverTimer.current = setTimeout(() => setOpenIdx(i), 150);
            }}
          >
            <button
              ref={(el) => {
                triggerRefs.current[i] = el;
              }}
              type="button"
              aria-expanded={isOpen}
              onClick={() => {
                clearTimer();
                setOpenIdx(isOpen ? null : i);
              }}
              className={`inline-flex min-h-10 items-center gap-1.5 rounded-lg px-3 text-sm font-medium transition-colors ${isOpen ? "bg-surface text-brand" : "text-slate-700 hover:text-brand"}`}
            >
              <span>{g.title}</span>
              <span aria-hidden="true" className={`text-[11px] transition-transform ${isOpen ? "rotate-180" : ""}`}>▾</span>
            </button>
          </div>
        );
      })}

      {activeGroup && (
        <div
          ref={panelRef}
          onMouseEnter={clearTimer}
          onKeyDown={onPanelKeyDown}
          className={`absolute top-full z-50 mt-1 rounded-2xl border border-slate-200 bg-white p-6 shadow-xl ${hasImages ? "left-1/2 w-full max-w-3xl -translate-x-1/2" : "inset-x-4"}`}
        >
          <ul className={`grid gap-2 ${cols}`}>
            {activeGroup.items.map((item) => {
              const isCurrent = pathname === item.href;
              return (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                    onClick={() => setOpenIdx(null)}
                    className={`rounded-xl p-3 transition-colors ${item.image ? "flex items-center gap-3.5" : "block"} ${isCurrent ? "bg-brand/10 text-brand" : "hover:bg-surface"}`}
                  >
                    {item.image && (
                      <Image
                        src={item.image}
                        alt=""
                        width={56}
                        height={42}
                        sizes="56px"
                        className="size-14 shrink-0 rounded-lg object-cover"
                      />
                    )}
                    <span className="min-w-0">
                      <span className="block text-sm font-semibold text-slate-900">{item.label}</span>
                      {/* No "block" here: it would override line-clamp's -webkit-box display and let the blurb wrap */}
                      {item.blurb && <span className="mt-0.5 line-clamp-1 text-xs text-slate-600">{item.blurb}</span>}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
          {activeGroup.seeAll && (
            <div className="mt-4 border-t border-slate-100 pt-3">
              <a
                href={activeGroup.seeAll.href}
                onClick={() => setOpenIdx(null)}
                className="link-draw inline-flex items-center gap-1 text-sm font-semibold text-brand"
              >
                {activeGroup.seeAll.label} <span aria-hidden="true">→</span>
              </a>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
