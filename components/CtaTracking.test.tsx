import { render, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

// Records analytics calls instead of sending them
const track = vi.fn();
vi.mock("@vercel/analytics", () => ({ track: (...a: unknown[]) => track(...a) }));
import { CtaTracking } from "./CtaTracking";

test("an Apply click is tracked with its brand and position", () => {
  render(<div data-brand="gmc"><a data-cta="hero" href="#">Get a certificate</a><CtaTracking /></div>);
  fireEvent.click(document.querySelector("[data-cta]")!);
  expect(track).toHaveBeenCalledWith("apply_click", { brand: "gmc", position: "hero" });
});
