import Link from "next/link";
import { CLIENT_STATUS_BADGE } from "@/constants/clients.constants";
import { clientDetailRoute } from "@/constants/routes.constants";
import { ClientCardMenu } from "@/presentation/components/clientes/client-card-menu";
import { ClientCardPlatformMix } from "@/presentation/components/clientes/client-card-platform-mix";
import { ClientCardSpend } from "@/presentation/components/clientes/client-card-spend";
import { Avatar } from "@/presentation/components/ui/avatar";
import { StatusBadge } from "@/presentation/components/ui/status-badge";
import type { ClientCardProps } from "@/types/client.types";
import { formatClientActivity } from "@/utils/format-client-activity";

export function ClientCard({ client, monthName, nowIso }: ClientCardProps) {
  const status = CLIENT_STATUS_BADGE[client.status];

  return (
    <article className="relative flex flex-col gap-[14px] rounded-card border border-border bg-card p-[18px] transition-colors hover:border-border-strong">
      <div className="flex items-center gap-[13px]">
        <Avatar
          initials={client.initials}
          size={44}
          fontSize={15}
          gradient={client.gradient}
          imageUrl={client.avatarUrl}
        />

        <div className="flex min-w-0 flex-1 flex-col gap-[3px]">
          <h2 className="truncate text-[15px] font-semibold text-text-primary">
            {/* Enlace expandido a toda la tarjeta; el menú `⋯` se superpone con z-10. */}
            <Link
              href={clientDetailRoute(client.id)}
              className="rounded-sm after:absolute after:inset-0 focus-visible:ring-2 focus-visible:ring-brand-violet/60 focus-visible:outline-none"
            >
              {client.name}
            </Link>
          </h2>
          <p className="truncate text-xs text-text-muted">
            {client.handle} · {client.kind}
          </p>
        </div>

        <div className="relative z-10">
          <ClientCardMenu client={client} size={32} />
        </div>
      </div>

      <ClientCardSpend
        monthInvestment={client.monthInvestment}
        monthName={monthName}
        jobsCount={client.jobsCount}
        activeJobsCount={client.activeJobsCount}
      />

      <ClientCardPlatformMix shares={client.platformShares} />

      <div className="flex items-center justify-between gap-2">
        <p className="truncate text-xs text-text-muted">
          {formatClientActivity(client, nowIso)}
        </p>
        <StatusBadge label={status.label} tone={status.tone} />
      </div>
    </article>
  );
}
