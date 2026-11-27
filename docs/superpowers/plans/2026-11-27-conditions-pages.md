# Conditions pages: images and layout

**Goal:** Give the six DrCertificate condition pages (fever, flu, cold and cough, back pain, food poisoning, migraine) a photo, a proper hero and a readable body. Give the Conditions mega-menu panel thumbnails and one-line blurbs.

**Why:** Today each page is a wall of 77 scraped blocks:
- 13 plain paragraphs come before the first heading.
- There is no image.
- The FAQ `h3`s render as bare headings.
- The menu panel is six bold words in a half-empty box.

## Rules

- No new claims. All text comes from the scraped JSON (`content/dr/<locale>/medical-certificate-for-*.json`). Blurbs use the page's own `description`.
- Photos are config, not content: re-running `scripts/scrape-dr.mjs` must not wipe them.
- GetMedicalCertificate is untouched.
- One-line self-describing comment on every change (CLAUDE.md).

## Images

Save each image as `public/img/gen/cond-<slug>.webp`, at 1200×900 (4:3), converted with `sharp` the same way as the other generated photos.

| slug | file |
|---|---|
| fever | `cond-fever.webp` |
| flu | `cond-flu.webp` |
| cold-and-cough | `cond-cold-and-cough.webp` |
| back-pain | `cond-back-pain.webp` |
| food-poisoning | `cond-food-poisoning.webp` |
| migraine | `cond-migraine.webp` |

## Task 1: Photo map

1. **New `content/photos.ts`:** export `conditionPhotos: Record<string, { src: string; alt: string }>`, keyed by the English slug (`medical-certificate-for-fever` …). Every locale uses the same photo.
2. **Test (in `content/content.test.ts`):**
   - Every `group: "symptom"` page has an entry.
   - Each entry's file exists under `public/`.

## Task 2: Condition hero (`components/ContentPage.tsx`)

When `page.group === "symptom"`, render the hero with the same two-column grid as the service hero (`md:grid-cols-[1.1fr_1fr]`).

**Left column:**
- "All conditions" back link
- `h1` = `page.title`
- lead = the first text block
- the 349-peso price line from `brand`
- Apply button → `${ctaHref}?type=sick-leave`
- `ctaNote` under the button

**Right column:**
- the photo in `photo-frame aspect-[4/3]`, with `priority`
- on phones it stacks under the button

Remove the blocks the hero now shows from the body, so nothing appears twice.

## Task 3: Readable body

1. **Intro:** the remaining text blocks before the first `h2` (about 12) become one intro section in a `max-w-[68ch]` column, with the first paragraph set `text-lg`.
2. **Table of contents:** turn on the guide TOC for `symptom` as well, so the `h2`s get a sticky list beside the text from lg. It is hidden on phones.
3. **FAQ:** a run of `h3` + text pairs under one `h2` becomes a `<details>` accordion with the same classes as `components/Faq.tsx`. Pull the shared item markup into a small `FaqItem` instead of copying it.
4. **Tables:** wrap them in `overflow-x-auto`, with a rounded border, a `bg-surface` header row and zebra rows, so they don't overflow at 390px.
5. **Lists:** use the check-icon list style that `BeforeYouStart` uses.
6. **Spacing:** `h2` gets `mt-14 scroll-mt-24` so TOC jumps clear the sticky header.

## Task 4: Other conditions strip

Before the closing banner, add an "Other conditions" row showing the 5 sibling conditions:
- each a card with its photo (`aspect-[4/3]`), title and an arrow link
- 2 columns on phones, 3 from md, and a horizontal scroll-snap row from lg is also fine

Siblings come from `megaNav`'s Conditions group, so the order matches the menu.

## Task 5: Mega-menu panel

1. **Type:** add `image?: string` to the nav item type in `brands/types.ts` and set it on the six Conditions items in `brands/dr.ts`.
2. **Item layout:** in `components/MegaMenu.tsx`, when an item has an `image`, render it as a row:
   - a 56px rounded thumbnail (`next/image`, `sizes="56px"`)
   - the label
   - the existing `blurb` line, filled from each page's `description`, clamped to 1 line
3. **Panel:** cap the width (`max-w-3xl`) and use 2 columns, so it isn't a full-width box with a gap in the middle.
4. **Mobile drawer:** keep the labels only, with no thumbnails, so the drawer stays short.

## Task 6: Verify

- `npx vitest run`, `npx tsc --noEmit` and `npm run build` all pass.
- Check `/dr/medical-certificate-for-fever` at 390, 768 and 1440:
  - the photo is visible above the fold on desktop
  - no horizontal scroll at 390
  - the FAQ opens and closes
  - TOC links jump to the right headings
- Check `/dr/fil/medical-certificate-for-fever`:
  - if a Filipino translation exists, it shows the same photo
  - otherwise it shows the English fallback banner
- Open the Conditions menu: thumbnails load, Escape closes it, and arrow keys still move between items.

## Image prompts

Use these shared settings for all six:
- photorealistic editorial photo, 4:3 landscape
- soft natural window light
- a modest home in Southeast Asia
- calm, muted palette with one warm accent
- shallow depth of field
- no faces visible, no text, no logos or brand names, no medicine packaging labels

These match the other generated photos: someone is present, but no identifiable person, and nothing that looks like a real product.

1. **Fever:** A rumpled bed with a light cotton blanket by a window with half-closed blinds in a warm afternoon, a digital thermometer and a glass of water on a wooden bedside table, a folded damp cloth beside it, a small electric fan in the corner.
2. **Flu:** A person curled under a patterned blanket on a rattan sofa, seen from behind, only their shoulder and hair visible, a box of tissues, a mug of ginger tea and a phone on a low table, rain on the window behind.
3. **Cold and cough:** A steaming mug of honey-lemon water held in two hands wrapped in a knitted sleeve, close up, a scarf and a few used tissues blurred on a desk in the background, cool morning light.
4. **Back pain:** A home office chair pushed back from a desk with a laptop, a hand pressed to the lower back of a person standing beside it, cropped at chest to knee, a rolled yoga mat leaning against the wall, late-day light.
5. **Food poisoning:** A quiet kitchen counter with a glass of oral rehydration drink, a bowl of plain rice porridge and a spoon, an untouched plate of street food pushed aside, a person's hand resting on the counter, soft overcast light.
6. **Migraine:** A dim bedroom with curtains drawn and a thin line of daylight, a person lying with a forearm over their eyes, face turned away from the camera into the pillow, a phone face-down on the pillow, cool blue tones.
