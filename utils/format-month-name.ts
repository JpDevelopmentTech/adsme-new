import { CURRENCY_LOCALE } from "@/constants/currency.constants";

/** Nombre del mes en mayúscula inicial, como lo escribe el diseño ("Agosto"). */
export function formatMonthName(reference: Date): string {
  const name = new Intl.DateTimeFormat(CURRENCY_LOCALE, {
    month: "long",
  }).format(reference);

  return name.charAt(0).toUpperCase() + name.slice(1);
}
