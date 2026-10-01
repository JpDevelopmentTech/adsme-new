import { DEFAULT_CLIENT_GRADIENT, EMPTY_CLIENT_FORM_VALUES } from "@/constants/client-form.constants";
import { CLIENT_FORM_COPY } from "@/constants/client-form-copy.constants";
import { ClientForm } from "@/presentation/components/clientes/client-form";

/** Formulario de alta de cliente, compartido por la página y por el modal interceptado. */
export function NewClientScreen({ isModal }: { isModal: boolean }) {
  return (
    <ClientForm
      isModal={isModal}
      title={CLIENT_FORM_COPY.createTitle}
      initialValues={EMPTY_CLIENT_FORM_VALUES}
      previewMeta={{
        gradient: DEFAULT_CLIENT_GRADIENT,
        jobsCount: 0,
        activeJobsCount: 0,
        status: { label: CLIENT_FORM_COPY.previewNewStatus, tone: "brand" },
      }}
    />
  );
}
