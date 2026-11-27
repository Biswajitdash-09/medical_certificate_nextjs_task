# DrCertificate parity: implementation plan

**Goal:** match drcertificate.com's navbar, internal pages, language switcher, footer and scroll buttons, and do each of them better. The two-brand, one-codebase setup stays.

**Decisions already made:**
- **Scope:** every page linked from the navbar and footer, about 45. No blog posts.
- **Languages:** scrape the live site's own translations, with English as the fallback.
- **Shared components:** every new feature is a shared component driven by brand config. GetMedicalCertificate uses them with its own links, or with none.

**Stack:** Next.js 16.4.6 App Router with `cacheComponents`, Tailwind v4, Vitest. Read `node_modules/next/dist/docs/` before touching routing (see AGENTS.md).

## Global constraints

These rules apply to every task:
- Don't change prices, services or legal points. Page copy is scraped word for word; nothing is invented.
- No text, rule or claim from one brand on the other. `brands/brands.test.ts` and `npm run smoke` must stay green.
- No link out to drcertificate.com or getmedicalcertificate.com. Apply goes to `/<brand>/apply`. Social links (x.com, instagram, linkedin) and `mailto:` are allowed.
- Add a one-line comment on every change (the user's CLAUDE.md).
- Patch files with the Write or Edit tool, or with node scripts saved in the scratchpad. Shell quoting broke inline edits several times.
- After every task, run `npx vitest run`, `npx tsc --noEmit`, `npm run build`, then `npm run smoke` against `next start`, then commit.

---

## Task 0: Map the live site (read-only)

1. Save the live pages into `scratch/live/` (gitignored):
   - the homepage
   - every navbar and footer URL (the list is at the end of this plan)
   - each of those pages in each language
2. Record on one line of `scratch/live/NOTES.txt`:
   - how a language is chosen (a URL prefix like `/fil/...`, a query string, a cookie, or a client-side swap)
   - which pages actually exist in which language
3. Record the menu structure: group titles, item order, and the descriptions under items in the mega menu.

**Done when** NOTES.txt answers "where does the Filipino version of /sick-leave-certificate/ live?" and lists the menu groups.

## Task 1: Content model

### Files
- `brands/types.ts`: add the types below.
- New `content/dr/<locale>/<slug>.json` for each page and language. They are generated in Task 2, never hand-written.
- New `content/index.ts`: `getPage(brand, locale, slug)` and `listPages(brand)`.

### Types

```ts
type Locale = "en" | "fil" | "id" | "ms" | "th" | "vi" | "km" | "lo" | "my";
type NavGroup = { title: string; items: { label: string; href: string; blurb?: string }[]; seeAll?: { label: string; href: string } };
type FooterColumn = { title: string; links: { label: string; href: string }[] };
type Social = { kind: "x" | "instagram" | "linkedin"; href: string };
type PageBlock =
  | { kind: "heading"; level: 2 | 3; text: string }
  | { kind: "text"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "faq"; items: { q: string; a: string }[] }
  | { kind: "table"; head: string[]; rows: string[][] };
type ContentPage = { slug: string; title: string; description: string; blocks: PageBlock[]; service?: string };
```

### Brand additions
- **Brand fields:** `locales?: Locale[]`, `megaNav?: NavGroup[]`, `footerColumns?: FooterColumn[]` and `socials?: Social[]`.
- **GetMedicalCertificate:** leaves all four out, so its header and footer render exactly as they do now.

### Tests (`content/content.test.ts`)
- Every `href` in `megaNav` and `footerColumns` resolves to an existing page or a homepage anchor.
- No content file contains `drcertificate.com` in a link.
- Every non-English page has an English counterpart.

## Task 2: Scraper (`scripts/scrape-dr.mjs`, run by hand and not part of the build)

1. **Input:** the URL list from Task 0, and the locale rule recorded in NOTES.txt.
2. **For each page:**
   - Fetch it with a normal browser user agent, at one request per second.
   - Take `<main>`. Drop scripts, styles, SVGs, the navbar, the footer and Apply buttons.
   - Map `h2`, `h3`, `p`, `ul/ol`, FAQ accordions and `table` to `PageBlock`.
   - Decode entities: `&#x27;`, `&amp;`, `&nbsp;` and curly quotes. The comparison script missed these earlier.
3. **Rewrite links:**
   - Internal links become `/dr/<slug>` (with a locale prefix when the page isn't English).
   - `forms.drcertificate.com` links become `/dr/apply`.
   - Other external links become plain text.
4. **Output:** write the JSON files and print a report of the page count per locale and the missing translations.
5. **Check:** re-run the price and legal-point comparison from the earlier session against the new JSON. Any mismatch fails the script.

**Done when** the JSON files exist for every page and language, and the report shows no failures.

## Task 3: Routing and locales

1. **Route:** add `app/[brand]/[...slug]/page.tsx`.
   - It renders a `ContentPage` with a new `components/ContentPage.tsx` that maps blocks to the existing styles: Section, the FAQ accordion, tables like the price table, and the closing banner.
   - `generateStaticParams` comes from `listPages`.
   - The existing `[service]` and `apply` routes must still win. Check route priority in the Next docs. If the two routes clash, fold `[service]` into the catch-all with a `service` field on the page.
2. **Locale in the URL:** use `/dr/<locale>/<slug>`, with English unprefixed (`/dr/<slug>`). If the live site uses a different scheme, follow it.
3. **`proxy.ts`:** extend the known-page check so that:
   - `/<brand>/<slug>` and `/<brand>/<locale>/<slug>` are 404 unless the page exists
   - the matcher allows three segments
4. **`<html lang>`:** each page sets its locale, in the layout or through BrandShell.
5. **Metadata:** `alternates.languages` lists every locale the page exists in (hreflang).
6. **Smoke checks:**
   - `/dr/medical-certificate-for-fever` returns 200.
   - `/dr/fil/<a translated slug>` returns 200.
   - `/dr/fil/nope` and `/gmc/medical-certificate-for-fever` return 404.

## Task 4: Header with mega menu and language switcher

1. **`components/Header.tsx`:** when `brand.megaNav` is set, render a mega-menu nav. Otherwise keep the current flat nav.
2. **Desktop (from lg):**
   - Each group is a `<button aria-expanded>` that opens a panel.
   - The panel lays its items out in 2–3 columns, with a blurb under each item and a "See all" link.
   - Hover opens with a 150 ms intent delay. Click and Enter also open it. Escape closes it and puts focus back on the trigger. A click outside closes it.
   - Only one panel is open at a time.
   - *Better than live:* keyboard arrow keys move between items, and the panel shows the current page.
3. **`components/MobileMenu.tsx`:**
   - Groups become native `<details>` accordions inside the drawer.
   - Keep the existing Escape and close-on-click behaviour, and its tests.
4. **New `components/LanguageSwitcher.tsx`:**
   - A button showing the current language's native name opens a listbox of `brand.locales`.
   - Choosing a language goes to the same slug in that locale. If the page has no translation there, it goes to that locale's homepage.
   - It renders nothing when `locales` is unset, so GetMedicalCertificate gets no switcher.
   - Desktop: in the header beside Apply. Mobile: the top of the drawer.
5. **Tests:**
   - The menu opens and closes with click and Escape.
   - The switcher links to the same slug in the other locale.
   - GetMedicalCertificate renders no switcher and no mega menu.

## Task 5: Footer

1. **`components/Footer.tsx`:** when `footerColumns` is set, render them as columns.
   - Columns 2–4 hold the column links: services, countries, company and legal, as on the live site.
   - Column 1 keeps the existing logo, address and email.
   - Add social icons from `socials`, as inline SVGs with `aria-label`s.
2. **Bottom row:** the emergency line, then `© <year> <brand.name>`, then the legal links (Refund & Cancellation, Privacy, Terms).
3. **Phones:** each column becomes a `<details>` accordion, so the footer doesn't run to four screens.
4. **GetMedicalCertificate:** it has no `footerColumns`, so it keeps its current footer.

## Task 6: Scroll up and down buttons

1. **New client component `components/ScrollButtons.tsx`:**
   - Two round buttons, fixed bottom-right, stacked: "Scroll to top" and "Scroll to bottom".
   - Each button is hidden when it is useless: the up button at the top of the page, the down button near the bottom. Base this on an IntersectionObserver watching sentinels at the top and bottom of the page.
2. **Behaviour:**
   - Scroll smoothly, or jump instantly under `prefers-reduced-motion`.
   - After scrolling, move focus to the skip-link target (top) or the footer (bottom).
3. **Placement:**
   - Sit above PhoneBar on phones (`bottom-24`) and at `bottom-6` from md.
   - Make sure they don't cover the Next dev indicator or the sticky Apply bar.
4. **Where:** mount it in BrandShell, so every brand page gets it, including GetMedicalCertificate (it's generic).
5. **Test:** clicking "Scroll to top" calls `scrollTo` with `top: 0`.

## Task 7: Page templates per section

All templates use `ContentPage`, plus a hero that matches the page type:

| Group | Pages | Hero |
|---|---|---|
| Services (4) | existing `[service]` pages | already built; add the scraped long-form blocks under it |
| Countries (10) | `/sg/...` and so on | country name, price row from that country's `priceTable` entry, Apply |
| Symptoms (6) | fever, flu, cold and cough, back pain, food poisoning, migraine | title, intro, Apply with `?type=sick-leave` |
| Other certificates (7) | fit to fly, fit to work, work from home, employment fitness, sports fitness | title, intro, Apply |
| Audiences (4) | students, IT, BPO, bank | title, intro, Apply with `?type=sick-leave` |
| Guides (6) + `/guides/` | articles | article layout: title, reading column of 65–72 characters, table of contents from the `h2`s at lg |
| Company | About, Contact, FAQs, Work with us | plain article. Contact shows the email and address from config, with no form. |
| Legal | Refund & Cancellation, Privacy, Terms | plain article, with a "last updated" line only if the live page has one |

**Better than live:**
- Every page ends with the shared closing banner.
- Article pages get a table of contents and readable line length.
- Country pages show that country's price above the fold.

## Task 8: Polish and docs

1. **Lighthouse:** run mobile Lighthouse on `/dr`, one country page and one guide. Every category should stay at 95 or above. Fix any contrast or tap-target failures it finds.
2. **NOTES.md:** add a short "Round 6" covering:
   - the scope
   - the page count
   - how languages work
   - what was scraped and when
   - what is shared and what is per brand
   - the pages left out (blogs)
3. **Sitemap:** update `public/robots.txt` and add `app/sitemap.ts`, listing every page in every locale.
4. **Ship:** commit, push, and check the Vercel deploy on `/dr`, `/dr/fil` and one country page.

---

## Live URLs in scope (from the live navbar and footer, 2026-11-27)

- **Services:**
  - /sick-leave-certificate/
  - /medical-fitness-certificate/
  - /unfit-to-fly/
  - /general-medical-certificate/
- **Countries:**
  - /sg/medical-certificates-online-in-singapore/
  - /id/…-indonesia/
  - /ph/…-philippines/
  - /th/…-thailand/
  - /vn/…-vietnam/
  - /my/…-malaysia/
  - /cb/…-cambodia/
  - /lo/…-laos/
  - /mn/…-myanmar/
  - /br/…-brunei/
- **Symptoms:**
  - /medical-certificate-for-fever/
  - /…-flu/
  - /…-cold-and-cough/
  - /…-back-pain/
  - /…-food-poisoning/
  - /…-migraine/
- **Other certificates:**
  - /fit-to-fly-certificate/
  - /fit-to-work-certificate/
  - /work-from-home-certificate/
  - /medical-fitness-certificate-for-employment/
  - /sports-fitness-certificate/
- **Audiences:**
  - /sick-leave-certificate-for-students/
  - /…-for-it-employees/
  - /…-for-bpo-employees/
  - /…-for-bank-employees/
- **Guides:**
  - /how-to-get-a-medical-certificate-online/
  - /is-an-online-medical-certificate-valid/
  - /what-is-a-medical-certificate/
  - /what-should-a-medical-certificate-include/
  - /sick-leave-or-fitness-certificate/
  - /what-if-the-doctor-declines-your-request/
  - /guides/
- **Company:**
  - /about-us/
  - /contact/
  - /faqs/
  - /work-with-us/
- **Legal:**
  - /refund-cancellation-policy/
  - /privacy-policy/
  - /terms-of-use/
- **Socials:**
  - x.com/drcertificate
  - instagram.com/drcertificate
  - linkedin.com/company/drcertificate

**Left out:** /blogs/ and its posts. The nav keeps a "Blogs" item only if you decide to build them later. Otherwise drop it.

## Risks to watch

- **Route clash:** the catch-all could clash with `[service]` and `apply`. Settle it in Task 3 before building any pages.
- **Language scheme:** if the live switcher translates client-side with no URLs per language, the scraper needs the browser (Playwright or the built-in browser) to read each translation.
- **Pages missing in some languages:** fall back to English and show "Not available in <language> yet". Don't machine-translate.
- **Copy drift:** the live site changes its wording, as with the 349 vs 399 pesos price. Date every scrape, and re-run the comparison before each submission.
