import type { SupabaseClient } from "@supabase/supabase-js";
import type { NominaEligibleClient } from "@/domain/entities/nomina-eligible-client";
import type { NominaEnrollmentRepository } from "@/domain/interfaces/nomina-enrollment-repository";
import { PAYROLL_COLUMNS, toEnrollment, type PayrollRow } from "@/infrastructure/repositories/nomina-payroll-row";
import { toNominaError } from "@/infrastructure/repositories/supabase-nomina-error-mapper";
import { toSplitColumns } from "@/infrastructure/repositories/to-payroll-row";
import { isUuid } from "@/utils/is-uuid";

const PAYROLL_TABLE = "client_payroll";

interface EligibleRow { id: string; name: string; handle: string; kind: string; avatar_url: string | null }

/**
 * Inscripciones en Nómina sobre Supabase. El aislamiento entre usuarios lo
 * garantizan las políticas RLS de `client_payroll` y `clients`.
 */
export function createSupabaseNominaEnrollmentRepository(supabase: SupabaseClient): NominaEnrollmentRepository {
  const done = (error: Parameters<typeof toNominaError>[0]) =>
    error ? { success: false as const, error: toNominaError(error) } : { success: true as const, value: null };

  return {
    async listEnrollments() {
      const { data, error } = await supabase.from(PAYROLL_TABLE).select(PAYROLL_COLUMNS).order("starts_on").returns<PayrollRow[]>();
      if (error) throw error;
      return data.map(toEnrollment);
    },
    async getEnrollment(clientId) {
      if (!isUuid(clientId)) return null;
      const { data, error } = await supabase.from(PAYROLL_TABLE).select(PAYROLL_COLUMNS).eq("client_id", clientId).maybeSingle<PayrollRow>();
      if (error) throw error;
      return data ? toEnrollment(data) : null;
    },
    async listEligibleClients(): Promise<NominaEligibleClient[]> {
      const { data, error } = await supabase
        .from("clients")
        .select("id, name, handle, kind, avatar_url, client_payroll!left(client_id)")
        .is("client_payroll", null)
        .order("name")
        .returns<EligibleRow[]>();
      if (error) throw error;
      return data.map((row) => ({ id: row.id, name: row.name, handle: row.handle, kind: row.kind, avatarUrl: row.avatar_url }));
    },
    async enroll(config) {
      const { error } = await supabase.from(PAYROLL_TABLE).insert({
        client_id: config.clientId, nomina: config.nomina, min_shows: config.minShows, starts_on: config.startsOn, ...toSplitColumns(config.split),
      });
      return error ? { success: false, error: toNominaError(error) } : { success: true, value: config };
    },
    async updateConfig(clientId, minShows, split) {
      const { data, error } = await supabase.from(PAYROLL_TABLE).update({ min_shows: minShows, ...toSplitColumns(split) }).eq("client_id", clientId).select("client_id");
      if (!error && data.length === 0) return { success: false, error: { code: "not_enrolled" } };
      return done(error);
    },
    async updateSocials(clientId, socials) {
      const value = Object.fromEntries(socials.filter((link) => link.url).map((link) => [link.network, link.url]));
      const { data, error } = await supabase.from("clients").update({ socials: value }).eq("id", clientId).select("id");
      if (!error && data.length === 0) return { success: false, error: { code: "client_not_found" } };
      return done(error);
    },
    async unenroll(clientId) {
      const { data, error } = await supabase.from(PAYROLL_TABLE).delete().eq("client_id", clientId).select("client_id");
      if (!error && data.length === 0) return { success: false, error: { code: "not_enrolled" } };
      return done(error);
    },
  };
}
