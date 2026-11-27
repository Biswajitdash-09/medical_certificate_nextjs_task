import { render, screen, act } from "@testing-library/react";
import { PhoneBar } from "./PhoneBar";

// Captures the observer callback so the test can say which in-page CTAs are on screen
let fire: (entries: { target: Element; isIntersecting: boolean }[]) => void = () => {};
beforeEach(() => {
  globalThis.IntersectionObserver = class {
    constructor(cb: IntersectionObserverCallback) {
      fire = (entries) => cb(entries as unknown as IntersectionObserverEntry[], this as unknown as IntersectionObserver);
    }
    observe() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
});

test("bar shows only while no in-page Apply button is on screen", () => {
  document.body.innerHTML = '<main><a data-cta="hero"></a><a data-cta="services"></a></main>';
  const [hero, services] = document.querySelectorAll("main [data-cta]");
  render(<PhoneBar ctaLabel="Apply now" ctaHref="https://x" />, { container: document.body.appendChild(document.createElement("div")) });
  const bar = screen.getByTestId("phone-bar");
  act(() => fire([{ target: hero, isIntersecting: true }]));
  expect(bar).toHaveAttribute("data-shown", "false");
  act(() => fire([{ target: hero, isIntersecting: false }]));
  expect(bar).toHaveAttribute("data-shown", "true");
  // Services button scrolls into view: the bar steps aside so the same action is not shown twice
  act(() => fire([{ target: services, isIntersecting: true }]));
  expect(bar).toHaveAttribute("data-shown", "false");
  expect(screen.getByRole("link", { name: "Apply now", hidden: true })).toHaveAttribute("href", "https://x");
});
