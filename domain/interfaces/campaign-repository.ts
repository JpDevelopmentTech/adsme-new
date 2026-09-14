import type {
  Campaign,
  CampaignDraft,
  CampaignListQuery,
} from "@/domain/entities/campaign";
import type { ClientResult } from "@/domain/entities/client-error";

/**
 * Port de campañas. Las lecturas lanzan si falla la infraestructura; las
 * escrituras devuelven un resultado que la UI puede explicar.
 */
export interface CampaignRepository {
  listCampaigns(query: CampaignListQuery): Promise<Campaign[]>;

  getCampaign(campaignId: string): Promise<Campaign | null>;

  /** Campañas asociadas a un trabajo concreto. */
  listJobCampaigns(jobId: string): Promise<Campaign[]>;

  createCampaign(draft: CampaignDraft): Promise<ClientResult<Campaign>>;

  updateCampaign(
    campaignId: string,
    draft: Partial<CampaignDraft>,
  ): Promise<ClientResult<Campaign>>;

  deleteCampaign(campaignId: string): Promise<ClientResult<null>>;

  /**
   * Borra todo lo importado por una conexión. Se usa al cambiar de cuenta
   * publicitaria: lo ya importado pertenece a la cuenta anterior.
   */
  deleteConnectionCampaigns(connectionId: string): Promise<ClientResult<null>>;

  /**
   * Inserta o actualiza en bloque lo que devuelve la plataforma, conservando la
   * vinculación con el trabajo que ya tuviera cada campaña.
   */
  upsertCampaigns(
    connectionId: string,
    drafts: CampaignDraft[],
  ): Promise<ClientResult<number>>;

  /** Asocia o desasocia la campaña con un trabajo de adsme. */
  linkCampaignToJob(
    campaignId: string,
    jobId: string | null,
  ): Promise<ClientResult<Campaign>>;

  /** Vincula varias campañas al mismo trabajo en una sola escritura. */
  linkCampaignsToJob(
    campaignIds: string[],
    jobId: string,
  ): Promise<ClientResult<number>>;
}
