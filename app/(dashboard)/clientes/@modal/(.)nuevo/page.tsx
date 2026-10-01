import { CLIENT_FORM_COPY } from "@/constants/client-form-copy.constants";
import { RouteModal } from "@/presentation/components/ui/route-modal";
import { NewClientScreen } from "../../_screens/new-client-screen";

/** Alta de cliente interceptada: se abre como modal sobre la lista. */
export default function NuevoClienteModal() {
  return (
    <RouteModal label={CLIENT_FORM_COPY.createTitle}>
      <NewClientScreen isModal />
    </RouteModal>
  );
}
