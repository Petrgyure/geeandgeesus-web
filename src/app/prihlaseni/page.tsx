import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/section";

export const metadata: Metadata = {
  title: "Klientský profil",
  robots: "noindex",
};

export default function LoginPage() {
  return (
    <div className="pt-[96px] min-h-screen flex items-center">
      <Section>
        <div className="max-w-[500px] mx-auto text-center">
          <h1 className="font-heading text-3xl text-white tracking-wide mb-6">
            Klientský profil je v přípravě
          </h1>
          <p className="text-text-muted mb-8">
            Přihlášení zatím není spuštěné. Na střih se ale můžeš objednat už teď.
          </p>
          <Link href="/rezervace" className="inline-block bg-white text-anthracite-900 px-6 py-3 rounded-lg text-sm font-medium uppercase tracking-wider hover:bg-anthracite-50 transition-colors">
            Rezervovat termín
          </Link>
        </div>
      </Section>
    </div>
  );
}
