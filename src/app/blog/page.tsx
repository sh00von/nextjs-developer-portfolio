import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Navigation } from "@/components/SiteChrome";
import { AUTHOR, SITE_URL, postImage, postUrl, sortedPosts } from "@/data/posts";
import { ArrowUpRightIcon } from "@/components/icons";
import { PageHeader } from "@/components/PageHeader";

const DESCRIPTION =
  "Articles by Md Minaruzzaman Shovon on machine learning, GIS and web mapping, and the Android apps he builds, with code, benchmarks, and lessons learned.";

const OG_IMAGE = `/api/og?title=${encodeURIComponent("Blog")}&subtitle=${encodeURIComponent(DESCRIPTION)}&category=BLOG&badge=ARTICLES&badgeColor=%23166534&badgeBg=%23f0fdf4`;

export const metadata: Metadata = {
  title: "Blog",
  description: DESCRIPTION,
  alternates: {
    canonical: `${SITE_URL}/blog`,
    types: { "application/rss+xml": `${SITE_URL}/blog/rss.xml` },
  },
  openGraph: {
    url: `${SITE_URL}/blog`,
    title: "Blog | Minaruzzaman Shovon",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@sh00von",
    title: "Blog | Minaruzzaman Shovon",
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default function BlogIndexPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": `${SITE_URL}/blog#blog`,
        name: "Shovon's Blog",
        description: DESCRIPTION,
        url: `${SITE_URL}/blog`,
        inLanguage: "en",
        author: AUTHOR,
        publisher: AUTHOR,
        blogPost: sortedPosts.map((post) => ({
          "@type": "BlogPosting",
          "@id": `${postUrl(post)}#article`,
          headline: post.title,
          description: post.description,
          url: postUrl(post),
          image: postImage(post),
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          author: { "@type": "Person", name: AUTHOR.name, url: AUTHOR.url },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
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
      <Navigation active="blog" />
      <main id="main-content" className="container-wide flex-grow overflow-x-clip pb-24">
        <PageHeader
          eyebrow="Writing"
          title="Blog"
          description={
            <>
              Notes on machine learning, maps and the apps I build, with code, benchmarks and lessons learned.{" "}
              <a href="/blog/rss.xml" className="font-medium text-[var(--text)] underline decoration-[var(--border-hover)] underline-offset-4 hover:decoration-[var(--text)]">
                Subscribe via RSS
              </a>
            </>
          }
          crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]}
        />

        <div className="grid gap-4">
          {sortedPosts.map((post) => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="card group grid gap-3 p-5 sm:grid-cols-[140px_1fr_auto] sm:gap-8 sm:p-7" aria-label={post.title}>
                <time dateTime={post.datePublished} className="font-mono text-xs text-[var(--muted-3)] sm:pt-1.5">
                  {formatDate(post.datePublished)}
                </time>
                <div className="min-w-0">
                  <h2 className="text-lg font-semibold leading-snug tracking-tight text-[var(--text)] sm:text-xl">{post.title}</h2>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-[var(--muted-2)]">{post.description}</p>
                  <div className="project-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="hidden text-[var(--muted-3)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[var(--text)] sm:block">
                  <ArrowUpRightIcon />
                </span>
              </Link>
            </article>
          ))}
        </div>
      </main>
      <Footer backHome homePath="/" />
    </div>
  );
}
