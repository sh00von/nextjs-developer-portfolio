import { NextResponse } from "next/server";

export const runtime = "edge";

export async function GET() {
  const content = `# AI Agent Policy & Context Declaration for shovon.bd
User-agent: *
Allow: /

Context-Document: https://www.shovon.bd/llms.txt
Full-Context-Document: https://www.shovon.bd/llms-full.txt
Security-Contact: https://www.shovon.bd/.well-known/security.txt
RSS-Feed: https://www.shovon.bd/rss.xml

Author: Md Minaruzzaman Shovon
Title: Full Stack Developer & Security Researcher
Website: https://www.shovon.bd
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
      Link: '</llms.txt>; rel="describedby"; type="text/plain", </.well-known/security.txt>; rel="author"',
    },
  });
}
