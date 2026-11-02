"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { socials } from "@/data/home";
import { resolveFromVariant, withFromParam, type HomePath, type SharedFrom } from "@/lib/homeVariants";
import { CommandPalette, CommandPaletteTrigger } from "./CommandPalette";
import { ArrowUpRight, DownloadIcon, MailIcon, SocialIcon } from "./SocialIcons";

type NavKey = "projects" | "apps" | "security" | "polders" | "blog";

type NavItem = { href?: string; anchor?: string; label: string; key?: NavKey };

const defaultNavItems: NavItem[] = [
  { href: "/projects", label: "Projects", key: "projects" },
  { href: "/apps", label: "Apps", key: "apps" },
  { href: "/security", label: "Security", key: "security" },
  { href: "/blog", label: "Blog", key: "blog" },
  { anchor: "#contact", label: "Contact" },
];

const RESUME_PROPS = {
  href: "/resume.pdf",
  target: "_blank",
  rel: "noopener noreferrer",
  download: "Md_Minaruzzaman_Shovon_Resume.pdf",
} as const;

export function Navigation({
  active,
  homePath = "/",
  fromVariant,
}: {
  active?: NavKey;
  homePath?: HomePath;
  fromVariant?: SharedFrom;
}) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cmdPaletteOpen, setCmdPaletteOpen] = useState(false);
  const currentVariant = fromVariant ?? resolveFromVariant(homePath);
  const navItems: NavItem[] =
    currentVariant === "academic"
      ? [{ anchor: "#research", label: "Research" }, ...defaultNavItems]
      : defaultNavItems;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  const hrefFor = (item: NavItem) =>
    item.anchor ? `${homePath}${item.anchor}` : withFromParam(item.href ?? "/", currentVariant);

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-[background-color,border-color,box-shadow] duration-300 ${
          scrolled || open
            ? "border-b border-[var(--border)] bg-[#fafaf9]/85 shadow-[0_1px_0_rgba(0,0,0,0.02)] backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-[#fafaf9]/0"
        }`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--text)] focus:shadow"
        >
          Skip to main content
        </a>
        <nav className="container-wide flex h-[var(--nav-h)] items-center justify-between gap-4" aria-label="Main navigation">
          <Link href={homePath} className="group flex items-center gap-2.5" aria-label="Minaruzzaman Shovon — Home">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--text)] font-mono text-[13px] font-bold text-[#a3e635] transition-transform group-hover:rotate-[-6deg]">
              MS
            </span>
            <span className="text-[15px] font-semibold tracking-tight text-[var(--text)]">
              Shovon<span className="text-[var(--muted-3)]">.bd</span>
            </span>
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => {
              const isActive = item.key !== undefined && item.key === active;
              return (
                <Link
                  key={item.label}
                  href={hrefFor(item)}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[var(--text)] text-white"
                      : "text-[var(--muted-2)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-2">
            <CommandPaletteTrigger onClick={() => setCmdPaletteOpen(true)} />
            <a {...RESUME_PROPS} className="btn btn-primary hidden !min-h-9 !px-4 !text-[13px] md:inline-flex" title="Download Resume (PDF)">
              <DownloadIcon width={15} height={15} />
              Resume
            </a>
            <button
              type="button"
              className="relative grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] bg-white text-[var(--text)] transition-colors hover:bg-[var(--surface)] md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span
                className="absolute h-[1.5px] w-[18px] rounded bg-current transition-transform duration-300"
                style={{ transform: open ? "rotate(45deg)" : "translateY(-4px)" }}
              />
              <span
                className="absolute h-[1.5px] w-[18px] rounded bg-current transition-transform duration-300"
                style={{ transform: open ? "rotate(-45deg)" : "translateY(4px)" }}
              />
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-[var(--nav-h)] z-40 overflow-y-auto bg-[#fafaf9] transition-[opacity,visibility] duration-300 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="container-wide flex min-h-full flex-col pb-[max(2rem,env(safe-area-inset-bottom))] pt-4">
          <ul className="flex flex-col">
            {[{ label: "Home", href: homePath } as NavItem, ...navItems].map((item, index) => {
              const isActive = item.key !== undefined && item.key === active;
              return (
                <li
                  key={item.label}
                  className="border-b border-[var(--border)] transition-[opacity,transform] duration-500"
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "none" : "translateY(8px)",
                    transitionDelay: open ? `${60 + index * 35}ms` : "0ms",
                  }}
                >
                  <Link
                    href={item.label === "Home" ? homePath : hrefFor(item)}
                    tabIndex={open ? 0 : -1}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-4 text-[26px] font-semibold tracking-tight text-[var(--text)]"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="font-mono text-xs font-medium text-[var(--muted-3)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </span>
                    {isActive ? (
                      <span className="h-2 w-2 rounded-full bg-[#84cc16]" aria-label="Current page" />
                    ) : (
                      <ArrowUpRight className="text-[var(--muted-3)]" width={20} height={20} />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto flex flex-col gap-3 pt-10">
            <div className="grid grid-cols-2 gap-3">
              <a {...RESUME_PROPS} tabIndex={open ? 0 : -1} className="btn btn-primary" onClick={() => setOpen(false)}>
                <DownloadIcon width={16} height={16} />
                Resume
              </a>
              <a href="mailto:hello@shovon.bd" tabIndex={open ? 0 : -1} className="btn btn-secondary">
                <MailIcon width={16} height={16} />
                Email me
              </a>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
              {socials
                .filter(([label]) => label !== "Resume")
                .map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={open ? 0 : -1}
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full border border-[var(--border)] bg-white text-[var(--muted-2)] transition-colors hover:text-[var(--text)]"
                  >
                    <SocialIcon name={label} />
                  </a>
                ))}
            </div>
          </div>
        </div>
      </div>

      <CommandPalette isOpen={cmdPaletteOpen} onClose={() => setCmdPaletteOpen(false)} />
    </>
  );
}

const footerLinks: { title: string; links: [string, string][] }[] = [
  {
    title: "Work",
    links: [
      ["Projects", "/projects"],
      ["Android Apps", "/apps"],
      ["rsray", "/projects/rsray"],
      ["Polders Dataset", "/bwdb-polders"],
    ],
  },
  {
    title: "Research",
    links: [
      ["Security Advisories", "/security"],
      ["Blog", "/blog"],
      ["Academic Profile", "/academic"],
      ["RSS Feed", "/rss.xml"],
    ],
  },
];

export function Footer({ backHome = false, homePath = "/" }: { backHome?: boolean; homePath?: HomePath }) {
  return (
    <footer className="mt-auto border-t border-[var(--border)] bg-white">
      <div className="container-wide grid gap-10 py-12 sm:py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link href={homePath} className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--text)] font-mono text-[13px] font-bold text-[#a3e635]">
              MS
            </span>
            <span className="text-[15px] font-semibold tracking-tight">Md Minaruzzaman Shovon</span>
          </Link>
          <p className="mt-4 text-sm leading-6 text-[var(--muted-2)]">
            Full-stack developer, security researcher and water resources engineer based in Chattogram, Bangladesh.
          </p>
          <a
            href="mailto:hello@shovon.bd"
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--text)] underline decoration-[var(--border-hover)] underline-offset-4 hover:decoration-[var(--text)]"
          >
            <MailIcon width={15} height={15} />
            hello@shovon.bd
          </a>
          <div className="mt-5 flex flex-wrap gap-2">
            {socials
              .filter(([label]) => label !== "Resume")
              .map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  title={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-[var(--border)] text-[var(--muted-2)] transition-colors hover:border-[var(--border-hover)] hover:bg-[var(--surface)] hover:text-[var(--text)]"
                >
                  <SocialIcon name={label} width={16} height={16} />
                </a>
              ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 md:contents">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <p className="font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-[var(--muted-3)]">
                {group.title}
              </p>
              <ul className="mt-4 space-y-3">
                {group.links.map(([label, href]) => (
                  <li key={label}>
                    <Link href={href} className="text-sm text-[var(--muted-2)] transition-colors hover:text-[var(--text)]">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="container-wide flex flex-col items-center justify-between gap-3 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-xs text-[var(--muted-3)] sm:flex-row">
          <span>&copy; {2026} Md Minaruzzaman Shovon. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/sh00von/nextjs-developer-portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="back-link !text-xs"
            >
              Source
            </a>
            <Link href="/sitemap.xml" className="back-link !text-xs">
              Sitemap
            </Link>
            {backHome ? (
              <Link href={homePath} className="back-link !text-xs">
                &larr; Back home
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}
