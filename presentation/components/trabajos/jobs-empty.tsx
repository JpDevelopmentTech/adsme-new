"use client";

import { Disc3, Plus, SearchX } from "lucide-react";
import { JOBS_COPY, JOBS_EMPTY_COPY } from "@/constants/jobs.constants";
import { NEW_JOB_ROUTE } from "@/constants/routes.constants";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import { useQueryParams } from "@/presentation/hooks/use-query-params";
import type { JobsEmptyProps } from "@/types/jobs-list.types";

/** Estado vacío del listado: sin trabajos aún, o sin resultados para los filtros. */
export function JobsEmpty({ isFiltered }: JobsEmptyProps) {
  const { clearParams, isPending } = useQueryParams();

  return (
    <div className="flex flex-col items-center justify-center gap-4 rounded-card border border-dashed border-border bg-surface px-8 py-16 text-center">
      {isFiltered ? (
        <SearchX size={26} className="text-text-muted" aria-hidden />
      ) : (
        <Disc3 size={26} className="text-text-muted" aria-hidden />
      )}

      <div className="flex w-[440px] max-w-full flex-col gap-1.5">
        <p className="font-display text-base font-bold text-text-primary">
          {isFiltered ? JOBS_EMPTY_COPY.noResultsTitle : JOBS_EMPTY_COPY.title}
        </p>
        <p className="text-[13px] leading-[1.5] text-text-secondary">
          {isFiltered
            ? JOBS_EMPTY_COPY.noResultsSubtitle
            : JOBS_EMPTY_COPY.subtitle}
        </p>
      </div>

      {isFiltered ? (
        <SecondaryButton
          type="button"
          icon={null}
          isLoading={isPending}
          onClick={clearParams}
          className="px-5 py-2.5 text-[13px]"
        >
          {JOBS_EMPTY_COPY.clearFilters}
        </SecondaryButton>
      ) : (
        <PrimaryLink href={NEW_JOB_ROUTE}>
          <Plus size={18} strokeWidth={2} aria-hidden />
          {JOBS_COPY.newJob}
        </PrimaryLink>
      )}
    </div>
  );
}
