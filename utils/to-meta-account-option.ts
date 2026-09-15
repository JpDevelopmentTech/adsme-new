import type { MetaAdAccount } from "@/domain/entities/meta-ads";
import type { AccountPickerOption } from "@/types/account-picker.types";

/** Cuenta publicitaria de Meta como fila del selector. */
export function toMetaAccountOption(account: MetaAdAccount): AccountPickerOption {
  return { id: account.id, name: account.name, hint: account.id };
}
