import type { QuoteCurrency } from "@/domain/entities/quote";

/** Importe de la cotización: `$1.234.567` en pesos o `US$1,234.56` en dólares. */
export function formatQuoteMoney(value: number, currency: QuoteCurrency): string {
  const sign = value < -0.004 ? "-" : "";
  const amount = Math.abs(value);
  const digits = currency === "COP"
    ? Math.round(amount).toLocaleString("es-CO")
    : (Math.round(amount * 100) / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${sign}${currency === "COP" ? "$" : "US$"}${digits}`;
}

/** Porcentaje con coma decimal y hasta dos decimales: `12,5`. */
export function formatQuotePct(value: number): string {
  return String(Math.round(value * 100) / 100).replace(".", ",");
}

/** TRM en pesos: `$3.156,32`. */
export function formatTrm(value: number): string {
  return `$${value.toLocaleString("es-CO", { maximumFractionDigits: 2 })}`;
}
