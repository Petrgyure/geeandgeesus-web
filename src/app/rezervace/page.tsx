import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/section";

export const metadata: Metadata = {
  title: "Rezervace — Online objednávka",
  description: "Zarezervujte si termín v barbershopu Gee & Geesus online. Střihy, úprava vousů a hot towel holení. Biskupcova 46, Praha 3.",
};

export default function ReservationPage() {
  return (
    <div className="pt-[72px]">
      <Section className="!bg-gradient-to-br from-surface-raised via-anthracite-600 to-anthracite-400">
        <SectionHeader
          label="Rezervace"
          title="Tvoje křeslo čeká"
          description="Vyber si termín, přijď, sedni si. Zbytek necháš na nás."
        />
        <div className="max-w-[700px] mx-auto bg-white rounded-lg overflow-hidden">
          <iframe
            src="https://noona.app/cs/geeandgeesus/book?iframe=true&darkModeDisabled=true&showCancelButton=true"
            width="100%"
            height="600"
            style={{ height: "70vh", minHeight: 500, borderRadius: 8 }}
            title="Online rezervace Gee & Geesus"
            loading="lazy"
          />
        </div>
      </Section>
    </div>
  );
}
