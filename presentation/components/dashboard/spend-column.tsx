import { PLATFORM_ORDER } from "@/constants/platform-labels.constants";
import {
  PLATFORM_META,
  UNASSIGNED_CHART_COLOR,
} from "@/constants/platforms.constants";
import type { SpendColumnProps } from "@/types/dashboard-home.types";

/** Altura, en porcentaje del área, que ocupa el día más alto del mes. */
const PEAK_HEIGHT = 88;

/** Orden fijo del apilado, con YouTube en la base para poder comparar días. */
const STACK = [...PLATFORM_ORDER].reverse();

/** Opacidad de un día cuyo importe todavía es una previsión, no gasto medido. */
const PLANNED_OPACITY = 0.45;

/**
 * Un día del mes. Los días que aún no han llegado se dibujan como un carril
 * vacío: el hueco a la derecha es la información, no un fallo de datos. Los que
 * ya pasaron pero siguen sin dato importado se pintan atenuados, para que no se
 * confundan con el gasto que sí se midió.
 */
export function SpendColumn({ day, max }: SpendColumnProps) {
  if (day.state === "pending") {
    return (
      <div className="flex flex-1 flex-col justify-end rounded-t-[4px] bg-card-elevated">
        <span className="h-[3px] rounded-[2px] bg-border-strong" />
      </div>
    );
  }

  const segments = [
    { key: "unassigned", amount: day.unassigned, color: UNASSIGNED_CHART_COLOR },
    ...STACK.map((platform) => ({
      key: platform,
      amount: day.byPlatform[platform],
      color: PLATFORM_META[platform].chartColor,
    })),
  ].filter((segment) => segment.amount > 0);

  return (
    <div
      className="flex flex-1 flex-col justify-end gap-px overflow-hidden rounded-t-[3px]"
      style={day.source === "planned" ? { opacity: PLANNED_OPACITY } : undefined}
    >
      {segments.map((segment) => (
        <span
          key={segment.key}
          className="min-h-[2px] shrink-0"
          style={{
            height: `${(segment.amount / max) * PEAK_HEIGHT}%`,
            backgroundColor: segment.color,
          }}
        />
      ))}
    </div>
  );
}
