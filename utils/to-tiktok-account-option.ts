import type { TiktokAdvertiser } from "@/domain/entities/tiktok-ads";
import type { AccountPickerOption } from "@/types/account-picker.types";

/** Cuenta de anunciante de TikTok como fila del selector. */
export function toTiktokAccountOption(
  advertiser: TiktokAdvertiser,
): AccountPickerOption {
  return {
    id: advertiser.id,
    name: advertiser.name,
    hint: advertiser.currency
      ? `${advertiser.id} · ${advertiser.currency}`
      : advertiser.id,
  };
}
