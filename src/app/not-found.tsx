import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description:
    "The requested page could not be found on Minaruzzaman Shovon's portfolio.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
  openGraph: {
    title: "404 - Page Not Found | Minaruzzaman Shovon",
    description:
      "The requested page could not be found on Minaruzzaman Shovon's portfolio.",
    url: "https://www.shovon.bd/404",
    images: ["/og.png"],
  },
};

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 text-center">
      <div aria-hidden="true" className="bg-grid pointer-events-none absolute inset-0 -z-10" />
      <div className="max-w-md">
        <p className="eyebrow justify-center">Error 404</p>
        <h1 className="mt-4 text-7xl font-semibold tracking-[-0.04em] text-[var(--text)] sm:text-8xl">
          Lost<span className="text-[#84cc16]">.</span>
        </h1>
        <p className="mt-5 text-base leading-7 text-[var(--muted-2)]">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="btn btn-primary">
            Go home
          </Link>
          <Link href="/projects" className="btn btn-secondary">
            Browse projects
          </Link>
        </div>
      </div>
    </main>
  );
}
