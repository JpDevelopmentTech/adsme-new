import type { NominaRosterEntry } from "@/domain/entities/nomina-roster";
import type { RosterSort } from "@/types/nomina-artistas.types";

/** Copia del roster ordenada por la columna elegida; sin orden, el de alta. */
export function sortNominaRoster(entries: NominaRosterEntry[], sort: RosterSort | null): NominaRosterEntry[] {
  if (!sort) return entries;
  const factor = sort.direction === "asc" ? 1 : -1;

  return [...entries].sort((a, b) => {
    const left = a[sort.key];
    const right = b[sort.key];
    if (typeof left === "string" && typeof right === "string") return left.localeCompare(right) * factor;
    return (Number(left) - Number(right)) * factor;
  });
}
