# Tamazgha

A digital synthesis archive of the Amazigh world. Language, land, lineage,
symbol, story, and struggle from the Canary Islands to Siwa, from the Atlas
to the Sahel.

This repository is the codebase for `tamazgha.africa`. It is the Amazigh-
civilisation sister of [Ksour](https://ksour.org) (earthen architectural
heritage) and shares Ksour's architecture: hardcoded markdown content with
YAML frontmatter, a build-time bidirectional graph, Next.js App Router with
TypeScript, Tailwind, Mapbox GL.

## Stack

- Next.js 14 (App Router) + TypeScript strict
- Tailwind CSS
- gray-matter + remark/remark-gfm/remark-html (markdown → HTML at build time)
- Mapbox GL JS (atlas map)
- Local `lib/graph.json` produced by `scripts/build-graph.ts` from
  `content/**/*.md`

## Modules

The archive is organised around eight modules. Each module corresponds to one
entity type and one route:

| Module    | Route       | Type     | Status          |
| --------- | ----------- | -------- | --------------- |
| Atlas     | `/atlas`    | atlas    | 12 seed entries |
| Peoples   | `/peoples`  | people   | stub            |
| Lexicon   | `/lexicon`  | lexicon  | stub            |
| Symbols   | `/symbols`  | symbol   | stub            |
| Persons   | `/persons`  | person   | 1 seed entry    |
| Timeline  | `/timeline` | timeline | stub            |
| Library   | `/library`  | library  | 1 seed entry    |
| Essays    | `/essays`   | essay    | stub            |

The `/about` and `/license` static pages also resolve.

Stub modules render as proper list pages with a "Forthcoming" message; every
URL works on day one.

## Atlas seed entries

1. Kabylia (region, Algeria)
2. Rif (region, Morocco)
3. Souss (valley, Morocco)
4. Hoggar (mountain, Algeria)
5. Siwa (oasis, Egypt)
6. M'zab (oasis, Algeria)
7. Aurès (mountain, Algeria)
8. Canary Islands (island, Spain)
9. Agadez (city, Niger)
10. Ghadames (oasis, Libya)
11. Tassili n'Ajjer (site, Algeria)
12. Atlas Mountains (mountain, Morocco/Algeria/Tunisia)

## Library seed entry

One library entry (`Histoire de l'Afrique du Nord`, Charles-André Julien) is
included so that the bidirectional backlinks system has at least one
cross-reference visible on day one (cited by the Aurès atlas entry, and so
appearing in the Aurès "Referenced in" panel).

## Local development

```bash
cp .env.local.example .env.local
# fill NEXT_PUBLIC_MAPBOX_TOKEN to enable the Mapbox map (the build runs without it)
npm install
npm run dev
```

The `predev` and `prebuild` hooks run `scripts/build-graph.ts`, which walks
`content/`, validates references, produces `lib/graph.json`, and embeds
rendered HTML on each entity. To validate without writing the graph:

```bash
npm run validate-graph
```

## Environment variables

- `NEXT_PUBLIC_SITE_URL` — canonical site URL (default `https://tamazgha.africa`)
- `NEXT_PUBLIC_MAPBOX_TOKEN` — Mapbox access token. If absent the maps render
  a small "Mapbox token not configured." message and the rest of the site
  works.

## License

Tamazgha is published under Creative Commons Attribution-ShareAlike 4.0
International (CC BY-SA 4.0) — the same license used by Wikipedia.
See [`/license`](https://tamazgha.africa/license),
[`/llms.txt`](https://tamazgha.africa/llms.txt), and the
JSON-LD `license`/`creator`/`publisher` fields on every entity page.

## Decisions made during this build

These choices were made where the brief was silent or self-conflicting:

1. **One library entry and one person entry were added even though Phase 7
   specifies "Atlas only, this pass."** The audit checklist requires
   backlinks to render correctly on at least one atlas detail page.
   Atlas-to-atlas references are not in the brief's `REFERENCE_RELATIONS`
   schema, so the only schema-permitted way to produce a backlink on an
   atlas page is to have another module entity reference an atlas entry.
   I added `lib-julien-histoire-afrique-nord` (cited by Aurès via
   `sources`) and `person-kahina` (associated with Aurès via
   `associated_atlas`). The Aurès page therefore shows a populated
   "Referenced in" panel.

2. **The Tifinagh wordmark `ⵜⴰⵎⴰⵣⵖⴰ`** appears in the header beneath the
   "Tamazgha" wordmark, in the `--font-tifinagh` family. The home page H1
   also carries a small Tifinagh sub-line.

3. **Google Analytics ID is `G-PLACEHOLDER-TAMAZGHA`** with a TODO comment
   in `app/layout.tsx`. Replace once the GA4 property exists.

4. **Atlas country filter for the Canary Islands** is labelled
   "Spain (Canary Is.)" so it remains discoverable to readers who don't
   immediately associate the islands with Spanish jurisdiction.

5. **JSON-LD attribution shape.** Every JSON-LD block emits the same
   attribution structure required by the brief: `license`,
   `isAccessibleForFree`, `inLanguage`, `creator` (Tamazgha), `publisher`
   (Dancing with Lions), `dateModified` (the graph build timestamp), and
   `isPartOf` (the Tamazgha WebSite). Atlas, Person, and Essay detail
   pages emit one JSON-LD block per entity; the hash-anchored Lexicon,
   Symbols, Timeline, and Library list pages emit one block per item
   inline alongside each list entry.
