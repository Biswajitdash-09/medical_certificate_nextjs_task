import { brands, getBrand, brandForHost } from "./index";

// Words that only one brand may say; seeing them on the other brand means copy leaked across
// "IST" is not here: gmc's own form states its hours in IST
const drOnly = ["SGD", "Stripe", "India", "MBBS", "Urooj", "care@drcertificate.com"];
const gmcOnly = ["€", "GDPR", "112", "EEA", "GetMedicalCertificate", "Govt ID"];

test("no gmc text leaks into dr", () => {
  const s = JSON.stringify(brands.dr);
  gmcOnly.forEach((w) => expect(s).not.toContain(w));
});

test("no dr text leaks into gmc", () => {
  const s = JSON.stringify(brands.gmc);
  drOnly.forEach((w) => expect(s).not.toContain(w));
});

test("prices unchanged from the live sites", () => {
  expect(JSON.stringify(brands.dr)).toMatch(/25 SGD in Singapore, 349 pesos in the Philippines or 30 MYR/);
  // The live price table still lists 399 pesos, so both live figures are pinned
  expect(brands.dr.priceTable).toContainEqual({ country: "Philippines", price: "399 pesos" });
  expect(brands.gmc.services).toHaveLength(4);
  brands.gmc.services.forEach((s) => expect(s.price).toBe("€34.99"));
});

test("unknown brand is undefined", () => {
  expect(getBrand("foo")).toBeUndefined();
});

// Each real domain resolves to its own brand; preview hosts resolve to none and keep /dr and /gmc
test("hosts map to their own brand only", () => {
  expect(brandForHost("drcertificate.com")?.id).toBe("dr");
  expect(brandForHost("www.getmedicalcertificate.com")?.id).toBe("gmc");
  expect(brandForHost("drcertificate.com:443")?.id).toBe("dr");
  expect(brandForHost("my-app.vercel.app")).toBeUndefined();
  expect(brandForHost(null)).toBeUndefined();
});

// Nothing on our pages may send people to the brands' live sites or forms
test("configs hold no off-site links", () => {
  Object.values(brands).forEach((b) => {
    expect(b.ctaHref.startsWith("/")).toBe(true);
    b.beforeYouStart.items.forEach((i) => expect(i.href ?? "/").toMatch(/^\//));
    b.nav.forEach((n) => expect(n.href).toMatch(/^[#/]/));
  });
});

// Each service has a unique URL slug for its detail page
test("service slugs are unique per brand", () => {
  Object.values(brands).forEach((b) => {
    const slugs = b.services.map((s) => s.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((s) => expect(s).toMatch(/^[a-z0-9-]+$/));
  });
});
