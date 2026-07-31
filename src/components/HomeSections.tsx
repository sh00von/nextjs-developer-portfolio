import Link from "next/link";
import {
  featured,
  publications,
  socials,
} from "@/data/home";
import { homeVariantContent, type HomeVariant } from "@/lib/homeVariants";
import { GalleryImage } from "./GalleryLightbox";

function SectionHeader({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="mb-8 border-b border-[#e5e5e5] pb-5">
      <h2 className="text-xl font-semibold tracking-tight text-[#111111]">{title}</h2>
      {description ? <p className="mt-4 max-w-3xl leading-relaxed text-[#5c5c5c]">{description}</p> : null}
    </div>
  );
}

function DotLinks({ links }: { links: readonly (readonly [string, string])[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#737373]">
      {links.map(([label, href], index) => (
        <span key={label} className="contents">
          {index > 0 ? <span aria-hidden="true">/</span> : null}
          <Link
            href={href}
            target={href.startsWith("http") || href.endsWith(".pdf") ? "_blank" : undefined}
            rel={href.startsWith("http") || href.endsWith(".pdf") ? "noopener noreferrer" : undefined}
            download={href.endsWith(".pdf") ? "Md_Minaruzzaman_Shovon_Resume.pdf" : undefined}
            className={
              label === "hello@shovon.bd"
                ? "font-medium text-[#111111] hover:underline"
                : label === "Resume"
                  ? "inline-flex items-center gap-1 font-semibold text-[#111111] hover:underline"
                  : "transition-colors hover:text-[#111111]"
            }
          >
            {label === "Resume" ? (
              <>
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Resume (PDF)</span>
              </>
            ) : (
              label
            )}
          </Link>
        </span>
      ))}
    </div>
  );
}

function LineItem({
  title,
  meta,
  href,
}: {
  title: string;
  meta: string;
  href?: string;
}) {
  const content = href ? (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-medium text-[#111111] underline-offset-4 hover:underline decoration-[#d4d4d4]"
    >
      {title}
    </Link>
  ) : (
    <span className="font-medium text-[#111111]">{title}</span>
  );

  return (
    <div className="group flex flex-col justify-between sm:flex-row sm:items-baseline">
      {content}
      <div className="mx-4 hidden flex-grow border-b border-[#e5e5e5] transition-colors group-hover:border-[#d4d4d4] sm:block" />
      <span className="text-sm tabular-nums text-[#737373]">{meta}</span>
    </div>
  );
}

export function HeroSection({ variant }: { variant: HomeVariant; currentPath?: never }) {
  const content = homeVariantContent[variant];

  return (
    <section className="mt-14 mb-20">
      <div className="max-w-4xl">
        <h1 className="mb-2 max-w-4xl text-4xl font-bold tracking-tighter text-[#111111] sm:text-5xl lg:text-[3.7rem]">
          Md Minaruzzaman Shovon
        </h1>
        <p className="mb-6 max-w-4xl text-xl font-semibold tracking-tight text-[#3d3d3d] sm:text-2xl">
          {content.hero.headline}
        </p>
        <p className="mb-5 max-w-3xl text-base leading-8 text-[#3d3d3d] sm:text-lg">{content.hero.intro}</p>
        <p className="mb-5 max-w-3xl text-base leading-8 text-[#5c5c5c] sm:text-lg">{content.hero.support}</p>
        {content.hero.cveBadges && (
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#737373]">Security research:</span>
            {content.hero.cveBadges.map((cve) => (
              <Link
                key={cve.label}
                href={cve.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e5e5] bg-[#f5f5f5] px-3 py-1 text-xs font-medium text-[#111111] transition-colors hover:border-[#d4d4d4] hover:bg-white"
              >
                <span className="font-mono">{cve.label}</span>
                <span
                  className="rounded px-1 py-0.5 text-[10px] font-semibold leading-none"
                  style={
                    cve.severity.startsWith("HIGH")
                      ? { background: "#fef2f2", color: "#991b1b" }
                      : { background: "#fffbeb", color: "#92400e" }
                  }
                >
                  {cve.severity}
                </span>
              </Link>
            ))}
          </div>
        )}
        <div className="mb-8 flex flex-wrap gap-2 text-xs text-[#5c5c5c]">
          {content.hero.pills.map((pill) => (
            <span key={pill} className="rounded-full border border-[#e5e5e5] bg-[#f5f5f5] px-3 py-1">
              {pill}
            </span>
          ))}
        </div>
        <div className="rounded-2xl border border-[#e5e5e5] bg-[#f5f5f5] p-5 sm:p-6">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <p className="mb-1 text-sm font-medium text-[#111111]">{content.hero.summaryEyebrow}</p>
              <p className="max-w-xl text-sm leading-7 text-[#5c5c5c]">{content.hero.summaryText}</p>
            </div>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Md_Minaruzzaman_Shovon_Resume.pdf"
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#111111] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#333333] hover:shadow-md active:scale-95"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Download Resume (PDF)</span>
            </a>
          </div>
          <div className="mt-4 pt-4 border-t border-[#e5e5e5]">
            <DotLinks links={socials} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function SimpleListSection({
  id,
  title,
  items,
}: {
  id: string;
  title: string;
  items: readonly (readonly [string, string] | readonly [string, string, string])[];
}) {
  return (
    <section id={id} className="mb-24 pt-6">
      <SectionHeader title={title} />
      <div className="flex flex-col space-y-2">
        {items.map((item) =>
          item.length === 3 ? (
            <LineItem key={item[0]} title={item[0]} href={item[1]} meta={item[2]} />
          ) : (
            <LineItem key={item[0]} title={item[0]} meta={item[1]} />
          ),
        )}
      </div>
    </section>
  );
}

export function PublicationsSection({
  variant,
  items,
}: {
  variant: HomeVariant;
  items: readonly (typeof publications)[number][];
}) {
  const content = homeVariantContent[variant];

  return (
    <section id="research" className="mb-24 pt-6">
      <SectionHeader title={content.publications.title} description={content.publications.intro} />
      <div className="flex flex-col space-y-8">
        {items.map((publication) => (
          <Link
            key={publication.title}
            href={publication.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${publication.title} (opens in new tab)`}
            className="group block no-underline"
          >
            <div className="mb-2 flex flex-col justify-between sm:flex-row sm:items-start">
              <h3 className="max-w-lg font-medium leading-snug text-[#111111] underline-offset-4 group-hover:underline decoration-[#d4d4d4]">
                {publication.title}
              </h3>
              <span className="mt-1 flex-shrink-0 text-sm tabular-nums text-[#737373] sm:mt-0 sm:ml-4">
                {publication.date}
              </span>
            </div>
            <p className="mb-2 text-sm text-[#5c5c5c]">{publication.authors}</p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded border border-[#e5e5e5] bg-[#f5f5f5] px-2 py-0.5 text-xs font-medium text-[#5c5c5c]">
                {publication.label}
              </span>
              {"featured" in publication ? (
                <span className="badge-featured inline-flex items-center rounded border px-2 py-0.5 text-xs font-medium">
                  {publication.featured}
                </span>
              ) : null}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function FeaturedSection({
  id = "featured",
  title = "Featured In",
  description = "Press coverage and external mentions of work I've contributed to.",
  items,
}: {
  id?: string;
  title?: string;
  description?: string;
  items: readonly (typeof featured)[number][];
}) {
  return (
    <section id={id} className="mb-24 pt-6">
      <SectionHeader title={title} description={description} />
      <div className="flex flex-col space-y-8">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
            aria-label={`${item.title} — ${item.outlet}`}
            className="group block no-underline"
          >
            <div className="mb-2 flex flex-col justify-between sm:flex-row sm:items-start">
              <h3 className="max-w-lg font-medium leading-snug text-[#111111] underline-offset-4 group-hover:underline decoration-[#d4d4d4]">
                {item.title}
              </h3>
              <span className="mt-1 flex-shrink-0 text-sm tabular-nums text-[#737373] sm:mt-0 sm:ml-4">
                {item.date}
              </span>
            </div>
            <p className="mb-2 text-sm text-[#5c5c5c]">{item.description}</p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center rounded border border-[#e5e5e5] bg-[#f5f5f5] px-2 py-0.5 text-xs font-medium text-[#5c5c5c]">
                {item.outlet}
              </span>
              <span className="inline-flex items-center rounded border border-[#e5e5e5] bg-[#f5f5f5] px-2 py-0.5 text-xs font-medium text-[#5c5c5c]">
                {item.section}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export function AchievementsSection({ items }: { items: readonly (readonly [string, string, string])[] }) {
  return (
    <section id="achievements" className="mb-24 pt-6">
      <SectionHeader title="Achievements" />
      <div className="flex flex-col space-y-4">
        {items.map(([title, org, year]) => (
          <div key={title} className="group flex flex-col justify-between sm:flex-row sm:items-baseline">
            <div>
              <span className="font-medium text-[#111111]">{title}</span>
              <p className="mt-0.5 text-sm text-[#5c5c5c]">{org}</p>
            </div>
            <div className="mx-4 hidden flex-grow border-b border-[#e5e5e5] transition-colors group-hover:border-[#d4d4d4] sm:block" />
            <span className="flex-shrink-0 text-sm tabular-nums text-[#737373]">{year}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export function GallerySection({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <section id="gallery" className="mb-24 pt-6">
      <SectionHeader
        title="Gallery"
        description="A visual journey through my interests in engineering, development, and the environment."
      />
      <div className="columns-2 gap-4 sm:columns-3 sm:gap-6">
        {items.map(([src, alt]) => (
          <div
            key={src}
            className="spotlight-card group mb-4 break-inside-avoid overflow-hidden rounded-xl border border-[#e5e5e5] sm:mb-6"
          >
            <GalleryImage src={src} alt={alt} />
          </div>
        ))}
      </div>
    </section>
  );
}

export function SkillsSection({
  variant,
  items,
}: {
  variant: HomeVariant;
  items: readonly (readonly [string, ...string[]])[];
}) {
  const content = homeVariantContent[variant];

  return (
    <section id="uses" className="mb-24 pt-6">
      <SectionHeader title={content.skills.title} description={content.skills.intro} />
      {variant === "academic" ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {items.map(([heading, ...groupItems]) => (
            <section key={heading} className="rounded-2xl border border-[#e5e5e5] bg-[#f5f5f5] p-5">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.12em] text-[#111111]">{heading}</h3>
              <div className="flex flex-wrap gap-2">
                {groupItems.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-[#e5e5e5] bg-white px-3 py-1.5 text-sm leading-none text-[#5c5c5c]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 text-sm text-[#5c5c5c] sm:grid-cols-4">
          {items.map(([heading, ...groupItems]) => (
            <div key={heading}>
              <p className="mb-2 font-medium text-[#111111]">{heading}</p>
              <ul className="space-y-2">
                {groupItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function ContactSection({ variant }: { variant: HomeVariant }) {
  const content = homeVariantContent[variant];

  return (
    <section id="contact" className="mb-24 pt-6">
      <SectionHeader title="Connect" description={content.contact.intro} />
      <DotLinks links={[["hello@shovon.bd", "mailto:hello@shovon.bd"], ...socials]} />
    </section>
  );
}
