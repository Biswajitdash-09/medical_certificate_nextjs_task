import type { Brand } from "@/brands/types";

// Contact and emergency info come only from this brand's config
export function Footer({ brand }: { brand: Brand }) {
  const { contact } = brand;
  return (
    <footer className="bg-slate-950 pb-20 md:pb-0 text-sm text-slate-300">
      <div className="mx-auto max-w-6xl space-y-2 px-4 py-10">
        <p className="font-semibold text-white">{brand.name}</p>
        {contact.emergency && <p>{contact.emergency}</p>}
        {contact.address && <p>{contact.address}</p>}
        {contact.email && <p>Questions? <a href={`mailto:${contact.email}`} className="underline">{contact.email}</a></p>}
        {/* Licence credit for a stand-in photograph, in the one footer line the licence requires */}
        {brand.hero.visual.kind === "photo" && brand.hero.visual.credit && <p className="pt-4 text-xs text-slate-400">{brand.hero.visual.credit}</p>}
      </div>
    </footer>
  );
}
