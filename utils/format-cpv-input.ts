import { CURRENCY_LOCALE } from "@/constants/currency.constants";

/** CPV guardado tal como se escribe en el campo: `35` o `35,5`, sin separador de miles. */
export function formatCpvInput(value: number | null): string {
  if (value === null) return "";

  return new Intl.NumberFormat(CURRENCY_LOCALE, {
    maximumFractionDigits: 2,
    useGrouping: false,
  }).format(value);
}
