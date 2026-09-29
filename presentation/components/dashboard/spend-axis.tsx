import { DASHBOARD_COPY } from "@/constants/dashboard.constants";
import type { SpendAxisProps } from "@/types/dashboard-home.types";

/** Días desde los que se solapa «hoy» con los extremos del eje. */
const EDGE_ROOM = 3;

/**
 * Eje del mes: solo el primer día, el último y hoy. «Hoy» se posiciona por su
 * proporción real del mes, no centrado, para que caiga bajo la línea de la
 * gráfica sea cual sea el día.
 */
export function SpendAxis({ spend }: SpendAxisProps) {
  const todayPercent = (spend.today / spend.daysInMonth) * 100;

  return (
    <div className="relative flex items-center justify-between text-[10.5px]">
      <span className="text-text-muted">
        {spend.today > EDGE_ROOM ? 1 : null}
      </span>
      <span className="text-text-muted">
        {spend.daysInMonth - spend.today > EDGE_ROOM ? spend.daysInMonth : null}
      </span>

      <span
        className="absolute -translate-x-1/2 font-normal text-text-primary"
        style={{ left: `${todayPercent}%` }}
      >
        {DASHBOARD_COPY.today}
      </span>
    </div>
  );
}
