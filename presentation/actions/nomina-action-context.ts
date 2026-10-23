import { redirect } from "next/navigation";
import { LOGIN_ROUTE } from "@/constants/routes.constants";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseNominaEnrollmentRepository } from "@/infrastructure/repositories/supabase-nomina-enrollment-repository";
import { createSupabaseNominaLedgerRepository } from "@/infrastructure/repositories/supabase-nomina-ledger-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";

/**
 * Repositorio de inscripciones para una acción de servidor, con la sesión ya
 * verificada: sin usuario, manda al login. La pertenencia la garantiza RLS.
 */
export async function loadNominaEnrollmentRepository() {
  return createSupabaseNominaEnrollmentRepository(await loadSignedInClient());
}

/**
 * Repositorio de ingresos y gastos para una acción de servidor, con la sesión
 * ya verificada. La pertenencia la garantizan RLS y la FK con la inscripción.
 */
export async function loadNominaLedgerRepository() {
  return createSupabaseNominaLedgerRepository(await loadSignedInClient());
}

/** Cliente de Supabase con sesión; sin usuario, manda al login. */
async function loadSignedInClient() {
  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();
  if (!user) redirect(LOGIN_ROUTE);
  return supabase;
}
