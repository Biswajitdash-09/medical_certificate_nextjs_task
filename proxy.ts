import { NextResponse, type NextRequest } from "next/server";
import { brandForHost, getBrand } from "@/brands";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // On a brand's own domain, "/" serves that brand's homepage; preview URLs keep /dr and /gmc
  if (pathname === "/") {
    const brand = brandForHost(request.headers.get("host"));
    return brand ? NextResponse.rewrite(new URL(`/${brand.id}`, request.url)) : NextResponse.next();
  }

  // Cache Components streams unknown [brand] slugs with a 200 before notFound() runs, so the real 404 status is set here
  const slug = pathname.slice(1);
  if (!getBrand(slug)) return NextResponse.rewrite(new URL("/_not-found", request.url), { status: 404 });
  return NextResponse.next();
}

// "/" plus single-segment paths without a file extension; assets, _next and nested routes (opengraph-image) pass straight through
export const config = { matcher: ["/", "/((?!_next/)[^/.]+)"] };
