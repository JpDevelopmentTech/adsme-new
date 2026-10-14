import { Send } from "lucide-react";
import { PORTAL_COPY } from "@/constants/nomina-portal-copy.constants";
import { PortalStateCard } from "@/presentation/components/nomina/portal/portal-state-card";

/** El artista aún no tiene perfil asignado; ya se avisó a su manager. */
export function PortalNotEnabledState() {
  return (
    <PortalStateCard
      icon={<Send size={22} strokeWidth={1.5} aria-hidden />}
      title={PORTAL_COPY.notEnabledTitle}
      description={PORTAL_COPY.notEnabledDescription}
    />
  );
}
