import type { SpendByCurrency } from "@/domain/entities/money";
import { addToSpend } from "@/utils/add-to-spend";

/** Junta varios repartos por moneda; cada moneda se suma solo consigo misma. */
export function sumSpend(items: SpendByCurrency[]): SpendByCurrency {
  return items.reduce<SpendByCurrency>(
    (total, spend) =>
      Object.entries(spend).reduce(
        (acc, [currency, amount]) => addToSpend(acc, currency, amount),
        total,
      ),
    {},
  );
}
