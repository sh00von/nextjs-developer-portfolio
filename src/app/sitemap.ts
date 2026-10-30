import type { MetadataRoute } from "next";
import { apps } from "@/data/apps";
import { SITE_URL, getPostBody, posts } from "@/data/posts";

const SITE_UPDATED = new Date("2026-06-27");
const APPS_PUBLISHED = new Date("2026-07-19");
const CVE_10749_PUBLISHED = new Date("2026-06-01");
const CVE_57661_PUBLISHED = new Date("2026-06-26");
const CVE_14322_PUBLISHED = new Date("2026-07-01");
const CVE_14821_PUBLISHED = new Date("2026-05-15");
const CVE_15048_PUBLISHED = new Date("2026-07-31");
const CVE_14822_PUBLISHED = new Date("2026-08-01");
const CVE_15151_PUBLISHED = new Date("2026-08-02");
const CVE_15049_PUBLISHED = new Date("2026-08-10");
const CVE_84021_PUBLISHED = new Date("2026-08-15");
const CVE_85678_PUBLISHED = new Date("2026-08-20");

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
      lastModified: CVE_14322_PUBLISHED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/security/cve-2026-14322`,
      lastModified: CVE_14322_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/security/cve-2026-10749`,
      lastModified: CVE_10749_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/security/cve-2026-57661`,
      lastModified: CVE_57661_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/security/cve-2026-14821`,
      lastModified: CVE_14821_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/security/cve-2026-15048`,
      lastModified: CVE_15048_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/security/cve-2026-14822`,
      lastModified: CVE_14822_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/security/cve-2026-15151`,
      lastModified: CVE_15151_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/security/cve-2026-15049`,
      lastModified: CVE_15049_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/security/cve-2026-84021`,
      lastModified: CVE_84021_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/security/cve-2026-85678`,
      lastModified: CVE_85678_PUBLISHED,
      changeFrequency: "yearly",
      priority: 0.7,
    },
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
