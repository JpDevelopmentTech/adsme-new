"use client";

import { useActionState, useRef, useState } from "react";
import { CLIENT_FORM_COPY } from "@/constants/client-form-copy.constants";
import { CLIENT_FORM_FIELDS } from "@/constants/client-messages.constants";
import { CLIENTS_ROUTE } from "@/constants/routes.constants";
import { saveClientAction } from "@/presentation/actions/save-client-action";
import { ClientAvatarUploader } from "@/presentation/components/clientes/client-avatar-uploader";
import { ClientFormFields } from "@/presentation/components/clientes/client-form-fields";
import { ClientFormFooter } from "@/presentation/components/clientes/client-form-footer";
import { ClientFormHeader } from "@/presentation/components/clientes/client-form-header";
import { ClientFormPreview } from "@/presentation/components/clientes/client-form-preview";
import { FormAlert } from "@/presentation/components/ui/form-alert";
import { useAvatarPreview } from "@/presentation/hooks/use-avatar-preview";
import { useDismiss } from "@/presentation/hooks/use-dismiss";
import type { ClientFormProps, ClientFormValues } from "@/types/client-form.types";

/**
 * Alta y edición de un cliente en una tarjeta de vidrio flotante: formulario a
 * la izquierda y vista previa en vivo a la derecha. Se usa igual como modal
 * sobre la lista que como página al entrar por URL.
 */
export function ClientForm({
  title,
  initialValues,
  previewMeta,
  initialAvatarUrl = null,
  clientId,
  isModal = false,
}: ClientFormProps) {
  const [state, formAction, isPending] = useActionState(saveClientAction, {
    message: null,
    fieldErrors: {},
  });
  // Estado local solo para la vista previa; la validación vive en el servidor.
  const [values, setValues] = useState<ClientFormValues>(initialValues);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const avatar = useAvatarPreview(initialAvatarUrl, avatarInputRef);
  const close = useDismiss(CLIENTS_ROUTE, isModal);

  const handleChange = <TField extends keyof ClientFormValues>(
    field: TField,
    value: ClientFormValues[TField],
  ) => {
    setValues((previous) => ({ ...previous, [field]: value }));
  };

  return (
    <form
      action={formAction}
      noValidate
      className="glass-float flex max-h-[calc(100dvh-2rem)] w-full max-w-[940px] flex-col overflow-hidden rounded-[30px]"
    >
      {clientId ? <input type="hidden" name={CLIENT_FORM_FIELDS.clientId} value={clientId} /> : null}
      <input type="hidden" name={CLIENT_FORM_FIELDS.previousAvatarUrl} value={initialAvatarUrl ?? ""} />
      <input type="hidden" name={CLIENT_FORM_FIELDS.removeAvatar} value={avatar.isRemoved ? "1" : "0"} />

      <ClientFormHeader title={title} onClose={close} />

      <div className="flex flex-col gap-7 overflow-y-auto px-6 py-6 sm:px-8 lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-[18px]">
          {avatar.error ? <FormAlert message={avatar.error} /> : null}
          {state.message ? <FormAlert message={state.message} /> : null}

          <p className="text-[11px] font-medium tracking-[1.4px] text-text-muted uppercase">
            {CLIENT_FORM_COPY.sectionArtist}
          </p>

          <ClientAvatarUploader
            previewUrl={avatar.previewUrl}
            error={avatar.error}
            onSelect={avatar.selectFile}
            inputRef={avatarInputRef}
          />

          <ClientFormFields values={values} errors={state.fieldErrors} onChange={handleChange} />
        </div>

        <ClientFormPreview values={values} meta={previewMeta} avatarUrl={avatar.previewUrl} />
      </div>

      <ClientFormFooter isPending={isPending} onClose={close} />
    </form>
  );
}
