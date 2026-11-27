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
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {brand.services.map((s) => {
          const body = (
            <>
              {/* Photo slot renders only when the brand supplies one, so a card is never an empty frame */}
              {showPhotos && s.photo && (
                <div className="photo-frame -mx-5 -mt-5 mb-5 aspect-[4/3] rounded-b-none">
                  <Image src={s.photo.src} alt={s.photo.alt} width={600} height={450} sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw" className="size-full object-cover" />
                </div>
              )}
              <h3 className="text-[22px] leading-snug">{s.title}</h3>
              <p className="mt-2 text-slate-600">{s.body}</p>
              {s.uses && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.uses.map((u) => <li key={u} className="rounded-full bg-surface px-3 py-1 text-sm">{u}</li>)}
                </ul>
              )}
              {s.price && <p className="mt-auto pt-5 text-[22px] font-semibold text-brand">{s.price}</p>}
            </>
          );
          return (
            <li key={s.title} className="flex">
              <a href={`/${brand.id}/${s.slug}`} className="card card-link overflow-hidden">{body}</a>
            </li>
          );
        })}
      </ul>
      <CtaLink brand={brand} position="services" className="mt-10 w-full sm:w-auto" />
    </Section>
  );
}
