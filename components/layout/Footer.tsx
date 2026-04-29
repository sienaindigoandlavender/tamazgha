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
  { href: "/about", label: "About" },
  { href: "/license", label: "License" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24 bg-white">
      <div className="max-w-content mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-meta text-tertiary">
        <div>
          <p className="font-serif text-base text-ink mb-2">Tamazgha</p>
          <p className="leading-relaxed">
            A digital synthesis archive of the Amazigh world: language, land,
            lineage, symbol, story, and struggle from the Canary Islands to
            Siwa.
          </p>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-wide">
            <Link href="/license" className="hover:text-accent transition-colors">
              Licensed CC BY-SA 4.0 → /license
            </Link>
          </p>
        </div>
        <div>
          <p className="text-ink mb-3 font-mono uppercase tracking-wide">
            Modules
          </p>
          <ul className="space-y-1">
            {modules.map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="hover:text-accent transition-colors">
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-ink mb-3 font-mono uppercase tracking-wide">
            Sister archives
          </p>
          <ul className="space-y-1">
            <li>
              <a
                href="https://ksour.org"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent transition-colors"
              >
                Ksour — Earthen architectural heritage
              </a>
            </li>
            <li>
              <a
                href="https://darija.io"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent transition-colors"
              >
                Darija — Moroccan Arabic dictionary
              </a>
            </li>
          </ul>
          <p className="mt-4">Editorial direction: J. Ng</p>
        </div>
      </div>
      <div className="max-w-content mx-auto px-6 py-6 border-t border-border text-meta text-tertiary flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <p>© Tamazgha. A Dancing with Lions project.</p>
        <p className="font-mono uppercase tracking-wide">
          Synthesis of public scholarly and institutional work
        </p>
      </div>
    </footer>
  );
}
