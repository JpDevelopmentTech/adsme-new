"use client";

import { useActionState, useRef, useState } from "react";
import { JOB_FORM_FIELDS, JOB_WIZARD_COPY } from "@/constants/job-wizard.constants";
import { saveJobAction } from "@/presentation/actions/save-job-action";
import { JobBasicsFields } from "@/presentation/components/trabajos/wizard/job-basics-fields";
import { JobCoverUploader } from "@/presentation/components/trabajos/wizard/job-cover-uploader";
import { JobWizardFooter } from "@/presentation/components/trabajos/wizard/job-wizard-footer";
import { JobWizardHeader } from "@/presentation/components/trabajos/wizard/job-wizard-header";
import { JobWizardStepper } from "@/presentation/components/trabajos/wizard/job-wizard-stepper";
import { FormAlert } from "@/presentation/components/ui/form-alert";
import { useAvatarPreview } from "@/presentation/hooks/use-avatar-preview";
import type {
  JobBasicsFormProps,
  JobBasicsValues,
  JobWizardIntent,
} from "@/types/job-wizard.types";

/** Paso 1 del asistente `B6`: datos básicos del trabajo y su portada. */
export function JobBasicsForm({
  clientOptions,
  title,
  initialValues,
  jobId,
  initialCoverUrl = null,
}: JobBasicsFormProps) {
  const [state, formAction, isPending] = useActionState(saveJobAction, {
    message: null,
    fieldErrors: {},
  });
  // Estado local solo para pintar los campos; la validación vive en el servidor.
  const [values, setValues] = useState<JobBasicsValues>(initialValues);
  const coverInputRef = useRef<HTMLInputElement>(null);
  // El `name`/`value` del botón que envía no llega al FormData de la acción,
  // así que la intención se escribe en el DOM antes de que el envío la lea.
  const intentRef = useRef<HTMLInputElement>(null);
  const cover = useAvatarPreview(initialCoverUrl, coverInputRef);

  /** Escribe la intención directamente en el DOM: es síncrono y sin carreras. */
  const setIntent = (intent: JobWizardIntent) => {
    if (intentRef.current) intentRef.current.value = intent;
  };

  const handleChange = <TField extends keyof JobBasicsValues>(
    field: TField,
    value: JobBasicsValues[TField],
  ) => {
    setValues((previous) => ({ ...previous, [field]: value }));
  };

  return (
    <form action={formAction} noValidate className="flex flex-col gap-6">
      {jobId ? (
        <input type="hidden" name={JOB_FORM_FIELDS.jobId} value={jobId} />
      ) : null}
      <input
        type="hidden"
        name={JOB_FORM_FIELDS.previousCoverUrl}
        value={initialCoverUrl ?? ""}
      />
      <input
        type="hidden"
        name={JOB_FORM_FIELDS.removeCover}
        value={cover.isRemoved ? "1" : "0"}
      />
      <input ref={intentRef} type="hidden" name="intent" defaultValue="draft" />

      <JobWizardHeader
        title={title}
        isPending={isPending}
        onIntent={setIntent}
      />
      <JobWizardStepper currentStep={1} />

      {clientOptions.length === 0 ? (
        <FormAlert tone="warning" message={JOB_WIZARD_COPY.noClients} />
      ) : null}

      {cover.error ? <FormAlert message={cover.error} /> : null}

      {state.message ? <FormAlert message={state.message} /> : null}

      <div className="flex flex-col gap-7 rounded-card border border-border bg-card p-7 lg:flex-row">
        <JobCoverUploader
          previewUrl={cover.previewUrl}
          error={cover.error}
          onSelect={cover.selectFile}
          inputRef={coverInputRef}
        />

        <JobBasicsFields
          values={values}
          errors={state.fieldErrors}
          clientOptions={clientOptions}
          onChange={handleChange}
        />
      </div>

      <JobWizardFooter isPending={isPending} onIntent={setIntent} />
    </form>
  );
}
