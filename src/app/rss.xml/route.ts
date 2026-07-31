import { NextResponse } from "next/server";

const cves = [
  {
    id: "CVE-2026-15048",
    title: "CVE-2026-15048 — GeekyBot Unauthenticated Sensitive Information Exposure",
    link: "https://shovon.bd/security/cve-2026-15048",
    description:
      "Sensitive Information Exposure vulnerability in WordPress GeekyBot < 1.2.8 allowing unauthenticated retrieval of chat history metadata, user IDs, and usernames. Discovered and reported by Md Minaruzzaman Shovon.",
    pubDate: new Date("2026-07-31").toUTCString(),
  },
  {
    id: "CVE-2026-14322",
    title: "CVE-2026-14322 — Timetics Unauthenticated Booking Auto-Approval",
    link: "https://shovon.bd/security/cve-2026-14322",
    description:
      "Unauthenticated Booking Auto-Approval via Arbitrary payment_method in WordPress Timetics < 1.0.57. Discovered and reported by Md Minaruzzaman Shovon.",
    pubDate: new Date("2026-07-01").toUTCString(),
  },
  {
    id: "CVE-2026-10749",
    title: "CVE-2026-10749 — Post Duplicator PHP Object Injection",
    link: "https://shovon.bd/security/cve-2026-10749",
    description:
      "PHP Object Injection vulnerability in WordPress Post Duplicator <= 3.0.14 via unsanitized unserialize(). Discovered and reported by Md Minaruzzaman Shovon.",
    pubDate: new Date("2026-06-01").toUTCString(),
  },
  {
    id: "CVE-2026-57661",
    title: "CVE-2026-57661 — WPComplete Broken Access Control",
    link: "https://shovon.bd/security/cve-2026-57661",
    description:
      "Broken Access Control vulnerability in WordPress WPComplete <= 2.9.5.5 allowing Subscriber privilege escalation. Discovered and reported by Md Minaruzzaman Shovon.",
    pubDate: new Date("2026-06-26").toUTCString(),
  },
  {
    id: "CVE-2026-14821",
    title: "CVE-2026-14821 — Quiz and Survey Master Missing Authorization",
    link: "https://shovon.bd/security/cve-2026-14821",
    description:
      "Missing Authorization vulnerability in WordPress Quiz and Survey Master < 11.1.5 allowing arbitrary output template deletion. Discovered and reported by Md Minaruzzaman Shovon.",
    pubDate: new Date("2026-05-15").toUTCString(),
  },
];

export async function GET() {
  const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Md Minaruzzaman Shovon — Security Advisories &amp; CVE Disclosures</title>
    <link>https://shovon.bd/security</link>
    <description>Security research, WordPress plugin vulnerability disclosures, and CVE advisories by Md Minaruzzaman Shovon.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="https://shovon.bd/rss.xml" rel="self" type="application/rss+xml"/>
    ${cves
      .map(
        (cve) => `
    <item>
      <title>${cve.title}</title>
      <link>${cve.link}</link>
      <guid isPermaLink="true">${cve.link}</guid>
      <pubDate>${cve.pubDate}</pubDate>
      <description><![CDATA[${cve.description}]]></description>
    </item>`
      )
      .join("")}
  </channel>
</rss>`;

  return new NextResponse(rssXml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
