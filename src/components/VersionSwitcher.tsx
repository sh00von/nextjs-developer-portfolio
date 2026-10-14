"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { HomePath, HomeVariant } from "@/lib/homeVariants";

type SwitcherState = {
  left: number;
  width: number;
};

const routes: Array<{ href: HomePath; label: string; variant: HomeVariant }> = [
  { href: "/", label: "Developer", variant: "dev" },
  { href: "/academic", label: "Academic", variant: "academic" },
];

const getVariantFromPathname = (pathname: string | null): HomeVariant =>
  pathname?.startsWith("/academic") ? "academic" : "dev";

export function VersionSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentVariant = getVariantFromPathname(pathname);
  const [indicator, setIndicator] = useState<SwitcherState>({ left: 0, width: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<HomeVariant, HTMLButtonElement | null>>({
    dev: null,
    academic: null,
  });

  useLayoutEffect(() => {
    const measure = () => {
      const activeNode = itemRefs.current[currentVariant];
      if (!activeNode) return;
      const containerPadding = containerRef.current
        ? parseFloat(getComputedStyle(containerRef.current).paddingLeft)
        : 0;

      setIndicator({
        left: activeNode.offsetLeft - containerPadding,
        width: activeNode.offsetWidth,
      });
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [currentVariant]);

  useEffect(() => {
    const activeNode = itemRefs.current[currentVariant];
    if (!activeNode || typeof ResizeObserver === "undefined") return;

    const observer = new ResizeObserver(() => {
      const containerPadding = containerRef.current
        ? parseFloat(getComputedStyle(containerRef.current).paddingLeft)
        : 0;
      setIndicator({
        left: activeNode.offsetLeft - containerPadding,
        width: activeNode.offsetWidth,
      });
    });

    observer.observe(activeNode);
    return () => observer.disconnect();
  }, [currentVariant]);

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/academic");
  }, [router]);

  const navigate = (href: HomePath) => {
    if (pathname === href) {
      return;
    }

    router.push(href);
  };

  return (
    <div
      ref={containerRef}
      className="variant-switcher relative inline-flex items-center px-1.5 py-1"
      role="tablist"
      aria-label="Homepage version"
    >
      <span
        aria-hidden="true"
        className="variant-switcher-indicator absolute top-1 bottom-1 rounded-full transition-[transform,width] duration-300 ease-out"
        style={{
          width: indicator.width,
          transform: `translateX(${indicator.left}px)`,
        }}
      />
      {routes.map((item) => {
        const active = item.variant === currentVariant;

        return (
          <button
            key={item.href}
            ref={(node) => {
              itemRefs.current[item.variant] = node;
            }}
            type="button"
            role="tab"
            aria-selected={active}
            onClick={() => navigate(item.href)}
            className={`variant-switcher-option relative z-10 rounded-full px-5 py-2 transition-colors duration-300 ${active ? "is-active" : ""
              }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
