"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import type { AtlasEntity, LanguageVariety } from "@/lib/types";
import { LANGUAGE_META } from "@/lib/languages";

interface Props {
  sites: AtlasEntity[];
}

export default function LanguageMap({ sites }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tokenMissing, setTokenMissing] = useState(false);

  useEffect(() => {
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
    if (!token) {
      setTokenMissing(true);
      return;
    }
    if (!containerRef.current) return;

    mapboxgl.accessToken = token;

    const map = new mapboxgl.Map({
      container: containerRef.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [-3, 27],
      zoom: 2.6,
      attributionControl: false,
      interactive: true,
    });

    map.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-right"
    );

    sites.forEach((site) => {
      const primary: LanguageVariety | undefined = site.languages?.[0];
      const meta = primary ? LANGUAGE_META[primary] : undefined;
      const color = meta?.color ?? "#737373";

      const el = document.createElement("div");
      el.style.width = "13px";
      el.style.height = "13px";
      el.style.borderRadius = "50%";
      el.style.background = color;
      el.style.border = "2px solid white";
      el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.25)";
      el.style.cursor = "pointer";
      el.style.transition = "transform 0.15s ease";
      el.setAttribute("aria-label", site.name);

      const label = meta
        ? `${site.name} — ${meta.name}`
        : `${site.name}`;

      const popup = new mapboxgl.Popup({
        offset: 12,
        closeButton: false,
        closeOnClick: false,
      }).setText(label);

      const marker = new mapboxgl.Marker(el)
        .setLngLat([site.lng, site.lat])
        .setPopup(popup)
        .addTo(map);

      let popupVisible = false;
      el.addEventListener("mouseenter", () => {
        el.style.transform = "scale(1.3)";
        if (!popupVisible) {
          marker.togglePopup();
          popupVisible = true;
        }
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "scale(1)";
        if (popupVisible) {
          marker.togglePopup();
          popupVisible = false;
        }
      });
      el.addEventListener("click", () => {
        window.location.href = `/atlas/${site.slug}`;
      });
    });

    return () => {
      map.remove();
    };
  }, [sites]);

  if (tokenMissing) {
    return (
      <div className="h-full w-full min-h-[480px] flex items-center justify-center bg-codebg border border-border">
        <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary">
          Mapbox token not configured.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-full w-full min-h-[480px] border border-border"
    />
  );
}
