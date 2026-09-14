import { RefreshCw } from "lucide-react";
import { CONNECTIONS_COPY } from "@/constants/connections.constants";
import { syncConnectionsAction } from "@/presentation/actions/sync-connections-action";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import type { SyncNowButtonProps } from "@/types/connections.types";

/** Dispara la importación de todas las cuentas conectadas. */
export function SyncNowButton({ isEnabled }: SyncNowButtonProps) {
  return (
    <form action={syncConnectionsAction}>
      <SecondaryButton
        type="submit"
        disabled={!isEnabled}
        title={isEnabled ? undefined : CONNECTIONS_COPY.pendingOauth}
        icon={<RefreshCw size={18} strokeWidth={2} aria-hidden />}
      >
        {CONNECTIONS_COPY.syncNow}
      </SecondaryButton>
    </form>
  );
}
