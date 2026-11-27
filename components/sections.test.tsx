import { render } from "@testing-library/react";
import { brands } from "@/brands";
import { Legal } from "./Legal";
import { Faq } from "./Faq";
import { Facts } from "./Facts";
import { Services } from "./Services";

// Trimming sections must never drop a legal point or an FAQ, and the FAQ must work without JS
test.each(["dr", "gmc"] as const)("%s renders every legal point and FAQ", (id) => {
  const b = brands[id];
  const { container } = render(<><Legal brand={b} /><Faq brand={b} /></>);
  b.legal.forEach((l) => expect(container.textContent).toContain(l));
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
