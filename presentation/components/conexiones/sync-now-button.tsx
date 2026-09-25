import { RefreshCw } from "lucide-react";
import { CONNECTIONS_COPY } from "@/constants/connections.constants";
import { syncConnectionsAction } from "@/presentation/actions/sync-connections-action";
import { FormScreenLoader } from "@/presentation/components/ui/form-screen-loader";

/**
 * Dispara la importación de todas las cuentas conectadas. Siempre está activo:
 * Google Ads no se conecta desde aquí —sus datos los empuja un script— y el
 * sync lo incluye aunque no haya ni Meta ni TikTok conectados. La espera se muestra
 * a pantalla completa porque el sync rehace el reloj, las tres filas y la tabla
 * de importadas a la vez: no hay una sola zona que se pueda marcar como ocupada.
 */
export function SyncNowButton() {
  return (
    <form action={syncConnectionsAction}>
      <FormScreenLoader
        title={CONNECTIONS_COPY.syncingTitle}
        hint={CONNECTIONS_COPY.syncingHint}
      />

      <button
        type="submit"
        className="flex cursor-pointer items-center gap-2 rounded-md bg-accent px-[17px] py-[11px] text-[12.5px] font-medium whitespace-nowrap text-g-50 shadow-float transition-all duration-150 hover:-translate-y-px hover:shadow-lift focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none"
      >
        <RefreshCw size={15} strokeWidth={1.75} aria-hidden />
        {CONNECTIONS_COPY.syncNow}
      </button>
    </form>
  );
}
