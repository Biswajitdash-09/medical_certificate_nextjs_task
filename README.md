# Two-brand medical certificate homepage

One Next.js 16 app (App Router, TypeScript) that renders the DrCertificate and GetMedicalCertificate homepages from the same components.

- `/dr` is DrCertificate and `/gmc` is GetMedicalCertificate; `/` links to both.
- Brand content lives in `brands/dr.ts` and `brands/gmc.ts`. The components are in `components/`.
- DrCertificate's internal pages (countries, conditions, guides, 8 translations) are scraped JSON in `content/dr/`, served by `app/[brand]/[...slug]`. Re-scrape with `node scripts/scrape-dr.mjs`.
- Decisions, evidence and the plan for a third brand are in [NOTES.md](NOTES.md).

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # brand-leak, price, legal, FAQ, menu and content tests
npm run build
npm run smoke    # against a running server: status codes, 404s, no cross-brand text
```

Deploy: import the repo in Vercel with the default Next.js settings. No environment variables are needed; set `NEXT_PUBLIC_SITE_URL` only if the site moves off `medical-certificate-nextjs-task.vercel.app` (used for the sitemap, robots and hreflang).
