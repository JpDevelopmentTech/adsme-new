import "server-only";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CONNECTIONS_COPY } from "@/constants/connections.constants";
import {
  CAMPAIGNS_ROUTE,
  CONNECTIONS_ROUTE,
  DASHBOARD_ROUTE,
  LOGIN_ROUTE,
} from "@/constants/routes.constants";
import type { ConnectionPlatform } from "@/domain/entities/connection";
import { createGetCurrentUser } from "@/domain/use-cases/get-current-user";
import { createSupabaseAuthRepository } from "@/infrastructure/repositories/supabase-auth-repository";
import { createSupabaseConnectionRepository } from "@/infrastructure/repositories/supabase-connection-repository";
import { createServerSupabaseClient } from "@/infrastructure/supabase/server-supabase-client";

/**
 * Desvincula una plataforma por completo: se van todas sus cuentas, no solo
 * una. Las campañas importadas caen con cada conexión por el `on delete
 * cascade` de la clave foránea, y con ellas su serie diaria y su reparto.
 *
 * Vuelve siempre a Conexiones; si la base rechaza el borrado, con el motivo en
 * `?error=` para que el usuario no crea que se desconectó.
 */
export async function disconnectPlatform(
  platform: ConnectionPlatform,
  platformName: string,
): Promise<never> {
  const supabase = await createServerSupabaseClient();
  const user = await createGetCurrentUser(createSupabaseAuthRepository(supabase))();

  if (!user) redirect(LOGIN_ROUTE);

  const isDeleted =
    await createSupabaseConnectionRepository(supabase).deleteByPlatform(platform);

  if (!isDeleted) {
    const message = CONNECTIONS_COPY.disconnectFailed(platformName);
    redirect(`${CONNECTIONS_ROUTE}?error=${encodeURIComponent(message)}`);
  }

  revalidatePath(CONNECTIONS_ROUTE);
  revalidatePath(CAMPAIGNS_ROUTE);
  revalidatePath(DASHBOARD_ROUTE);
  redirect(CONNECTIONS_ROUTE);
}
