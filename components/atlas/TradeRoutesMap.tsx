"use client";

import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { TRADE_ROUTES, type TradeRoute } from "@/lib/trade-routes";

interface Props {
  highlightId?: string | null;
  onSelect?: (id: string | null) => void;
}

export default function TradeRoutesMap({ highlightId }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
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
      center: [3, 22],
      zoom: 3,
      attributionControl: false,
    });
    mapRef.current = map;

    map.addControl(
      new mapboxgl.AttributionControl({ compact: true }),
      "bottom-right"
    );

    map.on("load", () => {
      TRADE_ROUTES.forEach((route: TradeRoute) => {
        const sourceId = `route-src-${route.id}`;
        const layerId = `route-layer-${route.id}`;

        map.addSource(sourceId, {
          type: "geojson",
          data: {
            type: "Feature",
            properties: { id: route.id, name: route.name },
            geometry: {
              type: "LineString",
              coordinates: route.waypoints.map((w) => [w.lng, w.lat]),
            },
          },
        });

        map.addLayer({
          id: layerId,
          type: "line",
          source: sourceId,
          layout: { "line-cap": "round", "line-join": "round" },
          paint: {
            "line-color": route.color,
            "line-width": 2.5,
            "line-opacity": route.status === "active" ? 0.95 : 0.7,
            "line-dasharray":
              route.status === "active" ? [1] : [2, 1.5],
          },
        });

        // waypoint markers
        route.waypoints.forEach((w, i) => {
          const isTerminus = i === 0 || i === route.waypoints.length - 1;
          const el = document.createElement("div");
          el.style.width = isTerminus ? "12px" : "9px";
          el.style.height = isTerminus ? "12px" : "9px";
          el.style.borderRadius = "50%";
          el.style.background = route.color;
          el.style.border = "2px solid white";
          el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.3)";
          el.style.cursor = w.atlas ? "pointer" : "default";
          el.setAttribute("aria-label", w.name);

          const popup = new mapboxgl.Popup({
            offset: 12,
            closeButton: false,
            closeOnClick: false,
          }).setText(`${w.name} — ${route.shortName}`);

          const marker = new mapboxgl.Marker(el)
            .setLngLat([w.lng, w.lat])
            .setPopup(popup)
            .addTo(map);

          let popupVisible = false;
          el.addEventListener("mouseenter", () => {
            if (!popupVisible) {
              marker.togglePopup();
              popupVisible = true;
            }
          });
          el.addEventListener("mouseleave", () => {
            if (popupVisible) {
              marker.togglePopup();
              popupVisible = false;
            }
          });
          if (w.atlas) {
            el.addEventListener("click", () => {
              const slug = w.atlas!.replace(/^atlas-/, "");
              window.location.href = `/atlas/${slug}`;
            });
          }
        });
      });
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // re-paint line widths when highlightId changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !map.isStyleLoaded()) return;
    TRADE_ROUTES.forEach((route) => {
      const layerId = `route-layer-${route.id}`;
      if (!map.getLayer(layerId)) return;
      const isHighlighted = highlightId === route.id;
      const isDimmed = highlightId && highlightId !== route.id;
      map.setPaintProperty(
        layerId,
        "line-width",
        isHighlighted ? 4 : 2.5
      );
      map.setPaintProperty(
        layerId,
        "line-opacity",
        isDimmed ? 0.2 : route.status === "active" ? 0.95 : 0.75
      );
    });
  }, [highlightId]);

  if (tokenMissing) {
    return (
      <div className="h-full w-full min-h-[520px] flex items-center justify-center bg-codebg border border-border">
        <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-tertiary">
          Mapbox token not configured.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="h-full w-full min-h-[520px] border border-border"
    />
  );
}
