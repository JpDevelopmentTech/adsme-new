import type { Money } from "@/domain/entities/money";
import { sortCurrencies } from "@/utils/sort-currencies";

/**
 * Comparador para listar importes de mayor a menor. Dos monedas distintas no se
 * comparan por cifra —876 dólares no son «menos» que 50.000 pesos—, así que
 * primero se agrupan por moneda y dentro de cada una manda el importe.
 */
export function compareMoneyDesc(a: Money, b: Money): number {
  if (a.currency !== b.currency) {
    return sortCurrencies([a.currency, b.currency])[0] === a.currency ? -1 : 1;
  }

  return b.amount - a.amount;
}
