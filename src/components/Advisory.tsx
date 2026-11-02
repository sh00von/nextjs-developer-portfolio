import Link from "next/link";
import type { ReactNode } from "react";
import { cves } from "@/data/cves";

const SEVERITY_STYLES = {
  HIGH: { dot: "bg-red-500", bar: "bg-red-500", text: "text-red-700", label: "High" },
  MEDIUM: { dot: "bg-amber-400", bar: "bg-amber-400", text: "text-amber-700", label: "Medium" },
  LOW: { dot: "bg-sky-400", bar: "bg-sky-400", text: "text-sky-700", label: "Low" },
} as const;

/** Breadcrumb, severity, CVE id, title and CVSS meter for a CVE advisory page. */
export function AdvisoryHeader({ id, children }: { id: string; children: ReactNode }) {
  const cve = cves.find((item) => item.id === id);
  const severity = SEVERITY_STYLES[cve?.severity ?? "MEDIUM"];
  const score = Number.parseFloat(cve?.cvss ?? "0");

  return (
    <header className="pb-10 lg:[grid-column:1] lg:[grid-row:1]">
      <nav aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--muted-3)]">
          <li>
            <Link href="/" className="transition-colors hover:text-[var(--text)]">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li>
            <Link href="/security" className="transition-colors hover:text-[var(--text)]">
              Security
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li className="font-mono text-[var(--muted-2)]" aria-current="page">
            {id}
          </li>
        </ol>
      </nav>

      <div className="mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
        <span className={`inline-flex items-center gap-2 font-medium ${severity.text}`}>
          <span className={`h-2 w-2 rounded-full ${severity.dot}`} aria-hidden="true" />
          {severity.label} severity
        </span>
        {cve ? (
          <>
            <span className="text-[var(--border-hover)]" aria-hidden="true">
              /
            </span>
            <span className="text-[var(--muted-3)]">{cve.plugin}</span>
            <span className="text-[var(--border-hover)]" aria-hidden="true">
              /
            </span>
            <span className="text-[var(--muted-3)]">{cve.disclosed}</span>
          </>
        ) : null}
      </div>

      <h1 className="mt-4 font-mono text-3xl font-medium tracking-tight text-[var(--text)] sm:text-4xl">{id}</h1>
      <p className="mt-3 max-w-2xl text-xl font-medium leading-snug tracking-tight text-[var(--muted)] sm:text-2xl">
        {children}
      </p>

      {cve ? (
        <div className="mt-8 flex max-w-sm items-center gap-4">
          <p className="shrink-0 font-mono text-sm text-[var(--muted-3)]">
            CVSS <span className="text-xl font-medium text-[var(--text)]">{cve.cvss}</span>
            <span className="text-xs"> / 10</span>
          </p>
          <div
            className="h-1.5 flex-1 overflow-hidden rounded-full bg-[var(--surface)]"
            role="meter"
            aria-label="CVSS score"
            aria-valuemin={0}
            aria-valuemax={10}
            aria-valuenow={score}
          >
            <div className={`h-full rounded-full ${severity.bar}`} style={{ width: `${score * 10}%` }} />
          </div>
        </div>
      ) : null}
    </header>
  );
}

/** Hairline key/value list for advisory facts. */
export function MetaList({ children }: { children: ReactNode }) {
  return (
    <aside
      aria-label="Advisory details"
      className="lg:sticky lg:top-[calc(var(--nav-h)+2rem)] lg:mt-[4.25rem] lg:self-start lg:[grid-column:2] lg:[grid-row:1/span_40]"
    >
      <p className="mb-3 hidden text-sm font-medium text-[var(--text)] lg:block">Details</p>
      <dl className="border-t border-[var(--border)]">{children}</dl>
    </aside>
  );
}

export function MetaRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-[var(--border)] py-3 sm:flex-row sm:gap-6 lg:flex-col lg:gap-0.5 lg:py-2.5">
      <dt className="w-36 shrink-0 text-sm text-[var(--muted-3)] lg:w-auto lg:text-xs">{label}</dt>
      <dd className="min-w-0 text-sm break-words text-[var(--text)]">{children}</dd>
    </div>
  );
}

/** Article section with readable body copy. */
export function Section({ title, children }: { title: string; children: ReactNode }) {
  const id = title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return (
    <section className="mt-14 scroll-mt-24 lg:[grid-column:1] lg:first-of-type:mt-0" id={id} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="text-lg font-semibold tracking-tight text-[var(--text)]">
        {title}
      </h2>
      <div className="mt-4 space-y-4 text-base leading-7 text-[var(--muted)] [&_li]:pl-1 [&_li::marker]:text-[var(--muted-3)] [&_strong]:font-semibold [&_strong]:text-[var(--text)]">
        {children}
      </div>
    </section>
  );
}

/** Previous / next advisory links plus a link back to the index. */
export function AdvisoryNav({ id }: { id: string }) {
  const index = cves.findIndex((item) => item.id === id);
  if (index === -1) return null;
  const prev = cves[index - 1];
  const next = cves[index + 1];

  return (
    <nav aria-label="More advisories" className="mt-20 border-t border-[var(--border)] pt-8 lg:[grid-column:1/-1]">
      <div className="grid gap-3 sm:grid-cols-2">
        {prev ? (
          <Link
            href={prev.href}
            className="group rounded-xl border border-[var(--border)] p-4 transition-colors hover:border-[var(--border-hover)]"
          >
            <span className="text-xs text-[var(--muted-3)]">&larr; Previous</span>
            <span className="mt-1 block font-mono text-sm text-[var(--text)]">{prev.id}</span>
            <span className="mt-0.5 block truncate text-sm text-[var(--muted-2)]">{prev.plugin}</span>
          </Link>
        ) : (
          <span className="hidden sm:block" />
        )}
        {next ? (
          <Link
            href={next.href}
            className="group rounded-xl border border-[var(--border)] p-4 text-right transition-colors hover:border-[var(--border-hover)]"
          >
            <span className="text-xs text-[var(--muted-3)]">Next &rarr;</span>
            <span className="mt-1 block font-mono text-sm text-[var(--text)]">{next.id}</span>
            <span className="mt-0.5 block truncate text-sm text-[var(--muted-2)]">{next.plugin}</span>
          </Link>
        ) : null}
      </div>
      <p className="mt-6 text-center text-sm">
        <Link
          href="/security"
          className="text-[var(--muted-2)] underline decoration-[var(--border-hover)] underline-offset-4 hover:text-[var(--text)] hover:decoration-[var(--text)]"
        >
          All {cves.length} advisories
        </Link>
      </p>
    </nav>
  );
}
