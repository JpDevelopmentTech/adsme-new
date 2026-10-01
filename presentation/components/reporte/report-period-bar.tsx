import { REPORT_PERIOD_COPY } from "@/constants/report-period.constants";
import { DateRangeForm } from "@/presentation/components/ui/date-range-form";
import { FormAlert } from "@/presentation/components/ui/form-alert";
import { SegmentedLinks } from "@/presentation/components/ui/segmented-links";
import type { ReportPeriodBarProps } from "@/types/report.types";

/**
 * Filtro de fechas del reporte: atajos y fechas a medida, siempre dentro del
 * lanzamiento. Ambos escriben el período en la URL y el servidor recalcula con
 * él las cifras, las gráficas y el detalle de cada plataforma.
 */
export function ReportPeriodBar({ period, presets, limits, error }: ReportPeriodBarProps) {
  return (
    <section aria-label={REPORT_PERIOD_COPY.presets} className="flex flex-col gap-3">
      {error ? <FormAlert message={error} tone="warning" /> : null}

      {/* Con `wrap` las fechas bajan de línea solo cuando no caben junto a los atajos. */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <SegmentedLinks
          label={REPORT_PERIOD_COPY.presets}
          items={presets.map((preset) => ({
            key: preset.key,
            label: preset.label,
            href: preset.href,
            isActive: preset.period.from === period.from && preset.period.to === period.to,
          }))}
        />
        {/* La clave reinicia las fechas cuando el período cambia desde un atajo. */}
        <DateRangeForm key={`${period.from}:${period.to}`} period={period} limits={limits} />
      </div>
    </section>
  );
}
