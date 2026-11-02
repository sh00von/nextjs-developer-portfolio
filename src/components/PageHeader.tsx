import Link from "next/link";
import type { ReactNode } from "react";

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
  crumbs,
}: {
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  children?: ReactNode;
  crumbs?: { label: string; href?: string }[];
}) {
  return (
    <header className="relative pt-8 pb-10 sm:pt-14 sm:pb-12">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-x-[-50vw] -top-24 bottom-0 -z-10" />
      {crumbs ? (
        <nav aria-label="Breadcrumb" className="mb-5">
          <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--muted-3)]">
            {crumbs.map((crumb, index) => (
              <li key={crumb.label} className="flex items-center gap-1.5">
                {index > 0 ? <span aria-hidden="true">/</span> : null}
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-[var(--text)]">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-[var(--muted-2)]" aria-current="page">
                    {crumb.label}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      {eyebrow ? <p className="eyebrow mb-4">{eyebrow}</p> : null}
      <h1 className="text-4xl font-semibold leading-[1.05] tracking-[-0.03em] text-[var(--text)] sm:text-5xl lg:text-6xl">
        {title}
      </h1>
      {description ? (
        <p className="mt-4 max-w-2xl text-[15px] leading-7 text-[var(--muted-2)] sm:text-lg sm:leading-8">{description}</p>
      ) : null}
      {children}
    </header>
  );
}
