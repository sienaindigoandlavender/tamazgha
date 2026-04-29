"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
];

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
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
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href) ?? false;
  }

  const navLink =
    "font-sans text-[11px] uppercase tracking-[0.22em] transition-colors";

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-border">
      <div className="max-w-content mx-auto px-6 py-5 flex items-center justify-between gap-6">
        <Link
          href="/"
          className="flex flex-col leading-tight"
          onClick={() => setOpen(false)}
        >
          <span className="font-display text-2xl tracking-tight text-ink">
            Tamazgha
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-tertiary tifinagh">
            ⵜⴰⵎⴰⵣⵖⴰ
          </span>
        </Link>

        <div className="flex items-center gap-7">
          <nav className="hidden md:flex flex-wrap gap-x-7 gap-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`${navLink} ${
                  isActive(item.href)
                    ? "text-ink"
                    : "text-tertiary hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Link
            href="/search"
            aria-label="Search the archive"
            className={`${
              isActive("/search") ? "text-ink" : "text-tertiary hover:text-ink"
            } transition-colors`}
          >
            <SearchIcon className="w-[18px] h-[18px]" />
          </Link>

          <button
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={`md:hidden ${navLink} text-tertiary hover:text-ink`}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      {open ? (
        <nav className="md:hidden border-t border-border bg-white">
          <ul className="max-w-content mx-auto px-6 py-5 flex flex-col gap-3">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`${navLink} ${
                    isActive(item.href)
                      ? "text-ink"
                      : "text-tertiary hover:text-ink"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/search"
                className={`${navLink} ${
                  isActive("/search")
                    ? "text-ink"
                    : "text-tertiary hover:text-ink"
                }`}
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
