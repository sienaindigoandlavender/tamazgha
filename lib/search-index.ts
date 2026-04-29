import type { Entity, EntityType } from "./types";

export interface SearchIndexEntry {
  id: string;
  type: EntityType;
  slug: string;
  title: string;
  href: string;
  haystack: string;
}

const hrefs: Record<EntityType, (slug: string) => string> = {
  atlas: (s) => `/atlas/${s}`,
  people: (s) => `/peoples/${s}`,
  lexicon: (s) => `/lexicon#${s}`,
  symbol: (s) => `/symbols#${s}`,
  person: (s) => `/persons/${s}`,
  timeline: (s) => `/timeline#${s}`,
  library: (s) => `/library#${s}`,
  essay: (s) => `/essays/${s}`,
};

function title(e: Entity): string {
  switch (e.type) {
    case "atlas":
    case "people":
    case "person":
    case "symbol":
      return e.name;
    case "lexicon":
      return e.word_latin;
    case "timeline":
    case "library":
    case "essay":
      return e.title;
  }
}

function aliases(e: Entity): string[] {
  const out: (string | undefined)[] = [];
  if ("name_tamazight" in e) out.push(e.name_tamazight);
  if ("name_tifinagh" in e) out.push(e.name_tifinagh);
  if ("name_ar" in e) out.push(e.name_ar);
  if ("alternate_names" in e) out.push(...(e.alternate_names ?? []));
  if ("endonym" in e) out.push(e.endonym);
  if ("exonyms" in e) out.push(...(e.exonyms ?? []));
  if ("name_alternate" in e) out.push(...(e.name_alternate ?? []));
  if ("word_tifinagh" in e) out.push(e.word_tifinagh);
  if ("word_arabic" in e) out.push(e.word_arabic);
  return out.filter((x): x is string => Boolean(x));
}

export function buildSearchIndex(entities: Entity[]): SearchIndexEntry[] {
  return entities.map((e) => {
    const t = title(e);
    return {
      id: e.id,
      type: e.type,
      slug: e.slug,
      title: t,
      href: hrefs[e.type](e.slug),
      haystack: [t, ...aliases(e)].join(" · ").toLowerCase(),
    };
  });
}
