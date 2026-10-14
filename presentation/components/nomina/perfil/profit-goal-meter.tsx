import { PROFILE_COPY } from "@/constants/nomina-perfil-copy.constants";
import type { ProfitGoalMeterProps } from "@/types/nomina-perfil.types";
import { formatAxisAmount } from "@/utils/format-axis-amount";
import { cn } from "@/utils/cn";

/** Avance de la Utilidad del mes hacia la meta fija: lila hasta cumplirla, verde al llegar. */
export function ProfitGoalMeter({ profit, goal }: ProfitGoalMeterProps) {
  const percent = goal > 0 ? Math.round((profit / goal) * 100) : 0;
  const isReached = percent >= 100;

  return (
    <div title={PROFILE_COPY.goalTooltip} className="flex flex-col gap-1.5">
      <div className="h-1 overflow-hidden rounded-pill bg-white/10">
        <span className={cn("block h-full rounded-pill", isReached ? "bg-success" : "bg-lilac")} style={{ width: `${Math.min(percent, 100)}%` }} />
      </div>
      <p className="flex justify-between text-[11px] tabular-nums">
        <span className={isReached ? "text-success" : "text-text-muted"}>
          {isReached ? PROFILE_COPY.goalReached : `Meta ${formatAxisAmount(goal)}`}
        </span>
        <span className="text-text-muted">{percent}%</span>
      </p>
    </div>
  );
}
