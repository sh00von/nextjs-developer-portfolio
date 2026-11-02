import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import { getPublicImageSize } from "@/lib/imageSize";
import { clampDescription } from "@/lib/seo";
import { ReadingProgress } from "@/components/ReadingProgress";
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
    title: post.seoTitle ?? post.title,
    description: clampDescription(post.description),
    keywords: [...post.keywords, "Minaruzzaman Shovon"],
    authors: [{ name: "Md Minaruzzaman Shovon", url: `${SITE_URL}/` }],
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
      authors: [`${SITE_URL}/`],
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
        className="group mt-14 mb-4 scroll-mt-28 text-2xl font-semibold leading-snug tracking-tight text-[var(--text)]"
      >
        <a href={`#${id}`} className="no-underline">
          {children}
          <span className="ml-2 text-[var(--border-hover)] opacity-0 transition-opacity group-hover:opacity-100" aria-hidden="true">
            #
          </span>
        </a>
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = slugify(textOf(children));
    return (
      <h3 id={id} className="mt-10 mb-3 scroll-mt-28 text-lg font-semibold tracking-tight text-[var(--text)]">
        {children}
      </h3>
    );
  },
  p: ({ children }) => <p className="my-5 leading-8 text-[var(--muted)]">{children}</p>,
  strong: ({ children }) => <strong className="font-semibold text-[var(--text)]">{children}</strong>,
  a: ({ href, children }) => {
    const external = href?.startsWith("http");
    return (
      <a
        href={href}
        className="font-medium text-[var(--text)] underline decoration-[var(--accent)] decoration-2 underline-offset-4 transition-colors hover:decoration-[var(--text)]"
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  },
  ul: ({ children }) => (
    <ul className="my-5 list-disc space-y-2 pl-6 text-[var(--muted)] marker:text-[var(--muted-3)]">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="my-5 list-decimal space-y-2 pl-6 text-[var(--muted)] marker:font-mono marker:text-sm marker:text-[var(--muted-3)]">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-1 leading-8">{children}</li>,
  blockquote: ({ children }) => (
    <blockquote className="my-10 border-l-2 border-[var(--accent)] pl-6 text-xl leading-relaxed font-medium tracking-tight text-[var(--text)] [&_p]:my-2 [&_p]:leading-relaxed [&_p]:text-[var(--text)]">
      {children}
    </blockquote>
  ),
  code: ({ children, className }) => (
    <code
      className={`${className ?? ""} rounded-md bg-[var(--surface)] px-1.5 py-0.5 font-mono text-[0.85em] text-[var(--text)]`}
    >
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="-mx-5 my-8 overflow-x-auto bg-[#0c0c0c] p-5 text-[13px] leading-6 text-white/85 sm:mx-0 sm:rounded-xl [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-[1em] [&>code]:text-inherit">
      {children}
    </pre>
  ),
  img: ({ src, alt }) => {
    const url = typeof src === "string" ? src : undefined;
    const size = url ? getPublicImageSize(url) : null;
    const className =
      "mx-auto my-10 block h-auto max-h-[40rem] w-auto max-w-full rounded-xl border border-[var(--border)]";
    if (url && size) {
      return (
        <Image
          src={url}
          alt={alt ?? ""}
          width={size.width}
          height={size.height}
          sizes="(min-width: 1024px) 640px, 100vw"
          className={className}
        />
      );
    }
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={url} alt={alt ?? ""} loading="lazy" decoding="async" className={className} />
    );
  },
  hr: () => <hr className="my-12 border-[var(--border)]" />,
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto border-y border-[var(--border)]">
      <table className="w-full border-collapse text-left text-sm">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  th: ({ children }) => (
    <th className="border-b border-[var(--border)] px-3 py-3 font-medium whitespace-nowrap text-[var(--text)] first:pl-0">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-[var(--border-soft)] px-3 py-3 align-top text-[var(--muted)] first:pl-0">{children}</td>
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
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
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
      <ReadingProgress />
      <main
        id="main-content"
        className="container-wide flex-1 overflow-x-clip pt-8 pb-16 sm:pt-12 lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-x-16"
      >
        <div className="min-w-0">
        <nav aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--muted-3)]">
            <li>
              <Link href="/" className="transition-colors hover:text-[var(--text)]">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blog" className="transition-colors hover:text-[var(--text)]">
                Blog
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="truncate text-[var(--muted-2)]" aria-current="page">
              {post.section}
            </li>
          </ol>
        </nav>

        <article>
          <header className="mt-10">
            <p className="flex flex-wrap items-center gap-x-2 text-sm text-[var(--muted-3)]">
              <span className="font-medium text-[var(--accent-strong)]">{post.section}</span>
              <span aria-hidden="true">·</span>
              <span>{minutes} min read</span>
            </p>
            <h1 className="mt-4 text-[34px] leading-[1.1] font-medium tracking-[-0.03em] text-[var(--text)] sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--muted-2)] sm:text-xl sm:leading-9">{post.description}</p>

            <div className="mt-8 flex items-center gap-3 border-y border-[var(--border)] py-4">
              <Image
                src="/shovon.jpg"
                alt=""
                width={80}
                height={80}
                className="h-10 w-10 rounded-full object-cover"
              />
              <div className="min-w-0 text-sm">
                <Link href="/" rel="author" className="font-medium text-[var(--text)] hover:underline">
                  Md Minaruzzaman Shovon
                </Link>
                <p className="text-[var(--muted-3)]">
                  <time dateTime={post.datePublished}>{formatDate(post.datePublished)}</time>
                  {post.dateModified !== post.datePublished && (
                    <>
                      {" "}
                      &middot; Updated <time dateTime={post.dateModified}>{formatDate(post.dateModified)}</time>
                    </>
                  )}
                </p>
              </div>
            </div>
          </header>

          <section aria-labelledby="key-takeaways" className="mt-10 rounded-2xl bg-[var(--surface)] p-6 sm:p-7">
            <h2 id="key-takeaways" className="text-sm font-medium text-[var(--text)]">
              Key takeaways
            </h2>
            <ul className="mt-4 space-y-3 text-[15px] leading-7 text-[var(--muted)]">
              {post.summary.map((s) => (
                <li key={s} className="flex gap-3">
                  <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" aria-hidden="true" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </section>

          {headings.length > 2 && (
            <details className="group mt-6 border-b border-[var(--border)] pb-4 lg:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between py-2 text-sm font-medium text-[var(--text)] [&::-webkit-details-marker]:hidden">
                <span>
                  On this page <span className="font-normal text-[var(--muted-3)]">· {headings.length} sections</span>
                </span>
                <span className="text-[var(--muted-3)] transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <ol className="mt-2 space-y-2 border-l border-[var(--border)] pl-4 text-sm">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a href={`#${h.id}`} className="text-[var(--muted-2)] transition-colors hover:text-[var(--text)]">
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
            </details>
          )}

          <div className="mt-10 text-[17px]">
            <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
              {body}
            </ReactMarkdown>
          </div>

          {post.faqs && post.faqs.length > 0 && (
            <section aria-labelledby="faq" className="mt-16">
              <h2 id="faq" className="text-2xl font-semibold tracking-tight text-[var(--text)]">
                Frequently asked questions
              </h2>
              <div className="mt-6 border-t border-[var(--border)]">
                {post.faqs.map((f) => (
                  <details key={f.question} className="group border-b border-[var(--border)]">
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-4 font-medium text-[var(--text)] [&::-webkit-details-marker]:hidden">
                      <h3 className="text-base">{f.question}</h3>
                      <span className="mt-0.5 text-lg leading-none text-[var(--muted-3)] transition-transform group-open:rotate-45" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <p className="pb-5 text-[15px] leading-7 text-[var(--muted)]">{f.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {(post.externalLinks?.length || post.originalUrl) && (
            <footer className="mt-12 flex flex-wrap items-center gap-3 text-sm">
              {post.externalLinks?.map((l) => (
                <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                  {l.label}
                  <span aria-hidden="true">&nearr;</span>
                </a>
              ))}
              {post.originalUrl && (
                <span className="text-[var(--muted-3)]">
                  Also published on{" "}
                  <a
                    href={post.originalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--text)] underline decoration-[var(--border-hover)] underline-offset-4 hover:decoration-[var(--text)]"
                  >
                    Medium
                  </a>
                </span>
              )}
            </footer>
          )}
        </article>

        {post.relatedApp && (
          <aside className="mt-16 flex flex-col gap-5 rounded-2xl border border-[var(--border)] p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[var(--text)] text-lg font-semibold text-[#a3e635]">
                {post.relatedApp.name.charAt(0)}
              </span>
              <div>
                <p className="text-xs text-[var(--muted-3)]">Featured app</p>
                <p className="font-medium text-[var(--text)]">{post.relatedApp.name}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <a href={post.relatedApp.playStoreUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary flex-1 sm:flex-none">
                Google Play
              </a>
              <Link href={post.relatedApp.href} className="btn btn-secondary flex-1 sm:flex-none">
                Details
              </Link>
            </div>
          </aside>
        )}

        {morePosts.length > 0 && (
          <section aria-labelledby="more-posts" className="mt-20 border-t border-[var(--border)] pt-10">
            <div className="flex items-baseline justify-between">
              <h2 id="more-posts" className="text-sm font-medium text-[var(--text)]">
                More from the blog
              </h2>
              <Link href="/blog" className="text-sm text-[var(--muted-3)] hover:text-[var(--text)]">
                All posts &rarr;
              </Link>
            </div>
            <ul className="mt-4 divide-y divide-[var(--border)]">
              {morePosts.map((p) => (
                <li key={p.slug}>
                  <Link href={`/blog/${p.slug}`} className="group -mx-3 block rounded-lg px-3 py-4 transition-colors hover:bg-[var(--surface)]">
                    <span className="font-medium text-[var(--text)]">{p.title}</span>
                    <span className="mt-1 block text-sm text-[var(--muted-3)]">
                      {formatDate(p.datePublished)} &middot; {p.section}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}
        </div>

        {headings.length > 2 && (
          <aside aria-label="On this page" className="hidden lg:block">
            <nav className="sticky top-[calc(var(--nav-h)+2.5rem)] mt-[3.25rem] max-h-[calc(100vh-var(--nav-h)-5rem)] overflow-y-auto pb-4">
              <p className="text-sm font-medium text-[var(--text)]">On this page</p>
              <ol className="mt-4 space-y-2.5 border-l border-[var(--border)] text-[13px] leading-5">
                {headings.map((h) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="-ml-px block border-l border-transparent pl-4 text-[var(--muted-3)] transition-colors hover:border-[var(--text)] hover:text-[var(--text)]"
                    >
                      {h.text}
                    </a>
                  </li>
                ))}
              </ol>
              <a href="#main-content" className="mt-6 inline-block pl-4 text-[13px] text-[var(--muted-3)] hover:text-[var(--text)]">
                Back to top &uarr;
              </a>
            </nav>
          </aside>
        )}
      </main>
      <Footer backHome homePath="/" />
    </div>
  );
}
