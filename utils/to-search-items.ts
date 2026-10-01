import { GLOBAL_SEARCH_COPY } from "@/constants/global-search.constants";
import { PLATFORM_OF_CONNECTION } from "@/constants/platform-labels.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import { CAMPAIGNS_ROUTE, clientDetailRoute, jobDetailRoute } from "@/constants/routes.constants";
import type { GlobalSearchResults } from "@/domain/entities/global-search";
import type { SearchItem } from "@/types/global-search.types";

/**
 * Aplana los tres grupos en una sola lista, en el orden en que se pintan, para
 * que las flechas recorran los resultados de arriba abajo sin saltos. Cada uno
 * lleva su destino: la ficha del cliente, el detalle del trabajo o la bandeja
 * de campañas filtrada por su nombre (las campañas no tienen ficha propia).
 */
export function toSearchItems(results: GlobalSearchResults): SearchItem[] {
  return [
    ...results.clients.map((client) => ({
      key: `client-${client.id}`,
      group: "clients" as const,
      href: clientDetailRoute(client.id),
      title: client.name,
      subtitle: `${client.handle} · ${client.kind}`,
      visual: {
        type: "client" as const,
        initials: client.initials,
        gradient: client.gradient,
        avatarUrl: client.avatarUrl,
      },
    })),
    ...results.jobs.map((job) => ({
      key: `job-${job.id}`,
      group: "jobs" as const,
      href: jobDetailRoute(job.id),
      title: job.title,
      subtitle: job.artistName,
      visual: { type: "job" as const, coverUrl: job.coverUrl },
    })),
    ...results.campaigns.map((campaign) => {
      const platform = PLATFORM_OF_CONNECTION[campaign.platform];

      return {
        key: `campaign-${campaign.id}`,
        group: "campaigns" as const,
        href: `${CAMPAIGNS_ROUTE}?q=${encodeURIComponent(campaign.name)}`,
        title: campaign.name,
        subtitle: `${PLATFORM_META[platform].label} · ${GLOBAL_SEARCH_COPY.campaignId} ${campaign.externalCampaignId}`,
        visual: { type: "campaign" as const, platform },
      };
    }),
  ];
}
