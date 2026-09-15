import { Fragment } from "react";
import { SpendColumn } from "@/presentation/components/dashboard/spend-column";
import type { SpendPlotProps } from "@/types/dashboard-home.types";

/** Las barras del mes, con la línea que separa lo gastado de lo previsto. */
export function SpendPlot({ spend, max, label }: SpendPlotProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className="flex h-[120px] items-stretch gap-[3px] sm:h-[138px]"
    >
      {spend.days.map((day) => (
        <Fragment key={day.day}>
          <SpendColumn day={day} max={max} />

          {day.day === spend.today ? (
            <span aria-hidden className="w-[1.5px] shrink-0 rounded-pill bg-g-50/35" />
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}
