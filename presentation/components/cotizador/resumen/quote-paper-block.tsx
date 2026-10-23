import { QuotePaperRow } from "@/presentation/components/cotizador/resumen/quote-paper-row";
import type { QuotePaperBlockProps } from "@/types/quote-summary.types";

/** Bloque de una plataforma en la hoja: nombre, filas, total y su nota. */
export function QuotePaperBlock({ block, isUsd }: QuotePaperBlockProps) {
  return (
    <div className="mt-4">
      <p className="font-semibold">{block.name}</p>
      {block.rows.map((row, index) => <QuotePaperRow key={`${index}-${row.text}`} row={row} isUsd={isUsd} />)}
      <p className="font-semibold">{block.totalText}</p>
      {block.note ? <p className="mt-0.5 whitespace-pre-line text-[#6B6878] italic">{block.note}</p> : null}
    </div>
  );
}
