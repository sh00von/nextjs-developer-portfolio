import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { Footer, Navigation } from "@/components/SiteChrome";

export const metadata: Metadata = {
  robots: { index: true, follow: true },
  title: "Privacy Policy — AvaSOS",
  description:
    "Privacy Policy for AvaSOS, an Android emergency SOS, commute shield, and safe journey personal safety companion. Explains location access, SMS dispatch, local data storage, and zero-ad tracking.",
  alternates: {
    canonical: "https://www.shovon.bd/avasos/privacy",
  },
  openGraph: {
    url: "https://www.shovon.bd/avasos/privacy",
    title: "Privacy Policy — AvaSOS",
    description:
      "AvaSOS is designed with a strict privacy-first architecture. Your contacts and emergency settings stay on your device. Location is only accessed during active safety sessions or SOS dispatch.",
    images: ["/og.png"],
  },
  twitter: {
    title: "Privacy Policy — AvaSOS",
    description:
      "AvaSOS is designed with a strict privacy-first architecture. Your contacts and emergency settings stay on your device. Location is only accessed during active safety sessions or SOS dispatch.",
    images: ["/og.png"],
  },
};

const LAST_UPDATED = "15 October 2026";
const CONTACT_EMAIL = "minar.svn@gmail.com";

function Section({ title, id, children }: { title: string; id?: string; children: ReactNode }) {
  return (
    <section id={id} className="mt-10 scroll-mt-20">
      <h2 className="mb-3 text-lg font-semibold tracking-tight text-[#111111]">{title}</h2>
      <div className="space-y-3.5 text-sm leading-relaxed text-[#5c5c5c]">{children}</div>
    </section>
  );
}

export default function AvaSOSPrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: "Privacy Policy — AvaSOS",
        description:
          "Official privacy policy for AvaSOS Android emergency personal safety application.",
        url: "https://www.shovon.bd/avasos/privacy",
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
          {
            "@type": "ListItem",
            position: 4,
            name: "Privacy Policy",
            item: "https://www.shovon.bd/avasos/privacy",
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

      <main
        id="main-content"
        className="mx-auto w-full max-w-2xl flex-1 px-4 py-12 lg:max-w-[60vw]"
      >
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#e5e5e5] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#E00E60]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#737373]">
                Legal &amp; Compliance
              </span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-[#111111] sm:text-3xl">
              Privacy Policy for AvaSOS
            </h1>
            <p className="mt-1 text-xs text-[#737373]">
              Package: <code className="rounded bg-[#f5f5f5] px-1.5 py-0.5 text-[#111111]">com.avasos.app</code> &middot; Last updated: {LAST_UPDATED}
            </p>
          </div>
          <Link
            href="/avasos"
            className="inline-flex items-center gap-1.5 rounded-md border border-[#e5e5e5] px-3 py-1.5 text-xs font-medium text-[#111111] transition-colors hover:bg-[#f5f5f5]"
          >
            &larr; Back to AvaSOS Overview
          </Link>
        </div>

        {/* Quick summary box */}
        <div className="rounded-lg border border-[#fbcfe8] bg-[#fdf2f8] p-4 text-sm text-[#831843]">
          <h2 className="font-semibold text-[#9d174d] text-base mb-1.5">At a Glance</h2>
          <p className="leading-relaxed">
            AvaSOS is built around a single unwavering principle: <strong className="font-semibold text-[#831843]">your safety should never compromise your privacy</strong>.
            We do not sell data, do not display advertisements, do not track you in secret, and store your emergency contacts exclusively on your physical device. Location data is only accessed when an active safety feature (Commute Shield, Safe Journey, or Emergency SOS) is intentionally engaged by you.
          </p>
        </div>

        <Section title="1. Introduction & Developer Identity" id="introduction">
          <p>
            This Privacy Policy governs your use of the mobile application <strong>AvaSOS</strong> (&ldquo;the Application&rdquo;, &ldquo;the App&rdquo;), developed and maintained by <strong>Md Minaruzzaman Shovon</strong> (&ldquo;we&rdquo;, &ldquo;us&rdquo;, or &ldquo;our&rdquo;).
          </p>
          <p>
            AvaSOS is an offline-ready personal safety companion that enables users to quickly dispatch emergency SOS alerts, share real-time GPS locations with trusted contacts, protect commutes with hands-free shake detection, and monitor safe arrivals via timed watchdog journeys.
          </p>
          <p>
            By downloading, installing, or using AvaSOS, you agree to the collection, processing, and handling of information as described in this policy. If you do not agree, please do not install or use the Application.
          </p>
        </Section>

        <Section title="2. Sensitive Android Permissions & Justifications" id="permissions">
          <p>
            To deliver emergency lifesaving features, AvaSOS requests specific sensitive Android permissions. Each permission is strictly bounded to its safety utility:
          </p>

          <div className="mt-4 space-y-4">
            <div className="rounded-md border border-[#e5e5e5] bg-[#fafafa] p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#111111]">
                  ACCESS_FINE_LOCATION &amp; ACCESS_COARSE_LOCATION
                </span>
                <span className="rounded bg-[#f0fdf4] px-1.5 py-0.5 text-[10px] font-semibold text-[#166534]">
                  Emergency / Safety
                </span>
              </div>
              <p className="mt-2 text-xs text-[#5c5c5c] leading-relaxed">
                <strong>Why we need it:</strong> To capture your precise GPS coordinates at the exact moment of an SOS trigger, or while tracking a Safe Journey / Commute session, and generate a clickable Google Maps link (<code className="rounded bg-white px-1 py-0.5">https://maps.google.com/?q=lat,lng</code>) dispatched to your emergency contacts.
              </p>
              <p className="mt-1.5 text-xs text-[#737373]">
                <strong>Scope:</strong> Location is <em>never</em> recorded continuously in the background without an active session. It is only accessed when an alert is running or when you explicitly start Commute Shield or a Journey timer.
              </p>
            </div>

            <div className="rounded-md border border-[#e5e5e5] bg-[#fafafa] p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#111111]">
                  FOREGROUND_SERVICE &amp; FOREGROUND_SERVICE_LOCATION
                </span>
                <span className="rounded bg-[#f0fdf4] px-1.5 py-0.5 text-[10px] font-semibold text-[#166534]">
                  Background Safety
                </span>
              </div>
              <p className="mt-2 text-xs text-[#5c5c5c] leading-relaxed">
                <strong>Why we need it:</strong> Required by Android to run persistent background services (such as <em>CommuteService</em> and <em>LiveShareService</em>). This ensures that shake detection, timed countdowns, and live location updates remain active even when your screen is locked or another app is open.
              </p>
              <p className="mt-1.5 text-xs text-[#737373]">
                <strong>Transparency:</strong> Whenever a foreground service is running, Android displays an ongoing, persistent notification in your notification tray with quick actions (such as &ldquo;I&apos;m Safe&rdquo; or &ldquo;Extend&rdquo;).
              </p>
            </div>

            <div className="rounded-md border border-[#e5e5e5] bg-[#fafafa] p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#111111]">
                  SEND_SMS
                </span>
                <span className="rounded bg-[#fef2f2] px-1.5 py-0.5 text-[10px] font-semibold text-[#991b1b]">
                  Critical Action
                </span>
              </div>
              <p className="mt-2 text-xs text-[#5c5c5c] leading-relaxed">
                <strong>Why we need it:</strong> To send emergency SMS distress messages containing your custom alert text and live GPS coordinates directly to your chosen trusted emergency contacts during an emergency SOS or when an unconfirmed journey expires.
              </p>
              <p className="mt-1.5 text-xs text-[#737373]">
                <strong>Offline-ready:</strong> SMS operates directly over cellular networks and functions even when mobile data or internet connections are completely unavailable. SMS carrier fees apply according to your standard mobile plan.
              </p>
            </div>

            <div className="rounded-md border border-[#e5e5e5] bg-[#fafafa] p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#111111]">
                  CALL_PHONE
                </span>
                <span className="rounded bg-[#fef2f2] px-1.5 py-0.5 text-[10px] font-semibold text-[#991b1b]">
                  Critical Action
                </span>
              </div>
              <p className="mt-2 text-xs text-[#5c5c5c] leading-relaxed">
                <strong>Why we need it:</strong> To initiate an automatic or one-tap emergency call to your primary emergency contact or local emergency hotline (e.g. 999 or 911) once the SOS countdown finishes.
              </p>
            </div>

            <div className="rounded-md border border-[#e5e5e5] bg-[#fafafa] p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#111111]">
                  READ_CONTACTS
                </span>
                <span className="rounded bg-[#f0fdf4] px-1.5 py-0.5 text-[10px] font-semibold text-[#166534]">
                  Convenience
                </span>
              </div>
              <p className="mt-2 text-xs text-[#5c5c5c] leading-relaxed">
                <strong>Why we need it:</strong> Used exclusively to allow you to select emergency contacts directly from your device address book instead of manually typing phone numbers.
              </p>
              <p className="mt-1.5 text-xs text-[#737373]">
                <strong>Zero Uploads:</strong> Selected contacts are stored solely in your local on-device SQLite database (Room). Your address book is never synced to any remote server or third party.
              </p>
            </div>

            <div className="rounded-md border border-[#e5e5e5] bg-[#fafafa] p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#111111]">
                  READ_PHONE_STATE
                </span>
                <span className="rounded bg-[#f5f5f5] px-1.5 py-0.5 text-[10px] font-semibold text-[#525252]">
                  System Utility
                </span>
              </div>
              <p className="mt-2 text-xs text-[#5c5c5c] leading-relaxed">
                <strong>Why we need it:</strong> Enables dual-SIM detection on multi-SIM phones so you can designate which SIM card sends the emergency SOS SMS. We do not read or collect your IMSI, IMEI, or call history.
              </p>
            </div>

            <div className="rounded-md border border-[#e5e5e5] bg-[#fafafa] p-3.5">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-semibold text-[#111111]">
                  REQUEST_IGNORE_BATTERY_OPTIMIZATIONS &amp; WAKE_LOCK
                </span>
                <span className="rounded bg-[#f5f5f5] px-1.5 py-0.5 text-[10px] font-semibold text-[#525252]">
                  Reliability
                </span>
              </div>
              <p className="mt-2 text-xs text-[#5c5c5c] leading-relaxed">
                <strong>Why we need it:</strong> Prevents aggressive Android Doze mode and manufacturer battery savers from putting the safety watchdog service to sleep while you are traveling alone or in transit.
              </p>
            </div>
          </div>
        </Section>

        <Section title="3. Information We Collect and Process" id="data-collected">
          <p>
            We classify all information handled by AvaSOS into two categories:
          </p>

          <h3 className="mt-4 font-medium text-[#111111]">A. On-Device Data (Never Leaves Your Phone Without SOS Action)</h3>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Emergency Contacts:</strong> Names, phone numbers, and priority ranks of the contacts you choose. Stored strictly in local Room database.
            </li>
            <li>
              <strong>Custom Alert Messages:</strong> The pre-composed text message you choose to send when triggering SOS.
            </li>
            <li>
              <strong>Journey Watchdog Settings:</strong> Destination names, estimated travel durations, check-in reminders, and timer states.
            </li>
            <li>
              <strong>Commute Preferences:</strong> Shake detection sensitivity thresholds and preferred SIM card slot.
            </li>
          </ul>

          <h3 className="mt-4 font-medium text-[#111111]">B. Transmitted Data (During User-Triggered Emergencies)</h3>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <strong>Emergency SOS SMS:</strong> Sent directly through your phone&apos;s SIM card to your selected emergency contacts.
            </li>
            <li>
              <strong>Optional Telegram Alert Relay:</strong> If you configure AvaSOS to broadcast alerts to a Telegram chat, an encrypted HTTPS request containing your alert message and GPS coordinates is dispatched through our secure Cloudflare Worker server relay (<code className="rounded bg-[#f5f5f5] px-1 py-0.5">avasos-server</code>) to the Telegram Bot API. The server does not persist or log your personal identifiable info or message history.
            </li>
          </ul>
        </Section>

        <Section title="4. Diagnostics, Telemetry &amp; Advertising" id="telemetry">
          <p>
            AvaSOS is completely ad-free. We do not use Google AdMob, Unity, AppLovin, or any advertising SDKs.
          </p>
          <p>
            For application stability, we utilize <strong>Google Firebase Crashlytics</strong> and <strong>Firebase Analytics</strong> with the following strict privacy constraints:
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>
              <code className="rounded bg-[#f5f5f5] px-1.5 py-0.5 text-xs text-[#111111]">google_analytics_adid_collection_enabled = false</code>: We explicitly disable collection of Google Advertising ID (Ad ID).
            </li>
            <li>
              <code className="rounded bg-[#f5f5f5] px-1.5 py-0.5 text-xs text-[#111111]">google_analytics_ssaid_collection_enabled = false</code>: Android SSAID collection is disabled.
            </li>
            <li>
              <strong>Zero Emergency Tracking:</strong> Actual emergency triggers, distress messages, coordinates, contact names, and phone numbers are <em>never</em> sent to analytics.
            </li>
            <li>
              <strong>Crash Reports:</strong> Crashlytics receives anonymized stack traces and device hardware specs (e.g., Android version, device model) solely to troubleshoot bugs and crashes.
            </li>
          </ul>
        </Section>

        <Section title="5. Data Retention, Security &amp; User Control" id="security">
          <p>
            <strong>Local Storage:</strong> Because all sensitive user data resides in local sandbox storage on your Android device, you maintain 100% control over it at all times.
          </p>
          <ul className="list-disc pl-5 space-y-1.5">
            <li>You can edit or delete emergency contacts directly in the app at any time.</li>
            <li>Clearing app data via Android Settings (<code className="rounded bg-[#f5f5f5] px-1 py-0.5">Settings &gt; Apps &gt; AvaSOS &gt; Storage &gt; Clear Storage</code>) permanently deletes all saved contacts and configurations.</li>
            <li>Uninstalling AvaSOS permanently purges all local databases and preferences from your device.</li>
          </ul>
          <p className="mt-2">
            <strong>Security:</strong> All network communications with external endpoints (such as the optional Telegram alert relay) utilize industry-standard Transport Layer Security (TLS 1.3 / HTTPS encryption).
          </p>
        </Section>

        <Section title="6. Children&apos;s Privacy" id="children">
          <p>
            AvaSOS is designed for general audiences seeking personal safety tools. We do not knowingly collect, harvest, or solicit any personal information from children under the age of 13. If you believe a child has provided personal information to any third party through our application without parental consent, please contact us immediately so we can investigate and assist.
          </p>
        </Section>

        <Section title="7. Changes to this Privacy Policy" id="changes">
          <p>
            We may revise this Privacy Policy periodically to reflect enhancements in the application, updates in Android OS permission requirements, or regulatory changes. Any modifications will be posted to this page with an updated &ldquo;Last updated&rdquo; timestamp. We encourage you to review this page periodically.
          </p>
        </Section>

        <Section title="8. Contact Information" id="contact">
          <p>
            If you have questions, feedback, or concerns regarding this Privacy Policy or AvaSOS&apos;s handling of your data, please contact the developer:
          </p>
          <div className="mt-3 rounded-md border border-[#e5e5e5] bg-[#fafafa] p-4 text-xs leading-relaxed">
            <p className="font-semibold text-[#111111]">Md Minaruzzaman Shovon</p>
            <p className="text-[#5c5c5c]">Developer of AvaSOS</p>
            <p className="mt-1.5 text-[#5c5c5c]">
              Email:{" "}
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="font-medium text-[#111111] underline underline-offset-4 hover:text-[#E00E60]"
              >
                {CONTACT_EMAIL}
              </a>
            </p>
            <p className="text-[#5c5c5c]">
              Website:{" "}
              <a
                href="https://www.shovon.bd"
                className="font-medium text-[#111111] underline underline-offset-4 hover:text-[#E00E60]"
              >
                https://www.shovon.bd
              </a>
            </p>
          </div>
        </Section>
      </main>

      <Footer backHome homePath="/" />
    </div>
  );
}
