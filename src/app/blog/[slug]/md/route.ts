import { getPost, postAsMarkdown, postUrl, posts } from "@/data/posts";

// Served at /blog/<slug>.md (rewrite in next.config.ts) and for
// `Accept: text/markdown` requests to /blog/<slug> (see src/proxy.ts).
export const dynamic = "force-static";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return new Response("Not found", { status: 404 });

  return new Response(postAsMarkdown(post), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      // The HTML page is the canonical, indexable version.
      Link: `<${postUrl(post)}>; rel="canonical"`,
      "X-Robots-Tag": "noindex, follow",
    },
  });
}
