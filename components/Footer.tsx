import Image from "next/image";
import type { Brand } from "@/brands/types";

// Contact and emergency info come only from this brand's config; columns from md, stacked on phones
export function Footer({ brand }: { brand: Brand }) {
  const { contact } = brand;
  // Same rule as the header: section anchors point at the brand homepage so links work from inner pages
  const nav = brand.nav.map((n) => ({ ...n, href: n.href.startsWith("#") ? `/${brand.id}${n.href}` : n.href }));
  return (
    <footer className="bg-slate-950 pb-24 text-sm text-slate-300 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-[1.4fr_1fr] md:py-16">
        <div className="space-y-4">
          <a href={`/${brand.id}`} className="inline-flex rounded-xl bg-white px-4 py-2.5">
            <Image src={brand.logo.src} alt={brand.logo.alt} width={brand.logo.width} height={32} className="h-6 w-auto" />
          </a>
          {contact.address && <p className="max-w-md leading-relaxed">{contact.address}</p>}
          {contact.email && (
            <p>
              Questions? <a href={`mailto:${contact.email}`} className="text-white underline underline-offset-4">{contact.email}</a>
            </p>
          )}
        </div>
        <nav aria-label="Footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
            {nav.map((n) => (
              <li key={n.href}><a href={n.href} className="link-draw hover:text-white">{n.label}</a></li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl space-y-2 px-4 py-6 text-xs text-slate-400">
          {/* Emergency line stays visible on every page, set apart from the links */}
          {contact.emergency && <p className="text-sm text-slate-300">{contact.emergency}</p>}
          <p>{brand.name}</p>
          {/* Licence credit for a stand-in photograph, in the one footer line the licence requires */}
          {brand.hero.visual.kind === "photo" && brand.hero.visual.credit && <p>{brand.hero.visual.credit}</p>}
        </div>
      </div>
    </footer>
  );
}
