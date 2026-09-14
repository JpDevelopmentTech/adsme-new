import { CURRENCY_LOCALE } from "@/constants/currency.constants";

/**
 * Agrupa en miles lo que se escribe en un importe, descartando cualquier
 * carácter que no sea dígito. Devuelve cadena vacía cuando no queda ninguno,
 * para que el campo pueda vaciarse.
 */
export function formatThousands(value: string): string {
  const digits = value.replace(/\D/g, "");

  if (digits.length === 0) return "";

  return new Intl.NumberFormat(CURRENCY_LOCALE).format(Number(digits));
}
