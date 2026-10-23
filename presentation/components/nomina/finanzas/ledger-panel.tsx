"use client";

import { Download } from "lucide-react";
import { useState } from "react";
import { LEDGER_MAX_ROWS, LEDGER_PREVIEW_ROWS } from "@/constants/nomina-finanzas.constants";
import { FINANCE_LEDGER_COPY as COPY } from "@/constants/nomina-finanzas-copy.constants";
import { FinanceEmptyNote } from "@/presentation/components/nomina/finanzas/finance-empty-note";
import { LedgerTable } from "@/presentation/components/nomina/finanzas/ledger-table";
import { NominaPanel } from "@/presentation/components/nomina/nomina-panel";
import { FilterSelect } from "@/presentation/components/ui/filter-select";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import type { LedgerPanelProps } from "@/types/nomina-finanzas-props.types";
import { buildLedgerCsv } from "@/utils/build-ledger-csv";
import { downloadTextFile } from "@/utils/download-text-file";
import { slugifyLabel } from "@/utils/slugify-label";
import { sumLedgerEntries } from "@/utils/sum-ledger-entries";

const ALL = "todos";

/**
 * Libro de movimientos: filtra por artista en el navegador, enseña primero los
 * 12 más recientes y exporta a CSV todos los del filtro.
 */
export function LedgerPanel({ entries, artists, periodLabel }: LedgerPanelProps) {
  const [artist, setArtist] = useState(ALL);
  const [isExpanded, setIsExpanded] = useState(false);
  const filtered = artist === ALL ? entries : entries.filter((entry) => entry.artistId === artist);
  const visible = filtered.slice(0, isExpanded ? LEDGER_MAX_ROWS : LEDGER_PREVIEW_ROWS);
  const isCapped = isExpanded && filtered.length > LEDGER_MAX_ROWS;

  const changeArtist = (value: string) => {
    setArtist(value);
    setIsExpanded(false);
  };

  const exportCsv = () => {
    downloadTextFile(buildLedgerCsv(filtered), `${COPY.fileName}-${slugifyLabel(periodLabel)}.csv`, "text/csv;charset=utf-8");
  };

  const actions = (
    <>
      <FilterSelect
        value={artist}
        defaultValue={ALL}
        align="end"
        options={[{ value: ALL, label: COPY.allArtists }, ...artists]}
        onChange={changeArtist}
        onClear={() => changeArtist(ALL)}
      />
      <SecondaryButton type="button" icon={<Download size={16} strokeWidth={1.5} aria-hidden />} onClick={exportCsv} disabled={filtered.length === 0}>
        {COPY.export}
      </SecondaryButton>
    </>
  );

  return (
    <NominaPanel title={COPY.title} subtitle={`${COPY.count(filtered.length)} · ${periodLabel}`} actions={actions} isThick>
      {filtered.length === 0 ? (
        <FinanceEmptyNote title={COPY.empty} />
      ) : (
        <LedgerTable entries={visible} totals={sumLedgerEntries(filtered)} hiddenCount={filtered.length - visible.length} onShowAll={() => setIsExpanded(true)} />
      )}
      {isCapped ? <p className="text-xs text-text-muted">{COPY.capped}</p> : null}
    </NominaPanel>
  );
}
