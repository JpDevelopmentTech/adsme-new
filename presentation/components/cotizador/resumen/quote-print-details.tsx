import { QUOTE_PRINT_COPY } from "@/constants/quote-summary-copy.constants";
import { QuotePrintSection } from "@/presentation/components/cotizador/resumen/quote-print-section";
import type { QuotePrintDetailsProps } from "@/types/quote-summary.types";

/** «Detalles de la campaña» del PDF: rótulo en negrita y valor en gris (sin el proyecto, que va arriba). */
export function QuotePrintDetails({ meta }: QuotePrintDetailsProps) {
  return (
    <QuotePrintSection title={QUOTE_PRINT_COPY.details}>
      <dl className="grid grid-cols-[110pt_1fr] gap-y-[6pt] text-[10pt] leading-[14pt]">
        {meta.map((item, index) => (
          <div key={`${index}-${item.label}`} className="contents">
            <dt className="font-semibold text-[#151823]">{item.label}</dt>
            <dd className="text-[#5D6376]">{item.value}</dd>
          </div>
        ))}
      </dl>
    </QuotePrintSection>
  );
}
