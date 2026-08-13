"use client";

import { useEffect, useState, useRef, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";

type CommandItemData = {
  id: string;
  title: string;
  subtitle?: string;
  category: "Navigation" | "Security Disclosures" | "Android Apps" | "Projects" | "Quick Actions";
  badge?: string;
  target: string;
  isExternal?: boolean;
  isAction?: boolean;
};

const COMMAND_ITEMS: CommandItemData[] = [
  // Quick Actions & Downloads
  {
    id: "action-resume",
    title: "Download Resume (PDF)",
    subtitle: "Md Minaruzzaman Shovon's CV • Software Engineer & Security Researcher",
    category: "Navigation",
    badge: "PDF",
    target: "/resume.pdf",
  },
  // Navigation
  {
    id: "nav-dev",
    title: "Developer Portfolio",
    subtitle: "Next.js, TypeScript, UI Engineering & GIS",
    category: "Navigation",
    badge: "/dev",
    target: "/dev",
  },
  {
    id: "nav-academic",
    title: "Water Resources Engineering Portfolio",
    subtitle: "CUET hydrology, river analysis & environmental research",
    category: "Navigation",
    badge: "/academic",
    target: "/academic",
  },
  {
    id: "nav-security",
    title: "Security Advisories & Research",
    subtitle: "CVE disclosures and WordPress security fixes",
    category: "Navigation",
    badge: "/security",
    target: "/security",
  },
  {
    id: "nav-apps",
    title: "Android Apps Directory",
    subtitle: "Offline-first tools published on Google Play Store",
    category: "Navigation",
    badge: "/apps",
    target: "/apps",
  },
  {
    id: "nav-projects",
    title: "Projects & Portfolio Showcase",
    subtitle: "Full-stack, AI, and GIS spatial modeling applications",
    category: "Navigation",
    badge: "/projects",
    target: "/projects",
  },
  {
    id: "nav-polders",
    title: "BWDB Coastal Polders GIS & GEE Hub",
    subtitle: "Open-access 162 polders dataset, GEE Asset & Shapefile downloads",
    category: "Navigation",
    badge: "Dataset",
    target: "/bwdb-polders",
  },

  // Security Disclosures
  {
    id: "cve-15048",
    title: "CVE-2026-15048 — GeekyBot Unauthenticated Sensitive Info Exposure",
    subtitle: "Medium 5.3 CVSS • Chat history session metadata exposure in GeekyBot < 1.2.8",
    category: "Security Disclosures",
    badge: "CVE",
    target: "/security/cve-2026-15048",
  },
  {
    id: "cve-14322",
    title: "CVE-2026-14322 — Timetics Unauthenticated Booking Auto-Approval",
    subtitle: "Medium 5.3 CVSS • Broken Access Control vulnerability in Timetics < 1.0.57",
    category: "Security Disclosures",
    badge: "CVE",
    target: "/security/cve-2026-14322",
  },
  {
    id: "cve-10749",
    title: "CVE-2026-10749 — Post Duplicator PHP Object Injection",
    subtitle: "High 7.2 CVSS • PHP Object Injection vulnerability in Post Duplicator ≤ 3.0.14",
    category: "Security Disclosures",
    badge: "CVE",
    target: "/security/cve-2026-10749",
  },
  {
    id: "cve-57661",
    title: "CVE-2026-57661 — WPComplete Broken Access Control",
    subtitle: "Medium 5.4 CVSS • Subscriber privilege escalation vulnerability in WPComplete ≤ 2.9.5.5",
    category: "Security Disclosures",
    badge: "CVE",
    target: "/security/cve-2026-57661",
  },
  {
    id: "cve-14821",
    title: "CVE-2026-14821 — Quiz and Survey Master Missing Authorization",
    subtitle: "Low 2.7 CVSS • Arbitrary output template deletion in QSM < 11.1.5",
    category: "Security Disclosures",
    badge: "CVE",
    target: "/security/cve-2026-14821",
  },
  {
    id: "mappress",
    title: "MapPress Maps 2.97.2 Security Assistance Credit",
    subtitle: "Changelog recognition: 'Thanks to https://shovon.bd for security assistance in 2.97'",
    category: "Security Disclosures",
    badge: "Credit",
    target: "https://wordpress.org/plugins/mappress-google-maps-for-wordpress/#developers",
    isExternal: true,
  },

  // Android Apps
  {
    id: "app-attendly",
    title: "Attendly Tutor",
    subtitle: "Offline-first attendance management for tutors & educators",
    category: "Android Apps",
    badge: "Play Store",
    target: "/apps/attendly-tutor",
  },
  {
    id: "app-mono",
    title: "Mono Alarm",
    subtitle: "Minimalist alarm & timer utility with customizable wake triggers",
    category: "Android Apps",
    badge: "Play Store",
    target: "/apps/mono-alarm",
  },
  {
    id: "app-nu",
    title: "NU Assistant BD",
    subtitle: "National University Bangladesh GPA calculator & result parser",
    category: "Android Apps",
    badge: "Play Store",
    target: "/apps/nu-assistant-bd",
  },
  {
    id: "app-chalk",
    title: "Chalk",
    subtitle: "Distraction-free canvas drawing app for sketches & quick notes",
    category: "Android Apps",
    badge: "Play Store",
    target: "/apps/chalk",
  },

  // Projects
  {
    id: "proj-inquilab",
    title: "The Inquilab — Open Source Protest Archive & API",
    subtitle: "Featured in The Daily Star • Historical archive & API of July 2024 revolution",
    category: "Projects",
    badge: "Featured",
    target: "https://www.thedailystar.net/tech-startup/news/digital-resistance-websites-kept-the-revolution-alive-3677231",
    isExternal: true,
  },

  // Quick Actions
  {
    id: "act-email",
    title: "Copy Email Address",
    subtitle: "hello@shovon.bd",
    category: "Quick Actions",
    badge: "Action",
    target: "hello@shovon.bd",
    isAction: true,
  },
  {
    id: "act-github",
    title: "Open GitHub Profile",
    subtitle: "github.com/sh00von",
    category: "Quick Actions",
    badge: "External",
    target: "https://github.com/sh00von",
    isExternal: true,
  },
  {
    id: "act-patchstack",
    title: "Open Patchstack Security Profile",
    subtitle: "vdp.patchstack.com/database/researchers/...",
    category: "Quick Actions",
    badge: "External",
    target: "https://vdp.patchstack.com/database/researchers/093a22ad-bf3b-4fd3-96cf-9e6cef3eb7db",
    isExternal: true,
  },
  {
    id: "act-rss",
    title: "View RSS Security Feed",
    subtitle: "/rss.xml",
    category: "Quick Actions",
    badge: "RSS",
    target: "/rss.xml",
    isExternal: true,
  },
  {
    id: "act-resume",
    title: "Download Resume / CV (PDF)",
    subtitle: "/resume.pdf",
    category: "Quick Actions",
    badge: "PDF",
    target: "/resume.pdf",
    isExternal: true,
  },
  {
    id: "act-llm",
    title: "View LLM / AI Summary",
    subtitle: "/llms.txt",
    category: "Quick Actions",
    badge: "AI",
    target: "/llms.txt",
    isExternal: true,
  },
];

export function CommandPaletteTrigger({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg border border-[#e5e5e5] bg-[#f5f5f5] px-2.5 py-1.5 text-xs font-medium text-[#5c5c5c] transition-colors hover:border-[#d4d4d4] hover:bg-white hover:text-[#111111]"
      aria-label="Open Command Palette (Cmd + K)"
    >
      <svg
        className="h-3.5 w-3.5 text-[#737373]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <span className="hidden sm:inline">Search...</span>
      <kbd className="hidden rounded border border-[#d4d4d4] bg-white px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#737373] sm:inline-block">
        ⌘K
      </kbd>
    </button>
  );
}

export function CommandPalette({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => inputRef.current?.focus());
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const executeItem = useCallback(
    (item: CommandItemData) => {
      onClose();
      if (item.isAction) {
        navigator.clipboard.writeText(item.target);
        setCopiedText("Email copied!");
        setTimeout(() => setCopiedText(null), 1000);
      } else if (item.isExternal) {
        window.open(item.target, "_blank", "noopener,noreferrer");
      } else {
        router.push(item.target);
      }
    },
    [onClose, router]
  );

  // Fast Memoized Filtering
  const filteredItems = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return COMMAND_ITEMS;
    return COMMAND_ITEMS.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
        item.category.toLowerCase().includes(q)
    );
  }, [query]);

  // Group by category efficiently
  const groupedCategories = useMemo(() => {
    const groups: { category: string; items: { item: CommandItemData; flatIndex: number }[] }[] = [];
    const catMap = new Map<string, { item: CommandItemData; flatIndex: number }[]>();

    filteredItems.forEach((item, index) => {
      if (!catMap.has(item.category)) {
        catMap.set(item.category, []);
      }
      catMap.get(item.category)!.push({ item, flatIndex: index });
    });

    catMap.forEach((items, category) => {
      groups.push({ category, items });
    });

    return groups;
  }, [filteredItems]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter" && filteredItems[selectedIndex]) {
      e.preventDefault();
      executeItem(filteredItems[selectedIndex]);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-xl overflow-hidden rounded-xl border border-[#e5e5e5] bg-white shadow-2xl transition-all dark:border-[#27272a] dark:bg-[#09090b]">
        {/* Search input header */}
        <div className="flex items-center border-b border-[#e5e5e5] px-4 dark:border-[#27272a]">
          <svg
            className="h-5 w-5 text-[#737373]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Search CVEs, apps, research, projects, links..."
            className="w-full bg-transparent px-3 py-4 text-sm text-[#111111] outline-none placeholder:text-[#737373] dark:text-[#f4f4f5]"
          />
          {copiedText ? (
            <span className="rounded bg-[#22c55e]/10 px-2 py-1 text-xs font-semibold text-[#166534] dark:text-[#4ade80]">
              {copiedText}
            </span>
          ) : (
            <kbd className="rounded border border-[#e5e5e5] bg-[#f5f5f5] px-1.5 py-0.5 font-mono text-[10px] font-semibold text-[#737373] dark:border-[#27272a] dark:bg-[#18181b]">
              ESC
            </kbd>
          )}
        </div>

        {/* Results list */}
        <div className="max-h-96 overflow-y-auto p-2">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#737373]">
              No matching results found for &quot;{query}&quot;.
            </div>
          ) : (
            groupedCategories.map((group) => (
              <div key={group.category} className="mb-2">
                <div className="px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#737373]">
                  {group.category}
                </div>
                {group.items.map(({ item, flatIndex }) => {
                  const isSelected = flatIndex === selectedIndex;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => executeItem(item)}
                      onMouseEnter={() => setSelectedIndex(flatIndex)}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                        isSelected
                          ? "bg-[#f5f5f5] text-[#111111] dark:bg-[#18181b] dark:text-[#ffffff]"
                          : "text-[#3d3d3d] hover:bg-[#fafafa] dark:text-[#a1a1aa] dark:hover:bg-[#121215]"
                      }`}
                    >
                      <div className="flex flex-col pr-2">
                        <span className="font-medium text-[#111111] dark:text-[#f4f4f5]">
                          {item.title}
                        </span>
                        {item.subtitle ? (
                          <span className="text-xs text-[#737373] dark:text-[#71717a]">
                            {item.subtitle}
                          </span>
                        ) : null}
                      </div>

                      {item.badge ? (
                        <span className="flex-shrink-0 rounded border border-[#e5e5e5] bg-white px-2 py-0.5 font-mono text-[10px] font-semibold text-[#5c5c5c] dark:border-[#27272a] dark:bg-[#18181b] dark:text-[#a1a1aa]">
                          {item.badge}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer shortcuts */}
        <div className="flex items-center justify-between border-t border-[#e5e5e5] bg-[#fafafa] px-4 py-2 text-xs text-[#737373] dark:border-[#27272a] dark:bg-[#121215]">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="font-mono">↑</kbd> <kbd className="font-mono">↓</kbd> to navigate
            </span>
            <span>
              <kbd className="font-mono">↵</kbd> to select
            </span>
          </div>
          <span>shovon.bd</span>
        </div>
      </div>
    </div>
  );
}
