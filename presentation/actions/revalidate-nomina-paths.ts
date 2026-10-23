import { revalidatePath } from "next/cache";
import { CLIENTS_ROUTE, NOMINA_ROUTE, clientDetailRoute } from "@/constants/routes.constants";

/** Refresca Nómina (con el menú lateral), la lista de clientes y la ficha del cliente. */
export function revalidateNominaPaths(clientId: string): void {
  revalidatePath(NOMINA_ROUTE, "layout");
  revalidatePath("/", "layout");
  revalidatePath(CLIENTS_ROUTE);
  revalidatePath(clientDetailRoute(clientId));
}
