import Image from "next/image";
import type { Brand } from "@/brands/types";

// The page's one moment: the brand's own sentence on a brand-colour panel beside one of its photos, words lighting up as it scrolls (pure CSS)
export function Statement({ brand }: { brand: Brand }) {
  const words = brand.statement.split(" ");
  // Reuse a service photo the brand already has, so the panel never needs a new asset or an empty frame
  const photo = brand.services.find((s) => s.photo)?.photo;
  return (
    <section aria-label={brand.statement} className="statement bg-white px-4 py-12 md:py-20">
      <div
        className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl bg-brand text-brand-ink lg:grid-cols-[1.35fr_1fr]"
        style={{ "--word-on": "#ffffff", "--word-dim": "rgba(255,255,255,0.55)" } as React.CSSProperties}
      >
        <div className="flex flex-col justify-center gap-6 p-7 sm:p-10 lg:p-14">
          <span aria-hidden="true" className="h-1 w-12 rounded-full bg-white/60" />
          <p className="text-balance text-[32px] font-extrabold leading-[1.08] tracking-tight sm:text-[44px] lg:text-[54px]">
            {words.map((w, i) => (
              <span key={i} className="statement-word" style={{ "--i": i, "--n": words.length } as React.CSSProperties}>
                {w}{" "}
              </span>
            ))}
          </p>
        </div>
        {photo && (
          <div className="relative aspect-[16/10] lg:aspect-auto lg:min-h-[26rem]">
            <Image src={photo.src} alt="" fill sizes="(max-width: 1023px) 100vw, 40vw" className="object-cover" />
          </div>
        )}
      </div>
    </section>
  );
}
