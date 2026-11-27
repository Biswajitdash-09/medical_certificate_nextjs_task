import Link from "next/link";
import { brands } from "@/brands";

export const metadata = { title: "Brand preview" };

// Neutral chooser so one deployment shows both brands without mixing their copy
export default function Home() {
  return (
    <main className="mx-auto max-w-md px-4 py-20">
      <h1 className="text-2xl font-bold">Choose a brand</h1>
      <ul className="mt-6 space-y-3">
        {Object.values(brands).map((b) => (
          <li key={b.id}>
            <Link href={`/${b.id}`} className="block rounded-lg border px-4 py-3 font-medium hover:bg-slate-50">
              {b.name}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
