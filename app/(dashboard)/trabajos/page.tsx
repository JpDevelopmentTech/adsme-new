import type { Metadata } from "next";
import {
  DEFAULT_JOB_LIST_QUERY,
  isFilteredJobQuery,
} from "@/domain/entities/job-query";
import { createListJobs } from "@/domain/use-cases/list-jobs";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { JobsEmpty } from "@/presentation/components/trabajos/jobs-empty";
import { JobsSummaryBand } from "@/presentation/components/trabajos/jobs-summary-band";
import { JobsTable } from "@/presentation/components/trabajos/jobs-table";
import { buildJobClientOptions } from "@/utils/build-job-client-options";
import { buildJobsSummary } from "@/utils/build-jobs-summary";
import { toIsoDate } from "@/utils/month-range";
import { parseJobListQuery } from "@/utils/parse-job-list-query";

export const metadata: Metadata = { title: "Trabajos · adsme" };

/**
 * Pantalla `B5 · Trabajos`: el listado leído como línea de tiempo. Todas las
 * filas comparten eje, así que los períodos se comparan entre sí y la marca de
 * hoy cruza la tabla entera.
 */
export default async function TrabajosPage({
  searchParams,
}: PageProps<"/trabajos">) {
  const query = parseJobListQuery(await searchParams);
  const supabase = await createServerSupabaseClient();
  const listJobs = createListJobs(createSupabaseJobRepository(supabase));

  const [jobs, allJobs] = await Promise.all([
    listJobs(query),
    listJobs(DEFAULT_JOB_LIST_QUERY),
  ]);
  const today = toIsoDate(new Date());

  // Sin ningún trabajo todavía no hay cartera que resumir ni nada que filtrar.
  if (allJobs.length === 0) return <JobsEmpty isFiltered={false} />;

  return (
    <>
      <JobsSummaryBand summary={buildJobsSummary(allJobs, today)} />

      <JobsTable
        jobs={jobs}
        totalJobs={allJobs.length}
        today={today}
        query={query}
        clientOptions={buildJobClientOptions(allJobs)}
        isFiltered={isFilteredJobQuery(query)}
      />
    </>
  );
}
