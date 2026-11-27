import { NextResponse, type NextRequest } from "next/server";
import { brandForHost } from "@/brands";

// On a brand's own domain, "/" serves that brand's homepage; preview URLs keep /dr and /gmc
export function proxy(request: NextRequest) {
  const brand = brandForHost(request.headers.get("host"));
  if (!brand) return NextResponse.next();
  return NextResponse.rewrite(new URL(`/${brand.id}`, request.url));
}

export const config = { matcher: "/" };
