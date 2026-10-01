import { DEFAULT_CAMPAIGN_LIST_QUERY } from "@/domain/entities/campaign";
import { DEFAULT_CLIENT_LIST_QUERY } from "@/domain/entities/client-query";
import type { GlobalSearchResults } from "@/domain/entities/global-search";
import { DEFAULT_JOB_LIST_QUERY } from "@/domain/entities/job-query";
import type { CampaignRepository } from "@/domain/interfaces/campaign-repository";
import type { ClientRepository } from "@/domain/interfaces/client-repository";
import type { JobRepository } from "@/domain/interfaces/job-repository";

/**
 * Caso de uso: buscar un mismo término a la vez en clientes, trabajos y campañas
 * del usuario autenticado. Reutiliza el filtro de texto de cada listado —nombre
 * y @usuario en clientes, título y artista en trabajos, nombre en campañas— y
 * devuelve como mucho `limit` resultados por grupo.
 */
export function createSearchEverything(
  clientRepository: ClientRepository,
  jobRepository: JobRepository,
  campaignRepository: CampaignRepository,
) {
  return async function searchEverything(
    term: string,
    limit: number,
  ): Promise<GlobalSearchResults> {
    const search = term.trim();

    const [clients, jobs, campaigns] = await Promise.all([
      clientRepository.listClients({ ...DEFAULT_CLIENT_LIST_QUERY, search }),
      jobRepository.listJobs({ ...DEFAULT_JOB_LIST_QUERY, search }),
      campaignRepository.listCampaigns({ ...DEFAULT_CAMPAIGN_LIST_QUERY, search }),
    ]);

    return {
      clients: clients.slice(0, limit).map((client) => ({
        id: client.id,
        name: client.name,
        handle: client.handle,
        kind: client.kind,
        initials: client.initials,
        gradient: client.gradient,
        avatarUrl: client.avatarUrl ?? null,
      })),
      jobs: jobs.slice(0, limit).map((job) => ({
        id: job.id,
        title: job.title,
        artistName: job.artistName,
        coverUrl: job.coverUrl,
      })),
      campaigns: campaigns.slice(0, limit).map((campaign) => ({
        id: campaign.id,
        name: campaign.name,
        externalCampaignId: campaign.externalCampaignId,
        platform: campaign.platform,
      })),
    };
  };
}
