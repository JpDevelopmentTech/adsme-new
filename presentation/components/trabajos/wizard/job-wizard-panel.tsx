import type { JobWizardPanelProps } from "@/types/job-wizard.types";

/** Panel del paso en vidrio grueso: qué toca hacer, el cuerpo y las acciones al pie. */
export function JobWizardPanel({ title, subtitle, footer, children }: JobWizardPanelProps) {
  return (
    <section className="glass-thick flex flex-col overflow-hidden rounded-card">
      <header className="flex flex-col gap-1.5 border-b border-border px-[30px] pt-[26px] pb-5">
        <h2 className="text-2xl font-light text-text-primary">{title}</h2>
        <p className="text-sm leading-[1.5] text-text-secondary">{subtitle}</p>
      </header>

      <div className="flex flex-col gap-7 px-[30px] pt-6 pb-7">{children}</div>

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-border px-[30px] py-[18px]">
        {footer}
      </div>
    </section>
  );
}
