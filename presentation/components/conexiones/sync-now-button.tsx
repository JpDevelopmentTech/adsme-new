import { RefreshCw } from "lucide-react";
import { CONNECTIONS_COPY } from "@/constants/connections.constants";
import { syncConnectionsAction } from "@/presentation/actions/sync-connections-action";
import { FormScreenLoader } from "@/presentation/components/ui/form-screen-loader";
import type { SyncNowButtonProps } from "@/types/connections.types";

/**
 * Dispara la importación de todas las cuentas conectadas. La espera se muestra
 * a pantalla completa porque el sync rehace el reloj, las tres filas y la tabla
 * de importadas a la vez: no hay una sola zona que se pueda marcar como ocupada.
 */
export function SyncNowButton({ isEnabled }: SyncNowButtonProps) {
  return (
    <form action={syncConnectionsAction}>
      <FormScreenLoader
        title={CONNECTIONS_COPY.syncingTitle}
        hint={CONNECTIONS_COPY.syncingHint}
      />

      <button
        type="submit"
        disabled={!isEnabled}
        title={isEnabled ? undefined : CONNECTIONS_COPY.pendingOauth}
        className="flex cursor-pointer items-center gap-2 rounded-md bg-accent px-[17px] py-[11px] text-[12.5px] font-medium whitespace-nowrap text-g-50 shadow-float transition-all duration-150 hover:-translate-y-px hover:shadow-lift focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none disabled:translate-none disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
      >
        <RefreshCw size={15} strokeWidth={1.75} aria-hidden />
        {CONNECTIONS_COPY.syncNow}
      </button>
    </form>
  );
}
