import type { Money, SpendByCurrency } from "@/domain/entities/money";
import { compareMoneyDesc } from "@/utils/compare-money-desc";
import { sortCurrencies } from "@/utils/sort-currencies";

/** La moneda que encabeza un reparto, con su importe; cero en pesos si está vacío. */
function leadingMoney(spend: SpendByCurrency): Money {
  const [currency] = sortCurrencies(Object.keys(spend));

  return currency
    ? { currency, amount: spend[currency] ?? 0 }
    : { currency: "COP", amount: 0 };
}

/**
 * Comparador de repartos por moneda (grupos de campañas, plataformas). Ordena
 * por la moneda que encabeza cada uno y, dentro de ella, por importe.
 */
export function compareSpendDesc(a: SpendByCurrency, b: SpendByCurrency): number {
  return compareMoneyDesc(leadingMoney(a), leadingMoney(b));
}
