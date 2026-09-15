import { Plus } from "lucide-react";
import { PORTFOLIO_COPY } from "@/constants/clients.constants";
import { CLIENTS_COPY } from "@/constants/clients.constants";
import { NEW_CLIENT_ROUTE } from "@/constants/routes.constants";
import { ClientAvatarStack } from "@/presentation/components/clientes/client-avatar-stack";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";
import type { ClientsPortfolioBandProps } from "@/types/client.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

/**
 * Cabecera del listado: cuánto dinero hay en juego este mes y en qué estado
 * está la cartera. Los puntos de color repiten el mismo código que los badges
 * de cada fila, así el resumen y el detalle se leen igual.
 */
export function ClientsPortfolioBand({
  summary,
  clients,
  monthName,
}: ClientsPortfolioBandProps) {
  const composition = [
    { label: PORTFOLIO_COPY.working(summary.working), dot: "bg-ink" },
    { label: PORTFOLIO_COPY.paused(summary.paused), dot: "bg-warning" },
    { label: PORTFOLIO_COPY.empty(summary.empty), dot: "bg-g-400" },
    { label: PORTFOLIO_COPY.liveCampaigns(summary.liveCampaigns), dot: "bg-meta" },
  ];

  return (
    <section className="glass-panel flex flex-wrap items-center gap-6 rounded-card px-6 py-[22px]">
      <ClientAvatarStack clients={clients} />

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <span className="text-[10px] font-medium tracking-[0.6px] text-text-muted uppercase">
          {PORTFOLIO_COPY.eyebrow(monthName)}
        </span>

        <p className="flex flex-wrap items-end gap-x-2.5">
          <span className="font-display text-[30px] leading-none font-light tracking-[-1.2px] text-text-primary">
            {formatCompactCurrency(summary.total)}
          </span>
          <span className="text-[13px] text-text-secondary">
            {PORTFOLIO_COPY.spread(summary.clientsCount)}
          </span>
        </p>

        <ul className="flex flex-wrap items-center gap-x-4 gap-y-1.5">
          {composition.map((item) => (
            <li
              key={item.label}
              className="flex items-center gap-[7px] text-[12px] text-text-secondary"
            >
              <span aria-hidden className={`size-[7px] rounded-pill ${item.dot}`} />
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <PrimaryLink href={NEW_CLIENT_ROUTE}>
        <Plus size={15} strokeWidth={1.75} aria-hidden />
        {CLIENTS_COPY.newClient}
      </PrimaryLink>
    </section>
  );
}
