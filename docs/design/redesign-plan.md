# Redesign plan: calm clinical

You chose: calm clinical, Geist for everything, a split brand portal on `/`, and a hero plus 4 service photographs per brand (10 images).

## Tokens

| Token | DrCertificate | GetMedicalCertificate | Role |
|---|---|---|---|
| ground | `#F2F5F9` cool mineral | `#F6F4F9` mist lilac-grey | Section tint |
| paper | `#FFFFFF` | `#FFFFFF` | Cards and document |
| ink | `#0E1726` | `#1A1033` | Text |
| line | `#E2E7EF` | `#E8E3EF` | Borders and rules |
| primary | `#1E489D` | `#D6303A` | The one action colour |
| accent | `#15803D` | `#470087` | Trust marks only (✓, seal) |

**Type:** Geist only, self-hosted.
- Headlines are weight 600 with tracking −0.03em.
- Body text is 400 at 17px with line-height 1.6.
- Scale (major third): 14, 16, 18, 22, 28, 36, 48, 64.
- Body copy is limited to 68 characters per line. Text is left-aligned throughout.

**The one memorable thing:** the hero.
- DrCertificate: the certificate document lies over the corner of a home photograph. The document is the product, and the photo is the life it fits into.
- GetMedicalCertificate: a full-height photograph with the €34.99 price set into its bottom-left corner as part of the layout.

Everything else stays quiet: white paper, thin lines, generous space.

**Removed generic tells:**
- ALL-CAPS hero eyebrow → sentence case
- `→` on every button → plain verb buttons
- Numbered markers on the non-sequence checklist → check marks (How it works keeps its numbers, since it really is a sequence)
- Identical text-only cards → photo-led service cards

## Layouts

```
/  (split portal, one screen)
┌──────────────────────┬──────────────────────┐
│ DrCertificate        │ GetMedicalCertificate│
│ navy ground          │ purple ground        │
│ South East Asia      │ Europe & EEA         │
│ from 25 SGD          │ from €34.99          │
│ [Open DrCertificate] │ [Open GetMedical…]   │
└──────────────────────┴──────────────────────┘
phones: stacked halves, each 50svh

brand hero (desktop)
┌───────────────────────────┬───────────────────────┐
│ headline (64)             │  photo 4:5            │
│ body (18)                 │   ┌─certificate─┐ (dr) │
│ [Apply]  How it works     │   └─────────────┘     │
│ note: continues on form   │  €34.99 chip   (gmc)  │
│ ✓ ✓ ✓ ✓ trust row         │                       │
└───────────────────────────┴───────────────────────┘

services: 4 cards, photo 4:3 on top, title, one line, price or uses
```

## Image prompts (ChatGPT Image 2)

**Rules for all 10:**
- Photographic and natural: soft window daylight, shallow depth of field, calm and unstaged.
- No text, logos, brand names, watermarks or UI on any screen.
- No doctors, white coats, stethoscopes, hospitals or pills. These pages promise an online review, not a clinic.
- People are seen from behind, in profile, or cropped below the eyes, so no one can be mistaken for a real patient or doctor.
- Export as JPG or PNG at the size given. I'll convert them to WebP.

Save them as `public/img/gen/<filename>` (or send them to me and I'll place them).

### DrCertificate (South East Asia; navy and green; warm tropical daylight)

1. `dr-hero.jpg` (1600×2000, portrait 4:5)
   > Photograph, a calm apartment in Singapore in morning light, a young South East Asian adult sitting on a sofa wrapped in a light blanket, seen from the side and cropped at the shoulders, holding a smartphone, a glass of water and a tissue box on a low wooden table, tropical plants by a window, soft navy and white textiles, quiet and restful mood, shallow depth of field, no text, no logos, nothing readable on the phone screen.
2. `dr-sick-leave.jpg` (1200×900, 4:3)
   > Photograph, close crop of a bedside table in a bright Asian apartment, a laptop half closed, a mug of warm tea, a folded blanket, morning light through blinds, a sense of taking a day off to rest, muted navy and white palette, no people's faces, no text, no logos.
3. `dr-fitness.jpg` (1200×900, 4:3)
   > Photograph, a young adult tying running shoes on a park path in Kuala Lumpur at sunrise, cropped from the knees down, green trees, soft warm light, healthy and active, plain unbranded shoes, no faces, no text, no logos.
4. `dr-unfit-to-fly.jpg` (1200×900, 4:3)
   > Photograph, a small carry-on suitcase and a folded jacket resting by an apartment door with a passport-sized booklet on top (blank cover), late afternoon light, a trip on hold, calm muted palette, no airline branding, no text, no people.
5. `dr-general.jpg` (1200×900, 4:3)
   > Photograph, a tidy home desk with a closed manila folder, a pen and a laptop, a hand resting on the folder, cropped at the wrist, soft daylight, organised and administrative mood, navy and white tones, no text on documents, no logos.

### GetMedicalCertificate (Europe; purple and coral-red; cool northern daylight)

6. `gmc-hero.jpg` (1600×2000, portrait 4:5)
   > Photograph, a European apartment with tall windows and grey daylight, an adult sitting at a kitchen table in a soft knit sweater, seen from behind over the shoulder, holding a smartphone, a mug and a laptop on the table, muted lilac and grey tones, calm and private, shallow depth of field, nothing readable on the screen, no text, no logos.
7. `gmc-sick-leave.jpg` (1200×900, 4:3)
   > Photograph, an unmade bed with a grey duvet, a phone face down and a cup of tea on the bedside, rain on the window of a European flat, soft cool light, resting at home, no people, no text, no logos.
8. `gmc-fitness.jpg` (1200×900, 4:3)
   > Photograph, a gym bag, water bottle and folded towel on a wooden bench in a bright minimal gym, morning light, clean and ready, no branding, no people, no text.
9. `gmc-sports.jpg` (1200×900, 4:3)
   > Photograph, an amateur football pitch at dusk in a European town, a ball on the white line, a player's plain unbranded boots in the foreground cropped at the ankle, cool evening light, no faces, no text, no logos.
10. `gmc-unfit-to-travel.jpg` (1200×900, 4:3)
    > Photograph, a carry-on suitcase standing in a quiet European hallway beside a coat rack, a scarf draped over the handle, overcast daylight, a trip postponed, muted lilac-grey palette, no airline branding, no text, no people.

**Chooser (`/`):** no image is needed. Each half uses its own brand ground, logo, region and price.

## What I build before the images arrive

- Geist type scale, tokens, and removal of the generic tells listed above
- The split portal on `/`
- Photo slots on the service cards and the hero. A slot renders only when its file exists, so no section is ever blank: cards stay text-only until then.
- When the files land, I convert them to WebP, wire them in, then take screenshots and check them.
