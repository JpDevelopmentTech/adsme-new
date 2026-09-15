import type { AdAccountSelection } from "@/domain/entities/ad-account";
import type { MetaAdAccount } from "@/domain/entities/meta-ads";

/** Cuenta publicitaria de Meta en el formato que guarda el dominio. */
export function toMetaAccountSelection(
  account: MetaAdAccount,
): AdAccountSelection {
  return {
    externalAccountId: account.id,
    label: account.name,
    extra: { accountNumericId: account.accountId },
  };
}
