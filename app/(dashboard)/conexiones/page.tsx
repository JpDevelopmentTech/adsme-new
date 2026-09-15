import type { Metadata } from "next";
import { IMPORTED_CAMPAIGNS_LIMIT } from "@/constants/connections.constants";
import { META_ERRORS } from "@/constants/meta-ads.constants";
import { TIKTOK_ERRORS } from "@/constants/tiktok-ads.constants";
import { DEFAULT_CAMPAIGN_LIST_QUERY } from "@/domain/entities/campaign";
import type { ConnectionPlatform } from "@/domain/entities/connection";
import type { PlatformConnection } from "@/domain/entities/platform-connection";
import { DEFAULT_JOB_LIST_QUERY } from "@/domain/entities/job-query";
import { createListCampaigns } from "@/domain/use-cases/list-campaigns";
import { createListJobs } from "@/domain/use-cases/list-jobs";
import { createSupabaseCampaignRepository } from "@/infrastructure/repositories/supabase-campaign-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { isMetaConfigured } from "@/infrastructure/meta/meta-env";
import { isTiktokConfigured } from "@/infrastructure/tiktok/tiktok-env";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { ConnectionRow } from "@/presentation/components/conexiones/connection-row";
import { ConnectionsPanel } from "@/presentation/components/conexiones/connections-panel";
import { ConnectionsStatusBand } from "@/presentation/components/conexiones/connections-status-band";
import { ImportedCampaignsPanel } from "@/presentation/components/conexiones/imported-campaigns-panel";
import {
  MetaConnectAction,
  MetaConnectedActions,
} from "@/presentation/components/conexiones/meta-actions";
import {
  TiktokConnectAction,
  TiktokConnectedActions,
} from "@/presentation/components/conexiones/tiktok-actions";
import { FormAlert } from "@/presentation/components/ui/form-alert";
import { buildConnectionsStatus } from "@/utils/build-connections-status";
import { buildImportedCampaigns } from "@/utils/build-imported-campaigns";
import { findDesignConnection } from "@/utils/find-design-connection";
import { toPlatformConnection } from "@/utils/to-platform-connection";

export const metadata: Metadata = { title: "Conexiones · adsme" };

/**
 * Pantalla `B10 · Conexiones`. Encabeza con la única pregunta que trae aquí al
 * usuario —si la información sigue entrando— y debajo pone las plataformas en
 * filas al mismo eje y lo que ha entrado por ellas.
 */
export default async function ConexionesPage({
  searchParams,
}: PageProps<"/conexiones">) {
  const { error } = await searchParams;
  const supabase = await createServerSupabaseClient();
  const now = new Date();

  const [connections, campaigns, jobs] = await Promise.all([
    createSupabaseConnectionRepository(supabase).listConnections(),
    createListCampaigns(createSupabaseCampaignRepository(supabase))(
      DEFAULT_CAMPAIGN_LIST_QUERY,
    ),
    createListJobs(createSupabaseJobRepository(supabase))(
      DEFAULT_JOB_LIST_QUERY,
    ),
  ]);

  // Cada plataforma agrupa todas sus cuentas: Meta y TikTok admiten varias y
  // la fila habla de la plataforma entera.
  const of = (platform: ConnectionPlatform) =>
    connections.filter((connection) => connection.platform === platform);

  const meta = toPlatformConnection("meta", of("meta"), campaigns, now);
  const tiktok = toPlatformConnection("tiktok", of("tiktok"), campaigns, now);
  const isMetaConnected = meta.status === "connected";
  const isTiktokConnected = tiktok.status === "connected";

  const youtube = findDesignConnection("youtube");
  const rows = [youtube, meta, tiktok].filter(
    (row): row is PlatformConnection => row !== null,
  );
  const lastSyncedAt =
    connections
      .map((connection) => connection.lastSyncedAt)
      .filter((value): value is string => value !== null)
      .sort()
      .at(-1) ?? null;

  return (
    <>
      <ConnectionsStatusBand
        status={buildConnectionsStatus(
          rows,
          campaigns.length,
          lastSyncedAt,
          now.toISOString(),
        )}
        canSync={isMetaConnected || isTiktokConnected}
      />

      {typeof error === "string" ? <FormAlert message={error} /> : null}

      {!isMetaConfigured() ? (
        <FormAlert tone="warning" message={META_ERRORS.notConfigured} />
      ) : null}

      {!isTiktokConfigured() ? (
        <FormAlert tone="warning" message={TIKTOK_ERRORS.notConfigured} />
      ) : null}

      <ConnectionsPanel>
        {youtube ? <ConnectionRow connection={youtube} /> : null}

        <ConnectionRow
          connection={meta}
          actions={
            isMetaConnected ? (
              <MetaConnectedActions
                isUrgent={meta.access?.isExpiring ?? false}
              />
            ) : (
              <MetaConnectAction />
            )
          }
        />

        <ConnectionRow
          connection={tiktok}
          actions={
            isTiktokConnected ? (
              <TiktokConnectedActions />
            ) : (
              <TiktokConnectAction />
            )
          }
        />
      </ConnectionsPanel>

      <ImportedCampaignsPanel
        campaigns={buildImportedCampaigns(
          campaigns,
          jobs,
          connections,
          now.toISOString(),
          IMPORTED_CAMPAIGNS_LIMIT,
        )}
      />
    </>
  );
}
