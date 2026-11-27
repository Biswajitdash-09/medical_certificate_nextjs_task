import Image from "next/image";
import type { Brand } from "@/brands/types";

// The page's one moment: the brand's own sentence on a brand-colour panel beside one of its photos, words lighting up as it scrolls (pure CSS)
export function Statement({ brand }: { brand: Brand }) {
  const words = brand.statement.split(" ");
  // Reuse a service photo the brand already has, so the panel never needs a new asset or an empty frame
  const photo = brand.services.find((s) => s.photo)?.photo;
  return (
    <section aria-label={brand.statement} className="statement bg-white px-4 py-10 sm:py-14 md:py-20">
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-2xl bg-brand shadow-lg shadow-brand/10 sm:rounded-3xl md:grid-cols-[1.25fr_1fr] lg:grid-cols-[1.35fr_1fr]">
        {/* The sentence is the panel's only text, so it carries its own padding instead of sitting in a wrapper div */}
        <p className="self-center text-balance p-6 text-[28px] font-extrabold leading-[1.12] tracking-tight text-white sm:p-10 sm:text-[40px] md:text-[42px] lg:p-14 lg:text-[52px] xl:p-16">
          {words.map((w, i) => (
            <span key={i} className="statement-word" style={{ "--i": i, "--n": words.length } as React.CSSProperties}>
              {w}{" "}
            </span>
          ))}
        </p>
        {photo && (
          <div className="relative aspect-[16/10] sm:aspect-[16/9] md:aspect-auto md:min-h-[22rem] lg:min-h-[26rem]">
            <Image src={photo.src} alt="" fill sizes="(max-width: 767px) 100vw, 42vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
