import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const acceptHeader = request.headers.get("accept") || "";
  const pathname = request.nextUrl.pathname;

  // RFC 8288 & RFC 9727 Link headers for Agent Discovery
  const linkHeader =
    '</.well-known/api-catalog>; rel="api-catalog", </.well-known/ai.txt>; rel="service-doc"; type="text/plain", </llms.txt>; rel="describedby"; type="text/plain", </llms-full.txt>; rel="service-desc"; type="text/plain", </.well-known/security.txt>; rel="author", </sitemap.xml>; rel="sitemap"; type="application/xml", </rss.xml>; rel="alternate"; type="application/rss+xml"';

  // Skip static assets, favicon, icon, etc.
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    (pathname.includes(".") && !pathname.endsWith(".txt"))
  ) {
    const res = NextResponse.next();
    res.headers.set("Link", linkHeader);
    return res;
  }

  // Content negotiation: check if agent requests Accept: text/markdown
  const isMarkdownRequested = acceptHeader.toLowerCase().includes("text/markdown");

  if (isMarkdownRequested) {
    const targetFile =
      pathname.startsWith("/security") ||
      pathname.startsWith("/projects") ||
      pathname.startsWith("/apps")
        ? "/llms-full.txt"
        : "/llms.txt";

    const url = request.nextUrl.clone();
    url.pathname = targetFile;

    const response = NextResponse.rewrite(url);
    response.headers.set("Content-Type", "text/markdown; charset=utf-8");
    response.headers.set("Vary", "Accept");
    response.headers.set("Link", linkHeader);
    response.headers.set("x-markdown-tokens", "1500");
    return response;
  }

  const response = NextResponse.next();
  response.headers.set("Link", linkHeader);
  response.headers.set("Vary", "Accept");
  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.svg|icon.svg).*)",
  ],
};
