import type { Brand } from "@/brands/types";

// The page's one moment: the brand's own sentence set large, words lighting up as it scrolls through (pure CSS, no JS)
export function Statement({ brand }: { brand: Brand }) {
  const words = brand.statement.split(" ");
  return (
    <section aria-label={brand.statement} className="statement bg-white">
      <div className="mx-auto flex min-h-[70svh] max-w-6xl items-center px-4 py-20">
        <p className="text-4xl font-extrabold leading-[1.1] tracking-tight text-balance md:text-7xl">
          {words.map((w, i) => (
            <span key={i} className="statement-word" style={{ "--i": i, "--n": words.length } as React.CSSProperties}>
              {w}{" "}
            </span>
          ))}
        </p>
      </div>
    </section>
  );
}
