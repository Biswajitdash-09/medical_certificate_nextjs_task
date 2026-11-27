// Shape every brand config must satisfy; components read only these fields, so brands never share copy
export type Brand = {
  id: "dr" | "gmc";
  name: string;
  logo: { src: string; alt: string; width: number }; // width at 32px height, so the header never branches on brand
  colors: { primary: string; primaryText: string; accent: string; bg: string; text: string };
  ctaLabel: string;
  ctaHref: string;
  nav: { label: string; href: string }[];
  hero: { eyebrow: string; title: string; body: string; bullets: string[] };
  services: { title: string; body: string; price?: string; uses?: string[] }[];
  steps: { title: string; body: string }[];
  facts?: { label: string; value: string }[];
  priceTable?: { country: string; price: string }[];
  countries: string[];
  legal: string[];
  faq: { q: string; a: string }[];
  contact: { email?: string; address?: string; emergency?: string };
  meta: { title: string; description: string };
};
