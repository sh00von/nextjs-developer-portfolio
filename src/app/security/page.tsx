import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Navigation } from "@/components/SiteChrome";
import { PageHeader } from "@/components/PageHeader";
import { CveTable } from "@/components/CveTable";
import { cves } from "@/data/cves";

export const metadata: Metadata = {
  title: "Security Research & CVE Advisories",
  description:
    `${cves.length} WordPress plugin CVEs found by Md Minaruzzaman Shovon and credited by WPScan, Wordfence and Patchstack: XSS, object injection, access control and RCE.`,
  alternates: {
    canonical: "https://www.shovon.bd/security",
  },
  keywords: [
    "CVE",
    "security research",
    "WordPress vulnerabilities",
    "responsible disclosure",
    "Md Minaruzzaman Shovon",
    "CVE-2026-85678",
    "CVE-2026-84021",
    "CVE-2026-15049",
    "CVE-2026-15048",
    "CVE-2026-14822",
    "CVE-2026-14322",
    "CVE-2026-10749",
    "CVE-2026-57661",
    "CVE-2026-14821",
    "CVE-2026-15151",
    "CVE-2026-105998",
    "CVE-2026-14556",
    "CVE-2026-39756",
    "WPScan",
    "Patchstack",
    "security advisory",
    "WordPress plugin vulnerabilities",
  ],
  openGraph: {
    type: "website",
    url: "https://www.shovon.bd/security",
    siteName: "Shovon Portfolio",
    title: "Security Research — CVE Advisories | Md Minaruzzaman Shovon",
    description:
      "WordPress security research and CVE disclosures by Md Minaruzzaman Shovon, credited by WPScan, Patchstack, and WordPress.org. Browse advisories for plugin vulnerabilities including XSS, PHP object injection, broken access control, and file upload flaws.",
    images: [
      "/api/og?title=Security%20Research%20%E2%80%94%20CVE%20Advisories&subtitle=WordPress%20vulnerability%20disclosures%20%26%20security%20research%20by%20Md%20Minaruzzaman%20Shovon&category=SECURITY%20RESEARCH&badge=13%20DISCLOSURES&badgeColor=%232563eb&badgeBg=%23eff6ff",
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@sh00von",
    title: "Security Research — CVE Advisories | Md Minaruzzaman Shovon",
    description:
      "WordPress security research and CVE disclosures by Md Minaruzzaman Shovon, credited by WPScan, Patchstack, and WordPress.org. Browse advisories for plugin vulnerabilities including XSS, PHP object injection, broken access control, and file upload flaws.",
    images: [
      "/api/og?title=Security%20Research%20%E2%80%94%20CVE%20Advisories&subtitle=WordPress%20vulnerability%20disclosures%20%26%20security%20research%20by%20Md%20Minaruzzaman%20Shovon&category=SECURITY%20RESEARCH&badge=13%20DISCLOSURES&badgeColor=%232563eb&badgeBg=%23eff6ff",
    ],
  },
};


export default function SecurityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Security Research — CVE Advisories | Md Minaruzzaman Shovon",
        description:
          "Security advisories and CVE disclosures by Md Minaruzzaman Shovon including vulnerabilities in Timetics, Post Duplicator, and WPComplete.",
        url: "https://www.shovon.bd/security",
        author: {
          "@type": "Person",
          name: "Md Minaruzzaman Shovon",
          url: "https://www.shovon.bd/",
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: cves.map((cve, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "TechArticle",
              name: cve.title,
              identifier: cve.id,
              url: `https://www.shovon.bd${cve.href}`,
              description: cve.description,
            },
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.shovon.bd/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Security Research",
            item: "https://www.shovon.bd/security",
          },
        ],
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation active="security" />

      <main id="main-content" className="container-wide flex-1 overflow-x-clip pb-24">
        <PageHeader
          eyebrow={`${cves.length} CVE advisories`}
          title="Security Research"
          description="CVE advisories from responsible disclosure of WordPress plugin vulnerabilities. All findings were reported to the relevant vendor or disclosure program prior to publication."
          crumbs={[{ label: "Home", href: "/" }, { label: "Security Research" }]}
        >
          <div className="mt-8 grid grid-cols-3 gap-3 sm:max-w-lg">
            {(["HIGH", "MEDIUM", "LOW"] as const).map((sev) => (
              <div key={sev} className="card px-4 py-3">
                <p className="text-2xl font-semibold tabular-nums text-[var(--text)]">
                  {cves.filter((c) => c.severity === sev).length}
                </p>
                <p className="mt-0.5 flex items-center gap-1.5 text-xs text-[var(--muted-3)]">
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${sev === "HIGH" ? "bg-red-500" : sev === "MEDIUM" ? "bg-amber-500" : "bg-sky-500"}`}
                  />
                  {sev.charAt(0) + sev.slice(1).toLowerCase()}
                </p>
              </div>
            ))}
          </div>
        </PageHeader>

        <CveTable data={cves} />

        <section className="mt-16">
          <p className="eyebrow mb-3">Credits</p>
          <h2 className="text-2xl font-semibold tracking-tight text-[var(--text)] sm:text-3xl">
            Vendor Recognitions &amp; Changelog Credits
          </h2>
          <p className="mt-2 text-sm text-[#5c5c5c]">
            Additional security disclosures and contributions recognized in official plugin changelogs and release notes.
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <div className="card p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-semibold text-[#111111]">MapPress Maps 2.97.2</span>
                <span className="inline-flex items-center rounded border border-[#bbf7d0] bg-[#f0fdf4] px-2 py-0.5 text-xs font-semibold text-[#166534]">
                  Changelog Credit
                </span>
                <span className="ml-auto text-xs text-[#737373]">2026</span>
              </div>
              <p className="mt-2 text-sm font-medium text-[#111111]">
                Security Assistance Recognition in MapPress Google Maps for WordPress
              </p>
              <p className="mt-1 text-sm leading-6 text-[#5c5c5c]">
                Discovered and reported security issues in MapPress Maps. The plugin author published official changelog appreciation in version 2.97.2:
                <em className="mt-2 block break-words rounded-lg border border-[var(--border)] bg-[var(--surface)] p-3 font-mono text-xs text-[#333333]">
                  &quot;Thanks to https://shovon.bd for security assistance in 2.97&quot;
                </em>
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#737373]">
                <Link
                  href="https://wordpress.org/plugins/mappress-google-maps-for-wordpress/#developers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#111111] underline underline-offset-4 decoration-[#d4d4d4] hover:decoration-[#111111] transition-colors"
                >
                  WordPress.org Changelog →
                </Link>
                <Link
                  href="https://wpm.so/package/mappress-google-maps-for-wordpress"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#111111] underline underline-offset-4 decoration-[#d4d4d4] hover:decoration-[#111111] transition-colors"
                >
                  WPM Package Listing →
                </Link>
              </div>
            </div>

            <div className="card p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs font-semibold text-[#111111]">WP Store Locator 2.3.1</span>
                <span className="inline-flex items-center rounded border border-[#bbf7d0] bg-[#f0fdf4] px-2 py-0.5 text-xs font-semibold text-[#166534]">
                  Patch Release
                </span>
                <span className="ml-auto text-xs text-[#737373]">2026</span>
              </div>
              <p className="mt-2 text-sm font-medium text-[#111111]">
                Stored XSS (CVSS 8.1) Coordinated Patch Release
              </p>
              <p className="mt-1 text-sm leading-6 text-[#5c5c5c]">
                Discovered and responsibly disclosed a high-severity Stored XSS vulnerability (CVSS 8.1) in WP Store Locator (&le; 2.3.0). Resulted in a critical patch release in 2.3.1 and changelog acknowledgement.
              </p>
              <div className="mt-3 text-xs text-[#737373]">
                <Link
                  href="https://wordpress.org/plugins/wp-store-locator/#developers"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#111111] underline underline-offset-4 decoration-[#d4d4d4] hover:decoration-[#111111] transition-colors"
                >
                  WordPress.org Changelog →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer backHome homePath="/" />
    </div>
  );
}
