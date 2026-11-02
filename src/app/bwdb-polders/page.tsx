import type { Metadata } from "next";
import Script from "next/script";
import PoldersClient from "./PoldersClient";

export const metadata: Metadata = {
  title: "Bangladesh Coastal Polders GIS & GEE Dataset",
  description:
    "Open GIS dataset of 162 BWDB coastal polders in Bangladesh: interactive map, Shapefile and GeoJSON (EPSG:4326) downloads, and a Google Earth Engine asset.",
  keywords: [
    "polders map bd",
    "bwdb polders map",
    "bangladesh coastal polders shapefile",
    "bwdb gis portal polders",
    "google earth engine polders",
    "polder 110 ramgati",
    "polder 117 boyerchar",
    "coastal embankment bangladesh",
    "bwdb map server 4326 geojson",
    "md minaruzzaman shovon",
  ],
  alternates: {
    canonical: "https://www.shovon.bd/bwdb-polders",
  },
  openGraph: {
    title: "Polders Map BD — Bangladesh Coastal Polders GIS & GEE Dataset",
    description:
      "Interactive Polders Map BD with 162 BWDB coastal polder vector boundaries. Includes Google Earth Engine scripts, GeoJSON, and Shapefile downloads.",
    url: "https://www.shovon.bd/bwdb-polders",
    type: "website",
    siteName: "Md Minaruzzaman Shovon",
    images: ["/api/og?title=Bangladesh%20Coastal%20Polders%20GIS%20Dataset&subtitle=162%20BWDB%20polders%20%E2%80%94%20interactive%20map%2C%20Shapefile%2C%20GeoJSON%20and%20Google%20Earth%20Engine%20asset&category=OPEN%20DATASET&badge=GIS&badgeColor=%23166534&badgeBg=%23f0fdf4"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Polders Map BD — Bangladesh Coastal Polders GIS & GEE Dataset",
    description:
      "Interactive GIS map of 162 BWDB coastal polders in Bangladesh. Download shapefile and load GEE cloud asset by Md Minaruzzaman Shovon.",
    images: ["/api/og?title=Bangladesh%20Coastal%20Polders%20GIS%20Dataset&subtitle=162%20BWDB%20polders%20%E2%80%94%20interactive%20map%2C%20Shapefile%2C%20GeoJSON%20and%20Google%20Earth%20Engine%20asset&category=OPEN%20DATASET&badge=GIS&badgeColor=%23166534&badgeBg=%23f0fdf4"],
  },
};

const jsonLdDataset = {
  "@context": "https://schema.org/",
  "@type": "Dataset",
  name: "Bangladesh Coastal Polders GIS Vector Dataset (BWDB 162 Polders)",
  alternateName: "Polders Map BD — BWDB Coastal Embankments Dataset",
  description:
    "Standardized spatial vector dataset covering 162 coastal polders across coastal Bangladesh, compiled, topologically cleaned, and published to Google Earth Engine by Md Minaruzzaman Shovon. Based on primary engineering records from the Bangladesh Water Development Board (BWDB).",
  url: "https://www.shovon.bd/bwdb-polders",
  license: "https://creativecommons.org/licenses/by/4.0/",
  sameAs: [
    "https://gisportal.bwdb.gov.bd/portal/home/item.html?id=49ce94eab164459eaf471ea84f54c1e6",
    "https://code.earthengine.google.com/?asset=users/minarsvn/bwdb_all_polders",
  ],
  keywords: [
    "polders map bd",
    "BWDB polders map",
    "Bangladesh coastal polders",
    "Google Earth Engine",
    "GeoJSON",
    "Shapefile",
    "Polder 110",
    "Polder 117",
  ],
  creator: {
    "@type": "Person",
    name: "Md Minaruzzaman Shovon",
    url: "https://www.shovon.bd",
  },
  publisher: {
    "@type": "Person",
    name: "Md Minaruzzaman Shovon",
  },
  spatialCoverage: {
    "@type": "Place",
    name: "Coastal Zone of Bangladesh",
    geo: {
      "@type": "GeoShape",
      box: "21.5 89.0 23.0 92.5",
    },
  },
  distribution: [
    {
      "@type": "DataDownload",
      encodingFormat: "application/zip",
      contentUrl: "https://drive.google.com/file/d/1LYqiLhNs21s2UklHremibk_V-_pnTCM3/view?usp=sharing",
    },
    {
      "@type": "DataDownload",
      encodingFormat: "application/json",
      contentUrl: "https://www.shovon.bd/data/polders.json",
    },
  ],
};

export default function BwdbPoldersPage() {
  return (
    <>
      <Script
        id="polders-dataset-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdDataset) }}
      />
      <PoldersClient />
    </>
  );
}
