import type { NextConfig } from "next";

const strapiHost = process.env.STRAPI_URL
  ? new URL(process.env.STRAPI_URL).hostname
  : undefined;
const strapiMediaHost = strapiHost?.endsWith(".strapiapp.com")
  ? strapiHost.replace(".strapiapp.com", ".media.strapiapp.com")
  : undefined;

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      ...(strapiHost
        ? [
            {
              protocol: "https" as const,
              hostname: strapiHost,
            },
          ]
        : []),
      ...(strapiMediaHost
        ? [
            {
              protocol: "https" as const,
              hostname: strapiMediaHost,
            },
          ]
        : []),
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
  },
  async rewrites() {
    return [
      // Plain-markdown copy of each blog post for AI agents and LLM tools.
      { source: "/blog/:slug.md", destination: "/blog/:slug/md" },
    ];
  },
  async redirects() {
    return [
      {
        source: "/projects.html",
        destination: "/projects",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Link",
            value:
              '</.well-known/api-catalog>; rel="api-catalog", </.well-known/ai.txt>; rel="service-doc"; type="text/plain", </llms.txt>; rel="describedby"; type="text/plain", </llms-full.txt>; rel="service-desc"; type="text/plain", </.well-known/security.txt>; rel="author", </sitemap.xml>; rel="sitemap"; type="application/xml", </rss.xml>; rel="alternate"; type="application/rss+xml", </blog/rss.xml>; rel="alternate"; type="application/rss+xml"; title="Blog"',
          },
          {
            key: "Vary",
            value: "Accept",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
