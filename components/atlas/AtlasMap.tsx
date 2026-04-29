"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import type { AtlasEntity, AtlasKind } from "@/lib/types";

interface Props {
  sites: AtlasEntity[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

const kindColors: Record<AtlasKind, string> = {
  region: "#0a0a0a",
  mountain: "#737373",
  oasis: "#16a34a",
  valley: "#2563eb",
  city: "#b8543a",
  island: "#0891b2",
  site: "#7c3aed",
};

export default function AtlasMap({ sites, selectedId, onSelect }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<Map<string, mapboxgl.Marker>>(new Map());
  const [tokenMissing, setTokenMissing] = useState(false);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      setTokenMissing(true);
      return;
    }
    if (!containerRef.current || mapRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-3, 27],
      zoom: 3,
      attributionControl: false,
    });

    map.addControl(
      new mapboxgl.NavigationControl({ showCompass: false }),
      "top-right"
    );
    map.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-right"
    );

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current.clear();

    sites.forEach((site) => {
      const el = document.createElement("div");
      el.style.width = "12px";
      el.style.height = "12px";
      el.style.borderRadius = "50%";
      el.style.background = kindColors[site.kind];
      el.style.border = "2px solid white";
      el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.25)";
      el.style.cursor = "pointer";
      el.style.transition = "transform 0.15s ease";
      el.setAttribute("aria-label", site.name);

      el.addEventListener("mouseenter", () => {
        el.style.transform = "scale(1.3)";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = selectedId === site.id ? "scale(1.4)" : "scale(1)";
      });
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        onSelect(site.id);
      });

      const marker = new mapboxgl.Marker(el)
        .setLngLat([site.lng, site.lat])
        .addTo(map);

      markersRef.current.set(site.id, marker);
    });
  }, [sites, onSelect, selectedId]);

  useEffect(() => {
    markersRef.current.forEach((marker, id) => {
      const el = marker.getElement();
      if (id === selectedId) {
        el.style.transform = "scale(1.4)";
        el.style.boxShadow = "0 0 0 4px rgba(184,84,58,0.25), 0 1px 3px rgba(0,0,0,0.25)";
      } else {
        el.style.transform = "scale(1)";
        el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.25)";
      }
    });

    if (selectedId && mapRef.current) {
      const site = sites.find((s) => s.id === selectedId);
      if (site) {
        mapRef.current.flyTo({
          center: [site.lng, site.lat],
          zoom: Math.max(mapRef.current.getZoom(), 5),
          duration: 600,
        });
      }
    }
  }, [selectedId, sites]);

  if (tokenMissing) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-codebg border border-border">
        <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary">
          Mapbox token not configured.
        </p>
      </div>
    );
  }

  return <div ref={containerRef} className="h-full w-full" />;
}
