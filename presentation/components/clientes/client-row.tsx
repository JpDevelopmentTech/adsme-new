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
    <li className="relative flex items-center gap-3.5 border-b border-border/60 px-5 py-3 transition-colors duration-150 last:border-b-0 hover:bg-g-100">
      <Avatar
        initials={client.initials}
        size={40}
        fontSize={12}
        gradient={client.gradient}
        imageUrl={client.avatarUrl}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-0.5 lg:w-[210px] lg:flex-none">
        <h2 className="truncate text-[13.5px] font-normal text-text-primary">
          {/* Enlace expandido a toda la fila; el menú `⋯` se superpone con z-10. */}
          <Link
            href={clientDetailRoute(client.id)}
            className="rounded-sm after:absolute after:inset-0 focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:outline-none"
          >
            {client.name}
          </Link>
        </h2>
        <p className="truncate text-[11.5px] text-text-muted">
          {client.handle} · {client.kind}
        </p>
      </div>

      <div className="hidden min-w-0 flex-1 lg:flex">
        <ClientSpendBar
          shares={client.platformShares}
          monthInvestment={client.monthInvestment}
          maxInvestment={maxInvestment}
        />
      </div>

      <span
        className={cn(
          "w-[100px] shrink-0 text-right text-[13.5px] font-normal",
          hasInvestment ? "text-text-primary" : "text-text-muted",
        )}
      >
        {hasInvestment
          ? formatCompactCurrency(client.monthInvestment)
          : CLIENT_ROW_COPY.noInvestment}
      </span>

      <div className="hidden w-[140px] shrink-0 flex-col gap-0.5 md:flex">
        <span className="truncate text-[12px] text-text-secondary">
          {client.jobsCount === 0
            ? CLIENT_ROW_COPY.noJobs
            : CLIENT_ROW_COPY.jobs(client.activeJobsCount, client.jobsCount)}
        </span>
        <span
          className={cn(
            "truncate text-[11px]",
            client.status === "paused" ? "text-warning" : "text-text-muted",
          )}
        >
          {formatClientActivity(client, nowIso)}
        </span>
      </div>

      <div className="hidden w-24 shrink-0 justify-center sm:flex">
        <StatusBadge label={status.label} tone={status.tone} />
      </div>

      <div className="relative z-10">
        <ClientCardMenu client={client} />
      </div>
    </li>
  );
}
