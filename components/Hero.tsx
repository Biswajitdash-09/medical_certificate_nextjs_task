import Image from "next/image";
import type { Brand } from "@/brands/types";
import { CtaLink } from "./CtaLink";
import { CertificateCard } from "./CertificateCard";

// First screen: the promise, one primary action, and the real thing beside it; two columns only from lg so text and card never get cramped
export function Hero({ brand }: { brand: Brand }) {
  const { hero } = brand;
  const visual = hero.visual;
  return (
    <section id="top" className="bg-surface" data-enter>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-14 pt-10 sm:pt-14 lg:min-h-[calc(100svh-4rem)] lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-14 lg:py-14">
        <div className="enter-1">
          <p className="text-[15px] font-medium text-accent">{hero.eyebrow}</p>
          <h1 className="mt-3 max-w-[15ch] text-balance text-[40px] leading-[1.04] sm:text-[52px] xl:text-[60px]">{hero.title}</h1>
          <p className="mt-5 max-w-[34rem] text-lg text-slate-700">{hero.body}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CtaLink brand={brand} id="hero-cta" position="hero" />
            <a href="#how-it-works" className="btn-ghost">How it works</a>
          </div>
          {/* Says where Apply leads, so the application form is expected, not a surprise */}
          <p className="mt-3 text-sm text-slate-600">{brand.ctaNote}</p>
          <ul className="mt-8 grid gap-2.5 text-[15px] sm:grid-cols-2">
            {hero.bullets.map((b) => (
              <li key={b} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-[11px] font-bold text-white">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="enter-2 mx-auto w-full max-w-xl lg:max-w-none">
          {visual.kind === "certificate" ? (
            visual.photo ? (
              // The document lies over the corner of a home photo: the product, and the life it fits into
              <div className="relative">
                {/* From lg the photo takes the full column and the card shrinks into the lower-left corner, so most of the photo stays visible */}
                <div className="photo-frame ml-auto aspect-[4/3] w-[88%] lg:aspect-[4/5] lg:w-full">
                  <Image src={visual.photo.src} alt={visual.photo.alt} width={800} height={1000} priority sizes="(max-width: 1023px) 90vw, 40vw" className="size-full object-cover object-[65%_50%]" />
                </div>
                {/* Below lg the card stays in flow and only overlaps the photo edge, so it can never cover the text above */}
                <div className="relative -mt-24 w-[86%] sm:-mt-32 sm:w-[64%] lg:absolute lg:-bottom-6 lg:-left-10 lg:mt-0 lg:w-[17rem] xl:w-[18rem]">
                  <CertificateCard visual={visual} compact />
                </div>
              </div>
            ) : (
              <CertificateCard visual={visual} />
            )
          ) : (
            <div className="photo-frame aspect-[4/3] lg:aspect-[4/5]">
              <Image src={visual.src} alt={visual.alt} width={visual.width} height={visual.height} priority sizes="(max-width: 1023px) 90vw, 45vw" className="size-full object-cover" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
