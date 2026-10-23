import type { Metadata } from "next";
import { createGetQuoteReference } from "@/domain/use-cases/get-quote-reference";
import { createSampleQuoteReferenceRepository } from "@/infrastructure/repositories/sample-quote-reference-repository";
import { QuoteWorkspace } from "@/presentation/components/cotizador/quote-workspace";
import { QuoteProvider } from "@/presentation/store/quote-store";

export const metadata: Metadata = { title: "Cotizador · adsme" };

/**
 * Cotizador de pauta: el comercial arma la cotización de un artista por
 * plataforma y la envía. El cálculo corre en el navegador; las listas, la TRM
 * oficial y los clientes guardados llegan del servidor.
 */
export default async function CotizadorPage() {
  const reference = await createGetQuoteReference(createSampleQuoteReferenceRepository())();

  return (
    <QuoteProvider reference={reference}>
      <QuoteWorkspace />
    </QuoteProvider>
  );
}
