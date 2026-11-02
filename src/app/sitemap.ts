import type { MetadataRoute } from "next";
import { apps } from "@/data/apps";
import { cves } from "@/data/cves";
import { SITE_URL, getPostBody, posts } from "@/data/posts";

const SITE_UPDATED = new Date("2026-06-27");
const APPS_PUBLISHED = new Date("2026-07-19");

/** Exact publish dates where known; other advisories fall back to their disclosure month. */
const CVE_PUBLISHED: Record<string, string> = {
  "CVE-2026-10749": "2026-06-01",
  "CVE-2026-57661": "2026-06-26",
  "CVE-2026-14322": "2026-07-01",
  "CVE-2026-14821": "2026-05-15",
  "CVE-2026-15048": "2026-07-31",
  "CVE-2026-14822": "2026-08-01",
  "CVE-2026-15151": "2026-08-02",
  "CVE-2026-15049": "2026-08-10",
  "CVE-2026-84021": "2026-08-15",
  "CVE-2026-85678": "2026-08-20",
};

function cvePublished(id: string, disclosed: string): Date {
  const known = CVE_PUBLISHED[id];
  if (known) return new Date(known);
  const parsed = new Date(`1 ${disclosed} UTC`);
  return Number.isNaN(parsed.getTime()) ? SITE_UPDATED : parsed;
}

const cveDates = cves.map((cve) => cvePublished(cve.id, cve.disclosed));
const LATEST_CVE = new Date(Math.max(...cveDates.map((date) => date.getTime())));

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/academic`,
      lastModified: SITE_UPDATED,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/projects`,
      lastModified: SITE_UPDATED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/projects/rsray`,
      lastModified: new Date("2026-10-30"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/bwdb-polders`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/security`,
      lastModified: LATEST_CVE,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...cves.map((cve, index) => ({
      url: `${SITE_URL}${cve.href}`,
      lastModified: cveDates[index],
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
    {
      url: `${SITE_URL}/blog`,
      lastModified: new Date(
        posts.reduce((latest, p) => (p.dateModified > latest ? p.dateModified : latest), "")
      ),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.dateModified),
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [
        ...new Set([
          ...(post.image ? [post.image] : []),
          ...[...getPostBody(post.slug).matchAll(/!\[[^\]]*\]\((\/[^)\s]+)\)/g)].map((m) => m[1]),
        ]),
      ].map((src) => `${SITE_URL}${src}`),
    })),
    {
      url: `${SITE_URL}/apps`,
      lastModified: APPS_PUBLISHED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/avasos`,
      lastModified: new Date("2026-10-15"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    ...apps.map((app) => ({
      url: `${SITE_URL}/apps/${app.slug}`,
      lastModified: APPS_PUBLISHED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...apps
      .filter((app) => app.privacyUrl)
      .map((app) => ({
        url: `${SITE_URL}${app.privacyUrl}`,
        lastModified: APPS_PUBLISHED,
        changeFrequency: "yearly" as const,
        priority: 0.5,
      })),
  ];
}
