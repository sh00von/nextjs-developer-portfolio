import type { Metadata } from "next";
import { Footer, Navigation } from "@/components/SiteChrome";
import { ProjectsClient } from "@/components/ProjectsClient";
import { resolveFromVariant, resolveHomePath } from "@/lib/homeVariants";

import { projects } from "@/data/projects";

export const metadata: Metadata = {
  title: "Projects & Portfolio",
  description:
    "Explore a curated list of engineering, GIS, and software development projects by Minaruzzaman Shovon. Featuring AuthryAI deepfake detection and structural tools.",
  keywords: [
    "Minaruzzaman Shovon",
    "Portfolio",
    "Software Engineer",
    "Engineering Projects",
    "GIS",
    "Hydrology",
    "Full-stack Developer",
    "AuthryAI",
    "Deepfake Detection",
    "CUET",
  ],
  alternates: {
    canonical: "https://shovon.bd/projects",
  },
  openGraph: {
    url: "https://shovon.bd/projects",
    title: "Projects & Portfolio | Minaruzzaman Shovon",
    description:
      "A showcase of AI, GIS, and full-stack engineering applications built by Minaruzzaman Shovon.",
    images: [
      "/api/og?title=Projects%20%26%20Portfolio&subtitle=Showcase%20of%20AI%2C%20GIS%20spatial%20modeling%2C%20and%20full-stack%20engineering%20applications&category=PROJECT%20PORTFOLIO&badge=ENGINEERING&badgeColor=%231e293b&badgeBg=%23f1f5f9",
    ],
  },
  twitter: {
    title: "Projects & Portfolio | Minaruzzaman Shovon",
    description:
      "A showcase of AI, GIS, and full-stack engineering applications built by Minaruzzaman Shovon.",
    images: [
      "/api/og?title=Projects%20%26%20Portfolio&subtitle=Showcase%20of%20AI%2C%20GIS%20spatial%20modeling%2C%20and%20full-stack%20engineering%20applications&category=PROJECT%20PORTFOLIO&badge=ENGINEERING&badgeColor=%231e293b&badgeBg=%23f1f5f9",
    ],
  },
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string }>;
}) {
  const { from } = await searchParams;
  const homePath = resolveHomePath(from);
  const fromVariant = resolveFromVariant(homePath);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        name: "Projects & Portfolio | Md Minaruzzaman Shovon",
        description:
          "A showcase of AI, GIS, and full-stack engineering applications built by Minaruzzaman Shovon.",
        url: "https://shovon.bd/projects",
        author: {
          "@type": "Person",
          name: "Md Minaruzzaman Shovon",
          url: "https://shovon.bd/dev",
        },
        mainEntity: {
          "@type": "ItemList",
          itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            item: {
              "@type": "CreativeWork",
              name: project.title,
              description: project.description,
              url: project.link,
              keywords: project.tags.join(", "),
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
            item: "https://shovon.bd/dev",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects & Portfolio",
            item: "https://shovon.bd/projects",
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
      <Navigation active="projects" homePath={homePath} fromVariant={fromVariant} />
      <main id="main-content" className="mx-auto w-full max-w-2xl flex-grow px-4 pb-24 lg:max-w-[60vw]">
        <div className="mb-6 pt-6">
          <h1 className="text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl">
            Projects & Portfolio
          </h1>
          <p className="mt-1 text-sm text-[#737373]">
            Featured work across AI, GIS spatial modeling, full-stack software, and engineering.
          </p>
        </div>
        <ProjectsClient />
      </main>
      <Footer backHome homePath={homePath} />
    </div>
  );
}
