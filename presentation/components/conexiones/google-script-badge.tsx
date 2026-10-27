import { FileCode2 } from "lucide-react";
import { CONNECTIONS_COPY } from "@/constants/connections.constants";

/**
 * Lugar de las acciones de Google Ads. Sus campañas entran por el script
 * programado de la cuenta, no por OAuth, así que no hay nada que conectar,
 * elegir ni renovar: se dice de dónde viene la información en vez de dejar un
 * botón bloqueado.
 */
export function GoogleScriptBadge() {
  return (
    <span
      title={CONNECTIONS_COPY.scriptFedHint}
      className="flex items-center gap-[7px] rounded-md border border-border px-3.5 py-2.5 text-[12.5px] text-text-secondary"
    >
      <FileCode2 size={14} strokeWidth={1.5} aria-hidden />
      {CONNECTIONS_COPY.scriptFed}
    </span>
  );
}
