import { JOB_DETAIL_COPY } from "@/constants/job-detail.constants";

/**
 * Gráfico de evolución del lanzamiento. De momento sin serie: solo guardamos
 * los totales acumulados por campaña, no insights día a día.
 */
export function JobEvolutionCard() {
  return (
    <section className="flex flex-col gap-4 rounded-card border border-border bg-card p-5">
      <header className="flex flex-col gap-[3px]">
        <h2 className="font-display text-[15px] font-semibold text-text-primary">
          {JOB_DETAIL_COPY.evolutionTitle}
        </h2>
        <p className="text-xs text-text-secondary">
          {JOB_DETAIL_COPY.evolutionSubtitle}
        </p>
      </header>

      <p className="rounded-md border border-dashed border-border bg-surface px-5 py-10 text-center text-[13px] leading-[1.5] text-text-muted">
        {JOB_DETAIL_COPY.evolutionEmpty}
      </p>
    </section>
  );
}
