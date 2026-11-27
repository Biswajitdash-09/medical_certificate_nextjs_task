# Homepage Enhancements Plan (taste pass)

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Steps use `- [ ]`.

**Goal:** raise both brand homepages from "clean and fast" to "a page a good company would ship", and get more clicks on Apply, without breaking the assignment rules.

**Kind:** service (page type `service`, site-kind `other`). Both brands are clinics people hire online. Under the taste skill that means:
- photographs and type lead
- flat brand colour grounds
- no shader, effect, loop or count
- one or two calm dealt moments
- a hover and press layer on every control

**Spec:** `C:\Users\biswa\Downloads\Nextjs-Assignment.pdf`. The taste skill (`design-taste-frontend` 2.5.1) is the design bar. Where they conflict, the assignment wins.

## Where the assignment overrides the taste skill (decided up front)

| Taste rule | Assignment rule | Ruling |
|---|---|---|
| Real photographs lead, with stand-ins when the client has none | "Don't invent reviews, numbers or claims" | Stand-in photographs show **situations only**: a person at home with a phone, a laptop on a desk, an airport gate for Unfit to fly. No faces presented as "our doctors" or "our patients", no white coats, no text in the photo. Every stand-in is listed in NOTES.md for the client to replace. |
| Never violet | GetMedicalCertificate's live identity is purple (`#470087`) | Keep it. It's the client's own colour, so it goes through `start.mjs brand`, not a dealt palette. |
| One section per screen, each one or two screens tall | Keep every legal point; the page has to stay short | One screen per section at 1440; the Legal and FAQ sections may take two. The page target is 8 to 10 screens on a 390 phone (now 7 to 10). |
| No caption or sample label on any visual | DrCertificate's live hero shows a "SAMPLE" certificate | The certificate visual is drawn with placeholder fields (no "Sample" caption). DrCertificate only, because only its live site shows one. |
| Every page carries dealt moments | No claims beyond the live copy | The moment's words are live copy only (see Task 4). |

## Priority order (most impact on Apply clicks first)

### Task 1: Hero that shows the real thing
- **DrCertificate:**
  - Bring back the certificate visual from the live site as an HTML/CSS document card: patient name, age, date of issue, rest advised, doctor's assessment, a "Doctor reviewed" seal, and the "Reg. no. ••••••" placeholder.
  - Fields are generic placeholders, exactly as on the live site.
  - Shown big, on the right at desktop and below the buttons on mobile.
- **GetMedicalCertificate:** a full-bleed stand-in photograph (a person at home with a phone) with the purple brand ground behind the text column. Its hard fact, "same day from €34.99", is already in the h1.
- **Both:**
  - Hero entrance on load (`data-enter`), once, and still under reduced motion.
  - At most two hero actions.
- **Config:** `hero.visual: { kind: "certificate" | "photo"; src?: string; alt?: string }`.
- **Test:** every `hero.visual.src` file exists; DrCertificate's certificate card contains no gmc words. The leak test already covers this once the card text lives in config.

### Task 2: Phone action bar
- On phones narrower than 768px, a fixed bottom bar holds the brand's CTA. It appears once the hero's CTA has scrolled out of view (`IntersectionObserver`) and hides again over the final banner.
- **Fixes:** the known gap where the header CTA is hidden below 400px.
- **Test (RTL):** the bar has the brand's `ctaHref` and is `hidden` while the hero CTA is intersecting.
- **Check:** at 320px nothing sits under the bar (the taste `collide` check), and the bar is 44px tall or more.

### Task 3: Motion and hover layer
- Linked cards lift 2px; buttons step on hover and press on click; text links get a drawn underline; photographs zoom 1.02 to 1.03 inside their frame.
- The FAQ opens with a height transition (CSS `interpolate-size: allow-keywords` with a `::details-content` transition) and stays native `<details>`.
- `prefers-reduced-motion` turns all of it off, and nothing stays hidden.
- No scroll fade-ins, parallax or tilt.

### Task 4: One dealt moment per brand (`word-highlight`, a statement section of one screen)
- **DrCertificate:** "The doctor decides. Nothing is approved automatically." This is live copy from the Why DrCertificate section.
- **GetMedicalCertificate:** "A certificate anyone can check - in seconds." This is live copy from the Medical Certificates section.
- The text is stored in config as `statement`. The words highlight one by one only while the section is in view, and the whole sentence shows under reduced motion.

### Task 5: Services as a peek-list with real routes
- Each service card links to the brand's live detail page. DrCertificate's "View details" URLs exist on the live site (`/sick-leave-certificate/` and the others). GetMedicalCertificate uses `/sick-leave-certificate/`, `/fitness-certificate/` and `/sports-fitness-certificate/`.
- The whole card is the link: it lifts on hover and gets one stand-in situation photograph each (desk for sick leave, a run for fitness, a boarding gate for unfit to fly/travel).
- Each card still has one Apply route below the list. There is no second CTA per card.
- **Config:** `services[].href`, `services[].photo`.

### Task 6: Legal block that people actually read
- Group the verbatim legal points under three headings: **Payment & refunds**, **Who it's for**, **Before you submit**. The text stays word for word and only its order changes. The grouping lives in config as `legal: { heading, points[] }[]`.
- Payment & refunds sits directly above the final CTA, because the live DrCertificate site states it "before you pay".
- **Test change:** the existing "every legal point renders" test flattens the groups. It stays green only if no point was lost.

### Task 7: Type, palette and system
- Run the taste deal for the service kind: the font pairing (`start.mjs deal --page service --trade clinic`), nav, footer, close and button style, and the rhythm (`surface-pairs` or `dark-band`).
- Colours stay each brand's own through `start.mjs brand`.
- One button pair, one card style, one radius scale.
- The heading font is loaded through `next/font`, so there are no third-party requests.
- **Footer:** DrCertificate gets `footer-visit` (it has a street and district: Salcedo Village, Makati; per house rule 9 the building number and postcode drop from display). GetMedicalCertificate gets `footer-columns` with its live Legal links (Privacy & GDPR, Terms, Refund & Cancellations).

### Task 8: Real domains, share tags and search
- `proxy.ts` rewrites by host: `drcertificate.*` → `/dr`, `getmedicalcertificate.*` → `/gmc`. Preview URLs keep `/dr` and `/gmc`.
- Per-brand favicon, `theme-color`, Open Graph image (`app/[brand]/opengraph-image.tsx` from config) and canonical URL.
- `FAQPage` JSON-LD built from `brand.faq`, which already holds the exact live answers.

### Task 9: Measure Apply clicks
- Every CTA carries `data-cta="<position>"` (header, hero, services, bar, final, menu).
- Report clicks with `@vercel/analytics` `track("apply_click", { brand, position })`. That's about 1 KB, first-party on Vercel, with no cookies.
- **Check:** Lighthouse TBT stays under 200 ms and Best Practices stays at 100.

### Task 10: Checks that guard all of this
- Playwright end-to-end tests at 390 and 1440 for both brands:
  - the menu opens, closes on Escape and holds the CTA
  - the FAQ opens
  - the phone bar appears after scrolling
  - no horizontal scroll at 320
  - `/foo` returns 404
- Taste gate on the static build: `output: "export"` to `out/` (both brand pages are already static), then run `gate.mjs out/dr.html --root out` and the same for gmc. Fix every FAIL, or waive it with a reason in `.taste-skill/waivers.json` (for example, violet).
- Lighthouse mobile again for both brands. The bar: Performance ≥ 95, Accessibility 100.
- Update NOTES.md with before/after figures and the list of stand-in photographs.

## Explicitly not doing
- **Testimonials, ratings, "trusted by" logos or stats strips:** the rules forbid invented social proof, and GetMedicalCertificate's live ones are unverifiable.
- **Named doctor cards with portraits:** a stand-in face beside a real name would mislead.
- **Shader backgrounds, 3D, carousels, tabs or counters:** the taste skill bans them for a service page, and they cost performance.
- **A language switcher:** out of scope for a homepage task.

## Open questions for you
1. **Stand-in photographs:** are situational stand-ins OK, listed for the client to replace? Or should it stay photo-free, with the certificate card and type carrying the page?
2. **GetMedicalCertificate purple:** keep the brand colour (recommended), or let the taste deal pick a non-violet palette?
3. **Analytics (Task 9):** is adding `@vercel/analytics` acceptable, given the "no third-party scripts" stance in NOTES?
