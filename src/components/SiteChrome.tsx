"use client";

import Link from "next/link";
import { useState } from "react";
import { resolveFromVariant, withFromParam, type HomePath, type SharedFrom } from "@/lib/homeVariants";
import { CommandPalette, CommandPaletteTrigger } from "./CommandPalette";

const defaultNavItems = [
  { anchor: "#experience", label: "Experience" },
  { anchor: "#certifications", label: "Certifications" },
  { href: "/projects", label: "Projects" },
  { href: "/apps", label: "Apps" },
  { href: "/security", label: "Security" },
  { anchor: "#contact", label: "Connect" },
];

export function Navigation({
  active,
  homePath = "/dev",
  fromVariant,
}: {
  active?: "projects" | "apps" | "security";
  homePath?: HomePath;
  fromVariant?: SharedFrom;
}) {
  const [open, setOpen] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const currentVariant = fromVariant ?? resolveFromVariant(homePath);
  const navItems =
    currentVariant === "academic"
      ? [
          { anchor: "#research", label: "Research" },
          defaultNavItems[1],
          defaultNavItems[2],
          defaultNavItems[3],
          defaultNavItems[4],
        ]
      : defaultNavItems;

  return (
    <>
      <nav
        className="sticky top-0 z-40 mx-auto w-full max-w-2xl border-b border-[#e5e5e5] bg-white/90 px-4 py-4 backdrop-blur-md lg:max-w-[60vw] lg:py-5"
        aria-label="Main navigation"
      >
        {/* Issue #8: Skip-to-content link for keyboard/screen reader users */}
        <a
          href="#main-content"
          className="absolute -top-full left-4 z-50 rounded-md bg-white px-4 py-2 text-sm font-medium text-[#111111] shadow focus:top-4 transition-[top]"
        >
          Skip to main content
        </a>
        <div className="flex items-center justify-between">
          <Link
            href={homePath}
            className="font-medium tracking-tight text-[#111111] transition-colors hover:text-[#5c5c5c]"
            aria-label="Home"
          >
            Minaruzzaman Shovon
          </Link>

          <div className="hidden items-center gap-5 text-sm font-medium md:flex">
            {navItems.map((item) => {
              const href =
                "anchor" in item ? `${homePath}${item.anchor}` : withFromParam(item.href, currentVariant);

              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={
                    (active === "projects" && item.label === "Projects") ||
                    (active === "apps" && item.label === "Apps") ||
                    (active === "security" && item.label === "Security")
                      ? "page"
                      : undefined
                  }
                  className={
                    (active === "projects" && item.label === "Projects") ||
                    (active === "apps" && item.label === "Apps") ||
                    (active === "security" && item.label === "Security")
                      ? "border-b-2 border-lime-500 pb-px font-semibold text-[#151515]"
                      : "text-[#5c5c5c] transition-colors hover:text-[#111111]"
                  }
                >
                  {item.label}
                </Link>
              );
            })}

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Md_Minaruzzaman_Shovon_Resume.pdf"
              className="inline-flex items-center gap-1.5 rounded-full border border-[#111111] bg-[#111111] px-3 py-1 text-xs font-semibold text-white shadow-xs transition-all hover:bg-[#333333] hover:shadow-sm"
              title="Download Resume (PDF)"
            >
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Resume</span>
            </a>

            <CommandPaletteTrigger onClick={() => setCmdPaletteOpen(true)} />
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              download="Md_Minaruzzaman_Shovon_Resume.pdf"
              className="inline-flex items-center gap-1 rounded-full bg-[#111111] px-2.5 py-1 text-xs font-semibold text-white"
              title="Download Resume (PDF)"
            >
              <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Resume</span>
            </a>
            <CommandPaletteTrigger onClick={() => setCmdPaletteOpen(true)} />
            <button
            type="button"
            className="theme-toggle inline-flex h-9 w-9 flex-col items-center justify-center gap-1.5 rounded-md border transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            <span
              className="block h-0.5 w-5 bg-current transition-all duration-300"
              style={{ transform: open ? "translateY(8px) rotate(45deg)" : undefined }}
            />
            <span
              className="block h-0.5 w-5 bg-current transition-all duration-300"
              style={{ opacity: open ? 0 : 1 }}
            />
            <span
              className="block h-0.5 w-5 bg-current transition-all duration-300"
              style={{ transform: open ? "translateY(-8px) rotate(-45deg)" : undefined }}
            />
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className="overflow-hidden transition-all duration-300 ease-in-out md:hidden"
        style={{ maxHeight: open ? 260 : 0, opacity: open ? 1 : 0 }}
      >
        <div className="mt-4 flex flex-col gap-4 border-t border-[#e5e5e5] pt-5 pb-2 text-sm font-medium">
          {navItems.map((item) => {
            const href =
              "anchor" in item ? `${homePath}${item.anchor}` : withFromParam(item.href, currentVariant);

            return (
              <Link
                key={href}
                href={href}
                className={
                  (active === "projects" && item.label === "Projects") ||
                  (active === "apps" && item.label === "Apps") ||
                  (active === "security" && item.label === "Security")
                    ? "font-semibold text-[#151515]"
                    : "text-[#5c5c5c] transition-colors hover:text-[#111111]"
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            download="Md_Minaruzzaman_Shovon_Resume.pdf"
            className="inline-flex w-fit items-center gap-2 rounded-lg bg-[#111111] px-4 py-2 text-xs font-semibold text-white"
            onClick={() => {
              setOpen(false);
            }}
          >
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Download Resume (PDF)</span>
          </a>
        </div>
      </div>
    </nav>
    <CommandPalette isOpen={cmdPaletteOpen} onClose={() => setCmdPaletteOpen(false)} />
    </>
  );
}

export function Footer({ backHome = false, homePath = "/dev" }: { backHome?: boolean; homePath?: HomePath }) {
  return (
    <footer className="mx-auto flex w-full max-w-2xl flex-col items-center justify-between px-4 pb-10 text-sm text-[#737373] sm:flex-row lg:max-w-[60vw]">
      <span>&copy; 2026 Minaruzzaman Shovon</span>
      <div className="flex items-center gap-4">
        <a
          href="https://github.com/sh00von/nextjs-developer-portfolio"
          target="_blank"
          rel="noopener noreferrer"
          className="back-link"
        >
          Source / Template
        </a>
        <Link href="/sitemap.xml" className="back-link">
          Sitemap
        </Link>
        {backHome ? (
          <Link href={homePath} className="back-link">
            &larr; Home
          </Link>
        ) : null}
      </div>
    </footer>
  );
}
