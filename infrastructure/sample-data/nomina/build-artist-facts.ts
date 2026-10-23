import type { NominaSemaphore } from "@/domain/entities/nomina-artist";
import type { NominaArtistCampaign } from "@/domain/entities/nomina-campaign-spend";
import type { NominaMovement } from "@/domain/entities/nomina-movement";
import type { NominaCalendar, SampleArtistSpec } from "@/infrastructure/sample-data/nomina/sample-nomina.types";

/** Cálculos compartidos de un artista que usan todas las vistas de Nómina. */
export interface SampleArtistFacts {
  spec: SampleArtistSpec;
  movements: NominaMovement[];
  current: NominaMovement[];
  shows: number;
  serviceShows: number;
  semaphore: NominaSemaphore;
  /** Gastos con destino Ads más el gasto en pesos de sus campañas de AdsME. */
  adsSpent: number;
  campaigns: NominaArtistCampaign[];
  /** Parte de `adsSpent` que viene de las campañas. */
  campaignSpent: number;
}

/**
 * Deriva semáforo, shows del mes y gasto en Ads de un artista: el gasto en Ads
 * suma los gastos registrados con destino Ads y lo que gastaron sus campañas.
 */
export function buildArtistFacts(spec: SampleArtistSpec, movements: NominaMovement[], calendar: NominaCalendar): SampleArtistFacts {
  const current = movements.filter((movement) => movement.assignedMonth === calendar.currentMonth);
  const currentShows = current.filter((movement) => movement.concept === "show");
  const shows = currentShows.length;
  const semaphore: NominaSemaphore = shows >= spec.minShows ? "verde" : shows > 0 ? "amarillo" : "rojo";
  const campaigns = spec.campaigns ?? [];
  const campaignSpent = campaigns.reduce((total, campaign) => total + (campaign.spendCop ?? 0), 0);
  const adsSpent = spec.expenses
    .filter((expense) => expense.target === "ads")
    .reduce((total, expense) => total + expense.amount, campaignSpent);

  return {
    spec,
    movements,
    current,
    shows,
    serviceShows: currentShows.filter((movement) => movement.split.service > 0).length,
    semaphore,
    adsSpent,
    campaigns,
    campaignSpent,
  };
}
