import type { Metadata } from "next";
import {
  CONNECTIONS_COPY,
  IMPORTED_CAMPAIGNS_LIMIT,
} from "@/constants/connections.constants";
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
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { ConnectionCard } from "@/presentation/components/conexiones/connection-card";
import { ImportedCampaignsPanel } from "@/presentation/components/conexiones/imported-campaigns-panel";
import {
  MetaConnectAction,
  MetaConnectedActions,
} from "@/presentation/components/conexiones/meta-actions";
import {
  TiktokConnectAction,
  TiktokConnectedActions,
} from "@/presentation/components/conexiones/tiktok-actions";
import { isTiktokConfigured } from "@/infrastructure/tiktok/tiktok-env";
import { META_ERRORS } from "@/constants/meta-ads.constants";
import { TIKTOK_ERRORS } from "@/constants/tiktok-ads.constants";
import { SyncNowButton } from "@/presentation/components/conexiones/sync-now-button";
import { PageHeader } from "@/presentation/components/dashboard/page-header";
import { FormAlert } from "@/presentation/components/ui/form-alert";
import { StatStrip } from "@/presentation/components/ui/stat-strip";
import { buildConnectionsSummary } from "@/utils/build-connections-summary";
import { buildImportedCampaigns } from "@/utils/build-imported-campaigns";
import { findDesignConnection } from "@/utils/find-design-connection";
import { toPlatformConnection } from "@/utils/to-platform-connection";

export const metadata: Metadata = { title: "Conexiones · adsme" };

/**
 * Pantalla `B10 · Conexiones`: qué cuentas alimentan adsme, cuánta vida le
 * queda a cada autorización y qué ha entrado por ellas. Meta Ads es real; el
 * resto sigue el diseño hasta que existan sus apps OAuth.
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
    createListJobs(createSupabaseJobRepository(supabase))(DEFAULT_JOB_LIST_QUERY),
  ]);

  const find = (platform: ConnectionPlatform) =>
    connections.find((connection) => connection.platform === platform) ?? null;

  const meta = toPlatformConnection("meta", find("meta"), campaigns, now);
  const tiktok = toPlatformConnection("tiktok", find("tiktok"), campaigns, now);
  const isMetaConnected = meta.status === "connected";
  const isTiktokConnected = tiktok.status === "connected";

  const youtube = findDesignConnection("youtube");
  const cards = [youtube, meta, tiktok].filter(
    (card): card is PlatformConnection => card !== null,
  );
  const lastSyncedAt =
    connections
      .map((connection) => connection.lastSyncedAt)
      .filter((value): value is string => value !== null)
      .sort()
      .at(-1) ?? null;

  return (
    <>
      <PageHeader
        title={CONNECTIONS_COPY.title}
        subtitle={CONNECTIONS_COPY.subtitle}
        actions={
          <SyncNowButton isEnabled={isMetaConnected || isTiktokConnected} />
        }
      />

      <StatStrip
        items={buildConnectionsSummary(
          cards,
          campaigns.length,
          lastSyncedAt,
          now.toISOString(),
        )}
      />

      {typeof error === "string" ? <FormAlert message={error} /> : null}

      {!isMetaConfigured() ? (
        <FormAlert tone="warning" message={META_ERRORS.notConfigured} />
      ) : null}

      {!isTiktokConfigured() ? (
        <FormAlert tone="warning" message={TIKTOK_ERRORS.notConfigured} />
      ) : null}

      <div className="grid gap-[18px] xl:grid-cols-3">
        {youtube ? <ConnectionCard connection={youtube} /> : null}

        <ConnectionCard
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

        <ConnectionCard
          connection={tiktok}
          actions={
            isTiktokConnected ? <TiktokConnectedActions /> : <TiktokConnectAction />
          }
        />
      </div>

      <ImportedCampaignsPanel
        campaigns={buildImportedCampaigns(
          campaigns,
          jobs,
          now.toISOString(),
          IMPORTED_CAMPAIGNS_LIMIT,
        )}
      />
    </>
  );
}
