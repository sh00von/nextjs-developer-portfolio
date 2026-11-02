import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { apps } from "@/data/apps";
import { cveCount, experience as allExperience, featured, publications, socials } from "@/data/home";
import { projects, type Project } from "@/data/projects";
import { homeVariantContent, type HomeVariant } from "@/lib/homeVariants";
import { GalleryImage } from "./GalleryLightbox";
import {
  ArrowRightIcon,
  ArrowUpRight,
  DownloadIcon,
  MailIcon,
  MapPinIcon,
  SocialIcon,
} from "./SocialIcons";

const RESUME_PROPS = {
  href: "/resume.pdf",
  target: "_blank",
  rel: "noopener noreferrer",
  download: "Md_Minaruzzaman_Shovon_Resume.pdf",
} as const;

const isExternal = (href: string) => href.startsWith("http");

const externalProps = (href: string) =>
  isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};

/* ---------------------------------------------------------------- */
/* Shared building blocks                                            */
/* ---------------------------------------------------------------- */

export function Section({
  id,
  eyebrow,
  title,
  description,
  action,
  children,
  className = "",
}: {
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  action?: { label: string; href: string };
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-12 sm:py-16 ${className}`} aria-labelledby={`${id}-title`}>
      <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
          <h2 id={`${id}-title`} className="text-[28px] font-semibold leading-tight tracking-tight text-[var(--text)] sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-[15px] leading-7 text-[var(--muted-2)] sm:text-base">{description}</p>
          ) : null}
        </div>
        {action ? (
          <Link href={action.href} className="link-arrow shrink-0 self-start sm:self-auto">
            {action.label}
            <ArrowRightIcon />
          </Link>
        ) : null}
      </div>
      {children}
    </section>
  );
}

function splitMeta(meta: string) {
  const index = meta.lastIndexOf(", ");
  if (index === -1) return { role: meta, period: "" };
  return { role: meta.slice(0, index), period: meta.slice(index + 2) };
}

/* ---------------------------------------------------------------- */
/* Hero                                                              */
/* ---------------------------------------------------------------- */

export function HeroSection({ variant }: { variant: HomeVariant }) {
  const content = homeVariantContent[variant];
  const current = allExperience[0];
  const currentMeta = splitMeta(current[2]);

  const stats =
    variant === "academic"
      ? [
          { value: String(publications.length), label: "Research papers" },
          { value: "162", label: "Polders mapped" },
          { value: String(cveCount), label: "CVEs disclosed" },
          { value: String(projects.length), label: "Projects shipped" },
        ]
      : [
          { value: String(projects.length), label: "Projects shipped" },
          { value: String(cveCount), label: "CVEs disclosed" },
          { value: String(apps.length), label: "Android apps" },
          { value: String(publications.length), label: "Research papers" },
        ];

  return (
    <section className="relative pt-8 pb-12 sm:pt-16 sm:pb-20">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-[-50vw] -top-24 bottom-0 -z-10" />

      <div className="grid items-center gap-10 lg:grid-cols-[1.35fr_1fr] lg:gap-14">
        <div className="animate-fade-up">
          <div className="mb-6 flex items-center gap-4 lg:hidden">
            <Image
              src="/shovon.jpg"
              alt="Portrait of Md Minaruzzaman Shovon"
              width={160}
              height={160}
              priority
              className="h-20 w-20 rounded-2xl border border-[var(--border)] object-cover shadow-sm"
            />
            <div className="flex flex-col gap-1.5">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-medium text-[var(--muted)]">
                <span className="status-dot" aria-hidden="true" />
                Open to opportunities
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-[var(--muted-3)]">
                <MapPinIcon />
                Chattogram, Bangladesh
              </span>
            </div>
          </div>

          <div className="mb-6 hidden items-center gap-3 lg:flex">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-white px-3 py-1 text-xs font-medium text-[var(--muted)] shadow-[var(--shadow-sm)]">
              <span className="status-dot" aria-hidden="true" />
              Open to opportunities
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs text-[var(--muted-3)]">
              <MapPinIcon />
              Chattogram, Bangladesh
            </span>
          </div>

          <h1 className="text-[40px] font-semibold leading-[1.05] tracking-[-0.035em] text-[var(--text)] sm:text-6xl lg:text-[68px]">
            Md Minaruzzaman
            <br />
            Shovon<span className="text-[#84cc16]">.</span>
          </h1>
          <p className="mt-5 max-w-xl text-xl font-medium leading-snug tracking-tight text-[var(--muted)] sm:text-2xl">
            {content.hero.headline}
          </p>
          <p className="mt-5 max-w-xl text-[15px] leading-7 text-[var(--muted-2)] sm:text-[17px] sm:leading-8">
            {content.hero.intro}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
            <Link href={variant === "academic" ? "#research" : "#work"} className="btn btn-primary col-span-2 sm:col-span-1">
              {variant === "academic" ? "View research" : "View my work"}
              <ArrowRightIcon />
            </Link>
            <a {...RESUME_PROPS} className="btn btn-secondary">
              <DownloadIcon width={16} height={16} />
              Resume
            </a>
            <a href="mailto:hello@shovon.bd" className="btn btn-secondary">
              <MailIcon width={16} height={16} />
              Contact
            </a>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {socials
              .filter(([label]) => label !== "Resume")
              .map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] bg-white text-[var(--muted-2)] transition-all hover:-translate-y-0.5 hover:border-[var(--border-hover)] hover:text-[var(--text)]"
                >
                  <SocialIcon name={label} width={17} height={17} />
                </a>
              ))}
          </div>
        </div>

        <div className="relative hidden lg:block">
          <div className="relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-white p-2 shadow-[var(--shadow-md)]">
            <Image
              src="/shovon.jpg"
              alt="Portrait of Md Minaruzzaman Shovon"
              width={720}
              height={720}
              priority
              sizes="(min-width: 1024px) 420px, 0px"
              className="aspect-square w-full rounded-[22px] object-cover"
            />
          </div>
          <a
            href={current[1]}
            target="_blank"
            rel="noopener noreferrer"
            className="card absolute -bottom-6 -left-8 flex items-center gap-3 !rounded-2xl px-4 py-3"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--text)] font-mono text-xs font-bold text-[#a3e635]">
              {current[0].slice(0, 2).toUpperCase()}
            </span>
            <span className="flex flex-col">
              <span className="text-[11px] font-medium uppercase tracking-wider text-[var(--muted-3)]">Currently</span>
              <span className="text-sm font-semibold text-[var(--text)]">
                {currentMeta.role.replace(/\s*\(.*\)/, "")} @ {current[0]}
              </span>
            </span>
          </a>
          <Link
            href="/security"
            className="card absolute -right-4 top-8 flex items-center gap-2 !rounded-full px-3.5 py-2"
          >
            <span className="h-2 w-2 rounded-full bg-red-500" aria-hidden="true" />
            <span className="text-xs font-semibold text-[var(--text)]">{cveCount} CVEs published</span>
          </Link>
        </div>
      </div>

      <dl className="mt-14 grid grid-cols-2 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:mt-20 sm:grid-cols-4" style={{ gap: 1 }}>
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-1 bg-white px-5 py-5 sm:px-6 sm:py-6">
            <dt className="order-2 text-xs font-medium text-[var(--muted-3)] sm:text-sm">{stat.label}</dt>
            <dd className="order-1 text-3xl font-semibold tracking-tight text-[var(--text)] tabular-nums sm:text-4xl">
              {stat.value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ---------------------------------------------------------------- */
/* Selected work                                                     */
/* ---------------------------------------------------------------- */

function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  const external = isExternal(project.link);
  return (
    <Link
      href={project.link}
      {...externalProps(project.link)}
      className={`card group flex flex-col overflow-hidden ${large ? "md:col-span-2 md:flex-row" : ""}`}
    >
      <div
        className={`relative aspect-[16/10] w-full overflow-hidden border-b border-[var(--border)] bg-[var(--surface)] ${
          large ? "md:aspect-auto md:w-[58%] md:border-r md:border-b-0" : ""
        }`}
      >
        <Image
          src={project.image}
          alt={`Screenshot of ${project.title}`}
          fill
          sizes={large ? "(min-width: 768px) 640px, 100vw" : "(min-width: 768px) 520px, 100vw"}
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
      </div>
      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${large ? "md:justify-center md:p-8" : ""}`}>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {project.categories.map((category) => (
            <span key={category} className="tag">
              {category}
            </span>
          ))}
        </div>
        <h3 className={`font-semibold tracking-tight text-[var(--text)] ${large ? "text-2xl sm:text-3xl" : "text-lg sm:text-xl"}`}>
          {project.title}
        </h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--muted-2)]">{project.description}</p>
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="truncate font-mono text-[11px] text-[var(--muted-3)]">{project.tags.slice(0, 3).join(" · ")}</span>
          <span className="link-arrow shrink-0 text-[13px]">
            {external ? "Visit" : "Explore"}
            {external ? <ArrowUpRight /> : <ArrowRightIcon />}
          </span>
        </div>
      </div>
    </Link>
  );
}

export function SelectedWorkSection({ variant }: { variant: HomeVariant }) {
  const order =
    variant === "academic"
      ? ["bwdb-polders", "truss-solver", "rsray", "authryai", "the-inquilab"]
      : ["rsray", "bwdb-polders", "authryai", "the-inquilab", "ezycite"];
  const picks = order
    .map((id) => projects.find((project) => project.id === id))
    .filter((project): project is Project => Boolean(project))
    .slice(0, 5);
  const [first, ...rest] = picks;

  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Things I've built"
      description="Open-source tools, data platforms and production web apps, from security recon in Rust to coastal GIS datasets."
      action={{ label: `All ${projects.length} projects`, href: "/projects" }}
    >
      <div className="grid gap-5 md:grid-cols-2">
        {first ? <ProjectCard project={first} large /> : null}
        {rest.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* Experience / timelines                                            */
/* ---------------------------------------------------------------- */

export function TimelineSection({
  id,
  eyebrow,
  title,
  items,
}: {
  id: string;
  eyebrow: string;
  title: string;
  items: readonly (readonly [string, string, string])[];
}) {
  return (
    <Section id={id} eyebrow={eyebrow} title={title}>
      <ol className="relative space-y-3 sm:space-y-4">
        {items.map(([org, href, meta], index) => {
          const { role, period } = splitMeta(meta);
          const isCurrent = /present/i.test(period);
          return (
            <li key={org}>
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="card group grid grid-cols-[auto_1fr] items-start gap-4 p-4 sm:grid-cols-[auto_1fr_auto] sm:items-center sm:gap-5 sm:p-5"
              >
                <span
                  className={`grid h-11 w-11 place-items-center rounded-xl font-mono text-sm font-bold ${
                    index === 0 ? "bg-[var(--text)] text-[#a3e635]" : "bg-[var(--surface)] text-[var(--muted-2)]"
                  }`}
                  aria-hidden="true"
                >
                  {org.slice(0, 2).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="flex items-center gap-1.5 text-base font-semibold text-[var(--text)]">
                    {org}
                    <ArrowUpRight className="text-[var(--muted-3)] opacity-0 transition-opacity group-hover:opacity-100" width={14} height={14} />
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--muted-2)]">{role}</p>
                  {period ? (
                    <p className="mt-2 font-mono text-xs text-[var(--muted-3)] sm:hidden">{period}</p>
                  ) : null}
                </div>
                {period ? (
                  <span
                    className={`hidden rounded-full border px-3 py-1 font-mono text-xs sm:inline-flex ${
                      isCurrent
                        ? "border-[var(--accent-border)] bg-[var(--accent-bg)] text-[var(--accent-text)]"
                        : "border-[var(--border)] text-[var(--muted-3)]"
                    }`}
                  >
                    {period}
                  </span>
                ) : null}
              </a>
            </li>
          );
        })}
      </ol>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* Security                                                          */
/* ---------------------------------------------------------------- */

function severityStyle(severity: string) {
  if (severity.startsWith("HIGH")) return "bg-red-50 text-red-700 border-red-200";
  if (severity.startsWith("LOW")) return "bg-sky-50 text-sky-700 border-sky-200";
  return "bg-amber-50 text-amber-800 border-amber-200";
}

export function SecuritySection({
  variant,
  items,
}: {
  variant: HomeVariant;
  items: readonly (typeof featured)[number][];
}) {
  const severityByHref = new Map(
    (homeVariantContent.dev.hero.cveBadges ?? []).map((badge) => [badge.href, badge.severity]),
  );
  const shown = items.slice(0, variant === "academic" ? 4 : 6);

  return (
    <Section
      id="security-disclosures"
      eyebrow="Security research"
      title="Vulnerabilities I've found"
      description="Responsible disclosures in popular WordPress plugins, credited by WPScan, Wordfence, Patchstack and plugin authors."
      action={{ label: `All ${cveCount} advisories`, href: "/security" }}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item, index) => {
          const [id, ...rest] = item.title.split(" — ");
          const name = rest.join(" — ");
          const severity = severityByHref.get(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              {...externalProps(item.href)}
              className={`card group flex-col p-5 ${index >= 3 ? "hidden sm:flex" : "flex"}`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-[13px] font-semibold text-[var(--text)]">{name ? id : item.outlet}</span>
                {severity ? (
                  <span className={`rounded-md border px-2 py-0.5 font-mono text-[10.5px] font-semibold ${severityStyle(severity)}`}>
                    {severity}
                  </span>
                ) : (
                  <span className="rounded-md border border-[var(--accent-border)] bg-[var(--accent-bg)] px-2 py-0.5 font-mono text-[10.5px] font-semibold text-[var(--accent-text)]">
                    CREDIT
                  </span>
                )}
              </div>
              <p className="mt-3 text-[15px] font-semibold leading-snug text-[var(--text)]">{name || id}</p>
              <div className="mt-auto flex items-center justify-between pt-5 text-xs text-[var(--muted-3)]">
                <span>{item.outlet}</span>
                <span className="font-mono">{item.date}</span>
              </div>
            </Link>
          );
        })}
      </div>
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
    <Section id="research" eyebrow="Research" title={content.publications.title} description={content.publications.intro}>
      <div className="space-y-4">
        {items.map((publication) => (
          <a
            key={publication.title}
            href={publication.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${publication.title} (opens in new tab)`}
            className="card group block p-5 sm:p-6"
          >
            <div className="flex flex-wrap items-center gap-2">
              <span className="tag">{publication.label}</span>
              {"featured" in publication ? (
                <span className="badge-featured inline-flex items-center rounded-md border px-2 py-0.5 text-[10.5px] font-semibold">
                  {publication.featured}
                </span>
              ) : null}
              <span className="ml-auto font-mono text-xs text-[var(--muted-3)]">{publication.date}</span>
            </div>
            <h3 className="mt-3 text-base font-semibold leading-snug text-[var(--text)] sm:text-lg">{publication.title}</h3>
            <p className="mt-2 text-sm text-[var(--muted-2)]">{publication.authors}</p>
            <span className="link-arrow mt-4 text-[13px]">
              Read paper
              <ArrowUpRight />
            </span>
          </a>
        ))}
      </div>
    </Section>
  );
}

export function PressSection({ items }: { items: readonly (typeof featured)[number][] }) {
  return (
    <Section id="featured" eyebrow="Press" title="Featured in">
      <div className="space-y-4">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="card group grid gap-5 p-5 sm:grid-cols-[auto_1fr] sm:p-7"
          >
            <div className="flex items-center gap-3 sm:flex-col sm:items-start">
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-[var(--text)] font-serif text-xl font-bold text-white">
                {item.outlet.replace(/^The /, "").charAt(0)}
              </span>
              <span className="text-sm font-semibold text-[var(--text)] sm:hidden">{item.outlet}</span>
            </div>
            <div>
              <p className="hidden text-xs font-medium uppercase tracking-wider text-[var(--muted-3)] sm:block">
                {item.outlet} · {item.section} · {item.date}
              </p>
              <h3 className="mt-1 text-lg font-semibold leading-snug text-[var(--text)] sm:text-xl">“{item.title}”</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--muted-2)]">{item.description}</p>
              <span className="link-arrow mt-4 text-[13px]">
                Read the article
                <ArrowUpRight />
              </span>
            </div>
          </a>
        ))}
      </div>
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
    <Section id="uses" eyebrow="Toolkit" title={content.skills.title} description={content.skills.intro}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map(([heading, ...groupItems]) => (
          <div key={heading} className="card p-5">
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--muted-3)]">{heading}</h3>
            <ul className="mt-4 flex flex-wrap gap-2">
              {groupItems.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-1.5 text-sm font-medium text-[var(--muted)]"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* Recognition (achievements + certifications)                      */
/* ---------------------------------------------------------------- */

export function RecognitionSection({
  achievements,
  certifications,
}: {
  achievements: readonly (readonly [string, string, string])[];
  certifications: readonly (readonly [string, string])[];
}) {
  return (
    <Section id="achievements" eyebrow="Recognition" title="Awards & certifications">
      <div className="grid gap-5 lg:grid-cols-[1.4fr_1fr]">
        <div className="card p-2 sm:p-3">
          <p className="px-3 pt-3 pb-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--muted-3)]">
            Achievements
          </p>
          <ul className="divide-y divide-[var(--border-soft)]">
            {achievements.map(([title, org, year]) => (
              <li key={title} className="flex items-start gap-4 px-3 py-4">
                <span className="mt-0.5 shrink-0 rounded-md bg-[var(--surface)] px-2 py-1 font-mono text-[11px] font-semibold text-[var(--muted-2)]">
                  {year}
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold leading-snug text-[var(--text)]">{title}</p>
                  <p className="mt-1 text-[13px] leading-5 text-[var(--muted-3)]">{org}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div id="certifications" className="card h-fit p-2 sm:p-3">
          <p className="px-3 pt-3 pb-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--muted-3)]">
            Certifications
          </p>
          <ul className="divide-y divide-[var(--border-soft)]">
            {certifications.map(([title, meta]) => (
              <li key={title} className="flex items-start gap-3 px-3 py-4">
                <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[var(--accent-bg)] text-[var(--accent-text)]" aria-hidden="true">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 6 9 17l-5-5" />
                  </svg>
                </span>
                <div className="min-w-0">
                  <p className="text-[15px] font-semibold leading-snug text-[var(--text)]">{title}</p>
                  <p className="mt-1 text-[13px] text-[var(--muted-3)]">{meta}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
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
    <Section id="volunteer-experience" eyebrow="Beyond work" title="Community & education">
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="card p-2 sm:p-3">
          <p className="px-3 pt-3 pb-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--muted-3)]">
            Leadership & volunteering
          </p>
          <ul className="divide-y divide-[var(--border-soft)]">
            {volunteers.map(([org, href, meta]) => {
              const { role, period } = splitMeta(meta);
              return (
                <li key={org}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start justify-between gap-4 rounded-xl px-3 py-4 transition-colors hover:bg-[var(--surface)]"
                  >
                    <div className="min-w-0">
                      <p className="text-[15px] font-semibold text-[var(--text)]">{org}</p>
                      <p className="mt-0.5 text-[13px] text-[var(--muted-2)]">{role}</p>
                    </div>
                    <span className="shrink-0 pt-0.5 font-mono text-xs text-[var(--muted-3)]">{period}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <div id="education" className="card h-fit p-2 sm:p-3">
          <p className="px-3 pt-3 pb-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--muted-3)]">
            Education
          </p>
          <ol className="relative mx-3 my-3 border-l border-[var(--border)]">
            {education.map(([school, detail], index) => (
              <li key={school} className="relative pb-6 pl-6 last:pb-2">
                <span
                  className={`absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full ring-4 ring-white ${
                    index === 0 ? "bg-[#84cc16]" : "bg-[var(--border-hover)]"
                  }`}
                  aria-hidden="true"
                />
                <p className="text-[15px] font-semibold leading-snug text-[var(--text)]">{school}</p>
                <p className="mt-1 text-[13px] text-[var(--muted-2)]">{detail}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </Section>
  );
}

/* ---------------------------------------------------------------- */
/* Gallery                                                           */
/* ---------------------------------------------------------------- */

export function GallerySection({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <Section
      id="gallery"
      eyebrow="Gallery"
      title="Snapshots"
      description="A visual journey through engineering, development and environmental work."
    >
      <div className="columns-2 gap-3 sm:columns-3 sm:gap-5">
        {items.map(([src, alt]) => (
          <div
            key={src}
            className="spotlight-card group mb-3 break-inside-avoid overflow-hidden rounded-2xl sm:mb-5"
          >
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
    <section id="contact" className="py-14 sm:py-20" aria-labelledby="contact-title">
      <div className="relative overflow-hidden rounded-[28px] bg-[#0c0c0c] px-6 py-12 text-white sm:px-12 sm:py-16">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 -right-24 h-80 w-80 rounded-full bg-[#84cc16]/25 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-2xl">
          <p className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-[#a3e635]" />
            Get in touch
          </p>
          <h2 id="contact-title" className="mt-4 text-3xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Let&apos;s build something <span className="text-[#a3e635]">great</span> together.
          </h2>
          <p className="mt-4 text-[15px] leading-7 text-white/70 sm:text-base">{content.contact.intro}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="mailto:hello@shovon.bd" className="btn btn-accent">
              <MailIcon width={16} height={16} />
              hello@shovon.bd
            </a>
            <a {...RESUME_PROPS} className="btn border border-white/20 text-white hover:bg-white/10">
              <DownloadIcon width={16} height={16} />
              Download resume
            </a>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 border-t border-white/10 pt-6">
            {socials
              .filter(([label]) => label !== "Resume")
              .map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-white"
                >
                  <SocialIcon name={label} width={15} height={15} />
                  {label}
                </a>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
