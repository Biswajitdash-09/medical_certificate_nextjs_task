import { NextResponse, type NextRequest } from "next/server";
import { brandForHost, getBrand } from "@/brands";
import { getPage, parseSlug } from "@/content";

// Pages that exist under a brand besides its service and scraped slugs
const BRAND_PAGES = new Set(["apply", "opengraph-image"]);

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // On a brand's own domain, "/" serves that brand's homepage; preview URLs keep /dr and /gmc
  if (pathname === "/") {
    const brand = brandForHost(request.headers.get("host"));
    return brand ? NextResponse.rewrite(new URL(`/${brand.id}`, request.url)) : NextResponse.next();
  }

  // Cache Components streams unknown slugs with a 200 before notFound() runs, so the real 404 status is set here
  const [id, ...rest] = pathname.slice(1).split("/");
  const brand = getBrand(id);
  if (!brand) return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });

  if (rest.length === 0) return NextResponse.next();
  if (rest.length === 1 && (BRAND_PAGES.has(rest[0]) || brand.services.some((s) => s.slug === rest[0]))) {
    return NextResponse.next();
  }

  // Check localized homepage (/dr/fil), translated page, or English fallback for a valid slug
  // Same parsing as the page itself, so an English "id/..." country page is not mistaken for the Indonesian locale
  const { locale, pageSlug, isLocaleHome } = parseSlug(brand.id, brand.locales, rest);
  const isLocale = locale !== "en";
  const known =
    isLocaleHome ||
    Boolean(getPage(brand.id, locale, pageSlug)) ||
    (isLocale && (Boolean(getPage(brand.id, "en", pageSlug)) || brand.services.some((s) => s.slug === pageSlug)));
  if (!known) return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
  return NextResponse.next();
}

// "/" plus any multi-segment path without a file extension; assets and _next pass straight through
export const config = { matcher: ["/", "/((?!_next/)[^.]+)"] };
