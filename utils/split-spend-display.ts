import { BASE_CURRENCY } from "@/constants/currency.constants";
import type { SpendByCurrency } from "@/domain/entities/money";
import type { MoneyFormatOptions, SpendDisplay } from "@/types/money.types";
import { formatMoney } from "@/utils/format-money";
import { formatSpend } from "@/utils/format-spend";
import { sortCurrencies } from "@/utils/sort-currencies";

/**
 * Parte un reparto por monedas para una tarjeta con cifra grande: la primera
 * moneda arriba y las demás en la nota. Así una tarjeta pensada para un número
 * no tiene que encajar «$8,9 M + US$876» en el espacio de la cifra.
 */
export function splitSpendDisplay(
  spend: SpendByCurrency,
  options: MoneyFormatOptions = {},
): SpendDisplay {
  const [first, ...others] = sortCurrencies(Object.keys(spend));

  if (!first) return { primary: formatMoney(0, BASE_CURRENCY, options), rest: null };

  const rest = Object.fromEntries(
    others.map((currency) => [currency, spend[currency] ?? 0]),
  );

  return {
    primary: formatMoney(spend[first] ?? 0, first, options),
    rest: others.length > 0 ? formatSpend(rest, options) : null,
  };
}
