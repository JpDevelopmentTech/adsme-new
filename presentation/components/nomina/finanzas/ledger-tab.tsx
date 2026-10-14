import { LedgerPanel } from "@/presentation/components/nomina/finanzas/ledger-panel";
import type { FinanceTabProps } from "@/types/nomina-finanzas-props.types";
import { buildLedgerEntries } from "@/utils/build-ledger-entries";
import { formatPeriodRange } from "@/utils/format-period-range";

/** Libro: todos los movimientos del periodo, con el filtro por artista y la exportación. */
export function LedgerTab({ finance }: FinanceTabProps) {
  const entries = buildLedgerEntries(finance);
  const artists = [...new Map(entries.map((entry) => [entry.artistId, entry.artistName])).entries()]
    .map(([value, label]) => ({ value, label }))
    .sort((a, b) => a.label.localeCompare(b.label, "es"));

  return <LedgerPanel entries={entries} artists={artists} periodLabel={formatPeriodRange(finance.fromMonth, finance.toMonth)} />;
}
