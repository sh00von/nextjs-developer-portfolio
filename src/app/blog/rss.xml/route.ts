import { SITE_URL, postUrl, sortedPosts } from "@/data/posts";

export const dynamic = "force-static";

function escapeXml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function GET() {
  const items = sortedPosts
    .map((post) => {
      const summary = `<p>${escapeXml(post.description)}</p><ul>${post.summary
        .map((s) => `<li>${escapeXml(s)}</li>`)
        .join("")}</ul>`;
      return `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${postUrl(post)}</link>
      <guid isPermaLink="true">${postUrl(post)}</guid>
      <pubDate>${new Date(post.datePublished).toUTCString()}</pubDate>
      <dc:creator>Md Minaruzzaman Shovon</dc:creator>
      <category>${escapeXml(post.section)}</category>
      <description><![CDATA[${summary}]]></description>
    </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>Md Minaruzzaman Shovon — Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Articles on machine learning, GIS and web mapping, and Android apps by Md Minaruzzaman Shovon.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date(sortedPosts[0]?.dateModified ?? Date.now()).toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/blog/rss.xml" rel="self" type="application/rss+xml"/>${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
