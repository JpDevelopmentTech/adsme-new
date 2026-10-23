"use client";

import { QUOTE_SUMMARY_ID } from "@/constants/quote-summary.constants";
import { QuoteDocumentCard } from "@/presentation/components/cotizador/resumen/quote-document-card";
import { QuoteGrandCard } from "@/presentation/components/cotizador/resumen/quote-grand-card";
import { QuoteMarginsCard } from "@/presentation/components/cotizador/resumen/quote-margins-card";

/**
 * Columna de la cotización, fija al desplazar en escritorio: arriba lo interno
 * (total, ganancia, márgenes) en vidrio oscuro y abajo la hoja del cliente.
 */
export function QuoteSidebar() {
  return (
    <aside
      id={QUOTE_SUMMARY_ID}
      className="flex min-w-0 scroll-mt-6 flex-col gap-4 xl:sticky xl:top-0 xl:max-h-[calc(100dvh-40px)] xl:overflow-y-auto xl:overscroll-contain xl:pb-2"
    >
      <QuoteGrandCard />
      <QuoteMarginsCard />
      <QuoteDocumentCard />
    </aside>
  );
}
