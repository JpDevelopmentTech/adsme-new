import { Lock } from "lucide-react";
import {
  CONNECTIONS_COPY,
  CONNECTION_CARD_COPY,
  CONNECTION_MONOGRAMS,
} from "@/constants/connections.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import { ConnectionAccessRail } from "@/presentation/components/conexiones/connection-access-rail";
import type { ConnectionRowProps } from "@/types/connections.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

/**
 * Una plataforma a ancho completo. Antes eran tres tarjetas de ~370 px donde
 * métricas, vigencia y tres botones no cabían; en fila las columnas se alinean
 * y comparar plataformas deja de exigir leerlas una a una.
 */
export function ConnectionRow({ connection, actions }: ConnectionRowProps) {
  const { chartColor } = PLATFORM_META[connection.platform];
  const isConnected = connection.status === "connected";
  const accounts = connection.accountNames;

  return (
    <li className="flex flex-wrap items-center gap-4 border-b border-border/60 px-5 py-4 last:border-b-0">
      {/* La marca se reduce a su monograma en el color de la plataforma: a
          42 px un logo real se lee peor que dos letras, y el color ya la
          identifica igual que en las barras del resto del producto. */}
      <span
        aria-hidden
        className="grid size-[42px] shrink-0 place-items-center rounded-md text-[11px] font-medium tracking-[0.4px]"
        style={{ backgroundColor: `${chartColor}1F`, color: chartColor }}
      >
        {CONNECTION_MONOGRAMS[connection.platform]}
      </span>

      <div className="flex w-[200px] min-w-[150px] flex-col gap-0.5">
        <span className="truncate text-[14px] font-normal text-text-primary">
          {connection.name}
        </span>
        <span className="truncate text-[11.5px] text-text-secondary">
          {accounts.length === 0
            ? CONNECTIONS_COPY.notLinked
            : accounts.length === 1
              ? accounts[0]
              : `${CONNECTIONS_COPY.accounts(accounts.length)} · ${accounts.join(" · ")}`}
        </span>
      </div>

      <span
        className={`flex shrink-0 items-center gap-[7px] rounded-pill border px-[10px] py-1 text-[11px] ${
          isConnected
            ? "border-success/40 bg-success/12 text-success"
            : "border-border-strong text-text-secondary"
        }`}
      >
        <span
          aria-hidden
          className={`size-1.5 rounded-pill ${isConnected ? "bg-success" : "bg-g-500"}`}
        />
        {isConnected
          ? CONNECTIONS_COPY.connected
          : CONNECTIONS_COPY.notConnectedShort}
      </span>

      {isConnected ? (
        <>
          <div className="flex w-[78px] shrink-0 flex-col gap-0.5">
            <span className="text-[14px] font-normal text-text-primary">
              {connection.activeCampaigns ?? 0}
            </span>
            <span className="text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase">
              {CONNECTION_CARD_COPY.campaigns}
            </span>
          </div>

          <div className="flex w-24 shrink-0 flex-col gap-0.5">
            <span className="text-[14px] font-normal whitespace-nowrap text-text-primary">
              {formatCompactCurrency(connection.importedSpend ?? 0)}
            </span>
            <span className="text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase">
              {CONNECTION_CARD_COPY.imported}
            </span>
          </div>

          {connection.access ? (
            <ConnectionAccessRail access={connection.access} />
          ) : null}
        </>
      ) : (
        <p className="min-w-[200px] flex-1 text-[12.5px] text-text-secondary">
          {CONNECTIONS_COPY.connectInviteShort}
        </p>
      )}

      <div className="flex flex-1 items-center justify-end gap-2">
        {actions ?? (
          <span
            title={CONNECTIONS_COPY.pendingOauth}
            className="flex cursor-not-allowed items-center gap-[7px] rounded-md border border-border bg-g-200 px-3.5 py-2.5 text-[12.5px] text-g-500"
          >
            <Lock size={14} strokeWidth={1.5} aria-hidden />
            {CONNECTIONS_COPY.connect}
          </span>
        )}
      </div>
    </li>
  );
}
