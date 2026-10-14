"use client";

import { useState } from "react";
import { NOMINA_ARTISTAS_COPY as COPY } from "@/constants/nomina-artistas-copy.constants";
import { ArtistsRosterHead } from "@/presentation/components/nomina/artistas/artists-roster-head";
import { ArtistsRosterRow } from "@/presentation/components/nomina/artistas/artists-roster-row";
import type { ArtistsRosterTableProps, RosterSort, RosterSortKey } from "@/types/nomina-artistas.types";
import { nextRosterSort } from "@/utils/next-roster-sort";
import { NOMINA_TABLE_SCROLL_CLASSES } from "@/utils/nomina-table-styles";
import { ROSTER_TABLE_MIN_WIDTH_CLASS } from "@/utils/roster-table-styles";
import { sortNominaRoster } from "@/utils/sort-nomina-roster";
import { cn } from "@/utils/cn";

/**
 * Roster completo en vidrio grueso. Arranca en orden de alta; pulsar una
 * columna de cifras ordena descendente y el siguiente clic invierte.
 */
export function ArtistsRosterTable({ entries }: ArtistsRosterTableProps) {
  const [sort, setSort] = useState<RosterSort | null>(null);
  const onSort = (key: RosterSortKey) => setSort((current) => nextRosterSort(current, key));

  return (
    <section className="glass-thick @container rounded-card px-6 py-2">
      <div className={NOMINA_TABLE_SCROLL_CLASSES}>
        <table aria-label={COPY.tableLabel} className={cn("w-full border-collapse", ROSTER_TABLE_MIN_WIDTH_CLASS)}>
          <ArtistsRosterHead sort={sort} onSort={onSort} />
          <tbody>
            {sortNominaRoster(entries, sort).map((entry) => (
              <ArtistsRosterRow key={entry.id} entry={entry} />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
