"use client";

import { Disc3, Plus, SearchX, X } from "lucide-react";
import { JOBS_COPY, JOBS_EMPTY_COPY } from "@/constants/jobs.constants";
import { NEW_JOB_ROUTE } from "@/constants/routes.constants";
import { EmptyStatePanel } from "@/presentation/components/ui/empty-state-panel";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import { useQueryParams } from "@/presentation/hooks/use-query-params";
import type { JobsEmptyProps } from "@/types/jobs-list.types";

/** Estado vacío del listado: sin trabajos aún, o sin resultados para los filtros. */
export function JobsEmpty({ isFiltered }: JobsEmptyProps) {
  const { clearParams, isPending } = useQueryParams();

  if (isFiltered) {
    return (
      <EmptyStatePanel
        icon={<SearchX size={24} strokeWidth={1.5} aria-hidden />}
        title={JOBS_EMPTY_COPY.noResultsTitle}
        description={JOBS_EMPTY_COPY.noResultsSubtitle}
        action={
          <SecondaryButton
            type="button"
            icon={<X size={16} strokeWidth={1.75} aria-hidden />}
            isLoading={isPending}
            onClick={clearParams}
          >
            {JOBS_EMPTY_COPY.clearFilters}
          </SecondaryButton>
        }
      />
    );
  }

  return (
    <EmptyStatePanel
      isStandalone
      icon={<Disc3 size={24} strokeWidth={1.5} aria-hidden />}
      title={JOBS_EMPTY_COPY.title}
      description={JOBS_EMPTY_COPY.subtitle}
      action={
        <PrimaryLink href={NEW_JOB_ROUTE}>
          <Plus size={16} strokeWidth={1.75} aria-hidden />
          {JOBS_COPY.newJob}
        </PrimaryLink>
      }
    />
  );
}
