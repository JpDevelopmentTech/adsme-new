import type { QuotePlatform } from "@/domain/entities/quote";
import { calculateQuotePlatform } from "@/domain/use-cases/quote/calculate-quote-platform";
import { toCop, type QuoteMoneyContext } from "@/domain/use-cases/quote/quote-money";

/** Campos numéricos de una plataforma que se editan con un valor. */
export type QuotePlatformField = "total" | "fee" | "feeDiscount" | "months" | "serviceDiscountPct" | "serviceDiscount";

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/**
 * Aplica un valor a un campo de la plataforma. El descuento de comisión se
 * traduce al % que se cobra; el de servicio, a su %. Los importes llegan en la
 * moneda de la vista.
 */
export function applyPlatformField(platform: QuotePlatform, field: QuotePlatformField, value: number, ctx: QuoteMoneyContext): void {
  const figures = calculateQuotePlatform(platform, ctx);
  const base = ctx.settings.fee / 100;

  if (field === "total") {
    platform.anchor = "total";
    platform.total = toCop(value, ctx);
  } else if (field === "fee") {
    platform.fee = Math.min(99, value);
  } else if (field === "feeDiscount") {
    let fee = platform.fee;
    if (platform.anchor === "total" && figures.workValue > 0) fee = (base - value / figures.workValue) * 100;
    if (platform.anchor === "pauta" && figures.pauta - value !== 0) fee = ((base * figures.pauta - value) / (figures.pauta - value)) * 100;
    platform.fee = Math.round(Math.min(99, fee) * 10_000) / 10_000;
  } else if (field === "months") {
    platform.months = clamp(Math.trunc(value) || 1, 1, 36);
  } else if (field === "serviceDiscountPct") {
    platform.serviceDiscountPct = clamp(value, 0, 100);
  } else {
    platform.serviceDiscountPct = figures.serviceGross ? clamp((value / figures.serviceGross) * 100, 0, 100) : 0;
  }
}
