import { render } from "@testing-library/react";
import { brands } from "@/brands";
import { Legal } from "./Legal";
import { Faq } from "./Faq";
import { Facts } from "./Facts";
import { Services } from "./Services";
import { Hero } from "./Hero";
import { Statement } from "./Statement";

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
      expect(b.hero.visual.credit).toMatch(/CC|public domain/i);
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
  expect(container.querySelector("a[href='https://drcertificate.com/unfit-to-fly/']")).not.toBeNull();
});
