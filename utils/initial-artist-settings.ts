import { DEFAULT_SPLIT_SETTINGS } from "@/constants/nomina-modales.constants";
import type { NominaSplitSettings } from "@/types/nomina-modales.types";

/** Modelo con el que abre la configuración: el por defecto con lo que se sepa del artista. */
export function initialArtistSettings(fixedProfitGoal?: number | null, serviceAssumedByAdsme?: boolean): NominaSplitSettings {
  return {
    ...DEFAULT_SPLIT_SETTINGS,
    servicePayer: serviceAssumedByAdsme ? "adsme" : "cliente",
    hasFixedProfit: Boolean(fixedProfitGoal),
    fixedProfit: fixedProfitGoal ?? 0,
  };
}
