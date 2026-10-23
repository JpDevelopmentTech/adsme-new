import type { NominaEligibleClient } from "@/domain/entities/nomina-eligible-client";
import type { NominaMonthKpis } from "@/domain/entities/nomina-overview";
import type { NominaRosterEntry } from "@/domain/entities/nomina-roster";

/** Columnas del roster que se pueden ordenar. */
export type RosterSortKey =
  | "monthIncome"
  | "monthEvents"
  | "grossTotal"
  | "labelProfitTotal"
  | "nomina"
  | "availableBudget"
  | "joinedAt";

export type RosterSortDirection = "asc" | "desc";

export interface RosterSort {
  key: RosterSortKey;
  direction: RosterSortDirection;
}

export interface ArtistsMonthBandProps {
  kpis: NominaMonthKpis;
  /** Mes en curso `AAAA-MM`. */
  month: string;
}

export interface MonthBandFigureProps {
  label: string;
  value: string;
  note: string;
  dotColor: string;
}

export interface ArtistsEmptyStateProps {
  eligibleClients: NominaEligibleClient[];
}

export interface ArtistsRosterTableProps {
  entries: NominaRosterEntry[];
}

export interface ArtistsRosterHeadProps {
  sort: RosterSort | null;
  onSort: (key: RosterSortKey) => void;
}

export interface RosterSortHeaderProps {
  label: string;
  column: RosterSortKey;
  sort: RosterSort | null;
  onSort: (key: RosterSortKey) => void;
}

export interface ArtistsRosterRowProps {
  entry: NominaRosterEntry;
}
