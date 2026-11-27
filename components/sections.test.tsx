import { render } from "@testing-library/react";
import { brands } from "@/brands";
import { Legal } from "./Legal";
import { Faq } from "./Faq";
import { Facts } from "./Facts";
import { Services } from "./Services";
import { Hero } from "./Hero";
import { Statement } from "./Statement";
import { BeforeYouStart } from "./BeforeYouStart";

// Trimming sections must never drop a legal point or an FAQ, and the FAQ must work without JS
test.each(["dr", "gmc"] as const)("%s renders every legal point and FAQ", (id) => {
  const b = brands[id];
  const { container } = render(<><Legal brand={b} /><Faq brand={b} /></>);
  b.legal.flatMap((g) => g.points).forEach((l) => expect(container.textContent).toContain(l));
  expect(container.querySelectorAll("details summary")).toHaveLength(b.faq.length);
});

test("dr shows its price table, gmc has none", () => {
  expect(render(<Facts brand={brands.dr} />).container.querySelector("table")).not.toBeNull();
  expect(render(<Facts brand={brands.gmc} />).container.querySelector("table")).toBeNull();
});

// The services heading is dr's own wording, so it must not render on gmc
test("gmc services heading is its own, not dr's", () => {
  const { container } = render(<Services brand={brands.gmc} />);
  expect(container.textContent).not.toContain("Choose the certificate you need");
  expect(container.textContent).toContain("Choose your certificate");
});

// dr leads with its certificate illustration, gmc with a photograph; neither shows the other's
test("hero shows each brand's own visual", () => {
  const dr = render(<Hero brand={brands.dr} />).container;
  expect(dr.textContent).toContain("Medical Certificate");
  expect(dr.querySelector("img[src*='photo-']")).toBeNull();
  const gmc = render(<Hero brand={brands.gmc} />).container;
  expect(gmc.querySelector("img")).not.toBeNull();
  expect(gmc.textContent).not.toContain("Reg. no.");
});

// Every photograph credited, and the file actually exists
test("hero photographs exist on disk", async () => {
  const fs = await import("node:fs");
  Object.values(brands).forEach((b) => {
    if (b.hero.visual.kind === "photo") {
      expect(fs.existsSync("public" + b.hero.visual.src)).toBe(true);
      // A licensed stand-in must carry its licence; generated photos carry no credit
      if (b.hero.visual.credit) expect(b.hero.visual.credit).toMatch(/CC|public domain/i);
    }
  });
});

// The statement is the brand's own live sentence, every word present for screen readers
test.each(["dr", "gmc"] as const)("%s statement renders whole", (id) => {
  const { container } = render(<Statement brand={brands[id]} />);
  expect(container.textContent?.replace(/\s+/g, " ").trim()).toContain(brands[id].statement);
});

// Service cards with a live detail page link there
test("service cards link to their detail pages", () => {
  const { container } = render(<Services brand={brands.dr} />);
  expect(container.querySelector("a[href='/dr/unfit-to-fly']")).not.toBeNull();
});

// Each brand lists what its form will ask for, so nobody is surprised halfway through it
test.each(["dr", "gmc"] as const)("%s before-you-start lists every item", (id) => {
  const b = brands[id];
  const { container } = render(<BeforeYouStart brand={b} />);
  b.beforeYouStart.items.forEach((i) => expect(container.textContent).toContain(i.text));
  expect(container.textContent).toContain(b.ctaNote);
});

// We never send people to the live sites, so the sample-certificate item is plain text
test("before-you-start has no off-site links", () => {
  const { container } = render(<BeforeYouStart brand={brands.gmc} />);
  expect(container.querySelector("a[href^='http']")).toBeNull();
});

// The hero tells people where the Apply button takes them
test.each(["dr", "gmc"] as const)("%s hero shows where Apply leads", (id) => {
  const { container } = render(<Hero brand={brands[id]} />);
  expect(container.textContent).toContain(brands[id].ctaNote);
});

// A grid where only some cards have photos looks broken, so photos show only when every card has one
test("service photos render all-or-none per brand", () => {
  const partial = { ...brands.dr, services: brands.dr.services.map((s, i) => (i === 0 ? { ...s, photo: { src: "/img/gen/dr-sick-leave.webp", alt: "x" } } : { ...s, photo: undefined })) };
  expect(render(<Services brand={partial} />).container.querySelectorAll("img")).toHaveLength(0);
});

// Every photo a config names exists on disk
test("every configured photo file exists", async () => {
  const fs = await import("node:fs");
  Object.values(brands).forEach((b) => {
    b.services.forEach((s) => s.photo && expect(fs.existsSync("public" + s.photo.src)).toBe(true));
    const v = b.hero.visual;
    const src = v.kind === "photo" ? v.src : v.photo?.src;
    if (src) expect(fs.existsSync("public" + src)).toBe(true);
  });
});
