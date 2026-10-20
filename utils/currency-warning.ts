import {
  CONVERTIBLE_CURRENCIES,
  CURRENCY_ERRORS,
} from "@/constants/currency.constants";

/**
 * Aviso para el usuario si la moneda de la cuenta no tiene conversión a pesos;
 * `null` si la tiene. Se avisa en vez de bloquear: las demás métricas siguen
 * siendo válidas y el gasto queda a la vista para corregirlo.
 */
export function currencyWarning(currency: string): string | null {
  return CONVERTIBLE_CURRENCIES.includes(currency)
    ? null
    : CURRENCY_ERRORS.notConvertible(currency);
}
