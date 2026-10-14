import type { LedgerEntry, LedgerTotals } from "@/types/nomina-finanzas.types";

/** Totales de la fila «Total» del libro para los movimientos dados. */
export function sumLedgerEntries(entries: LedgerEntry[]): LedgerTotals {
  return entries.reduce(
    (sum, entry) => ({
      amount: sum.amount + entry.amount,
      service: sum.service + entry.service,
      profit: sum.profit + entry.profit,
      taxes: sum.taxes + entry.taxes,
      netProfit: sum.netProfit + entry.netProfit,
      investment: sum.investment + entry.investment,
    }),
    { amount: 0, service: 0, profit: 0, taxes: 0, netProfit: 0, investment: 0 },
  );
}
