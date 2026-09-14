import type { SupabaseClient } from "@supabase/supabase-js";
import type {
  ReportAccess,
  ReportAccessStatus,
} from "@/domain/entities/report-access";

/** Estados tal como los nombra la función de base de datos. */
const STATUS_MAP: Record<string, ReportAccessStatus> = {
  ok: "ok",
  not_found: "notFound",
  expired: "expired",
  password_required: "passwordRequired",
  password_invalid: "passwordInvalid",
};

interface OpenLinkRow {
  status?: string;
  token?: string;
}

/**
 * Abre un enlace de reporte. La función de base de datos aplica el límite de
 * intentos por IP —imprescindible con códigos de 5 caracteres—, comprueba la
 * caducidad y compara la clave: el hash nunca sale de Postgres.
 *
 * Ante un fallo de infraestructura devuelve `notFound`, que es el estado que no
 * revela nada sobre el enlace.
 */
export async function resolveReportLink(
  supabase: SupabaseClient,
  code: string,
  clientIp: string,
  password: string | null,
): Promise<ReportAccess> {
  const { data, error } = await supabase.rpc("open_report_link", {
    link_code: code,
    client_ip: clientIp,
    link_password: password,
  });

  if (error || !data || typeof data !== "object") {
    return { status: "notFound", token: null };
  }

  const row = data as OpenLinkRow;
  const status = STATUS_MAP[row.status ?? ""] ?? "notFound";

  return {
    status,
    token: status === "ok" && typeof row.token === "string" ? row.token : null,
  };
}
