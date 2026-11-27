// Shape every brand config must satisfy; components read only these fields, so brands never share copy
export type Brand = {
  id: "dr" | "gmc";
  name: string;
  domains: string[]; // hostnames proxy.ts rewrites to this brand's route, so each brand can live on its own domain
  icon: string; // square favicon, one per brand so browser tabs never show the other brand
  logo: { src: string; alt: string; width: number }; // width at 32px height, so the header never branches on brand
  colors: { primary: string; primaryText: string; accent: string; bg: string; text: string };
  ctaLabel: string;
  ctaHref: string;
  ctaNote: string; // where Apply leads, shown under the main buttons so the jump to the external form is expected
  beforeYouStart: { title: string; items: { text: string; href?: string }[] }; // what the brand's form will ask for, from its own site
  nav: { label: string; href: string }[];
  hero: { eyebrow: string; title: string; body: string; bullets: string[]; visual: HeroVisual };
  statement: string; // one live sentence the page sets large as its moment; never new copy
  servicesTitle: string; // each brand words its own services heading; a shared default leaked dr copy onto gmc
  services: { title: string; body: string; href?: string; price?: string; uses?: string[]; photo?: { src: string; alt: string } }[]; // photo slot renders only when set, so no card is ever an empty frame
  portal: { region: string; price: string; ground: string }; // the / chooser half: two live facts and the colour its half is painted
  steps: { title: string; body: string }[];
  facts?: { label: string; value: string }[];
  priceTable?: { country: string; price: string }[];
  countries: string[];
  legal: { heading: string; points: string[] }[]; // verbatim points, grouped only so people can scan them
  faq: { q: string; a: string }[];
  contact: { email?: string; address?: string; emergency?: string };
  meta: { title: string; description: string; url: string };
};

// The hero shows the real thing: dr's live certificate illustration, or a photograph with its licence credit
export type HeroVisual =
  | { kind: "certificate"; photo?: { src: string; alt: string }; brandLine: string; title: string; type: string; fields: { label: string; value: string }[]; assessment: string; signer: string; reg: string; seal: string; watermark: string }
  | { kind: "photo"; src: string; alt: string; width: number; height: number; credit?: string };
