import { PLATFORM_META } from "@/constants/platforms.constants";
import {
  REPORT_COPY,
  REPORT_PLATFORM_SECTION,
  REPORT_TONE_CLASSES,
} from "@/constants/report.constants";
import { ReportMetricGrid } from "@/presentation/components/reporte/report-metric-grid";
import type { ReportPlatformSectionProps } from "@/types/report.types";
import { buildPlatformMetrics } from "@/utils/build-report-metrics";
import { cn } from "@/utils/cn";
import { formatPercent, share } from "@/utils/format-compact-number";

/**
 * Bloque de una plataforma. Todas traen la misma cabecera y las mismas tres
 * métricas, para que se puedan comparar entre sí de un vistazo; lo que cambia
 * es el peso que tuvo cada una sobre la inversión.
 */
export function ReportPlatformSection({
  metrics,
  totalSpend,
}: ReportPlatformSectionProps) {
  const section = REPORT_PLATFORM_SECTION[metrics.platform];
  const tone = REPORT_TONE_CLASSES[section.tone];
  const { Icon } = PLATFORM_META[metrics.platform];

  return (
    <section className="flex flex-col gap-5">
      <header className="flex flex-wrap items-center gap-3">
        <span
          aria-hidden
          className={cn("grid size-[46px] place-items-center rounded-md", tone.chip)}
        >
          <span className={tone.icon}>
            <Icon size={24} />
          </span>
        </span>

        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h2 className="font-display text-[22px] font-bold text-text-primary">
            {section.title}
          </h2>
          <p className="text-[13px] text-text-secondary">
            {metrics.campaigns} {metrics.campaigns === 1 ? "campaña" : "campañas"}
            {metrics.activeCampaigns > 0
              ? ` · ${metrics.activeCampaigns} ${metrics.activeCampaigns === 1 ? "activa" : "activas"}`
              : ""}{" "}
            · {section.networks}
          </p>
        </div>

        {totalSpend > 0 ? (
          <span
            className={cn(
              "shrink-0 rounded-pill border px-3.5 py-1.5 text-[13px] font-semibold",
              tone.border,
              tone.text,
            )}
          >
            {REPORT_COPY.spendShare(formatPercent(share(metrics.spend, totalSpend)))}
          </span>
        ) : null}
      </header>

      <ReportMetricGrid metrics={buildPlatformMetrics(metrics)} />
    </section>
  );
}
