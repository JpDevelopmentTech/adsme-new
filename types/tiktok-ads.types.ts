import type { TiktokAdvertiser } from "@/domain/entities/tiktok-ads";

export interface TiktokAccountsResult {
  accounts: TiktokAdvertiser[];
  /** Cuenta de la que se está importando ahora mismo. */
  currentId: string | null;
}
