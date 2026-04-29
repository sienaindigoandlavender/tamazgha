import graphData from "./graph.json";
import type {
  BacklinkRef,
  Entity,
  EntityID,
  EntityType,
  Graph,
} from "./types";

const graph = graphData as unknown as Graph;

export function getEntity(id: EntityID): Entity | null {
  return graph.entities[id] ?? null;
}

export function getEntitiesByType<T extends Entity>(type: EntityType): T[] {
  return Object.values(graph.entities).filter((e) => e.type === type) as T[];
}

export function getBacklinks(id: EntityID): BacklinkRef[] {
  return graph.backlinks[id] ?? [];
}

export function getEntityBySlug(type: EntityType, slug: string): Entity | null {
  return (
    Object.values(graph.entities).find(
      (e) => e.type === type && e.slug === slug,
    ) ?? null
  );
}

export function getAllSlugs(type: EntityType): string[] {
  return getEntitiesByType(type).map((e) => e.slug);
}

export function counts(): Record<EntityType, number> {
  const out: Record<EntityType, number> = {
    atlas: 0,
    people: 0,
    lexicon: 0,
    symbol: 0,
    person: 0,
    timeline: 0,
    library: 0,
    essay: 0,
  };
  for (const e of Object.values(graph.entities)) {
    out[e.type]++;
  }
  return out;
}

export function resolveRefs(ids: EntityID[] | undefined): Entity[] {
  if (!ids) return [];
  return ids.map((id) => getEntity(id)).filter((e): e is Entity => e !== null);
}

export function entityHref(entity: Entity): string {
  switch (entity.type) {
    case "atlas":
      return `/atlas/${entity.slug}`;
    case "people":
      return `/peoples/${entity.slug}`;
    case "lexicon":
      return `/lexicon#${entity.slug}`;
    case "symbol":
      return `/symbols#${entity.slug}`;
    case "person":
      return `/persons/${entity.slug}`;
    case "timeline":
      return `/timeline#${entity.slug}`;
    case "library":
      return `/library#${entity.slug}`;
    case "essay":
      return `/essays/${entity.slug}`;
  }
}

export function entityTitle(entity: Entity): string {
  switch (entity.type) {
    case "atlas":
    case "people":
    case "person":
    case "symbol":
      return entity.name;
    case "lexicon":
      return entity.word_latin;
    case "timeline":
    case "library":
    case "essay":
      return entity.title;
  }
}
