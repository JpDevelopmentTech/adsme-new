import { FINANCE_PROFIT_COPY } from "@/constants/nomina-finanzas-copy.constants";
import { ArtistProfitRow } from "@/presentation/components/nomina/finanzas/artist-profit-row";
import type { ArtistProfitTableProps } from "@/types/nomina-finanzas-props.types";
import { cn } from "@/utils/cn";
import { NOMINA_TABLE_SCROLL_CLASSES, NOMINA_TH_CLASSES } from "@/utils/nomina-table-styles";

/** Columnas alineadas a la izquierda; el resto son cifras y van a la derecha. */
const LEFT_COLUMNS = new Set([0, 8]);
const CENTER_COLUMNS = new Set([9]);

/** Tabla «Rentabilidad por artista», de la mayor utilidad neta a la menor. */
export function ArtistProfitTable({ rows }: ArtistProfitTableProps) {
  return (
    <div className={NOMINA_TABLE_SCROLL_CLASSES}>
      <table className="w-full min-w-[1060px] border-collapse">
        <thead>
          <tr className="border-b border-border">
            {FINANCE_PROFIT_COPY.columns.map((column, index) => (
              <th
                key={column}
                scope="col"
                className={cn(NOMINA_TH_CLASSES, "whitespace-normal", LEFT_COLUMNS.has(index) ? "text-left" : CENTER_COLUMNS.has(index) ? "text-center" : "text-right")}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <ArtistProfitRow key={row.id} row={row} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
