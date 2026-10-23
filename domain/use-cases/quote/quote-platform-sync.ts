import type { QuotePlatform } from "@/domain/entities/quote";
import { calculateQuotePlatform } from "@/domain/use-cases/quote/calculate-quote-platform";
import { toCop, type QuoteMoneyContext } from "@/domain/use-cases/quote/quote-money";

/** Escribe en las líneas los montos que hoy resultan del reparto (en COP). */
export function materializeLines(platform: QuotePlatform, ctx: QuoteMoneyContext): void {
  const { lineValues } = calculateQuotePlatform(platform, ctx);
  platform.lines.forEach((line, index) => {
    line.amount = toCop(lineValues[index], ctx);
  });
}

/** Si manda la pauta, guarda el total resultante para que el reparto lo vea. */
export function syncPlatformTotal(platform: QuotePlatform, ctx: QuoteMoneyContext): void {
  if (platform.anchor !== "total") platform.total = toCop(calculateQuotePlatform(platform, ctx).total, ctx);
}
