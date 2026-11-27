import { Suspense } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { brands, getBrand } from "@/brands";
import { BrandShell } from "@/components/BrandShell";
import { HowItWorks } from "@/components/HowItWorks";
import { BeforeYouStart } from "@/components/BeforeYouStart";
import { Legal } from "@/components/Legal";
import { FinalCta } from "@/components/FinalCta";
import { CtaTracking } from "@/components/CtaTracking";

// One page per service, built only from copy already on that brand's homepage
export function generateStaticParams() {
  return Object.values(brands).flatMap((b) => b.services.map((s) => ({ brand: b.id, service: s.slug })));
}

async function resolve(params: PageProps<"/[brand]/[service]">["params"]) {
  const { brand: id, service: slug } = await params;
  const brand = getBrand(id);
  const service = brand?.services.find((s) => s.slug === slug);
  return brand && service ? { brand, service } : undefined;
}

export async function generateMetadata({ params }: PageProps<"/[brand]/[service]">): Promise<Metadata> {
  const found = await resolve(params);
  return found ? { title: `${found.service.title} · ${found.brand.name}`, description: found.service.body, icons: { icon: found.brand.icon } } : {};
}

async function ServiceContent({ params }: { params: PageProps<"/[brand]/[service]">["params"] }) {
  const found = await resolve(params);
  if (!found) notFound();
  const { brand, service } = found;
  return (
    <BrandShell brand={brand}>
      <main>
        <section className="bg-surface">
          <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.1fr_1fr] md:items-center md:py-20">
            <div>
              <a href={`/${brand.id}#services`} className="link-draw text-sm text-slate-600">All certificates</a>
              <h1 className="mt-4 text-[40px] leading-[1.05] md:text-[56px]">{service.title}</h1>
              <p className="mt-5 max-w-xl text-lg text-slate-700">{service.body}</p>
              {service.uses && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {service.uses.map((u) => <li key={u} className="rounded-full bg-white px-3 py-1 text-sm">{u}</li>)}
                </ul>
              )}
              {service.price && <p className="mt-6 text-[28px] font-semibold text-brand">{service.price}</p>}
              <a href={`${brand.ctaHref}?type=${service.slug}`} data-cta="service-page" className="btn-primary mt-7">{brand.ctaLabel}</a>
              <p className="mt-3 text-sm text-slate-600">{brand.ctaNote}</p>
            </div>
            {service.photo && (
              <div className="photo-frame aspect-[4/3]">
                <Image src={service.photo.src} alt={service.photo.alt} width={900} height={600} priority sizes="(max-width: 767px) 100vw, 45vw" className="size-full object-cover" />
              </div>
            )}
          </div>
        </section>
        <HowItWorks brand={brand} />
        <BeforeYouStart brand={brand} />
        <Legal brand={brand} />
        <FinalCta brand={brand} />
      </main>
      <CtaTracking />
    </BrandShell>
  );
}

export default function ServicePage({ params }: PageProps<"/[brand]/[service]">) {
  return (
    <Suspense>
      <ServiceContent params={params} />
    </Suspense>
  );
}
