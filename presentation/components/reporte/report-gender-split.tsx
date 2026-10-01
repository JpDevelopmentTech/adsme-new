import { REPORT_COPY, REPORT_GENDER_COLORS } from "@/constants/report.constants";
import type { ReportGenderSplitProps } from "@/types/report.types";

/**
 * El reparto por sexo como una sola barra partida: son partes de un mismo
 * todo, así que se leen mejor juntas que en tres filas sueltas. Los extremos
 * van redondeados y las uniones casi rectas, como en el diseño.
 */
export function ReportGenderSplit({ shares }: ReportGenderSplitProps) {
  const colorOf = (index: number) => REPORT_GENDER_COLORS[index % REPORT_GENDER_COLORS.length];

  return (
    <div className="flex flex-col gap-3.5">
      <h4 className="text-[11px] font-medium tracking-[1.4px] text-text-muted uppercase">{REPORT_COPY.audienceGender}</h4>

      <div aria-hidden className="flex h-3.5 gap-[3px]">
        {shares.map((item, index) => (
          <span
            key={item.label}
            className="h-full rounded-[3px] first:rounded-l-pill last:rounded-r-pill"
            style={{ width: `${item.percent}%`, backgroundColor: colorOf(index) }}
          />
        ))}
      </div>

      <ul className="flex flex-wrap gap-x-[22px] gap-y-2">
        {shares.map((item, index) => (
          <li key={item.label} className="flex items-center gap-2 text-[13px]">
            <span aria-hidden className="size-2 rounded-pill" style={{ backgroundColor: colorOf(index) }} />
            <span className="text-text-secondary">{item.label}</span>
            <span className="text-text-primary tabular-nums">{item.percent}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
