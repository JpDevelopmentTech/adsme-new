import type { RosterSort, RosterSortKey } from "@/types/nomina-artistas.types";

/** Orden tras pulsar una columna: primero descendente, luego alterna. */
export function nextRosterSort(current: RosterSort | null, key: RosterSortKey): RosterSort {
  if (current?.key !== key) return { key, direction: "desc" };
  return { key, direction: current.direction === "desc" ? "asc" : "desc" };
}
