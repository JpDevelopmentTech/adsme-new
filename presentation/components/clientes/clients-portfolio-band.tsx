import { UserPlus } from "lucide-react";
import { CLIENTS_COPY, PORTFOLIO_COPY } from "@/constants/clients.constants";
import { NEW_CLIENT_ROUTE } from "@/constants/routes.constants";
import { ClientAvatarStack } from "@/presentation/components/clientes/client-avatar-stack";
import { PortfolioFigure } from "@/presentation/components/clientes/portfolio-figure";
import { PrimaryLink } from "@/presentation/components/ui/primary-link";
import type { ClientsPortfolioBandProps } from "@/types/client.types";
import { formatCompactCurrency } from "@/utils/format-compact-currency";

/**
 * Cabecera del listado: las caras de la cartera, cuánto dinero hay en juego este
 * mes y cuatro cifras de composición con el mismo código de color de las filas.
 */
export function ClientsPortfolioBand({
  summary,
  clients,
  monthName,
}: ClientsPortfolioBandProps) {
  const composition = [
    { value: summary.working, label: PORTFOLIO_COPY.workingLabel, dot: "bg-success" },
    { value: summary.paused, label: PORTFOLIO_COPY.pausedLabel, dot: "bg-warning" },
    { value: summary.empty, label: PORTFOLIO_COPY.emptyLabel, dot: "bg-text-muted" },
    {
      value: summary.liveCampaigns,
      label: PORTFOLIO_COPY.liveCampaignsLabel(summary.liveCampaigns),
      dot: "bg-lilac",
    },
  ];

  return (
    <section className="glass-panel flex flex-col gap-7 rounded-card px-7 py-[26px] xl:flex-row xl:items-center xl:gap-9">
      <div className="flex flex-col gap-4">
        <ClientAvatarStack clients={clients} />

        <div className="flex flex-col gap-1">
          <h2 className="text-[13px] font-normal text-text-secondary">
            {PORTFOLIO_COPY.eyebrow(monthName)}
          </h2>
          <p className="flex flex-wrap items-end gap-x-3">
            <span className="text-5xl leading-none font-extralight tracking-[-1.5px] text-text-primary tabular-nums">
              {formatCompactCurrency(summary.total)}
            </span>
            <span className="pb-1.5 text-sm text-text-secondary">
              {PORTFOLIO_COPY.spread(summary.clientsCount)}
            </span>
          </p>
        </div>
      </div>

      <ul className="flex flex-1 flex-wrap items-center gap-y-4">
        {composition.map((figure) => (
          <PortfolioFigure key={figure.label} {...figure} />
        ))}
      </ul>

      <PrimaryLink href={NEW_CLIENT_ROUTE} className="self-start xl:self-center">
        <UserPlus size={16} strokeWidth={1.75} aria-hidden />
        {CLIENTS_COPY.newClient}
      </PrimaryLink>
    </section>
  );
}
