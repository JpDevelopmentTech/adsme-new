"use client";

import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import { JOBS_COPY, JOB_QUERY_PARAMS } from "@/constants/jobs.constants";
import {
  DEFAULT_JOB_LIST_QUERY,
  jobSortDirection,
  nextJobSort,
} from "@/domain/entities/job-query";
import { useQueryParams } from "@/presentation/hooks/use-query-params";
import type { SortHeaderProps } from "@/types/jobs-list.types";
import { cn } from "@/utils/cn";

/** Encabezado que ordena la tabla: descendente, ascendente y vuelta al orden por defecto. */
export function SortHeader({ label, column, sort, hideLabel = false }: SortHeaderProps) {
  const { setParam } = useQueryParams();
  const direction = jobSortDirection(column, sort);

  const applySort = () => {
    const next = nextJobSort(column, sort);

    setParam(
      JOB_QUERY_PARAMS.sort,
      next === DEFAULT_JOB_LIST_QUERY.sort ? null : next,
    );
  };

  return (
    <button
      type="button"
      onClick={applySort}
      aria-label={JOBS_COPY.sortBy(label)}
      className={cn(
        "flex cursor-pointer items-center gap-1.5 rounded-sm transition-colors duration-150 hover:text-text-primary focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none",
        direction ? "text-text-primary" : "text-text-muted",
      )}
    >
      {hideLabel ? <span className="sr-only">{label}</span> : label}
      {direction === "desc" ? <ArrowDown size={12} aria-hidden /> : null}
      {direction === "asc" ? <ArrowUp size={12} aria-hidden /> : null}
      {direction === null && hideLabel ? (
        <ArrowUpDown size={12} aria-hidden />
      ) : null}
    </button>
  );
}
