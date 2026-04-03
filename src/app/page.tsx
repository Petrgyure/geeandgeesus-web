import Image from "next/image";
import Link from "next/link";
import { Hero } from "@/components/hero";
import { Section, SectionHeader } from "@/components/section";
import { ServiceCard } from "@/components/service-card";

const services = [
  {
    name: "Střih",
    desc: "Konzultace, mytí, střih a styling. Odcházíte tak, jak jste si to představovali — nebo líp.",
    time: "40 min",
    price: "799 Kč",
    icon: (
      <svg viewBox="0 0 64 64" width="48" height="48"><path d="M32 8c-4 0-7 3-7 7v10h14V15c0-4-3-7-7-7zM22 28v4c0 6 4.5 11 10 11s10-5 10-11v-4H22z" fill="none" stroke="currentColor" strokeWidth="2.5"/><path d="M28 48v8M36 48v8M24 56h16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
    ),
  },
  {
    name: "Úprava vousu",
    desc: "Tvarování, kontury, péče. Váš vous v rukách někoho, kdo ví, co dělá.",
    time: "40 min",
    price: "699 Kč",
    icon: (
      <svg viewBox="0 0 64 64" width="48" height="48"><path d="M20 20c0 8 5 16 12 20 7-4 12-12 12-20" fill="none" stroke="currentColor" strokeWidth="2.5"/><path d="M26 30h12M32 26v8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M32 44v12" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
    ),
  },
  {
    name: "Holení Hot Towel",
    desc: "Horký ručník, břitva, klid. Staré řemeslo v čisté formě. Tohle si zasloužíte.",
    time: "40 min",
    price: "699 Kč",
    icon: (
      <svg viewBox="0 0 64 64" width="48" height="48"><ellipse cx="32" cy="24" rx="12" ry="8" fill="none" stroke="currentColor" strokeWidth="2.5"/><path d="M20 24v8c0 4.4 5.4 8 12 8s12-3.6 12-8v-8" fill="none" stroke="currentColor" strokeWidth="2.5"/><path d="M26 44c0 2 2.7 4 6 4s6-2 6-4" fill="none" stroke="currentColor" strokeWidth="2.5"/><path d="M24 16c2-4 5-6 8-6s6 2 8 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>
    ),
  },
  {
    name: "Komplet",
    desc: "Střih, holení, vousy — celá hodina jen pro vás. Nejlepší verze, se kterou odejdete.",
    time: "60 min",
    price: "1 299 Kč",
    icon: (
      <svg viewBox="0 0 64 64" width="48" height="48"><rect x="16" y="12" width="32" height="40" rx="4" fill="none" stroke="currentColor" strokeWidth="2.5"/><path d="M24 20h16M24 28h16M24 36h10" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/><path d="M38 36l4 4 6-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
    ),
  },
];

const galleryPreview = [
  { src: "/img/interior-wide.jpg", alt: "Interiér Gee & Geesus", wide: true },
  { src: "/img/beard-trim.jpg", alt: "Úprava vousů", wide: false },
  { src: "/img/barber-work1.jpg", alt: "Barber při práci", wide: false },
  { src: "/img/exterior-corner.jpg", alt: "Barbershop zvenku", wide: true },
  { src: "/img/mirror-check.jpg", alt: "Kontrola střihu", wide: false },
  { src: "/img/haircut-result.jpg", alt: "Výsledek střihu", wide: false },
];

const products = [
  {
    img: "/img/products-line.jpg",
    name: "Péče o vlasy & vousy",
    desc: "Matná pasta, oleje na vousy, šampony. Vyvinuto pro kluky, co to s péčí myslí vážně.",
  },
  {
    img: "/img/merch-display.jpg",
    name: "Merch",
    desc: "Mikiny, trička, kšiltovky. Limitky, co nekoupíte online. Jen u nás na Biskupcově.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* About */}
      <Section id="about">
        <SectionHeader
          label="O nás"
          title="Kam se chodí pro střih. A zůstává se kvůli lidem."
        />
        <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div>
            <Image
              src="/img/owners-happy.jpg"
              alt="Zakladatelé barbershopu Gee & Geesus Praha 3"
              width={600}
              height={800}
              className="rounded-lg aspect-[3/4] object-cover w-full"
            />
          </div>
          <div>
            <p className="text-xl md:text-2xl text-white mb-6 leading-snug">
              Nejsme salón. Nejsme franchise. Jsme dva kluci s břitvou a&nbsp;názorem.
            </p>
            <p className="text-text-body mb-4">
              Gee &amp; Geesus je pánský barber na Žižkově, kde se věci řeší na rovinu. Přijdete pro střih nebo úpravu vousů — a odcházíte s pocitem, že jste strávili čas s lidmi, se kterými vás to baví.
            </p>
            <p className="text-text-body mb-4">
              Spousta našich klientů nechodí jen pro vlasy. Zastaví se na kafe, na řeč, na drink. Proberou víkend, práci, život. Věci, které jinde neřeknete.
            </p>
            <p className="text-text-body">
              Pracujeme s naší vlastní řadou{" "}
              <strong className="text-white font-medium">Gee &amp; Geesus</strong> — protože co dáváme na vás, chceme mít pod kontrolou.
            </p>
          </div>
        </div>
      </Section>

      {/* Services */}
      <Section id="services" raised>
        <SectionHeader label="Služby" title="Řemeslo, ne rychlokurs" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((s) => (
            <ServiceCard key={s.name} {...s} />
          ))}
        </div>
      </Section>

      {/* Gallery preview */}
      <Section id="gallery">
        <SectionHeader label="Galerie" title="Jak to u nás vypadá" />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
          {galleryPreview.map((photo) => (
            <div
              key={photo.src}
              className={`overflow-hidden rounded-lg ${photo.wide ? "col-span-2 aspect-[2/1]" : "aspect-square"}`}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                width={photo.wide ? 800 : 400}
                height={400}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link href="/galerie" className="text-text-muted hover:text-white text-sm tracking-wide transition-colors">
            Zobrazit celou galerii &rarr;
          </Link>
        </div>
      </Section>

      {/* Products */}
      <Section raised>
        <SectionHeader
          label="Produkty"
          title="Naše značka"
          description="Co používáme na vás, děláme i pro vás. Vlastní řada péče o vlasy, vousy a pleť — k dostání přímo v barbershopu."
        />
        <div className="grid md:grid-cols-2 gap-6">
          {products.map((p) => (
            <div key={p.name} className="bg-surface-card border border-anthracite-500 rounded-lg overflow-hidden hover:-translate-y-1 hover:border-white transition-all">
              <Image src={p.img} alt={p.name} width={600} height={375} className="w-full aspect-[16/10] object-cover" />
              <div className="p-6">
                <h3 className="font-heading text-xl text-white tracking-wide mb-2">{p.name}</h3>
                <p className="text-text-muted text-sm">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Booking CTA */}
      <Section className="!bg-gradient-to-br from-surface-raised via-anthracite-600 to-anthracite-400 text-center">
        <SectionHeader
          label="Rezervace"
          title="Tvoje křeslo čeká"
          description="Vyber si termín, přijď, sedni si. Zbytek necháš na nás."
        />
        <Link
          href="/rezervace"
          className="inline-block bg-white text-anthracite-900 px-10 py-4 rounded-lg text-[0.95rem] font-medium uppercase tracking-wider hover:bg-anthracite-50 hover:-translate-y-0.5 transition-all"
        >
          Zarezervovat online
        </Link>
      </Section>

      {/* Contact */}
      <Section id="contact">
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
              <p className="text-text-muted text-sm leading-relaxed">Tramvaje: 1, 9, 10, 11, 16, 26<br />Zastávky: Biskupcova, Ohrada, Vozovna Žižkov (100&nbsp;m)</p>
            </div>
          </div>
          <div className="rounded-lg overflow-hidden min-h-[300px] md:min-h-[400px] bg-surface-raised">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2559.785451280661!2d14.471695677609542!3d50.09030367152567!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x470b93ba6f2dd77d%3A0xaee58c0941360c79!2sGee%20and%20Geesus!5e0!3m2!1sen!2scz!4v1775208352487!5m2!1sen!2scz"
              width="100%" height="100%" style={{ border: 0, minHeight: 300 }}
              allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
              title="Mapa – Gee & Geesus barbershop"
            />
          </div>
        </div>
      </Section>

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BarberShop",
            name: "Gee & Geesus",
            description: "Pánský barbershop v Praze 3 na Žižkově. Střihy, úprava vousů, hot towel holení a místo, kam se chodí i jen na řeč.",
            url: "https://www.geeandgeesus.cz",
            email: "geeandgeesus@gmail.com",
            address: { "@type": "PostalAddress", streetAddress: "Biskupcova 46", addressLocality: "Praha 3", postalCode: "13000", addressCountry: "CZ" },
            geo: { "@type": "GeoCoordinates", latitude: 50.0903, longitude: 14.4717 },
            openingHoursSpecification: [{ "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday"], opens: "08:00", closes: "18:00" }],
            priceRange: "699–1299 CZK",
            image: "https://www.geeandgeesus.cz/img/hero-exterior.jpg",
            sameAs: ["https://www.instagram.com/geeandgeesus/", "https://www.facebook.com/geeandgeesus/"],
          }),
        }}
      />
    </>
  );
}
