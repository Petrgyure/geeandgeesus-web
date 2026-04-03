import Link from "next/link";
import { Section } from "@/components/section";

export default function NotFound() {
  return (
    <div className="pt-[72px] min-h-screen flex items-center">
      <Section>
        <div className="text-center">
          <p className="font-heading text-8xl text-anthracite-400 mb-4">404</p>
          <h1 className="font-heading text-3xl text-white tracking-wide mb-4">
            Tady nic není
          </h1>
          <p className="text-text-muted mb-8">
            Tahle stránka neexistuje. Možná jste se ztratili — ale to nevadí, na Žižkově se ztratit je někdy to nejlepší.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-white text-anthracite-900 px-8 py-3 rounded-lg text-sm font-medium uppercase tracking-wider hover:bg-anthracite-50 transition-all"
            >
              Zpět na hlavní
            </Link>
            <Link
              href="/rezervace"
              className="inline-block border border-white text-white px-8 py-3 rounded-lg text-sm font-medium uppercase tracking-wider hover:bg-white hover:text-anthracite-900 transition-all"
            >
              Rezervovat
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
