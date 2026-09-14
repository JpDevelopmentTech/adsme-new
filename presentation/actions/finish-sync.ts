import "server-only";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  CAMPAIGNS_ROUTE,
  CONNECTIONS_ROUTE,
  DASHBOARD_ROUTE,
} from "@/constants/routes.constants";
import type { SyncOutcome } from "@/domain/entities/sync-outcome";

/**
 * Cierra una sincronización: refresca lo que muestra datos importados y vuelve
 * a Conexiones con los motivos de lo que falló, si hubo algo.
 *
 * Se llama una sola vez y al final. `redirect` viaja como excepción en Next, así
 * que hacerlo por plataforma cortaría las que quedasen por sincronizar.
 */
export function finishSync(outcomes: SyncOutcome[]): never {
  revalidatePath(CONNECTIONS_ROUTE);
  revalidatePath(CAMPAIGNS_ROUTE);
  revalidatePath(DASHBOARD_ROUTE);

  const errors = outcomes.flatMap((outcome) =>
    outcome.ok ? [] : [outcome.message],
  );

  if (errors.length === 0) redirect(CONNECTIONS_ROUTE);

  redirect(`${CONNECTIONS_ROUTE}?error=${encodeURIComponent(errors.join(" · "))}`);
}
