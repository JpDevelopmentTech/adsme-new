"use client";

import { useActionState, useRef, useState } from "react";
import {
  JOB_FORM_FIELDS,
  JOB_STEP_COPY,
  JOB_WIZARD_COPY,
} from "@/constants/job-wizard.constants";
import { saveJobAction } from "@/presentation/actions/save-job-action";
import { JobBasicsFields } from "@/presentation/components/trabajos/wizard/job-basics-fields";
import { JobWizardFooter } from "@/presentation/components/trabajos/wizard/job-wizard-footer";
import { JobWizardLayout } from "@/presentation/components/trabajos/wizard/job-wizard-layout";
import { JobWizardPanel } from "@/presentation/components/trabajos/wizard/job-wizard-panel";
import { FormAlert } from "@/presentation/components/ui/form-alert";
import { useAvatarPreview } from "@/presentation/hooks/use-avatar-preview";
import type {
  JobBasicsFormProps,
  JobBasicsValues,
  JobWizardIntent,
} from "@/types/job-wizard.types";
import { formatInvestmentSummary } from "@/utils/format-investment-summary";
import { formatPeriodSummary } from "@/utils/format-period-summary";
import { parseThousands } from "@/utils/parse-thousands";

/** Paso 1 del asistente `B6`: datos básicos del trabajo y su portada. */
export function JobBasicsForm({
  clientOptions,
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

  // La ficha lateral se alimenta del estado local: se completa mientras escribes.
  const summary = {
    title: values.title.trim() || null,
    clientName:
      clientOptions.find((option) => option.value === values.clientId)?.label ??
      null,
    format: values.format,
    coverUrl: cover.previewUrl,
    period: formatPeriodSummary(values.startsOn, values.endsOn),
    investment: formatInvestmentSummary(
      parseThousands(values.investment),
      values.startsOn,
      values.endsOn,
    ),
    platforms: null,
    report: null,
  };

  return (
    <form action={formAction} noValidate className="flex flex-col gap-4">
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

      {clientOptions.length === 0 ? (
        <FormAlert tone="warning" message={JOB_WIZARD_COPY.noClients} />
      ) : null}

      {cover.error ? <FormAlert message={cover.error} /> : null}

      {state.message ? <FormAlert message={state.message} /> : null}

      <JobWizardLayout currentStep={1} summary={summary}>
        <JobWizardPanel
          title={JOB_STEP_COPY.one.title}
          subtitle={JOB_STEP_COPY.one.subtitle}
          footer={<JobWizardFooter isPending={isPending} onIntent={setIntent} />}
        >
          <JobBasicsFields
            values={values}
            errors={state.fieldErrors}
            clientOptions={clientOptions}
            cover={{
              previewUrl: cover.previewUrl,
              error: cover.error,
              onSelect: cover.selectFile,
              inputRef: coverInputRef,
            }}
            onChange={handleChange}
          />
        </JobWizardPanel>
      </JobWizardLayout>
    </form>
  );
}
