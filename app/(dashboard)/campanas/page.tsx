import type { Metadata } from "next";
import {
  ALL_ACCOUNTS_OPTION,
  CAMPAIGNS_COPY,
} from "@/constants/campaigns.constants";
import { DEFAULT_CAMPAIGN_LIST_QUERY } from "@/domain/entities/campaign";
import { DEFAULT_JOB_LIST_QUERY } from "@/domain/entities/job-query";
import { createListCampaigns } from "@/domain/use-cases/list-campaigns";
import { createListJobs } from "@/domain/use-cases/list-jobs";
import { createSupabaseCampaignRepository } from "@/infrastructure/repositories/supabase-campaign-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { CampaignsBoard } from "@/presentation/components/campanas/campaigns-board";
import { CampaignsSplitBand } from "@/presentation/components/campanas/campaigns-split-band";
import { CampaignsToolbar } from "@/presentation/components/campanas/campaigns-toolbar";
import { buildCampaignGroups } from "@/utils/build-campaign-groups";
import { buildCampaignsSplit } from "@/utils/build-campaigns-split";
import { toIsoDate } from "@/utils/month-range";
import {
  isFilteredCampaignQuery,
  parseCampaignListQuery,
} from "@/utils/parse-campaign-list-query";

export const metadata: Metadata = { title: "Campañas · adsme" };

/**
 * Pantalla `B9 · Campañas`: la bandeja de entrada de lo que importan las
 * conexiones. Se ordena por destino —el trabajo al que alimenta cada campaña— y
 * abre con las que todavía no alimentan ninguno, que es dinero gastado que no
 * aparece en ningún reporte.
 */
export default async function CampanasPage({
  searchParams,
}: PageProps<"/campanas">) {
  const query = parseCampaignListQuery(await searchParams);
  const supabase = await createServerSupabaseClient();
  const listCampaigns = createListCampaigns(
    createSupabaseCampaignRepository(supabase),
  );

  const [campaigns, allCampaigns, connections, jobs] = await Promise.all([
    listCampaigns(query),
    listCampaigns(DEFAULT_CAMPAIGN_LIST_QUERY),
    createSupabaseConnectionRepository(supabase).listConnections(),
    createListJobs(createSupabaseJobRepository(supabase))(
      DEFAULT_JOB_LIST_QUERY,
    ),
  ]);

  const today = toIsoDate(new Date());
  const isFiltered = isFilteredCampaignQuery(query);

  return (
    <>
      {/* El reparto se calcula sobre todo lo importado, no sobre lo filtrado:
          la pregunta es del negocio entero, no de la vista que haya puesta. */}
      <CampaignsSplitBand split={buildCampaignsSplit(allCampaigns)} />

      <CampaignsBoard
        groups={buildCampaignGroups(campaigns, connections, jobs, today)}
        isFiltered={isFiltered}
        jobOptions={jobs.map((job) => ({
          value: job.id,
          label: `${job.title} — ${job.artistName}`,
        }))}
        toolbar={
          <CampaignsToolbar
            query={query}
            accountOptions={[
              ALL_ACCOUNTS_OPTION,
              ...connections.map((connection) => ({
                value: connection.id,
                label: connection.accountLabel,
              })),
            ]}
            resultsLabel={
              isFiltered
                ? CAMPAIGNS_COPY.results(campaigns.length, allCampaigns.length)
                : CAMPAIGNS_COPY.count(allCampaigns.length)
            }
          />
        }
      />
    </>
  );
}
