import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer, Navigation } from "@/components/SiteChrome";
import { apps } from "@/data/apps";

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
    title: app.name,
    description: app.description,
    keywords: [
      app.name,
      "Minaruzzaman Shovon",
      "Android App",
      "Play Store",
      app.category,
      ...app.tags,
    ],
    alternates: { canonical: `https://shovon.bd/apps/${slug}` },
    openGraph: {
      url: `https://shovon.bd/apps/${slug}`,
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

const STATUS_STYLES: Record<string, string> = {
  Live: "bg-[#ecfccb] text-[#365314] border-[#a3e635]",
  Beta: "bg-[#fef9c3] text-[#713f12] border-[#fde047]",
  Archived: "bg-[#f5f5f5] text-[#737373] border-[#e5e5e5]",
};

export default async function AppDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = apps.find((a) => a.slug === slug);
  if (!app) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: app.name,
        operatingSystem: "Android",
        applicationCategory: app.category,
        description: app.description,
        url: `https://shovon.bd/apps/${app.slug}`,
        sameAs: app.playStoreUrl || undefined,
        author: {
          "@type": "Person",
          name: "Md Minaruzzaman Shovon",
          url: "https://shovon.bd/dev",
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
            item: "https://shovon.bd/dev",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Android Apps",
            item: "https://shovon.bd/apps",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: app.name,
            item: `https://shovon.bd/apps/${app.slug}`,
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
      <main
        id="main-content"
        className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 lg:max-w-[60vw]"
      >
        <Link href="/apps" className="back-link mb-8 inline-flex">
          &larr; All Apps
        </Link>

        <div className="mt-6 flex items-start gap-3">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-semibold tracking-tight text-[#111111]">
                {app.name}
              </h1>
              <span
                className={`inline-block rounded-sm border px-1.5 py-px text-[10px] font-semibold uppercase tracking-wide ${STATUS_STYLES[app.status]}`}
              >
                {app.status}
              </span>
            </div>
            <p className="mt-1 text-sm text-[#737373]">
              {app.category} &middot; Android
            </p>
          </div>
        </div>

        <p className="mt-6 text-[#5c5c5c] leading-relaxed">{app.description}</p>

        <section className="mt-8">
          <h2 className="mb-3 text-base font-semibold text-[#111111]">Features</h2>
          <ul className="space-y-2">
            {app.features.map((feature) => (
              <li key={feature} className="flex items-start gap-2 text-sm text-[#5c5c5c]">
                <span className="mt-1.5 block h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#a3e635]" />
                {feature}
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="mb-3 text-base font-semibold text-[#111111]">Built with</h2>
          <div className="flex flex-wrap gap-2">
            {app.tech.map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-10 flex flex-wrap gap-3 border-t border-[#e5e5e5] pt-8">
          {app.playStoreUrl && (
            <a
              href={app.playStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md bg-[#111111] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#333333]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M3.18 23.77A2 2 0 0 1 2 22V2a2 2 0 0 1 1.18-1.77l11.65 11.65L3.18 23.77ZM20.7 10.57l-2.62-1.5-3.07 3.07 3.07 3.07 2.64-1.5a2 2 0 0 0 0-3.14ZM4.27.5l11.32 11.32L5 17.3 4.27.5Zm0 23 10.59-6.17L5 6.7l-.73 16.8Z" />
              </svg>
              Get on Play Store
            </a>
          )}
          {app.privacyUrl && (
            <Link
              href={app.privacyUrl}
              className="inline-flex items-center gap-1.5 rounded-md border border-[#e5e5e5] px-4 py-2 text-sm font-medium text-[#5c5c5c] transition-colors hover:border-[#d4d4d4] hover:text-[#111111]"
            >
              Privacy Policy
            </Link>
          )}
        </section>
      </main>
      <Footer backHome homePath="/dev" />
    </div>
  );
}
