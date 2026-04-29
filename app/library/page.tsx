import type { Metadata } from "next";
import { getEntitiesByType } from "@/lib/graph";
import Prose from "@/components/shared/Prose";
import JsonLd from "@/components/shared/JsonLd";
import { libraryJsonLd } from "@/lib/schema-org";
import type { LibraryEntity } from "@/lib/types";

export const metadata: Metadata = {
  title: "Library",
  description: "The bibliography behind the archive.",
};

export default function LibraryPage() {
  const items = getEntitiesByType<LibraryEntity>("library").sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <div className="max-w-content mx-auto px-6 py-24">
      <header className="mb-12 pb-8 border-b border-border">
        <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-tertiary mb-4">
          Module
        </p>
        <h1 className="editorial-h1 text-[52px] md:text-[64px] text-ink mb-4">
          Library
        </h1>
        <p className="editorial-italic text-[22px] text-secondary max-w-prose">
          The bibliography behind the archive.
        </p>
      </header>

      {items.length === 0 ? (
        <p className="font-serif italic text-lg text-secondary max-w-[600px]">
          Forthcoming. The first entries are in preparation.
        </p>
      ) : (
        <ul className="divide-y divide-border">
          {items.map((book) => (
            <li
              key={book.id}
              id={book.slug}
              className="py-6 scroll-mt-[var(--header-height)]"
            >
              <JsonLd data={libraryJsonLd(book)} />
              <p className="font-mono text-[11px] uppercase tracking-wide text-tertiary mb-2">
                {book.kind}
                {book.year ? ` · ${book.year}` : ""}
                {book.language ? ` · ${book.language}` : ""}
              </p>
              <h2 className="font-serif text-2xl text-ink mb-1">
                {book.title}
              </h2>
              <p className="text-sm text-secondary mb-3">
                {book.authors.join(", ")}
                {book.publisher ? ` · ${book.publisher}` : ""}
              </p>
              <Prose html={book.body} />
              {book.url ? (
                <p className="mt-3 text-sm">
                  <a
                    href={book.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-[11px] uppercase tracking-wide text-accent hover:underline"
                  >
                    External link →
                  </a>
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
