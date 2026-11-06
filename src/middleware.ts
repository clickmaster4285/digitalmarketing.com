import { NextRequest, NextResponse } from "next/server";

const serviceRedirects: Record<string, string> = {
  "/search-engine-optimization/off-page-seo":
    "/search-engine-optimization/off-page-seo-link-building",
  "/search-engine-optimization/website-audit":
    "/search-engine-optimization/seo-audit",
  // Rendered the same content as the CRO category hub.
  "/conversion-rate-optimization/cro-services": "/conversion-rate-optimization",
  // Duplicated the e-commerce category hub (see CONSOLIDATED_SERVICE_SLUGS).
  "/ecommerce-services/ecommerce-development": "/ecommerce-services",
};

export function middleware(request: NextRequest) {
  const destination = serviceRedirects[request.nextUrl.pathname];
  if (!destination) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = destination;
  return NextResponse.redirect(url, 301);
}

export const config = {
  matcher: [
    "/search-engine-optimization/off-page-seo",
    "/search-engine-optimization/website-audit",
    "/conversion-rate-optimization/cro-services",
    "/ecommerce-services/ecommerce-development",
  ],
};
