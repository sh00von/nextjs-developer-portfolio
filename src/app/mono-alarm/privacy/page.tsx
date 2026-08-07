import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer, Navigation } from "@/components/SiteChrome";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
  title: "Privacy Policy — Mono Alarm",
  description:
    "Privacy policy for Mono Alarm, a minimalist alarm, timer, and stopwatch app. This policy explains what data the app handles, including advertising via Google AdMob.",
  alternates: {
    canonical: "https://shovon.bd/mono-alarm/privacy",
  },
  openGraph: {
    url: "https://shovon.bd/mono-alarm/privacy",
    title: "Privacy Policy — Mono Alarm",
    description:
      "Mono Alarm does not collect personal data. Alarms and timers stay on your device. The app integrates Google AdMob for ads, which may process advertising identifiers.",
    images: ["/og.png"],
  },
  twitter: {
    title: "Privacy Policy — Mono Alarm",
    description:
      "Mono Alarm does not collect personal data. Alarms and timers stay on your device. The app integrates Google AdMob for ads, which may process advertising identifiers.",
    images: ["/og.png"],
  },
};

const LAST_UPDATED = "1 July 2026";
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
        name: "Privacy Policy — Mono Alarm",
        description:
          "Privacy policy for Mono Alarm, the minimalist alarm, timer, and stopwatch app.",
        url: "https://shovon.bd/mono-alarm/privacy",
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
            name: "Mono Alarm",
            item: "https://shovon.bd/apps/mono-alarm",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Privacy Policy",
            item: "https://shovon.bd/mono-alarm/privacy",
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
          Privacy Policy for Mono Alarm
        </h1>
        <p className="mt-2 text-sm text-[#737373]">Last updated: {LAST_UPDATED}</p>

        <p className="mt-6 text-[#5c5c5c]">
          Mono Alarm (&ldquo;the app&rdquo;) is a minimalist alarm, timer, and stopwatch app
          developed by Md Minaruzzaman Shovon. This privacy policy explains what data the app
          handles. In short: we do not collect or store any of your personal information on our
          servers. All of your alarms, timers, and settings stay on your device. The app
          integrates Google AdMob to display advertisements.
        </p>

        <Section title="Personal Information">
          <p>
            <strong className="text-[#111111]">We do not collect any personal data.</strong>{" "}
            Mono Alarm does not require user accounts, sign-ups, or credentials. We do not
            collect or store your name, email, phone number, or any other personal details.
          </p>
        </Section>

        <Section title="Your Alarms and App Data">
          <p>
            Your alarms, alarm groups, timers, timer presets, stopwatch state, and app settings
            are stored <strong className="text-[#111111]">locally on your device only</strong>.
            This data is never uploaded to us or any third party. Uninstalling the app removes
            this data from your device.
          </p>
        </Section>

        <Section title="Permissions">
          <p>
            To function as an alarm clock, the app requests certain device permissions such as
            scheduling exact alarms, posting notifications, showing full-screen alarm alerts,
            and running a foreground service so alarm and timer tones can play reliably. These
            permissions are used solely to deliver alarms and timers on time. They are not used
            to collect or transmit any personal information.
          </p>
        </Section>

        <Section title="Advertisements (Google AdMob)">
          <p>
            We use Google AdMob to serve advertisements in the app to help fund its development.
            AdMob may collect and process certain data, such as:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your device&apos;s Advertising ID (e.g., Android Ad ID).</li>
            <li>Device information (model, operating system, screen size, carrier).</li>
            <li>IP address (used to estimate general location).</li>
            <li>Ad diagnostic and performance data (to monitor ad deliveries and prevent fraud).</li>
          </ul>
          <p className="mt-2">
            You can manage or reset your Advertising ID or opt out of personalized ads at any
            time through your device&apos;s Google Settings. For more information, please review
            Google&apos;s Privacy Policy at{" "}
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#111111] underline underline-offset-4 hover:text-[#5c5c5c]"
            >
              Google Privacy &amp; Terms
            </a>.
          </p>
        </Section>

        <Section title="Children's Privacy">
          <p>
            Mono Alarm is a general-audience utility app and does not knowingly collect any
            personal data from anyone, including children.
          </p>
        </Section>

        <Section title="Changes to this Policy">
          <p>
            We may update this privacy policy from time to time. Any changes will be
            posted on this page with an updated date.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            If you have any questions about this privacy policy, contact us at{" "}
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-[#111111] underline underline-offset-4 hover:text-[#5c5c5c]"
            >
              {CONTACT_EMAIL}
            </a>
            .
          </p>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
