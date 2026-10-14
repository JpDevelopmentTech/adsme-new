import { UserX } from "lucide-react";
import { PORTAL_COPY } from "@/constants/nomina-portal-copy.constants";
import { PortalStateCard } from "@/presentation/components/nomina/portal/portal-state-card";

/** Quien abre el portal no se pudo identificar. */
export function PortalUnidentifiedState() {
  return (
    <PortalStateCard
      icon={<UserX size={22} strokeWidth={1.5} aria-hidden />}
      title={PORTAL_COPY.unidentifiedTitle}
      description={PORTAL_COPY.unidentifiedDescription}
    />
  );
}
