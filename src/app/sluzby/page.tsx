import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/section";
import { ServiceCard } from "@/components/service-card";

export const metadata: Metadata = {
  title: "Služby — Pánské střihy, vousy a holení",
  description: "Střih 799 Kč, úprava vousů 699 Kč, hot towel holení 699 Kč, komplet 1299 Kč. Pánský barber Gee & Geesus, Biskupcova 46, Praha 3.",
};

const services = [
  {
    name: "Střih",
    desc: "Konzultace, mytí, střih a styling. Odcházíte tak, jak jste si to představovali — nebo líp.",
    time: "40 min",
    price: "799 Kč",
    icon: <svg viewBox="0 0 64 64" width="48" height="48"><path d="M32 8c-4 0-7 3-7 7v10h14V15c0-4-3-7-7-7zM22 28v4c0 6 4.5 11 10 11s10-5 10-11v-4H22z" fill="none" stroke="currentColor" strokeWidth="2.5"/><path d="M28 48v8M36 48v8M24 56h16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>,
  },
  {
    name: "Úprava vousu",
    desc: "Tvarování, kontury, péče. Váš vous v rukách někoho, kdo ví, co dělá.",
    time: "40 min",
    price: "699 Kč",
    icon: <svg viewBox="0 0 64 64" width="48" height="48"><path d="M20 20c0 8 5 16 12 20 7-4 12-12 12-20" fill="none" stroke="currentColor" strokeWidth="2.5"/><path d="M26 30h12M32 26v8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M32 44v12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>,
  },
  {
    name: "Holení Hot Towel",
    desc: "Horký ručník, břitva, klid. Staré řemeslo v čisté formě. Tohle si zasloužíte.",
    time: "40 min",
    price: "699 Kč",
    icon: <svg viewBox="0 0 64 64" width="48" height="48"><ellipse cx="32" cy="24" rx="12" ry="8" fill="none" stroke="currentColor" strokeWidth="2.5"/><path d="M20 24v8c0 4.4 5.4 8 12 8s12-3.6 12-8v-8" fill="none" stroke="currentColor" strokeWidth="2.5"/><path d="M26 44c0 2 2.7 4 6 4s6-2 6-4" fill="none" stroke="currentColor" strokeWidth="2.5"/><path d="M24 16c2-4 5-6 8-6s6 2 8 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>,
  },
  {
    name: "Komplet",
    desc: "Střih, holení, vousy — celá hodina jen pro vás. Nejlepší verze, se kterou odejdete.",
    time: "60 min",
    price: "1 299 Kč",
    icon: <svg viewBox="0 0 64 64" width="48" height="48"><rect x="16" y="12" width="32" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5"/><path d="M24 20h16M24 28h16M24 36h10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M38 36l4 4 6-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-[72px]">
      <Section raised>
        <SectionHeader
          label="Služby"
          title="Řemeslo, ne rychlokurs"
          description="Každá služba začíná konzultací. Řeknete, co chcete — a my to uděláme. Nebo navrhneme něco lepšího."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((s) => (
            <ServiceCard key={s.name} {...s} />
          ))}
        </div>
      </Section>

      <Section className="text-center">
        <h2 className="font-heading text-3xl md:text-4xl text-white tracking-wide mb-4">
          Připraven?
        </h2>
        <p className="text-text-muted mb-8">
          Vyber si termín, přijď, sedni si. Zbytek necháš na nás.
        </p>
        <Link
          href="/rezervace"
          className="inline-block bg-white text-anthracite-900 px-10 py-4 rounded-lg text-[0.95rem] font-medium uppercase tracking-wider hover:bg-anthracite-50 hover:-translate-y-0.5 transition-all"
        >
          Zarezervovat křeslo
        </Link>
      </Section>
    </div>
  );
}
