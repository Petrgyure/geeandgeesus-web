import Link from "next/link";

interface ServiceCardProps {
  name: string;
  desc: string;
  time: string;
  price: string;
  icon: React.ReactNode;
}

export function ServiceCard({ name, desc, time, price, icon }: ServiceCardProps) {
  return (
    <div className="bg-surface-card border border-anthracite-500 rounded-lg p-6 md:p-8 text-center hover:-translate-y-1 hover:border-white transition-all group">
      <div className="mb-6 text-white">{icon}</div>
      <h3 className="font-heading text-2xl text-white tracking-wide mb-3">{name}</h3>
      <p className="text-text-muted text-sm leading-relaxed mb-6">{desc}</p>
      <div className="flex justify-between items-center py-3 border-t border-b border-anthracite-500 mb-6">
        <span className="text-text-muted text-sm">{time}</span>
        <span className="font-heading text-xl text-white">{price}</span>
      </div>
      <Link
        href="/rezervace"
        className="inline-block border-[1.5px] border-white text-white px-5 py-2 rounded-lg text-xs font-medium uppercase tracking-wider hover:bg-white hover:text-anthracite-900 transition-all"
      >
        Rezervovat
      </Link>
    </div>
  );
}
