// Shape every brand config must satisfy; components read only these fields, so brands never share copy
export type Brand = {
  id: "dr" | "gmc";
  name: string;
  domains: string[]; // hostnames proxy.ts rewrites to this brand's route, so each brand can live on its own domain
  icon: string; // square favicon, one per brand so browser tabs never show the other brand
  logo: { src: string; alt: string; width: number }; // width at 32px height, so the header never branches on brand
  colors: { primary: string; primaryText: string; accent: string; bg: string; text: string };
  ctaLabel: string;
  ctaHref: string; // always our own /<brand>/apply page; we never send people to the live sites
  minAge?: number; // youngest age the brand serves, enforced on the apply form
  ctaNote: string; // where Apply leads, shown under the main buttons so the jump to the external form is expected
  beforeYouStart: { title: string; items: { text: string; href?: string }[] }; // what the brand's form will ask for, from its own site
  nav: { label: string; href: string }[];
  hero: { eyebrow: string; title: string; body: string; bullets: string[]; visual: HeroVisual };
  statement: string; // one live sentence the page sets large as its moment; never new copy
  servicesTitle: string; // each brand words its own services heading; a shared default leaked dr copy onto gmc
  services: { slug: string; title: string; body: string; price?: string; uses?: string[]; photo?: { src: string; alt: string } }[]; // photo slot renders only when set, so no card is ever an empty frame
  portal: { region: string; price: string; ground: string }; // the / chooser half: two live facts and the colour its half is painted
  steps: { title: string; body: string }[];
  facts?: { label: string; value: string }[];
  priceTable?: { country: string; price: string }[];
  countries: string[];
  legal: { heading: string; points: string[] }[]; // verbatim points, grouped only so people can scan them
  faq: { q: string; a: string }[];
  contact: { email?: string; address?: string; emergency?: string };
  meta: { title: string; description: string; url: string };
  // Optional parity fields: brands that omit them keep the simple flat nav, footer, and English-only routing
  locales?: Locale[];
  megaNav?: NavGroup[];
  footerColumns?: FooterColumn[];
  socials?: Social[];
};

// Supported UI/content locales; English is unprefixed in URLs
export type Locale = "en" | "fil" | "id" | "ms" | "th" | "vi" | "km" | "lo" | "my";

// Mega-menu group for desktop dropdowns and mobile accordions
export type NavGroup = {
  title: string;
  items: { label: string; href: string; blurb?: string; image?: string }[];
  seeAll?: { label: string; href: string };
};

// Structured footer link column
export type FooterColumn = { title: string; links: { label: string; href: string }[] };

// Social profile link rendered as an inline SVG icon
export type Social = { kind: "x" | "instagram" | "linkedin"; href: string };

// Scraped content block rendered by components/ContentPage.tsx
export type PageBlock =
  | { kind: "heading"; level: 2 | 3; text: string }
  | { kind: "text"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "faq"; items: { q: string; a: string }[] }
  | { kind: "table"; head: string[]; rows: string[][] };

// One scraped internal page in a single locale
export type ContentPage = {
  slug: string;
  title: string;
  description: string;
  blocks: PageBlock[];
  service?: string;
  group?: "service" | "country" | "symptom" | "certificate" | "audience" | "guide" | "company" | "legal";
  lastUpdated?: string;
};

// The hero shows the real thing: dr's live certificate illustration, or a photograph with its licence credit
export type HeroVisual =
  | { kind: "certificate"; photo?: { src: string; alt: string }; brandLine: string; title: string; type: string; fields: { label: string; value: string }[]; assessment: string; signer: string; reg: string; seal: string; watermark: string }
  | { kind: "photo"; src: string; alt: string; width: number; height: number; credit?: string };
