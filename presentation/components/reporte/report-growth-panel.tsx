import { PLATFORM_ORDER } from "@/constants/platform-labels.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import { REPORT_COPY } from "@/constants/report.constants";
import { ReportGrowthChart } from "@/presentation/components/reporte/report-growth-chart";
import type { ReportGrowthPanelProps } from "@/types/report.types";
import { formatCompactNumber } from "@/utils/format-compact-number";

/**
 * Cómo fue creciendo el lanzamiento. Una sola gráfica con las tres plataformas
 * sobre el mismo eje, cada una con su trazado: así se ve de un vistazo cuál
 * tiró y en qué días, que es lo que antes obligaba a comparar de memoria entre
 * secciones separadas por pantallas de scroll.
 */
export function ReportGrowthPanel({ growth, period }: ReportGrowthPanelProps) {
  const label = REPORT_COPY.growthSubtitle(period);

  return (
    <section className="glass-panel flex flex-col gap-[18px] rounded-card p-[22px]">
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-[3px]">
          <h2 className="font-display text-[15px] font-normal tracking-[-0.2px] text-text-primary">
            {REPORT_COPY.growthTitle}
          </h2>
          <p className="text-[12px] text-text-secondary">{label}</p>
        </div>

        {/* La leyenda lleva el total de cada plataforma: el color dice cuál es
            la curva y la cifra dice cuánto puso, sin tener que medirla a ojo. */}
        <ul className="flex flex-wrap items-center gap-3.5">
          {PLATFORM_ORDER.filter((platform) => growth.totals[platform] > 0).map(
            (platform) => (
              <li
                key={platform}
                className="flex items-center gap-[6px] text-[10.5px] text-text-secondary"
              >
                <span
                  aria-hidden
                  className="h-[3px] w-3.5 rounded-pill"
                  style={{ backgroundColor: PLATFORM_META[platform].chartColor }}
                />
                {PLATFORM_META[platform].label}
                <span className="text-text-primary">
                  {formatCompactNumber(growth.totals[platform])}
                </span>
              </li>
            ),
          )}
        </ul>
      </header>

      <ReportGrowthChart growth={growth} label={label} />
    </section>
  );
}
