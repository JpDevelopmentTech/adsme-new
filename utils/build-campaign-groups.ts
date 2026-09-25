import type { Campaign } from "@/domain/entities/campaign";
import type { Connection } from "@/domain/entities/connection";
import type { JobListing } from "@/domain/entities/job-listing";
import { CAMPAIGNS_COPY } from "@/constants/campaigns.constants";
import type { CampaignGroup } from "@/types/campaigns-list.types";
import { toCampaignListItem } from "@/utils/to-campaign-list-item";

/**
 * Agrupa las campañas por el trabajo al que alimentan. El grupo de las que no
 * alimentan ninguno va siempre primero: es el único estado que pide acción y,
 * de no sacarlo arriba, quedaría escondido entre las demás.
 */
export function buildCampaignGroups(
  campaigns: Campaign[],
  connections: Connection[],
  jobs: JobListing[],
  today: string,
): CampaignGroup[] {
  const accounts = new Map(
    connections.map((connection) => [connection.id, connection.accountLabel]),
  );
  const byJob = new Map<string | null, CampaignGroup>();

  for (const campaign of campaigns) {
    const job = campaign.jobId
      ? jobs.find((candidate) => candidate.id === campaign.jobId)
      : undefined;
    // Una campaña vinculada a un trabajo que ya no está visible se trata como
    // suelta: sin trabajo que nombrar, su fila no tendría dónde caer.
    const key = job ? job.id : null;
    const group = byJob.get(key) ?? {
      jobId: key,
      title: job ? job.title : CAMPAIGNS_COPY.unlinkedTitle,
      clientName: job ? job.artistName : "",
      spend: 0,
      campaigns: [],
    };

    group.spend += campaign.spend;
    group.campaigns.push(
      toCampaignListItem(
        campaign,
        accounts.get(campaign.connectionId) ?? "",
        today,
      ),
    );
    byJob.set(key, group);
  }

  const unlinked = byJob.get(null);
  const linked = [...byJob.values()]
    .filter((group) => group.jobId !== null)
    .sort((a, b) => b.spend - a.spend);

  return unlinked ? [unlinked, ...linked] : linked;
}
