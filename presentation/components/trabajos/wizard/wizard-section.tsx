import type { WizardSectionProps } from "@/types/job-wizard.types";

/** Bloque del asistente: los campos agrupados por la pregunta que responden. */
export function WizardSection({ label, children }: WizardSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase">
        {label}
      </h3>
      {children}
    </section>
  );
}
