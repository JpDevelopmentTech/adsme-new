"use client";

import { PLATFORMS_EXTRA_COPY as COPY } from "@/constants/quote-platforms-copy.constants";
import { FormBlockHeading } from "@/presentation/components/cotizador/plataformas/form-block-heading";
import { PresetChip } from "@/presentation/components/cotizador/plataformas/preset-chip";
import { useQuote } from "@/presentation/hooks/use-quote";
import type { AddPlatformPanelProps } from "@/types/quote-platforms.types";
import { availableQuotePresets } from "@/utils/available-quote-presets";

/** «Agregar plataforma»: un chip por cada plataforma que aún no está; «Otra plataforma» siempre. */
export function AddPlatformPanel({ onAdd }: AddPlatformPanelProps) {
  const { state, reference } = useQuote();
  const presets = availableQuotePresets(reference.catalog.presets, state.draft.platforms);

  return (
    <section id="cotizador-agregar" aria-labelledby="cotizador-agregar-titulo" className="glass-thick flex scroll-mt-6 flex-col gap-4 rounded-card p-5 sm:p-6">
      <FormBlockHeading id="cotizador-agregar-titulo" title={COPY.addTitle} subtitle={COPY.addSubtitle} />
      <div className="flex flex-wrap gap-2">
        {presets.map((preset) => <PresetChip key={preset.key} preset={preset} onAdd={onAdd} />)}
      </div>
    </section>
  );
}
