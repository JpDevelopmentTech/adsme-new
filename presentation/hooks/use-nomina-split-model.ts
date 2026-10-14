"use client";

import { useState } from "react";
import { MIN_VIABLE_NOMINA } from "@/constants/nomina-modales.constants";
import type { NominaSplitSettings } from "@/types/nomina-modales.types";
import type { NominaSplitModelState } from "@/types/nomina-modales-artista.types";
import type { NominaSplitPatch } from "@/types/nomina-modales-reparto.types";
import { analyzeSplitModel } from "@/utils/analyze-split-model";
import { resolveSplitModel } from "@/utils/resolve-split-model";

/**
 * Estado del bloque «Modelo de reparto»: lo editado, el modelo resuelto con la
 * nómina y el mínimo, y su viabilidad (ambos `null` sin una nómina válida).
 */
export function useNominaSplitModel(
  initial: NominaSplitSettings,
  nomina: number | null,
  minShows: number | null,
): NominaSplitModelState {
  const [settings, setSettings] = useState(initial);
  const isReady = nomina !== null && nomina >= MIN_VIABLE_NOMINA && minShows !== null;
  const model = isReady ? resolveSplitModel(settings, nomina, minShows) : null;
  const viability = model ? analyzeSplitModel(model) : null;

  const update = (patch: NominaSplitPatch) => setSettings((current) => ({ ...current, ...patch }));

  return { settings, update, model, viability, isViable: viability !== null && viability.errors.length === 0 };
}
