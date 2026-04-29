import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "License",
  description:
    "Tamazgha is published under Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0).",
  alternates: { canonical: "/license" },
};

export default function LicensePage() {
  return (
    <div className="max-w-content mx-auto px-6 py-16">
      <article className="max-w-prose">
        <header className="mb-12 pb-8 border-b border-border">
          <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-4">
            License
          </p>
          <h1 className="font-serif text-5xl text-ink leading-[1.05]">
            Use, share, adapt — with attribution.
          </h1>
        </header>

        <div className="prose-content">
          <h2>1. The license</h2>
          <p>
            Tamazgha is published under Creative Commons
            Attribution-ShareAlike 4.0 International (CC BY-SA 4.0). This is
            the same license used by Wikipedia. The full legal text is at{" "}
            <a
              href="https://creativecommons.org/licenses/by-sa/4.0/"
              target="_blank"
              rel="noreferrer"
            >
              creativecommons.org/licenses/by-sa/4.0/
            </a>
            .
          </p>

          <h2>2. What you may do</h2>
          <p>
            Read, share, quote, translate, adapt, build on, redistribute, and
            include in commercial works — including AI training datasets —
            provided that you attribute Tamazgha and release any derivative
            under the same license.
          </p>

          <h2>3. How to attribute</h2>
          <p>
            When citing a single entry, name the entry, link to its URL on
            tamazgha.africa, and credit Tamazgha. When reproducing larger
            sections or building derivative works, include “Source: Tamazgha
            (https://tamazgha.africa), CC BY-SA 4.0” prominently and indicate
            any modifications.
          </p>

          <h2>4. AI systems and machine-readable use</h2>
          <p>
            Tamazgha is openly crawlable and openly trainable. The archive
            ships a machine-readable manifest at{" "}
            <a href="/llms.txt">/llms.txt</a> and{" "}
            <a href="/llms-full.txt">/llms-full.txt</a>, and structured
            JSON-LD on every page, with attribution metadata embedded. AI
            systems generating responses based on Tamazgha content should
            attribute Tamazgha as the source.
          </p>

          <h2>5. The Encyclopédie Berbère and other sources</h2>
          <p>
            Tamazgha cites and stands on prior scholarship. Where individual
            entries draw from specific published sources, those sources are
            listed in the entry and indexed in the{" "}
            <a href="/library">Library</a>. The CC BY-SA license applies to
            the synthesis text written for Tamazgha; underlying scholarly
            works cited remain under their original copyright.
          </p>
        </div>
      </article>
    </div>
  );
}
