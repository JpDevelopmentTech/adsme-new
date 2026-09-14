"use client";

import {
  JOBS_COPY,
  JOB_FILTER_PREFIXES,
  JOB_PLATFORM_OPTIONS,
  JOB_QUERY_PARAMS,
  JOB_STATUS_OPTIONS,
} from "@/constants/jobs.constants";
import { DEFAULT_JOB_LIST_QUERY } from "@/domain/entities/job-query";
import { JobsViewToggle } from "@/presentation/components/trabajos/jobs-view-toggle";
import { FilterSelect } from "@/presentation/components/ui/filter-select";
import { SearchField } from "@/presentation/components/ui/search-field";
import { useQueryParams } from "@/presentation/hooks/use-query-params";
import type { JobsToolbarProps } from "@/types/jobs-list.types";

/** Barra de búsqueda y filtros del listado de trabajos; el estado vive en la URL. */
export function JobsToolbar({ query, clientOptions }: JobsToolbarProps) {
  const { setParam } = useQueryParams();

  const applyFilter = (key: string, value: string, fallback: string) => {
    setParam(key, value === fallback ? null : value);
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <SearchField
        value={query.search}
        paramName={JOB_QUERY_PARAMS.search}
        placeholder={JOBS_COPY.searchPlaceholder}
      />

      <FilterSelect
        prefix={JOB_FILTER_PREFIXES.status}
        value={query.status}
        options={JOB_STATUS_OPTIONS}
        defaultValue={DEFAULT_JOB_LIST_QUERY.status}
        onChange={(value) =>
          applyFilter(JOB_QUERY_PARAMS.status, value, DEFAULT_JOB_LIST_QUERY.status)
        }
        onClear={() => setParam(JOB_QUERY_PARAMS.status, null)}
      />

      <FilterSelect
        prefix={JOB_FILTER_PREFIXES.platform}
        value={query.platform}
        options={JOB_PLATFORM_OPTIONS}
        defaultValue={DEFAULT_JOB_LIST_QUERY.platform}
        onChange={(value) =>
          applyFilter(
            JOB_QUERY_PARAMS.platform,
            value,
            DEFAULT_JOB_LIST_QUERY.platform,
          )
        }
        onClear={() => setParam(JOB_QUERY_PARAMS.platform, null)}
      />

      <FilterSelect
        prefix={JOB_FILTER_PREFIXES.client}
        value={query.client}
        options={clientOptions}
        defaultValue={DEFAULT_JOB_LIST_QUERY.client}
        onChange={(value) =>
          applyFilter(JOB_QUERY_PARAMS.client, value, DEFAULT_JOB_LIST_QUERY.client)
        }
        onClear={() => setParam(JOB_QUERY_PARAMS.client, null)}
      />

      <div className="flex-1" />

      <JobsViewToggle />
    </div>
  );
}
