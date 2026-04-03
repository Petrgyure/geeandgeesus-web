import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Registrace",
  robots: "noindex",
};

export default function RegisterPage() {
  return (
    <div className="pt-[72px] min-h-screen flex items-center">
      <Section>
        <div className="max-w-[400px] mx-auto">
          <h1 className="font-heading text-3xl text-white tracking-wide text-center mb-8">
            Vytvořit účet
          </h1>
          <div className="bg-surface-card border border-anthracite-500 rounded-lg p-6 md:p-8">
            <div className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-wide text-text-muted mb-1">Jméno</label>
                <input
                  type="text"
                  className="w-full px-3 py-2.5 bg-anthracite-900 border border-anthracite-500 rounded-lg text-white text-sm focus:border-white focus:outline-none transition-colors"
                  placeholder="Jan Novák"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wide text-text-muted mb-1">Email</label>
                <input
                  type="email"
                  className="w-full px-3 py-2.5 bg-anthracite-900 border border-anthracite-500 rounded-lg text-white text-sm focus:border-white focus:outline-none transition-colors"
                  placeholder="vas@email.cz"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-wide text-text-muted mb-1">Heslo</label>
                <input
                  type="password"
                  className="w-full px-3 py-2.5 bg-anthracite-900 border border-anthracite-500 rounded-lg text-white text-sm focus:border-white focus:outline-none transition-colors"
                  placeholder="••••••••"
                />
              </div>
              <button className="w-full bg-white text-anthracite-900 py-3 rounded-lg text-sm font-medium uppercase tracking-wider hover:bg-anthracite-50 transition-all">
                Registrovat
              </button>
            </div>
            <p className="mt-6 text-center text-sm text-text-muted">
              Už máte účet?{" "}
              <Link href="/prihlaseni" className="text-white hover:underline">
                Přihlásit se
              </Link>
            </p>
          </div>
          <p className="text-center text-xs text-text-muted mt-6">
            Profil klienta je zatím v přípravě. Brzy tu bude.
          </p>
        </div>
      </Section>
    </div>
  );
}
