import Image from "next/image";
import content from "../../public/content.json";

/** Only literal <strong>, </strong>, and <br> become elements; all other input is escaped by React. */
export function ContentText({ value }: { value: string }) {
  const tokens = value.split(/(<strong>|<\/strong>|<br\s*\/?>)/i);
  const nodes: React.ReactNode[] = [];
  let bold: React.ReactNode[] = [];
  let inBold = false;
  tokens.forEach((token, index) => {
    if (/^<strong>$/i.test(token) && !inBold) { bold = []; inBold = true; return; }
    if (/^<\/strong>$/i.test(token) && inBold) {
      nodes.push(<strong key={index} className="text-white font-medium">{bold}</strong>);
      inBold = false;
      bold = [];
      return;
    }
    const node = /^<br\s*\/?>$/i.test(token) ? <br key={index} /> : token;
    if (inBold) bold.push(node);
    else nodes.push(node);
  });
  if (inBold) nodes.push(...bold);
  return <>{nodes}</>;
}

export function PageHero({ page }: { page: keyof typeof content.heroes }) {
  const image = content.heroes[page].image;
  return <div className="relative h-40 md:h-56 overflow-hidden" aria-hidden="true">
    <Image src={`/${image}`} alt="" fill sizes="100vw" className="object-cover" priority />
    <div className="absolute inset-0 bg-gradient-to-b from-anthracite-900/30 to-anthracite-900/90" />
  </div>;
}

export function ContactDetails() {
  const { contact } = content;
  return <div className="space-y-6">
    <div><h3 className="font-heading text-lg text-white tracking-wide mb-2">Adresa</h3>
      <address className="not-italic text-text-muted text-sm leading-relaxed"><ContentText value={contact.address} /></address></div>
    <div><h3 className="font-heading text-lg text-white tracking-wide mb-2">Otevírací doba</h3>
      <div className="text-sm space-y-1">{contact.hours.map((h, i) => <div key={i} className="flex justify-between"><span className="text-text-muted">{h.days}</span><span className="text-white">{h.time}</span></div>)}</div></div>
    <div><h3 className="font-heading text-lg text-white tracking-wide mb-2">Kontakt</h3>
      <a href={`mailto:${contact.email}`} className="text-text-muted text-sm hover:text-white transition-colors">{contact.email}</a></div>
    <div><h3 className="font-heading text-lg text-white tracking-wide mb-2">Doprava</h3>
      <p className="text-text-muted text-sm leading-relaxed"><ContentText value={contact.transport} /></p></div>
  </div>;
}
