import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { Footer, Navigation } from "@/components/SiteChrome";
import {
  AUTHOR,
  SITE_URL,
  getHeadings,
  getPost,
  getPostBody,
  postImage,
  postUrl,
  posts,
  readingMinutes,
  slugify,
  sortedPosts,
  wordCount,
} from "@/data/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};

  const url = postUrl(post);
  const image = postImage(post);

  return {
    title: post.title,
    description: post.description,
    keywords: [...post.keywords, "Minaruzzaman Shovon"],
    authors: [{ name: "Md Minaruzzaman Shovon", url: `${SITE_URL}/dev` }],
    category: post.section,
    alternates: {
      canonical: url,
      types: {
        "text/markdown": `${url}.md`,
        "application/rss+xml": `${SITE_URL}/blog/rss.xml`,
      },
    },
    openGraph: {
      type: "article",
      siteName: "Shovon Portfolio",
      locale: "en_US",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [`${SITE_URL}/dev`],
      section: post.section,
      tags: post.tags,
      images: [{ url: image, alt: post.title }],
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

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node.props as { children?: ReactNode }).children);
  }
  return "";
}

const markdownComponents: Components = {
  h2: ({ children }) => {
    const id = slugify(textOf(children));
    return (
      <h2
        id={id}
        className="group mt-12 mb-4 scroll-mt-24 border-b border-[#e5e5e5] pb-2 text-xl font-semibold tracking-tight text-[#111111]"
      >
        <a href={`#${id}`} className="no-underline">
          {children}
          <span className="ml-2 text-[#a3a3a3] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
            #
          </span>
        </a>
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = slugify(textOf(children));
    return (
      <h3 id={id} className="mt-8 mb-3 scroll-mt-24 text-base font-semibold text-[#111111]">
        {children}
      </h3>
    );
  },
  p: ({ children }) => <p className="my-4 leading-7 text-[#404040]">{children}</p>,
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
    <ul className="my-4 list-disc space-y-2 pl-5 text-[#404040] marker:text-[#a3e635]">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 list-decimal space-y-2 pl-5 text-[#404040] marker:text-[#737373]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="leading-7">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-8 border-l-4 border-[#a3e635] bg-[#f7fee7] px-5 py-1 text-[#1a2e05] [&_p]:text-[#1a2e05]">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => (
    <code
      className={`${className ?? ""} rounded bg-[#f4f4f5] px-1.5 py-0.5 font-mono text-[0.85em] text-[#111111]`}
    >
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-lg border border-[#e5e5e5] bg-[#0f172a] p-4 text-[13px] leading-6 text-[#e2e8f0] [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-[1em] [&>code]:text-inherit">
      {children}
    </pre>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={typeof src === "string" ? src : undefined}
      alt={alt ?? ""}
      loading="lazy"
      decoding="async"
      className="my-8 block w-full rounded-lg border border-[#e5e5e5]"
    />
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
    <td className="border-b border-[#f0f0f0] px-4 py-2.5 text-[#404040]">{children}</td>
  ),
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const body = getPostBody(post.slug);
  const headings = getHeadings(body);
  const minutes = readingMinutes(body);
  const url = postUrl(post);
  const morePosts = sortedPosts.filter((p) => p.slug !== post.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        abstract: post.summary.join(" "),
        image: postImage(post),
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        inLanguage: "en",
        articleSection: post.section,
        keywords: post.keywords.join(", "),
        wordCount: wordCount(body),
        timeRequired: `PT${minutes}M`,
        author: AUTHOR,
        publisher: AUTHOR,
        isPartOf: { "@type": "Blog", "@id": `${SITE_URL}/blog#blog`, name: "Shovon's Blog" },
        ...(post.originalUrl ? { isBasedOn: post.originalUrl } : {}),
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
      ...(post.faqs?.length
        ? [
            {
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: post.faqs.map((f) => ({
                "@type": "Question",
                name: f.question,
                acceptedAnswer: { "@type": "Answer", text: f.answer },
              })),
            },
          ]
        : []),
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/dev` },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
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
      <Navigation active="blog" />
      <main
        id="main-content"
        className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 lg:max-w-[60vw]"
      >
        <nav aria-label="Breadcrumb" className="text-[13px] text-[#737373]">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/dev" className="back-link">Home</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="back-link">Blog</Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="truncate text-[#a3a3a3]" aria-current="page">
              {post.section}
            </li>
          </ol>
        </nav>

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
            <p className="mt-4 text-base leading-7 text-[#5c5c5c]">{post.description}</p>
            <p className="mt-4 text-sm text-[#737373]">
              By{" "}
              <Link href="/dev" rel="author" className="font-medium text-[#111111] hover:underline">
                Md Minaruzzaman Shovon
              </Link>{" "}
              &middot; <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
              {post.dateModified !== post.datePublished && (
                <>
                  {" "}
                  &middot; Updated{" "}
                  <time dateTime={post.dateModified}>{formatDate(post.dateModified)}</time>
                </>
              )}{" "}
              &middot; {minutes} min read
            </p>
          </header>

          <section
            aria-labelledby="key-takeaways"
            className="mt-8 rounded-lg border border-[#d9f99d] bg-[#f7fee7] p-5"
          >
            <h2 id="key-takeaways" className="text-xs font-semibold uppercase tracking-wider text-[#365314]">
              Key takeaways
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-[#1a2e05] marker:text-[#65a30d]">
              {post.summary.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          {headings.length > 2 && (
            <details className="mt-6 rounded-lg border border-[#e5e5e5] p-5" open>
              <summary className="cursor-pointer text-xs font-semibold uppercase tracking-wider text-[#737373]">
                On this page
              </summary>
              <ol className="mt-3 space-y-1.5 text-sm">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-[#5c5c5c] hover:text-[#111111]">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          )}

          <div className="mt-8 text-[15px]">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {body}
            </ReactMarkdown>
          </div>

          {post.faqs && post.faqs.length > 0 && (
            <section aria-labelledby="faq" className="mt-14">
              <h2
                id="faq"
                className="mb-4 border-b border-[#e5e5e5] pb-2 text-xl font-semibold tracking-tight text-[#111111]"
              >
                Frequently asked questions
              </h2>
              <div className="divide-y divide-[#e5e5e5]">
                {post.faqs.map((f) => (
                  <div key={f.question} className="py-4">
                    <h3 className="font-semibold text-[#111111]">{f.question}</h3>
                    <p className="mt-2 text-[15px] leading-7 text-[#404040]">{f.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {(post.externalLinks?.length || post.originalUrl) && (
            <footer className="mt-10 flex flex-wrap items-center gap-3 border-t border-[#e5e5e5] pt-6 text-sm">
              {post.externalLinks?.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-md bg-[#111111] px-4 py-2 font-medium text-white transition-colors hover:bg-[#333333]"
                >
                  {l.label}
                </a>
              ))}
              {post.originalUrl && (
                <span className="text-[#737373]">
                  Also published on{" "}
                  <a
                    href={post.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline underline-offset-4 hover:text-[#111111]"
                  >
                    Medium
                  </a>
                </span>
              )}
            </footer>
          )}
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

        {morePosts.length > 0 && (
          <section aria-labelledby="more-posts" className="mt-14 border-t border-[#e5e5e5] pt-8">
            <h2 id="more-posts" className="mb-4 text-base font-semibold text-[#111111]">
              More from the blog
            </h2>
            <ul className="space-y-4">
              {morePosts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group block">
                    <span className="font-medium text-[#111111] group-hover:underline">{p.title}</span>
                    <span className="mt-1 block text-sm text-[#737373]">
                      {formatDate(p.datePublished)} &middot; {p.section}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
      <Footer backHome homePath="/dev" />
    </div>
  );
}
