import "server-only";

import { redirect } from "next/navigation";
import { CONNECTIONS_ROUTE } from "@/constants/routes.constants";

/** Vuelve a Conexiones con el motivo en la query string, si lo hubo. */
export function backToConnections(error?: string): never {
  redirect(
    error
      ? `${CONNECTIONS_ROUTE}?error=${encodeURIComponent(error)}`
      : CONNECTIONS_ROUTE,
  );
}
