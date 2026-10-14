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
    <main className="flex min-h-screen items-center justify-center bg-[#111010] px-6 text-center text-[#a1a1a1] selection:bg-[#333] selection:text-white">
      <div className="max-w-lg">
        <h1 className="mb-6 text-6xl font-bold tracking-tighter text-white">404</h1>
        <p className="mb-8 text-lg leading-relaxed text-[#a1a1a1]">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          href="/"
          className="inline-flex items-center border-b border-[#333] pb-1 text-white transition-colors hover:border-[#666] hover:text-[#bbb]"
        >
          <svg className="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Go home
        </Link>
      </div>
    </main>
  );
}
