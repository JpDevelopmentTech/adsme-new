"use client";

import { PLATFORMS_BAR_COPY } from "@/constants/quote-platforms-copy.constants";
import type { QuotePlatformPreset } from "@/domain/entities/quote-catalog";
import { AddPlatformPanel } from "@/presentation/components/cotizador/plataformas/add-platform-panel";
import { PlatformCard } from "@/presentation/components/cotizador/plataformas/platform-card";
import { PlatformsBar } from "@/presentation/components/cotizador/plataformas/platforms-bar";
import { PlatformsEmpty } from "@/presentation/components/cotizador/plataformas/platforms-empty";
import { TermsPanel } from "@/presentation/components/cotizador/plataformas/terms-panel";
import { useFocusNewPlatform } from "@/presentation/hooks/use-focus-new-platform";
import { useQuote } from "@/presentation/hooks/use-quote";

/**
 * Plataformas de la cotización, «Agregar plataforma» y «Condiciones y notas
 * generales». Al agregar una, la vista baja a su presupuesto con el foco puesto.
 */
export function PlatformsSection() {
  const { state, dispatch } = useQuote();
  const { platforms } = state.draft;
  const requestFocus = useFocusNewPlatform(platforms.map((platform) => platform.id));

  const addPlatform = (preset: QuotePlatformPreset) => {
    requestFocus();
    dispatch({ type: "addPlatform", preset });
  };

  return (
    <>
      <section aria-labelledby={platforms.length ? "cotizador-plataformas" : undefined} aria-label={platforms.length ? undefined : PLATFORMS_BAR_COPY.title} className="flex flex-col gap-3">
        <PlatformsBar />
        {platforms.length ? platforms.map((platform) => <PlatformCard key={platform.id} platform={platform} />) : <PlatformsEmpty />}
      </section>
      <AddPlatformPanel onAdd={addPlatform} />
      <TermsPanel />
    </>
  );
}
