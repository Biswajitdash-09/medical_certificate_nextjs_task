import Image from "next/image";
import Link from "next/link";
import { brands } from "@/brands";

export const metadata = { title: "Choose a brand", description: "DrCertificate and GetMedicalCertificate, built from one Next.js app." };

// Split brand portal: each half is painted entirely from that brand's own config, so no copy crosses between them
export default function Home() {
  return (
    <main className="grid min-h-svh md:grid-cols-2">
      {Object.values(brands).map((b) => (
        <Link
          key={b.id}
          href={`/${b.id}`}
          style={{ background: b.portal.ground }}
          className="group relative flex min-h-[50svh] flex-col justify-between p-8 text-white md:min-h-svh md:p-14"
        >
          <span className="inline-flex w-fit rounded-xl bg-white px-4 py-3">
            <Image src={b.logo.src} alt={b.logo.alt} width={b.logo.width} height={32} className="h-7 w-auto" />
          </span>
          <span>
            <span className="block text-[15px] text-white/75">{b.portal.region}</span>
            <span className="mt-2 block text-[40px] font-semibold leading-[1.05] tracking-[-0.03em] md:text-[56px]">{b.portal.price}</span>
            <span className="mt-8 inline-flex min-h-12 items-center rounded-xl bg-white px-6 font-semibold text-slate-900 transition group-hover:-translate-y-px group-active:translate-y-px">
              Open {b.name}
            </span>
          </span>
        </Link>
      ))}
    </main>
  );
}
