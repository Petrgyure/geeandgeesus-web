import Image from "next/image";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/img/hero-exterior.jpg"
          className="w-full h-full object-cover"
        >
          <source src="/img/hero-video.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-anthracite-900/40 via-anthracite-900/60 to-anthracite-900/[0.92]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <Image
          src="/img/logo.png"
          alt="Gee & Geesus"
          width={280}
          height={233}
          className="w-[220px] md:w-[280px] h-auto mx-auto mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.5)]"
          priority
        />
        <h1 className="font-heading text-4xl md:text-6xl text-white tracking-[0.15em] uppercase mb-2">
          Gee &amp; Geesus
          <span className="sr-only"> — pánský barber Praha 3 Žižkov</span>
        </h1>
        <p className="text-text-muted text-[0.95rem] tracking-[0.1em] mb-10">
          Střihy &bull; Vousy &bull; Řeči &bull; Biskupcova 46, Praha 3
        </p>
        <Link
          href="/rezervace"
          className="inline-block bg-white text-anthracite-900 px-10 py-4 rounded-lg text-[0.95rem] font-medium uppercase tracking-wider hover:bg-anthracite-50 hover:-translate-y-0.5 hover:shadow-[var(--shadow-glow-lg)] transition-all"
        >
          Zarezervovat křeslo
        </Link>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted animate-bounce z-10"
        aria-label="Scroll down"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </a>
    </section>
  );
}
