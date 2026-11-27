import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, test, vi } from "vitest";
import { brands } from "@/brands";
import { Header } from "./Header";

vi.mock("next/navigation", () => ({
  usePathname: () => "/dr/sick-leave-certificate",
}));

describe("Header parity features", () => {
  test("dr mega menu opens and closes with click and Escape, returning focus to trigger", () => {
    render(<Header brand={brands.dr} />);
    const trigger = screen.getByRole("button", { name: "Services" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /Sick leave certificate/i })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: "Escape" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(document.activeElement).toBe(trigger);
  });

  test("dr language switcher links to the same slug in the other locale", () => {
    render(<Header brand={brands.dr} locale="en" />);
    const langBtn = screen.getByRole("button", { name: /Language: English/i });
    fireEvent.click(langBtn);
    const filLink = screen.getByRole("link", { name: "Filipino" });
    expect(filLink).toHaveAttribute("href", "/dr/fil/sick-leave-certificate");
  });

  test("gmc renders no language switcher and no mega menu", () => {
    render(<Header brand={brands.gmc} />);
    expect(screen.queryByRole("button", { name: /Language:/i })).toBeNull();
    expect(screen.queryByRole("button", { name: "Services" })).toBeNull();
  });
});
