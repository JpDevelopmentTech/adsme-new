import type { NominaSplitModel, NominaSplitSettings } from "@/types/nomina-modales.types";
import { suggestService } from "@/utils/suggest-service";

/** Junta lo editado con la nómina y el mínimo; sin Servicio escrito usa el sugerido. */
export function resolveSplitModel(settings: NominaSplitSettings, nomina: number, minShows: number): NominaSplitModel {
  return {
    ...settings,
    nomina,
    minShows,
    service: settings.service ?? suggestService(nomina, minShows),
  };
}
