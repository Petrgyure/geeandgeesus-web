import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { MobileCta } from "@/components/mobile-cta";
import { Analytics } from "@/components/analytics";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
});

const bebasNeue = Bebas_Neue({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bebas",
  weight: "400",
});

export const metadata: Metadata = {
  title: {
    default: "Gee & Geesus — Pánský barber Praha 3 Žižkov | Střihy, vousy, řeči",
    template: "%s | Gee & Geesus",
  },
  description:
    "Barbershop na Žižkově, kde se nechodí jen pro střih. Pánské střihy, úprava vousů, hot towel holení a konverzace, kvůli kterým se vracíte. Biskupcova 46, Praha 3.",
  metadataBase: new URL("https://www.geeandgeesus.cz"),
  alternates: { canonical: "/" },
  openGraph: {
    title: "Gee & Geesus — Víc než barber. Praha 3, Žižkov.",
    description:
      "Barbershop, kam se chodí pro střih a zůstává se kvůli lidem. Biskupcova 46, Praha 3.",
    url: "https://www.geeandgeesus.cz",
    siteName: "Gee & Geesus",
    locale: "cs_CZ",
    type: "website",
    images: [{ url: "/img/hero-exterior.jpg", width: 1200, height: 630 }],
  },
  icons: { icon: "/img/storefront-art.png", apple: "/img/storefront-art.png" },
  other: { "theme-color": "#1a1a1a" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs" className={`${inter.variable} ${bebasNeue.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <MobileCta />
        <Analytics />
      </body>
    </html>
  );
}
