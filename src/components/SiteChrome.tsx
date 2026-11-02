"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { socials } from "@/data/home";
import { resolveFromVariant, withFromParam, type HomePath, type SharedFrom } from "@/lib/homeVariants";
import { CommandPalette, CommandPaletteTrigger } from "./CommandPalette";
import { ArrowUpRight, DownloadIcon, MailIcon } from "./SocialIcons";

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
        className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
          scrolled || open
            ? "border-b border-[var(--border)] bg-white/80 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-white"
        }`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-[var(--text)] focus:shadow"
        >
          Skip to main content
        </a>
        <nav className="container-wide flex h-[var(--nav-h)] items-center justify-between gap-4" aria-label="Main navigation">
          <Link
            href={homePath}
            className="text-[15px] font-semibold tracking-tight text-[var(--text)]"
            aria-label="Minaruzzaman Shovon — Home"
          >
            Shovon<span className="text-[var(--accent)]">.</span>
          </Link>

          <div className="flex items-center gap-1 sm:gap-2">
            <ul className="hidden items-center gap-7 md:flex">
              {navItems.map((item) => {
                const isActive = item.key !== undefined && item.key === active;
                return (
                  <li key={item.label}>
                    <Link
                      href={hrefFor(item)}
                      aria-current={isActive ? "page" : undefined}
                      className={`text-sm transition-colors ${
                        isActive ? "font-medium text-[var(--text)]" : "text-[var(--muted-3)] hover:text-[var(--text)]"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <span className="mx-4 hidden h-4 w-px bg-[var(--border)] md:block" aria-hidden="true" />
            <CommandPaletteTrigger onClick={() => setCmdPaletteOpen(true)} />
            <a
              {...RESUME_PROPS}
              className="hidden text-sm font-medium text-[var(--text)] underline decoration-[var(--border-hover)] underline-offset-4 transition-colors hover:decoration-[var(--text)] md:ml-3 md:inline"
              title="Download Resume (PDF)"
            >
              Resume
            </a>
            <button
              type="button"
              className="relative grid h-10 w-10 place-items-center rounded-full text-[var(--text)] md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((value) => !value)}
            >
              <span
                className="absolute h-[1.5px] w-[18px] rounded bg-current transition-transform duration-300"
                style={{ transform: open ? "rotate(45deg)" : "translateY(-3.5px)" }}
              />
              <span
                className="absolute h-[1.5px] w-[18px] rounded bg-current transition-transform duration-300"
                style={{ transform: open ? "rotate(-45deg)" : "translateY(3.5px)" }}
              />
            </button>
          </div>
        </nav>
      </header>

      <div
        id="mobile-menu"
        className={`fixed inset-x-0 bottom-0 top-[var(--nav-h)] z-40 overflow-y-auto bg-white transition-[opacity,visibility] duration-300 md:hidden ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
        aria-hidden={!open}
      >
        <div className="container-wide flex min-h-full flex-col pt-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <ul className="flex flex-col gap-1">
            {[{ label: "Home", href: homePath } as NavItem, ...navItems].map((item, index) => {
              const isActive = item.key !== undefined && item.key === active;
              return (
                <li
                  key={item.label}
                  className="transition-[opacity,transform] duration-500"
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "none" : "translateY(6px)",
                    transitionDelay: open ? `${40 + index * 30}ms` : "0ms",
                  }}
                >
                  <Link
                    href={item.label === "Home" ? homePath : hrefFor(item)}
                    tabIndex={open ? 0 : -1}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={`flex items-center gap-3 py-2.5 text-[28px] font-medium tracking-tight ${
                      isActive ? "text-[var(--text)]" : "text-[var(--text)] active:text-[var(--muted-3)]"
                    }`}
                  >
                    {item.label}
                    {isActive ? <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" aria-hidden="true" /> : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mt-auto border-t border-[var(--border)] pt-6">
            <div className="flex flex-col gap-3">
              <a href="mailto:hello@shovon.bd" tabIndex={open ? 0 : -1} className="btn btn-primary w-full">
                <MailIcon width={16} height={16} />
                hello@shovon.bd
              </a>
              <a {...RESUME_PROPS} tabIndex={open ? 0 : -1} className="btn btn-secondary w-full" onClick={() => setOpen(false)}>
                <DownloadIcon width={16} height={16} />
                Download resume
              </a>
            </div>
            <ul className="mt-6 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-[var(--muted-3)]">
              {socials
                .filter(([label]) => label !== "Resume")
                .map(([label, href]) => (
                  <li key={label}>
                    <a href={href} target="_blank" rel="noopener noreferrer" tabIndex={open ? 0 : -1} className="hover:text-[var(--text)]">
                      {label}
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>

      <CommandPalette isOpen={cmdPaletteOpen} onClose={() => setCmdPaletteOpen(false)} />
    </>
  );
}

const footerLinks: [string, string][] = [
  ["Projects", "/projects"],
  ["Apps", "/apps"],
  ["Security", "/security"],
  ["Blog", "/blog"],
  ["Academic", "/academic"],
  ["RSS", "/rss.xml"],
];

export function Footer({ backHome = false, homePath = "/" }: { backHome?: boolean; homePath?: HomePath }) {
  return (
    <footer className="mt-auto">
      <div className="container-wide">
        <div className="flex flex-col gap-8 border-t border-[var(--border)] py-10 pb-[max(2.5rem,env(safe-area-inset-bottom))] sm:flex-row sm:items-start sm:justify-between">
          <div className="text-sm">
            <Link href={homePath} className="font-semibold tracking-tight text-[var(--text)]">
              Shovon<span className="text-[var(--accent)]">.</span>
            </Link>
            <p className="mt-2 text-[var(--muted-3)]">&copy; 2026 Md Minaruzzaman Shovon</p>
            <a href="mailto:hello@shovon.bd" className="mt-1 inline-block text-[var(--muted-2)] hover:text-[var(--text)]">
              hello@shovon.bd
            </a>
          </div>
          <div className="grid grid-cols-2 gap-x-12 gap-y-6 text-sm sm:flex sm:gap-16">
            <ul className="space-y-2">
              {footerLinks.map(([label, href]) => (
                <li key={label}>
                  <Link href={href} className="text-[var(--muted-3)] transition-colors hover:text-[var(--text)]">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <ul className="space-y-2">
              {socials
                .filter(([label]) => label !== "Resume")
                .map(([label, href]) => (
                  <li key={label}>
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[var(--muted-3)] transition-colors hover:text-[var(--text)]"
                    >
                      {label}
                      <ArrowUpRight width={12} height={12} />
                    </a>
                  </li>
                ))}
              {backHome ? (
                <li>
                  <Link href={homePath} className="text-[var(--muted-3)] hover:text-[var(--text)]">
                    &larr; Home
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
