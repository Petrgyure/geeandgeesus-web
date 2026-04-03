"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/#about", label: "O nás" },
  { href: "/sluzby", label: "Služby" },
  { href: "/galerie", label: "Galerie" },
  { href: "/blog", label: "Blog" },
  { href: "/kontakt", label: "Kontakt" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
          scrolled
            ? "bg-anthracite-700/95 backdrop-blur-xl shadow-[0_1px_0_var(--color-anthracite-500)]"
            : ""
        }`}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between h-full">
          <Link href="/" className="flex-shrink-0">
            <Image
              src="/img/logo.png"
              alt="Gee & Geesus"
              width={180}
              height={60}
              className="h-[52px] w-auto"
              priority
            />
          </Link>

          <ul className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-text-muted text-[0.85rem] font-medium uppercase tracking-[0.05em] hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="/rezervace"
            className="hidden md:inline-block bg-white text-anthracite-900 px-5 py-2.5 rounded-lg text-[0.8rem] font-medium uppercase tracking-wider hover:bg-anthracite-50 transition-all hover:-translate-y-0.5"
          >
            Rezervovat
          </Link>

          <button
            className="md:hidden relative w-7 h-5 z-[110]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Menu"
            aria-expanded={menuOpen}
          >
            <span
              className={`absolute left-0 w-full h-0.5 bg-white transition-all ${
                menuOpen ? "top-[9px] rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-[9px] w-full h-0.5 bg-white transition-all ${
                menuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`absolute left-0 w-full h-0.5 bg-white transition-all ${
                menuOpen ? "top-[9px] -rotate-45" : "top-[18px]"
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-anthracite-700/98 flex items-center justify-center transition-opacity duration-300 ${
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <ul className="text-center space-y-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="font-heading text-3xl text-white tracking-wide"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              href="/rezervace"
              className="inline-block bg-white text-anthracite-900 px-8 py-3 rounded-lg text-sm font-medium uppercase tracking-wider mt-4"
              onClick={() => setMenuOpen(false)}
            >
              Rezervovat
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
