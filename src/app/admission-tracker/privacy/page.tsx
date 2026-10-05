import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer, Navigation } from "@/components/SiteChrome";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
  title: "Privacy Policy — Admission Tracker",
  description:
    "Privacy policy for Admission Tracker, the companion app for university aspirants in Bangladesh. Explains data handling, offline storage, and Google AdMob advertising.",
  alternates: {
    canonical: "https://shovon.bd/admission-tracker/privacy",
  },
  openGraph: {
    url: "https://shovon.bd/admission-tracker/privacy",
    title: "Privacy Policy — Admission Tracker",
    description:
      "Admission Tracker does not collect personal data. It uses local storage for your watchlist and integrates Google AdMob for advertising.",
    images: ["/og.png"],
  },
  twitter: {
    title: "Privacy Policy — Admission Tracker",
    description:
      "Admission Tracker does not collect personal data. It uses local storage for your watchlist and integrates Google AdMob for advertising.",
    images: ["/og.png"],
  },
};

const LAST_UPDATED = "5 October 2026";
const CONTACT_EMAIL = "minar.svn@gmail.com";

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-8">
      <h2 className="mb-2 text-lg font-semibold text-[#111111]">{title}</h2>
      <div className="space-y-3 text-[#5c5c5c]">{children}</div>
    </section>
  );
}

export default function PrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Privacy Policy — Admission Tracker",
        description:
          "Privacy policy for Admission Tracker, Android application for university aspirants in Bangladesh.",
        url: "https://shovon.bd/admission-tracker/privacy",
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
            name: "Apps",
            item: "https://shovon.bd/apps",
          },
          {
            "@type": "ListItem",
            position: 3,
            name: "Admission Tracker",
            item: "https://shovon.bd/apps/admission-tracker",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Privacy Policy",
            item: "https://shovon.bd/admission-tracker/privacy",
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
      <Navigation />

      <main
        id="main-content"
        className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 lg:max-w-[60vw]"
      >
        <h1 className="text-2xl font-semibold tracking-tight text-[#111111]">
          Privacy Policy for Admission Tracker
        </h1>
        <p className="mt-2 text-sm text-[#737373]">Last updated: {LAST_UPDATED}</p>

        <p className="mt-6 text-[#5c5c5c]">
          Admission Tracker (&ldquo;the app&rdquo;) is an Android educational application developed by
          Md Minaruzzaman Shovon for college graduates and university admission aspirants across
          Bangladesh. This policy outlines our data handling practices. In brief: we do not collect,
          sell, or store any of your personal identifiable information. The app stores your target
          university preferences locally on your device and integrates Google AdMob for advertising.
        </p>

        <Section title="1. Personal Information Collection">
          <p>
            <strong className="text-[#111111]">We do not collect personal information.</strong>{" "}
            Admission Tracker does not require user registration, social login, account creation, or
            passwords. We do not collect or request your name, phone number, email address, roll
            numbers, or academic certificates.
          </p>
        </Section>

        <Section title="2. Local On-Device Data Storage">
          <p>
            The app features a Target Watchlist and an Application Status checklist to help you
            organize your exams. All bookmark selections, marked applications, and notification
            preferences are stored exclusively on your local device storage using Android Encrypted
            Preferences. This data never leaves your device and is deleted if you clear app storage
            or uninstall the app.
          </p>
        </Section>

        <Section title="3. University Admission Data & Cloud Firestore">
          <p>
            Admission schedules, unit eligibility criteria, exam patterns, and circular notices are
            public academic information sourced from verified official university authorities (e.g.,
            Dhaka University, BUET, Medical DGME, GST Cluster). This information is fetched
            anonymously via Google Cloud Firestore with offline disk caching so countdowns function
            seamlessly offline. No personal queries or search terms are recorded.
          </p>
        </Section>

        <Section title="4. Advertisements (Google AdMob)">
          <p>
            Admission Tracker integrates the Google Mobile Ads SDK (AdMob) to display advertisements
            which support ongoing hosting and database updates. AdMob may collect and process device
            information in accordance with Google&apos;s privacy policies, including:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Google Advertising ID (GAID / AAID).</li>
            <li>Device model, manufacturer, and operating system version.</li>
            <li>General coarse location derived from IP address for geographic relevance.</li>
            <li>Diagnostic, crash, and ad performance metrics to prevent invalid traffic.</li>
          </ul>
          <p className="mt-2">
            You can control or reset your Advertising ID or opt out of personalized interest-based
            ads at any time via your Android device&apos;s settings (
            <em>Settings &rarr; Google &rarr; Ads</em>). For further details on how Google processes
            ad data, visit{" "}
            <a
              href="https://policies.google.com/technologies/ads"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#111111] underline underline-offset-4 hover:text-[#5c5c5c]"
            >
              Google Advertising Privacy &amp; Terms
            </a>
            .
          </p>
        </Section>

        <Section title="5. External University Portals">
          <p>
            The app contains outbound buttons linking directly to official university portals (e.g.,
            teletalk registration gateways, official circular PDFs). When you open these external
            links in your browser, their respective privacy policies and terms of service apply.
          </p>
        </Section>

        <Section title="6. Children's Privacy">
          <p>
            Admission Tracker is designed for higher-secondary students preparing for university
            admissions and does not knowingly collect any personal data from children under the age
            of 13.
          </p>
        </Section>

        <Section title="7. Updates to this Policy">
          <p>
            We may periodically update this Privacy Policy to reflect app enhancements or statutory
            requirements. Revisions will be published on this page with the updated revision date.
          </p>
        </Section>

        <Section title="8. Contact">
          <p>
            If you have any questions, feedback, or concerns regarding this privacy policy or data
            practices, please contact:
          </p>
          <p className="mt-1">
            <strong className="text-[#111111]">Md Minaruzzaman Shovon</strong>
            <br />
            Email:{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#111111] underline underline-offset-4 hover:text-[#5c5c5c]"
            >
              {CONTACT_EMAIL}
            </a>
          </p>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
