import "server-only";

import type { SupabaseClient } from "@supabase/supabase-js";

/**
 * Usuarios con al menos una cuenta conectada: los que el cron debe sincronizar.
 * Necesita el cliente con la clave de servicio, porque mira por encima de RLS
 * para ver a todos; solo devuelve identificadores, nunca datos de las cuentas.
 */
export async function listConnectionOwners(
  admin: SupabaseClient,
): Promise<string[]> {
  const { data, error } = await admin
    .from("connections")
    .select("owner_id")
    .returns<{ owner_id: string }[]>();

  if (error) throw new Error(error.message);

  return [...new Set(data.map((row) => row.owner_id))];
}
