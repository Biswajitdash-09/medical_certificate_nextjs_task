import Image from "next/image";
import type { Brand } from "@/brands/types";
import { CtaLink } from "./CtaLink";
import { CertificateCard } from "./CertificateCard";

// First screen: the promise, one primary action, and the real thing beside it (certificate or photograph)
export function Hero({ brand }: { brand: Brand }) {
  const { hero } = brand;
  const visual = hero.visual;
  return (
    <section id="top" className="bg-surface" data-enter>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-10 md:min-h-[calc(100svh-4rem)] md:grid-cols-[1.1fr_1fr] md:items-center md:py-16">
        <div className="enter-1">
          <p className="text-sm font-semibold uppercase tracking-wide text-accent">{hero.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-extrabold leading-[1.08] tracking-tight text-balance md:text-6xl">{hero.title}</h1>
          <p className="mt-5 max-w-xl text-lg text-slate-700">{hero.body}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CtaLink brand={brand} id="hero-cta" position="hero" />
            <a href="#how-it-works" className="btn-ghost">How it works</a>
          </div>
          <ul className="mt-8 grid gap-2.5 text-[15px] sm:grid-cols-2">
            {hero.bullets.map((b) => (
              <li key={b} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-[11px] font-bold text-white">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="enter-2">
          {visual.kind === "certificate" ? (
            <CertificateCard visual={visual} />
          ) : (
            <div className="photo-frame aspect-[4/3] md:aspect-[4/5]">
              <Image src={visual.src} alt={visual.alt} width={visual.width} height={visual.height} priority sizes="(max-width: 767px) 100vw, 45vw" className="size-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
