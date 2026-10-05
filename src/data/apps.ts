export type AppCategory = "Productivity" | "Utilities" | "Education" | "Tools";

export type AppStatus = "Live" | "Beta" | "Archived";

export type App = {
  slug: string;
  num: string;
  name: string;
  tagline: string;
  description: string;
  category: AppCategory;
  tags: string[];
  playStoreId?: string;
  playStoreUrl?: string;
  privacyUrl?: string;
  status: AppStatus;
  features: string[];
  tech: string[];
};

export const apps: App[] = [
  {
    slug: "attendly-tutor",
    num: "01",
    name: "Attendly Tutor",
    tagline: "Offline attendance tracker for private tutors",
    description:
      "Attendly Tutor is a clean, offline-first attendance and class-day tracker built for private tutors. Manage your students, record attendance, and get daily reminders — all stored locally on your device with no accounts, no cloud, and no data collection.",
    category: "Productivity",
    tags: ["Android", "Offline", "Education", "Kotlin"],
    playStoreId: "com.attendly.tutor",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.attendly.tutor",
    privacyUrl: "/attendly-tutor/privacy",
    status: "Live",
    features: [
      "Track attendance for multiple students and class days",
      "Daily reminders showing which students you teach that day",
      "View full month-by-month attendance history",
      "100% offline — no internet required",
      "No accounts, no sign-up, no data collection",
    ],
    tech: ["Android", "Kotlin", "Room DB", "Jetpack Compose"],
  },
  {
    slug: "mono-alarm",
    num: "02",
    name: "Mono Alarm",
    tagline: "Minimalist alarm, timer & stopwatch",
    description:
      "Mono Alarm is a distraction-free alarm, timer, and stopwatch app with a sharp minimal interface. No fluff — just reliable alarms and timers that work. Alarm groups, timer presets, and a full-screen wake-up alert are all included.",
    category: "Utilities",
    tags: ["Android", "Alarm", "Minimalist", "Kotlin"],
    playStoreId: "com.mono.alarm",
    privacyUrl: "/mono-alarm/privacy",
    status: "Live",
    features: [
      "Create and group alarms for flexible scheduling",
      "Countdown timer with reusable presets",
      "Precise stopwatch with lap support",
      "Full-screen alarm alert that wakes your screen",
      "Reliable foreground service so alarms fire on time",
    ],
    tech: ["Android", "Kotlin", "Jetpack Compose", "AdMob"],
  },
  {
    slug: "nu-assistant-bd",
    num: "03",
    name: "NU Assistant BD",
    tagline: "Companion app for National University students",
    description:
      "NU Assistant BD is an unofficial companion for students of National University (NU), Bangladesh. Browse your syllabus, check results, and access official resources — all in one place without hunting through multiple websites.",
    category: "Education",
    tags: ["Android", "Education", "Bangladesh", "Kotlin"],
    playStoreId: "com.nu.assistant.bd",
    privacyUrl: "/nu-assistant-bd/privacy",
    status: "Live",
    features: [
      "Browse subjects and syllabus files by department",
      "Direct access to NU result portals",
      "Offline-friendly for areas with poor connectivity",
      "No login or personal data required",
    ],
    tech: ["Android", "Kotlin", "AdMob"],
  },
  {
    slug: "chalk",
    num: "04",
    name: "Chalk",
    tagline: "Infinite blackboard for notes & mind maps",
    description:
      "Chalk is an infinite canvas note-taking and mind-mapping app that feels like writing on a real blackboard. Sketch ideas freely, draw diagrams, or jot notes — all stored locally on your device with no sync, no subscription, and no tracking.",
    category: "Productivity",
    tags: ["Android", "Notes", "Canvas", "Kotlin"],
    privacyUrl: "/chalk/privacy",
    status: "Live",
    features: [
      "Infinite scrollable canvas for free-form drawing and notes",
      "Mind map and diagram support",
      "Smooth stylus and touch input",
      "All notes saved locally — works fully offline",
      "No accounts or subscriptions",
    ],
    tech: ["Android", "Kotlin", "Canvas API", "Jetpack Compose"],
  },
  {
    slug: "admission-tracker",
    num: "05",
    name: "Admission Tracker",
    tagline: "Live countdowns, schedules & circulars for university admissions",
    description:
      "Admission Tracker is an all-in-one companion for Bangladeshi university admission seekers. Features real-time countdown clocks, application & admit card schedules, direct official circular links, and an on-device personal watchlist.",
    category: "Education",
    tags: ["Android", "University Admission", "Bangladesh", "Kotlin", "Jetpack Compose"],
    playStoreId: "com.admissiontracker.app",
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.admissiontracker.app",
    privacyUrl: "/admission-tracker/privacy",
    status: "Beta",
    features: [
      "Real-time countdown stopwatches ticking down to exam dates and application deadlines",
      "Unit-wise breakdown for Engineering, Medical, General, Agri, and Science & Tech universities",
      "Direct verified links to official admission circulars, portals, admit cards, and results",
      "Personalized on-device watchlist with application checklist tracking",
      "Offline persistence with automatic Cloud Firestore synchronization",
    ],
    tech: ["Android", "Kotlin", "Jetpack Compose", "Cloud Firestore", "AdMob"],
  },
];
