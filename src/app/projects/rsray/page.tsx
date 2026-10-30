import type { Metadata } from "next";
import { Footer, Navigation } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "rsray — Extract endpoints from JavaScript bundles and websites",
  description:
    "rsray is a Rust CLI by Minaruzzaman Shovon that extracts endpoints from JavaScript bundles and websites: API, page, static, external and WebSocket routes, with site crawling, source maps, SWC parsing, auth/proxy support, HAR input and JSON/CSV/wordlist output.",
  keywords: [
    "rsray",
    "Rust",
    "JavaScript endpoint extractor",
    "bug bounty recon",
    "JS bundle scanner",
    "API discovery",
    "Minaruzzaman Shovon",
  ],
  alternates: {
    canonical: "https://www.shovon.bd/projects/rsray",
  },
  openGraph: {
    url: "https://www.shovon.bd/projects/rsray",
    title: "rsray | Minaruzzaman Shovon",
    description:
      "A Rust CLI that X-rays JavaScript bundles and websites to find hidden API endpoints.",
    images: [
      "/api/og?title=rsray&subtitle=Extract%20endpoints%20from%20JavaScript%20bundles%20and%20websites&category=OPEN%20SOURCE&badge=RUST&badgeColor=%23f97316&badgeBg=%23ffedd5",
    ],
  },
  twitter: {
    title: "rsray | Minaruzzaman Shovon",
    description:
      "A Rust CLI that X-rays JavaScript bundles and websites to find hidden API endpoints.",
    images: [
      "/api/og?title=rsray&subtitle=Extract%20endpoints%20from%20JavaScript%20bundles%20and%20websites&category=OPEN%20SOURCE&badge=RUST&badgeColor=%23f97316&badgeBg=%23ffedd5",
    ],
  },
};

const features = [
  {
    title: "Hidden API surface",
    body: "Finds API, page, static, external and WebSocket endpoints buried in JS bundles, chunks and source maps — not just what is linked in navigation.",
  },
  {
    title: "Flagged interesting routes",
    body: "Admin, internal, debug, test, staging, dev, private, beta, backup and parameterised routes are flagged so recon starts with the interesting ones.",
  },
  {
    title: "Real parsing, not just regex",
    body: "A regex/tokenizer pass plus SWC real parsing, with string concatenation and template-literal resolution and base-URL joining.",
  },
  {
    title: "Whole-site crawl",
    body: "Crawls internal pages, sitemap.xml and robots.txt, follows JS chunks, fetches source maps and Next.js build data.",
  },
  {
    title: "Works on authenticated targets",
    body: "Repeatable headers, cookies and proxy support, with retries and delays for rate-limited targets.",
  },
  {
    title: "Output for the next tool",
    body: "Grouped text, JSON, CSV, full URLs for httpx-style chaining, quiet mode and wordlist output.",
  },
];

export default function RsrayPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "rsray",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cross-platform",
    author: {
      "@type": "Person",
      name: "Md Minaruzzaman Shovon",
      url: "https://www.shovon.bd/",
    },
    url: "https://www.shovon.bd/projects/rsray",
    downloadUrl: "https://github.com/sh00von/rsray",
    softwareVersion: "0.1.3",
    description:
      "A Rust CLI that extracts endpoints from JavaScript bundles and websites.",
  };

  return (
    <div className="flex min-h-screen flex-col">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation active="projects" />
      <main
        id="main-content"
        className="mx-auto w-full max-w-2xl flex-grow px-4 pb-24 lg:max-w-[60vw]"
      >
        <div className="mb-8 pt-6">
          <p className="text-sm font-semibold text-[#365314]">OPEN SOURCE · RUST · v0.1.3</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#111111] sm:text-4xl">
            rsray
          </h1>
          <p className="mt-3 text-base text-[#3d3d3d]">
            Extract endpoints from JavaScript bundles and websites. The real
            attack surface of a JS-heavy site is rarely in its navigation — it
            is buried in bundles, chunks and source maps. rsray X-rays them
            and hands you the map.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="https://github.com/sh00von/rsray"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#111111] px-4 py-2 text-sm font-semibold text-white"
            >
              GitHub
            </a>
            <a
              href="https://crates.io/crates/rsray"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[#e5e5e5] px-4 py-2 text-sm font-semibold text-[#111111]"
            >
              crates.io
            </a>
            <a
              href="https://github.com/sh00von/rsray/releases/tag/v0.1.3"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-[#e5e5e5] px-4 py-2 text-sm font-semibold text-[#111111]"
            >
              Release v0.1.3
            </a>
          </div>
        </div>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#111111]">Install</h2>
          <pre className="mt-3 overflow-x-auto rounded-lg border border-[#e5e5e5] bg-[#f5f5f5] p-4 text-sm text-[#111111]">
            <code>cargo install rsray</code>
          </pre>
          <pre className="mt-3 overflow-x-auto rounded-lg border border-[#e5e5e5] bg-[#f5f5f5] p-4 text-sm text-[#111111]">
            <code>{`rsray https://example.com --json -o endpoints.json
rsray bundle.js --interesting-only --urls`}</code>
          </pre>
          <p className="mt-3 text-sm text-[#737373]">
            Only use rsray on sites you own or are authorised to test.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#111111]">What it does</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-lg border border-[#e5e5e5] p-4"
              >
                <h3 className="font-semibold text-[#111111]">{feature.title}</h3>
                <p className="mt-1 text-sm text-[#3d3d3d]">{feature.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl font-bold text-[#111111]">Sample output</h2>
          <pre className="mt-3 overflow-x-auto rounded-lg border border-[#e5e5e5] bg-[#f5f5f5] p-4 text-sm text-[#111111]">
            <code>{`API (5)
  /api/v1/users
  /api/v1/admin/users
  /api/v1/internal/debug
  /api/v1/users/{userId}/orders
  /api/v2/orders
Page (1)
  /products
External (1)
WebSocket (1)`}</code>
          </pre>
          <p className="mt-3 text-sm text-[#737373]">
            Sample from the project&apos;s test fixture. Inputs supported: local
            files and directories, JS URLs, whole websites, stdin lists, HAR
            files and TOML config.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold text-[#111111]">Links</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[#3d3d3d]">
            <li>
              Repository:{" "}
              <a
                href="https://github.com/sh00von/rsray"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#111111] underline"
              >
                github.com/sh00von/rsray
              </a>
            </li>
            <li>
              Install:{" "}
              <a
                href="https://crates.io/crates/rsray"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-[#111111] underline"
              >
                crates.io/crates/rsray
              </a>
            </li>
          </ul>
        </section>
      </main>
      <Footer backHome />
    </div>
  );
}
