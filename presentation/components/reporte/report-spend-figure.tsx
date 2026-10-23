import type { ReportSpendFigureProps } from "@/types/report.types";
import { formatReportSpend } from "@/utils/format-report-spend";

/**
 * Un gasto del reporte en una celda: la cifra y, debajo y en tono apagado, de
 * dónde sale (la conversión con la TRM) o lo que quedó sin convertir. Es el
 * patrón de Google Ads con cuentas en varias monedas: el valor convertido
 * arriba y el original debajo.
 */
export function ReportSpendFigure({ spend }: ReportSpendFigureProps) {
  const { value, extra, trmLine } = formatReportSpend(spend);
  const sub = trmLine ?? (extra ? `+ ${extra}` : null);

  return (
    <span className="inline-flex flex-col items-end gap-0.5">
      <span>{value}</span>
      {sub ? (
        <span className="text-[11px] font-light text-text-muted">{sub}</span>
      ) : null}
    </span>
  );
}
