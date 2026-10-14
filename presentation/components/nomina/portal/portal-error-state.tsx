import { Bell, CircleAlert } from "lucide-react";
import { PORTAL_COPY } from "@/constants/nomina-portal-copy.constants";
import { PortalStateCard } from "@/presentation/components/nomina/portal/portal-state-card";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";

/** No se pudo enviar la solicitud de perfil: el artista puede avisar a su manager. */
export function PortalErrorState() {
  return (
    <PortalStateCard
      icon={<CircleAlert size={22} strokeWidth={1.5} aria-hidden />}
      title={PORTAL_COPY.notEnabledTitle}
      description={PORTAL_COPY.errorDescription}
      action={
        <PrimaryButton type="button">
          <Bell size={16} strokeWidth={1.75} aria-hidden />
          {PORTAL_COPY.notifyManager}
        </PrimaryButton>
      }
    />
  );
}
