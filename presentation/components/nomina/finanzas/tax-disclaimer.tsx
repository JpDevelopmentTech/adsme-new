import { TriangleAlert } from "lucide-react";
import { FINANCE_TAX_COPY } from "@/constants/nomina-finanzas-copy.constants";

/** Aviso fijo: el impuesto es una estimación del modelo, no una liquidación. */
export function TaxDisclaimer() {
  return (
    <p className="flex items-start gap-2.5 text-xs leading-[1.5] text-text-muted">
      <TriangleAlert size={15} strokeWidth={1.5} className="mt-px shrink-0 text-warning" aria-hidden />
      {FINANCE_TAX_COPY.disclaimer}
    </p>
  );
}
