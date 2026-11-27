# Two-brand medical certificate homepage

One Next.js 16 app (App Router, TypeScript) that renders the DrCertificate and GetMedicalCertificate homepages from the same components.

- `/dr` is DrCertificate and `/gmc` is GetMedicalCertificate; `/` links to both.
- Brand content lives in `brands/dr.ts` and `brands/gmc.ts`. The components are in `components/`.
- Decisions, evidence and the plan for a third brand are in [NOTES.md](NOTES.md).

```bash
npm install
npm run dev      # http://localhost:3000
npm test         # brand-leak, price, legal, FAQ and mobile-menu tests
npm run build
```

Deploy: import the repo in Vercel with the default Next.js settings. No environment variables are needed.
