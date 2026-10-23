import type { NominaCampaignSpend } from "@/domain/entities/nomina-campaign-spend";

/**
 * Port del gasto de las campañas de AdsME de los artistas de Nómina. Lanza si
 * la infraestructura falla.
 */
export interface NominaCampaignSpendRepository {
  /** Gasto por campaña y mes de todos los inscritos, desde su inicio en Nómina. */
  listCampaignSpend(): Promise<NominaCampaignSpend[]>;
}
