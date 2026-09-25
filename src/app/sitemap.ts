import type { MetadataRoute } from "next";
import { apps } from "@/data/apps";

const SITE_UPDATED = new Date("2026-06-27");
const APPS_PUBLISHED = new Date("2026-07-19");
const CVE_10749_PUBLISHED = new Date("2026-06-01");
const CVE_57661_PUBLISHED = new Date("2026-06-26");
const CVE_14322_PUBLISHED = new Date("2026-07-01");
const CVE_14821_PUBLISHED = new Date("2026-05-15");
const CVE_15048_PUBLISHED = new Date("2026-07-31");
const CVE_14822_PUBLISHED = new Date("2026-08-01");
const CVE_15049_PUBLISHED = new Date("2026-08-10");
const CVE_84021_PUBLISHED = new Date("2026-08-15");
const CVE_85678_PUBLISHED = new Date("2026-08-20");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://shovon.bd",
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://shovon.bd/dev",
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: "https://shovon.bd/academic",
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: "https://shovon.bd/projects",
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://shovon.bd/bwdb-polders",
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://shovon.bd/security",
      lastModified: CVE_14322_PUBLISHED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: "https://shovon.bd/security/cve-2026-14322",
      lastModified: CVE_14322_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "https://shovon.bd/security/cve-2026-10749",
      lastModified: CVE_10749_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "https://shovon.bd/security/cve-2026-57661",
      lastModified: CVE_57661_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "https://shovon.bd/security/cve-2026-14821",
      lastModified: CVE_14821_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "https://shovon.bd/security/cve-2026-15048",
      lastModified: CVE_15048_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "https://shovon.bd/security/cve-2026-14822",
      lastModified: CVE_14822_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "https://shovon.bd/security/cve-2026-15049",
      lastModified: CVE_15049_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "https://shovon.bd/security/cve-2026-84021",
      lastModified: CVE_84021_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "https://shovon.bd/security/cve-2026-85678",
      lastModified: CVE_85678_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "https://shovon.bd/apps",
      lastModified: APPS_PUBLISHED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...apps.map((app) => ({
      url: `https://shovon.bd/apps/${app.slug}`,
      lastModified: APPS_PUBLISHED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...apps
      .filter((app) => app.privacyUrl)
      .map((app) => ({
        url: `https://shovon.bd${app.privacyUrl}`,
        lastModified: APPS_PUBLISHED,
        changeFrequency: "yearly" as const,
        priority: 0.5,
      })),
  ];
}
