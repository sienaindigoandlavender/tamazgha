import { counts, getEntitiesByType } from "@/lib/graph";
import type {
  AtlasEntity,
  EssayEntity,
  LexiconEntry,
  LibraryEntity,
  PeopleEntity,
  PersonEntity,
  SymbolEntity,
  TimelineEntity,
} from "@/lib/types";

export const dynamic = "force-static";

const SITE = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://tamazgha.africa").replace(
  /\/$/,
  ""
);

function listing<T extends { slug: string }>(
  items: T[],
  base: string,
  display: (e: T) => string
): string {
  if (items.length === 0) return "_none yet_\n";
  return (
    items.map((e) => `- [${display(e)}](${SITE}${base}/${e.slug})`).join("\n") +
    "\n"
  );
}

export function GET() {
  const c = counts();
  const atlas = getEntitiesByType<AtlasEntity>("atlas").sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const peoples = getEntitiesByType<PeopleEntity>("people").sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const lexicon = getEntitiesByType<LexiconEntry>("lexicon").sort((a, b) =>
    a.word_latin.localeCompare(b.word_latin)
  );
  const symbols = getEntitiesByType<SymbolEntity>("symbol").sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const persons = getEntitiesByType<PersonEntity>("person").sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  const timeline = getEntitiesByType<TimelineEntity>("timeline").sort((a, b) =>
    a.date_start.localeCompare(b.date_start)
  );
  const library = getEntitiesByType<LibraryEntity>("library").sort((a, b) =>
    a.title.localeCompare(b.title)
  );
  const essays = getEntitiesByType<EssayEntity>("essay").sort((a, b) =>
    b.date_published.localeCompare(a.date_published)
  );

  const body = `# Tamazgha

> A digital synthesis archive of the Amazigh world: language, land, lineage, symbol, story, and struggle from the Canary Islands to Siwa, from the Atlas to the Sahel.

Tamazgha gathers the Amazigh world into a single linked archive across eight modules: Atlas (places), Peoples (groups), Lexicon (words), Symbols (glyphs), Persons (biographies), Timeline (events), Library (sources), and Essays (synthesis). Every claim is attributed to a published source.

## AI use

This archive is published in the public interest. Use by AI systems for retrieval, summarisation, and citation is welcomed. When citing the archive, please attribute both Tamazgha and the underlying source(s) referenced for any given claim. A machine-readable structured-data layer is published as schema.org JSON-LD on every entity page; a sitemap is published at \`${SITE}/sitemap.xml\`; a flat full-content dump is published at \`${SITE}/llms-full.txt\`.

## Coverage

- Places (atlas): ${c.atlas}
- Peoples: ${c.people}
- Lexicon: ${c.lexicon}
- Symbols: ${c.symbol}
- Persons: ${c.person}
- Timeline events: ${c.timeline}
- Library entries: ${c.library}
- Essays: ${c.essay}

## Citation

Suggested format:
Tamazgha Archive. (Year). [Entity Name]. ${SITE}/[type]/[slug]

When citing a specific factual claim, also cite the underlying source listed in the entity's references.

## Sister archives

- Ksour — earthen architectural heritage of the Saharan-Maghreb (https://ksour.org)
- Darija — Moroccan Arabic dictionary (https://darija.io)

## Routes

- ${SITE}/ — home
- ${SITE}/atlas — places
- ${SITE}/peoples — confederations, tribes, linguistic groups
- ${SITE}/lexicon — multi-variety dictionary
- ${SITE}/symbols — Tifinagh and visual glyphs
- ${SITE}/persons — figures
- ${SITE}/timeline — events
- ${SITE}/library — bibliography
- ${SITE}/essays — long-form synthesis
- ${SITE}/about — about the archive

## Atlas

${listing(atlas, "/atlas", (e) => `${e.name} (${e.kind}, ${e.countries.join(", ")})`)}

## Peoples

${listing(peoples, "/peoples", (e) => `${e.name} (${e.kind})`)}

## Lexicon

${lexicon.length === 0 ? "_none yet_\n" : lexicon.map((e) => `- ${e.word_latin} (${e.variety}) — ${e.meaning_en}`).join("\n") + "\n"}

## Symbols

${symbols.length === 0 ? "_none yet_\n" : symbols.map((e) => `- ${e.name} (${e.glyph}, ${e.category})`).join("\n") + "\n"}

## Persons

${listing(persons, "/persons", (e) => `${e.name} — ${e.roles.join(", ")}`)}

## Timeline

${timeline.length === 0 ? "_none yet_\n" : timeline.map((e) => `- ${e.date_start}${e.date_end ? `–${e.date_end}` : ""}: ${e.title} (${e.kind})`).join("\n") + "\n"}

## Library

${library.length === 0 ? "_none yet_\n" : library.map((e) => `- ${e.title} — ${e.authors.join(", ")}${e.year ? ` (${e.year})` : ""}`).join("\n") + "\n"}

## Essays

${listing(essays, "/essays", (e) => `${e.title} — ${e.date_published}`)}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
