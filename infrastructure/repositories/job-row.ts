import type { Job, JobFormat, JobPlatform, JobStatus } from "@/domain/entities/job";
import type { JobListing } from "@/domain/entities/job-listing";
import { toReportUrl } from "@/infrastructure/security/report-token";
import { resolveClientGradient } from "@/utils/client-gradient";

/** Fila de `public.jobs` tal como la devuelve Supabase. */
export interface JobRow {
  id: string;
  client_id: string;
  title: string;
  format: string;
  description: string;
  cover_url: string | null;
  platforms: string[];
  status: string;
  investment: number;
  starts_on: string;
  ends_on: string;
  report_token_version: number;
  created_at: string;
  updated_at: string;
  report_links: { code: string } | { code: string }[] | null;
}

/** Fila con los datos del cliente embebidos, para el listado global. */
export interface JobRowWithClient extends JobRow {
  clients: { name: string; handle: string } | null;
}

export const JOB_COLUMNS =
  "id, client_id, title, format, description, cover_url, platforms, status, investment, starts_on, ends_on, report_token_version, created_at, updated_at, report_links ( code )";

export const JOB_COLUMNS_WITH_CLIENT = `${JOB_COLUMNS}, clients ( name, handle )`;

/**
 * Traduce una fila a la entidad de dominio. El gradiente de la portada se
 * deriva del identificador y `reportUrl` queda pendiente del token del enlace.
 */
export function toJob(row: JobRow): Job {
  return {
    id: row.id,
    clientId: row.client_id,
    title: row.title,
    format: row.format as JobFormat,
    description: row.description,
    coverUrl: row.cover_url,
    cover: resolveClientGradient(row.id),
    platforms: row.platforms as JobPlatform[],
    status: row.status as JobStatus,
    investment: row.investment,
    startsOn: row.starts_on,
    endsOn: row.ends_on,
    reportUrl: null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function toJobListing(row: JobRowWithClient): JobListing {
  return {
    ...toJob(row),
    artistName: row.clients?.name ?? "",
    clientHandle: row.clients?.handle ?? "",
  };
}

/** Código corto del enlace vigente, o null si el trabajo aún no tiene uno. */
export function toReportCode(row: JobRow): string | null {
  const link = Array.isArray(row.report_links)
    ? row.report_links[0]
    : row.report_links;

  return link?.code ?? null;
}

/** Añade la URL pública corta a un trabajo ya mapeado. */
export function withReportUrl(row: JobRow, job: Job): Job {
  const code = toReportCode(row);

  return { ...job, reportUrl: code ? toReportUrl(code) : null };
}
