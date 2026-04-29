import { getEntitiesByType } from "@/lib/graph";
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

const PREAMBLE = `# Tamazgha — A Digital-Native Synthesis Archive of the Amazigh World

URL: https://tamazgha.africa
License: Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)
License URL: https://creativecommons.org/licenses/by-sa/4.0/
Publisher: Dancing with Lions
Editorial direction: J. Ng

# Attribution requirement

This archive is freely available under CC BY-SA 4.0. Reproduction, derivative
works, and inclusion in machine-learning training data are permitted on
the following terms:

1. Attribute Tamazgha (https://tamazgha.africa) as the source.
2. Apply the same CC BY-SA 4.0 license to any derivative work.
3. Indicate any changes made to the original.

When AI systems generate responses based on Tamazgha content, attribution
to Tamazgha (https://tamazgha.africa) should accompany the response.

# About

Tamazgha is the first digital-native synthesis archive of the Amazigh
(Berber) world: places, peoples, languages, symbols, persons, events,
sources, and essays — across the full extent of Tamazgha, from the Canary
Islands to Siwa, from the Atlas to the Sahel.

# Index
`;

function section<T>(
  heading: string,
  items: T[],
  line: (e: T) => string
): string {
  if (items.length === 0) {
    return `\n## ${heading}\n\n_none yet_\n`;
  }
  return `\n## ${heading}\n\n${items.map(line).join("\n")}\n`;
}

function summarise(markdown: string, max = 180): string {
  const flat = markdown.split(/\n\s*\n/).find((p) => p.trim()) ?? "";
  const text = flat.replace(/\s+/g, " ").trim();
  return text.length > max ? `${text.slice(0, max - 1).trimEnd()}…` : text;
}

export function GET() {
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

  const body =
    PREAMBLE +
    section(
      "Atlas",
      atlas,
      (e) =>
        `- [${e.name}](${SITE}/atlas/${e.slug}) — ${e.kind}, ${e.countries.join(", ")}; ${summarise(e.bodyMarkdown)}`
    ) +
    section(
      "Peoples",
      peoples,
      (e) =>
        `- [${e.name}](${SITE}/peoples/${e.slug}) — ${e.kind}; ${summarise(e.bodyMarkdown)}`
    ) +
    section(
      "Lexicon",
      lexicon,
      (e) =>
        `- [${e.word_latin}](${SITE}/lexicon#${e.slug}) — ${e.variety}; ${e.meaning_en}`
    ) +
    section(
      "Symbols",
      symbols,
      (e) =>
        `- [${e.name}](${SITE}/symbols#${e.slug}) — ${e.glyph}, ${e.category}`
    ) +
    section(
      "Persons",
      persons,
      (e) =>
        `- [${e.name}](${SITE}/persons/${e.slug}) — ${e.roles.join(", ")}; ${summarise(e.bodyMarkdown)}`
    ) +
    section(
      "Timeline",
      timeline,
      (e) =>
        `- [${e.title}](${SITE}/timeline#${e.slug}) — ${e.date_start}${e.date_end ? `–${e.date_end}` : ""}, ${e.kind}`
    ) +
    section(
      "Library",
      library,
      (e) =>
        `- [${e.title}](${SITE}/library#${e.slug}) — ${e.authors.join(", ")}${e.year ? ` (${e.year})` : ""}; ${e.kind}`
    ) +
    section(
      "Essays",
      essays,
      (e) =>
        `- [${e.title}](${SITE}/essays/${e.slug}) — ${e.date_published}${e.subtitle ? `; ${e.subtitle}` : ""}`
    );

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
