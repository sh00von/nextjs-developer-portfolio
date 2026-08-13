"use client";

import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    L: any;
  }
}

export default function PolderMap({ onSelectPolder }: { onSelectPolder?: (polderId: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const geojsonLayerRef = useRef<any>(null);
  const onSelectPolderRef = useRef(onSelectPolder);
  onSelectPolderRef.current = onSelectPolder;

  const [loading, setLoading] = useState(true);
  const [basemap, setBasemap] = useState<"streets" | "satellite">("satellite");
  const [poldersLoadedCount, setPoldersLoadedCount] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
    setTimeout(() => {
      if (mapRef.current) {
        mapRef.current.invalidateSize();
      }
    }, 100);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
        setTimeout(() => {
          if (mapRef.current) mapRef.current.invalidateSize();
        }, 100);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  useEffect(() => {
    let isMounted = true;

    // Load Leaflet CSS dynamically if not present
    if (!document.getElementById("leaflet-css")) {
      const link = document.createElement("link");
      link.id = "leaflet-css";
      link.rel = "stylesheet";
      link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
      document.head.appendChild(link);
    }

    // Load Leaflet JS dynamically
    const loadLeaflet = async () => {
      if (typeof window === "undefined") return;

      if (!window.L) {
        await new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
          script.onload = resolve;
          document.body.appendChild(script);
        });
      }

      if (!isMounted || !containerRef.current || mapRef.current) return;

      const L = window.L;

      // Initialize map centered on Bangladesh coastal belt
      const map = L.map(containerRef.current, {
        center: [22.3, 90.5],
        zoom: 8,
        zoomControl: true,
      });

      mapRef.current = map;

      // Basemap layers
      const satelliteTile = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "Esri, Maxar, Earthstar Geographics",
          maxZoom: 18,
        }
      );

      const streetsTile = L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
        {
          attribution: "&copy; OpenStreetMap &copy; CARTO",
          maxZoom: 18,
        }
      );

      // Add default basemap
      satelliteTile.addTo(map);
      (map as any)._satLayer = satelliteTile;
      (map as any)._streetLayer = streetsTile;

      // Fetch polders GeoJSON
      try {
        const res = await fetch("/data/polders.json");
        const data = await res.json();

        if (!isMounted) return;

        setPoldersLoadedCount(data.features.length);

        const geojsonLayer = L.geoJSON(data, {
          style: () => ({
            color: "#38bdf8", // Uniform sky blue outline
            weight: 1.5,
            fillColor: "#0ea5e9",
            fillOpacity: 0.15,
          }),
          onEachFeature: (feature: any, layer: any) => {
            const props = feature.properties || {};
            const polderId = props.PPBWDBNAME || `ID-${props.OBJECTID || "Polder"}`;
            const polderName = props.POLD_NAME || props.DISTRICT || "Coastal Polder";
            const district = props.DISTRICT || "Coastal Zone";
            const upazilla = props.UPAZILLA || "—";
            const areaVal = props.AREA_SQKM ? `${Number(props.AREA_SQKM).toFixed(1)} sq km` : "—";
            
            const rawEmb = props.EMB_LEN ?? props.EMB_LEN_KM;
            const embDisplay = rawEmb && Number(rawEmb) > 0 ? `${Number(rawEmb).toFixed(1)} km` : "—";

            const popupContent = `
              <div style="font-family: sans-serif; padding: 4px; min-width: 190px;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                  <span style="font-size: 11px; font-weight: 800; color: #0284c7; background: #e0f2fe; padding: 2px 6px; borderRadius: 4px;">${polderId}</span>
                  <span style="font-size: 10px; color: #64748b;">BWDB Polder</span>
                </div>
                <h4 style="margin: 0 0 4px 0; font-size: 14px; font-weight: 700; color: #0f172a;">${polderName}</h4>
                <p style="margin: 0 0 8px 0; font-size: 11px; color: #475569;">
                  <strong>District:</strong> ${district} | <strong>Upazilla:</strong> ${upazilla}
                </p>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 11px; background: #f8fafc; padding: 6px; border-radius: 6px; border: 1px solid #e2e8f0;">
                  <div>
                    <span style="color: #64748b; font-size: 10px;">Protected Area</span>
                    <div style="font-weight: 700; color: #0f172a;">${areaVal}</div>
                  </div>
                  <div>
                    <span style="color: #64748b; font-size: 10px;">Embankment</span>
                    <div style="font-weight: 700; color: #0f172a;">${embDisplay}</div>
                  </div>
                </div>
              </div>
            `;

            layer.bindPopup(popupContent, { maxWidth: 260 });

            layer.on({
              mouseover: (e: any) => {
                const target = e.target;
                if ((geojsonLayer as any)._selectedLayer !== target) {
                  target.setStyle({
                    weight: 2.5,
                    fillOpacity: 0.35,
                  });
                }
              },
              mouseout: (e: any) => {
                const target = e.target;
                if ((geojsonLayer as any)._selectedLayer !== target) {
                  geojsonLayer.resetStyle(target);
                }
              },
              click: (e: any) => {
                const target = e.target;
                
                // Reset previously selected layer style
                if ((geojsonLayer as any)._selectedLayer) {
                  geojsonLayer.resetStyle((geojsonLayer as any)._selectedLayer);
                }

                // Highlight clicked polder
                target.setStyle({
                  color: "#ef4444", // Bright Amber Red highlight outline
                  weight: 3.5,
                  fillColor: "#ef4444",
                  fillOpacity: 0.45,
                });

                (geojsonLayer as any)._selectedLayer = target;

                if (onSelectPolderRef.current) {
                  onSelectPolderRef.current(polderId);
                }
              },
            });
          },
        });

        geojsonLayer.addTo(map);
        geojsonLayerRef.current = geojsonLayer;
        setLoading(false);
      } catch (err) {
        console.error("Error loading polders GeoJSON:", err);
        setLoading(false);
      }
    };

    loadLeaflet();

    return () => {
      isMounted = false;
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  const toggleBasemap = (type: "streets" | "satellite") => {
    if (!mapRef.current) return;
    const map = mapRef.current;
    if (type === "satellite") {
      map.removeLayer(map._streetLayer);
      map._satLayer.addTo(map);
    } else {
      map.removeLayer(map._satLayer);
      map._streetLayer.addTo(map);
    }
    setBasemap(type);
  };

  return (
    <div
      className={
        isFullscreen
          ? "fixed inset-0 z-50 flex flex-col bg-[#0d1117] w-screen h-screen"
          : "relative w-full overflow-hidden rounded-2xl border border-[#e5e5e5] bg-[#0d1117] shadow-xl"
      }
    >
      {/* Map Control Header Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[#21262d] bg-[#161b22] px-4 py-3 text-xs shrink-0">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-lime-500 animate-pulse" />
          <span className="font-semibold text-white">Interactive Polders Map (GIS Vector Layer)</span>
          <span className="rounded bg-[#21262d] px-2 py-0.5 text-[10px] text-[#8b949e]">
            {poldersLoadedCount ? `${poldersLoadedCount} Polygons` : "Loading vector data..."}
          </span>
        </div>

        {/* Basemap Switcher & Fullscreen Controls */}
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <div className="flex rounded-lg border border-[#30363d] bg-[#0d1117] p-1">
            <button
              type="button"
              onClick={() => toggleBasemap("satellite")}
              className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                basemap === "satellite" ? "bg-white text-[#111111]" : "text-[#8b949e] hover:text-white"
              }`}
            >
              Satellite
            </button>
            <button
              type="button"
              onClick={() => toggleBasemap("streets")}
              className={`rounded-md px-2.5 py-1 text-[11px] font-semibold transition-colors ${
                basemap === "streets" ? "bg-white text-[#111111]" : "text-[#8b949e] hover:text-white"
              }`}
            >
              Streets
            </button>
          </div>

          <button
            type="button"
            onClick={toggleFullscreen}
            className="inline-flex items-center gap-1.5 rounded-lg border border-[#30363d] bg-[#0d1117] px-3 py-1.5 text-[11px] font-semibold text-[#8b949e] hover:bg-white hover:text-[#111111] transition-all"
            title={isFullscreen ? "Exit Fullscreen (Esc)" : "Expand Full Screen Map"}
          >
            {isFullscreen ? (
              <>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Exit Fullscreen</span>
              </>
            ) : (
              <>
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                <span>Full Screen</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Map Canvas */}
      <div className={`relative w-full bg-[#0d1117] ${isFullscreen ? "flex-grow h-full" : "h-[480px]"}`}>
        {loading && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-[#0d1117]/80 backdrop-blur-xs text-white">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-lime-400 border-t-transparent mb-3" />
            <p className="text-xs font-mono text-[#8b949e]">Loading 162 Polder GeoJSON Polygons...</p>
          </div>
        )}
        <div ref={containerRef} className="h-full w-full" />
      </div>

      {/* Map Legend Footer */}
      <div className="flex flex-wrap items-center justify-between border-t border-[#21262d] bg-[#161b22] px-4 py-2.5 text-[11px] text-[#8b949e] shrink-0">
        <div className="flex flex-wrap items-center gap-4">
          <span className="font-semibold text-[#c9d1d9]">Legend:</span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#38bdf8]" />
            BWDB Polders (162 Units)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" />
            Selected Polder Highlight
          </span>
        </div>
        <span>{isFullscreen ? "Press ESC to Exit Fullscreen" : "Click any polder to highlight & view attributes"}</span>
      </div>
    </div>
  );
}
