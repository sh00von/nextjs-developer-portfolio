import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Navigation } from "@/components/SiteChrome";
import { CveTable, type CveItem } from "@/components/CveTable";

export const metadata: Metadata = {
  title: "Security Research — CVE Advisories | Md Minaruzzaman Shovon",
  description:
    "WordPress security research and CVE disclosures by Md Minaruzzaman Shovon, credited by WPScan, Patchstack, and WordPress.org. Browse advisories for plugin vulnerabilities including XSS, PHP object injection, broken access control, and file upload flaws.",
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

const cves = [
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
    id: "CVE-2026-10749",
    href: "/security/cve-2026-10749",
    title: "PHP Object Injection in Post Duplicator",
    plugin: "Post Duplicator",
    severity: "HIGH",
    cvss: "7.2",
    disclosed: "Jun 2026",
    description:
      "Unsanitized input passed to PHPs unserialize() via the customMetaData parameter allows Contributor-level users to inject arbitrary PHP objects, potentially leading to RCE when a gadget chain is present. Patched in 3.0.15.",
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
    id: "CVE-2026-39756",
    href: "/security/cve-2026-39756",
    title: "Unauthenticated IDOR in Wappointment",
    plugin: "Wappointment",
    severity: "MEDIUM",
    cvss: "6.5",
    disclosed: "Oct 2026",
    description:
      "Unauthenticated insecure direct object reference vulnerability in Wappointment versions up to 2.7.7. Credited via the Patchstack Bug Bounty Program.",
  },
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
    id: "CVE-2026-14556",
    href: "/security/cve-2026-14556",
    title: "Unauthenticated HTML Injection in HappyForms",
    plugin: "HappyForms",
    severity: "MEDIUM",
    cvss: "5.4",
    disclosed: "Oct 2026",
    description:
      "Failure to sanitise or escape a user-controlled referral value before embedding it in the form notification email allows unauthenticated attackers to inject arbitrary HTML into emails site administrators receive. Patched in 1.26.15.",
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
    id: "CVE-2026-105998",
    href: "/security/cve-2026-105998",
    title: "Unauthenticated Premium Subscription State Reset in Booking Package",
    plugin: "Booking Package",
    severity: "MEDIUM",
    cvss: "5.3",
    disclosed: "Oct 2026",
    description:
      "Missing authorization and validity checks before resetting the premium subscription state allow unauthenticated attackers to disable the plugins paid features. Patched in 1.7.31.",
  },
  {
    id: "CVE-2026-15151",
    href: "/security/cve-2026-15151",
    title: "Booking Manager+ Missing Authorization in Five Star Restaurant Reservations",
    plugin: "Five Star Restaurant Reservations",
    severity: "LOW",
    cvss: "3.8",
    disclosed: "Jul 2026",
    description:
      "Missing capability check on the rtb_reset_notifications AJAX action allows Booking Manager users, who cannot access plugin settings, to reset the sites booking notification rules. Patched in 2.7.23.",
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