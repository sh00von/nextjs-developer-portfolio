import type { Metadata } from "next";
import {
  achievements,
  certifications,
  education,
  experience,
  featured,
  gallery,
  pressCoverage,
  publications,
  securityDisclosures,
  skills,
  volunteers,
} from "@/data/home";

/**
 * Single-home content module.
 *
 * The site used to ship two home variants — a Developer home at `/` and an
 * Academic home at `/academic` — switched by a floating toggle. They are now
 * merged into one home page at `/` that shows both sides of the work.
 * `/academic` permanently redirects to `/`.
 */

const siteUrl = "https://www.shovon.bd";

type SimpleItem = readonly [string, string];
type LinkedItem = readonly [string, string, string];
type PublicationItem = (typeof publications)[number];
type SkillGroup = readonly [string, ...string[]];
type GalleryItem = (typeof gallery)[number];
type AchievementItem = (typeof achievements)[number];
type FeaturedItem = (typeof featured)[number];
type SecurityItem = (typeof securityDisclosures)[number];
type PressItem = (typeof pressCoverage)[number];

/** Programming & ML group, previously shown only on the academic home. */
const programmingMlSkills = [
  [
    "Programming & ML",
    "Python",
    "NumPy",
    "MATLAB",
    "PyTorch",
    "TensorFlow",
    "Machine Learning",
    "CNN",
    "ANN",
    "LLM Fine-tuning",
  ],
] as const satisfies readonly SkillGroup[];

export const homeContent = {
  hero: {
    headline: "Building fast web products, and exploring water systems.",
    intro:
      "I'm Md Minaruzzaman Shovon, a full-stack developer and water resources engineering undergraduate at CUET — building with Next.js, TypeScript, and AI-powered product experiences, and working across hydrology, hydraulics, GIS, and environmental analysis.",
    support:
      "I care about interfaces that feel clear, quick, and quietly capable — and I use software to make complex water, environmental, and engineering systems easier to analyze, understand, and communicate.",
    pills: [],
    summaryEyebrow: "Based in Chattogram, building for the web and studying water systems.",
    summaryText:
      "Recent work spans developer-focused interfaces, portfolio systems, interactive maps, and research-led engineering tools for hydrology, air quality, and environmental monitoring.",
  },
  publications: {
    title: "Research & Publications",
    intro:
      "Research is a central part of this work, especially around hydrology, environmental monitoring, rainfall analysis, and applied machine learning for water-related systems.",
  },
  skills: {
    title: "Skills & Tools",
    intro:
      "Technologies, methods, and tools I use to design, build, and ship products — and to model water and environmental systems.",
  },
  contact: {
    intro: "I'm always open to discussing product, engineering, research, and collaborative opportunities.",
  },
  metadata: {
    title: "Md Minaruzzaman Shovon | Full-Stack Developer & Water Resources Engineer",
    description:
      "Md Minaruzzaman Shovon is a full-stack developer, security researcher, and water resources engineering undergraduate in Chattogram, Bangladesh, building Next.js apps, AI products and GIS tools, and researching hydrology, GIS, and environmental systems at CUET.",
    keywords: [
      "Md Minaruzzaman Shovon",
      "Shovon developer",
      "Full Stack Developer Bangladesh",
      "Next.js developer",
      "TypeScript developer",
      "React developer",
      "AI integration",
      "GIS developer",
      "web developer portfolio",
      "Water Resources Engineering",
      "CUET",
      "hydrology",
      "hydraulics",
      "GIS",
      "environmental analysis",
      "hydrological modeling",
      "research portfolio",
    ],
    category: "Technology",
    ogTitle: "Md Minaruzzaman Shovon | Full-Stack Developer & Water Resources Engineer",
    ogDescription:
      "Full-stack developer and water resources engineering undergraduate building fast Next.js and TypeScript web products, AI integration, GIS mapping, WordPress security research, and hydrology and environmental modeling.",
    jobTitle: "Full-Stack Developer & Water Resources Engineering Undergraduate",
    profileDescription:
      "Full-stack developer focused on Next.js, TypeScript, AI integration, GIS, and high-performance web applications, and water resources engineering undergraduate at CUET focused on hydrology, hydraulics, GIS, environmental analysis, and research-driven modeling.",
    knowsAbout: [
      "Full Stack Development",
      "Next.js",
      "React",
      "TypeScript",
      "AI Integration",
      "UI Engineering",
      "GIS",
      "Data Visualization",
      "Water Resources Engineering",
      "Hydrology",
      "Hydraulics",
      "Environmental Engineering",
      "Remote Sensing",
      "Hydrological Modeling",
      "Rainfall Analysis",
    ],
  },
};

export const homeData: {
  education: readonly SimpleItem[];
  experience: readonly LinkedItem[];
  volunteers: readonly LinkedItem[];
  publications: readonly PublicationItem[];
  certifications: readonly SimpleItem[];
  achievements: readonly AchievementItem[];
  gallery: readonly GalleryItem[];
  skills: readonly SkillGroup[];
  featured: readonly FeaturedItem[];
  securityDisclosures: readonly SecurityItem[];
  pressCoverage: readonly PressItem[];
} = {
  education,
  experience,
  volunteers,
  publications,
  certifications,
  achievements,
  gallery,
  skills: [...skills, ...programmingMlSkills],
  featured,
  securityDisclosures,
  pressCoverage,
};

export function getHomeMetadata(): Metadata {
  const meta = homeContent.metadata;
  const canonicalUrl = `${siteUrl}/`;

  return {
    title: {
      absolute: meta.title,
    },
    description: meta.description,
    keywords: meta.keywords,
    category: meta.category,
    authors: [{ name: "Minaruzzaman Shovon", url: canonicalUrl }],
    creator: "Minaruzzaman Shovon",
    publisher: "Minaruzzaman Shovon",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "website",
      url: canonicalUrl,
      siteName: "Shovon Portfolio",
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [
        {
          url: "/api/og?title=Md%20Minaruzzaman%20Shovon&subtitle=Full-stack%20developer%20and%20water%20resources%20engineer%20—%20Next.js%2C%20TypeScript%2C%20AI%2C%20GIS%2C%20hydrology%20and%20environmental%20modeling&category=PORTFOLIO&badge=DEVELOPER%20%26%20RESEARCHER&badgeColor=%230284c7&badgeBg=%23f0f9ff",
          alt: "Portfolio of Minaruzzaman Shovon — developer and water resources engineering researcher",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@sh00von",
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [
        "/api/og?title=Md%20Minaruzzaman%20Shovon&subtitle=Full-stack%20developer%20and%20water%20resources%20engineer%20—%20Next.js%2C%20TypeScript%2C%20AI%2C%20GIS%2C%20hydrology%20and%20environmental%20modeling&category=PORTFOLIO&badge=DEVELOPER%20%26%20RESEARCHER&badgeColor=%230284c7&badgeBg=%23f0f9ff",
      ],
    },
  };
}

export function getProfileJsonLd() {
  const meta = homeContent.metadata;
  const pageUrl = `${siteUrl}/`;

  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    name: meta.title,
    description: meta.description,
    url: pageUrl,
    dateCreated: "2024-01-01T00:00:00+06:00",
    dateModified: "2026-05-08T12:00:00+06:00",
    mainEntity: {
      "@type": "Person",
      name: "Md Minaruzzaman Shovon",
      alternateName: "Shovon",
      jobTitle: meta.jobTitle,
      url: pageUrl,
      image: `${siteUrl}/shovon.jpg`,
      description: meta.profileDescription,
      mainEntityOfPage: pageUrl,
      affiliation: {
        "@type": "CollegeOrUniversity",
        name: "Chittagong University of Engineering and Technology (CUET)",
      },
      knowsAbout: [
        ...meta.knowsAbout,
        "WordPress Security Research",
        "Vulnerability Disclosure",
        "PHP Object Injection",
        "Broken Access Control",
        "CVE Advisories",
      ],
      knowsLanguage: ["English", "Bengali"],
      worksFor: {
        "@type": "Organization",
        name: "Authry AI",
        url: "https://authryai.com/",
      },
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Chittagong University of Engineering and Technology (CUET)",
      },
      address: {
        "@type": "PostalAddress",
        addressCountry: "Bangladesh",
      },
      sameAs: [
        "https://github.com/sh00von",
        "https://twitter.com/sh00von",
        "https://www.linkedin.com/in/minarsvn9090/",
        "https://vdp.patchstack.com/database/researchers/093a22ad-bf3b-4fd3-96cf-9e6cef3eb7db",
        "https://wpscan.com/vulnerability/0fb14dca-d4aa-4c24-bf15-37099edb7614/",
        "https://scholar.google.com/citations?user=tht8Z1oAAAAJ&hl=en",
        "https://www.researchgate.net/profile/Md-Shovon-13",
        "https://www.facebook.com/minar.svn",
      ],
    },
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/`,
      },
    ],
  };

  const scholarlyArticles = publications.map((pub) => ({
    "@context": "https://schema.org",
    "@type": "ScholarlyArticle",
    headline: pub.title,
    name: pub.title,
    url: pub.href,
    author: pub.authors.split(", ").map((authorName) => ({
      "@type": "Person",
      name: authorName,
    })),
    publisher: {
      "@type": "Organization",
      name: pub.label,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [profilePage, breadcrumbList, ...scholarlyArticles],
  };
}
