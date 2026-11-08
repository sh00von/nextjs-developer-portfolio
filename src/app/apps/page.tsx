import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Navigation } from "@/components/SiteChrome";
import { apps } from "@/data/apps";
import { ArrowUpRightIcon } from "@/components/icons";
import { PageHeader } from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Android Apps: Offline-First, Privacy-Friendly",
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
    canonical: "https://www.shovon.bd/apps",
  },
  openGraph: {
    url: "https://www.shovon.bd/apps",
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

export default async function AppsPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Android Apps by Md Minaruzzaman Shovon",
        description:
          "A collection of Android apps built by Minaruzzaman Shovon — minimalist, offline-first tools published on the Play Store.",
        url: "https://www.shovon.bd/apps",
        author: {
          "@type": "Person",
          name: "Md Minaruzzaman Shovon",
          url: "https://www.shovon.bd/",
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
              url: `https://www.shovon.bd/apps/${app.slug}`,
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
            item: "https://www.shovon.bd/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Android Apps",
            item: "https://www.shovon.bd/apps",
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
      <main id="main-content" className="container-wide flex-grow overflow-x-clip pb-24">
        <PageHeader
          eyebrow="Google Play"
          title="Android Apps"
          description={`${apps.length} minimalist, offline-first tools for Android. No accounts, no tracking, just useful apps.`}
          crumbs={[{ label: "Home", href: "/" }, { label: "Apps" }]}
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <article key={app.slug} className="h-full">
              <Link
                href={`/apps/${app.slug}`}
                className="card group flex h-full flex-col p-5 sm:p-6"
                aria-label={`View ${app.name}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--text)] text-lg font-bold text-[#a3e635]">
                    {app.name.charAt(0)}
                  </span>
                  <span
                    className={`inline-block rounded-md border px-2 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide ${STATUS_STYLES[app.status]}`}
                  >
                    {app.status}
                  </span>
                </div>
                <h2 className="mt-5 text-lg font-semibold tracking-tight text-[var(--text)]">{app.name}</h2>
                <p className="mt-1.5 text-sm leading-6 text-[var(--muted-2)]">{app.tagline}</p>
                <div className="project-tags">
                  {app.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="link-arrow mt-auto pt-6 text-[13px]">
                  {app.category}
                  <span className="ml-auto text-[var(--muted-3)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    <ArrowUpRightIcon />
                  </span>
                </span>
              </Link>
            </article>
          ))}
        </div>
      </main>
      <Footer backHome />
    </div>
  );
}
