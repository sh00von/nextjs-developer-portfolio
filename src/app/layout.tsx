import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.shovon.bd"),
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
    url: "https://www.shovon.bd",
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
  themeColor: "#fafaf9",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Md Minaruzzaman Shovon",
    alternateName: ["Shovon Portfolio", "Minaruzzaman Shovon"],
    url: "https://www.shovon.bd",
    description:
      "Personal website of Md Minaruzzaman Shovon, featuring selected work in software development, water resources engineering, research, and technical writing.",
    publisher: {
      "@type": "Person",
      name: "Md Minaruzzaman Shovon",
      url: "https://www.shovon.bd",
    },
  };

  return (
    <html
      lang="en"
      className={`antialiased ${geist.variable} ${geistMono.variable}`}
      data-scroll-behavior="smooth"
    >
      <head>
        <link
          rel="alternate"
          type="application/rss+xml"
          title="Md Minaruzzaman Shovon — CVE Security Advisories"
          href="/rss.xml"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className="min-h-screen font-sans">
        {children}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id="ef65444c-7e85-490b-bcc9-f3631919bafe"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
