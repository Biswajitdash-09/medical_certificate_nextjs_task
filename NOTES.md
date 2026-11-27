# NOTES

One Next.js 16 app, two brands. `/dr` is DrCertificate, `/gmc` is GetMedicalCertificate, and `/` lets you pick one.

**Live:** LIVE_URL (`/dr`, `/gmc`)

Evidence is in [`evidence/`](evidence/): Lighthouse JSON for the live sites (`lh-*.json`) and for the new pages (`after-v3-*.json`), plus a mobile screenshot of each live homepage (`before-mobile-*.jpg`). All Lighthouse runs are mobile emulation, one run each, 2026-11-27.

## Before and after (Lighthouse, mobile)

| | Live drcertificate.com | New `/dr` | Live getmedicalcertificate.com | New `/gmc` |
|---|---|---|---|---|
| Performance | 61 | **96** | 52 | **98** |
| Accessibility | 100 | 100 | 96 | 100 |
| Best practices | 79 | 100 | 79 | 100 |
| Largest Contentful Paint | 3.9 s | 2.6 s | 5.3 s | 2.5 s |
| Total Blocking Time | 1,490 ms | 130 ms | 950 ms | 40 ms |
| Page height at 375px | 22 screens | ~12.5 screens | 24 screens | ~9 screens |
| Apply links on the page | 11 | 4 | 8 | 4 |

The new pages were measured on a local production build, the live sites over the internet, so part of the gap is network. Blocking time and third-party cost are not.

## drcertificate.com: 3 biggest problems

1. **Slow to respond on a phone.** Performance 61, Total Blocking Time 1,490 ms, Time to Interactive 11.2 s. Lighthouse: "third-party code blocked the main thread for 1,210 ms", 9 third-party cookies.
   **Change:** no third-party scripts; static pages; self-hosted font. **Why:** a tap on "Apply now" during those 11 seconds does nothing.
2. **The same facts repeated three or four times.** The price line ("25 SGD in Singapore, 399 pesos in the Philippines or 30 MYR in Malaysia") appears in three blocks; so do "about 30 minutes" and "MBBS, MD or MS".
   **Change:** each fact appears once, in one "Before you apply" block with the price table beside it. Wording unchanged. **Why:** repetition pushes the decision and the legal points down a 22-screen page.
3. **Eleven Apply buttons compete,** one per service card plus "View details" links on each card.
   **Change:** four Apply links (header, hero, after services, final banner) plus one in the mobile menu. **Why:** one clear next step at each point.

## getmedicalcertificate.com: 3 biggest problems

1. **The slowest of the two.** Performance 52, LCP 5.3 s, TBT 950 ms, 10 third-party cookies, a contrast failure.
   **Change:** the same static build; colour pairs checked, accessibility 100.
2. **No way to the form from the mobile header or menu.** The menu lists Services, Countries, About us, Blogs, Contact Us, but no "Get a certificate" (`before-mobile-getmedicalcertificate.com.jpg`).
   **Change:** the button sits in the sticky header and is the last menu item; a sticky phone bar appears when no other Apply button is on screen. The menu closes on link tap and Escape (tested).
3. **Copy that contradicts itself.** "7 types" vs 4 certificate cards; "usually within 30 minutes" vs "within the hour"; "GMC registered doctor" next to doctors registered in IE, DE, FR, PL; unnamed "Competitor A / B" tables and off-topic blog cards.
   **Change:** cut, not rewritten. Kept the 4 €34.99 services, the hero's "usually within 30 minutes" and the FAQ word for word; removed testimonials, competitor table, stats strip, blog and tool cards. **Why:** we may not invent claims, so the safe fix is to keep the consistent live wording and drop the rest.

## Other changes

- **Our own service and apply pages.** No link leaves for the live sites. `/dr/<service>` and `/gmc/<service>` reuse homepage copy only. `/dr/apply` and `/gmc/apply` are a demo form: real validation (dr's 16+ age rule, the brand's legal points with a required tick), but submit says plainly that nothing was sent or charged. Making it real needs a backend, payments and a lawful basis for health data.
- **"Before you start" checklists.** dr's is its live four-point list. gmc's five points are copied verbatim from its own application form (including "10:00 AM - 8:00 PM IST"); I treated the form as part of the current site.
- **Design:** Geist type, each brand's own colours, generated situation photos (no people presented as real doctors or patients), dr's certificate keeps its "SAMPLE" watermark.
- **Analytics:** cookie-free Vercel Analytics records `apply_click` with the button position, so the next round can see which Apply button works.

## Shared vs brand-specific

**Shared** (`components/`, `app/`): section order, layout, type scale, buttons, FAQ (native `<details>`, works without JavaScript), mobile menu, apply form logic, and the theming mechanism (CSS variables set from config).

**Brand-specific** (`brands/dr.ts`, `brands/gmc.ts`): every word on every page, prices, services, legal points, countries, colours, logo, photos, CTA label, age rule, page metadata.

**Why the line is there:** the rule is that no text, rule or claim may cross brands, so no component holds copy, not even a default. Components decide how things look; config decides what is said. Optional sections (`facts`, `priceTable`) render nothing when a brand lacks them. Only generic labels such as "How it works" live in components. `brands/brands.test.ts` fails if a dr-only word ("SGD", "Stripe", "India", "MBBS", the dr email) is in gmc's config or a gmc-only word ("€", "GDPR", "112", "EEA", the gmc name) is in dr's, and `npm run smoke` checks the same on the rendered pages.

## Adding a third brand

1. Copy `brands/gmc.ts` to `brands/<id>.ts` and fill it in; the `Brand` type makes TypeScript list anything missing.
2. Add its logo and icon to `public/brands/`.
3. Add `<id>` to the `id` union in `brands/types.ts` and the map in `brands/index.ts`, with its domain in `domains`.
4. Add its own words to the leak test.

No component changes. Its homepage, service pages and apply page are pre-rendered by `generateStaticParams`, and `proxy.ts` already serves each brand at `/` on its own domain. About half a day, most of it collecting and checking the brand's copy.
