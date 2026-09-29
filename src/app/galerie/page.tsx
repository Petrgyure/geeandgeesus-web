import content from "../../../public/content.json";
import type { Metadata } from "next";
import Image from "next/image";
import { Section, SectionHeader } from "@/components/section";
import galleryData from "../../../public/gallery.json";

export const metadata: Metadata = {
  title: "Galerie — Jak to u nás vypadá",
  description: "Prohlédněte si fotky z barbershopu Gee & Geesus na Žižkově. Interiér, střihy, vousy a atmosféra. Biskupcova 46, Praha 3.",
};

export default function GalleryPage() {
  const visiblePhotos = galleryData.gallery.filter((p) => p.visible);

  return (
    <div className="pt-[96px]">
      <Section>
        <SectionHeader label={content.gallery.label} title={content.gallery.title} />
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
          {visiblePhotos.map((photo) => {
            const isVideo = /\.(mp4|webm|mov)$/i.test(photo.src);
            return (
              <div
                key={photo.src}
                className={`overflow-hidden rounded-lg ${photo.wide ? "col-span-2 aspect-[2/1]" : "aspect-square"}`}
              >
                {isVideo ? (
                  <video
                    src={`/${photo.src}`}
                    className="w-full h-full object-cover"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                  />
                ) : (
                  <Image
                    src={`/${photo.src}`}
                    alt={photo.alt}
                    width={photo.wide ? 800 : 400}
                    height={400}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                )}
              </div>
            );
          })}
        </div>
      </Section>
    </div>
  );
}
