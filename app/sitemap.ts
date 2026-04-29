import type { MetadataRoute } from "next";
import { getEntitiesByType } from "@/lib/graph";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://tamazgha.africa";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/atlas",
    "/peoples",
    "/lexicon",
    "/symbols",
    "/persons",
    "/timeline",
    "/library",
    "/essays",
    "/about",
    "/license",
  ].map((p) => ({ url: `${SITE}${p}`, lastModified: now }));

  const atlas = getEntitiesByType("atlas").map((e) => ({
    url: `${SITE}/atlas/${e.slug}`,
    lastModified: now,
  }));
  const peoples = getEntitiesByType("people").map((e) => ({
    url: `${SITE}/peoples/${e.slug}`,
    lastModified: now,
  }));
  const persons = getEntitiesByType("person").map((e) => ({
    url: `${SITE}/persons/${e.slug}`,
    lastModified: now,
  }));
  const essays = getEntitiesByType("essay").map((e) => ({
    url: `${SITE}/essays/${e.slug}`,
    lastModified: now,
  }));

  return [...staticRoutes, ...atlas, ...peoples, ...persons, ...essays];
}
