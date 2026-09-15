import { CONNECTIONS_COPY } from "@/constants/connections.constants";
import type { ConnectionsPanelProps } from "@/types/connections.types";

/**
 * Panel de cuentas conectadas. Una fila por plataforma en lugar de tres
 * tarjetas sueltas: así campañas, importado y vigencia caen en el mismo eje y
 * se comparan de un vistazo.
 */
export function ConnectionsPanel({ children }: ConnectionsPanelProps) {
  return (
    <section className="glass-panel flex flex-col overflow-hidden rounded-card">
      <header className="flex flex-col gap-[3px] px-5 py-4">
        <h2 className="font-display text-[15px] font-normal tracking-[-0.2px] text-text-primary">
          {CONNECTIONS_COPY.panelTitle}
        </h2>
        <p className="text-[12px] text-text-secondary">
          {CONNECTIONS_COPY.panelSubtitle}
        </p>
      </header>

      <div className="h-px bg-border/60" />

      <ul className="flex flex-col">{children}</ul>
    </section>
  );
}
