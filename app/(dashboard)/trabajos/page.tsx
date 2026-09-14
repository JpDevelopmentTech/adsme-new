import { Plus } from "lucide-react";
import type { Metadata } from "next";
import { JOBS_COPY } from "@/constants/jobs.constants";
import { DEFAULT_JOB_LIST_QUERY, isFilteredJobQuery } from "@/domain/entities/job-query";
import { createListJobs } from "@/domain/use-cases/list-jobs";
import { createSupabaseJobRepository } from "@/infrastructure/repositories/supabase-job-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";
import { PageHeader } from "@/presentation/components/dashboard/page-header";
import { JobsEmpty } from "@/presentation/components/trabajos/jobs-empty";
import { JobsTable } from "@/presentation/components/trabajos/jobs-table";
import { JobsToolbar } from "@/presentation/components/trabajos/jobs-toolbar";
import { NEW_JOB_ROUTE } from "@/constants/routes.constants";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";
import { buildJobClientOptions } from "@/utils/build-job-client-options";
import { toIsoDate } from "@/utils/month-range";
import { parseJobListQuery } from "@/utils/parse-job-list-query";
import { summarizeJobs } from "@/utils/summarize-jobs";

export const metadata: Metadata = { title: "Trabajos · adsme" };

/** Pantalla `B5 · Trabajos Lista`: todos los trabajos de todos los clientes. */
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
  const isFiltered = isFilteredJobQuery(query);
  const today = toIsoDate(new Date());

  return (
    <>
      <PageHeader
        title={JOBS_COPY.title}
        subtitle={summarizeJobs(jobs, allJobs, isFiltered)}
        actions={
          <PrimaryLink href={NEW_JOB_ROUTE}>
            <Plus size={18} strokeWidth={2} aria-hidden />
            {JOBS_COPY.newJob}
          </PrimaryLink>
        }
      />

      {allJobs.length > 0 ? (
        <JobsToolbar
          query={query}
          clientOptions={buildJobClientOptions(allJobs)}
        />
      ) : null}

      {jobs.length === 0 ? (
        <JobsEmpty isFiltered={isFiltered} />
      ) : (
        <JobsTable
          jobs={jobs}
          totalJobs={allJobs.length}
          today={today}
          sort={query.sort}
        />
      )}
    </>
  );
}
