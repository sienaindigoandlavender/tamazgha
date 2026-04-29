import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the Tamazgha synthesis archive: scope, method, and editorial direction.",
};

export default function AboutPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-16">
      <article className="max-w-prose">
        <header className="mb-12 pb-8 border-b border-border">
          <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-4">
            About
          </p>
          <h1 className="font-serif text-5xl text-ink leading-[1.05] mb-3">
            The archive
          </h1>
        </header>

        <div className="prose-content">
          <p>
            Tamazgha is a synthesis archive of the Amazigh world. It gathers
            into a single linked corpus the language, land, lineage, symbols,
            persons, events, and texts that together describe a civilisation
            extending from the Canary Islands in the Atlantic to the oasis of
            Siwa in the Western Desert, and from the Mediterranean coast south
            to the Sahel.
          </p>

          <p>
            The archive is organised around eight modules. Atlas indexes the
            places — the regions, mountains, oases, valleys, cities, and sites
            that constitute Tamazgha as a geography. Peoples indexes the
            confederations, tribes, and linguistic groupings that have
            historically inhabited that geography. Lexicon, presently in
            preparation, will record the vocabulary of the principal Amazigh
            varieties — Tachelhit, Central Tamazight, Tarifit, Kabyle, Chaoui,
            Mozabite, Tamasheq, Siwi, and others. Symbols collects the Tifinagh
            alphabet and the wider visual grammar of Amazigh material culture.
            Persons records the figures, ancient and modern, who have shaped
            Amazigh history and culture. Timeline situates events on a single
            continuous canvas. Library indexes the bibliography behind every
            entry. Essays gathers long-form synthesis from the editorial
            collective.
          </p>

          <h2>Scope</h2>
          <p>
            The archive describes language, land, lineage, symbol, story, and
            struggle as continuous historical facts. It deliberately defers
            current political conflicts and party disputes to the Timeline,
            where they appear as dated events with sources, rather than as
            contemporary editorial positions. The archive is published in
            English. Source-language terms — Tamazight in any of its varieties,
            Arabic, French, Spanish — are preserved in entity metadata.
          </p>

          <h2>Method</h2>
          <p>
            The archive does not contain original fieldwork. It synthesises
            existing institutional and academic publications, paraphrases their
            findings, and links every entity to the sources from which it
            draws. Where sources disagree, the disagreement is named.
            Where the record is silent, the silence is acknowledged rather
            than filled with speculation.
          </p>

          <p>
            Technically, the archive is a build-time graph. Every entity is a
            markdown file with structured frontmatter. References between
            entities — a person to a place, a place to a source, an event to a
            people — are validated at build time and reciprocated as
            backlinks. There is no database. The corpus is the data.
          </p>

          <h2>Sister archives</h2>
          <p>
            Tamazgha sits alongside two sister projects of the Dancing with
            Lions collective. Ksour documents the earthen architectural
            heritage of the Saharan-Maghreb. Darija is a dictionary of
            Moroccan Arabic. The three archives are independently structured
            and editorially distinct; they share a method and a typographic
            register.
          </p>

          <h2>Citation</h2>
          <p>Suggested citation for any entity in the archive:</p>
          <blockquote>
            Tamazgha Archive. (Year). [Entity name]. https://tamazgha.africa/[type]/[slug]
          </blockquote>

          <h2>Editorial direction</h2>
          <p>Editorial direction: J. Ng.</p>
        </div>
      </article>
    </div>
  );
}
