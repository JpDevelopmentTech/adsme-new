import { MiniStat } from "@/presentation/components/nomina/mini-stat";
import type { MiniStatGridProps } from "@/types/nomina-finanzas-props.types";
import { cn } from "@/utils/cn";

/** Rejilla de indicadores compactos. */
export function MiniStatGrid({ stats, className }: MiniStatGridProps) {
  return (
    <div className={cn("grid gap-3", className)}>
      {stats.map((stat) => (
        <MiniStat key={stat.label} label={stat.label} value={stat.value} sub={stat.sub} />
      ))}
    </div>
  );
}
