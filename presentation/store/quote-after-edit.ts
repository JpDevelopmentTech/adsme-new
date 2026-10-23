import type { QuoteDraft, QuotePlatform } from "@/domain/entities/quote";
import { calculateQuotePlatform } from "@/domain/use-cases/quote/calculate-quote-platform";
import { moneyContext, rebalanceOthers, type QuoteShareSnapshot } from "@/domain/use-cases/quote/quote-grand-total";
import { toCop } from "@/domain/use-cases/quote/quote-money";
import { syncPlatformTotal } from "@/domain/use-cases/quote/quote-platform-sync";

/**
 * Tras editar una plataforma: guarda su total y, si el total general está
 * fijo, reparte el resto entre las demás (o lo arrastra si es la única).
 */
export function afterPlatformEdit(draft: QuoteDraft, platform: QuotePlatform, snapshot: QuoteShareSnapshot): void {
  const ctx = moneyContext(draft);
  syncPlatformTotal(platform, ctx);
  if (!draft.grandFixed) return;
  if (draft.platforms.length > 1) rebalanceOthers(draft, platform, snapshot);
  else draft.grand = toCop(calculateQuotePlatform(platform, ctx).total, ctx);
}
