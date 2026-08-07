import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Navigation } from "@/components/SiteChrome";
import { resolveFromVariant, resolveHomePath } from "@/lib/homeVariants";
import { apps } from "@/data/apps";
import { ArrowUpRightIcon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Android Apps",
  description:
    "Android apps built by Minaruzzaman Shovon — including Attendly Tutor, Mono Alarm, NU Assistant BD, and Chalk. Minimalist, offline-first tools for everyday use.",
  keywords: [
    "Minaruzzaman Shovon",
    "Android Apps",
    "Attendly Tutor",
    "Mono Alarm",
    "NU Assistant BD",
    "Chalk",
    "Play Store",
    "Kotlin",
  ],
  alternates: {
    canonical: "https://shovon.bd/apps",
  },
  openGraph: {
    url: "https://shovon.bd/apps",
    title: "Android Apps | Minaruzzaman Shovon",
    description:
      "A collection of Android apps built by Minaruzzaman Shovon — minimalist, offline-first tools published on the Play Store.",
    images: [
      "/api/og?title=Android%20Apps%20by%20Minaruzzaman%20Shovon&subtitle=Minimalist%2C%20offline-first%20Android%20tools%20published%20on%20the%20Google%20Play%20Store&category=ANDROID%20APPS&badge=PLAY%20STORE&badgeColor=%23166534&badgeBg=%23f0fdf4",
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Android Apps | Minaruzzaman Shovon",
    description:
      "A collection of Android apps built by Minaruzzaman Shovon — minimalist, offline-first tools published on the Play Store.",
    images: [
      "/api/og?title=Android%20Apps%20by%20Minaruzzaman%20Shovon&subtitle=Minimalist%2C%20offline-first%20Android%20tools%20published%20on%20the%20Google%20Play%20Store&category=ANDROID%20APPS&badge=PLAY%20STORE&badgeColor=%23166534&badgeBg=%23f0fdf4",
    ],
  },
};

const STATUS_STYLES: Record<string, string> = {
  Live: "bg-[#ecfccb] text-[#365314] border-[#a3e635]",
  Beta: "bg-[#fef9c3] text-[#713f12] border-[#fde047]",
  Archived: "bg-[#f5f5f5] text-[#737373] border-[#e5e5e5]",
};

export default async function AppsPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const homePath = resolveHomePath(from);
  const fromVariant = resolveFromVariant(homePath);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Android Apps by Md Minaruzzaman Shovon",
        description:
          "A collection of Android apps built by Minaruzzaman Shovon — minimalist, offline-first tools published on the Play Store.",
        url: "https://shovon.bd/apps",
        author: {
          "@type": "Person",
          name: "Md Minaruzzaman Shovon",
          url: "https://shovon.bd/dev",
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: apps.map((app, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "SoftwareApplication",
              name: app.name,
              operatingSystem: "Android",
              applicationCategory: app.category,
              description: app.description,
              url: `https://shovon.bd/apps/${app.slug}`,
              sameAs: app.playStoreUrl || undefined,
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
            name: "Android Apps",
            item: "https://shovon.bd/apps",
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
      <Navigation active="apps" homePath={homePath} fromVariant={fromVariant} />
      <main
        id="main-content"
        className="mx-auto w-full max-w-2xl flex-grow px-4 pb-24 lg:max-w-[60vw]"
      >
        <div className="mb-6 pt-6">
          <h1 className="text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl">
            Android Apps
          </h1>
          <p className="mt-1 text-sm text-[#737373]">
            {apps.length} minimalist, offline-first tools for Android &middot; Google Play Store
          </p>
        </div>

        <div>
          {apps.map((app) => (
            <article key={app.slug}>
              <Link
                href={`/apps/${app.slug}`}
                className="project-row"
                aria-label={`View ${app.name}`}
              >
                <span className="project-num" aria-hidden="true">
                  {app.num}
                </span>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="project-title" style={{ marginBottom: 0 }}>
                      {app.name}
                    </h2>
                    <span
                      className={`inline-block rounded-sm border px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide ${STATUS_STYLES[app.status]}`}
                    >
                      {app.status}
                    </span>
                  </div>
                  <p className="project-desc">{app.tagline}</p>
                  <div className="project-tags">
                    {app.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <ArrowUpRightIcon />
              </Link>
            </article>
          ))}
        </div>
      </main>
      <Footer backHome homePath={homePath} />
    </div>
  );
}
