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

export type HomeVariant = "dev" | "academic";
export type HomePath = "/" | "/dev" | "/academic";
export type SharedFrom = HomeVariant | undefined;

const siteUrl = "https://shovon.bd";

type SimpleItem = readonly [string, string];
type LinkedItem = readonly [string, string, string];
type PublicationItem = (typeof publications)[number];
type SkillGroup = readonly [string, ...string[]];
type GalleryItem = (typeof gallery)[number];
type AchievementItem = (typeof achievements)[number];
type FeaturedItem = (typeof featured)[number];
type SecurityItem = (typeof securityDisclosures)[number];
type PressItem = (typeof pressCoverage)[number];

type VariantContent = {
  shortLabel: string;
  hero: {
    headline: string;
    intro: string;
    support: string;
    pills: string[];
    summaryEyebrow: string;
    summaryText: string;
    cveBadges?: { label: string; href: string; severity: string }[];
  };
  publications: {
    title: string;
    intro: string;
  };
  skills: {
    title: string;
    intro: string;
  };
  contact: {
    intro: string;
  };
  metadata: {
    title: string;
    description: string;
    keywords: string[];
    category: string;
    ogTitle: string;
    ogDescription: string;
    jobTitle: string;
    profileDescription: string;
    knowsAbout: string[];
  };
};

type HomeVariantData = {
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
};

const academicOnlySkills = [
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

export const homeVariantContent: Record<HomeVariant, VariantContent> = {
  dev: {
    shortLabel: "Dev",
    hero: {
      headline: "Building fast, thoughtful web products.",
      intro:
        "I'm Md Minaruzzaman Shovon, a full-stack developer focused on Next.js, TypeScript, modern UI systems, and AI-powered product experiences, with a background in water resources engineering and GIS.",
      support:
        "I care about interfaces that feel clear, quick, and quietly capable, especially when the product has real-world data, mapping, or technical depth behind it.",
      pills: [],
      cveBadges: [
        { label: "CVE-2026-15048", href: "/security/cve-2026-15048", severity: "MEDIUM 5.3" },
        { label: "CVE-2026-14322", href: "/security/cve-2026-14322", severity: "MEDIUM 5.3" },
        { label: "CVE-2026-10749", href: "/security/cve-2026-10749", severity: "HIGH 7.2" },
        { label: "CVE-2026-57661", href: "/security/cve-2026-57661", severity: "MEDIUM 5.4" },
        { label: "CVE-2026-14821", href: "/security/cve-2026-14821", severity: "LOW 2.7" },
      ],
      summaryEyebrow: "Based in Chattogram, building for the web.",
      summaryText:
        "Recent work spans developer-focused interfaces, portfolio systems, interactive maps, and practical software for engineering-heavy use cases.",
    },
    publications: {
      title: "Publications",
      intro:
        "Research and technical writing that reflect the analytical side of how I approach software, modeling, and environmental systems.",
    },
    skills: {
      title: "Skills",
      intro: "Technologies and tools I use to design, build, and ship products.",
    },
    contact: {
      intro: "I'm always open to discussing product, engineering, and collaborative opportunities.",
    },
    metadata: {
      title: "Md Minaruzzaman Shovon | Full Stack Developer",
      description:
        "Full stack developer portfolio of Md Minaruzzaman Shovon, focused on Next.js, TypeScript, AI integration, GIS, and high-performance web applications.",
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
      ],
      category: "Technology",
      ogTitle: "Md Minaruzzaman Shovon | Full Stack Developer",
      ogDescription:
        "Full stack developer building fast, thoughtful web products across Next.js, AI integration, mapping, and data-rich interfaces.",
      jobTitle: "Full Stack Developer",
      profileDescription:
        "Full stack developer focused on Next.js, TypeScript, AI integration, GIS, and high-performance web applications.",
      knowsAbout: [
        "Full Stack Development",
        "Next.js",
        "React",
        "TypeScript",
        "AI Integration",
        "UI Engineering",
        "GIS",
        "Data Visualization",
      ],
    },
  },
  academic: {
    shortLabel: "WRE",
    hero: {
      headline: "Exploring water systems, modeling, and environmental analysis.",
      intro:
        "I'm Md Minaruzzaman Shovon, a water resources engineering undergraduate at CUET working across hydrology, hydraulics, GIS, environmental analysis, and applied computational tools, with a focus on river systems, rainfall, air quality, spatial analysis, and practical modeling supported by software.",
      support:
        "I use software to make complex water, environmental, and engineering systems easier to analyze, understand, and communicate.",
      pills: [],
      summaryEyebrow: "Based in Chattogram, studying and building in water systems.",
      summaryText:
        "Current interests include hydrological modeling, remote sensing, environmental monitoring, and research-led engineering tools for decision-making.",
    },
    publications: {
      title: "Research & Publications",
      intro:
        "Research is a central part of this work, especially around hydrology, environmental monitoring, rainfall analysis, and applied machine learning for water-related systems.",
    },
    skills: {
      title: "Tools & Methods",
      intro: "Methods, software, and technical tools I use across hydrology, GIS, analysis, and engineering workflows.",
    },
    contact: {
      intro: "I'm open to research, engineering, GIS, and interdisciplinary collaboration.",
    },
    metadata: {
      title: "Md Minaruzzaman Shovon | Water Resources Engineering",
      description:
        "Water resources engineering portfolio of Md Minaruzzaman Shovon, covering hydrology, hydraulics, GIS, environmental analysis, research, and modeling.",
      keywords: [
        "Md Minaruzzaman Shovon",
        "Water Resources Engineering",
        "CUET",
        "hydrology",
        "hydraulics",
        "GIS",
        "environmental analysis",
        "hydrological modeling",
        "research portfolio",
      ],
      category: "Engineering",
      ogTitle: "Md Minaruzzaman Shovon | Water Resources Engineering",
      ogDescription:
        "Water resources engineering work spanning hydrology, GIS, environmental analysis, modeling, and research-driven technical practice.",
      jobTitle: "Water Resources Engineering Undergraduate",
      profileDescription:
        "Water resources engineering undergraduate at CUET focused on hydrology, hydraulics, GIS, environmental analysis, and research-driven modeling.",
      knowsAbout: [
        "Water Resources Engineering",
        "Hydrology",
        "Hydraulics",
        "Environmental Engineering",
        "GIS",
        "Remote Sensing",
        "Hydrological Modeling",
        "Rainfall Analysis",
      ],
    },
  },
};

export const homeVariantData: Record<HomeVariant, HomeVariantData> = {
  dev: {
    education,
    experience,
    volunteers,
    publications: [],
    certifications,
    achievements,
    gallery,
    skills: skills.filter(([heading]) => heading !== "GIS/ML Modelling"),
    featured,
    securityDisclosures,
    pressCoverage,
  },
  academic: {
    education,
    experience: [],
    volunteers,
    publications,
    certifications,
    achievements,
    gallery,
    skills: [...skills.filter(([heading]) => heading === "GIS/ML Modelling"), ...academicOnlySkills],
    featured,
    securityDisclosures,
    pressCoverage,
  },
};

export function getHomeMetadata(variant: HomeVariant, canonicalPath: HomePath): Metadata {
  const meta = homeVariantContent[variant].metadata;
  const canonicalUrl = `${siteUrl}${canonicalPath === "/" ? "/" : canonicalPath}`;

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
          url:
            variant === "dev"
              ? "/api/og?title=Md%20Minaruzzaman%20Shovon&subtitle=Full-stack%20developer%20focused%20on%20Next.js%2C%20TypeScript%2C%20AI%2C%20GIS%2C%20and%20WordPress%20security&category=DEVELOPER%20PORTFOLIO&badge=FULL%20STACK&badgeColor=%230284c7&badgeBg=%23f0f9ff"
              : "/api/og?title=Md%20Minaruzzaman%20Shovon&subtitle=Water%20resources%20engineering%20at%20CUET%20covering%20hydrology%2C%20GIS%2C%20and%20environmental%20modeling&category=WRE%20RESEARCH%20PORTFOLIO&badge=CUET%20WRE&badgeColor=%230d9488&badgeBg=%23f0fdfa",
          alt: variant === "dev" ? "Developer portfolio of Minaruzzaman Shovon" : "Water resources engineering portfolio of Minaruzzaman Shovon",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      creator: "@sh00von",
      title: meta.ogTitle,
      description: meta.ogDescription,
      images: [
        variant === "dev"
          ? "/api/og?title=Md%20Minaruzzaman%20Shovon&subtitle=Full-stack%20developer%20focused%20on%20Next.js%2C%20TypeScript%2C%20AI%2C%20GIS%2C%20and%20WordPress%20security&category=DEVELOPER%20PORTFOLIO&badge=FULL%20STACK&badgeColor=%230284c7&badgeBg=%23f0f9ff"
          : "/api/og?title=Md%20Minaruzzaman%20Shovon&subtitle=Water%20resources%20engineering%20at%20CUET%20covering%20hydrology%2C%20GIS%2C%20and%20environmental%20modeling&category=WRE%20RESEARCH%20PORTFOLIO&badge=CUET%20WRE&badgeColor=%230d9488&badgeBg=%23f0fdfa",
      ],
    },
  };
}

export function getProfileJsonLd(variant: HomeVariant, pagePath: HomePath) {
  const meta = homeVariantContent[variant].metadata;
  const pageUrl = `${siteUrl}${pagePath === "/" ? "/" : pagePath}`;

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
      image: "https://shovon.bd/shovon.jpg",
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
        name: "Todvob",
        url: "https://todvob.com/",
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

  if (variant === "academic") {
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
      "@graph": [profilePage, ...scholarlyArticles],
    };
  }

  return profilePage;
}

export function resolveHomePath(from?: string): Extract<HomePath, "/dev" | "/academic"> {
  return from === "academic" ? "/academic" : "/dev";
}

export function resolveFromVariant(homePath: HomePath): HomeVariant {
  return homePath === "/academic" ? "academic" : "dev";
}

export function withFromParam(href: string, from?: SharedFrom): string {
  if (!from) return href;

  const separator = href.includes("?") ? "&" : "?";
  return `${href}${separator}from=${from}`;
}
