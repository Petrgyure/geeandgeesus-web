import { ReactNode } from "react";

interface SectionProps {
  id?: string;
  children: ReactNode;
  raised?: boolean;
  className?: string;
}

export function Section({ id, children, raised, className = "" }: SectionProps) {
  return (
    <section
      id={id}
      className={`py-16 md:py-24 ${raised ? "bg-surface-raised" : ""} ${className}`}
    >
      <div className="max-w-[1200px] mx-auto px-6">{children}</div>
    </section>
  );
}

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
}

export function SectionHeader({ label, title, description }: SectionHeaderProps) {
  return (
    <div className="text-center mb-10 md:mb-16">
      <span className="inline-block text-xs font-medium tracking-[0.2em] uppercase text-white mb-3" aria-hidden="true">
        {label}
      </span>
      <h2 className="font-heading text-3xl md:text-5xl text-white tracking-wide leading-tight">
        {title}
      </h2>
      {description && (
        <p className="text-text-muted max-w-[560px] mx-auto mt-4 text-[0.95rem]">
          {description}
        </p>
      )}
    </div>
  );
}
