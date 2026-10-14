"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { NOMINA_ARTISTAS_COPY as COPY } from "@/constants/nomina-artistas-copy.constants";
import type { RosterSortHeaderProps } from "@/types/nomina-artistas.types";
import { cn } from "@/utils/cn";

/** Encabezado ordenable del roster: muestra el sentido activo o el icono neutro. */
export function RosterSortHeader({ label, column, sort, onSort }: RosterSortHeaderProps) {
  const direction = sort?.key === column ? sort.direction : null;
  const Icon = direction === "desc" ? ArrowDown : direction === "asc" ? ArrowUp : ArrowUpDown;

  return (
    <button
      type="button"
      onClick={() => onSort(column)}
      aria-label={COPY.sortBy(label)}
      className={cn(
        "ml-auto flex cursor-pointer items-center gap-1.5 rounded-sm text-right transition-colors duration-150 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none",
        direction ? "text-text-primary" : "text-text-muted",
      )}
    >
      <span className="max-w-[92px]">{label}</span>
      <Icon size={12} className="shrink-0" aria-hidden />
    </button>
  );
}
