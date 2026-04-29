import Link from "next/link";

const modules = [
  { href: "/atlas", label: "Atlas" },
  { href: "/peoples", label: "Peoples" },
  { href: "/lexicon", label: "Lexicon" },
  { href: "/symbols", label: "Symbols" },
  { href: "/persons", label: "Persons" },
  { href: "/timeline", label: "Timeline" },
  { href: "/library", label: "Library" },
  { href: "/essays", label: "Essays" },
  { href: "/languages", label: "Languages" },
  { href: "/license", label: "License" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border mt-32 bg-white">
      <div className="max-w-content mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 text-meta text-tertiary">
        <div>
          <p className="font-display text-xl text-ink mb-3">Tamazgha</p>
          <p className="leading-[1.8]">
            A digital synthesis archive of the Amazigh world: language, land,
            lineage, symbol, story, and struggle from the Canary Islands to
            Siwa.
          </p>
          <p className="mt-5 font-sans text-[11px] uppercase tracking-[0.2em]">
            <Link href="/license" className="hover:text-ink transition-colors">
              Licensed CC BY-SA 4.0 → /license
            </Link>
          </p>
        </div>
        <div>
          <p className="text-ink mb-4 font-sans text-[11px] uppercase tracking-[0.22em]">
            Modules
          </p>
          <ul className="space-y-2">
            {modules.map((m) => (
              <li key={m.href}>
                <Link
                  href={m.href}
                  className="font-sans text-[11px] uppercase tracking-[0.2em] hover:text-ink transition-colors"
                >
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-ink mb-4 font-sans text-[11px] uppercase tracking-[0.22em]">
            Sister archives
          </p>
          <ul className="space-y-2">
            <li>
              <a
                href="https://ksour.org"
                target="_blank"
                rel="noreferrer"
                className="hover:text-ink transition-colors"
              >
                Ksour — Earthen architectural heritage
              </a>
            </li>
            <li>
              <a
                href="https://darija.io"
                target="_blank"
                rel="noreferrer"
                className="hover:text-ink transition-colors"
              >
                Darija — Moroccan Arabic dictionary
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-content mx-auto px-6 py-7 border-t border-border text-meta text-tertiary flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p>© Tamazgha. A Dancing with Lions project.</p>
        <p className="font-sans text-[11px] uppercase tracking-[0.22em]">
          Synthesis of public scholarly and institutional work
        </p>
      </div>
    </footer>
  );
}
