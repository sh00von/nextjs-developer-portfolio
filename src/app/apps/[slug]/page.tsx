import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { clampDescription } from "@/lib/seo";
import { Footer, Navigation } from "@/components/SiteChrome";
import { apps } from "@/data/apps";
import { posts } from "@/data/posts";

export function generateStaticParams() {
  return apps.map((app) => ({ slug: app.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = apps.find((a) => a.slug === slug);
  if (!app) return {};

  return {
    title: `${app.name}: ${app.tagline}`.length <= 52 ? `${app.name}: ${app.tagline}` : `${app.name}, Android App`,
    description: clampDescription(`${app.name}: ${app.tagline}. ${app.description}`),
    keywords: [
      app.name,
      "Minaruzzaman Shovon",
      "Android App",
      "Play Store",
      app.category,
      ...app.tags,
    ],
    alternates: { canonical: `https://www.shovon.bd/apps/${slug}` },
    openGraph: {
      url: `https://www.shovon.bd/apps/${slug}`,
      title: `${app.name} | Android App`,
      description: app.tagline,
      images: [
        `/api/og?title=${encodeURIComponent(app.name)}&subtitle=${encodeURIComponent(app.tagline)}&category=${encodeURIComponent("ANDROID APP — " + app.category.toUpperCase())}&badge=${encodeURIComponent(app.status.toUpperCase())}&badgeColor=%23166534&badgeBg=%23f0fdf4`,
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${app.name} | Android App`,
      description: app.tagline,
      images: [
        `/api/og?title=${encodeURIComponent(app.name)}&subtitle=${encodeURIComponent(app.tagline)}&category=${encodeURIComponent("ANDROID APP — " + app.category.toUpperCase())}&badge=${encodeURIComponent(app.status.toUpperCase())}&badgeColor=%23166534&badgeBg=%23f0fdf4`,
      ],
    },
  };
}

function AppActions({ app }: { app: (typeof apps)[number] }) {
  return (
    <>
      {app.playStoreUrl ? (
        <a href={app.playStoreUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3.18 23.77A2 2 0 0 1 2 22V2a2 2 0 0 1 1.18-1.77l11.65 11.65L3.18 23.77ZM20.7 10.57l-2.62-1.5-3.07 3.07 3.07 3.07 2.64-1.5a2 2 0 0 0 0-3.14ZM4.27.5l11.32 11.32L5 17.3 4.27.5Zm0 23 10.59-6.17L5 6.7l-.73 16.8Z" />
          </svg>
          Get it on Google Play
        </a>
      ) : (
        <span className="btn btn-secondary cursor-default text-[var(--muted-3)]">Coming soon to Google Play</span>
      )}
      {app.privacyUrl ? (
        <Link href={app.privacyUrl} className="btn btn-secondary">
          Privacy policy
        </Link>
      ) : null}
    </>
  );
}

const STATUS_DOT: Record<string, string> = {
  Live: "bg-green-500",
  Beta: "bg-amber-400",
  Archived: "bg-neutral-400",
};

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = apps.find((a) => a.slug === slug);
  if (!app) notFound();

  const relatedPosts = posts.filter((p) => p.relatedApp?.href === `/apps/${app.slug}`);
  const otherApps = apps.filter((a) => a.slug !== app.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: app.name,
        operatingSystem: "Android",
        applicationCategory: app.category,
        description: app.description,
        url: `https://www.shovon.bd/apps/${app.slug}`,
        sameAs: app.playStoreUrl || undefined,
        author: {
          "@type": "Person",
          name: "Md Minaruzzaman Shovon",
          url: "https://www.shovon.bd/",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList: app.features.join(", "),
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
            name: "Android Apps",
            item: "https://www.shovon.bd/apps",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: app.name,
            item: `https://www.shovon.bd/apps/${app.slug}`,
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
      <Navigation active="apps" />
      <main id="main-content" className="container-wide flex-1 overflow-x-clip pt-8 pb-16 sm:pt-12">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--muted-3)]">
            <li>
              <Link href="/" className="transition-colors hover:text-[var(--text)]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/apps" className="transition-colors hover:text-[var(--text)]">
                Apps
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-[var(--muted-2)]" aria-current="page">
              {app.name}
            </li>
          </ol>
        </nav>

        <header className="mt-10 flex items-center gap-5">
          <span className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-[var(--text)] text-2xl font-semibold text-[#a3e635] sm:h-20 sm:w-20 sm:text-3xl">
            {app.name.charAt(0)}
          </span>
          <div className="min-w-0">
            <h1 className="text-3xl font-medium tracking-[-0.03em] text-[var(--text)] sm:text-5xl">{app.name}</h1>
            <p className="mt-1.5 flex flex-wrap items-center gap-x-2 text-sm text-[var(--muted-3)]">
              <span className="inline-flex items-center gap-1.5">
                <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[app.status]}`} aria-hidden="true" />
                {app.status}
              </span>
              <span aria-hidden="true">·</span>
              <span>{app.category}</span>
              <span aria-hidden="true">·</span>
              <span>Android</span>
            </p>
          </div>
        </header>

        <div className="lg:grid lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-x-16">
          <div className="min-w-0">
            <p className="mt-8 text-xl leading-snug font-medium tracking-tight text-[var(--text)] sm:text-2xl">
              {app.tagline}
            </p>
            <p className="mt-4 text-base leading-8 text-[var(--muted-2)] sm:text-[17px]">{app.description}</p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row lg:hidden">
              <AppActions app={app} />
            </div>

            <section className="mt-14" aria-labelledby="features-title">
              <h2 id="features-title" className="text-sm font-medium text-[var(--text)]">
                Features
              </h2>
              <ul className="mt-4 grid border-t border-[var(--border)] sm:grid-cols-2 sm:gap-x-8">
                {app.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex gap-3 border-b border-[var(--border)] py-3.5 text-[15px] leading-6 text-[var(--muted)]"
                  >
                    <svg className="mt-1 shrink-0 text-[var(--accent-strong)]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-12 lg:hidden" aria-labelledby="tech-title">
              <h2 id="tech-title" className="text-sm font-medium text-[var(--text)]">
                Built with
              </h2>
              <p className="mt-3 font-mono text-sm text-[var(--muted-2)]">{app.tech.join(" · ")}</p>
            </section>

            {relatedPosts.length > 0 && (
              <section className="mt-12" aria-labelledby="blog-title">
                <h2 id="blog-title" className="text-sm font-medium text-[var(--text)]">
                  From the blog
                </h2>
                <ul className="mt-3 divide-y divide-[var(--border)] border-y border-[var(--border)]">
                  {relatedPosts.map((post) => (
                    <li key={post.slug}>
                      <Link href={`/blog/${post.slug}`} className="group flex items-center justify-between gap-4 py-4">
                        <span className="font-medium text-[var(--text)] group-hover:underline group-hover:decoration-[var(--border-hover)] group-hover:underline-offset-4">
                          {post.title}
                        </span>
                        <span className="text-[var(--muted-3)]" aria-hidden="true">
                          &rarr;
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          <aside aria-label="Get the app" className="hidden lg:block">
            <div className="sticky top-[calc(var(--nav-h)+2rem)] mt-8 flex flex-col gap-3">
              <AppActions app={app} />
              <dl className="mt-5 border-t border-[var(--border)] text-sm">
                {[
                  ["Status", app.status],
                  ["Category", app.category],
                  ["Platform", "Android"],
                  ["Built with", app.tech.join(", ")],
                ].map(([label, value]) => (
                  <div key={label} className="border-b border-[var(--border)] py-2.5">
                    <dt className="text-xs text-[var(--muted-3)]">{label}</dt>
                    <dd className="mt-0.5 text-[var(--text)]">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </aside>
        </div>

        {otherApps.length > 0 && (
          <section className="mt-20 border-t border-[var(--border)] pt-10" aria-labelledby="more-apps-title">
            <div className="flex items-baseline justify-between">
              <h2 id="more-apps-title" className="text-sm font-medium text-[var(--text)]">
                More apps
              </h2>
              <Link href="/apps" className="text-sm text-[var(--muted-3)] hover:text-[var(--text)]">
                All apps &rarr;
              </Link>
            </div>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {otherApps.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/apps/${other.slug}`}
                    className="flex h-full items-center gap-3 rounded-xl border border-[var(--border)] p-3 transition-colors hover:border-[var(--border-hover)]"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-[var(--surface)] font-semibold text-[var(--text)]">
                      {other.name.charAt(0)}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-[var(--text)]">{other.name}</span>
                      <span className="block truncate text-xs text-[var(--muted-3)]">{other.category}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <Footer backHome homePath="/" />
    </div>
  );
}
