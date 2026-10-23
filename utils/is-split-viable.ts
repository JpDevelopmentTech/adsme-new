import type { NominaSplitTerms } from "@/domain/entities/nomina-split-terms";
import { analyzeSplitModel } from "@/utils/analyze-split-model";
import { resolveSplitModel } from "@/utils/resolve-split-model";

/** El modelo de reparto pasa la revisión de viabilidad (sin errores que bloqueen). */
export function isSplitViable(split: NominaSplitTerms, nomina: number, minShows: number): boolean {
  return analyzeSplitModel(resolveSplitModel(split, nomina, minShows)).tone !== "noViable";
}
