import { SPLIT_MODEL_COPY } from "@/constants/nomina-modales-reparto-copy.constants";
import { FixedProfitSection } from "@/presentation/components/nomina/modales/reparto/fixed-profit-section";
import { ScalabilitySection } from "@/presentation/components/nomina/modales/reparto/scalability-section";
import { ServiceSection } from "@/presentation/components/nomina/modales/reparto/service-section";
import { ViabilityBox } from "@/presentation/components/nomina/modales/reparto/viability-box";
import type { SplitModelEditorProps } from "@/types/nomina-modales-reparto.types";

/**
 * Bloque «Modelo de reparto», compartido por el alta y la configuración del
 * artista: los tres interruptores y la caja de viabilidad que los juzga.
 */
export function SplitModelEditor({ idPrefix, settings, model, viability, onChange, hasHeading = true, isDetailInitiallyOpen }: SplitModelEditorProps) {
  return (
    <section aria-label={SPLIT_MODEL_COPY.title} className="flex flex-col gap-6">
      {hasHeading ? <h3 className="text-[11px] font-light tracking-[0.16em] text-text-muted uppercase">{SPLIT_MODEL_COPY.title}</h3> : null}
      <ServiceSection idPrefix={idPrefix} settings={settings} model={model} onChange={onChange} />
      <ScalabilitySection idPrefix={idPrefix} settings={settings} model={model} onChange={onChange} />
      <FixedProfitSection idPrefix={idPrefix} settings={settings} model={model} onChange={onChange} />
      <ViabilityBox viability={viability} isInitiallyOpen={isDetailInitiallyOpen} />
    </section>
  );
}
