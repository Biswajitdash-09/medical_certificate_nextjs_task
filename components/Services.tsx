import Image from "next/image";
import type { Brand } from "@/brands/types";
import { Section } from "./Section";
import { CtaLink } from "./CtaLink";

// Photo-led cards; the whole card opens our own detail page, and one Apply button under the list keeps CTAs from competing
export function Services({ brand }: { brand: Brand }) {
  // A half-pictured grid looks broken, so photos appear only once every card has one
  const showPhotos = brand.services.every((s) => s.photo);
  return (
    <Section id="services" title={brand.servicesTitle}>
      {/* Two columns until xl so card text keeps a readable line length; four only when each card is wide enough */}
      <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 xl:grid-cols-4">
        {brand.services.map((s) => {
          const body = (
            <>
              {/* Photo slot renders only when the brand supplies one, so a card is never an empty frame */}
              {showPhotos && s.photo && (
                <div className="photo-frame -mx-5 -mt-5 mb-5 sm:-mx-6 sm:-mt-6 aspect-[4/3] rounded-b-none">
                  <Image src={s.photo.src} alt={s.photo.alt} width={600} height={450} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" className="size-full object-cover" />
                </div>
              )}
              <h3 className="text-[21px] leading-snug sm:text-[22px]">{s.title}</h3>
              <p className="mt-2 text-[16px] leading-relaxed text-slate-600">{s.body}</p>
              {s.uses && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.uses.map((u) => <li key={u} className="rounded-full bg-surface px-3 py-1 text-[13px] text-slate-700">{u}</li>)}
                </ul>
              )}
              {/* Footer pinned to the card bottom: the price when the brand has one, and a visible cue that the card opens its page */}
              <div className="mt-auto flex items-end justify-between gap-3 border-t border-slate-100 pt-4 mt-6">
                {s.price ? <p className="text-[22px] font-semibold text-brand">{s.price}</p> : <span />}
                <span className="text-sm font-semibold text-brand">View details <span aria-hidden="true" className="card-arrow">›</span></span>
              </div>
            </>
          );
          return (
            <li key={s.title} className="flex">
              <a href={`/${brand.id}/${s.slug}`} className="card card-link overflow-hidden sm:p-6">{body}</a>
            </li>
          );
        })}
      </ul>
      <CtaLink brand={brand} position="services" className="mt-10 w-full sm:w-auto" />
    </Section>
  );
}
