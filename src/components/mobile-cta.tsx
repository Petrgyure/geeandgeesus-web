"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function MobileCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () =>
      setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-[60] md:hidden p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] bg-anthracite-700/97 backdrop-blur-xl border-t border-anthracite-500 transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <Link
        href="/rezervace"
        className="block w-full bg-white text-anthracite-900 py-3 rounded-lg text-center text-sm font-medium uppercase tracking-wider"
      >
        Rezervovat online
      </Link>
    </div>
  );
}
