import { QuoteHeader } from "@/presentation/components/cotizador/cabecera/quote-header";
import { CampaignSection } from "@/presentation/components/cotizador/campana/campaign-section";
import { PlatformsSection } from "@/presentation/components/cotizador/plataformas/platforms-section";
import { MobileQuoteBar } from "@/presentation/components/cotizador/resumen/mobile-quote-bar";
import { QuoteSidebar } from "@/presentation/components/cotizador/resumen/quote-sidebar";
import { QuoteToaster } from "@/presentation/components/cotizador/resumen/quote-toaster";

/**
 * Espacio de trabajo del cotizador: cabecera arriba, el formulario a la
 * izquierda y la cotización fija a la derecha (debajo en móvil, con la barra
 * inferior para saltar entre ambos).
 */
export function QuoteWorkspace() {
  return (
    <>
      <QuoteHeader />
      <div className="grid items-start gap-6 xl:grid-cols-[minmax(0,1fr)_400px]">
        <div id="cotizador-formulario" className="flex min-w-0 flex-col gap-6">
          <CampaignSection />
          <PlatformsSection />
        </div>
        <QuoteSidebar />
      </div>
      <MobileQuoteBar />
      <QuoteToaster />
    </>
  );
}
