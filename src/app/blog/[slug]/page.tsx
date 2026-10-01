import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Footer, Navigation } from "@/components/SiteChrome";
import { posts } from "@/data/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

function ogImage(title: string, subtitle: string) {
  return `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}&category=${encodeURIComponent("BLOG")}&badge=${encodeURIComponent("ARTICLE")}&badgeColor=%23166534&badgeBg=%23f0fdf4`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};

  const url = `https://shovon.bd/blog/${slug}`;
  const image = ogImage(post.title, post.description);

  return {
    title: post.title,
    description: post.description,
    keywords: [...post.keywords, "Minaruzzaman Shovon"],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: "Shovon Portfolio",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: ["Md Minaruzzaman Shovon"],
      tags: post.tags,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@sh00von",
      title: post.title,
      description: post.description,
      images: [image],
    },
  };
}

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2 className="mt-12 mb-4 border-b border-[#e5e5e5] pb-2 text-lg font-semibold tracking-tight text-[#111111]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mt-8 mb-3 text-base font-semibold text-[#111111]">{children}</h3>
  ),
  p: ({ children }) => <p className="my-4 leading-7 text-[#5c5c5c]">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-[#111111]">{children}</strong>,
  a: ({ href, children }) => {
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        className="font-medium text-[#111111] underline decoration-[#a3e635] decoration-2 underline-offset-4 transition-colors hover:text-[#365314]"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="my-4 list-disc space-y-2 pl-5 text-[#5c5c5c] marker:text-[#a3e635]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal space-y-2 pl-5 text-[#5c5c5c] marker:text-[#737373]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-4 border-[#a3e635] bg-[#f7fee7] px-5 py-1 text-[#1a2e05]">
      {children}
    </blockquote>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-md border border-[#e5e5e5]">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-[#fafafa]">{children}</thead>,
  th: ({ children }) => (
    <th className="border-b border-[#e5e5e5] px-4 py-2.5 font-semibold text-[#111111]">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-[#f0f0f0] px-4 py-2.5 text-[#5c5c5c]">{children}</td>
  ),
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const url = `https://shovon.bd/blog/${post.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        headline: post.title,
        description: post.description,
        url,
        mainEntityOfPage: url,
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        keywords: post.keywords.join(", "),
        author: {
          "@type": "Person",
          name: "Md Minaruzzaman Shovon",
          url: "https://shovon.bd/dev",
        },
        publisher: {
          "@type": "Person",
          name: "Md Minaruzzaman Shovon",
          url: "https://shovon.bd",
        },
        ...(post.relatedApp
          ? {
              about: {
                "@type": "SoftwareApplication",
                name: post.relatedApp.name,
                operatingSystem: "Android",
                applicationCategory: "EducationalApplication",
                url: post.relatedApp.playStoreUrl,
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://shovon.bd/dev" },
          { "@type": "ListItem", position: 2, name: "Blog", item: "https://shovon.bd/blog" },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
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
      <Navigation />
      <main
        id="main-content"
        className="mx-auto w-full max-w-2xl flex-1 px-4 py-12"
      >
        <Link href="/blog" className="back-link mb-8 inline-flex">
          &larr; All Posts
        </Link>

        <article className="mt-6">
          <header>
            <div className="project-tags" style={{ marginTop: 0 }}>
              {post.tags.map((tag) => (
                <span key={tag} className="tag">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[#111111] sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-3 text-sm text-[#737373]">
              Md Minaruzzaman Shovon &middot;{" "}
              <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>{" "}
              &middot; {post.readingMinutes} min read
            </p>
          </header>

          <div className="mt-8 text-[15px]">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {post.body}
            </ReactMarkdown>
          </div>
        </article>

        {post.relatedApp && (
          <aside className="mt-12 rounded-lg border border-[#e5e5e5] p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#737373]">
              Featured app
            </p>
            <p className="mt-2 text-lg font-semibold text-[#111111]">{post.relatedApp.name}</p>
            <p className="mt-1 text-sm leading-6 text-[#5c5c5c]">
              Monthly class targets, one-tap attendance, month-end history, and cloud sync for
              home tutors and private teachers.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a
                href={post.relatedApp.playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-md bg-[#111111] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#333333]"
              >
                Get it on Google Play
              </a>
              <Link
                href={post.relatedApp.href}
                className="inline-flex items-center gap-1.5 rounded-md border border-[#e5e5e5] px-4 py-2 text-sm font-medium text-[#5c5c5c] transition-colors hover:border-[#d4d4d4] hover:text-[#111111]"
              >
                App details
              </Link>
            </div>
          </aside>
        )}
      </main>
      <Footer backHome homePath="/dev" />
    </div>
  );
}
