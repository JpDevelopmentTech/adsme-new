import { QUOTE_MONEY_EPSILON } from "@/constants/quote-platforms-copy.constants";
import type { QuotePlatformFigures } from "@/domain/entities/quote-figures";
import type { PlatformStatus } from "@/types/quote-platforms.types";

/** Qué píldoras lleva la plataforma: descuento (ámbar) y pérdida o presupuesto insuficiente (rojo). */
export function quotePlatformStatus(figures: QuotePlatformFigures): PlatformStatus {
  const alert = figures.fee < 0 ? "loss" : figures.pauta < 0 ? "underBudget" : null;
  return { hasDiscount: figures.discount > QUOTE_MONEY_EPSILON, alert };
}
