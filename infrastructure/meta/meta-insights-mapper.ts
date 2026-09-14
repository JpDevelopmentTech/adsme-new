import { META_ACTION_TYPES } from "@/constants/meta-ads.constants";
import type { MetaCampaignMetrics, MetaInsightsPayload } from "@/domain/entities/meta-ads";

/** Un elemento de las listas `actions` y `video_*_actions` de la Graph API. */
interface ActionStat {
  action_type?: string;
  value?: string | number;
}

/** Suma el valor de un tipo de acción concreto dentro de la lista `actions`. */
function sumAction(actions: ActionStat[] | undefined, type: string): number {
  return (actions ?? [])
    .filter((action) => action.action_type === type)
    .reduce((total, action) => total + Number(action.value ?? 0), 0);
}

/** Primer valor de una lista de acciones de vídeo, que trae un único elemento. */
function firstValue(actions: ActionStat[] | undefined): number {
  return Number(actions?.[0]?.value ?? 0);
}

/**
 * Convierte la respuesta de insights en métricas planas. Meta devuelve todos
 * los números como cadenas, así que se normalizan aquí.
 */
export function toCampaignMetrics(
  insights: MetaInsightsPayload | undefined,
): MetaCampaignMetrics {
  const actions = insights?.actions;

  return {
    spend: Number(insights?.spend ?? 0),
    impressions: Number(insights?.impressions ?? 0),
    clicks: Number(insights?.clicks ?? 0),
    reach: Number(insights?.reach ?? 0),
    videoPlays: firstValue(insights?.video_play_actions),
    engagement: sumAction(actions, META_ACTION_TYPES.engagement),
    comments: sumAction(actions, META_ACTION_TYPES.comments),
    shares: sumAction(actions, META_ACTION_TYPES.shares),
    reactions: sumAction(actions, META_ACTION_TYPES.reactions),
    // La retención por tramos no merece columna: se guarda tal cual.
    videoRetention: {
      p25: firstValue(insights?.video_p25_watched_actions),
      p50: firstValue(insights?.video_p50_watched_actions),
      p75: firstValue(insights?.video_p75_watched_actions),
      p100: firstValue(insights?.video_p100_watched_actions),
    },
  };
}
