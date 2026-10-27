"use client";

import { useRef, useState } from "react";
import { CLIENT_FORM_COPY } from "@/constants/client-form-copy.constants";
import { CLIENT_FORM_FIELDS } from "@/constants/client-messages.constants";
import { ClientAvatarUploader } from "@/presentation/components/clientes/client-avatar-uploader";
import { ClientFormFields } from "@/presentation/components/clientes/client-form-fields";
import { ClientFormFooter } from "@/presentation/components/clientes/client-form-footer";
import { ClientFormHeader } from "@/presentation/components/clientes/client-form-header";
import { ClientFormPreview } from "@/presentation/components/clientes/client-form-preview";
import { FormAlert } from "@/presentation/components/ui/form-alert";
import { useAvatarPreview } from "@/presentation/hooks/use-avatar-preview";
import type { ClientFormCardProps, ClientFormValues } from "@/types/client-form.types";

/**
 * Tarjeta de vidrio con el formulario de cliente a la izquierda y la vista
 * previa en vivo a la derecha. No sabe a dónde lleva guardar: recibe la acción,
 * su estado y qué hacer al cerrar, para servir igual en Clientes que en el
 * alta rápida del asistente de trabajos.
 */
export function ClientFormCard({
  title,
  initialValues,
  previewMeta,
  initialAvatarUrl = null,
  clientId,
  state,
  formAction,
  isPending,
  onClose,
}: ClientFormCardProps) {
  // Estado local solo para la vista previa; la validación vive en el servidor.
  const [values, setValues] = useState<ClientFormValues>(initialValues);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const avatar = useAvatarPreview(initialAvatarUrl, avatarInputRef);

  const handleChange = <TField extends keyof ClientFormValues>(field: TField, value: ClientFormValues[TField]) => {
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

      <ClientFormHeader title={title} onClose={onClose} />

      <div className="flex flex-col gap-7 overflow-y-auto px-6 py-6 sm:px-8 lg:flex-row">
        <div className="flex min-w-0 flex-1 flex-col gap-[18px]">
          {avatar.error ? <FormAlert message={avatar.error} /> : null}
          {state.message ? <FormAlert message={state.message} /> : null}

          <p className="text-[11px] font-medium tracking-[1.4px] text-text-muted uppercase">{CLIENT_FORM_COPY.sectionClient}</p>

          <ClientAvatarUploader previewUrl={avatar.previewUrl} error={avatar.error} onSelect={avatar.selectFile} inputRef={avatarInputRef} />

          <ClientFormFields values={values} errors={state.fieldErrors} onChange={handleChange} />
        </div>

        <ClientFormPreview values={values} meta={previewMeta} avatarUrl={avatar.previewUrl} />
      </div>

      <ClientFormFooter isPending={isPending} onClose={onClose} />
    </form>
  );
}
