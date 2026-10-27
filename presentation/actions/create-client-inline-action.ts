"use server";

import { revalidatePath } from "next/cache";
import { CLIENTS_ROUTE } from "@/constants/routes.constants";
import { persistClientForm } from "@/presentation/actions/persist-client-form";
import type { ClientFormState } from "@/types/client-form.types";
import { toClientOptions } from "@/utils/to-client-options";

/**
 * Server Action del alta rápida de cliente desde otro formulario (el asistente
 * de trabajos). Valida y guarda igual que Clientes, pero no navega: devuelve el
 * cliente creado como opción de selector para que quien lo abrió lo elija.
 */
export async function createClientInlineAction(
  _prevState: ClientFormState,
  formData: FormData,
): Promise<ClientFormState> {
  const outcome = await persistClientForm(formData, true);
  if ("failure" in outcome) return outcome.failure;

  revalidatePath(CLIENTS_ROUTE);
  return { message: null, fieldErrors: {}, created: toClientOptions([outcome.client])[0] };
}
