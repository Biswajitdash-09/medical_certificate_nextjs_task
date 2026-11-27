import http from "node:http";

// Smoke test against a running server: status codes, domain rewrite, and no cross-brand text in the HTML
const base = process.argv[2] ?? "http://localhost:3000";
const checks = [];
const expect = (name, ok) => checks.push([name, ok]);

const status = async (path, headers = {}) => (await fetch(base + path, { headers, redirect: "manual" })).status;
const html = async (path) => (await fetch(base + path)).text();
// fetch() drops a custom Host header, so the domain rewrite is checked with plain http
const htmlForHost = (host) => new Promise((resolve, reject) => {
  http.get(base + "/", { headers: { host } }, (res) => { let b = ""; res.on("data", (c) => (b += c)); res.on("end", () => resolve(b)); }).on("error", reject);
});

expect("/dr is 200", (await status("/dr")) === 200);
expect("/gmc is 200", (await status("/gmc")) === 200);
expect("/foo is 404", (await status("/foo")) === 404);
expect("share image is 200", (await status("/gmc/opengraph-image")) === 200);
expect("drcertificate.com host serves dr", (await htmlForHost("drcertificate.com")).includes("DrCertificate —"));
const dr = await html("/dr");
const gmc = await html("/gmc");
expect("dr page has no gmc words", !["€34.99", "GDPR", "dial 112", "GetMedicalCertificate"].some((w) => dr.includes(w)));
expect("gmc page has no dr words", !["SGD", "Stripe", " IST", "India", "MBBS"].some((w) => gmc.includes(w)));
expect("both pages carry FAQ JSON-LD", dr.includes('"FAQPage"') && gmc.includes('"FAQPage"'));

checks.forEach(([n, ok]) => console.log(ok ? "PASS" : "FAIL", n));
process.exit(checks.every(([, ok]) => ok) ? 0 : 1);
