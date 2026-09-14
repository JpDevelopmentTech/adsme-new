import type { SupabaseClient } from "@supabase/supabase-js";
import type { ClientResult } from "@/domain/entities/client-error";
import type { Job } from "@/domain/entities/job";
import type { JobDraft } from "@/domain/entities/job-draft";
import type { JobListing } from "@/domain/entities/job-listing";
import type { JobListQuery, JobSort } from "@/domain/entities/job-query";
import type { JobRepository } from "@/domain/interfaces/job-repository";
import {
  JOB_COLUMNS,
  JOB_COLUMNS_WITH_CLIENT,
  toJob,
  toJobListing,
  withReportUrl,
  type JobRow,
  type JobRowWithClient,
} from "@/infrastructure/repositories/job-row";
import { toClientError } from "@/infrastructure/repositories/supabase-client-error-mapper";
import { toJobRow } from "@/infrastructure/repositories/to-job-row";
import {
  signReportToken,
  toReportUrl,
} from "@/infrastructure/security/report-token";
import { isUuid } from "@/utils/is-uuid";

const JOBS_TABLE = "jobs";

/** Traduce el orden pedido por la UI a la columna real de la tabla. */
const JOB_ORDER: Record<JobSort, { column: string; ascending: boolean }> = {
  recent: { column: "created_at", ascending: false },
  "investment-desc": { column: "investment", ascending: false },
  "investment-asc": { column: "investment", ascending: true },
  "period-desc": { column: "starts_on", ascending: false },
  "period-asc": { column: "starts_on", ascending: true },
};

/** Implementación del port de trabajos sobre Supabase; el aislamiento lo da RLS. */
export function createSupabaseJobRepository(
  supabase: SupabaseClient,
): JobRepository {
  return {
    async listJobs(query: JobListQuery): Promise<JobListing[]> {
      let request = supabase.from(JOBS_TABLE).select(JOB_COLUMNS_WITH_CLIENT);

      if (query.status !== "all") request = request.eq("status", query.status);
      if (query.platform !== "all") {
        request = request.contains("platforms", [query.platform]);
      }
      if (query.client !== "all") request = request.eq("client_id", query.client);

      const order = JOB_ORDER[query.sort];
      const { data, error } = await request
        .order(order.column, { ascending: order.ascending })
        .returns<JobRowWithClient[]>();

      if (error) throw error;

      const jobs = data.map((row) => ({
        ...withReportUrl(row, toJobListing(row)),
        artistName: row.clients?.name ?? "",
        clientHandle: row.clients?.handle ?? "",
      }));
      const term = query.search.toLowerCase();

      // La búsqueda cruza el título del trabajo y el nombre del artista, que vive
      // en la tabla de clientes; PostgREST no filtra por columnas embebidas.
      return term
        ? jobs.filter(
            (job) =>
              job.title.toLowerCase().includes(term) ||
              job.artistName.toLowerCase().includes(term),
          )
        : jobs;
    },

    async listClientJobs(clientId: string): Promise<Job[]> {
      if (!isUuid(clientId)) return [];

      const { data, error } = await supabase
        .from(JOBS_TABLE)
        .select(JOB_COLUMNS)
        .eq("client_id", clientId)
        .order("created_at", { ascending: false })
        .returns<JobRow[]>();

      if (error) throw error;

      return data.map((row) => withReportUrl(row, toJob(row)));
    },

    async getJob(jobId: string): Promise<Job | null> {
      if (!isUuid(jobId)) return null;

      const { data, error } = await supabase
        .from(JOBS_TABLE)
        .select(JOB_COLUMNS)
        .eq("id", jobId)
        .maybeSingle<JobRow>();

      if (error) throw error;

      return data ? withReportUrl(data, toJob(data)) : null;
    },

    async createJob(draft: JobDraft): Promise<ClientResult<Job>> {
      const { data, error } = await supabase
        .from(JOBS_TABLE)
        .insert(toJobRow(draft))
        .select(JOB_COLUMNS)
        .single<JobRow>();

      if (error || !data) {
        return { success: false, error: toClientError(error) };
      }

      return { success: true, value: await issueLink(supabase, data) };
    },

    async updateJob(jobId: string, draft: JobDraft): Promise<ClientResult<Job>> {
      const { data, error } = await supabase
        .from(JOBS_TABLE)
        .update(toJobRow(draft))
        .eq("id", jobId)
        .select(JOB_COLUMNS)
        .maybeSingle<JobRow>();

      if (error) return { success: false, error: toClientError(error) };
      if (!data) return { success: false, error: { code: "not_found" } };

      return { success: true, value: withReportUrl(data, toJob(data)) };
    },

    async regenerateReportLink(jobId: string): Promise<ClientResult<Job>> {
      const { data, error } = await supabase
        .rpc("bump_report_token_version", { job_id: jobId })
        .select(JOB_COLUMNS)
        .maybeSingle<JobRow>();

      if (error) return { success: false, error: toClientError(error) };
      if (!data) return { success: false, error: { code: "not_found" } };

      return { success: true, value: await issueLink(supabase, data) };
    },

    async deleteJob(jobId: string): Promise<ClientResult<null>> {
      const { error } = await supabase.from(JOBS_TABLE).delete().eq("id", jobId);

      if (error) return { success: false, error: toClientError(error) };

      return { success: true, value: null };
    },
  };
}

/**
 * Firma el token del trabajo y lo publica tras un código corto nuevo,
 * reemplazando el enlace anterior si lo había.
 */
async function issueLink(supabase: SupabaseClient, row: JobRow): Promise<Job> {
  const token = await signReportToken({
    jobId: row.id,
    version: row.report_token_version,
  });

  const { data: code } = await supabase.rpc("issue_report_link", {
    target_job_id: row.id,
    report_token: token,
  });

  return {
    ...toJob(row),
    reportUrl: typeof code === "string" ? toReportUrl(code) : null,
  };
}
