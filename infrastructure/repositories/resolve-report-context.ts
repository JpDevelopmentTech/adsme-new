import { cookies } from "next/headers";
import type { SupabaseClient } from "@supabase/supabase-js";
import { reportSessionCookie } from "@/constants/report-link.constants";
import type { ReportAccessStatus } from "@/domain/entities/report-access";
import { resolveReportLink } from "@/infrastructure/repositories/resolve-report-link";
import { verifyReportToken } from "@/infrastructure/security/report-token";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";

export interface ReportContext {
  supabase: SupabaseClient;
  jobId: string;
  /** Versión del token, que las funciones públicas exigen para servir datos. */
  version: number;
}

export interface ReportGate {
  /** Presente solo cuando el enlace se pudo abrir. */
  context: ReportContext | null;
  status: ReportAccessStatus;
}

/**
 * Cadena completa de apertura de un enlace: código corto → clave o sesión →
 * JWT → reclamaciones. Devuelve el motivo del rechazo para que la pantalla
 * sepa si pedir la clave o avisar de que el enlace caducó.
 *
 * Quien ya acertó la clave lleva el token en una cookie propia del código, así
 * que no vuelve a escribirla en cada visita. La caducidad se comprueba siempre,
 * también con esa cookie: un enlace vencido deja de abrirse para todos.
 */
export async function resolveReportContext(
  code: string,
  clientIp: string,
  password: string | null = null,
): Promise<ReportGate> {
  const supabase = await createServerSupabaseClient();
  const access = await resolveReportLink(supabase, code, clientIp, password);

  let token = access.token;

  if (access.status === "passwordRequired" && !password) {
    token = await readSessionToken(code);
  }

  if (!token) return { context: null, status: access.status };

  const claims = await verifyReportToken(token);
  if (!claims) return { context: null, status: "notFound" };

  return {
    context: { supabase, jobId: claims.jobId, version: claims.version },
    status: "ok",
  };
}

/** Token guardado tras acertar la clave; `null` si no hay sesión válida. */
async function readSessionToken(code: string): Promise<string | null> {
  const store = await cookies();

  return store.get(reportSessionCookie(code))?.value ?? null;
}
