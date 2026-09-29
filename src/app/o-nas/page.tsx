import content from "../../../public/content.json";
import { PageHero, ContentText } from "@/components/content-blocks";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section, SectionHeader } from "@/components/section";

export const metadata: Metadata = {
  title: "O nás — Příběh Gee & Geesus",
  description: "Dva kluci, jeden barbershop, nulové kecy. Příběh barbershopu Gee & Geesus v Praze 3 na Žižkově. Biskupcova 46.",
};

export default function AboutPage() {
  return (
    <div className="pt-[72px]">
      <PageHero page="o-nas" />
      <Section>
        <SectionHeader label={content.about.label} title={content.about.title} />
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <Image
              src="/img/owners-front.jpg"
              alt="Zakladatelé Gee & Geesus před barbershopem na Biskupcově"
              width={800}
              height={600}
              className="rounded-lg aspect-[4/3] object-cover w-full"
            />
          </div>
          <div>
            <p className="text-xl md:text-2xl text-white mb-6 leading-snug"><ContentText value={content.about.lead} /></p>
            {content.about.paragraphs.map((paragraph, i) => <p key={i} className="text-text-body mb-4"><ContentText value={paragraph} /></p>)}
          </div>
        </div>
      </Section>

      <Section raised>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["/img/interior-wide.jpg", "/img/vibe-drinks.jpg", "/img/barber-work2.jpg", "/img/interior-mirror.jpg"].map((src) => (
            <div key={src} className="rounded-lg overflow-hidden aspect-square">
              <Image src={src} alt="Interiér barbershopu" width={400} height={400} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </Section>

      <Section className="text-center">
        <h2 className="font-heading text-3xl md:text-4xl text-white tracking-wide mb-4">
          Stavte se.
        </h2>
        <p className="text-text-muted mb-8">
          I kdybyste si nepřišli pro střih. Kafe a řeč je vždycky zdarma.
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
