import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Profil klienta",
  robots: "noindex",
};

export default function ProfilePage() {
  return (
    <div className="pt-[72px] min-h-screen">
      <Section>
        <div className="max-w-[600px] mx-auto text-center">
          <h1 className="font-heading text-3xl text-white tracking-wide mb-4">
            Profil klienta
          </h1>
          <p className="text-text-muted mb-8">
            Klientský profil s historií návštěv a věrnostním programem je v přípravě.
          </p>
          <div className="bg-surface-card border border-anthracite-500 rounded-lg p-8">
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="text-center">
                <p className="font-heading text-2xl text-white">—</p>
                <p className="text-xs text-text-muted uppercase tracking-wide mt-1">Návštěvy</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-2xl text-white">—</p>
                <p className="text-xs text-text-muted uppercase tracking-wide mt-1">Body</p>
              </div>
              <div className="text-center">
                <p className="font-heading text-2xl text-white">—</p>
                <p className="text-xs text-text-muted uppercase tracking-wide mt-1">Klient od</p>
              </div>
            </div>
            <p className="text-text-muted text-sm mb-6">
              Brzy tu najdete historii svých návštěv, oblíbené služby a věrnostní body.
            </p>
            <Link
              href="/rezervace"
              className="inline-block bg-white text-anthracite-900 px-8 py-3 rounded-lg text-sm font-medium uppercase tracking-wider hover:bg-anthracite-50 transition-all"
            >
              Zarezervovat další návštěvu
            </Link>
          </div>
        </div>
      </Section>
    </div>
  );
}
