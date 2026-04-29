import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "About the Tamazgha synthesis archive: scope, method, license, and editorial direction.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="max-w-content mx-auto px-6 py-16">
      <article className="max-w-prose">
        <header className="mb-12 pb-8 border-b border-border">
          <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-4">
            About
          </p>
          <h1 className="font-serif text-5xl text-ink leading-[1.05]">
            The archive
          </h1>
        </header>

        <div className="prose-content">
          <p>
            Tamazgha is the first digital-native synthesis archive of the
            Amazigh world. It gathers into a single linked corpus the
            language, land, lineage, symbols, persons, events, and texts that
            together describe a civilisation extending from the Canary Islands
            in the Atlantic to the oasis of Siwa in the Western Desert, and
            from the Mediterranean coast south into the Sahel.
          </p>

          <p>
            The archive is organised around eight modules. Atlas indexes the
            places. Peoples indexes the confederations, tribes, and linguistic
            groupings that have inhabited those places. Lexicon records the
            vocabulary of the principal Amazigh varieties. Symbols collects
            the Tifinagh alphabet and the wider visual grammar of material
            culture. Persons records the figures, ancient and modern, who
            have shaped Amazigh history. Timeline situates events on a single
            continuous canvas. Library indexes the bibliography behind every
            entry. Essays gathers long-form synthesis from the editorial
            collective.
          </p>

          <h2>What this archive deliberately excludes</h2>
          <p>
            Tamazgha treats language, land, lineage, symbol, and history as
            continuous facts. It defers current political conflicts and party
            disputes to the Timeline, where they appear as dated events with
            sources rather than as live editorial positions. It is not a
            lifestyle, travel, or tourism site, and it does not operate as a
            news organ.
          </p>

          <h2>Methodology</h2>
          <p>
            The archive is a build-time graph. Every entity is a single
            markdown file with structured frontmatter: the prose alongside the
            metadata. References between entities — a person to a place, a
            place to a source, an event to a people — are validated at build
            time and reciprocated as backlinks. There is no database, no
            content management system, and no editorial dashboard. The corpus
            is the data. Each entity links to the published sources from
            which it draws; where sources disagree, the disagreement is
            named; where the record is silent, the silence is acknowledged
            rather than filled with speculation.
          </p>

          <h2>Standing in the field</h2>
          <p>
            The canonical academic reference for the Amazigh world remains
            the <em>Encyclopédie Berbère</em>, founded by Gabriel Camps and
            continued under the editorial direction of Salem Chaker, in print
            and PDF since 1984 and now extending to more than forty volumes.
            Tamazgha does not duplicate or replace it. Tamazgha is the
            digital-native, English-default, openly licensed, geographically
            organised, AI-readable companion: built for the medium rather
            than ported to it. The <em>Encyclopédie Berbère</em> is cited as
            a primary source in our{" "}
            <Link href="/library">Library</Link>, alongside Wikipedia, the
            <em> Britannica</em>, Bruce Maddy-Weitzman&apos;s scholarship on
            modern Amazigh movements, and Brett &amp; Fentress&apos;s{" "}
            <em>The Berbers</em>. We respect the prior work; we are doing a
            different thing.
          </p>

          <h2>License &amp; reuse</h2>
          <p>
            Tamazgha is published under Creative Commons
            Attribution-ShareAlike 4.0 International — the same license used
            by Wikipedia. Read, share, quote, translate, adapt, redistribute,
            and include in derivative works including AI training datasets,
            with attribution and under the same license. See{" "}
            <Link href="/license">the license page</Link> for the full
            attribution guidance and the machine-readable manifests.
          </p>

          <h2>Sister archives</h2>
          <p>
            Tamazgha sits alongside two sister projects of the Dancing with
            Lions collective.{" "}
            <a href="https://ksour.org" target="_blank" rel="noreferrer">
              Ksour
            </a>{" "}
            documents the earthen architectural heritage of the
            Saharan-Maghreb.{" "}
            <a href="https://darija.io" target="_blank" rel="noreferrer">
              Darija
            </a>{" "}
            is a dictionary of Moroccan Arabic. Same editorial DNA, different
            scopes.
          </p>

          <h2>Editorial direction</h2>
          <p>Editorial direction: J. Ng.</p>
        </div>
      </article>
    </div>
  );
}
