import { REPORT_COPY } from "@/constants/report.constants";

/**
 * Gráfico de evolución del diseño. Se queda en su estado vacío mientras no se
 * importen insights por día: dibujar una curva a partir de totales acumulados
 * sería inventarse la forma de la campaña.
 */
export function ReportTrendCard() {
  return (
    <section className="flex flex-col gap-4 rounded-card border border-border bg-card p-5">
      <header className="flex flex-col gap-[3px]">
        <h2 className="font-display text-[15px] font-semibold text-text-primary">
          {REPORT_COPY.evolutionTitle}
        </h2>
        <p className="text-xs text-text-secondary">
          {REPORT_COPY.evolutionSubtitle}
        </p>
      </header>

      <p className="rounded-md border border-dashed border-border bg-surface px-5 py-10 text-center text-[13px] leading-[1.5] text-text-muted">
        {REPORT_COPY.evolutionEmpty}
      </p>
    </section>
  );
}
