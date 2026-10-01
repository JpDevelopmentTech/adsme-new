import { CLIENT_FORM_COPY } from "@/constants/client-form-copy.constants";
import { RouteModal } from "@/presentation/components/ui/route-modal";
import { EditClientScreen } from "../../../_screens/edit-client-screen";

/** Edición de cliente interceptada: se abre como modal sobre la lista o la ficha. */
export default async function EditarClienteModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <RouteModal label={CLIENT_FORM_COPY.editTitle}>
      <EditClientScreen clientId={id} isModal />
    </RouteModal>
  );
}
