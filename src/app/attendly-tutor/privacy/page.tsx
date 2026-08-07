import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer, Navigation } from "@/components/SiteChrome";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
  title: "Privacy Policy — Attendly Tutor",
  description:
    "Privacy policy for Attendly Tutor, the offline attendance tracker for private tutors. Attendly Tutor stores all data locally on your device and collects no personal information.",
  alternates: {
    canonical: "https://shovon.bd/attendly-tutor/privacy",
  },
  openGraph: {
    url: "https://shovon.bd/attendly-tutor/privacy",
    title: "Privacy Policy — Attendly Tutor",
    description:
      "Attendly Tutor stores all your student and attendance data locally on your device and collects no personal information.",
    images: ["/og.png"],
  },
  twitter: {
    title: "Privacy Policy — Attendly Tutor",
    description:
      "Attendly Tutor stores all your student and attendance data locally on your device and collects no personal information.",
    images: ["/og.png"],
  },
};

const LAST_UPDATED = "30 June 2026";
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
        name: "Privacy Policy — Attendly Tutor",
        description:
          "Privacy policy for Attendly Tutor, the offline attendance tracker for private tutors.",
        url: "https://shovon.bd/attendly-tutor/privacy",
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
            name: "Attendly Tutor",
            item: "https://shovon.bd/apps/attendly-tutor",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Privacy Policy",
            item: "https://shovon.bd/attendly-tutor/privacy",
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
          Privacy Policy for Attendly Tutor
        </h1>
        <p className="mt-2 text-sm text-[#737373]">Last updated: {LAST_UPDATED}</p>

        <p className="mt-6 text-[#5c5c5c]">
          Attendly Tutor (&ldquo;the app&rdquo;) is an attendance and class-day tracker for
          private tutors, developed by Md Minaruzzaman Shovon. This privacy policy explains
          what data the app handles. In short: Attendly Tutor keeps everything on your device
          and does not collect, transmit, or share any of your personal information.
        </p>

        <Section title="Data we collect">
          <p>
            <strong className="text-[#111111]">We do not collect any personal data.</strong>{" "}
            Attendly Tutor has no user accounts, no sign-up, and no analytics or tracking. The
            app does not send your students, schedules, attendance records, or any other
            information to us or to any third party.
          </p>
        </Section>

        <Section title="Where your data is stored">
          <p>
            All student details, class schedules, attendance records, and month history you
            create are stored{" "}
            <strong className="text-[#111111]">locally on your device only</strong>. They are
            not uploaded to any server or cloud service. If you uninstall the app or clear its
            data, this content is permanently deleted from your device, and we cannot recover
            it.
          </p>
        </Section>

        <Section title="Permissions">
          <p>
            Attendly Tutor requests permission to show notifications so it can send you an
            optional daily reminder of the students you teach that day. These reminders are
            generated entirely on your device. You can decline or disable this permission at
            any time, and the rest of the app will continue to work normally. The app does not
            use the camera, microphone, contacts, location, or your files.
          </p>
        </Section>

        <Section title="Third-party services">
          <p>
            Attendly Tutor does not integrate any advertising networks, analytics services, or
            third-party SDKs that collect personal data.
          </p>
        </Section>

        <Section title="Children's privacy">
          <p>
            Attendly Tutor does not knowingly collect any data from anyone, including children.
          </p>
        </Section>

        <Section title="Changes to this policy">
          <p>
            We may update this privacy policy from time to time. Any changes will be posted on
            this page with an updated date.
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
