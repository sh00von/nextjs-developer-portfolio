import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Navigation } from "@/components/SiteChrome";
import { CveTable, type CveItem } from "@/components/CveTable";

export const metadata: Metadata = {
  title: "Security Research — CVE Advisories | Md Minaruzzaman Shovon",
  description:
    "Security advisories and CVE disclosures by Md Minaruzzaman Shovon. WordPress vulnerability research including PHP Object Injection, Arbitrary File Upload, and Broken Access Control findings.",
  alternates: {
    canonical: "https://shovon.bd/security",
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
    "WPScan",
    "Patchstack",
    "security advisory",
    "WordPress plugin vulnerabilities",
  ],
  openGraph: {
    type: "website",
    url: "https://shovon.bd/security",
    siteName: "Shovon Portfolio",
    title: "Security Research — CVE Advisories | Md Minaruzzaman Shovon",
    description:
      "Security advisories and CVE disclosures by Md Minaruzzaman Shovon. WordPress vulnerability research including PHP Object Injection, Arbitrary File Upload, and Broken Access Control findings.",
    images: [
      "/api/og?title=Security%20Research%20%E2%80%94%20CVE%20Advisories&subtitle=WordPress%20vulnerability%20disclosures%20%26%20security%20research%20by%20Md%20Minaruzzaman%20Shovon&category=SECURITY%20RESEARCH&badge=9%20DISCLOSURES&badgeColor=%232563eb&badgeBg=%23eff6ff",
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@sh00von",
    title: "Security Research — CVE Advisories | Md Minaruzzaman Shovon",
    description:
      "Security advisories and CVE disclosures by Md Minaruzzaman Shovon. WordPress vulnerability research including PHP Object Injection, Arbitrary File Upload, and Broken Access Control findings.",
    images: [
      "/api/og?title=Security%20Research%20%E2%80%94%20CVE%20Advisories&subtitle=WordPress%20vulnerability%20disclosures%20%26%20security%20research%20by%20Md%20Minaruzzaman%20Shovon&category=SECURITY%20RESEARCH&badge=9%20DISCLOSURES&badgeColor=%232563eb&badgeBg=%23eff6ff",
    ],
  },
};

const cves = [
  {
    id: "CVE-2026-85678",
    href: "/security/cve-2026-85678",
    title: "Authenticated (Contributor+) Stored XSS in AI Builder",
    plugin: "AI Builder",
    severity: "MEDIUM",
    cvss: "6.4",
    disclosed: "Sep 2026",
    description:
      "Insufficient sanitization of custom JavaScript saved against posts allows Contributor-level users to inject arbitrary web scripts inside inline script tags. Patched in 2.7.8.",
  },
  {
    id: "CVE-2026-84021",
    href: "/security/cve-2026-84021",
    title: "Authenticated (Contributor+) Stored XSS in Bold Page Builder",
    plugin: "Bold Page Builder",
    severity: "MEDIUM",
    cvss: "6.8",
    disclosed: "Aug 2026",
    description:
      "Missing URL validation on shortcodes and button/headline link parameters allows Contributor-level users to store malicious JavaScript links. Patched in 5.9.8.",
  },
  {
    id: "CVE-2026-15049",
    href: "/security/cve-2026-15049",
    title: "Authenticated (Editor+) Arbitrary File Upload in Depicter",
    plugin: "Depicter",
    severity: "HIGH",
    cvss: "7.2",
    disclosed: "Jul 2026",
    description:
      "Improper file validation during ZIP slider/template import allows Editor-level users to upload arbitrary executable PHP files leading to Remote Code Execution (RCE). Patched in 4.8.0.",
  },
  {
    id: "CVE-2026-15048",
    href: "/security/cve-2026-15048",
    title: "Unauthenticated Sensitive Information Exposure in GeekyBot",
    plugin: "GeekyBot",
    severity: "MEDIUM",
    cvss: "5.3",
    disclosed: "Jul 2026",
    description:
      "Missing authorization check on AJAX action allows unauthenticated users to retrieve chat-history session metadata including WordPress usernames, user IDs, and timestamps. Patched in 1.2.8.",
  },
  {
    id: "CVE-2026-14822",
    href: "/security/cve-2026-14822",
    title: "Unauthenticated PayPal Order Status Manipulation in Event Tickets",
    plugin: "Event Tickets",
    severity: "MEDIUM",
    cvss: "5.3",
    disclosed: "Jul 2026",
    description:
      "Missing authorization on REST endpoint allows unauthenticated attackers to forge status transitions on PayPal ticket orders without valid payment. Patched in 5.29.0.1.",
  },
  {
    id: "CVE-2026-14322",
    href: "/security/cve-2026-14322",
    title: "Unauthenticated Booking Auto-Approval in Timetics",
    plugin: "Timetics",
    severity: "MEDIUM",
    cvss: "5.3",
    disclosed: "Jul 2026",
    description:
      "Missing payment method verification and status enforcement allows unauthenticated users to create fully-approved bookings for priced appointments without payment. Patched in 1.0.57.",
  },
  {
    id: "CVE-2026-10749",
    href: "/security/cve-2026-10749",
    title: "PHP Object Injection in Post Duplicator",
    plugin: "Post Duplicator",
    severity: "HIGH",
    cvss: "7.2",
    disclosed: "Jun 2026",
    description:
      "Unsanitized input passed to PHP's unserialize() via the customMetaData parameter allows Contributor-level users to inject arbitrary PHP objects, potentially leading to RCE when a gadget chain is present. Patched in 3.0.15.",
  },
  {
    id: "CVE-2026-57661",
    href: "/security/cve-2026-57661",
    title: "Broken Access Control in WPComplete",
    plugin: "WPComplete",
    severity: "MEDIUM",
    cvss: "5.4",
    disclosed: "Jun 2026",
    description:
      "Missing authorization checks and nonce validation on a sensitive function allows Subscriber-level users to perform privileged actions including manipulating course completion records for arbitrary users. Patched in 2.9.5.6.",
  },
  {
    id: "CVE-2026-14821",
    href: "/security/cve-2026-14821",
    title: "Missing Authorization in Quiz and Survey Master",
    plugin: "Quiz and Survey Master",
    severity: "LOW",
    cvss: "2.7",
    disclosed: "May 2026",
    description:
      "Missing capability checks on output template deletion allow Contributor-level users or higher to delete arbitrary output templates in Quiz and Survey Master < 11.1.5. Patched in version 11.1.5.",
  },
];

export default function SecurityPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Security Research — CVE Advisories | Md Minaruzzaman Shovon",
        description:
          "Security advisories and CVE disclosures by Md Minaruzzaman Shovon including vulnerabilities in Timetics, Post Duplicator, and WPComplete.",
        url: "https://shovon.bd/security",
        author: {
          "@type": "Person",
          name: "Md Minaruzzaman Shovon",
          url: "https://shovon.bd/dev",
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
              url: `https://shovon.bd${cve.href}`,
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
            item: "https://shovon.bd/dev",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Security Research",
            item: "https://shovon.bd/security",
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

      <main id="main-content" className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 lg:max-w-[60vw]">
        <div className="mb-1 flex items-center gap-2 text-xs text-[#737373]">
          <Link href="/dev" className="hover:text-[#111111] transition-colors">
            Home
          </Link>
          <span>/</span>
          <span>Security Research</span>
        </div>

        <h1 className="mt-4 text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl">
          Security Research
        </h1>
        <p className="mt-2 max-w-2xl text-base leading-7 text-[#5c5c5c]">
          CVE advisories from responsible disclosure of WordPress plugin vulnerabilities.
          All findings were reported to the relevant vendor or disclosure program prior to publication.
        </p>

        <CveTable data={cves as CveItem[]} />

        <section className="mt-14">
          <h2 className="border-b border-[#e5e5e5] pb-2 text-lg font-semibold tracking-tight text-[#111111]">
            Vendor Recognitions &amp; Changelog Credits
          </h2>
          <p className="mt-2 text-sm text-[#5c5c5c]">
            Additional security disclosures and contributions recognized in official plugin changelogs and release notes.
          </p>

          <div className="mt-6 flex flex-col gap-4">
            <div className="rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] px-5 py-5">
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
                <em className="mt-1 block rounded border border-[#e5e5e5] bg-white p-2 font-mono text-xs text-[#333333]">
                  &quot;Thanks to https://shovon.bd for security assistance in 2.97&quot;
                </em>
              </p>
              <div className="mt-3 flex items-center gap-4 text-xs text-[#737373]">
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

            <div className="rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] px-5 py-5">
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

      <Footer backHome homePath="/dev" />
    </div>
  );
}
