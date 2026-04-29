"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = [
  { href: "/atlas", label: "Atlas" },
  { href: "/peoples", label: "Peoples" },
  { href: "/lexicon", label: "Lexicon" },
  { href: "/symbols", label: "Symbols" },
  { href: "/persons", label: "Persons" },
  { href: "/timeline", label: "Timeline" },
  { href: "/library", label: "Library" },
  { href: "/essays", label: "Essays" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-border">
      <div className="max-w-content mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <Link href="/" className="flex flex-col leading-tight" onClick={() => setOpen(false)}>
          <span className="font-serif text-2xl tracking-tight text-ink">
            Tamazgha
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wide text-tertiary tifinagh">
            ⵜⴰⵎⴰⵣⵖⴰ
          </span>
        </Link>

        <nav className="hidden md:flex flex-wrap gap-x-5 gap-y-1 font-mono text-[11px] uppercase tracking-wide">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-secondary hover:text-accent transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden font-mono text-[11px] uppercase tracking-wide text-secondary hover:text-accent"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav className="md:hidden border-t border-border bg-white">
          <ul className="max-w-content mx-auto px-6 py-4 flex flex-col gap-3 font-mono text-[11px] uppercase tracking-wide">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-secondary hover:text-accent transition-colors"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
