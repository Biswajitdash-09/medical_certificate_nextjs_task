import { act, render, screen, fireEvent } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { ScrollButtons } from "./ScrollButtons";

test("clicking Scroll to top calls window.scrollTo with top: 0", () => {
  let cb: IntersectionObserverCallback | undefined;
  globalThis.IntersectionObserver = class {
    constructor(callback: IntersectionObserverCallback) {
      cb = callback;
    }
    observe() {}
    disconnect() {}
    unobserve() {}
    takeRecords() { return []; }
    root = null;
    rootMargin = "";
    thresholds = [];
  } as unknown as typeof IntersectionObserver;

  const scrollTo = vi.fn();
  window.scrollTo = scrollTo;
  render(
    <div>
      <div id="scroll-sentinel-top" />
      <ScrollButtons />
      <div id="scroll-sentinel-bottom" />
    </div>
  );
  const topEl = document.getElementById("scroll-sentinel-top")!;
  act(() => {
    cb?.([{ target: topEl, isIntersecting: false }] as unknown as IntersectionObserverEntry[], {} as IntersectionObserver);
  });

  const upBtn = screen.getByRole("button", { name: "Scroll to top" });
  fireEvent.click(upBtn);
  expect(scrollTo).toHaveBeenCalledWith(expect.objectContaining({ top: 0 }));
});
