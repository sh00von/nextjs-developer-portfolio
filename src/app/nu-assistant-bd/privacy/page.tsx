import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer, Navigation } from "@/components/SiteChrome";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
  title: "Privacy Policy — NU Assistant BD",
  description:
    "Privacy policy for NU Assistant BD, the companion app for National University students. This policy explains what data the app handles, including advertising via Google AdMob.",
  alternates: {
    canonical: "https://shovon.bd/nu-assistant-bd/privacy",
  },
  openGraph: {
    url: "https://shovon.bd/nu-assistant-bd/privacy",
    title: "Privacy Policy — NU Assistant BD",
    description:
      "NU Assistant BD does not collect personal data, but integrates Google AdMob for ads, which may process advertising identifiers.",
    images: ["/og.png"],
  },
  twitter: {
    title: "Privacy Policy — NU Assistant BD",
    description:
      "NU Assistant BD does not collect personal data, but integrates Google AdMob for ads, which may process advertising identifiers.",
    images: ["/og.png"],
  },
};

const LAST_UPDATED = "27 June 2026";
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
        name: "Privacy Policy — NU Assistant BD",
        description:
          "Privacy policy for NU Assistant BD, companion app for National University students.",
        url: "https://shovon.bd/nu-assistant-bd/privacy",
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
            name: "NU Assistant BD",
            item: "https://shovon.bd/apps/nu-assistant-bd",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Privacy Policy",
            item: "https://shovon.bd/nu-assistant-bd/privacy",
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
          Privacy Policy for NU Assistant BD
        </h1>
        <p className="mt-2 text-sm text-[#737373]">Last updated: {LAST_UPDATED}</p>

        <p className="mt-6 text-[#5c5c5c]">
          NU Assistant BD (&ldquo;the app&rdquo;) is an unofficial companion app developed by
          Md Minaruzzaman Shovon for National University (NU) students. This privacy policy
          explains what data the app handles. In short: we do not collect or store any of
          your personal information on our servers, but the app integrates Google AdMob to
          display advertisements.
        </p>

        <Section title="Personal Information">
          <p>
            <strong className="text-[#111111]">We do not collect any personal data.</strong>{" "}
            NU Assistant BD does not require user accounts, sign-ups, or credentials. We do
            not collect or store your name, email, student ID, or any other personal details.
          </p>
        </Section>

        <Section title="Academic Data and Syllabus">
          <p>
            The app allows you to browse subjects, syllabus files, and check results.
            Syllabus resources and result portals are fetched from public official servers,
            and no browsing history, searches, or inputs are sent to us or tracked.
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
            NU Assistant BD is designed for university students and does not knowingly collect
            any personal data from anyone, including children.
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
