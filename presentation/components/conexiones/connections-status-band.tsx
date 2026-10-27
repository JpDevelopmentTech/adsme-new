import { CONNECTIONS_SUMMARY_COPY } from "@/constants/connections.constants";
import { SyncClock } from "@/presentation/components/conexiones/sync-clock";
import { SyncNowButton } from "@/presentation/components/conexiones/sync-now-button";
import type { ConnectionsStatusBandProps } from "@/types/connections.types";

/**
 * Cabecera de `B10`. Sustituye a la banda de cuatro cifras: esas eran datos sin
 * respuesta, y la pregunta que trae aquí al usuario es si la información está
 * entrando. El titular la contesta y el reloj dice cuándo vuelve a entrar.
 */
export function ConnectionsStatusBand({ status }: ConnectionsStatusBandProps) {
  return (
    <section className="glass-panel flex flex-wrap items-center gap-[22px] rounded-card px-6 py-5">
      <SyncClock
        countdown={status.countdown}
        elapsedPercent={status.elapsedPercent}
      />

      <div className="flex min-w-[240px] flex-1 flex-col gap-1.5">
        <span className="text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase">
          {CONNECTIONS_SUMMARY_COPY.eyebrow}
        </span>
        <h2 className="font-display text-[19px] font-light tracking-[-0.4px] text-text-primary">
          {status.headline}
        </h2>
        <p className="text-[12px] text-text-secondary">{status.detail}</p>
      </div>

      <SyncNowButton />
    </section>
  );
}
