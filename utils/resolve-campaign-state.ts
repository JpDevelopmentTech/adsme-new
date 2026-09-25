import type { CampaignState } from "@/types/campaigns-list.types";
import { isActiveCampaignStatus } from "@/utils/is-active-campaign";

/**
 * Traduce el estado crudo de la plataforma al de la lista. Una campaña cuya
 * ventana ya pasó se lee como finalizada aunque su plataforma la siga
 * reportando activa: es lo que el usuario ve en el calendario.
 */
export function resolveCampaignState(
  status: string,
  endsAt: string | null,
  today: string,
): CampaignState {
  if (endsAt && endsAt.slice(0, 10) < today) return "ended";

  return isActiveCampaignStatus(status) ? "active" : "paused";
}
