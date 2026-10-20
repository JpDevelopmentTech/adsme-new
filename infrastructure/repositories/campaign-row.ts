import type { Campaign, CampaignDraft } from "@/domain/entities/campaign";
import type { ConnectionPlatform } from "@/domain/entities/connection";

/**
 * Fila de `public.campaigns`, con la plataforma traída de su conexión. `spend`
 * no es la columna sino el campo calculado `spend_cop` (gasto en pesos); la
 * columna original llega como `account_spend`.
 */
export interface CampaignRow {
  id: string;
  connection_id: string;
  external_campaign_id: string;
  job_id: string | null;
  name: string;
  status: string;
  objective: string | null;
  spend: number | string;
  account_spend: number | string;
  currency: string;
  impressions: number;
  clicks: number;
  reach: number;
  video_plays: number;
  engagement: number;
  comments: number;
  shares: number;
  reactions: number;
  starts_at: string | null;
  ends_at: string | null;
  extra_json: Record<string, unknown> | null;
  synced_at: string;
  connections: { platform: string } | { platform: string }[] | null;
}

/**
 * `spend:spend_cop` pide el gasto convertido a pesos con la tasa vigente; la
 * conversión vive en la base de datos para que la app y el reporte público
 * sumen exactamente lo mismo.
 */
export const CAMPAIGN_COLUMNS =
  "id, connection_id, external_campaign_id, job_id, name, status, objective, spend:spend_cop, account_spend:spend, currency, impressions, clicks, reach, video_plays, engagement, comments, shares, reactions, starts_at, ends_at, extra_json, synced_at, connections ( platform )";

export function toCampaign(row: CampaignRow): Campaign {
  const connection = Array.isArray(row.connections)
    ? row.connections[0]
    : row.connections;

  return {
    id: row.id,
    connectionId: row.connection_id,
    platform: (connection?.platform ?? "meta") as ConnectionPlatform,
    externalCampaignId: row.external_campaign_id,
    jobId: row.job_id,
    name: row.name,
    status: row.status,
    objective: row.objective,
    // `numeric` llega como cadena para no perder precisión.
    spend: Number(row.spend),
    accountSpend: Number(row.account_spend),
    currency: row.currency,
    impressions: Number(row.impressions),
    clicks: Number(row.clicks),
    reach: Number(row.reach),
    videoPlays: Number(row.video_plays),
    engagement: Number(row.engagement),
    comments: Number(row.comments),
    shares: Number(row.shares),
    reactions: Number(row.reactions),
    startsAt: row.starts_at,
    endsAt: row.ends_at,
    extra: row.extra_json ?? {},
    syncedAt: row.synced_at,
  };
}

/** Traduce el draft a columnas, omitiendo lo que no venga informado. */
export function toCampaignRow(draft: Partial<CampaignDraft>) {
  return {
    ...(draft.connectionId !== undefined && { connection_id: draft.connectionId }),
    ...(draft.externalCampaignId !== undefined && {
      external_campaign_id: draft.externalCampaignId,
    }),
    ...(draft.name !== undefined && { name: draft.name }),
    ...(draft.status !== undefined && { status: draft.status }),
    ...(draft.objective !== undefined && { objective: draft.objective }),
    ...(draft.spend !== undefined && { spend: draft.spend }),
    ...(draft.currency !== undefined && { currency: draft.currency }),
    ...(draft.impressions !== undefined && { impressions: draft.impressions }),
    ...(draft.clicks !== undefined && { clicks: draft.clicks }),
    ...(draft.reach !== undefined && { reach: draft.reach }),
    ...(draft.videoPlays !== undefined && { video_plays: draft.videoPlays }),
    ...(draft.engagement !== undefined && { engagement: draft.engagement }),
    ...(draft.comments !== undefined && { comments: draft.comments }),
    ...(draft.shares !== undefined && { shares: draft.shares }),
    ...(draft.reactions !== undefined && { reactions: draft.reactions }),
    ...(draft.startsAt !== undefined && { starts_at: draft.startsAt }),
    ...(draft.endsAt !== undefined && { ends_at: draft.endsAt }),
    ...(draft.extra !== undefined && { extra_json: draft.extra }),
  };
}
