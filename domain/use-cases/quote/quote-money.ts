import type { QuoteCurrency, QuoteSettings } from "@/domain/entities/quote";

/** Contexto de moneda con el que se ven y se guardan los importes. */
export interface QuoteMoneyContext {
  currency: QuoteCurrency;
  settings: QuoteSettings;
}

/** Redondeo de la moneda de la vista: pesos enteros o centavos de dólar. */
export function roundMoney(value: number, currency: QuoteCurrency): number {
  return currency === "COP" ? Math.round(value) : Math.round(value * 100) / 100;
}

/** De COP guardado a la moneda de la vista (sin TRM, el dólar vale 0). */
export function toView(copAmount: number, { currency, settings }: QuoteMoneyContext): number {
  if (currency === "COP") return copAmount;
  return settings.trm ? copAmount / settings.trm : 0;
}

/** De la moneda de la vista a COP, que es como se guarda todo. */
export function toCop(viewAmount: number, { currency, settings }: QuoteMoneyContext): number {
  return currency === "COP" ? viewAmount : viewAmount * settings.trm;
}

/** Servicio Marker mensual: es fijo por moneda, no se convierte con la TRM. */
export function monthlyService({ currency, settings }: QuoteMoneyContext): number {
  return settings.service[currency];
}
