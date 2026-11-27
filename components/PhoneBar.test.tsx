import { render, screen, act } from "@testing-library/react";
import { PhoneBar } from "./PhoneBar";

// Captures the observer callback so the test can say when the hero CTA leaves the screen
let fire: (visible: boolean) => void = () => {};
beforeEach(() => {
  globalThis.IntersectionObserver = class {
    constructor(cb: IntersectionObserverCallback) {
      fire = (visible) => cb([{ isIntersecting: visible } as IntersectionObserverEntry], this as unknown as IntersectionObserver);
    }
    observe() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

test("bar hides while the hero CTA is visible and shows after it scrolls away", () => {
  document.body.innerHTML = '<a id="hero-cta"></a>';
  render(<PhoneBar ctaLabel="Apply now" ctaHref="https://x" />, { container: document.body.appendChild(document.createElement("div")) });
  const bar = screen.getByTestId("phone-bar");
  act(() => fire(true));
  expect(bar).toHaveAttribute("data-shown", "false");
  act(() => fire(false));
  expect(bar).toHaveAttribute("data-shown", "true");
  expect(screen.getByRole("link", { name: "Apply now" })).toHaveAttribute("href", "https://x");
});
