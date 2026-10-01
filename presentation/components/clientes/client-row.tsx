import Link from "next/link";
import { CLIENT_ROW_COPY, CLIENT_STATUS_BADGE } from "@/constants/clients.constants";
import { clientDetailRoute } from "@/constants/routes.constants";
import { ClientCardMenu } from "@/presentation/components/clientes/client-card-menu";
import { ClientSpendBar } from "@/presentation/components/clientes/client-spend-bar";
import { Avatar } from "@/presentation/components/ui/avatar";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import type { ClientRowProps } from "@/types/client.types";
import { cn } from "@/utils/cn";
import { formatClientActivity } from "@/utils/format-client-activity";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

/** Una fila de la cartera: quién es, cuánto se lleva y si está en marcha. */
export function ClientRow({ client, maxInvestment, nowIso }: ClientRowProps) {
  const status = CLIENT_STATUS_BADGE[client.status];
  const hasInvestment = client.monthInvestment > 0;

  return (
    <li className="relative flex min-h-[72px] items-center gap-4 border-b border-border py-3 transition-colors duration-150 last:border-b-0 hover:bg-white/[0.03]">
      <div className="flex min-w-0 flex-1 items-center gap-3.5">
        <Avatar
          initials={client.initials}
          size={44}
          fontSize={14}
          gradient={client.gradient}
          imageUrl={client.avatarUrl}
        />

        <div className="flex min-w-0 flex-col gap-0.5">
          <h2 className="truncate text-sm font-normal text-text-primary">
            {/* Enlace expandido a toda la fila; el menú `⋯` se superpone con z-10. */}
            <Link
              href={clientDetailRoute(client.id)}
              className="rounded-sm after:absolute after:inset-0 focus-visible:ring-2 focus-visible:ring-lilac focus-visible:outline-none"
            >
              {client.name}
            </Link>
          </h2>
          <p className="truncate text-xs font-normal text-text-muted">
            {client.handle} · {client.kind}
          </p>
        </div>
      </div>

      <div className="hidden w-[300px] shrink-0 items-center gap-4 lg:flex">
        <ClientSpendBar
          shares={client.platformShares}
          monthInvestment={client.monthInvestment}
          maxInvestment={maxInvestment}
        />
        <span
          className={cn(
            "w-[84px] shrink-0 text-sm font-normal tabular-nums",
            hasInvestment ? "text-text-primary" : "text-text-muted",
          )}
        >
          {hasInvestment
            ? formatCompactCurrency(client.monthInvestment)
            : CLIENT_ROW_COPY.noInvestment}
        </span>
      </div>

      <div className="hidden w-[190px] shrink-0 flex-col gap-0.5 md:flex">
        <span className="truncate text-[13px] text-text-primary">
          {client.jobsCount === 0
            ? CLIENT_ROW_COPY.noJobs
            : CLIENT_ROW_COPY.jobs(client.activeJobsCount, client.jobsCount)}
        </span>
        <span
          className={cn(
            "truncate text-xs font-normal",
            client.status === "paused" ? "text-warning" : "text-text-muted",
          )}
        >
          {formatClientActivity(client, nowIso)}
        </span>
      </div>

      <div className="hidden w-[130px] shrink-0 sm:block">
        <StatusBadge label={status.label} tone={status.tone} />
      </div>

      <div className="relative z-10 flex w-10 shrink-0 justify-end">
        <ClientCardMenu client={client} />
      </div>
    </li>
  );
}
