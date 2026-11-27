import { brands, getBrand } from "./index";

// Words that only one brand may say; seeing them on the other brand means copy leaked across
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

test("prices unchanged from the live sites", () => {
  expect(JSON.stringify(brands.dr)).toMatch(/25 SGD[\s\S]*399 pesos[\s\S]*30 MYR/);
  expect(brands.gmc.services).toHaveLength(4);
  brands.gmc.services.forEach((s) => expect(s.price).toBe("€34.99"));
});

test("unknown brand is undefined", () => {
  expect(getBrand("foo")).toBeUndefined();
});
