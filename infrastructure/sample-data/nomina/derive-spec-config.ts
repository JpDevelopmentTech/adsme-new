import type { NominaArtistConfig } from "@/domain/entities/nomina-artist-config";
import type { SampleArtistSpec } from "@/infrastructure/sample-data/nomina/sample-nomina.types";

/** Configuración de un artista de muestra, sacada de los campos de su modelo. */
export function deriveSpecConfig(spec: SampleArtistSpec): NominaArtistConfig {
  return {
    clientId: spec.id,
    nomina: spec.nomina,
    minShows: spec.minShows,
    startsOn: spec.joinedAt,
    split: {
      hasService: spec.service > 0,
      service: spec.service,
      servicePayer: spec.adsmeAssumesService ? "adsme" : "cliente",
      hasScalability: true,
      profitPercent: spec.profitPercent,
      profitPerShowAfterMin: spec.profitPerShowAfterMin,
      hasFixedProfit: spec.fixedProfitGoal !== null,
      fixedProfit: spec.fixedProfitGoal ?? 0,
    },
  };
}
