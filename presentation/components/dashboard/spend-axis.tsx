import { Fragment } from "react";
import { DASHBOARD_COPY } from "@/constants/dashboard.constants";
import type { MonthSpend } from "@/domain/entities/dashboard";
import type { MonthSpendChartProps } from "@/types/dashboard-home.types";

/** Días mínimos que quedan por delante para que quepa la etiqueta del resto. */
const REST_LABEL_ROOM = 5;

interface AxisLabel {
  text: string;
  align: string;
  tone: string;
  /** El resto del mes solo se rotula cuando hay ancho para leerlo. */
  compactHidden?: boolean;
}

function labelOf(day: number, spend: MonthSpend, restDay: number): AxisLabel | null {
  const remaining = spend.daysInMonth - spend.today;

  if (day === spend.today) {
    return {
      text: DASHBOARD_COPY.today,
      align: "justify-center",
      tone: "font-semibold text-brand-violet",
    };
  }

  if (day === 1) return { text: "1", align: "justify-start", tone: "text-text-muted" };

  if (day === spend.daysInMonth) {
    return {
      text: String(spend.daysInMonth),
      align: "justify-end",
      tone: "text-text-muted",
    };
  }

  if (day === restDay) {
    return {
      text: `restan ${remaining} días`,
      align: "justify-center",
      tone: "text-text-muted",
      compactHidden: true,
    };
  }

  return null;
}

/**
 * Eje del mes. Repite la misma rejilla que las barras —una celda por día más el
 * separador de hoy— para que cada etiqueta caiga exactamente bajo su columna.
 */
export function SpendAxis({ spend }: MonthSpendChartProps) {
  const remaining = spend.daysInMonth - spend.today;
  const restDay =
    remaining >= REST_LABEL_ROOM ? Math.round(spend.today + remaining / 2) : -1;

  return (
    <div className="flex items-center gap-[5px] text-[11px]">
      {spend.days.map((day) => {
        const label = labelOf(day.day, spend, restDay);

        return (
          <Fragment key={day.day}>
            <span className={`flex min-w-0 flex-1 ${label?.align ?? ""}`}>
              {label ? (
                <span
                  className={`whitespace-nowrap ${label.tone} ${label.compactHidden ? "hidden sm:inline" : ""}`}
                >
                  {label.text}
                </span>
              ) : null}
            </span>

            {day.day === spend.today ? (
              <span aria-hidden className="w-px shrink-0" />
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
}
