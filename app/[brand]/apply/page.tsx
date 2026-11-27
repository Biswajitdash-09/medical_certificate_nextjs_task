import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brands, getBrand } from "@/brands";
import { BrandShell } from "@/components/BrandShell";
import { ApplyForm } from "@/components/ApplyForm";
import { CtaTracking } from "@/components/CtaTracking";

export function generateStaticParams() {
  return Object.keys(brands).map((brand) => ({ brand }));
}

export async function generateMetadata({ params }: PageProps<"/[brand]/apply">): Promise<Metadata> {
  const brand = getBrand((await params).brand);
  return brand ? { title: `Apply · ${brand.name}`, robots: { index: false }, icons: { icon: brand.icon } } : {};
}

// Our own application page; the certificate type is picked on the form, so the page stays static
async function ApplyContent({ params }: { params: PageProps<"/[brand]/apply">["params"] }) {
  const brand = getBrand((await params).brand);
  if (!brand) notFound();
  return (
    <BrandShell brand={brand}>
      <main className="bg-surface">
        <div className="mx-auto max-w-3xl px-4 py-12 md:py-16">
          <a href={`/${brand.id}`} className="link-draw text-sm text-slate-600">Back to {brand.name}</a>
          <h1 className="mt-4 text-[36px] leading-tight md:text-[48px]">{brand.ctaLabel}</h1>
          <ul className="mt-6 grid gap-2 text-[15px] text-slate-700 sm:grid-cols-2">
            {brand.beforeYouStart.items.map((i) => (
              <li key={i.text} className="flex gap-2.5">
                <span aria-hidden="true" className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-accent text-[11px] font-bold text-white">✓</span>
                {i.text}
              </li>
            ))}
          </ul>
          <div className="mt-10 rounded-2xl bg-white p-6 shadow-sm md:p-10">
            <ApplyForm brand={brand} />
          </div>
        </div>
      </main>
      <CtaTracking />
    </BrandShell>
  );
}

export default function ApplyPage({ params }: PageProps<"/[brand]/apply">) {
  return (
    <Suspense>
      <ApplyContent params={params} />
    </Suspense>
  );
}
