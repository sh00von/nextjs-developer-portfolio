import type { Metadata, Viewport } from "next";
import { Mulish } from "next/font/google";
import "./globals.css";

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shovon.bd"),
  title: {
    default: "Md Minaruzzaman Shovon",
    template: "%s | Minaruzzaman Shovon",
  },
  description:
    "Personal website of Md Minaruzzaman Shovon, featuring selected work in software development, water resources engineering, research, and technical writing.",
  keywords: [
    "Md Minaruzzaman Shovon",
    "Shovon portfolio",
    "software development",
    "water resources engineering",
    "research",
    "technical writing",
    "Bangladesh",
  ],
  authors: [{ name: "Minaruzzaman Shovon" }],
  creator: "Minaruzzaman Shovon",
  publisher: "Minaruzzaman Shovon",
  openGraph: {
    type: "website",
    url: "https://shovon.bd/dev",
    siteName: "Shovon Portfolio",
    title: "Md Minaruzzaman Shovon",
    description:
      "Personal website featuring selected work in software development, water resources engineering, research, and technical writing.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@sh00von",
    title: "Md Minaruzzaman Shovon",
    description:
      "Personal website featuring selected work in software development, water resources engineering, research, and technical writing.",
    images: ["/og.png"],
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`antialiased ${mulish.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Md Minaruzzaman Shovon — CVE Security Advisories"
          href="/rss.xml"
        />
      </head>
      <body className={`${mulish.className} min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
