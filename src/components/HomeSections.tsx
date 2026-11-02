import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { apps } from "@/data/apps";
import { cveCount, cveSeverityById, cveSeverityCounts } from "@/data/cves";
import { experience as allExperience, featured, publications, socials } from "@/data/home";
import { projects, type Project } from "@/data/projects";
import { homeVariantContent, type HomeVariant } from "@/lib/homeVariants";
import { CopyCommand } from "./CopyCommand";
import { GalleryImage } from "./GalleryLightbox";
import { ArrowRightIcon, ArrowUpRight } from "./SocialIcons";

const RESUME_PROPS = {
  href: "/resume.pdf",
  target: "_blank",
  rel: "noopener noreferrer",
  download: "Md_Minaruzzaman_Shovon_Resume.pdf",
} as const;

const isExternal = (href: string) => href.startsWith("http");

const externalProps = (href: string) =>
  isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

function splitMeta(meta: string) {
  const index = meta.lastIndexOf(", ");
  if (index === -1) return { role: meta, period: "" };
  return { role: meta.slice(0, index), period: meta.slice(index + 2) };
}

/* ---------------------------------------------------------------- */
/* Layout primitives                                                 */
/* ---------------------------------------------------------------- */

/** Two-column section: quiet label on the left, content on the right (stacked on mobile). */
export function Section({
  id,
  title,
  description,
  action,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="grid gap-6 border-t border-[var(--border)] py-14 sm:py-20 md:grid-cols-[180px_1fr] md:gap-12"
    >
      <div>
        <div className="md:sticky md:top-[calc(var(--nav-h)+2rem)]">
          <h2 id={`${id}-title`} className="text-sm font-medium text-[var(--text)]">
            {title}
          </h2>
          {action ? (
            <Link
              href={action.href}
              className="link-arrow mt-2 hidden !text-[13px] !font-normal !text-[var(--muted-3)] hover:!text-[var(--text)] md:inline-flex"
            >
              {action.label}
              <ArrowRightIcon width={13} height={13} />
            </Link>
          ) : null}
        </div>
      </div>
      <div className="min-w-0">
        {description ? (
          <p className="mb-8 max-w-xl text-[15px] leading-7 text-[var(--muted-2)]">{description}</p>
        ) : null}
        {children}
        {action ? (
          <Link href={action.href} className="link-arrow mt-8 !text-sm md:hidden">
            {action.label}
            <ArrowRightIcon width={14} height={14} />
          </Link>
        ) : null}
      </div>
    </section>
  );
}

/** A divided list row; renders as a link when href is given. */
function Row({ href, children, className = "" }: { href?: string; children: ReactNode; className?: string }) {
  const classes = `group -mx-3 flex gap-4 rounded-lg px-3 py-4 transition-colors ${
    href ? "hover:bg-[var(--surface)]" : ""
  } ${className}`;
  if (!href) return <div className={classes}>{children}</div>;
  return (
    <Link href={href} {...externalProps(href)} className={classes}>
      {children}
    </Link>
  );
}

/* ---------------------------------------------------------------- */
/* Hero                                                              */
/* ---------------------------------------------------------------- */

const SEVERITY_META = [
  { key: "HIGH", label: "high", color: "bg-red-500" },
  { key: "MEDIUM", label: "medium", color: "bg-amber-400" },
  { key: "LOW", label: "low", color: "bg-sky-400" },
] as const;

function CveSummary() {
  return (
    <Link
      href="/security"
      className="group flex w-full max-w-sm items-center gap-4 rounded-xl border border-[var(--border)] px-4 py-3 transition-colors hover:border-[var(--border-hover)]"
      aria-label={`${cveCount} CVEs disclosed: ${cveSeverityCounts.HIGH} high, ${cveSeverityCounts.MEDIUM} medium and ${cveSeverityCounts.LOW} low severity. View security research.`}
    >
      <span className="font-mono text-2xl font-medium tabular-nums tracking-tight text-[var(--text)]">
        {cveCount}×
      </span>
      <span className="min-w-0 flex-1" aria-hidden="true">
        <span className="block text-sm font-medium text-[var(--text)]">CVEs disclosed</span>
        <span className="mt-1.5 flex h-1 w-full gap-0.5 overflow-hidden rounded-full">
          {SEVERITY_META.map((sev) => (
            <span key={sev.key} className={`${sev.color} rounded-full`} style={{ flexGrow: cveSeverityCounts[sev.key] }} />
          ))}
        </span>
        <span className="mt-1.5 block text-xs text-[var(--muted-3)]">
          {SEVERITY_META.map((sev) => `${cveSeverityCounts[sev.key]} ${sev.label}`).join(" · ")}
        </span>
      </span>
      <ArrowRightIcon className="shrink-0 text-[var(--muted-3)] transition-transform group-hover:translate-x-0.5 group-hover:text-[var(--text)]" />
    </Link>
  );
}

export function HeroSection({ variant }: { variant: HomeVariant }) {
  const content = homeVariantContent[variant];
  const [currentOrg, currentHref, currentMetaRaw] = allExperience[0];
  const currentRole = splitMeta(currentMetaRaw).role.replace(/\s*\(.*\)/, "");
  const role =
    variant === "academic" ? "Water Resources Engineering · CUET" : "Full-stack developer · Security researcher";

  const facts =
    variant === "academic"
      ? [
          [String(publications.length), "papers"],
          ["162", "polders mapped"],
          [String(projects.length), "projects"],
        ]
      : [
          [String(projects.length), "projects"],
          [String(apps.length), "Android apps"],
          [String(publications.length), "papers"],
        ];

  return (
    <section className="pt-12 pb-16 sm:pt-20 sm:pb-24">
      <div className="animate-fade-up">
        <div className="flex items-center gap-4">
          <Image
            src="/shovon.jpg"
            alt="Portrait of Md Minaruzzaman Shovon"
            width={128}
            height={128}
            priority
            className="h-14 w-14 rounded-full object-cover"
          />
          <div>
            <h1 className="text-[15px] font-semibold text-[var(--text)]">Md Minaruzzaman Shovon</h1>
            <p className="text-sm text-[var(--muted-3)]">{role}</p>
          </div>
        </div>

        <p className="mt-10 max-w-3xl text-[34px] font-medium leading-[1.1] tracking-[-0.035em] text-[var(--text)] sm:text-5xl md:text-[58px]">
          {content.hero.headline.replace(/\.$/, "")}
          <span className="text-[var(--accent)]">.</span>
        </p>

        <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted-2)] sm:text-lg sm:leading-8">
          {content.hero.intro}
        </p>

        <p className="mt-6 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-[var(--muted-3)]">
          <span className="inline-flex items-center gap-2">
            <span className="status-dot" aria-hidden="true" />
            <span>
              {currentRole} at{" "}
              <a
                href={currentHref}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text)] underline decoration-[var(--border-hover)] underline-offset-4 hover:decoration-[var(--text)]"
              >
                {currentOrg}
              </a>
            </span>
          </span>
          <span aria-hidden="true">·</span>
          <span>Chattogram, Bangladesh</span>
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a href="mailto:hello@shovon.bd" className="btn btn-primary">
            Get in touch
          </a>
          <a {...RESUME_PROPS} className="btn btn-secondary">
            Resume
          </a>
          <Link href="/projects" className="btn btn-ghost">
            View work
            <ArrowRightIcon width={14} height={14} />
          </Link>
        </div>

        <div className="mt-14 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <CveSummary />
          <ul className="flex gap-8 text-sm text-[var(--muted-3)]">
            {facts.map(([value, label]) => (
              <li key={label} className="flex flex-col">
                <span className="font-mono text-lg font-medium tabular-nums text-[var(--text)]">{value}</span>
                <span className="text-xs">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Spotlight: rsray + polders                                        */
/* ---------------------------------------------------------------- */

export function SpotlightSection({ variant }: { variant: HomeVariant }) {
  const rsray = (
    <article key="rsray" className="flex flex-col">
      <Link
        href="/projects/rsray"
        className="group relative flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl bg-[#0c0c0c] p-6 text-white sm:p-7"
        aria-label="rsray project page"
      >
        <div className="flex items-center justify-between font-mono text-[11px] text-white/45">
          <span>~/recon</span>
          <span>v0.1.3</span>
        </div>
        <div className="font-mono text-[12.5px] leading-6 text-white/60 sm:text-[13px]" aria-hidden="true">
          <p>
            <span className="text-[#a3e635]">$</span> <span className="text-white/85">rsray https://target.app --crawl</span>
          </p>
          <p className="text-white/35">→ parsing bundles with SWC…</p>
          <p>
            GET&nbsp;&nbsp;<span className="text-white/90">/api/v2/users</span>
          </p>
          <p>
            POST <span className="text-white/90">/api/auth/refresh</span>
          </p>
          <p>
            GET&nbsp;&nbsp;<span className="text-white/90">/internal/admin/flags</span>
          </p>
        </div>
        <p className="font-mono text-4xl font-bold tracking-tight transition-transform duration-500 group-hover:translate-x-1 sm:text-5xl">
          rsray<span className="animate-pulse text-[#a3e635]">_</span>
        </p>
      </Link>
      <div className="mt-5">
        <p className="text-xs text-[var(--muted-3)]">Open source · Rust · Bug bounty recon</p>
        <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-[var(--text)]">
          Extract endpoints from JavaScript bundles
        </h3>
        <p className="mt-2 text-[15px] leading-7 text-[var(--muted-2)]">
          A Rust CLI that X-rays JS bundles and websites to find hidden API endpoints, with source maps, crawling,
          auth/proxy support and JSON, CSV or wordlist output.
        </p>
        <div className="mt-5">
          <CopyCommand command="cargo install rsray" />
        </div>
        <div className="mt-5 flex gap-6">
          <Link href="/projects/rsray" className="link-arrow">
            Explore
            <ArrowRightIcon width={14} height={14} />
          </Link>
          <a
            href="https://github.com/sh00von/rsray"
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow !font-normal !text-[var(--muted-2)] hover:!text-[var(--text)]"
          >
            GitHub
            <ArrowUpRight width={14} height={14} />
          </a>
        </div>
      </div>
    </article>
  );

  const polders = (
    <article key="polders" className="flex flex-col">
      <Link
        href="/bwdb-polders"
        className="group relative block aspect-[4/3] overflow-hidden rounded-2xl bg-[var(--surface)]"
        aria-label="Bangladesh coastal polders dataset"
      >
        <Image
          src="/images/lst_high_res.png"
          alt="Satellite raster of the Bangladesh coast"
          fill
          sizes="(min-width: 1024px) 480px, 100vw"
          className="origin-top scale-[1.16] object-cover object-top transition-transform duration-700 group-hover:scale-[1.2]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/5 to-transparent" />
        <div className="absolute right-6 bottom-6 left-6 flex items-end justify-between text-white">
          <div>
            <p className="text-5xl font-medium leading-none tracking-tight">162</p>
            <p className="mt-1.5 text-xs text-white/80">coastal polders</p>
          </div>
          <p className="font-mono text-[11px] text-white/80">WGS84 · EPSG:4326</p>
        </div>
      </Link>
      <div className="mt-5">
        <p className="text-xs text-[var(--muted-3)]">Open dataset · Google Earth Engine asset</p>
        <h3 className="mt-1.5 text-lg font-semibold tracking-tight text-[var(--text)]">
          Bangladesh Coastal Polders GIS Hub
        </h3>
        <p className="mt-2 text-[15px] leading-7 text-[var(--muted-2)]">
          162 BWDB coastal polders compiled, standardized and published to Earth Engine, with sample code and a
          Shapefile download.
        </p>
        <dl className="mt-5 grid grid-cols-3 border-y border-[var(--border)] py-3 text-xs">
          {[
            ["Format", "SHP · GeoJSON"],
            ["Platform", "Earth Engine"],
            ["Access", "Open"],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-[var(--muted-3)]">{label}</dt>
              <dd className="mt-0.5 font-medium text-[var(--text)]">{value}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-5 flex gap-6">
          <Link href="/bwdb-polders" className="link-arrow">
            Explore dataset
            <ArrowRightIcon width={14} height={14} />
          </Link>
          <a
            href="https://code.earthengine.google.com/?asset=users/minarsvn/bwdb_all_polders"
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow !font-normal !text-[var(--muted-2)] hover:!text-[var(--text)]"
          >
            Open in GEE
            <ArrowUpRight width={14} height={14} />
          </a>
        </div>
      </div>
    </article>
  );

  return (
    <Section id="featured-projects" title="Featured">
      <div className="grid gap-14 lg:grid-cols-2 lg:gap-10">
        {variant === "academic" ? [polders, rsray] : [rsray, polders]}
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* Selected work                                                     */
/* ---------------------------------------------------------------- */

export function SelectedWorkSection({ variant }: { variant: HomeVariant }) {
  const order =
    variant === "academic"
      ? ["truss-solver", "math-solver", "authryai", "the-inquilab", "ezycite"]
      : ["authryai", "the-inquilab", "ezycite", "replyot", "ordify"];
  const picks = order
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project));

  return (
    <Section id="work" title="Selected work" action={{ label: `All ${projects.length} projects`, href: "/projects" }}>
      <ul className="divide-y divide-[var(--border)]">
        {picks.map((project) => (
          <li key={project.id}>
            <Row href={project.link} className="items-center">
              <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-md bg-[var(--surface)] sm:block">
                <Image src={project.image} alt="" fill sizes="96px" className="object-cover" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="flex items-center gap-1.5 font-medium text-[var(--text)]">
                  {project.title}
                  <ArrowUpRight
                    width={14}
                    height={14}
                    className="text-[var(--muted-3)] opacity-0 transition-opacity group-hover:opacity-100"
                  />
                </p>
                <p className="mt-1 line-clamp-2 text-sm leading-6 text-[var(--muted-2)]">{project.description}</p>
              </div>
              <span className="hidden shrink-0 text-xs text-[var(--muted-3)] md:block">{project.categories[0]}</span>
            </Row>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* Experience                                                        */
/* ---------------------------------------------------------------- */

function RoleRows({ items }: { items: readonly (readonly [string, string, string])[] }) {
  return (
    <ul className="divide-y divide-[var(--border)]">
      {items.map(([org, href, meta]) => {
        const { role, period } = splitMeta(meta);
        return (
          <li key={org}>
            <Row href={href} className="flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
              <span className="w-36 shrink-0 font-mono text-xs text-[var(--muted-3)]">{period}</span>
              <span className="min-w-0 flex-1">
                <span className="font-medium text-[var(--text)]">{role}</span>
                <span className="text-[var(--muted-3)]"> at </span>
                <span className="text-[var(--text)] underline decoration-[var(--border-hover)] underline-offset-4 group-hover:decoration-[var(--text)]">
                  {org}
                </span>
              </span>
            </Row>
          </li>
        );
      })}
    </ul>
  );
}

export function TimelineSection({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: readonly (readonly [string, string, string])[];
}) {
  return (
    <Section id={id} title={title}>
      <RoleRows items={items} />
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* Security                                                          */
/* ---------------------------------------------------------------- */

function severityColor(severity: string) {
  if (severity.startsWith("HIGH")) return "text-red-600";
  if (severity.startsWith("LOW")) return "text-sky-600";
  return "text-amber-600";
}

export function SecuritySection({ items }: { items: readonly (typeof featured)[number][] }) {
  const shown = items.slice(0, 6);

  return (
    <Section
      id="security-disclosures"
      title="Security research"
      description="Responsible disclosures in popular WordPress plugins, credited by WPScan, Wordfence, Patchstack and plugin authors."
      action={{ label: `All ${cveCount} advisories`, href: "/security" }}
    >
      <ul className="divide-y divide-[var(--border)]">
        {shown.map((item) => {
          const [id, ...rest] = item.title.split(" — ");
          const name = rest.join(" — ");
          const severity = cveSeverityById.get(id);
          return (
            <li key={item.href}>
              <Row href={item.href} className="flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-4">
                <span className="flex w-full items-center justify-between gap-4 sm:contents">
                  <span className="shrink-0 font-mono text-xs text-[var(--muted-3)] sm:w-36">{name ? id : item.outlet}</span>
                  <span
                    className={`shrink-0 font-mono text-xs sm:order-last ${
                      severity ? severityColor(severity) : "text-[var(--accent-strong)]"
                    }`}
                  >
                    {severity ?? "Credit"}
                  </span>
                </span>
                <span className="min-w-0 flex-1 text-[15px] font-medium text-[var(--text)]">{name || id}</span>
              </Row>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* Publications / press                                              */
/* ---------------------------------------------------------------- */

export function PublicationsSection({
  variant,
  items,
}: {
  variant: HomeVariant;
  items: readonly (typeof publications)[number][];
}) {
  const content = homeVariantContent[variant];

  return (
    <Section id="research" title={content.publications.title} description={content.publications.intro}>
      <ul className="divide-y divide-[var(--border)]">
        {items.map((publication) => (
          <li key={publication.title}>
            <Row href={publication.href} className="flex-col gap-1.5">
              <span className="flex flex-wrap items-center gap-x-2 text-xs text-[var(--muted-3)]">
                <span className="font-mono">{publication.date}</span>
                <span aria-hidden="true">·</span>
                <span>{publication.label}</span>
                {"featured" in publication ? (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[var(--accent-strong)]">{publication.featured}</span>
                  </>
                ) : null}
              </span>
              <span className="font-medium leading-snug text-[var(--text)]">{publication.title}</span>
              <span className="text-sm text-[var(--muted-2)]">{publication.authors}</span>
            </Row>
          </li>
        ))}
      </ul>
    </Section>
  );
}

export function PressSection({ items }: { items: readonly (typeof featured)[number][] }) {
  return (
    <Section id="featured" title="Press">
      <ul className="space-y-10">
        {items.map((item) => (
          <li key={item.href}>
            <a href={item.href} target="_blank" rel="noopener noreferrer" className="group block">
              <blockquote className="text-xl font-medium leading-snug tracking-tight text-[var(--text)] sm:text-2xl">
                “{item.title}”
              </blockquote>
              <p className="mt-3 max-w-2xl text-[15px] leading-7 text-[var(--muted-2)]">{item.description}</p>
              <p className="link-arrow mt-4 !text-sm">
                {item.outlet}, {item.date}
                <ArrowUpRight width={14} height={14} />
              </p>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* Skills                                                            */
/* ---------------------------------------------------------------- */

export function SkillsSection({
  variant,
  items,
}: {
  variant: HomeVariant;
  items: readonly (readonly [string, ...string[]])[];
}) {
  const content = homeVariantContent[variant];

  return (
    <Section id="uses" title={content.skills.title}>
      <dl className="divide-y divide-[var(--border)]">
        {items.map(([heading, ...groupItems]) => (
          <div key={heading} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-4">
            <dt className="w-36 shrink-0 text-sm text-[var(--muted-3)]">{heading}</dt>
            <dd className="text-[15px] leading-7 text-[var(--text)]">{groupItems.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* Recognition                                                       */
/* ---------------------------------------------------------------- */

export function RecognitionSection({
  achievements,
  certifications,
}: {
  achievements: readonly (readonly [string, string, string])[];
  certifications: readonly (readonly [string, string])[];
}) {
  return (
    <Section id="achievements" title="Recognition">
      <ul className="divide-y divide-[var(--border)]">
        {achievements.map(([title, org, year]) => (
          <li key={title} className="flex flex-col gap-1 py-4 sm:flex-row sm:gap-4">
            <span className="w-36 shrink-0 font-mono text-xs text-[var(--muted-3)] sm:pt-1">{year}</span>
            <span className="min-w-0">
              <span className="block text-[15px] font-medium text-[var(--text)]">{title}</span>
              <span className="mt-0.5 block text-sm text-[var(--muted-3)]">{org}</span>
            </span>
          </li>
        ))}
      </ul>

      <h3 id="certifications" className="mt-14 mb-2 text-sm font-medium text-[var(--text)]">
        Certifications
      </h3>
      <ul className="divide-y divide-[var(--border)]">
        {certifications.map(([title, meta]) => (
          <li key={title} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
            <span className="text-[15px] font-medium text-[var(--text)]">{title}</span>
            <span className="text-sm text-[var(--muted-3)] sm:text-right">{meta}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* Community + education                                             */
/* ---------------------------------------------------------------- */

export function CommunitySection({
  volunteers,
  education,
}: {
  volunteers: readonly (readonly [string, string, string])[];
  education: readonly (readonly [string, string])[];
}) {
  return (
    <>
      <Section id="volunteer-experience" title="Community">
        <RoleRows items={volunteers} />
      </Section>

      <Section id="education" title="Education">
        <ul className="divide-y divide-[var(--border)]">
          {education.map(([school, detail]) => (
            <li key={school} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
              <span className="text-[15px] font-medium text-[var(--text)]">{school}</span>
              <span className="text-sm text-[var(--muted-3)] sm:text-right">{detail}</span>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}

/* ---------------------------------------------------------------- */
/* Gallery                                                           */
/* ---------------------------------------------------------------- */

export function GallerySection({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <Section id="gallery" title="Gallery">
      <div className="columns-2 gap-3 sm:columns-3">
        {items.map(([src, alt]) => (
          <div key={src} className="group mb-3 break-inside-avoid overflow-hidden rounded-lg bg-[var(--surface)]">
            <GalleryImage src={src} alt={alt} />
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* Contact                                                           */
/* ---------------------------------------------------------------- */

export function ContactSection({ variant }: { variant: HomeVariant }) {
  const content = homeVariantContent[variant];

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="grid gap-6 border-t border-[var(--border)] py-16 sm:py-24 md:grid-cols-[180px_1fr] md:gap-12"
    >
      <h2 id="contact-title" className="text-sm font-medium text-[var(--text)]">
        Contact
      </h2>
      <div>
        <p className="max-w-2xl text-[28px] font-medium leading-[1.15] tracking-[-0.025em] text-[var(--text)] sm:text-4xl">
          {content.contact.intro}
        </p>
        <a
          href="mailto:hello@shovon.bd"
          className="group mt-8 inline-flex items-center gap-2 text-xl font-medium text-[var(--text)] underline decoration-[var(--accent)] decoration-2 underline-offset-[6px] sm:text-2xl"
        >
          hello@shovon.bd
          <ArrowUpRight
            width={20}
            height={20}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
        <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm">
          {socials.map(([label, href]) => (
            <li key={label}>
              <a
                {...(label === "Resume" ? RESUME_PROPS : { href, target: "_blank", rel: "noopener noreferrer" })}
                className="text-[var(--muted-2)] transition-colors hover:text-[var(--text)]"
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
