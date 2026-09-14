import type { Client, ClientKind } from "@/domain/entities/client";
import type {
  ClientJobSummary,
  ClientRecord,
} from "@/domain/entities/client-listing";
import type { JobPlatform, JobStatus } from "@/domain/entities/job";
import { countActiveJobs } from "@/utils/count-active-jobs";
import { getInitials } from "@/utils/get-initials";
import { resolveClientGradient } from "@/utils/client-gradient";
import { resolveClientStatus } from "@/utils/resolve-client-status";

/** Trabajo embebido en la consulta del cliente, con lo justo para agregarlo. */
export interface ClientJobRow {
  status: string;
  platforms: string[];
  investment: number;
  starts_on: string;
  ends_on: string;
  updated_at: string;
}

/** Fila de `public.clients` tal como la devuelve Supabase. */
export interface ClientRow {
  id: string;
  name: string;
  handle: string;
  kind: string;
  genre: string;
  email: string;
  phone: string;
  city: string;
  country: string;
  notes: string;
  avatar_url: string | null;
  created_at: string;
  jobs: ClientJobRow[] | null;
}

const JOB_SUMMARY_COLUMNS =
  "jobs ( status, platforms, investment, starts_on, ends_on, updated_at )";

export const CLIENT_COLUMNS = `id, name, handle, kind, genre, email, phone, city, country, notes, avatar_url, created_at, ${JOB_SUMMARY_COLUMNS}`;

function toJobSummary(row: ClientJobRow): ClientJobSummary {
  return {
    status: row.status as JobStatus,
    platforms: row.platforms as JobPlatform[],
    investment: row.investment,
    startsOn: row.starts_on,
    endsOn: row.ends_on,
    updatedAt: row.updated_at,
  };
}

/** Momento del trabajo tocado más recientemente, o `null` si no hay ninguno. */
function lastActivityOf(jobs: ClientJobSummary[]): string | null {
  return jobs.map((job) => job.updatedAt).sort().at(-1) ?? null;
}

/**
 * Traduce una fila a la entidad de dominio.
 * Las iniciales y el gradiente se derivan: no se guardan en la tabla. Los
 * contadores y el estado salen de los trabajos embebidos en la misma consulta.
 */
function toClientOf(row: ClientRow, jobs: ClientJobSummary[]): Client {
  return {
    id: row.id,
    name: row.name,
    handle: row.handle,
    kind: row.kind as ClientKind,
    initials: getInitials(row.name, row.handle.replace(/^@/, "")),
    gradient: resolveClientGradient(row.id),
    jobsCount: jobs.length,
    activeJobsCount: countActiveJobs(jobs),
    genre: row.genre,
    status: resolveClientStatus(jobs),
    email: row.email,
    phone: row.phone,
    city: row.city,
    country: row.country,
    notes: row.notes,
    avatarUrl: row.avatar_url,
    lastActivityAt: lastActivityOf(jobs),
    createdAt: row.created_at,
  };
}

/** El cliente sin el resumen de trabajos, para las pantallas que no lo agregan. */
export function toClient(row: ClientRow): Client {
  return toClientOf(row, (row.jobs ?? []).map(toJobSummary));
}

/** El cliente junto al resumen de sus trabajos, que es lo que agrega `B2`. */
export function toClientRecord(row: ClientRow): ClientRecord {
  const jobs = (row.jobs ?? []).map(toJobSummary);

  return { ...toClientOf(row, jobs), jobs };
}
