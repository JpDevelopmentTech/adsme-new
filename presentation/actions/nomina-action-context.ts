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

/**
 * Lo que necesita la acción de la foto: el cliente de Supabase para Storage,
 * el usuario (su carpeta en el bucket) y el repositorio de inscripciones.
 */
export async function loadNominaPhotoContext() {
  const { supabase, userId } = await loadSignedInSession();
  return { supabase, userId, repository: createSupabaseNominaEnrollmentRepository(supabase) };
}

/** Cliente de Supabase con sesión; sin usuario, manda al login. */
async function loadSignedInClient() {
  return (await loadSignedInSession()).supabase;
}

/** Cliente de Supabase y usuario con sesión; sin usuario, manda al login. */
async function loadSignedInSession() {
  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();
  if (!user) redirect(LOGIN_ROUTE);
  return { supabase, userId: user.id };
}
