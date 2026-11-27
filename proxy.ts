import { NextResponse, type NextRequest } from "next/server";
import { brandForHost, getBrand } from "@/brands";

// Pages that exist under a brand besides its service slugs
const BRAND_PAGES = new Set(["apply", "opengraph-image"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // On a brand's own domain, "/" serves that brand's homepage; preview URLs keep /dr and /gmc
  if (pathname === "/") {
    const brand = brandForHost(request.headers.get("host"));
    return brand ? NextResponse.rewrite(new URL(`/${brand.id}`, request.url)) : NextResponse.next();
  }

  // Cache Components streams unknown slugs with a 200 before notFound() runs, so the real 404 status is set here
  const [id, page] = pathname.slice(1).split("/");
  const brand = getBrand(id);
  const known = brand && (!page || BRAND_PAGES.has(page) || brand.services.some((s) => s.slug === page));
  if (!known) return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
  return NextResponse.next();
}

// "/" plus one- and two-segment paths without a file extension; assets and _next pass straight through
export const config = { matcher: ["/", "/((?!_next/)[^/.]+)", "/((?!_next/)[^/.]+)/([^/.]+)"] };
