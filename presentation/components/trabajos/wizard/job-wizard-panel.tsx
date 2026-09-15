import type { JobWizardPanelProps } from "@/types/job-wizard.types";

/** Panel del paso: cabecera con lo que toca hacer, cuerpo y acciones al pie. */
export function JobWizardPanel({
  title,
  subtitle,
  footer,
  children,
}: JobWizardPanelProps) {
  return (
    <section className="glass-panel flex flex-col overflow-hidden rounded-card">
      <header className="flex flex-col gap-[3px] px-6 py-4">
        <h2 className="font-display text-[17px] font-normal tracking-[-0.3px] text-text-primary">
          {title}
        </h2>
        <p className="text-[12px] text-text-secondary">{subtitle}</p>
      </header>

      <div className="h-px bg-border/60" />

      <div className="flex flex-col gap-6 p-6">{children}</div>

      <div className="h-px bg-border/60" />

      <div className="flex flex-wrap items-center justify-between gap-4 px-6 py-3.5">
        {footer}
      </div>
    </section>
  );
}
