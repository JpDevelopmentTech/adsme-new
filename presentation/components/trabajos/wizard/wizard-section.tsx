import type { WizardSectionProps } from "@/types/job-wizard.types";

/**
 * Bloque del asistente: los campos agrupados por la pregunta que responden. Con
 * icono se titula en grande («Qué se lanza»); sin él, con un rótulo en
 * versalitas, como los grupos de interruptores del reporte.
 */
export function WizardSection({ label, icon, children }: WizardSectionProps) {
  return (
    <section className="flex flex-col gap-4">
      {icon ? (
        <h3 className="flex items-center gap-2.5 text-base font-normal text-text-primary">
          <span className="grid size-[30px] place-items-center rounded-[10px] bg-surface text-lilac">
            {icon}
          </span>
          {label}
        </h3>
      ) : (
        <h3 className="text-[11px] font-medium tracking-[1.4px] text-text-muted uppercase">{label}</h3>
      )}
      {children}
    </section>
  );
}
