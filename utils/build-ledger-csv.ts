import { FINANCE_LEDGER_COPY } from "@/constants/nomina-finanzas-copy.constants";
import type { LedgerEntry } from "@/types/nomina-finanzas.types";
import { formatMonthShort, formatShortDate } from "@/utils/format-nomina-dates";

/** Celda CSV entre comillas, con las comillas internas duplicadas. */
function cell(value: string | number): string {
  return `"${String(value).replaceAll('"', '""')}"`;
}

/**
 * CSV del libro: las columnas de la tabla más la fecha del evento. Los importes van en pesos enteros
 * sin formato, para que la hoja de cálculo los lea como números.
 */
export function buildLedgerCsv(entries: LedgerEntry[]): string {
  const rows = entries.map((entry) => [
    formatShortDate(entry.incomeDate),
    formatShortDate(entry.eventDate),
    formatMonthShort(entry.assignedMonth),
    entry.artistName,
    entry.conceptLabel,
    ...[entry.amount, entry.service, entry.profit, entry.taxes, entry.netProfit, entry.investment].map(Math.round),
  ]);

  return [FINANCE_LEDGER_COPY.csvColumns, ...rows].map((row) => row.map(cell).join(",")).join("\r\n");
}
