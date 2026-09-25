import { CURRENCY_LOCALE } from "@/constants/currency.constants";

/**
 * Cifra completa con separador de miles: `28.094.489`.
 *
 * El reporte va sin abreviar a propósito. «28,1 M» se lee de un vistazo, pero
 * esconde el dato que devolvió la plataforma y, junto a una inversión con todos
 * sus dígitos, hace dudar de si la cifra está redondeada a ojo. Quien recibe el
 * enlace quiere el número, no el orden de magnitud.
 */
export function formatExactNumber(value: number): string {
  return new Intl.NumberFormat(CURRENCY_LOCALE).format(Math.round(value));
}
