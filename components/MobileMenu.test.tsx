import { render, screen, fireEvent } from "@testing-library/react";
import { MobileMenu } from "./MobileMenu";

test("menu opens, contains CTA, closes on Escape and link click", () => {
  render(<MobileMenu nav={[{ label: "FAQ", href: "#faq" }]} ctaLabel="Apply now" ctaHref="https://x" />);
  const btn = screen.getByRole("button", { name: /menu/i });
  expect(btn).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(btn);
  expect(btn).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("link", { name: "Apply now" })).toHaveAttribute("href", "https://x");
  fireEvent.keyDown(document, { key: "Escape" });
  expect(btn).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(btn);
  fireEvent.click(screen.getByRole("link", { name: "FAQ" }));
  expect(btn).toHaveAttribute("aria-expanded", "false");
});
