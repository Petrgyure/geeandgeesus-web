import content from "../../../public/content.json";
import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/section";

export const metadata: Metadata = {
  title: "Produkty — Gee & Geesus Care",
  description: "Vlastní řada péče o vlasy, vousy a pleť. Matná pasta, oleje na vousy, šampony. K dostání v barbershopu Biskupcova 46, Praha 3.",
};

export default function ProductsPage() {
  return (
    <div className="pt-[96px]">
      <Section>
        <SectionHeader
          label={content.products.label}
          title={content.products.title}
          description={content.products.desc}
        />
        <div className="grid md:grid-cols-2 gap-8">
          {content.products.items.map((item, i) => <div key={i} className="bg-surface-card border border-anthracite-500 rounded-lg overflow-hidden">
            <Image src={`/${item.img}`} alt={item.name} width={600} height={400} className="w-full aspect-[3/2] object-cover" />
            <div className="p-6 md:p-8">
              <h3 className="font-heading text-2xl text-white tracking-wide mb-3">{item.name}</h3>
              <p className="text-text-body mb-4">{item.desc}</p>
              <p className="text-text-muted text-sm">K dostání přímo v barbershopu na Biskupcově 46.</p>
            </div>
          </div>)}
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
