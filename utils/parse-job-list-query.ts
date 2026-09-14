import type { FilterOption } from "@/constants/client-filters.constants";
import {
  JOB_PLATFORM_OPTIONS,
  JOB_QUERY_PARAMS,
  JOB_SORT_VALUES,
  JOB_STATUS_OPTIONS,
} from "@/constants/jobs.constants";
import {
  DEFAULT_JOB_LIST_QUERY,
  type JobListQuery,
  type JobPlatformFilter,
  type JobSort,
  type JobStatusFilter,
} from "@/domain/entities/job-query";
import type { RawSearchParams } from "@/utils/parse-client-list-query";

/** Construye la consulta del listado de trabajos a partir de la URL. */
export function parseJobListQuery(params: RawSearchParams): JobListQuery {
  return {
    search: readText(params[JOB_QUERY_PARAMS.search]),
    status: readOption<JobStatusFilter>(
      params[JOB_QUERY_PARAMS.status],
      JOB_STATUS_OPTIONS,
      DEFAULT_JOB_LIST_QUERY.status,
    ),
    platform: readOption<JobPlatformFilter>(
      params[JOB_QUERY_PARAMS.platform],
      JOB_PLATFORM_OPTIONS,
      DEFAULT_JOB_LIST_QUERY.platform,
    ),
    client: readText(params[JOB_QUERY_PARAMS.client]) || DEFAULT_JOB_LIST_QUERY.client,
    sort: readSort(params[JOB_QUERY_PARAMS.sort]),
  };
}

function readSort(value: string | string[] | undefined): JobSort {
  const match = JOB_SORT_VALUES.find((option) => option === value);

  return match ?? DEFAULT_JOB_LIST_QUERY.sort;
}

function readText(value: string | string[] | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

function readOption<TValue extends string>(
  value: string | string[] | undefined,
  options: FilterOption<TValue>[],
  fallback: TValue,
): TValue {
  const match = options.find((option) => option.value === value);

  return match ? match.value : fallback;
}
