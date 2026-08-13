export const filters = [
  "all",
  "Engineering",
  "GIS",
  "Full Stack",
  "AI",
  "Cybersecurity",
  "WordPress",
] as const;

export type ProjectCategory = Exclude<(typeof filters)[number], "all">;

export type Project = {
  id: string;
  num: string;
  title: string;
  description: string;
  image: string;
  categories: ProjectCategory[];
  tags: string[];
  link: string;
};

export const projects: Project[] = [
  {
    id: "authryai",
    num: "01",
    title: "AuthryAI",
    description:
      "Premium AI-driven platform for enterprise-grade deepfake detection in text, images, and video using BERT and custom computer vision models.",
    image: "/images/authryai.png",
    categories: ["AI", "Full Stack"] satisfies ProjectCategory[],
    tags: ["Next.js", "Node.js", "Flask", "PostgreSQL", "BERT"],
    link: "https://authryai.com/",
  },
  {
    id: "the-inquilab",
    num: "02",
    title: "The Inquilab",
    description:
      "A verified digital archive preserving testimonies, martyrdom records, and pivotal news events of the July–August 2024 mass uprising in Bangladesh.",
    image: "/images/the_inquilab.png",
    categories: ["Full Stack"] satisfies ProjectCategory[],
    tags: ["Next.js", "Archive", "Public API"],
    link: "https://the-inquilab.vercel.app/",
  },
  {
    id: "ezycite",
    num: "03",
    title: "EzyCite",
    description:
      "AI-powered literature review assistant and reference manager. Search 250M+ papers, generate instant structured AI summaries, map citation networks, and export references.",
    image: "/images/ezycite.png",
    categories: ["AI", "Full Stack"] satisfies ProjectCategory[],
    tags: ["Next.js", "AI", "Academic", "OpenAlex"],
    link: "https://ezycite.vercel.app/",
  },
  {
    id: "replyot",
    num: "04",
    title: "Replyot",
    description:
      "AI sales chatbot for WhatsApp, Instagram, Messenger, and Telegram that responds in seconds, recommends products, and closes orders inside chat.",
    image: "/images/replyot.png",
    categories: ["AI", "Full Stack"] satisfies ProjectCategory[],
    tags: ["AI", "Next.js", "WhatsApp", "Chatbot"],
    link: "https://www.replyot.com/",
  },
  {
    id: "ordify",
    num: "05",
    title: "Ordify Store Builder",
    description:
      "No-code e-commerce platform that turns a Google Sheet into a polished public storefront with direct WhatsApp ordering and zero commission fees.",
    image: "/images/ordify.png",
    categories: ["Full Stack"] satisfies ProjectCategory[],
    tags: ["Next.js", "E-Commerce", "WhatsApp", "No-Code"],
    link: "https://www.ordify.site/",
  },
  {
    id: "hackref",
    num: "06",
    title: "hackref",
    description:
      "CTF reference manual and operations guide featuring 58 technical guides across 9 cybersecurity domains, cheat sheets, and essential tools.",
    image: "/images/hackref.png",
    categories: ["Cybersecurity"] satisfies ProjectCategory[],
    tags: ["Cybersecurity", "CTF", "Security Guides", "Astro"],
    link: "https://hackref.shovon.bd/",
  },
  {
    id: "lst-high-res",
    num: "07",
    title: "1 km resolution LST to 10 m using Sentinel and MODIS",
    description:
      "Downscaling Land Surface Temperature from 1 km (MODIS) to 10 m resolution using Sentinel-2 imagery and GIS processing pipelines.",
    image: "/images/lst_high_res.png",
    categories: ["GIS", "Engineering"] satisfies ProjectCategory[],
    tags: ["GIS", "Remote Sensing", "MODIS", "Sentinel"],
    link: "https://www.linkedin.com/posts/minarsvn9090_from-big-1km-lst-blocks-to-finer-10m-detail-activity-7442260240588443648-xppb",
  },
  {
    id: "truss-solver",
    num: "08",
    title: "Truss Solver",
    description:
      "Structural analysis tool that solves 2D truss problems using the method of joints, with an interactive visual force diagram.",
    image: "/images/truss_solver.png",
    categories: ["Engineering"] satisfies ProjectCategory[],
    tags: ["Structural", "JavaScript", "Engineering"],
    link: "https://www.linkedin.com/posts/minarsvn9090_structuralanalysis-python-fea-activity-7350527946845016065-7MZf",
  },
  {
    id: "exabytebd",
    num: "09",
    title: "ExabyteBD",
    description:
      "Tech platform for Bangladeshi developers providing resources, tools, and community-driven content with a modern full-stack architecture.",
    image: "/images/exabytebd.png",
    categories: ["Full Stack"] satisfies ProjectCategory[],
    tags: ["Next.js", "Full Stack", "MongoDB"],
    link: "https://exabytebd.com/",
  },
  {
    id: "math-solver",
    num: "10",
    title: "Math Solver",
    description:
      "AI-powered solver that parses handwritten math equations and returns step-by-step solutions using a React + Node.js stack.",
    image: "/images/math_solver.png",
    categories: ["AI", "Full Stack"] satisfies ProjectCategory[],
    tags: ["AI", "React", "Node.js"],
    link: "http://logiq.shovon.site/",
  },
  {
    id: "nogorful",
    num: "11",
    title: "Nogorful",
    description: "A fully custom WordPress theme built from scratch for a local news & community portal in Bangladesh.",
    image: "/images/nogorful.png",
    categories: ["WordPress", "Full Stack"] satisfies ProjectCategory[],
    tags: ["WordPress", "PHP", "Custom Theme"],
    link: "https://nogorful.org/",
  },
  {
    id: "barakasbr",
    num: "12",
    title: "BarakasBR",
    description:
      "Full-stack business website built with Next.js, featuring a modern UI, content management, and dynamic pages.",
    image: "/images/barakasbr.png",
    categories: ["Full Stack"] satisfies ProjectCategory[],
    tags: ["Next.js", "Full Stack", "Tailwind CSS"],
    link: "https://www.barakasbr.com/",
  },
  {
    id: "wrro-cuet",
    num: "13",
    title: "WRRO CUET",
    description:
      "Official website for the Water Resources Research Organization at CUET, built with Next.js and MongoDB.",
    image: "/images/wrro_cuet.png",
    categories: ["Full Stack"] satisfies ProjectCategory[],
    tags: ["Next.js", "MongoDB", "Organization"],
    link: "https://www.wrrocuet.org/",
  },
  {
    id: "nextjs-wordpress-starter",
    num: "14",
    title: "Next.js WordPress Starter",
    description:
      "An open-source starter template that connects Next.js with WordPress as a headless CMS for blazing-fast sites.",
    image: "/images/next_wordpress_starter.png",
    categories: ["WordPress", "Full Stack"] satisfies ProjectCategory[],
    tags: ["Next.js", "WordPress", "Headless CMS"],
    link: "https://next-wordpress-starter-kappa.vercel.app/",
  },
] as const;
