import type { AdAccountSelection } from "@/domain/entities/ad-account";
import type { TiktokAdvertiser } from "@/domain/entities/tiktok-ads";

/** Cuenta de anunciante de TikTok en el formato que guarda el dominio. */
export function toTiktokAccountSelection(
  advertiser: TiktokAdvertiser,
): AdAccountSelection {
  return {
    externalAccountId: advertiser.id,
    label: advertiser.name,
    extra: { currency: advertiser.currency },
  };
}
