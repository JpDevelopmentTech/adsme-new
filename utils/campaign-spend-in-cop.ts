import type { Money } from "@/domain/entities/money";

/**
 * Pesos de un gasto de campaña: los pesos tal cual y los dólares con la TRM
 * manual del trabajo. Sin TRM (u otra moneda) devuelve `null`: nunca se suman
 * monedas distintas sin convertir.
 */
export function campaignSpendInCop(spend: Money, usdCopRate: number | null): number | null {
  if (spend.currency === "COP") return Math.round(spend.amount);
  if (spend.currency === "USD" && usdCopRate !== null && usdCopRate > 0) return Math.round(spend.amount * usdCopRate);
  return null;
}
