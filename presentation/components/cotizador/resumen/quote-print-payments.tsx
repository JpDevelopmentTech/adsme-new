import { QUOTE_PRINT_COPY } from "@/constants/quote-summary-copy.constants";
import { QuotePrintSection } from "@/presentation/components/cotizador/resumen/quote-print-section";
import type { QuotePrintPaymentsProps } from "@/types/quote-summary.types";

/** Métodos de pago del PDF en dos columnas; las primeras líneas de cada una van en negrita. */
export function QuotePrintPayments({ columns }: QuotePrintPaymentsProps) {
  return (
    <QuotePrintSection title={QUOTE_PRINT_COPY.payments}>
      <div className="grid break-inside-avoid grid-cols-2 gap-[24pt]">
        {columns.slice(0, 2).map((column) => (
          <div key={column.title} className="text-[10pt] leading-[14pt]">
            <p className="mb-[2pt] text-[10.5pt] font-semibold text-[#151823]">{column.title}</p>
            {column.lines.map((line, index) => (
              <p key={`${index}-${line}`} className={index < column.bold ? "font-semibold text-[#151823]" : "text-[#5D6376]"}>{line}</p>
            ))}
          </div>
        ))}
      </div>
    </QuotePrintSection>
  );
}
