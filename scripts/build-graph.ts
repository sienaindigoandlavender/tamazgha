import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { markdownToHtml } from "../lib/markdown";
import type {
  BacklinkRef,
  Backlinks,
  Entity,
  EntityID,
  EntityType,
  Graph,
} from "../lib/types";

const ROOT = path.resolve(__dirname, "..");
const CONTENT_DIR = path.join(ROOT, "content");
const LIB_DIR = path.join(ROOT, "lib");

const ENTITY_DIRS: Record<string, EntityType> = {
  atlas: "atlas",
  peoples: "people",
  lexicon: "lexicon",
  symbols: "symbol",
  persons: "person",
  timeline: "timeline",
  library: "library",
  essays: "essay",
};

const ID_PREFIX: Record<EntityType, string> = {
  atlas: "atlas-",
  people: "people-",
  lexicon: "word-",
  symbol: "symbol-",
  person: "person-",
  timeline: "event-",
  library: "lib-",
  essay: "essay-",
};

interface RelationSpec {
  field: string;
  label: string;
}

const REFERENCE_RELATIONS: Record<EntityType, RelationSpec[]> = {
  atlas: [
    { field: "peoples", label: "homeland of" },
    { field: "related_persons", label: "associated with" },
    { field: "sources", label: "cites" },
  ],
  people: [
    { field: "parent_group", label: "subgroup of" },
    { field: "sub_groups", label: "parent of" },
    { field: "homeland_atlas", label: "located in" },
    { field: "notable_persons", label: "claims" },
    { field: "sources", label: "cites" },
  ],
  lexicon: [
    { field: "related_entries", label: "related word" },
    { field: "sources", label: "cites" },
  ],
  symbol: [
    { field: "regions", label: "appears in" },
    { field: "sources", label: "cites" },
  ],
  person: [
    { field: "peoples", label: "member of" },
    { field: "associated_atlas", label: "active in" },
    { field: "related_events", label: "involved in" },
    { field: "sources", label: "cites" },
  ],
  timeline: [
    { field: "related_persons", label: "involves" },
    { field: "related_atlas", label: "occurred at" },
    { field: "related_peoples", label: "concerns" },
    { field: "sources", label: "cites" },
  ],
  library: [],
  essay: [
    { field: "references", label: "discusses" },
    { field: "sources", label: "cites" },
  ],
};

interface ValidationError {
  file: string;
  message: string;
}

const errors: ValidationError[] = [];

function entityTitle(e: Entity): string {
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

async function readEntities(): Promise<Entity[]> {
  const entities: Entity[] = [];

  for (const [folder, type] of Object.entries(ENTITY_DIRS)) {
    const dir = path.join(CONTENT_DIR, folder);
    let files: string[] = [];
    try {
      files = await fs.readdir(dir);
    } catch {
      continue;
    }

    for (const file of files) {
      if (!file.endsWith(".md") && !file.endsWith(".mdx")) continue;
      const full = path.join(dir, file);
      const raw = await fs.readFile(full, "utf8");
      const { data, content } = matter(raw);
      const slug = file.replace(/\.(md|mdx)$/, "");
      const sourcePath = path.relative(ROOT, full);

      if (data.type && data.type !== type) {
        errors.push({
          file: sourcePath,
          message: `frontmatter type "${data.type}" does not match folder type "${type}"`,
        });
      }

      const id = (data.id as string) ?? `${ID_PREFIX[type]}${slug}`;
      if (!id.startsWith(ID_PREFIX[type])) {
        errors.push({
          file: sourcePath,
          message: `id "${id}" must start with prefix "${ID_PREFIX[type]}"`,
        });
      }

      const html = await markdownToHtml(content);

      const entity = {
        ...data,
        type,
        id,
        slug: data.slug ?? slug,
        body: html,
        bodyMarkdown: content,
      } as Entity;

      entities.push(entity);
    }
  }

  return entities;
}

function validateReferences(entities: Entity[]): Map<EntityID, Entity> {
  const byId = new Map<EntityID, Entity>();

  for (const e of entities) {
    if (byId.has(e.id)) {
      errors.push({
        file: e.slug,
        message: `duplicate id "${e.id}"`,
      });
      continue;
    }
    byId.set(e.id, e);
  }

  for (const e of entities) {
    const fields = REFERENCE_RELATIONS[e.type] ?? [];
    for (const { field } of fields) {
      const v = (e as unknown as Record<string, unknown>)[field];
      if (v == null) continue;
      const refs = Array.isArray(v) ? v : [v];
      for (const ref of refs) {
        if (typeof ref !== "string") {
          errors.push({
            file: e.id,
            message: `field "${field}" contains a non-string reference`,
          });
          continue;
        }
        if (!byId.has(ref)) {
          errors.push({
            file: e.id,
            message: `field "${field}" references unknown entity "${ref}"`,
          });
        }
      }
    }
  }

  return byId;
}

function buildBacklinks(
  entities: Entity[],
  byId: Map<EntityID, Entity>
): Backlinks {
  const backlinks: Backlinks = {};

  for (const e of entities) {
    const fields = REFERENCE_RELATIONS[e.type] ?? [];
    for (const { field, label } of fields) {
      const v = (e as unknown as Record<string, unknown>)[field];
      if (v == null) continue;
      const refs = Array.isArray(v) ? v : [v];
      for (const ref of refs) {
        if (typeof ref !== "string") continue;
        const target = byId.get(ref);
        if (!target) continue;
        if (!backlinks[ref]) backlinks[ref] = [];
        const blRef: BacklinkRef = {
          fromId: e.id,
          fromType: e.type,
          fromSlug: e.slug,
          fromTitle: entityTitle(e),
          label,
        };
        backlinks[ref].push(blRef);
      }
    }
  }

  return backlinks;
}

async function main() {
  const validateOnly = process.argv.includes("--validate-only");

  await fs.mkdir(LIB_DIR, { recursive: true });

  const entities = await readEntities();
  const byId = validateReferences(entities);

  if (errors.length > 0) {
    console.error(`\nGraph validation failed with ${errors.length} error(s):\n`);
    for (const e of errors) console.error(`  ${e.file}: ${e.message}`);
    process.exit(1);
  }

  const graph: Graph = {
    entities: Object.fromEntries(entities.map((e) => [e.id, e])),
    backlinks: buildBacklinks(entities, byId),
    generatedAt: new Date().toISOString(),
  };

  if (validateOnly) {
    console.log(`Validated ${entities.length} entities, no errors.`);
    return;
  }

  await fs.writeFile(
    path.join(LIB_DIR, "graph.json"),
    JSON.stringify(graph, null, 2)
  );

  const counts: Record<EntityType, number> = {
    atlas: 0,
    people: 0,
    lexicon: 0,
    symbol: 0,
    person: 0,
    timeline: 0,
    library: 0,
    essay: 0,
  };
  for (const e of entities) counts[e.type]++;

  console.log(
    `Built graph: ${entities.length} entities ` +
      Object.entries(counts)
        .filter(([, n]) => n > 0)
        .map(([t, n]) => `${t}=${n}`)
        .join(" ")
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
