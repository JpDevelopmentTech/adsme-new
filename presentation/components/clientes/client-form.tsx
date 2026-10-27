"use client";

import { useActionState } from "react";
import { CLIENTS_ROUTE } from "@/constants/routes.constants";
import { saveClientAction } from "@/presentation/actions/save-client-action";
import { ClientFormCard } from "@/presentation/components/clientes/client-form-card";
import { useDismiss } from "@/presentation/hooks/use-dismiss";
import type { ClientFormProps } from "@/types/client-form.types";

/**
 * Alta y edición de un cliente en una tarjeta de vidrio flotante: formulario a
 * la izquierda y vista previa en vivo a la derecha. Se usa igual como modal
 * sobre la lista que como página al entrar por URL.
 */
export function ClientForm({ isModal = false, ...card }: ClientFormProps) {
  const [state, formAction, isPending] = useActionState(saveClientAction, {
    message: null,
    fieldErrors: {},
  });
  const close = useDismiss(CLIENTS_ROUTE, isModal);

  return <ClientFormCard {...card} state={state} formAction={formAction} isPending={isPending} onClose={close} />;
}
