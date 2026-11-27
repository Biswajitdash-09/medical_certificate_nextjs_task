# NOTES

One Next.js 16 app, two brands. `/dr` is DrCertificate, `/gmc` is GetMedicalCertificate, and `/` links to both.

Evidence is in [`evidence/`](evidence/). It holds the Lighthouse JSON for the live sites (`lh-*.json`) and for the new pages (`after-*.json`), plus a mobile screenshot of each live homepage (`before-mobile-*.jpg`). All Lighthouse runs use mobile emulation, one run each, on 2026-11-27.

## Before and after (Lighthouse, mobile)

| | Live drcertificate.com | New `/dr` | Live getmedicalcertificate.com | New `/gmc` |
|---|---|---|---|---|
| Performance | 61 | **98** | 52 | **98** |
| Accessibility | 100 | 100 | 96 | 100 |
| Best practices | 79 | 100 | 79 | 100 |
| SEO | 100 | 100 | 100 | 100 |
| Largest Contentful Paint | 3.9 s | 2.4 s | 5.3 s | 2.4 s |
| Total Blocking Time | 1,490 ms | ~90 ms | 950 ms | 80 ms |
| Page height at 375px | 22 screens | ~10 screens | 24 screens | ~7 screens |
| Apply links on the page | 11 | 4 | 8 | 4 |

The new pages were measured on a local production build (`next start`). The live sites were measured over the internet, so part of the performance gap is network. The TBT and third-party numbers are not network, though.

## drcertificate.com: 3 biggest problems

1. **Slow to respond on a phone.** Performance is 61, with Total Blocking Time of 1,490 ms and Time to Interactive of 11.2 s. Lighthouse reports "third-party code blocked the main thread for 1,210 ms" and 9 third-party cookies.
   **Change:** no third-party scripts at all. All pages are static, the font is self-hosted through `next/font`, and the only client JavaScript is the mobile menu.
   **Why:** a visitor who taps "Apply now" during that 11 seconds gets no response.
2. **The same facts are repeated three or four times.** Price ("25 SGD in Singapore, 399 pesos in the Philippines or 30 MYR in Malaysia") appears in "Before you apply", in the cost section and again in the cost table. "About 30 minutes", "MBBS, MD or MS" and the medical reviewer line each appear in three blocks. The result is a 22-screen page.
   **Change:** one "Before you apply" block (`facts` + `priceTable` in config). Every price, time, reviewer and decline-rate fact appears once there, with the price table beside it. The wording is unchanged.
   **Why:** repetition pushes the decision points down the page and makes the legal points harder to find.
3. **Eleven "Apply now" buttons compete with each other.** There is one per service card plus the general ones, and each service card also has a "View details" link that leaves the homepage.
   **Change:** four Apply links, all going to the same form (`https://forms.drcertificate.com/`): header, hero, under the services list and the final banner. The mobile menu has one too.
   **Why:** one clear next step at each point of the page, instead of a choice on every card.

Kept on purpose: every legal point, gathered in one "Good to know" block. One thing was cut: the sample-certificate illustration, which made the hero longer on mobile.

## getmedicalcertificate.com: 3 biggest problems

1. **The slowest of the two.** Performance is 52, LCP is 5.3 s and TBT is 950 ms, with third-party code blocking 1,020 ms and 10 third-party cookies. Lighthouse also flags insufficient colour contrast.
   **Change:** the same static, script-free build. Colour pairs are checked so accessibility now scores 100.
2. **No route to the form from the header or the menu on mobile.** The mobile header shows only the logo and a menu icon, and the menu lists Services, Countries, About us, Blogs and Contact Us, with no "Get a certificate" (see `before-mobile-getmedicalcertificate.com.jpg`).
   **Change:** the "Get a certificate" button is in the sticky header on screens 400px and wider, and it is always the last item of the mobile menu. The menu closes on link tap and on Escape, both covered by a test.
3. **Copy that contradicts itself and claims nobody can check.** The comparison table says "7 types" while the page shows 4 certificate cards. "usually within 30 minutes" sits next to "Delivered as a signed PDF within the hour". "issued online by a GMC registered doctor" sits beside doctors registered in IE, DE, FR and PL. Unnamed "Competitor A / B" price comparisons, testimonials, and off-topic blog links ("Get Period Delay Medication Online") all dilute trust.
   **Change:** cut, not rewritten. The page keeps the 4 €34.99 services shown on the live homepage, "usually within 30 minutes" (the live hero claim), and the live FAQ word for word. The testimonials, competitor table, named doctor cards, stats strip, blog and free-tool cards are removed.
   **Why:** the rules forbid inventing claims, so the safe fix for a contradictory claim is to keep the live wording that is consistent and remove the rest.

## Shared vs brand-specific

**Shared** (`components/`, `app/[brand]/page.tsx`):
- the section order and layout, spacing and type scale
- the CTA button style
- the FAQ (native `<details>`, which works with JavaScript off)
- the mobile menu behaviour
- the theming mechanism: CSS variables set from config

**Brand-specific** (`brands/dr.ts`, `brands/gmc.ts`):
- every word on the page: hero, services, steps, facts, FAQ, footer
- prices, legal points, countries
- colours, logo, CTA label and form URL
- page title and description

**Why the line is there:** the rules say no text, rules or claims may cross brands. So no component holds any copy, not even a default. A component only decides how things look, and the config decides what is said. Optional sections (`facts`, `priceTable`) render nothing when a brand doesn't define them, so gmc gets no empty price table. `brands/brands.test.ts` fails the build if a dr-only word ("SGD", "Stripe", "IST", "India", "MBBS", the dr email) appears in gmc's config, or a gmc-only word ("€", "GDPR", "112", "EEA", the gmc name) appears in dr's.

Section titles such as "How it works" and "Frequently asked questions" are generic labels kept in components. The services heading started out there too, but "Choose the certificate you need" is DrCertificate's own wording, so it moved into config (`servicesTitle`). A test now checks it never shows on gmc.

## Adding a third brand

1. Copy `brands/gmc.ts` to `brands/<id>.ts` and fill it in. The `Brand` type in `brands/types.ts` makes TypeScript list anything missing.
2. Add the logo to `public/brands/`.
3. Add `<id>` to the `id` union in `brands/types.ts` and to the map in `brands/index.ts`.
4. Add that brand's own words to the leak test so it can't borrow from the others.

No component changes are needed. `/<id>` is pre-rendered automatically through `generateStaticParams`. To serve brands on their own domains, a small `proxy.ts` that rewrites by host (`drcertificate.com` → `/dr`) is the next step. It isn't built here because one preview deployment is enough for review.

## Round 2: enhancements (taste pass)

The plan is in [`docs/superpowers/plans/2026-11-27-enhancements.md`](docs/superpowers/plans/2026-11-27-enhancements.md). Lighthouse mobile after round 2 (`evidence/after-v2-*.json`):

| | `/dr` | `/gmc` |
|---|---|---|
| Performance | 96 | 97 |
| Accessibility | 100 | 100 |
| Best practices | 100 | 100 |
| SEO | 100 | 100 |
| Total Blocking Time | 90 ms | 80 ms |

**What changed, and why**
- **The hero shows the real thing.** `/dr` rebuilds the live site's certificate illustration in HTML, field for field. It keeps the "SAMPLE" watermark so it can't pass as a real certificate. `/gmc` leads with a photograph next to the €34.99 headline. Both heroes animate in once on load.
- **Phone Apply bar.** Below 768px, a bottom bar shows the brand's CTA only while no in-page Apply button is on screen. This fixes the hidden header button on narrow phones without ever showing the same action twice.
- **One statement moment per brand, in live copy only.** dr: "The doctor decides. Nothing is approved automatically." gmc: "A certificate anyone can check - in seconds." The words brighten with scroll through CSS `animation-timeline: view()`, so there's no script, and the dimmed state still passes contrast.
- **Hover and press feedback.** Buttons step on hover and press on click, linked cards lift 2px, photos zoom 1.03 inside their frame, nav underlines draw, and the FAQ opens smoothly. All of it is off under `prefers-reduced-motion`.
- **Service cards link** to each brand's live detail page. gmc's Unfit to Travel card has no live URL, so it stays unlinked.
- **Legal points are grouped** under scan headings: Who it's for, Before you submit, and Payment & refunds (dr) or Your data (gmc). Every sentence is word for word. A test flattens the groups and checks that every point still renders.
- **Each brand on its own domain.** `proxy.ts` rewrites `drcertificate.com/` to `/dr` and `getmedicalcertificate.com/` to `/gmc`, from `domains` in each config. It also returns a real 404 for unknown slugs. With Cache Components on, `notFound()` alone streams a 200.
- **Share and search.** Each brand gets its own favicon, theme colour, canonical URL pointing at its real domain, Open Graph card (`app/[brand]/opengraph-image.tsx`) and `FAQPage` JSON-LD built from the live FAQ answers.
- **Apply clicks are counted.** Every CTA has `data-cta="header|hero|services|final|menu|phone-bar"`. One delegated listener sends `apply_click { brand, position }` to Vercel Analytics, which is cookie-free and loads only on Vercel.

**Stand-in photographs (for the client to replace)**
- `public/img/photo-f196010783*.webp`: the gmc hero, "Feeling discomfort at home while working on a laptop", by Shixart1985, CC BY 2.0, Wikimedia Commons. It is credited in gmc's footer.
- Five other candidates were looked at full size and rejected: running shoes and thermometers (readable brand names), a phone with a blank screen, a weak airport exterior, and a portrait with a clear face. Per the rules, no face is presented as a doctor or patient.

**Decisions**
- **gmc keeps its purple** (`#470087` accent). The taste skill bans violet, but this is the client's own identity.
- **dr's certificate keeps its "SAMPLE" watermark** even though the taste skill bans sample labels. Honesty about a placeholder document matters more here.
- **The taste skill's automated checker was not run.** It only reads pages built on its own starter markup, and these are Next.js components. Its checklist was applied by hand: one primary and one ghost button, one card style, 44px+ tap targets, no horizontal scroll at 375px, reduced-motion respected.
- **No Playwright suite.** `npm run smoke` instead checks, against a running server, the status codes (`/foo` is 404), the domain rewrite, the share image, the JSON-LD and that no brand's words appear on the other's HTML. The mobile menu, phone bar, analytics and legal/FAQ rendering are covered by Vitest (17 tests).

## Round 3: preparing people for the external application form

The Apply buttons lead to a separate form tool on each brand's `forms.` subdomain, which has no way back to the site. That form isn't part of this app, and it holds the legal agreement, so it's out of scope to change. Instead, the homepage now sets expectations before the click:

- **Where Apply leads.** A line under the hero buttons and under the new checklist's button. dr's wording is from its live homepage ("You'll continue on the secure DrCertificate application form."). gmc's mirrors it with gmc's own "secure" claim from its "A quick, secure questionnaire" step.
- **dr: "Before you start".** The live homepage's own four-item list, restored. Round 1 had cut it for length.
- **gmc: "Before you fill out the form".** Five points taken word for word from the note at the top of gmc's own application form: name as per Govt ID, certificates in English, review the sample certificate (linked to `/samples/`), consultations by chat, and working hours 10:00 AM – 8:00 PM IST. This text is on the brand's form, not its homepage. I treated the form as part of the current site, which is a judgement call to raise on the review call.
- **Leak test change.** "IST" no longer marks dr-only text, because gmc's own form states its hours in IST. dr is now marked by its reviewer's name ("Urooj") instead, and gmc by "Govt ID".
- **Inconsistency for the client.** gmc's form says "Consultations occur via chat". Its homepage FAQ says the doctor may need "a short video call". Both are shown as written.

**Next step, outside this assignment:** a native application flow for each brand. It would pre-fill the certificate type from the card clicked, show progress, offer a visible way back to the site, and keep the T&C and refund text exactly as legal approves it.

## Round 4: generated photography

- The 7 generated photographs are in `public/img/gen/`, converted to WebP (36–77 KB each). They show no real people's faces and no brands.
- **dr hero:** the certificate document lies over the corner of a home photo. **gmc hero:** the generated kitchen-table photo replaces the earlier Wikimedia stand-in, which is now removed along with its credit.
- **Service photos are all-or-none per brand,** so a grid is never half pictured (tested). Still missing: `dr-fitness`, `dr-unfit-to-fly` and `gmc-sports`. Until they arrive, both service grids stay text-only.
