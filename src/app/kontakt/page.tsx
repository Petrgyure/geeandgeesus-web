import content from "../../../public/content.json";
import { PageHero, ContactDetails } from "@/components/content-blocks";
import type { Metadata } from "next";
import { Section, SectionHeader } from "@/components/section";

export const metadata: Metadata = {
  title: "Kontakt — Kde nás najdete",
  description: "Kontakt na barbershop Gee & Geesus v Praze 3. Adresa, doprava a aktuální otevírací doba na stránce.",
};

export default function ContactPage() {
  return (
    <div className="pt-[96px]">
      <PageHero page="kontakt" />
      <Section>
        <SectionHeader label={content.contact.label} title={content.contact.title} />
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          <ContactDetails />
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
