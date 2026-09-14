import { RefreshCw, Settings } from "lucide-react";
import {
  CONNECTIONS_COPY,
  CONNECTION_CHIPS,
} from "@/constants/connections.constants";
import { PLATFORM_META } from "@/constants/platforms.constants";
import { ConnectionAccessBar } from "@/presentation/components/conexiones/connection-access-bar";
import { ConnectionEmpty } from "@/presentation/components/conexiones/connection-empty";
import { ConnectionMetrics } from "@/presentation/components/conexiones/connection-metrics";
import { PrimaryButton } from "@/presentation/components/ui/primary-button";
import { SecondaryButton } from "@/presentation/components/ui/secondary-button";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import type { ConnectionCardProps } from "@/types/connections.types";
import { cn } from "@/utils/cn";

/** Tarjeta de una cuenta publicitaria, conectada o pendiente de vincular. */
export function ConnectionCard({ connection, actions }: ConnectionCardProps) {
  const { Icon } = PLATFORM_META[connection.platform];
  const isConnected = connection.status === "connected";
  // Reautorizar solo compite por la atención cuando el acceso está por caducar.
  const isUrgent = connection.access?.isExpiring ?? false;

  return (
    <section className="flex min-h-[235px] flex-col gap-4 rounded-card border border-border bg-card p-5">
      <header className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={cn(
              "grid size-11 shrink-0 place-items-center rounded-md",
              CONNECTION_CHIPS[connection.platform],
            )}
          >
            <Icon />
          </span>
          <div className="flex min-w-0 flex-col gap-0.5">
            <h2 className="truncate font-display text-base font-bold text-text-primary">
              {connection.name}
            </h2>
            <p className="truncate text-xs text-text-muted">
              {connection.accountName ?? CONNECTIONS_COPY.notLinked}
            </p>
          </div>
        </div>

        <StatusBadge
          label={
            isConnected
              ? CONNECTIONS_COPY.connected
              : CONNECTIONS_COPY.disconnected
          }
          tone={isConnected ? "success" : "danger"}
        />
      </header>

      {isConnected ? (
        <>
          <ConnectionMetrics connection={connection} />

          {connection.access ? (
            <ConnectionAccessBar access={connection.access} />
          ) : null}

          <div className="mt-auto flex flex-wrap gap-2.5">
            {actions ?? (
              <>
                <SecondaryButton
                  type="button"
                  disabled
                  title={CONNECTIONS_COPY.pendingOauth}
                  className="flex-1"
                  icon={<Settings size={18} strokeWidth={2} aria-hidden />}
                >
                  {CONNECTIONS_COPY.manage}
                </SecondaryButton>

                {isUrgent ? (
                  <PrimaryButton
                    type="button"
                    disabled
                    title={CONNECTIONS_COPY.pendingOauth}
                    className="flex-1"
                  >
                    <RefreshCw size={18} strokeWidth={2} aria-hidden />
                    {CONNECTIONS_COPY.reauthorize}
                  </PrimaryButton>
                ) : (
                  <SecondaryButton
                    type="button"
                    disabled
                    title={CONNECTIONS_COPY.pendingOauth}
                    className="flex-1"
                    icon={<RefreshCw size={18} strokeWidth={2} aria-hidden />}
                  >
                    {CONNECTIONS_COPY.reauthorize}
                  </SecondaryButton>
                )}
              </>
            )}
          </div>
        </>
      ) : (
        <ConnectionEmpty name={connection.name} action={actions} />
      )}
    </section>
  );
}
