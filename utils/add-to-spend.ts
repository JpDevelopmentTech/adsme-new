import type { SpendByCurrency } from "@/domain/entities/money";

/**
 * Suma un importe a su moneda sin tocar las demás. Devuelve un objeto nuevo y
 * quita la moneda si queda en cero, para que «no hay gasto» y «gasto cero»
 * se vean igual.
 */
export function addToSpend(
  spend: SpendByCurrency,
  currency: string,
  amount: number,
): SpendByCurrency {
  if (amount === 0) return spend;

  const result: Record<string, number> = { ...spend };
  const total = (result[currency] ?? 0) + amount;

  if (total === 0) delete result[currency];
  else result[currency] = total;

  return result;
}
