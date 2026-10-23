import type { QuoteDraft, QuotePlatform } from "@/domain/entities/quote";
import { calculateQuotePlatform } from "@/domain/use-cases/quote/calculate-quote-platform";
import { roundMoney, toCop, toView, type QuoteMoneyContext } from "@/domain/use-cases/quote/quote-money";

/** Pesos que tenía cada plataforma al empezar a editar, para repartir en proporción. */
export type QuoteShareSnapshot = Record<string, number> | null;

/** Contexto de moneda de la cotización. */
export function moneyContext(draft: QuoteDraft): QuoteMoneyContext {
  return { currency: draft.currency, settings: draft.settings };
}

/** Suma de los totales de las plataformas, en la moneda de la vista. */
export function grandSum(draft: QuoteDraft): number {
  const ctx = moneyContext(draft);
  return draft.platforms.reduce((sum, platform) => sum + calculateQuotePlatform(platform, ctx).total, 0);
}

/** Total general efectivo: el fijo si se escribió a mano, si no la suma. */
export function grandValue(draft: QuoteDraft): number {
  return draft.grandFixed ? roundMoney(toView(draft.grand, moneyContext(draft)), draft.currency) : grandSum(draft);
}

/** Fija el total general (en la moneda de la vista). */
export function fixGrand(draft: QuoteDraft, value: number): void {
  draft.grandFixed = true;
  draft.grand = toCop(value, moneyContext(draft));
}

/**
 * Con el total fijo, reparte lo que queda entre las plataformas sin candado en
 * proporción a lo que tenían; la última se lleva el residuo del redondeo.
 */
export function rebalanceOthers(draft: QuoteDraft, keep: QuotePlatform | null, snapshot: QuoteShareSnapshot): void {
  if (!draft.grandFixed) return;
  const ctx = moneyContext(draft);
  const totals = new Map(draft.platforms.map((p) => [p.id, calculateQuotePlatform(p, ctx).total]));
  const fixedSum = draft.platforms.filter((p) => p === keep || p.locked).reduce((sum, p) => sum + (totals.get(p.id) ?? 0), 0);
  const others = draft.platforms.filter((p) => p !== keep && !p.locked);
  if (others.length === 0) return;

  const rest = Math.max(0, grandValue(draft) - fixedSum);
  const weight = (p: QuotePlatform) => snapshot?.[p.id] ?? Math.max(0, totals.get(p.id) ?? 0);
  const weightSum = others.reduce((sum, p) => sum + weight(p), 0);
  let accumulated = 0;
  others.forEach((platform, index) => {
    const value = index === others.length - 1
      ? roundMoney(rest - accumulated, draft.currency)
      : roundMoney(weightSum > 0 ? (weight(platform) / weightSum) * rest : rest / others.length, draft.currency);
    accumulated += value;
    platform.anchor = "total";
    platform.total = toCop(value, ctx);
  });
}

/** Fija el total de una plataforma dentro de lo que deja el total general. */
export function setPlatformTotal(draft: QuoteDraft, platform: QuotePlatform, value: number, snapshot: QuoteShareSnapshot): void {
  const ctx = moneyContext(draft);
  const lockedOthers = draft.platforms
    .filter((p) => p !== platform && p.locked)
    .reduce((sum, p) => sum + calculateQuotePlatform(p, ctx).total, 0);
  const hasFreeOthers = draft.platforms.some((p) => p !== platform && !p.locked);
  const available = grandValue(draft) - lockedOthers;
  const clamped = hasFreeOthers ? Math.min(available, Math.max(0, value)) : available;
  platform.anchor = "total";
  platform.total = toCop(roundMoney(clamped, draft.currency), ctx);
  rebalanceOthers(draft, platform, snapshot);
}
