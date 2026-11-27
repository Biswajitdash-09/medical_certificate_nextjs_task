import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { brands } from "@/brands";
import type { Brand } from "@/brands/types";

export const metadata: Metadata = {
  title: "Choose a brand",
  description: "DrCertificate and GetMedicalCertificate, built from one Next.js app.",
  icons: { icon: "/portal-icon.svg" },
};

// Each half reuses its brand's own hero photo, so the picker shows the site it opens and fills its space
function heroPhoto(b: Brand) {
  const v = b.hero.visual;
  return v.kind === "photo" ? { src: v.src, alt: v.alt } : v.photo;
}

// Split brand portal: each half is painted entirely from that brand's own config, so no copy crosses between them
export default function Home() {
  return (
    <main className="grid min-h-svh md:grid-cols-2">
      {Object.values(brands).map((b) => {
        const photo = heroPhoto(b);
        return (
          <Link
            key={b.id}
            href={`/${b.id}`}
            style={{ background: b.portal.ground }}
            className="group flex flex-col gap-6 px-4 py-8 text-white outline-offset-[-6px] sm:px-8 sm:py-10 md:min-h-svh md:gap-8 md:p-12 lg:p-16"
          >
            <span className="inline-flex w-fit rounded-xl bg-white px-4 py-2.5">
              <Image src={b.logo.src} alt={b.logo.alt} width={b.logo.width} height={32} className="h-6 w-auto md:h-7" />
            </span>

            {/* Photo takes the free height on desktop and a short banner on phones, instead of an empty block */}
            {photo && (
              <span className="relative block aspect-[16/9] overflow-hidden rounded-2xl md:aspect-auto md:min-h-64 md:flex-1">
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  priority
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-cover transition duration-500 group-hover:scale-[1.03] motion-reduce:transition-none"
                />
              </span>
            )}

            <span className="block">
              <span className="block text-[15px] text-white/80">{b.portal.region}</span>
              <span className="mt-1.5 block text-[34px] font-semibold leading-[1.05] tracking-[-0.03em] sm:text-[44px] lg:text-[56px]">{b.portal.price}</span>
              <span className="mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-white px-6 font-semibold text-slate-900 transition group-hover:-translate-y-px group-active:translate-y-px sm:w-auto">
                Open {b.name}
              </span>
            </span>
          </Link>
        );
      })}
    </main>
  );
}
