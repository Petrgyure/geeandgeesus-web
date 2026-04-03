import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/section";

export const metadata: Metadata = {
  title: "Produkty — Gee & Geesus Care",
  description: "Vlastní řada péče o vlasy, vousy a pleť. Matná pasta, oleje na vousy, šampony. K dostání v barbershopu Biskupcova 46, Praha 3.",
};

export default function ProductsPage() {
  return (
    <div className="pt-[72px]">
      <Section>
        <SectionHeader
          label="Produkty"
          title="Naše značka"
          description="Co používáme na vás, děláme i pro vás. Protože co dáváme na vás, chceme mít pod kontrolou."
        />
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-surface-card border border-anthracite-500 rounded-lg overflow-hidden">
            <Image src="/img/products-line.jpg" alt="Gee & Geesus produktová řada" width={600} height={400} className="w-full aspect-[3/2] object-cover" />
            <div className="p-6 md:p-8">
              <h3 className="font-heading text-2xl text-white tracking-wide mb-3">Péče o vlasy &amp; vousy</h3>
              <p className="text-text-body mb-4">Matná pasta na vlasy, oleje na vousy, šampony. Vyvinuto přímo pro naše klienty — protože jsme nenašli nic, co by nás přesvědčilo.</p>
              <p className="text-text-muted text-sm">K dostání přímo v barbershopu na Biskupcově 46.</p>
            </div>
          </div>
          <div className="bg-surface-card border border-anthracite-500 rounded-lg overflow-hidden">
            <Image src="/img/merch-display.jpg" alt="Gee & Geesus merch kolekce" width={600} height={400} className="w-full aspect-[3/2] object-cover" />
            <div className="p-6 md:p-8">
              <h3 className="font-heading text-2xl text-white tracking-wide mb-3">Merch kolekce</h3>
              <p className="text-text-body mb-4">Mikiny, trička, kšiltovky s logem G&G. Limitované edice, co nekoupíte online. Jen u nás.</p>
              <p className="text-text-muted text-sm">Nové kousky přibývají. Sledujte nás na Instagramu.</p>
            </div>
          </div>
        </div>
      </Section>

      <Section raised>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {["/img/merch-hoodies.jpg", "/img/merch-tees.jpg", "/img/product-detail1.jpg", "/img/merch-cap.jpg"].map((src) => (
            <div key={src} className="rounded-lg overflow-hidden aspect-square">
              <Image src={src} alt="Gee & Geesus produkt" width={400} height={400} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}
