import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/section";

export const metadata: Metadata = {
  title: "Kontakt — Kde nás najdete",
  description: "Barbershop Gee & Geesus, Biskupcova 46, Praha 3 Žižkov. Otevírací doba Po-Pá 8-18. Tramvaje 1, 9, 10, 11, 16, 26.",
};

export default function ContactPage() {
  return (
    <div className="pt-[72px]">
      <Section>
        <SectionHeader label="Kontakt" title="Najdete nás na rohu" />
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <div className="space-y-6">
            <div>
              <h3 className="font-heading text-lg text-white tracking-wide mb-2">Adresa</h3>
              <address className="not-italic text-text-muted text-sm leading-relaxed">
                Biskupcova 46<br />Praha 3, 130 00<br />Česká republika
              </address>
            </div>
            <div>
              <h3 className="font-heading text-lg text-white tracking-wide mb-2">Otevírací doba</h3>
              <div className="text-sm space-y-1">
                <div className="flex justify-between"><span className="text-text-muted">Pondělí – Pátek</span><span className="text-white">8:00 – 18:00</span></div>
                <div className="flex justify-between"><span className="text-text-muted">Sobota – Neděle</span><span className="text-white">Zavřeno</span></div>
              </div>
            </div>
            <div>
              <h3 className="font-heading text-lg text-white tracking-wide mb-2">Kontakt</h3>
              <a href="mailto:geeandgeesus@gmail.com" className="text-text-muted text-sm hover:text-white transition-colors">geeandgeesus@gmail.com</a>
            </div>
            <div>
              <h3 className="font-heading text-lg text-white tracking-wide mb-2">Doprava</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                Tramvaje: 1, 9, 10, 11, 16, 26<br />
                Zastávky: Biskupcova, Ohrada, Vozovna Žižkov (100&nbsp;m)<br />
                Parkování: modré a hnědé zóny v okolí
              </p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden min-h-[300px] md:min-h-[400px] bg-surface-raised">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.785451280661!2d14.471695677609542!3d50.09030367152567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b93ba6f2dd77d%3A0xaee58c0941360c79!2sGee%20and%20Geesus!5e0!3m2!1sen!2scz!4v1775208352487!5m2!1sen!2scz"
              width="100%" height="100%" style={{ border: 0, minHeight: 400 }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Mapa – Gee & Geesus barbershop"
            />
          </div>
        </div>
      </Section>
    </div>
  );
}
