import { PLATFORM_ORDER } from "@/constants/platform-labels.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import type { ReportGrowthColumnProps } from "@/types/report.types";

/** Altura, en porcentaje del área, que ocupa el día más alto del lanzamiento. */
const PEAK_HEIGHT = 92;

/** Orden fijo del apilado, con YouTube en la base para poder comparar días. */
const STACK = [...PLATFORM_ORDER].reverse();

/**
 * Un día del lanzamiento. Los que aún no han llegado se dibujan como carril
 * vacío: el hueco a la derecha dice cuánta pauta queda, no que no hubiera datos.
 */
export function ReportGrowthColumn({ day, peak }: ReportGrowthColumnProps) {
  if (day.isPending || day.total === 0) {
    return (
      <div className="flex flex-1 flex-col justify-end">
        <span className="h-[3px] rounded-pill bg-g-300" />
      </div>
    );
  }

  const segments = STACK.map((platform) => ({
    platform,
    amount: day.byPlatform[platform],
    color: PLATFORM_META[platform].chartColor,
  })).filter((segment) => segment.amount > 0);

  return (
    <div className="flex flex-1 flex-col justify-end gap-px">
      {segments.map((segment, index) => (
        <span
          key={segment.platform}
          className={`min-h-[2px] shrink-0 ${index === 0 ? "rounded-t-[5px]" : ""}`}
          style={{
            height: `${(segment.amount / peak) * PEAK_HEIGHT}%`,
            backgroundColor: segment.color,
          }}
        />
      ))}
    </div>
  );
}
