import type { MetaAdAccount } from "@/domain/entities/meta-ads";

export interface MetaAccountsResult {
  accounts: MetaAdAccount[];
  /** Cuenta de la que se está importando ahora mismo. */
  currentId: string | null;
}
