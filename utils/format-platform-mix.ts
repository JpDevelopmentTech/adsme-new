import { CLIENT_ROW_COPY } from "@/constants/clients.constants";
import { PLATFORM_LABELS } from "@/constants/platform-labels.constants";
import type { ClientPlatformShare } from "@/domain/entities/client-listing";
import { formatPercent } from "@/utils/format-compact-number";

/**
 * Reparto de la inversión en texto. La barra apilada lo dice con color, que un
 * lector de pantalla no ve: esta cadena es la que lleva el dato.
 */
export function formatPlatformMix(shares: ClientPlatformShare[]): string {
  const active = shares.filter((share) => share.percent > 0);

  if (active.length === 0) return CLIENT_ROW_COPY.noCampaigns;

  return active
    .map(
      (share) =>
        `${PLATFORM_LABELS[share.platform]} ${formatPercent(share.percent)}`,
    )
    .join(" · ");
}
