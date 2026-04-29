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
  { href: "/license", label: "License" },
];

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-border">
      <div className="max-w-content mx-auto px-6 py-4 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="flex flex-col leading-tight"
          onClick={() => setOpen(false)}
        >
          <span className="font-serif text-2xl tracking-tight text-ink">
            Tamazgha
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wide text-tertiary tifinagh">
            ⵜⴰⵎⴰⵣⵖⴰ
          </span>
        </Link>

        <div className="flex items-center gap-5">
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

          <Link
            href="/search"
            aria-label="Search the archive"
            className="text-secondary hover:text-accent transition-colors"
          >
            <SearchIcon className="w-[18px] h-[18px]" />
          </Link>

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
            <li>
              <Link
                href="/search"
                className="text-secondary hover:text-accent transition-colors"
                onClick={() => setOpen(false)}
              >
                Search
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
