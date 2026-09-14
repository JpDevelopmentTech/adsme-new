"use client";

import { useActionState, useRef, useState } from "react";
import { CLIENT_FORM_COPY } from "@/constants/client-form-copy.constants";
import { CLIENT_FORM_FIELDS } from "@/constants/client-messages.constants";
import { saveClientAction } from "@/presentation/actions/save-client-action";
import { ClientAvatarUploader } from "@/presentation/components/clientes/client-avatar-uploader";
import { ClientFormFields } from "@/presentation/components/clientes/client-form-fields";
import { ClientFormHeader } from "@/presentation/components/clientes/client-form-header";
import { ClientFormPreview } from "@/presentation/components/clientes/client-form-preview";
import { FormAlert } from "@/presentation/components/ui/form-alert";
import { useAvatarPreview } from "@/presentation/hooks/use-avatar-preview";
import type {
  ClientFormProps,
  ClientFormValues,
} from "@/types/client-form.types";

export function ClientForm({
  title,
  initialValues,
  previewMeta,
  initialAvatarUrl = null,
  clientId,
}: ClientFormProps) {
  const [state, formAction, isPending] = useActionState(saveClientAction, {
    message: null,
    fieldErrors: {},
  });
  // Estado local solo para la vista previa; la validación vive en el servidor.
  const [values, setValues] = useState<ClientFormValues>(initialValues);
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const avatar = useAvatarPreview(initialAvatarUrl, avatarInputRef);

  const handleChange = <TField extends keyof ClientFormValues>(
    field: TField,
    value: ClientFormValues[TField],
  ) => {
    setValues((previous) => ({ ...previous, [field]: value }));
  };

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
      {clientId ? (
        <input type="hidden" name={CLIENT_FORM_FIELDS.clientId} value={clientId} />
      ) : null}
      <input
        type="hidden"
        name={CLIENT_FORM_FIELDS.previousAvatarUrl}
        value={initialAvatarUrl ?? ""}
      />
      <input
        type="hidden"
        name={CLIENT_FORM_FIELDS.removeAvatar}
        value={avatar.isRemoved ? "1" : "0"}
      />

      <ClientFormHeader title={title} isPending={isPending} />

      {avatar.error ? <FormAlert message={avatar.error} /> : null}

      {state.message ? <FormAlert message={state.message} /> : null}

      <div className="flex flex-col gap-[22px] xl:flex-row">
        <div className="flex flex-1 flex-col gap-[22px] rounded-card border border-border bg-card p-7">
          <h2 className="font-display text-[15px] font-semibold text-text-primary">
            {CLIENT_FORM_COPY.sectionArtist}
          </h2>

          <ClientAvatarUploader
            previewUrl={avatar.previewUrl}
            error={avatar.error}
            onSelect={avatar.selectFile}
            inputRef={avatarInputRef}
          />

          <ClientFormFields
            values={values}
            errors={state.fieldErrors}
            onChange={handleChange}
          />
        </div>

        <ClientFormPreview
          values={values}
          meta={previewMeta}
          avatarUrl={avatar.previewUrl}
        />
      </div>
    </form>
  );
}
