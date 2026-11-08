import fs from "node:fs";
import path from "node:path";
import { apps } from "@/data/apps";
import { cves } from "@/data/cves";
import {
  achievements,
  certifications,
  education,
  experience,
  pressCoverage,
  publications,
  securityDisclosures,
  skills,
  socials,
  volunteers,
} from "@/data/home";
import { projects } from "@/data/projects";
import { SITE_URL, sortedPosts } from "@/data/posts";

/*
 * Builds /llms.txt and /llms-full.txt from the same data files that render the site,
 * so the context given to AI assistants never drifts out of date.
 */

const NAME = "Md Minaruzzaman Shovon";
const SUMMARY = `${NAME} is a full-stack developer, WordPress security researcher and Water Resources Engineering student at CUET, based in Chattogram, Bangladesh. He is Chief Technology Officer at Authry AI.`;

const abs = (href: string) => (href.startsWith("http") ? href : `${SITE_URL}${href}`);

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

function splitMeta(meta: string) {
  const index = meta.lastIndexOf(", ");
  return index === -1 ? { role: meta, period: "" } : { role: meta.slice(0, index), period: meta.slice(index + 2) };
}

/** Changelog credits and other disclosures that are not CVE pages on this site. */
const vendorCredits = securityDisclosures.filter((item) => !item.href.startsWith("/security/"));

const profileLinks = socials.filter(([label]) => label !== "Resume");

/** Hand-written per-CVE notes, keyed by CVE id (see src/content/llms-cve-details.md). */
function cveNotes(): Map<string, string> {
  const file = path.join(process.cwd(), "src/content/llms-cve-details.md");
  const notes = new Map<string, string>();
  if (!fs.existsSync(file)) return notes;
  const text = fs.readFileSync(file, "utf8");
  for (const block of text.split(/\n(?=### )/)) {
    const match = block.match(/^### (CVE-\d{4}-\d+)/);
    if (match) notes.set(match[1], block.trim());
  }
  return notes;
}

export function buildLlmsTxt(): string {
  const lines: string[] = [
    `# ${NAME} — Portfolio, Projects & Security Research`,
    "",
    `> ${SUMMARY}`,
    "",
    "## Main pages",
    `- [Portfolio](${SITE_URL}/): Full-stack web engineering with Next.js, TypeScript, AI products and GIS, plus hydrology, GIS and environmental research at CUET.`,
    `- [Projects](${SITE_URL}/projects): ${projects.length} software, AI, GIS and security projects.`,
    `- [Android apps](${SITE_URL}/apps): ${apps.length} apps — ${apps.map((app) => app.name).join(", ")}.`,
    `- [Security research](${SITE_URL}/security): ${cves.length} CVE advisories for WordPress plugins.`,
    `- [Blog](${SITE_URL}/blog): Machine learning, web mapping and Android apps ([RSS](${SITE_URL}/blog/rss.xml)).`,
    `- [Bangladesh Coastal Polders dataset](${SITE_URL}/bwdb-polders): Open GIS dataset of 162 BWDB coastal polders with a Google Earth Engine asset.`,
    "",
    "## Featured projects",
    ...projects
      .slice(0, 8)
      .map((project) => `- [${project.title}](${abs(project.link)}): ${project.description}`),
    "",
    "## Blog posts",
    "Each post is also available as Markdown by appending `.md` to its URL or sending `Accept: text/markdown`.",
    ...sortedPosts.map(
      (post) => `- [${post.title}](${SITE_URL}/blog/${post.slug}) ([markdown](${SITE_URL}/blog/${post.slug}.md)): ${post.description}`,
    ),
    "",
    `## Security advisories (${cves.length} CVEs)`,
    ...cves.map(
      (cve) =>
        `- [${cve.id}](${abs(cve.href)}): ${cve.title} — CVSS ${cve.cvss} ${cve.severity.toLowerCase()}, disclosed ${cve.disclosed}. Discovered by ${NAME}.`,
    ),
    ...vendorCredits.map((item) => `- [${item.title}](${item.href}): ${item.description}`),
    "",
    "## Android apps",
    ...apps.map(
      (app) => `- [${app.name}](${SITE_URL}/apps/${app.slug}): ${app.tagline} (${app.status}, ${app.category}).`,
    ),
    "",
    "## Experience",
    ...experience.map(([org, href, meta]) => {
      const { role, period } = splitMeta(meta);
      return `- ${role} at [${org}](${href}) (${period})`;
    }),
    "",
    "## Profiles",
    ...profileLinks.map(([label, href]) => `- [${label}](${href})`),
    "",
    "## Full context",
    `- [llms-full.txt](${SITE_URL}/llms-full.txt): Every advisory, publication, project, app, skill and achievement in one file.`,
    "",
  ];
  return lines.join("\n");
}

function cveSection(cve: (typeof cves)[number], notes: Map<string, string>): string {
  const note = notes.get(cve.id);
  if (note) return note;
  return [
    `### ${cve.id} — ${cve.title}`,
    `- **Plugin**: ${cve.plugin} (WordPress plugin)`,
    `- **Severity**: CVSS ${cve.cvss} (${cve.severity.charAt(0)}${cve.severity.slice(1).toLowerCase()})`,
    `- **Researcher**: ${NAME}`,
    `- **Disclosed**: ${cve.disclosed}`,
    `- **Summary**: ${cve.description}`,
    `- **CVE Reference**: https://www.cve.org/CVERecord?id=${cve.id}`,
    `- **Advisory URL**: ${abs(cve.href)}`,
  ].join("\n");
}

export function buildLlmsFullTxt(): string {
  const notes = cveNotes();
  const lines: string[] = [
    `# ${NAME} — Comprehensive Knowledge File for AI Assistants & Answer Engines`,
    "",
    "## Overview",
    SUMMARY,
    "",
    `- Website: ${SITE_URL}`,
    `- Research & publications: ${SITE_URL}/#research`,
    `- Security advisories: ${SITE_URL}/security`,
    `- Email: hello@shovon.bd`,
    ...profileLinks.map(([label, href]) => `- ${label}: ${href}`),
    "",
    "---",
    "",
    "## Experience",
    ...experience.map(([org, href, meta]) => {
      const { role, period } = splitMeta(meta);
      return `- **${role}** at ${org} (${period}) — ${href}`;
    }),
    "",
    "### Leadership & volunteering",
    ...volunteers.map(([org, href, meta]) => {
      const { role, period } = splitMeta(meta);
      return `- **${role}**, ${org} (${period}) — ${href}`;
    }),
    "",
    "### Education",
    ...education.map(([school, detail]) => `- ${school} — ${detail}`),
    "",
    "---",
    "",
    `## Security Research & Vulnerability Disclosures (${cves.length} CVEs)`,
    "",
    ...cves.flatMap((cve) => [cveSection(cve, notes), ""]),
    "### Vendor changelog credits",
    ...vendorCredits.map((item) => `- **${item.title}** (${item.outlet}, ${item.date}): ${item.description} — ${item.href}`),
    "",
    "---",
    "",
    "## Blog",
    `Index: ${SITE_URL}/blog — RSS: ${SITE_URL}/blog/rss.xml. Append \`.md\` to any post URL for plain Markdown.`,
    "",
    ...sortedPosts.flatMap((post) => [
      `### ${post.title} (${formatDate(post.datePublished)})`,
      `URL: ${SITE_URL}/blog/${post.slug}`,
      ...post.summary.map((point) => `- ${point}`),
      "",
    ]),
    "---",
    "",
    "## Projects",
    ...projects.map(
      (project) => `- **${project.title}** (${project.categories.join(", ")}): ${project.description} — ${abs(project.link)}`,
    ),
    "",
    "## Android Apps",
    ...apps.map(
      (app) =>
        `- **${app.name}** — ${app.tagline}. ${app.description} Status: ${app.status}. Details: ${SITE_URL}/apps/${app.slug}${
          app.playStoreUrl ? ` — Google Play: ${app.playStoreUrl}` : ""
        }`,
    ),
    "",
    "---",
    "",
    "## Technical Skills",
    ...skills.map(([heading, ...items]) => `- **${heading}**: ${items.join(", ")}`),
    "- **Security Research**: Vulnerability discovery, responsible disclosure, WordPress plugin security, PHP code audit",
    "",
    "## Publications & Preprints",
    ...publications.map(
      (pub, index) => `${index + 1}. **${pub.title}** (${pub.label}, ${pub.date}) — ${pub.authors}. ${pub.href}`,
    ),
    "",
    "## Achievements",
    ...achievements.map(([title, org, year]) => `- **${title}** — ${org} (${year})`),
    "",
    "## Certifications",
    ...certifications.map(([title, meta]) => `- ${title} — ${meta}`),
    "",
    "## Press",
    ...pressCoverage.map(
      (item) => `- **${item.outlet}** (${item.date}): "${item.title}" — ${item.description} ${item.href}`,
    ),
    "",
  ];
  return lines.join("\n");
}
