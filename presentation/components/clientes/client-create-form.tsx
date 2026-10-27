"use client";

import { useActionState } from "react";
import { EMPTY_CLIENT_FORM_VALUES, NEW_CLIENT_PREVIEW_META } from "@/constants/client-form.constants";
import { CLIENT_FORM_COPY } from "@/constants/client-form-copy.constants";
import { createClientInlineAction } from "@/presentation/actions/create-client-inline-action";
import { ClientFormCard } from "@/presentation/components/clientes/client-form-card";
import type { ClientCreateDialogProps, ClientFormState } from "@/types/client-form.types";

const INITIAL_STATE: ClientFormState = { message: null, fieldErrors: {} };

/**
 * El formulario de alta dentro del diálogo: el mismo de Clientes, con el nombre
 * ya escrito en el buscador. Al guardar entrega el cliente creado en lugar de
 * navegar, para que la pantalla que lo abrió siga donde estaba.
 */
export function ClientCreateForm({ initialName, onClose, onCreated }: Omit<ClientCreateDialogProps, "isOpen">) {
  const [state, formAction, isPending] = useActionState(async (previous: ClientFormState, formData: FormData) => {
    const next = await createClientInlineAction(previous, formData);
    if (next.created) onCreated(next.created);
    return next;
  }, INITIAL_STATE);

  return (
    <ClientFormCard
      title={CLIENT_FORM_COPY.createTitle}
      initialValues={{ ...EMPTY_CLIENT_FORM_VALUES, name: initialName }}
      previewMeta={NEW_CLIENT_PREVIEW_META}
      state={state}
      formAction={formAction}
      isPending={isPending}
      onClose={onClose}
    />
  );
}
