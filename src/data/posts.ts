import fs from "node:fs";
import path from "node:path";

export const SITE_URL = "https://shovon.bd";

export type Faq = { question: string; answer: string };

export type Post = {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  section: string;
  tags: string[];
  keywords: string[];
  /** Short, self-contained takeaways shown above the article and quoted by AI search. */
  summary: string[];
  faqs?: Faq[];
  /** Site-relative path to the hero/social image. Falls back to a generated OG image. */
  image?: string;
  /** Where the post first appeared, if it was cross-posted. */
  originalUrl?: string;
  relatedApp?: { name: string; href: string; playStoreUrl: string };
  externalLinks?: { label: string; href: string }[];
};

const TUITION_TRACKER_URL = "https://play.google.com/store/apps/details?id=com.attendly.tutor";

export const AUTHOR = {
  "@type": "Person",
  name: "Md Minaruzzaman Shovon",
  url: `${SITE_URL}/dev`,
  sameAs: [
    "https://github.com/sh00von",
    "https://www.linkedin.com/in/minarsvn9090/",
    "https://medium.com/@minar.svn",
    "https://huggingface.co/minar-svn",
    "https://scholar.google.com/citations?user=tht8Z1oAAAAJ&hl=en",
  ],
} as const;

export const posts: Post[] = [
  {
    slug: "typic-open-decision-model",
    title: "I Trained an Open Decision Model on a Free GPU in 46 Minutes. On My Tests, It Beat Laya.",
    description:
      "How I built Typic, an open 400M decision model that answers typed questions in one forward pass. Trained on Kaggle's free T4 in 46 minutes, it scored 69.9% vs Laya's 56.7% on unseen tasks and stayed accurate on 7,000-token inputs.",
    datePublished: "2026-09-24",
    dateModified: "2026-10-01",
    section: "Machine Learning",
    tags: ["Machine Learning", "NLP", "Open Source", "Hugging Face"],
    keywords: [
      "decision model",
      "Typic",
      "typic-bert",
      "Laya",
      "ModernBERT",
      "Ettin encoder",
      "zero-shot classification",
      "LLM routing",
      "prompt injection detection",
      "Kaggle free GPU",
    ],
    summary: [
      "Typic is an open decision model: given a context, a question and a list of options, it returns a calibrated probability for each option in a single forward pass, so there is no text to parse.",
      "It is built on the Ettin-400M encoder and trained on 50,000 heavily augmented examples from 25 public datasets, in 46 minutes on one free Kaggle T4 GPU.",
      "On 2,000 questions from four unseen tasks it scored 69.9% overall vs 56.7% for Laya, with 29 ms vs 37 ms latency.",
      "With up to 7,000 tokens of unrelated text before a request, Typic kept 17–18 of 20 routing answers correct while Laya dropped to 5–6.",
      "Limits: the author chose the tests, it is a single training run, it is English-only, and it needs temperature scaling to match Laya's calibration.",
    ],
    faqs: [
      {
        question: "What is a decision model?",
        answer:
          "A decision model takes a context, a question and a fixed list of allowed answers and returns a probability for each answer in one pass, instead of generating text. Its output is always one of the options you supplied, so there is nothing to parse and no invalid answer.",
      },
      {
        question: "How does Typic compare to Laya?",
        answer:
          "On the same 2,000 questions from four tasks neither model was trained on, Typic scored 69.9% overall vs Laya's 56.7%, tied on Banking77 intent routing (81.2% vs 82.0%), and answered in 29 ms vs 37 ms. Laya is better calibrated out of the box; Typic matches it only after temperature scaling.",
      },
      {
        question: "What hardware was Typic trained on?",
        answer:
          "A single NVIDIA T4 GPU with 16 GB of memory on Kaggle's free tier, using batch size 8 with gradient accumulation and gradient checkpointing. Training took 46 minutes.",
      },
      {
        question: "Where can I download Typic?",
        answer:
          "Typic is released on Hugging Face as minar-svn/typic-bert, with a Gradio demo containing 30 ready-made examples.",
      },
    ],
    image: "/blog/typic/1.png",
    originalUrl:
      "https://medium.com/@minar.svn/i-trained-an-open-decision-model-on-a-free-gpu-in-46-minutes-on-my-tests-it-beat-laya-8bc019fb8701",
    externalLinks: [
      { label: "Model on Hugging Face", href: "https://huggingface.co/minar-svn/typic-bert" },
    ],
  },
  {
    slug: "tutor-attendance-app",
    title: "The Everyday Attendance Problem for Private Tutors",
    description:
      "Why attendance tracking gets messy for home tutors and private teachers, what a good tutor attendance app should include, and how Tuition Tracker: Attendance handles monthly class targets, missed classes, and history.",
    datePublished: "2026-10-01",
    dateModified: "2026-10-01",
    section: "Productivity",
    tags: ["Tutoring", "Attendance", "Android", "Productivity"],
    keywords: [
      "tutor attendance app",
      "student attendance tracker",
      "attendance app for private tutors",
      "home tutor attendance app",
      "tuition tracker",
      "monthly class tracker",
      "Tuition Tracker: Attendance",
    ],
    summary: [
      "Private tutors usually track attendance alone, across notebooks, spreadsheets, calendars and memory, so monthly class counts drift.",
      "The core questions each month are: how many classes are done, how many are left, which were missed, and what happened in past months.",
      "A good tutor attendance app needs per-student monthly targets, weekly schedules, one-tap attendance, a monthly calendar, history, and backup across devices.",
      "Tuition Tracker: Attendance is an Android app built for this workflow, with Days Done / Days Left counts, Month-End History, WhatsApp Quick Connect and Google cloud sync.",
    ],
    faqs: [
      {
        question: "What is Tuition Tracker: Attendance?",
        answer:
          "An Android attendance tracker for home tutors, coaching centers and private teachers. You set a monthly class-day target for each student, mark attendance day by day, and the app counts classes done and classes left.",
      },
      {
        question: "Can I record a missed class?",
        answer:
          "Yes. Each class can be marked Present or Missed with one tap from the home screen, or from the interactive monthly calendar on the student's profile.",
      },
      {
        question: "Will I lose my records if I change phones?",
        answer:
          "No. You sign in with Google and student data is backed up to the cloud and synced across your phone and tablet.",
      },
      {
        question: "What happens at the end of the month?",
        answer:
          "Month-End History lets you close out a student's month and save an attendance snapshot. Past months are archived and stay viewable in the History tab.",
      },
      {
        question: "Can I contact a student or parent from the app?",
        answer:
          "Yes. Quick Connect lets you call or send a WhatsApp message from a student's profile without saving the number to your contacts.",
      },
      {
        question: "Which Android versions are supported?",
        answer: "Android 7.0 and up.",
      },
    ],
    relatedApp: {
      name: "Tuition Tracker: Attendance",
      href: "/apps/attendly-tutor",
      playStoreUrl: TUITION_TRACKER_URL,
    },
  },
  {
    slug: "chittagong-commute-time-map",
    title: "How I Built a Real-Time Commute-Time Map for Chittagong Using Next.js, Mapbox & Turf.js",
    description:
      "A step-by-step walkthrough of building an interactive isochrone map of Chittagong: click anywhere and see where you can drive in 10 to 60 minutes, with Mapbox's Isochrone API, Mapbox GL JS road colouring and Turf.js hover tooltips.",
    datePublished: "2026-05-08",
    dateModified: "2026-10-01",
    section: "Web Development",
    tags: ["GIS", "Next.js", "Mapbox", "Maps"],
    keywords: [
      "isochrone map",
      "commute time map",
      "Chittagong",
      "Chattogram",
      "Mapbox Isochrone API",
      "Mapbox GL JS",
      "Turf.js",
      "Next.js map",
      "drive time map",
    ],
    summary: [
      "The app shows every place reachable by car within 10–60 minutes from any point in Chittagong; clicking or dragging the pin recalculates instantly.",
      "Drive-time polygons come from the Mapbox Isochrone API, fetched client-side as two parallel requests because the API allows at most 4 contours per call.",
      "A GPU-evaluated Mapbox style expression colours bands from yellow (near) to navy (an hour away), and a Roads mode uses the `within` expression to paint travel time onto streets.",
      "Turf.js booleanPointInPolygon powers instant hover tooltips showing the road name and its drive time from the pin.",
      "There is no backend: it deploys statically, using a URL-restricted public Mapbox token.",
    ],
    faqs: [
      {
        question: "What is an isochrone map?",
        answer:
          "An isochrone map shades every area reachable from a starting point within a given travel time. This one shows 10, 20, 30, 40, 50 and 60-minute driving bands from any point you choose in Chittagong.",
      },
      {
        question: "Which tools does the commute map use?",
        answer:
          "Next.js and TypeScript for the app, Mapbox GL JS v3 for rendering, the Mapbox Isochrone API for drive-time polygons, Turf.js v7 for point-in-polygon hover checks, and Tailwind CSS for styling.",
      },
      {
        question: "Why does the app make two isochrone requests?",
        answer:
          "The Mapbox Isochrone API accepts at most 4 contour values per request and the map needs 6 bands, so it sends 10/20/30/40 and 50/60 in parallel with Promise.all, which roughly halves latency vs sequential calls.",
      },
      {
        question: "Where can I try the Chittagong commute map?",
        answer: "The live demo is at maps01.shovon.bd.",
      },
    ],
    image: "/blog/chittagong-commute-map/1.png",
    originalUrl:
      "https://medium.com/@minar.svn/how-i-built-a-real-time-commute-time-map-for-chittagong-using-next-js-mapbox-turf-js-5a687f403b0f",
    externalLinks: [{ label: "Live demo", href: "https://maps01.shovon.bd/" }],
  },
];

export const sortedPosts = [...posts].sort((a, b) =>
  b.datePublished.localeCompare(a.datePublished),
);

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function getPostBody(slug: string) {
  return fs.readFileSync(path.join(process.cwd(), "src/content/blog", `${slug}.md`), "utf8");
}

export function postUrl(post: Post) {
  return `${SITE_URL}/blog/${post.slug}`;
}

export function postImage(post: Post) {
  if (post.image) return `${SITE_URL}${post.image}`;
  return `${SITE_URL}/api/og?title=${encodeURIComponent(post.title)}&subtitle=${encodeURIComponent(post.description)}&category=BLOG&badge=${encodeURIComponent(post.section.toUpperCase())}&badgeColor=%23166534&badgeBg=%23f0fdf4`;
}

export function wordCount(markdown: string) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`|[\]()!-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
}

export function readingMinutes(markdown: string) {
  return Math.max(1, Math.round(wordCount(markdown) / 220));
}

export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[`*_]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

/** Level-2 headings outside code fences, for the table of contents. */
export function getHeadings(markdown: string) {
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, "");
  return [...withoutCode.matchAll(/^## (.+)$/gm)].map((m) => ({
    text: m[1].replace(/[*`]/g, ""),
    id: slugify(m[1]),
  }));
}

/** Absolute-URL markdown for AI agents (Accept: text/markdown and /blog/<slug>.md). */
export function postAsMarkdown(post: Post) {
  const body = getPostBody(post.slug).replace(/\]\(\//g, `](${SITE_URL}/`);
  const parts = [
    `# ${post.title}`,
    "",
    `> ${post.description}`,
    "",
    `- Author: Md Minaruzzaman Shovon (${SITE_URL}/dev)`,
    `- Published: ${post.datePublished}`,
    `- Updated: ${post.dateModified}`,
    `- Canonical URL: ${postUrl(post)}`,
    ...(post.originalUrl ? [`- Originally published: ${post.originalUrl}`] : []),
    "",
    "## Key takeaways",
    "",
    ...post.summary.map((s) => `- ${s}`),
    "",
    body.trim(),
  ];
  if (post.faqs?.length) {
    parts.push("", "## FAQ", "");
    for (const f of post.faqs) parts.push(`### ${f.question}`, "", f.answer, "");
  }
  return parts.join("\n").trim() + "\n";
}
