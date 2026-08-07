import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Footer, Navigation } from "@/components/SiteChrome";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
  title: "Privacy Policy — Chalk",
  description:
    "Privacy policy for Chalk, the infinite blackboard note-taking and mind-mapping app. Chalk stores all data locally on your device and collects no personal information.",
  alternates: {
    canonical: "https://shovon.bd/chalk/privacy",
  },
  openGraph: {
    url: "https://shovon.bd/chalk/privacy",
    title: "Privacy Policy — Chalk",
    description:
      "Chalk stores all your notes locally on your device and collects no personal information.",
    images: ["/og.png"],
  },
  twitter: {
    title: "Privacy Policy — Chalk",
    description:
      "Chalk stores all your notes locally on your device and collects no personal information.",
    images: ["/og.png"],
  },
};

const LAST_UPDATED = "23 June 2026";
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
        name: "Privacy Policy — Chalk",
        description:
          "Privacy policy for Chalk, the infinite blackboard app for notes and mind maps.",
        url: "https://shovon.bd/chalk/privacy",
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
            name: "Chalk",
            item: "https://shovon.bd/apps/chalk",
          },
          {
            "@type": "ListItem",
            position: 4,
            name: "Privacy Policy",
            item: "https://shovon.bd/chalk/privacy",
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
          Privacy Policy for Chalk
        </h1>
        <p className="mt-2 text-sm text-[#737373]">Last updated: {LAST_UPDATED}</p>

        <p className="mt-6 text-[#5c5c5c]">
          Chalk (&ldquo;the app&rdquo;) is a note-taking and mind-mapping app developed by
          Md Minaruzzaman Shovon. This privacy policy explains what data the app handles.
          In short: Chalk keeps everything on your device and does not collect, transmit,
          or share any of your personal information.
        </p>

        <Section title="Data we collect">
          <p>
            <strong className="text-[#111111]">We do not collect any personal data.</strong>{" "}
            Chalk has no user accounts, no sign-up, and no analytics or tracking. The app
            does not send your notes, boards, or any other information to us or to any
            third party.
          </p>
        </Section>

        <Section title="Where your notes are stored">
          <p>
            All boards, notes, checklists, tables, and settings you create are stored{" "}
            <strong className="text-[#111111]">locally on your device only</strong>. They
            are not uploaded to any server or cloud service. If you uninstall the app or
            clear its data, this content is permanently deleted from your device, and we
            cannot recover it.
          </p>
        </Section>

        <Section title="Permissions">
          <p>
            On some Android versions, Chalk requests storage access so you can export a
            board as an image to your device&apos;s gallery. This permission is used only
            when you choose to save an image. Chalk does not read or upload other files on
            your device.
          </p>
        </Section>

        <Section title="Third-party services">
          <p>
            Chalk does not integrate any advertising networks, analytics services, or
            third-party SDKs that collect personal data.
          </p>
        </Section>

        <Section title="Children's privacy">
          <p>
            Chalk does not knowingly collect any data from anyone, including children.
          </p>
        </Section>

        <Section title="Changes to this policy">
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
