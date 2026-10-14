import { NOMINA_ARTISTAS_COPY as COPY, ROSTER_ARIA_SORT, ROSTER_SORT_LABELS } from "@/constants/nomina-artistas-copy.constants";
import { RosterSortHeader } from "@/presentation/components/nomina/artistas/roster-sort-header";
import type { ArtistsRosterHeadProps, RosterSortKey } from "@/types/nomina-artistas.types";
import { cn } from "@/utils/cn";
import { NOMINA_TH_CLASSES } from "@/utils/nomina-table-styles";
import { ROSTER_STICKY_FIRST_CLASSES, ROSTER_STICKY_SECOND_CLASSES } from "@/utils/roster-table-styles";

const BEFORE_STATUS: RosterSortKey[] = ["monthIncome", "monthEvents"];
const AFTER_STATUS: RosterSortKey[] = ["grossTotal", "labelProfitTotal", "nomina", "availableBudget", "joinedAt"];

/** Cabecera del roster con las diez columnas; las de cifras ordenan al pulsarlas. */
export function ArtistsRosterHead({ sort, onSort }: ArtistsRosterHeadProps) {
  const sortable = (key: RosterSortKey) => (
    <th
      key={key}
      scope="col"
      aria-sort={sort?.key === key ? ROSTER_ARIA_SORT[sort.direction] : "none"}
      className={cn(NOMINA_TH_CLASSES, "text-right align-middle whitespace-normal")}
    >
      <RosterSortHeader label={ROSTER_SORT_LABELS[key]} column={key} sort={sort} onSort={onSort} />
    </th>
  );

  return (
    <thead>
      <tr className="border-b border-border">
        <th scope="col" className={cn(NOMINA_TH_CLASSES, ROSTER_STICKY_FIRST_CLASSES, "text-left")}>
          {COPY.client}
        </th>
        <th scope="col" className={cn(NOMINA_TH_CLASSES, ROSTER_STICKY_SECOND_CLASSES)}>
          <span className="sr-only">{COPY.newIncome}</span>
        </th>
        {BEFORE_STATUS.map(sortable)}
        <th scope="col" className={cn(NOMINA_TH_CLASSES, "text-center")}>
          {COPY.status}
        </th>
        {AFTER_STATUS.map(sortable)}
      </tr>
    </thead>
  );
}
