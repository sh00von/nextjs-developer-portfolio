"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Navigation, Footer } from "@/components/SiteChrome";
import poldersData from "@/data/polders_summary.json";

const PolderMap = dynamic(() => import("./PolderMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[480px] w-full rounded-2xl border border-[#e5e5e5] bg-[#0d1117] flex flex-col items-center justify-center text-xs text-[#8b949e] font-mono">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-lime-400 border-t-transparent mb-2" />
      <span>Initializing Interactive Polder GIS Map...</span>
    </div>
  ),
});

interface PolderItem {
  id: number;
  bwdb_name: string;
  polder_name: string;
  old_name: string;
  district: string;
  upazilla: string;
  division: string;
  area_sqkm: number;
  emb_len_km: number;
  pop_total: number;
}

const GEE_ASSET_ID = "users/minarsvn/bwdb_all_polders";
const GEE_ASSET_URL = "https://code.earthengine.google.com/?asset=users/minarsvn/bwdb_all_polders";
const DRIVE_SHP_URL = "https://drive.google.com/file/d/1LYqiLhNs21s2UklHremibk_V-_pnTCM3/view?usp=sharing";

type ExampleKey = "ex0" | "ex1" | "ex2" | "ex3" | "ex4";

const GEE_EXAMPLES: Record<
  ExampleKey,
  {
    title: string;
    description: string;
    js: string;
    python: string;
  }
> = {
  ex0: {
    title: "1. Load All 162 Polders",
    description: "Load the complete BWDB coastal polders asset, center map on Bangladesh coastal belt, and display all 162 units.",
    js: `// ============================================================
// Example 1: Load All 162 BWDB Coastal Polders
// Asset: ${GEE_ASSET_ID}
// ============================================================

// 1. Load complete FeatureCollection
var allPolders = ee.FeatureCollection("${GEE_ASSET_ID}");

// 2. Print total count of polder polygons
print("Total Coastal Polders Count:", allPolders.size());

// 3. Center map view over Bangladesh coastal region (Zoom 8)
Map.setCenter(90.2, 22.3, 8);

// 4. Add layer displaying all 162 polders with cyan fill
Map.addLayer(allPolders, {color: '0ea5e9'}, "All 162 BWDB Polders");`,
    python: `# ============================================================
# Example 1: Load All 162 BWDB Coastal Polders
# Asset: ${GEE_ASSET_ID}
# ============================================================

import ee

# 1. Initialize GEE Python API
ee.Initialize(project='YOUR_GEE_PROJECT_ID')

# 2. Load complete FeatureCollection
polders = ee.FeatureCollection("${GEE_ASSET_ID}")

# 3. Print total feature count & attribute property names
print("Total Polders Count:", polders.size().getInfo())
print("Polder Attribute Schema:", polders.first().propertyNames().getInfo())`,
  },

  ex1: {
    title: "2. Filter Polder (P-110 & P-117)",
    description: "Filter specific polders by PPBWDBNAME, center map on Polder 110, and render vector outline.",
    js: `// ============================================================
// Example 2: Filter Specific Polder 110 & 117
// Asset: ${GEE_ASSET_ID}
// ============================================================

var allPolders = ee.FeatureCollection("${GEE_ASSET_ID}");

// Filter for Polder 110 (Ramgati) & Polder 117 (Boyerchar)
var polder110 = allPolders.filter(ee.Filter.eq('PPBWDBNAME', 'P-110'));
var polder117 = allPolders.filter(ee.Filter.eq('PPBWDBNAME', 'P-117'));

// Center map on Polder 110 (Zoom 11)
Map.centerObject(polder110, 11);

// Create red outline layer (3px stroke width)
var outline110 = ee.Image().byte().paint({
  featureCollection: polder110,
  color: 1,
  width: 3
});

// Add layers to GEE Map
Map.addLayer(allPolders, {color: '888888'}, "All 162 Polders", false);
Map.addLayer(polder110, {color: '3b82f6'}, "Polder 110 (Blue Fill)");
Map.addLayer(polder117, {color: '10b981'}, "Polder 117 (Green Fill)");
Map.addLayer(outline110, {palette: 'ef4444'}, "Polder 110 Red Outline");`,
    python: `# ============================================================
# Example 2: Load Dataset & Filter Polder 110
# Asset: ${GEE_ASSET_ID}
# ============================================================

import ee

ee.Initialize(project='YOUR_GEE_PROJECT_ID')

polders = ee.FeatureCollection("${GEE_ASSET_ID}")

# Filter for Polder 110 using PPBWDBNAME attribute
polder_110 = polders.filter(ee.Filter.eq('PPBWDBNAME', 'P-110'))

# Fetch and print metadata dictionary
metadata = polder_110.first().toDictionary().getInfo()
print("Polder Name:", metadata.get('POLD_NAME'))
print("District:", metadata.get('DISTRICT'))
print("Protected Land Area (sq km):", metadata.get('AREA_SQKM'))
print("Embankment Length (km):", metadata.get('EMB_LEN_KM'))`,
  },

  ex2: {
    title: "3. District Spatial Query",
    description: "Filter all polders within a district (e.g. Lakshmipur or Barisal) and calculate totals.",
    js: `// ============================================================
// Example 3: District-Wide Polder Filter (Lakshmipur)
// ============================================================

var allPolders = ee.FeatureCollection("${GEE_ASSET_ID}");

// Filter polders containing 'Lakshmipur' in DISTRICT field
var lakshmipurPolders = allPolders.filter(
  ee.Filter.stringContains('DISTRICT', 'Lakshmipur')
);

print("Lakshmipur District Polders Count:", lakshmipurPolders.size());

// Center map view on district polders
Map.centerObject(lakshmipurPolders, 10);
Map.addLayer(lakshmipurPolders, {color: 'f59e0b'}, "Lakshmipur Polders");`,
    python: `# ============================================================
# Example 3: District-Wide Filter & Aggregate Query
# ============================================================

import ee
ee.Initialize(project='YOUR_GEE_PROJECT_ID')

polders = ee.FeatureCollection("${GEE_ASSET_ID}")

# Filter polders in Barisal district
barisal_polders = polders.filter(ee.Filter.stringContains('DISTRICT', 'Barisal'))

print("Total Polders in Barisal District:", barisal_polders.size().getInfo())`,
  },

  ex3: {
    title: "4. Sentinel-2 Satellite Clip",
    description: "Load cloud-free Sentinel-2 Surface Reflectance scene and clip to exact polder boundary.",
    js: `// ============================================================
// Example 4: Sentinel-2 Satellite Imagery Overlay & Clip
// ============================================================

var polder110 = ee.FeatureCollection("${GEE_ASSET_ID}")
  .filter(ee.Filter.eq('PPBWDBNAME', 'P-110'));

// Filter Sentinel-2 image collection
var s2Scene = ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
  .filterBounds(polder110)
  .filterDate('2025-11-01', '2026-02-28')
  .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 10))
  .median()
  .clip(polder110);

Map.centerObject(polder110, 12);
Map.addLayer(s2Scene, {bands: ['B4', 'B3', 'B2'], min: 0, max: 3000}, "Sentinel-2 True Color");`,
    python: `# ============================================================
# Example 4: Sentinel-2 Cloud-Masked Satellite Clip
# ============================================================

import ee
ee.Initialize(project='YOUR_GEE_PROJECT_ID')

polder_110 = ee.FeatureCollection("${GEE_ASSET_ID}").filter(ee.Filter.eq('PPBWDBNAME', 'P-110'))

s2_image = (
    ee.ImageCollection('COPERNICUS/S2_SR_HARMONIZED')
    .filterBounds(polder_110)
    .filterDate('2025-12-01', '2026-01-31')
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 15))
    .median()
    .clip(polder_110)
)

print("Sentinel-2 Bands Available:", s2_image.bandNames().getInfo())`,
  },

  ex4: {
    title: "5. Export Shapefile to Drive",
    description: "Export filtered polder vector polygons directly to Google Drive as an ESRI Shapefile.",
    js: `// ============================================================
// Example 5: Export Polder 110 Shapefile to Google Drive
// ============================================================

var polder110 = ee.FeatureCollection("${GEE_ASSET_ID}")
  .filter(ee.Filter.eq('PPBWDBNAME', 'P-110'));

Export.table.toDrive({
  collection: polder110,
  description: 'BWDB_Polder_110_Ramgati',
  fileFormat: 'SHP'
});`,
    python: `# ============================================================
# Example 5: Export Vector Task via Python Task Manager
# ============================================================

import ee
ee.Initialize(project='YOUR_GEE_PROJECT_ID')

polder_110 = ee.FeatureCollection("${GEE_ASSET_ID}").filter(ee.Filter.eq('PPBWDBNAME', 'P-110'))

task = ee.batch.Export.table.toDrive(
    collection=polder_110,
    description='BWDB_Polder_110_Python',
    fileFormat='SHP'
)
task.start()
print("Export Task Launched! Task ID:", task.id)`,
  },
};

// Custom Syntax Colorizer Component
function SyntaxHighlightedCode({ code, lang }: { code: string; lang: "js" | "python" }) {
  const lines = code.split("\n");

  const renderLine = (line: string, index: number) => {
    const isComment = line.trim().startsWith("//") || line.trim().startsWith("#");

    if (isComment) {
      return (
        <span key={index} className="text-[#8b949e] italic">
          {line}
        </span>
      );
    }

    // Tokenize string quotes, numbers, keywords, and function calls
    const tokens = line.split(/(".*?"|'.*?'|\b(?:var|let|const|import|from|as|def|return|print)\b|\b(?:ee|Map)\b|\b(?:filter|paint|addLayer|centerObject|FeatureCollection|Image|byte|Initialize|getInfo|toDictionary|first|coordinates|geometry)\b|\b\d+\b)/g);

    return (
      <span key={index}>
        {tokens.map((token, i) => {
          if (!token) return null;

          // Strings
          if (token.startsWith('"') || token.startsWith("'")) {
            return (
              <span key={i} className="text-[#a5d6ff]">
                {token}
              </span>
            );
          }

          // Keywords
          if (["var", "let", "const", "import", "from", "as", "def", "return", "print"].includes(token)) {
            return (
              <span key={i} className="text-[#ff7b72] font-semibold">
                {token}
              </span>
            );
          }

          // Core Objects (ee, Map)
          if (["ee", "Map"].includes(token)) {
            return (
              <span key={i} className="text-[#ffa657] font-semibold">
                {token}
              </span>
            );
          }

          // Methods / Functions
          if (
            [
              "filter",
              "paint",
              "addLayer",
              "centerObject",
              "FeatureCollection",
              "ImageCollection",
              "Image",
              "Export",
              "table",
              "toDrive",
              "clip",
              "median",
              "filterBounds",
              "filterDate",
              "size",
              "bandNames",
              "byte",
              "Initialize",
              "getInfo",
              "toDictionary",
              "first",
              "coordinates",
              "geometry",
              "stringContains",
            ].includes(token)
          ) {
            return (
              <span key={i} className="text-[#d2a8ff]">
                {token}
              </span>
            );
          }

          // Numbers
          if (/^\d+$/.test(token)) {
            return (
              <span key={i} className="text-[#79c0ff]">
                {token}
              </span>
            );
          }

          // Standard code text
          return <span key={i} className="text-[#c9d1d9]">{token}</span>;
        })}
      </span>
    );
  };

  return (
    <div className="flex font-mono text-xs leading-relaxed select-text">
      {/* Line Numbers Column */}
      <div className="w-10 flex-shrink-0 select-none border-r border-[#21262d] bg-[#090d13] pr-3 text-right text-[#484f58]">
        {lines.map((_, i) => (
          <div key={i}>{i + 1}</div>
        ))}
      </div>

      {/* Code Lines Column */}
      <div className="overflow-x-auto p-4 pl-4">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre">
            {renderLine(line, i)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PoldersClient() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState<string>("All");
  const [codeTab, setCodeTab] = useState<"js" | "python">("js");
  const [exampleTab, setExampleTab] = useState<ExampleKey>("ex0");
  const [copiedAsset, setCopiedAsset] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Extract unique districts
  const districts = useMemo(() => {
    const set = new Set<string>();
    (poldersData as PolderItem[]).forEach((item) => {
      if (item.district) {
        item.district.split(",").forEach((d) => set.add(d.trim()));
      }
    });
    return ["All", ...Array.from(set).sort()];
  }, []);

  // Filter polders
  const filteredPolders = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return (poldersData as PolderItem[]).filter((item) => {
      const matchesDistrict =
        selectedDistrict === "All" ||
        item.district.toLowerCase().includes(selectedDistrict.toLowerCase());

      const matchesQuery =
        !q ||
        item.bwdb_name.toLowerCase().includes(q) ||
        item.polder_name.toLowerCase().includes(q) ||
        item.old_name.toLowerCase().includes(q) ||
        item.district.toLowerCase().includes(q) ||
        item.upazilla.toLowerCase().includes(q) ||
        item.division.toLowerCase().includes(q);

      return matchesDistrict && matchesQuery;
    });
  }, [searchQuery, selectedDistrict]);

  // Paginated polders
  const totalPages = Math.ceil(filteredPolders.length / itemsPerPage);
  const paginatedPolders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredPolders.slice(start, start + itemsPerPage);
  }, [filteredPolders, currentPage]);

  const handleCopyAsset = () => {
    navigator.clipboard.writeText(GEE_ASSET_ID);
    setCopiedAsset(true);
    setTimeout(() => setCopiedAsset(false), 2000);
  };

  const handleCopyCode = () => {
    const code = GEE_EXAMPLES[exampleTab][codeTab];
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const totalArea = useMemo(() => {
    return (poldersData as PolderItem[])
      .reduce((sum, item) => sum + (item.area_sqkm || 0), 0)
      .toLocaleString(undefined, { maximumFractionDigits: 0 });
  }, []);

  const totalEmbankment = useMemo(() => {
    return (poldersData as PolderItem[])
      .reduce((sum, item) => sum + (item.emb_len_km || 0), 0)
      .toLocaleString(undefined, { maximumFractionDigits: 0 });
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#111111]">
      <Navigation active="polders" />

      <main id="main-content" className="mx-auto w-full max-w-2xl px-4 py-8 lg:max-w-[60vw]">
        {/* Breadcrumb Back Link */}
        <div className="mb-6">
          <Link href="/dev" className="back-link">
            &larr; Back to Portfolio
          </Link>
        </div>

        {/* Hero Section */}
        <header className="mb-10">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="badge-featured inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 text-xs font-bold uppercase tracking-wider">
              <span className="h-2 w-2 rounded-full bg-lime-500 animate-pulse" />
              Open Open-Access Dataset
            </span>
            <span className="tag">162 Polder Units</span>
            <span className="tag">WGS84 EPSG:4326</span>
            <span className="tag">GEE Cloud Asset</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[#111111] sm:text-4xl">
            Bangladesh Coastal Polders GIS & GEE Dataset
          </h1>

          <p className="mt-4 text-base text-[#3d3d3d] leading-relaxed max-w-3xl font-medium">
            A standardized, open-access spatial vector dataset covering <strong>162 coastal polders</strong> across Bangladesh, compiled, topologically cleaned, and published to Google Earth Engine by <strong>Md Minaruzzaman Shovon</strong>.
          </p>

          <p className="mt-2 text-sm text-[#5c5c5c] leading-relaxed max-w-3xl">
            Derived from Bangladesh Water Development Board (BWDB) engineering records, this dataset standardizes coastal dike boundaries, administrative units, protected land area, and polder identification attributes (e.g., Polder 110, Polder 117). It provides hydrologists, coastal engineers, and remote sensing researchers with a ready-to-use cloud asset for Earth observation, CoastSat satellite shoreline tracking, storm surge modeling, and coastal vulnerability assessments.
          </p>

          {/* Dataset Attribution Box */}
          <div className="mt-6 rounded-xl border border-[#e5e5e5] bg-[#fafafa] p-4 text-xs text-[#3d3d3d]">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
              <div>
                <span className="font-bold text-[#111111]">Compiled & Published By:</span>
                <p className="text-[#5c5c5c]">Md Minaruzzaman Shovon</p>
              </div>
              <div>
                <span className="font-bold text-[#111111]">Primary Source Data:</span>
                <p className="text-[#5c5c5c]">Bangladesh Water Development Board (BWDB)</p>
              </div>
              <div>
                <span className="font-bold text-[#111111]">Primary Applications:</span>
                <p className="text-[#5c5c5c]">GEE Remote Sensing & CoastSat Analysis</p>
              </div>
            </div>
          </div>

          {/* Quick Action Badges / Downloads */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={GEE_ASSET_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-[#111111] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition-all hover:bg-[#333333] hover:shadow-md"
            >
              <svg className="h-4 w-4 text-lime-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
              </svg>
              <span>Open GEE Asset Inspector</span>
            </a>

            <a
              href={DRIVE_SHP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#e5e5e5] bg-[#f5f5f5] px-4 py-2.5 text-xs font-semibold text-[#111111] transition-all hover:border-[#d4d4d4] hover:bg-[#ebebeb]"
            >
              <svg className="h-4 w-4 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>Download Shapefile (.zip)</span>
            </a>

            <a
              href="https://gisportal.bwdb.gov.bd/portal/home/item.html?id=49ce94eab164459eaf471ea84f54c1e6"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-[#e5e5e5] bg-white px-4 py-2.5 text-xs font-semibold text-[#111111] transition-all hover:bg-[#fafafa] hover:border-[#d4d4d4]"
            >
              <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <span>BWDB Official Portal Item</span>
            </a>

            <button
              onClick={handleCopyAsset}
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-[#e5e5e5] bg-white px-4 py-2.5 text-xs font-medium text-[#5c5c5c] shadow-2xs transition-colors hover:border-[#d4d4d4] hover:text-[#111111]"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span>{copiedAsset ? "Copied Asset ID!" : `Copy Table ID: ${GEE_ASSET_ID}`}</span>
            </button>
          </div>
        </header>

        {/* Stats Grid */}
        <section className="mb-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="spotlight-card rounded-2xl p-5 border border-[#e5e5e5]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#737373]">Total Polders</span>
            <div className="mt-2 text-2xl font-black text-[#111111]">162</div>
            <p className="mt-1 text-xs text-[#5c5c5c]">Units mapped</p>
          </div>

          <div className="spotlight-card rounded-2xl p-5 border border-[#e5e5e5]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#737373]">Protected Area</span>
            <div className="mt-2 text-2xl font-black text-[#111111]">{totalArea} sq km</div>
            <p className="mt-1 text-xs text-[#5c5c5c]">Square kilometers</p>
          </div>

          <div className="spotlight-card rounded-2xl p-5 border border-[#e5e5e5]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#737373]">Embankments</span>
            <div className="mt-2 text-2xl font-black text-[#111111]">{totalEmbankment} km</div>
            <p className="mt-1 text-xs text-[#5c5c5c]">Total dikes length</p>
          </div>

          <div className="spotlight-card rounded-2xl p-5 border border-[#e5e5e5]">
            <span className="text-xs font-bold uppercase tracking-wider text-[#737373]">Coverage</span>
            <div className="mt-2 text-2xl font-black text-[#111111]">4 Divisions</div>
            <p className="mt-1 text-xs text-[#5c5c5c]">Coastal Bangladesh</p>
          </div>
        </section>

        {/* Interactive GIS Vector Map Section */}
        <section className="mb-14">
          <PolderMap onSelectPolder={(polderId) => setSearchQuery(polderId)} />
        </section>

        {/* GEE Code Editor Section with Interactive Example Sub-Tabs */}
        <section className="mb-14">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-[#111111]">Google Earth Engine Code Editor</h2>
              <p className="mt-1 text-xs text-[#5c5c5c]">
                Select an example workflow below to view clean, interactive code snippets.
              </p>
            </div>

            {/* Language Switcher & Copy Button */}
            <div className="flex items-center gap-2">
              <div className="flex rounded-lg border border-[#e5e5e5] bg-white p-1">
                <button
                  type="button"
                  onClick={() => setCodeTab("js")}
                  className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                    codeTab === "js" ? "bg-[#111111] text-white" : "text-[#5c5c5c] hover:text-[#111111]"
                  }`}
                >
                  JavaScript (GEE)
                </button>
                <button
                  type="button"
                  onClick={() => setCodeTab("python")}
                  className={`rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                    codeTab === "python" ? "bg-[#111111] text-white" : "text-[#5c5c5c] hover:text-[#111111]"
                  }`}
                >
                  Python (ee API)
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopyCode}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#e5e5e5] bg-white px-3 py-1.5 text-xs font-medium text-[#111111] shadow-2xs hover:bg-[#f0f0f0]"
              >
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <span>{copiedCode ? "Copied!" : "Copy Code"}</span>
              </button>
            </div>
          </div>

          {/* Example Selector Sub-Tabs */}
          <div className="mt-4 flex flex-wrap gap-2">
            {(["ex0", "ex1", "ex2", "ex3", "ex4"] as ExampleKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setExampleTab(key)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
                  exampleTab === key
                    ? "bg-[#111111] text-white font-semibold shadow-xs"
                    : "border border-[#e5e5e5] bg-[#f9f9f9] text-[#5c5c5c] hover:border-[#d4d4d4] hover:bg-white hover:text-[#111111]"
                }`}
              >
                {GEE_EXAMPLES[key].title}
              </button>
            ))}
          </div>

          {/* Active Example Description Banner */}
          <div className="mt-3 rounded-lg border border-[#e5e5e5] bg-[#fafafa] px-3.5 py-2 text-xs text-[#5c5c5c]">
            <strong className="text-[#111111]">Workflow Note:</strong> {GEE_EXAMPLES[exampleTab].description}
          </div>

          {/* VS Code Dark Editor Window */}
          <div className="mt-3 overflow-hidden rounded-xl border border-[#333333] bg-[#0d1117] shadow-xl">
            {/* Editor Window Topbar */}
            <div className="flex items-center justify-between border-b border-[#21262d] bg-[#161b22] px-4 py-2.5 text-xs font-mono">
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
                  <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
                </div>
                <span className="ml-2 font-semibold text-[#c9d1d9]">
                  {codeTab === "js" ? `${exampleTab}_script.js` : `${exampleTab}_script.py`}
                </span>
              </div>
              <span className="text-[11px] text-[#8b949e]">Asset: {GEE_ASSET_ID}</span>
            </div>

            {/* Syntax Highlighted Code with Line Numbers */}
            <SyntaxHighlightedCode
              code={GEE_EXAMPLES[exampleTab][codeTab]}
              lang={codeTab}
            />
          </div>
        </section>

        {/* Dataset Explorer Table Section */}
        <section className="mb-14">
          <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-[#111111]">Interactive Polder Directory</h2>
              <p className="mt-1 text-xs text-[#5c5c5c]">
                Explore all 162 polders. Search by Polder ID (e.g. <code className="rounded bg-[#f5f5f5] px-1 py-0.5 text-xs text-[#111111]">P-110</code>, <code className="rounded bg-[#f5f5f5] px-1 py-0.5 text-xs text-[#111111]">P-117</code>), name, or location.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search Polder ID, Name, District..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full rounded-xl border border-[#e5e5e5] bg-white py-2 pl-9 pr-4 text-xs text-[#111111] placeholder-[#a3a3a3] outline-none transition-all focus:border-[#111111] focus:ring-1 focus:ring-[#111111]"
              />
              <svg
                className="absolute left-3 top-2.5 h-4 w-4 text-[#a3a3a3]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* District Filter Pills */}
          <div className="filter-pills flex flex-wrap gap-1.5 mb-6">
            {districts.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => {
                  setSelectedDistrict(d);
                  setCurrentPage(1);
                }}
                className={`pill ${selectedDistrict === d ? "active" : ""}`}
              >
                {d}
              </button>
            ))}
          </div>

          {/* Results Summary Bar */}
          <div className="mb-4 flex items-center justify-between text-xs text-[#737373]">
            <span>
              Showing <strong className="text-[#111111]">{filteredPolders.length}</strong> of 162 polders
            </span>
            {filteredPolders.length > 0 && (
              <span>
                Page {currentPage} of {totalPages}
              </span>
            )}
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-[#e5e5e5] bg-white shadow-2xs">
            <table className="w-full text-left text-xs text-[#111111]">
              <thead className="border-b border-[#e5e5e5] bg-[#fafafa] uppercase text-[10px] font-bold text-[#737373] tracking-wider">
                <tr>
                  <th className="px-4 py-3">Polder ID (GEE)</th>
                  <th className="px-4 py-3">Polder Name</th>
                  <th className="px-4 py-3">District</th>
                  <th className="px-4 py-3">Upazilla</th>
                  <th className="px-4 py-3 text-right">Area (km²)</th>
                  <th className="px-4 py-3 text-right">Embankment (km)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ebebeb]">
                {paginatedPolders.length > 0 ? (
                  paginatedPolders.map((item) => (
                    <tr key={item.id} className="hover:bg-[#f9f9f9] transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-blue-600">
                        {item.bwdb_name || `PN-${item.id}`}
                      </td>
                      <td className="px-4 py-3 font-semibold text-[#111111]">
                        {item.polder_name || item.old_name || "BWDB Polder Unit"}
                      </td>
                      <td className="px-4 py-3 text-[#5c5c5c]">{item.district || "—"}</td>
                      <td className="px-4 py-3 text-[#5c5c5c]">{item.upazilla || "—"}</td>
                      <td className="px-4 py-3 text-right font-medium">{item.area_sqkm && item.area_sqkm > 0 ? item.area_sqkm : "—"}</td>
                      <td className="px-4 py-3 text-right text-[#5c5c5c]">
                        {item.emb_len_km && item.emb_len_km > 0 ? `${item.emb_len_km} km` : "—"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-[#737373]">
                      No polders found matching &quot;{searchQuery}&quot;. Try another search term or reset filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="rounded-lg border border-[#e5e5e5] bg-white px-3 py-1.5 text-xs font-semibold text-[#111111] shadow-2xs hover:bg-[#f5f5f5] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                &larr; Previous
              </button>

              <div className="flex items-center gap-1 text-xs text-[#5c5c5c]">
                <span>Page</span>
                <span className="font-bold text-[#111111]">{currentPage}</span>
                <span>of</span>
                <span>{totalPages}</span>
              </div>

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="rounded-lg border border-[#e5e5e5] bg-white px-3 py-1.5 text-xs font-semibold text-[#111111] shadow-2xs hover:bg-[#f5f5f5] disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next &rarr;
              </button>
            </div>
          )}
        </section>

        {/* SEO FAQ & Citation Documentation Section */}
        <section className="mb-14 rounded-2xl border border-[#e5e5e5] bg-[#fafafa] p-6 shadow-2xs">
          <h2 className="text-xl font-bold tracking-tight text-[#111111] mb-2">
            Frequently Asked Questions — Polders Map BD & BWDB GIS Data
          </h2>
          <p className="text-xs text-[#5c5c5c] mb-6">
            Everything you need to know about accessing, citing, and using Bangladesh coastal polders vector data in Google Earth Engine and GIS software.
          </p>

          <div className="space-y-4 text-xs text-[#3d3d3d]">
            <details className="group rounded-xl border border-[#e5e5e5] bg-white p-4 transition-all hover:border-[#d4d4d4]" open>
              <summary className="cursor-pointer font-bold text-sm text-[#111111] flex items-center justify-between">
                <span>What is the Polders Map BD dataset?</span>
                <span className="text-[#a3a3a3] group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p className="mt-3 leading-relaxed text-[#5c5c5c]">
                <strong>Polders Map BD</strong> is an open-access spatial vector dataset covering <strong>162 coastal polders</strong> across Bangladesh. Originally engineered by the Bangladesh Water Development Board (BWDB), this dataset standardizes polder embankment boundaries, protected land area (15,584 sq km), dike lengths (4,374 km), and administrative metadata (Districts & Upazillas) into WGS84 GeoJSON and Google Earth Engine (GEE) cloud format.
              </p>
            </details>

            <details className="group rounded-xl border border-[#e5e5e5] bg-white p-4 transition-all hover:border-[#d4d4d4]">
              <summary className="cursor-pointer font-bold text-sm text-[#111111] flex items-center justify-between">
                <span>How does this compare to the official BWDB GIS Portal?</span>
                <span className="text-[#a3a3a3] group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p className="mt-3 leading-relaxed text-[#5c5c5c]">
                This dataset is compiled from primary engineering records hosted on the <a href="https://gisportal.bwdb.gov.bd/portal/home/item.html?id=49ce94eab164459eaf471ea84f54c1e6" target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 underline">BWDB Official GIS Portal (Item 49ce94eab164459eaf471ea84f54c1e6)</a> and ArcGIS REST Server (<code className="rounded bg-[#f5f5f5] px-1 py-0.5 text-[11px]">Mappolder4_MIL1</code>). This open hub cleans polygon topology, standardizes attributes (e.g. <code className="rounded bg-[#f5f5f5] px-1 py-0.5 text-[11px]">PPBWDBNAME == &apos;P-110&apos;</code>), and makes the data cloud-ready for remote sensing workflows.
              </p>
            </details>

            <details className="group rounded-xl border border-[#e5e5e5] bg-white p-4 transition-all hover:border-[#d4d4d4]">
              <summary className="cursor-pointer font-bold text-sm text-[#111111] flex items-center justify-between">
                <span>How do I load the BWDB Polders in Google Earth Engine (GEE)?</span>
                <span className="text-[#a3a3a3] group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p className="mt-3 leading-relaxed text-[#5c5c5c]">
                In GEE JavaScript Code Editor or Python <code className="rounded bg-[#f5f5f5] px-1 py-0.5 text-[11px]">ee</code> SDK, load the public asset table ID:
                <br />
                <code className="mt-2 inline-block rounded bg-[#0d1117] p-2 text-[11px] font-mono text-[#a5d6ff]">var polders = ee.FeatureCollection(&quot;users/minarsvn/bwdb_all_polders&quot;);</code>
              </p>
            </details>

            <details className="group rounded-xl border border-[#e5e5e5] bg-white p-4 transition-all hover:border-[#d4d4d4]">
              <summary className="cursor-pointer font-bold text-sm text-[#111111] flex items-center justify-between">
                <span>Where can I download the raw Shapefile (.zip) or WGS84 GeoJSON?</span>
                <span className="text-[#a3a3a3] group-open:rotate-180 transition-transform">&darr;</span>
              </summary>
              <p className="mt-3 leading-relaxed text-[#5c5c5c]">
                You can download the full ESRI Shapefile ZIP archive via <a href={DRIVE_SHP_URL} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 underline">Google Drive Shapefile Download</a> or fetch the web-optimized EPSG:4326 GeoJSON at <code className="rounded bg-[#f5f5f5] px-1 py-0.5 text-[11px]">/data/polders.json</code>.
              </p>
            </details>
          </div>
        </section>
      </main>

      <Footer backHome={true} />
    </div>
  );
}
