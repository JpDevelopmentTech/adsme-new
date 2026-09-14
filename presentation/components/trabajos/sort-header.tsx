"use client";

import { ArrowDown, ArrowUp } from "lucide-react";
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
export function SortHeader({ label, column, sort }: SortHeaderProps) {
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
        "flex cursor-pointer items-center gap-1.5 rounded-sm transition-colors hover:text-text-secondary focus-visible:ring-2 focus-visible:ring-brand-violet/60 focus-visible:outline-none",
        direction ? "text-text-secondary" : "text-text-muted",
      )}
    >
      {label}
      {direction === "desc" ? <ArrowDown size={12} aria-hidden /> : null}
      {direction === "asc" ? <ArrowUp size={12} aria-hidden /> : null}
    </button>
  );
}
