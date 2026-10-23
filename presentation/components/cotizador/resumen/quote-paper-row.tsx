import type { QuotePaperRowProps } from "@/types/quote-summary.types";
import { cn } from "@/utils/cn";
import { formatCopEquivalent } from "@/utils/format-cop-equivalent";

/** Fila de una plataforma en la hoja: descuentos en cursiva ámbar y, en USD, su equivalente en pesos. */
export function QuotePaperRow({ row, isUsd }: QuotePaperRowProps) {
  return (
    <p className={cn(row.isDiscount && "text-[#8A4B00] italic")}>
      {row.text}
      {isUsd && row.copEquivalent !== null ? <span className="text-[#6B6878]"> = {formatCopEquivalent(row.copEquivalent)}</span> : null}
    </p>
  );
}
