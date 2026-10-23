import type { ConnectionPlatform } from "@/domain/entities/connection";
import type { Money } from "@/domain/entities/money";

/**
 * Gasto de una campaña de AdsME de un artista de Nómina en un mes, en la
 * moneda de su cuenta. Solo cuenta desde el inicio de vigencia en Nómina.
 */
export interface NominaCampaignSpend {
  clientId: string;
  jobId: string;
  jobTitle: string;
  /** TRM manual del trabajo, o `null` si no tiene. */
  usdCopRate: number | null;
  campaignId: string;
  campaignName: string;
  campaignStatus: string;
  platform: ConnectionPlatform;
  /** `AAAA-MM`. */
  month: string;
  spend: Money;
}

/** Campaña de un artista con su gasto acumulado desde que entró a Nómina. */
export interface NominaArtistCampaign {
  campaignId: string;
  campaignName: string;
  campaignStatus: string;
  platform: ConnectionPlatform;
  jobId: string;
  jobTitle: string;
  /** Gasto en la moneda de la cuenta. */
  spend: Money;
  /** TRM manual del trabajo, o `null` si no tiene. */
  usdCopRate: number | null;
  /** Gasto en pesos que se descuenta del presupuesto, o `null` si no se pudo convertir (dólares sin TRM). */
  spendCop: number | null;
}
