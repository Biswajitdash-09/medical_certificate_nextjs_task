# Two-Brand Medical Certificate Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** One Next.js 16 app that renders an improved homepage for drcertificate.com and getmedicalcertificate.com from shared components and per-brand config files, deployed on Vercel.

**Architecture:** Brand switch by route: `app/[brand]/page.tsx` with `generateStaticParams` returns `dr` and `gmc`, so one Vercel deployment serves `/dr` and `/gmc` as static pages; `/` is a two-link chooser. Each brand is one typed config file (`brands/dr.ts`, `brands/gmc.ts`) satisfying a shared `Brand` type; sections are plain server components that take `brand` as a prop and render nothing when their slice of config is absent. Colours are CSS variables set from config on the page wrapper. Only two client components exist: the mobile menu and (none for FAQ — native `<details>`).

**Tech Stack:** Next.js 16 (App Router, TypeScript), Tailwind CSS v4, `next/font`, `next/image`, Vitest + React Testing Library, Vercel.

**Spec:** `C:\Users\biswa\Downloads\Nextjs-Assignment.pdf`, plus the site audit and Lighthouse results in `evidence/` (Lighthouse JSON saved 2026-11-27).

## Global Constraints

- Next.js 16, App Router, TypeScript.
- Each brand's text, colours, logo and legal points live in its own config file.
- The FAQ and the mobile menu must work.
- Don't change the prices, the services or the legal points on either site.
- Don't invent reviews, numbers or claims that are not on the current sites.
- Keep the brands separate: no text, rules or claims from one brand showing up on the other.
- Commit as you go, not in one commit at the end.
- No third-party scripts (the cause of the TBT of 1,490 ms / 950 ms measured on the live sites).
- Every "Apply now" / "Get a certificate" link points at the brand's real application URL copied from the live site (`ctaHref` in config).

## Review Focus

1. A string from one brand appearing on the other's page (e.g. "€34.99" or "Stripe" on `/dr`, "IST" or "India" on `/gmc`) → must never happen. Pinned by Task 2 leak test.
2. Unknown brand route like `/foo` → 404, not a crash or a default brand. Pinned in Task 3.
3. Mobile menu: opening it then tapping a link or pressing Escape → menu closes; it contains the Apply CTA. Pinned in Task 4.
4. FAQ with JS disabled → still expands (native `<details>`). Pinned in Task 5 test asserting `details`/`summary` markup.
5. A legal point dropped while trimming sections → every `legal` entry in config renders on the page. Pinned in Task 5.

---

### Task 1: Scaffold, brand type, and evidence screenshots

**Files:**
- Create: project via `npx create-next-app@16 . --ts --tailwind --app --eslint --no-src-dir --import-alias "@/*"`
- Create: `brands/types.ts`
- Create: `vitest.config.ts`, `vitest.setup.ts`
- Create: `evidence/*.png` (mobile + desktop screenshot of each live homepage)

**Interfaces:**
- Produces: `type Brand` in `brands/types.ts`:

```ts
export type Brand = {
  id: "dr" | "gmc";
  name: string;
  logo: { src: string; alt: string };
  colors: { primary: string; primaryText: string; accent: string; bg: string; text: string };
  ctaLabel: string;          // "Apply now" | "Get a certificate"
  ctaHref: string;           // real application URL from the live site
  nav: { label: string; href: string }[];
  hero: { eyebrow: string; title: string; body: string; bullets: string[] };
  services: { title: string; body: string; price?: string; uses?: string[] }[];
  steps: { title: string; body: string }[];
  facts?: { label: string; value: string }[];       // price/time/reviewer — merged from repeated sections
  priceTable?: { country: string; price: string }[];
  countries: string[];
  legal: string[];            // copied verbatim from the live site
  faq: { q: string; a: string }[];
  contact: { email?: string; address?: string; emergency?: string };
  meta: { title: string; description: string };
};
```

- [ ] **Step 1:** Run the scaffold command; `npm i -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom`; add `"test": "vitest run"` script.
- [ ] **Step 2:** Write `brands/types.ts` as above.
- [ ] **Step 3:** Save screenshots of each live homepage at 375×812 and desktop to `evidence/` (for NOTES.md).
- [ ] **Step 4:** Run `npm run build` and `npm test` (no tests yet → "No test files found" is acceptable). Expected: build succeeds.
- [ ] **Step 5:** `git init`, commit `chore: scaffold Next.js 16 app and Brand type`.

### Task 2: Brand config files

**Files:**
- Create: `brands/dr.ts`, `brands/gmc.ts`, `brands/index.ts`, `public/brands/dr-logo.svg`, `public/brands/gmc-logo.svg`
- Test: `brands/brands.test.ts`

**Interfaces:**
- Consumes: `Brand` (Task 1).
- Produces: `brands: Record<Brand["id"], Brand>` and `getBrand(id: string): Brand | undefined` in `brands/index.ts`.

Content rules (copy text from the live pages; decisions made here):
- **dr:** colours navy `#1e3a8a`-ish taken from the live site; `ctaLabel` "Apply now"; prices exactly 25 SGD / 399 pesos / 30 MYR / "Depends on the country"; 4 services (sick leave, medical fitness, unfit to fly, general); the price, time, reviewer and decline-rate facts each appear **once** in `facts`; `legal` contains verbatim: non-refundable incl. declined + 24h technical-fault exception, not for India / legal / insurance, not for emergencies, doctors do not diagnose/treat/prescribe and chat only, doctor's discretion, single use, check acceptance before applying, age 16+. All 16 FAQ questions with answers copied from the live accordion.
- **gmc:** purple/red from live site; `ctaLabel` "Get a certificate"; €34.99 on the 4 service cards shown on the live homepage (sick leave, fitness, sports fitness, unfit to travel) — work from home kept only as on the live hero list; legal includes the 112 emergency line; 8 FAQs verbatim. **Cut** (not rewritten): unverifiable testimonials, "Competitor A/B" table, blog links, free-tool cards. Keep only stats/claims that appear on the live site; drop internally contradictory ones ("within the hour" vs "30 minutes" → keep "usually within 30 minutes", which is the live hero claim).

- [ ] **Step 1: Write the failing tests**

```ts
import { brands, getBrand } from "./index";

const drOnly = ["SGD", "Stripe", "IST", "India", "MBBS", "care@drcertificate.com"];
const gmcOnly = ["€", "GDPR", "112", "EEA", "GetMedicalCertificate"];

test("no gmc text leaks into dr", () => {
  const s = JSON.stringify(brands.dr);
  gmcOnly.forEach((w) => expect(s).not.toContain(w));
});
test("no dr text leaks into gmc", () => {
  const s = JSON.stringify(brands.gmc);
  drOnly.forEach((w) => expect(s).not.toContain(w));
});
test("prices unchanged", () => {
  expect(JSON.stringify(brands.dr)).toMatch(/25 SGD[\s\S]*399 pesos[\s\S]*30 MYR/);
  brands.gmc.services.forEach((s) => expect(s.price).toBe("€34.99"));
});
test("unknown brand is undefined", () => expect(getBrand("foo")).toBeUndefined());
```

- [ ] **Step 2:** `npm test` → FAIL (module not found).
- [ ] **Step 3:** Write both configs and `brands/index.ts`; logos as simple SVG wordmarks matching each site.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Commit `feat: add dr and gmc brand configs`.

### Task 3: Brand route, theme, and layout shell

**Files:**
- Create: `app/[brand]/page.tsx`, `app/[brand]/layout.tsx`
- Modify: `app/page.tsx` (chooser with two links), `app/globals.css` (use `var(--primary)` etc.)

**Interfaces:**
- Consumes: `getBrand`, `brands` (Task 2).
- Produces: page renders sections in order `Header, Hero, Services, HowItWorks, Facts, Legal, Countries, Faq, FinalCta, Footer`, each `({ brand }: { brand: Brand })`.

- [ ] **Step 1:** `generateStaticParams` returns `Object.keys(brands).map(brand => ({ brand }))`; `dynamicParams = false` so `/foo` is 404; `generateMetadata` from `brand.meta`; wrapper `<div style={{"--primary": ...}}>` sets CSS vars from `brand.colors`.
- [ ] **Step 2:** `npm run build` → output lists `/dr` and `/gmc` as static (○/●). Visit `/foo` in `npm run start` → 404.
- [ ] **Step 3:** Commit `feat: brand route with static params and theming`.

### Task 4: Header and mobile menu

**Files:**
- Create: `components/Header.tsx` (server), `components/MobileMenu.tsx` (`"use client"`)
- Test: `components/MobileMenu.test.tsx`

**Interfaces:**
- `MobileMenu({ nav, ctaLabel, ctaHref }: Pick<Brand, "nav" | "ctaLabel" | "ctaHref">)`

Header: sticky, logo, desktop nav, CTA button always visible (fixes missing header CTA on gmc).

- [ ] **Step 1: Write the failing test**

```tsx
test("menu opens, contains CTA, closes on Escape and link click", async () => {
  render(<MobileMenu nav={[{ label: "FAQ", href: "#faq" }]} ctaLabel="Apply now" ctaHref="https://x" />);
  const btn = screen.getByRole("button", { name: /menu/i });
  expect(btn).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(btn);
  expect(btn).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("link", { name: "Apply now" })).toHaveAttribute("href", "https://x");
  fireEvent.keyDown(document, { key: "Escape" });
  expect(btn).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(btn);
  fireEvent.click(screen.getByRole("link", { name: "FAQ" }));
  expect(btn).toHaveAttribute("aria-expanded", "false");
});
```

- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implement with `useState`; toggle button min 44×44px.
- [ ] **Step 4:** `npm test` → PASS.
- [ ] **Step 5:** Commit `feat: header with sticky CTA and mobile menu`.

### Task 5: Content sections and FAQ

**Files:**
- Create: `components/{Hero,Services,HowItWorks,Facts,Legal,Countries,Faq,FinalCta,Footer}.tsx`
- Test: `components/sections.test.tsx`

Decisions: one primary CTA in hero, one per service card is dropped in favour of one CTA under services, plus FinalCta (target ≤4 CTAs, down from 11 / 8). `Facts` replaces dr's repeated "Before you apply" / cost / timing blocks; dr `priceTable` renders inside it. `Faq` uses `<details><summary>`, FAQ section `id="faq"`. Countries render as a compact wrapped list. Section with missing optional config returns `null`.

- [ ] **Step 1: Write the failing tests**

```tsx
test.each(["dr", "gmc"] as const)("%s renders every legal point and FAQ", (id) => {
  const b = brands[id];
  const { container } = render(<><Legal brand={b} /><Faq brand={b} /></>);
  b.legal.forEach((l) => expect(container.textContent).toContain(l));
  expect(container.querySelectorAll("details summary")).toHaveLength(b.faq.length);
});
test("gmc has no price table", () => {
  const { container } = render(<Facts brand={brands.gmc} />);
  expect(container.querySelector("table")).toBeNull();
});
```

- [ ] **Step 2:** `npm test` → FAIL.
- [ ] **Step 3:** Implement sections; images through `next/image`, font through `next/font`.
- [ ] **Step 4:** `npm test` → PASS; `npm run build` → PASS.
- [ ] **Step 5:** Commit per section group (`feat: hero and services`, `feat: facts and legal`, `feat: faq and footer`).

### Task 6: Verify, deploy, NOTES.md

**Files:**
- Create: `NOTES.md`, `README.md` (run/deploy + brand switch in 3 lines)

- [ ] **Step 1:** `npm run build && npm run start`; check `/dr` and `/gmc` at 375×812: menu opens/closes, FAQ expands, no horizontal scroll.
- [ ] **Step 2:** Lighthouse mobile on both local routes; save JSON to `evidence/after-*.json`. Expected: Performance ≥ 90, TBT < 200 ms.
- [ ] **Step 3:** Push to GitHub, import into Vercel (user does the account steps), confirm `/dr` and `/gmc` live.
- [ ] **Step 4:** Write `NOTES.md`: 3 problems per site with evidence (before Lighthouse numbers, screenshots in `evidence/`, quoted sentences), change + why for each, before/after scores, shared-vs-brand line (components, layout, theme mechanism shared; all copy, prices, legal, colours, logo, CTA URL per brand — because the rules require zero cross-brand text), third brand = add `brands/x.ts` + logo + key in `brands/index.ts` + leak-test words; no component changes.
- [ ] **Step 5:** Commit `docs: NOTES.md with audit and decisions`.
