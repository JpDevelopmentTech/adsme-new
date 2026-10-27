"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { CLIENTS_ROUTE } from "@/constants/routes.constants";
import { persistClientForm } from "@/presentation/actions/persist-client-form";
import type { ClientFormState } from "@/types/client-form.types";

/**
 * Server Action del formulario de clientes: valida, resuelve la foto y da de
 * alta o actualiza según venga o no un identificador. Redirige al listado al
 * terminar; los fallos esperables vuelven como estado para pintarlos en la UI.
 */
export async function saveClientAction(
  _prevState: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  const outcome = await persistClientForm(formData);
  if ("failure" in outcome) return outcome.failure;

  revalidatePath(CLIENTS_ROUTE);
  redirect(CLIENTS_ROUTE);
}
