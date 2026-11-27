import type { Brand } from "@/brands/types";

// Contact and emergency info come only from this brand's config
export function Footer({ brand }: { brand: Brand }) {
  const { contact } = brand;
  return (
    <footer className="bg-slate-950 text-sm text-slate-300">
      <div className="mx-auto max-w-6xl space-y-2 px-4 py-10">
        <p className="font-semibold text-white">{brand.name}</p>
        {contact.emergency && <p>{contact.emergency}</p>}
        {contact.address && <p>{contact.address}</p>}
        {contact.email && <p>Questions? <a href={`mailto:${contact.email}`} className="underline">{contact.email}</a></p>}
      </div>
    </footer>
  );
}
