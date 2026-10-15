import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Footer, Navigation } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "AvaSOS — Emergency SOS, Commute Shield & Safe Journey Watchdog",
  description:
    "AvaSOS is an offline-ready Android personal safety companion with 1-tap emergency SMS dispatch, real-time GPS sharing, hands-free shake detection, and safe journey watchdog timers.",
  keywords: [
    "AvaSOS",
    "Emergency SOS App",
    "Android Safety App",
    "Personal Safety",
    "Commute Shield",
    "Safe Journey Watchdog",
    "Minaruzzaman Shovon",
    "Kotlin",
    "Jetpack Compose",
  ],
  alternates: {
    canonical: "https://www.shovon.bd/avasos",
  },
  openGraph: {
    url: "https://www.shovon.bd/avasos",
    title: "AvaSOS — Android Emergency SOS & Personal Safety Companion",
    description:
      "Instant SOS dispatch with GPS via SMS, automated emergency calls, hands-free shake detection, and timed safe journey watchdogs. 100% privacy-first and offline-ready.",
    images: ["/images/avasos-icon.png"],
  },
  twitter: {
    card: "summary",
    title: "AvaSOS — Android Emergency SOS & Personal Safety",
    description:
      "Instant SOS dispatch with GPS via SMS, automated emergency calls, hands-free shake detection, and timed safe journey watchdogs. 100% privacy-first.",
    images: ["/images/avasos-icon.png"],
  },
};

const FEATURES = [
  {
    title: "Commute Shield & Shake Detection",
    badge: "Stealth Safety",
    description:
      "Traveling late or in unsafe transit? Commute Shield runs a lightweight foreground service with accelerometer-based shake detection. Trigger an emergency distress alert discreetly without unlocking your phone or looking at the screen.",
    icon: (
      <svg className="h-5 w-5 text-[#E00E60]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    title: "Safe Journey Watchdog Timer",
    badge: "Automated Escalation",
    description:
      "Taking a cab or walking alone? Set an expected arrival duration (e.g., 25 mins). If you don't tap 'Confirm Arrived' before time runs out, AvaSOS automatically notifies your trusted contacts with your last known GPS coordinates.",
    icon: (
      <svg className="h-5 w-5 text-[#E00E60]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    title: "1-Tap SOS with 5s Cancel Grace",
    badge: "False Alarm Prevention",
    description:
      "Press the emergency button to immediately arm the alert system. A 5-second animated countdown with haptic feedback lets you cancel accidental triggers before messages or emergency phone calls are dispatched.",
    icon: (
      <svg className="h-5 w-5 text-[#E00E60]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    title: "Offline Cellular SMS Dispatch",
    badge: "Zero Internet Needed",
    description:
      "Emergencies happen in dead zones. AvaSOS broadcasts your distress text and live Google Maps coordinate link directly via carrier SMS, so you are never stranded if mobile data or Wi-Fi is unavailable.",
    icon: (
      <svg className="h-5 w-5 text-[#E00E60]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    ),
  },
  {
    title: "Persistent Live Share Tracking",
    badge: "Continuous Security",
    description:
      "Once an SOS is triggered, a dedicated foreground service keeps sharing updated location markers until you explicitly press 'I'm Safe'. Even if Android restarts the app process, the session automatically resumes.",
    icon: (
      <svg className="h-5 w-5 text-[#E00E60]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Dual-SIM & Quick Settings Tile",
    badge: "Fast Access",
    description:
      "Arm Commute Shield in a fraction of a second with a dedicated Android Quick Settings Tile in your notification shade. Dual-SIM device owners can explicitly assign which cellular SIM sends emergency SMS.",
    icon: (
      <svg className="h-5 w-5 text-[#E00E60]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    ),
  },
];

const SPECS = [
  { label: "Target Platform", value: "Android (API 24 to 35+)" },
  { label: "Package ID", value: "com.avasos.app" },
  { label: "UI Architecture", value: "Jetpack Compose + Material 3" },
  { label: "Local Database", value: "Android Room (SQLite)" },
  { label: "Background Work", value: "Android Foreground Services" },
  { label: "Alert Channels", value: "Cellular SMS, Phone Dialing, Optional Telegram Bot" },
  { label: "Privacy Rating", value: "100% On-Device Data, Zero Ad Tracking" },
  { label: "Developer", value: "Md Minaruzzaman Shovon" },
];

export default function AvaSOSAppPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareApplication",
        name: "AvaSOS",
        operatingSystem: "Android",
        applicationCategory: "UtilitiesApplication",
        description:
          "AvaSOS is an offline-ready Android personal safety companion with emergency SOS dispatch, real-time GPS sharing, hands-free shake detection, and safe journey watchdog timers.",
        url: "https://www.shovon.bd/avasos",
        author: {
          "@type": "Person",
          name: "Md Minaruzzaman Shovon",
          url: "https://www.shovon.bd/",
        },
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "USD",
        },
        featureList:
          "Emergency SOS, Commute Shield, Shake Detection, Safe Journey Watchdog, Live Share Tracking, Dual-SIM Support, Quick Settings Tile",
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "https://www.shovon.bd/",
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Android Apps",
            item: "https://www.shovon.bd/apps",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "AvaSOS",
            item: "https://www.shovon.bd/avasos",
          },
        ],
      },
    ],
  };

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navigation active="apps" />

      <main id="main-content" className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 lg:max-w-[60vw]">
        <Link href="/apps" className="back-link mb-8 inline-flex text-xs font-medium text-[#737373] hover:text-[#111111]">
          &larr; All Android Apps
        </Link>

        {/* Hero Section */}
        <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center">
          <div className="relative flex h-24 w-24 flex-shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-[#fbcfe8] bg-gradient-to-br from-[#fff1f2] to-[#ffe4e6] shadow-sm">
            <Image
              src="/images/avasos-icon.png"
              alt="AvaSOS App Icon"
              width={96}
              height={96}
              className="h-full w-full object-cover"
              priority
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight text-[#111111]">AvaSOS</h1>
              <span className="inline-block rounded-full border border-[#fbcfe8] bg-[#fdf2f8] px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-[#9d174d]">
                Personal Safety
              </span>
              <span className="inline-block rounded-full border border-[#e5e5e5] bg-[#f5f5f5] px-2 py-0.5 text-[10px] font-medium text-[#525252]">
                Android
              </span>
            </div>
            <p className="mt-2 text-base font-medium text-[#404040]">
              Emergency SOS, Commute Shield &amp; Safe Journey Watchdog
            </p>
            <p className="mt-1 text-xs text-[#737373]">
              Created by Md Minaruzzaman Shovon &middot; Package: <code className="font-mono">com.avasos.app</code>
            </p>
          </div>
        </div>

        {/* Quick actions CTA */}
        <div className="mt-8 flex flex-wrap items-center gap-3 border-y border-[#e5e5e5] py-4">
          <Link
            href="/avasos/privacy"
            className="inline-flex items-center gap-2 rounded-md bg-[#111111] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#333333]"
          >
            <svg className="h-4 w-4 text-[#fda4af]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Read Privacy Policy
          </Link>
          <a
            href="https://github.com/sh00von/AvaSOS"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-[#e5e5e5] px-4 py-2 text-xs font-medium text-[#111111] transition-colors hover:bg-[#f5f5f5]"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            Source on GitHub
          </a>
        </div>

        {/* Overview text */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold tracking-tight text-[#111111]">
            Safety Without Complexity or Compromise
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[#5c5c5c]">
            AvaSOS is built for moments when seconds count and safety cannot rely on stable internet connections, complex menus, or cloud logins. Designed with an offline-first architecture, it empowers users to alert loved ones and emergency contacts through carrier-level SMS messages containing real-time GPS coordinates, initiate automatic calls, and automate transit check-ins.
          </p>
        </section>

        {/* How It Works Workflow */}
        <section className="mt-10">
          <h2 className="mb-4 text-base font-semibold tracking-tight text-[#111111]">
            Emergency Distress Pipeline
          </h2>
          <div className="grid gap-3 sm:grid-cols-4">
            <div className="rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-3.5">
              <span className="font-mono text-[10px] font-bold text-[#E00E60]">01 &middot; TRIGGER</span>
              <h3 className="mt-1 text-xs font-semibold text-[#111111]">1-Tap / Shake</h3>
              <p className="mt-1 text-[11px] text-[#5c5c5c]">
                Launch via app, QS tile, or stealth phone shake in Commute mode.
              </p>
            </div>
            <div className="rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-3.5">
              <span className="font-mono text-[10px] font-bold text-[#E00E60]">02 &middot; GRACE</span>
              <h3 className="mt-1 text-xs font-semibold text-[#111111]">5-Sec Countdown</h3>
              <p className="mt-1 text-[11px] text-[#5c5c5c]">
                Audio &amp; haptic countdown gives you time to cancel accidental triggers.
              </p>
            </div>
            <div className="rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-3.5">
              <span className="font-mono text-[10px] font-bold text-[#E00E60]">03 &middot; DISPATCH</span>
              <h3 className="mt-1 text-xs font-semibold text-[#111111]">SMS + GPS + Call</h3>
              <p className="mt-1 text-[11px] text-[#5c5c5c]">
                Sends SMS with Google Maps coordinates and initiates emergency dialing.
              </p>
            </div>
            <div className="rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-3.5">
              <span className="font-mono text-[10px] font-bold text-[#E00E60]">04 &middot; TRACK</span>
              <h3 className="mt-1 text-xs font-semibold text-[#111111]">Live Share</h3>
              <p className="mt-1 text-[11px] text-[#5c5c5c]">
                Foreground service tracks ongoing movement until you tap &ldquo;I&apos;m Safe&rdquo;.
              </p>
            </div>
          </div>
        </section>

        {/* Feature Cards Grid */}
        <section className="mt-12">
          <h2 className="mb-4 text-base font-semibold tracking-tight text-[#111111]">
            Core Safety Features
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {FEATURES.map((feat) => (
              <div
                key={feat.title}
                className="flex flex-col justify-between rounded-lg border border-[#e5e5e5] bg-white p-4 transition-all hover:border-[#d4d4d4] hover:shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#fff1f2]">
                      {feat.icon}
                    </div>
                    <span className="rounded bg-[#f5f5f5] px-2 py-0.5 text-[10px] font-semibold text-[#525252]">
                      {feat.badge}
                    </span>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-[#111111]">{feat.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-[#5c5c5c]">{feat.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architecture & Tech Specs */}
        <section className="mt-12">
          <h2 className="mb-4 text-base font-semibold tracking-tight text-[#111111]">
            Technical Specifications
          </h2>
          <div className="divide-y divide-[#e5e5e5] rounded-lg border border-[#e5e5e5] bg-[#fafafa] text-xs">
            {SPECS.map((spec) => (
              <div key={spec.label} className="flex items-center justify-between px-4 py-2.5">
                <span className="font-medium text-[#737373]">{spec.label}</span>
                <span className="font-mono text-[#111111]">{spec.value}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Privacy Highlight Banner */}
        <section className="mt-12 rounded-lg border border-[#e5e5e5] bg-[#fafafa] p-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-[#ecfccb] text-[#365314]">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-[#111111]">
                Zero Ad Trackers &middot; Local-Only Storage
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-[#5c5c5c]">
                AvaSOS has no accounts, no subscriptions, and no commercial tracking SDKs. Google Advertising ID collection is disabled at the Android manifest level. Your emergency contacts and personal settings never leave your smartphone without your explicit action.
              </p>
              <div className="mt-3">
                <Link
                  href="/avasos/privacy"
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#E00E60] underline underline-offset-4 hover:text-[#9d174d]"
                >
                  View the full AvaSOS Privacy Policy &rarr;
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer backHome homePath="/" />
    </div>
  );
}
