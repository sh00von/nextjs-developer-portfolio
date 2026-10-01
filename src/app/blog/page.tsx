import type { Metadata } from "next";
import Link from "next/link";
import { Footer, Navigation } from "@/components/SiteChrome";
import { AUTHOR, SITE_URL, postImage, postUrl, sortedPosts } from "@/data/posts";
import { ArrowUpRightIcon } from "@/components/icons";

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
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/dev` },
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
      <main
        id="main-content"
        className="mx-auto w-full max-w-2xl flex-grow px-4 pb-24 lg:max-w-[60vw]"
      >
        <div className="mb-6 pt-6">
          <h1 className="text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl">Blog</h1>
          <p className="mt-1 text-sm text-[#737373]">
            {sortedPosts.length} {sortedPosts.length === 1 ? "post" : "posts"} &middot; machine
            learning, maps, and apps &middot;{" "}
            <a href="/blog/rss.xml" className="underline underline-offset-4 hover:text-[#111111]">
              RSS
            </a>
          </p>
        </div>

        <div>
          {sortedPosts.map((post, i) => (
            <article key={post.slug}>
              <Link href={`/blog/${post.slug}`} className="project-row" aria-label={post.title}>
                <span className="project-num" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 className="project-title">{post.title}</h2>
                  <p className="project-desc">{post.description}</p>
                  <div className="project-tags">
                    <span className="tag">
                      <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                    </span>
                    {post.tags.map((tag) => (
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
      <Footer backHome homePath="/dev" />
    </div>
  );
}
