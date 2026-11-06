import Image from "next/image";
import Link from "next/link";
import { cves } from "@/data/cves";

/**
 * Official plugin logos, served from the wordpress.org plugin asset CDN
 * (ps.w.org) and, for AI Builder, the vendor site — the plugin has no
 * wordpress.org icon. Local files are not used: binary assets cannot be
 * pushed through the GitHub snapshot flow.
 */
const LOGO_BY_PLUGIN: Record<string, string> = {
  Depicter: "https://ps.w.org/depicter/assets/icon-128x128.gif",
  "Post Duplicator": "https://ps.w.org/post-duplicator/assets/icon-128x128.png",
  "Bold Page Builder": "https://ps.w.org/bold-page-builder/assets/icon-256x256.png",
  Wappointment: "https://ps.w.org/wappointment/assets/icon-256x256.gif",
  "AI Builder": "https://website-ai-builder.com/wp-content/uploads/2025/09/cropped-original-192x192.png",
  WPComplete: "https://ps.w.org/wpcomplete/assets/icon-256x256.png",
  HappyForms: "https://ps.w.org/happyforms/assets/icon-256x256.png",
  GeekyBot: "https://ps.w.org/geeky-bot/assets/icon.svg",
  "Event Tickets": "https://ps.w.org/event-tickets/assets/icon.svg",
  Timetics: "https://ps.w.org/timetics/assets/icon-128x128.gif",
  "Booking Package": "https://ps.w.org/booking-package/assets/icon-128x128.png",
  "Five Star Restaurant Reservations": "https://ps.w.org/restaurant-reservations/assets/icon-128x128.png",
  "Quiz and Survey Master": "https://ps.w.org/quiz-master-next/assets/icon-128x128.png",
};

type PluginLogo = { plugin: string; href: string; logo: string; cveId: string };

function pluginLogos(): PluginLogo[] {
  const seen = new Map<string, PluginLogo>();
  for (const cve of cves) {
    const logo = LOGO_BY_PLUGIN[cve.plugin];
    if (logo && !seen.has(cve.plugin)) {
      seen.set(cve.plugin, { plugin: cve.plugin, href: cve.href, logo, cveId: cve.id });
    }
  }
  return [...seen.values()];
}

function LogoRow({ hidden }: { hidden?: boolean }) {
  return (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-12 pr-12">
      {pluginLogos().map((item) => (
        <li key={item.plugin} className="shrink-0">
          <Link
            href={item.href}
            title={`${item.plugin} — ${item.cveId}`}
            className="flex items-center gap-3 opacity-75 transition-opacity hover:opacity-100"
          >
            <Image
              src={item.logo}
              alt={`${item.plugin} logo`}
              width={144}
              height={48}
              unoptimized
              className="h-9 w-auto object-contain"
            />
            <span className="whitespace-nowrap text-sm font-medium text-[var(--text)]">{item.plugin}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

/** Infinite-scrolling strip of the WordPress plugin logos with published CVE advisories. */
export function PluginLogoMarquee() {
  if (!pluginLogos().length) return null;
  return (
    <div
      className="marquee overflow-hidden border-t border-[var(--border)] py-8 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      aria-label="WordPress plugins with published CVE advisories"
    >
      <div className="animate-marquee flex w-max">
        <LogoRow />
        <LogoRow hidden />
      </div>
    </div>
  );
}
