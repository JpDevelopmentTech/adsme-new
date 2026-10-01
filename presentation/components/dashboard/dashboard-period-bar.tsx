import { MAX_DASHBOARD_PERIOD_DAYS } from "@/constants/dashboard-period.constants";
import { PeriodPresets } from "@/presentation/components/dashboard/period-presets";
import { DateRangeForm } from "@/presentation/components/ui/date-range-form";
import { FormAlert } from "@/presentation/components/ui/form-alert";
import type { DashboardPeriodBarProps } from "@/types/dashboard-period.types";

/**
 * Barra que fija el lapso que analiza el dashboard: atajos a la izquierda y
 * fechas a medida a la derecha. Ambos escriben el período en la URL, y el
 * servidor recalcula con él todo lo que hay debajo.
 */
export function DashboardPeriodBar({ period, presets, error }: DashboardPeriodBarProps) {
  return (
    <div className="flex flex-col gap-3">
      {error ? <FormAlert message={error} tone="warning" /> : null}

      {/* Con `wrap` las fechas bajan de línea solo cuando no caben junto a los
          atajos, en lugar de apretarse y partirse en varias filas. */}
      <div className="flex flex-wrap items-start justify-between gap-3">
        <PeriodPresets presets={presets} period={period} />
        {/* La clave reinicia las fechas del formulario cuando el período cambia
            desde un atajo, sin un efecto que las sincronice a mano. */}
        <DateRangeForm
          key={`${period.from}:${period.to}`}
          period={period}
          limits={{ maxDays: MAX_DASHBOARD_PERIOD_DAYS }}
        />
      </div>
    </div>
  );
}
